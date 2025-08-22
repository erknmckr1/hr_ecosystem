export type User = {
  id?:number;
  id_dec: string;
  id_hex: string;
  op_name: string;
  op_username: string;
  is_active: number|null;
  is_admin: number|null;
  op_password: string;
  op_section: string;
  part: string;
  title: string;
  auth2: string;
  auth1: string;
  address: string;
  e_mail: string;
  shift_validator:string;
  gender: string;
  short_name: string;
  route: string;
  stop_name: string;
  izin_bakiye: number;
  is_approver: number|null;
  roleId: number;
};  

import api from "./api";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/api/users");
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await api.get<User>(`/api/users/${id}`);
  return res.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const res = await api.put<User>("/api/users", user);
  return res.data;
};

export const deleteUser = async (id_dec: number, id_hex: string): Promise<void> => {
  await api.delete(`/api/users/${id_dec}/${id_hex}`);
};

 export const createUser = async (user: User): Promise<User> => {
  const res = await api.post<User>("/api/users", user);
  return res.data;
};
