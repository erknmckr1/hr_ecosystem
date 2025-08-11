// Doldurulması gereken alanlar ve adımların yapılandırması
export const personelFormConfig = [
  {
    id: 1,
    title: "Temel Kimlik Bilgileri",
    fields: ["id_dec,id_hex,short_name,gender,op_name,op_username,op_password"],
    skippable: true,
    component: "Step1_IdInformation",
  },
  {
    id: 2,
    title: "İletişim & Adres Bilgileri",
    fields: ["address,email,route,stop_name"],
    skippable: true,
    component: "Step2_AddressInfo",
  },
  {
    id: 3,
    title: "İş & Rol Bilgileri",
    fields: [
      "part",
      "op_section",
      "is_admin",
      "is_active",
      "is_approver",
      "shift_validator",
      "title",
    ],
    skippable: true,
    component: "Step3_RoleInfo",
  },
  {
    id: 4,
    title: "Yetkilendirme & İzin Bilgileri",
    fields: ["auth1", "auth2", "izin_bakiye","roleId"],
    skippable: true,
    component: "Step4_ManagerInfo",
  },
];
