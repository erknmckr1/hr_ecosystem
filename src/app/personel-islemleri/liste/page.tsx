"use client";
import { useEffect, useState, useMemo } from "react";
import { getUsers, updateUser, type User } from "@/services/users";
import { toast } from "sonner";
import UserTable from "./components/UserTable";
import { Card } from "@/components/ui/card";
import UserUpdateDialog from "./components/UserUpdateDialog";
import { sendMail } from "@/services/mail";
import SearchBar from "./components/SearchBar";
import { normalizeText, sortUsersBySelection } from "./utils/userHelpers";

export default function PersonelListesiPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    }
  }, [editUser]);

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Kullanıcıları çekerken hata oluştu:", err);
        setError("Veri alınırken hata oluştu."); // ekranda basit mesaj
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredUsers = users
    .filter((u) => {
      const query = normalizeText(search);
      return (
        normalizeText(u.op_name || "").includes(query) ||
        normalizeText(u.op_section || "").includes(query) ||
        normalizeText(u.op_username || "").includes(query) ||
        normalizeText(u.e_mail || "").includes(query) ||
        normalizeText(u.part || "").includes(query) ||
        normalizeText(u.title || "").includes(query)
      );
    })
    .sort((a, b) => (a.op_name || "").localeCompare(b.op_name || "", "tr"));

  if (loading) return <div className="p-4">Yükleniyor…</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // doubleClick ile update popup ı acacak fonksiyon...
  const handleUpdateUser = (user: User) => {
    setEditUser(user);
    setFormData(user);
    setIsPopupOpen(true);
  };

  const handleSelectedUsers = (user: User) => {
    setSelectedUsers((prev) => {
      const exist = prev.some((u) => u.id_dec === user.id_dec);

      if (exist) {
        return prev.filter((u) => u.id_dec !== user.id_dec);
      } else {
        return [...prev, user];
      }
    });
  };

  //! Mail gönderme isteği
  const handleSendMail = async (selectedUsers: User[]) => {
    try {
      if (selectedUsers.length === 0) {
        toast.error("Mail ile yollayacağınız kullanıcıları seçiniz.");
        return;
      }
      const users = selectedUsers.map((u) => ({
        id_dec: u.id_dec,
        id_hex: u.id_hex,
        op_name: u.op_name,
        op_username: u.op_username,
        part: u.part,
        e_mail: u.e_mail,
        op_section: u.op_section,
        title: u.title,
      }));

      const response = await sendMail(users);

      if (response.status === 200) {
        toast.success("Mail başarıyla gönderildi!");
        setSelectedUsers([]);
      } else {
        toast.error("Mail gönderilemedi: " + response.data.error);
      }
    } catch (err) {
      console.error("Mail gönderme hatası:", err);
      toast.error("Mail gönderme sırasında bir hata oluştu!");
    }
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      const updated = await updateUser(formData);

      setUsers((prev) =>
        prev.map((u) => (u.id_dec === updated.id_dec ? updated : u))
      );
      toast.success("Personel bilgileri başarıyla güncellendi.");
      setIsPopupOpen(false);
      setEditUser(null);
      setFormData(null);
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      toast.error("Güncelleme sırasında hata oluştu!");
    }
  };

  // seçilen kullanıcıları listenin başına tasıyacak sıralama fonksiyonu
  const sortedUsers = sortUsersBySelection(filteredUsers, selectedUsers);

  return (
    <div className=" p-6 w-full">
      <div className="w-full h-full flex justify-center ">
        <Card className="2xl:w-[1400px] xl:w-[1200px] lg:w-[1200px] md:w-[1000px] sm:w-[600px] w-[400px]  max-h-180 mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Personel Listesi</h1>
          {/* search bar */}
          <SearchBar
            value={search}
            onChange={setSearch}
            onClearSelected={() => setSelectedUsers([])}
            onSendMail={() => handleSendMail(selectedUsers)} //
          />

          {/* User Table */}
          <UserTable
            editUser={editUser}
            handleSelectedUsers={handleSelectedUsers}
            handleUpdateUser={handleUpdateUser}
            filteredUsers={sortedUsers}
            selectedUsers={selectedUsers}
          />
          <div className="h-10 p-2 flex justify-between items-center ">
            <span className="text-sm text-blue-700">
              {search
                ? `Filtrelenen kayıtlar: ${filteredUsers.length} / Toplam: ${users.length}`
                : `Toplam kayıt: ${users.length}`}
            </span>
          </div>
        </Card>
        {/* update popup */}
        <UserUpdateDialog
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
