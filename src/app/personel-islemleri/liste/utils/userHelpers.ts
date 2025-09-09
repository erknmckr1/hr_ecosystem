// utils/userHelpers.ts
import { User } from "@/services/users";


export const normalizeText = (text: string) =>
  text?.toLocaleLowerCase("tr").replace(/\s+/g, " ").trim();

export const sortUsersBySelection = (users: User[], selected: User[]) => {
  return [...users].sort((a, b) => {
    const aSelected = selected.some((u) => u.id_dec === a.id_dec);
    const bSelected = selected.some((u) => u.id_dec === b.id_dec);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });
};
