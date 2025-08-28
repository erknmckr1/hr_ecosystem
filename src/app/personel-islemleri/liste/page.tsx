"use client";
import { useEffect, useState } from "react";
//import { getUsers, type User } from "@/services/users";//
import { sections, sectionParts, titles } from "@/lib/data/staticData";
import { getUsers, updateUser, type User } from "@/services/users";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default function PersonelListesiPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  console.log(selectedUser);

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };
 

/*   useEffect(() => {
    const load = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Veri alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []); */


  useEffect(() => {
  const load = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Kullanıcıları çekerken hata oluştu:", err); // 🔴 hatayı konsola yaz
      setError("Veri alınırken hata oluştu."); // ekranda basit mesaj
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);



  if (loading) return <div className="p-4">Yükleniyor…</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const normalizeText = (text: string) =>
    text?.toLocaleLowerCase("tr").replace(/\s+/g, " ").trim();

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
    .sort((a, b) => (a.op_name  || "").localeCompare(b.op_name || "", "tr"));

  const handleRowClick = (user: User) => {
  if (selectedUser?.id_dec === user.id_dec) {
    setIsPopupOpen(true);
  } else {
    setSelectedUser(user);
    setFormData(user);
  }
};
console.log(formData)
const handleSave = async () => {
  if (!formData) return;
  try {
    const updated = await updateUser(formData);
    
    setUsers((prev) =>
      prev.map((u) => (u.id_dec=== updated.id_dec? updated : u))
    );
    setIsPopupOpen(false);
    setSelectedUser(null);
    setFormData(null);
  } catch (err) {
    console.error("Güncelleme hatası:", err);
    alert("Güncelleme sırasında hata oluştu!");
  }
};

  return (
    <div className=" p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">Personel Listesi</h1>
      <div className="w-full h-full flex justify-center ">
        <Card className=" w-[1200px] max-h-120 p-4">
          <div className="h-10 ">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              className="w-40"
              placeholder="Search"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID (DEC)</TableHead>
                <TableHead>ID (HEX)</TableHead>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>Kullanıcı Adı</TableHead>
                <TableHead>Bölüm</TableHead>
                <TableHead>Part</TableHead>
                <TableHead>Ünvan</TableHead>
                <TableHead>Adres</TableHead>
                <TableHead>E-Posta</TableHead>
                <TableHead>Rota</TableHead>
                <TableHead>Durak</TableHead>
                <TableHead>İzin Bakiye</TableHead>
              
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow
                  key={`${u.id_dec}-${u.id_hex}`}
                  onClick={() => handleRowClick(u)}
                  className={`cursor-pointer transition-colors ${ selectedUser?.id_dec === u.id_dec 
                     ? "bg-blue-100 border-2 border-blue-400" : "" }`} >
                  <TableCell>{u.id_dec}</TableCell>
                  <TableCell>{u.id_hex}</TableCell>
                  <TableCell>{u.op_name}</TableCell>
                  <TableCell>{u.op_username}</TableCell>
                  <TableCell>{u.op_section}</TableCell>
                  <TableCell>{u.part}</TableCell>
                  <TableCell>{u.title}</TableCell>
                  <TableCell>{u.address}</TableCell>
                  <TableCell>{u.e_mail}</TableCell>
                  <TableCell>{u.route}</TableCell>
                  <TableCell>{u.stop_name}</TableCell>
                  <TableCell>{u.izin_bakiye}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="h-10 p-2 flex justify-between items-center ">
            <span className="text-sm text-blue-700">
              {search
                ? `Filtrelenen kayıtlar: ${filteredUsers.length} / Toplam: ${users.length}`
                : `Toplam kayıt: ${users.length}`}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Card>
        

        {/* Shadcn Dialog */}
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Personel Bilgilerini Güncelle</DialogTitle>
            </DialogHeader>

            {formData && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">Ad Soyad</label>
                <Input
                  type="text"
                  value={formData.op_name || ""}
                  onChange={(e) => handleChange("op_name", e.target.value)}
                />

                <label className="block text-sm font-medium">
                  Kullanıcı Adı
                </label>
                <Input
                  type="text"
                  value={formData.op_username || ""}
                  onChange={(e) => handleChange("op_username", e.target.value)}
                />

                <label className="block text-sm font-medium">E-Posta</label>
                <Input
                  type="email"
                  value={formData.e_mail || ""}
                  onChange={(e) => handleChange("e_mail", e.target.value)}
                />

                <label className="block text-sm font-medium">Bölüm</label>
                <select
                  value={formData.op_section || ""}
                  onChange={(e) => handleChange("op_section", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">Seçiniz</option>
                  {sections.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <label className="block text-sm font-medium">Part</label>
                <select
                  value={formData.part}
                  onChange={(e) => handleChange("part", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  disabled={!formData.op_section}
                >
                  <option value="">Seçiniz</option>
                  {sectionParts
                    .find((sp) => sp.section === formData.op_section)
                    ?.parts.map((p, index) => (
                      <option key={index} value={p}>
                        {p}
                      </option>
                    ))}
                </select>

                <label className="block text-sm font-medium">Ünvan</label>
                <select
                  value={formData.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">Seçiniz</option>
                  {titles.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}

                </select>

                <label className="block text-sm font-medium">Adres</label>
                <Input
                  type="text"
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                />

                <label className="block text-sm font-medium">Rota</label>
                <Input
                  type="text"
                  value={formData.route || ""}
                  onChange={(e) => handleChange("route", e.target.value)}
                />

                <label className="block text-sm font-medium">Durak</label>
                <Input
                  type="text"
                  value={formData.stop_name || ""}
                  onChange={(e) => handleChange("stop_name", e.target.value)}
                />

                <label className="block text-sm font-medium">İzin Bakiye</label>
                <Input
                  type="number"
                  value={formData.izin_bakiye || ""}
                  onChange={(e) =>
                    handleChange("izin_bakiye", Number(e.target.value))
                  }
                />
              </div>
            )}

            <DialogFooter className="mt-4">
              <Button variant="secondary" onClick={() => setIsPopupOpen(false)}>
                Kapat
              </Button>
              <Button onClick={handleSave}>
                Kaydet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        
      </div>
    </div>
  );
}
