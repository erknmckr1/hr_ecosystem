"use client";

import { useFormContext } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { titles } from "@/data/staticData";

function Step1_IdInformation() {
  const form = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temel Kimlik Bilgileri</CardTitle>
        <CardDescription>
          Bu adımda personelin temel kimlik ve hesap bilgilerini girin.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id_dec"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID (Decimal)</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Otomatik/Manuel ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id_hex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID (Hex)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Hex ID"
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const hexValue = field.value?.trim();
                        if (hexValue) {
                          const decValue = parseInt(hexValue, 16);
                          if (!isNaN(decValue)) {
                            form.setValue("id_dec", decValue.toString());
                          }
                        }
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="short_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kısa Ad</FormLabel>
                <FormControl>
                  <Input placeholder="Kısa Ad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ünvan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {titles.map((title) => (
                      <SelectItem key={title.id} value={title.name}>
                        {title.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cinsiyet</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Erkek</SelectItem>
                    <SelectItem value="female">Kadın</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="op_username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Soyad</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ad Soyad"
                    {...field}
                    onChange={(e) => {
                      const fullName = e.target.value;
                      field.onChange(fullName); // form state'e yaz react-hook-form bu inputta op_username alanını kontrol ediyor
                      // id_hex değerini al ve son 4 karakterini ekle
                      const idHexValue = form.getValues("id_hex") || "";
                      const last4Hex = idHexValue.slice(-4);

                      // Türkçe karakterleri normalleştir
                      const normalize = (str: string) =>
                        str
                          .toLowerCase()
                          .replace(/ç/g, "c")
                          .replace(/ğ/g, "g")
                          .replace(/ı/g, "i")
                          .replace(/ö/g, "o")
                          .replace(/ş/g, "s")
                          .replace(/ü/g, "u");

                      const parts = fullName.trim().split(/\s+/); // boşluklardan böl
                      if (parts.length >= 2) {
                        const firstLetter = normalize(parts[0][0] || "");
                        const lastName = normalize(
                          parts[parts.length - 1] || ""
                        );
                        form.setValue("op_name", `${firstLetter}${lastName}`);
                        form.setValue(
                          "op_password",
                          `${firstLetter}${lastName}${last4Hex}`
                        );
                      } else {
                        form.setValue("op_name", "");
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="op_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Kullanıcı Adı" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="op_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled
                    placeholder="Şifre"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Step1_IdInformation;
