export type User = {
  id:number;
  id_dec: number;
  id_hex: string;
  op_name: string;
  op_username: string;
  is_active: boolean;
  is_admin: boolean;
  op_password: string;
  op_section: string;
  part: string;
  title: string;
  auth2: number | null;
  auth1: number | null;
  address: string;
  e_mail: string;
  shift_validator: number;
  gender: string;
  short_name: string;
  route: string;
  stop_name: string;
  izin_bakiye: number;
  is_approver: boolean;
  roleId: number;
};


import api from "./api";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/users");
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
};

export const createUser = async (user: User): Promise<User> => {
  const res = await api.post<User>("/users", user);
  return res.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const res = await api.put<User>(`/users/${id}`, user);
  console.log(res)
  return res.data;
};



export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

