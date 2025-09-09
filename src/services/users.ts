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


import axiosInstance from "./axiosInstance";

const BASE_URL = "/users_api/users";

export const getUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get<User[]>(BASE_URL);
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await axiosInstance.get<User>(`${BASE_URL}/${id}`);
  return res.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const res = await axiosInstance.put<User>(BASE_URL, user);
  return res.data;
};

export const deleteUser = async (id_dec: number, id_hex: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id_dec}/${id_hex}`);
};

export const createUser = async (user: User): Promise<User> => {
  const res = await axiosInstance.post<User>(BASE_URL, user);
  return res.data;
};