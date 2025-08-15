"use client";

import { useEffect, useState } from "react";
import { getUsers, type User } from "@/services/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function PersonelListesiPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
 const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
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
  }, []);

  if (loading) return <div className="p-4">Yükleniyor…</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const normalizeText = (text: string) =>
    text?.toLocaleLowerCase("tr").replace(/\s+/g, " ").trim();

  const filteredUsers = users
    .filter((u) => {
      const query = normalizeText(search);
      return (
        normalizeText(u.op_name).includes(query) ||
        normalizeText(u.op_section).includes(query) ||
        normalizeText(u.op_username).includes(query) ||
        normalizeText(u.e_mail).includes(query) ||
        normalizeText(u.part).includes(query) ||
        normalizeText(u.title).includes(query)
      );
    })
    .sort((a, b) => a.op_name.localeCompare(b.op_name, "tr"));

  const handleRowClick = (user: User) => {
  setSelectedUser(prev => prev?.id_dec === user.id_dec ? null : user);
};

  console.log(selectedUser);
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
                <TableHead>Admin mi?</TableHead>
                <TableHead>Bölüm</TableHead>
                <TableHead>Part</TableHead>
                <TableHead>Ünvan</TableHead>
                <TableHead>Auth2</TableHead>
                <TableHead>Auth1</TableHead>
                <TableHead>Adres</TableHead>
                <TableHead>E-Posta</TableHead>
                <TableHead>Shift Validator</TableHead>
                <TableHead>Rota</TableHead>
                <TableHead>Durak</TableHead>
                <TableHead>İzin Bakiye</TableHead>
                <TableHead>Onaylayıcı mı?</TableHead>
              </TableRow>
            </TableHeader>
           <TableBody>
        {filteredUsers.map((u) => (
         <TableRow
        key={u.id_dec}
        onClick={() => handleRowClick(u)}
      className={`cursor-pointer transition-colors ${
        selectedUser?.id_dec === u.id_dec? "bg-blue-100 border-2 border-blue-400": ""
      }`} >
                  <TableCell>{u.id_dec}</TableCell>
                  <TableCell>{u.id_hex}</TableCell>
                  <TableCell>{u.op_name}</TableCell>
                  <TableCell>{u.op_username}</TableCell>
                  <TableCell>
                    <Badge variant={u.is_admin ? "default" : "secondary"}>
                      {u.is_admin ? "Evet" : "Hayır"}
                    </Badge>
                  </TableCell>
                  <TableCell>{u.op_section}</TableCell>
                  <TableCell>{u.part}</TableCell>
                  <TableCell>{u.title}</TableCell>
                  <TableCell>{u.auth2 ?? "-"}</TableCell>
                  <TableCell>{u.auth1 ?? "-"}</TableCell>
                  <TableCell>{u.address}</TableCell>
                  <TableCell>{u.e_mail}</TableCell>
                  <TableCell>{u.shift_validator}</TableCell>
                  <TableCell>{u.route}</TableCell>
                  <TableCell>{u.stop_name}</TableCell>
                  <TableCell>{u.izin_bakiye}</TableCell>
                  <TableCell>
                    <Badge variant={u.is_approver ? "default" : "secondary"}>
                      {u.is_approver ? "Evet" : "Hayır"}
                    </Badge>
                  </TableCell>
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
      </div>
    </div>
  );
}
