import React from "react";
import { type User } from "@/services/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

type UserTableProps = {
  filteredUsers: User[];
  editUser: User | null;
  selectedUsers: User[];
  handleSelectedUsers: (user: User) => void;
  handleUpdateUser: (user: User) => void;
};

function UserTable({
  filteredUsers,
  editUser,
  selectedUsers,
  handleSelectedUsers,
  handleUpdateUser,
}: UserTableProps) {
  console.log(selectedUsers);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID (DEC)</TableHead>
          <TableHead>ID (HEX)</TableHead>
          <TableHead>Ad Soyad</TableHead>
          <TableHead>Kullanıcı Adı</TableHead>
          <TableHead>Bölüm</TableHead>
          <TableHead>Part</TableHead>
          <TableHead>1. Onaylaycı</TableHead>
          <TableHead>2. Onaylayıcı</TableHead>
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
            onDoubleClick={() => handleUpdateUser(u)}
            className={`cursor-pointer transition-colors ${
              editUser?.id_dec === u.id_dec
                ? "bg-blue-100 border-2 border-blue-400"
                : ""
            } ${
              selectedUsers?.some((user) => user.id_dec === u.id_dec)
                ? "bg-green-100"
                : ""
            }`}
          >
            <TableCell className="border-r-2">
              <Checkbox
                checked={selectedUsers.some((su) => su.id_dec === u.id_dec)}
                onCheckedChange={() => handleSelectedUsers(u)}
                className="border-black"
              />
            </TableCell>

            <TableCell className="border-r-2">{u.id_dec}</TableCell>
            <TableCell className="border-r-2">{u.id_hex}</TableCell>
            <TableCell className="border-r-2">{u.op_name}</TableCell>
            <TableCell className="border-r-2">{u.op_username}</TableCell>
            <TableCell className="border-r-2">{u.op_section}</TableCell>
            <TableCell className="border-r-2">{u.part}</TableCell>
            <TableCell className="border-r-2">{u.auth1}</TableCell>
            <TableCell className="border-r-2">{u.auth2}</TableCell>
            <TableCell className="border-r-2">{u.title}</TableCell>
            <TableCell className="border-r-2">{u.address}</TableCell>
            <TableCell className="border-r-2">{u.e_mail}</TableCell>
            <TableCell className="border-r-2">{u.route}</TableCell>
            <TableCell className="border-r-2">{u.stop_name}</TableCell>
            <TableCell>{u.izin_bakiye}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
  );
}

export default UserTable;
