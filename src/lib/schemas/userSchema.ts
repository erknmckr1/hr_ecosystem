import { z } from "zod";
export const userSchema = z.object({
  id_dec: z.string().optional(),
  id_hex: z.string().min(1, "Hex ID boş bırakılamaz"),
  //short_name: z.string().min(2, "Kısa Ad gerekli"),
  gender: z.string().min(1, "Cinsiyet seçilmelidir."),
  op_name: z.string().min(1, "Kullanıcı adı gerekli.").optional(),
  op_username: z.string().min(3, "Ad Soyad gerekli"),
  op_password: z.string().min(6, "Şifre en az 6 karakter olmalı").optional(),
  //e_mail: z.string().email("Geçerli bir e-mail giriniz.").optional(),
  title: z.string().min(1, "Ünvan seçilmelidir."),
  part: z.string().min(1, "Birim seçilmelidir."),
  op_section: z.string().min(1, "Departman seçilmelidir."),
  roleId: z.coerce.number().int().min(1, "Rol seçilmelidir."),
  is_admin: z.coerce.number().int().min(0).max(1),
  is_active: z.coerce.number().int().min(0).max(1),
  is_approver: z.coerce.number().int().min(0).max(1),
  address: z.string().min(1, "Adres zorunludur.").optional(),
  //route: z.string().min(1, "Rota zorunludur.").optional(),
  //stop_name: z.string().min(1, "Durak adı zorunludur.").optional(),
  //shift_validator: z.string().min(1, "Vardiya sorumlusu seçilmelidir."),
  auth1: z.string().min(1, "Yetki 1 zorunludur."),
  auth2: z.string().min(1, "Yetki 2 zorunludur."),
  izin_bakiye: z.coerce.number().nonnegative("İzin bakiyesi negatif olamaz"),
});

export type UserFormSchema = z.infer<typeof userSchema>;

//rota, e mail, durak, mesai onaylayıcı zorunlu değil