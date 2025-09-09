import axiosInstance from "./axiosInstance";
import { User } from "./users";

// sadece API isteğini yapan fonksiyon
export const sendMail = async (users: Partial<User>[]) => {
  return axiosInstance.post("/api/users/send-mail", { users }) as any;
};
