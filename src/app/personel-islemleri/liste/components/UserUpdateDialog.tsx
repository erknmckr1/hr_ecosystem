import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sections, sectionParts, titles } from "@/lib/data/staticData";
import { User } from "@/services/users";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  formData: User | null;
  onChange: (field: keyof User, value: any) => void;
  onSave: () => void;
};

export default function UserUpdateDialog({
  isOpen,
  onClose,
  formData,
  onChange,
  onSave,
}: Props) {
  if (!formData) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personel Bilgilerini Güncelle</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Label className="block text-sm font-medium">Ad Soyad</Label>
          <Input
            type="text"
            value={formData.op_name || ""}
            onChange={(e) => onChange("op_name", e.target.value)}
          />

          <Label className="block text-sm font-medium">Kullanıcı Adı</Label>
          <Input
            type="text"
            value={formData.op_username || ""}
            onChange={(e) => onChange("op_username", e.target.value)}
          />

          <Label className="block text-sm font-medium">E-Posta</Label>
          <Input
            type="email"
            value={formData.e_mail || ""}
            onChange={(e) => onChange("e_mail", e.target.value)}
          />
          <Label className="block text-sm font-medium">1. Onaylayıcı</Label>
          <Input
            type="text"
            value={formData.auth1 || ""}
            onChange={(e) => onChange("auth1", e.target.value)}
          />
          <Label className="block text-sm font-medium">2. Onaylayıcı</Label>
          <Input
            type="text"
            value={formData.auth2 || ""}
            onChange={(e) => onChange("auth2", e.target.value)}
          />

          <Label className="block text-sm font-medium">Bölüm</Label>
          <select
            value={formData.op_section || ""}
            onChange={(e) => onChange("op_section", e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Seçiniz</option>
            {sections.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <Label className="block text-sm font-medium">Part</Label>
          <select
            value={formData.part || ""}
            onChange={(e) => onChange("part", e.target.value)}
            className="w-full border px-2 py-1 rounded"
            disabled={!formData.op_section}
          >
            <option value="">Seçiniz</option>
            {sectionParts
              .find((sp) => sp.section === formData.op_section)
              ?.parts.map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
          </select>

          <Label className="block text-sm font-medium">Ünvan</Label>
          <select
            value={formData.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Seçiniz</option>
            {titles.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>

          <Label className="block text-sm font-medium">Adres</Label>
          <Input
            type="text"
            value={formData.address || ""}
            onChange={(e) => onChange("address", e.target.value)}
          />

          <Label className="block text-sm font-medium">Rota</Label>
          <Input
            type="text"
            value={formData.route || ""}
            onChange={(e) => onChange("route", e.target.value)}
          />

          <Label className="block text-sm font-medium">Durak</Label>
          <Input
            type="text"
            value={formData.stop_name || ""}
            onChange={(e) => onChange("stop_name", e.target.value)}
          />

          <Label className="block text-sm font-medium">İzin Bakiye</Label>
          <Input
            type="number"
            value={formData.izin_bakiye || ""}
            onChange={(e) => onChange("izin_bakiye", Number(e.target.value))}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Kapat
          </Button>
          <AlertDialog>
            {/* ✅ Kaydet butonunu trigger yaptık */}
            <AlertDialogTrigger asChild>
              <Button>Kaydet</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Değişiklikleri kaydetmek istediğinize emin misiniz?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                <AlertDialogAction onClick={onSave}>
                  Evet, Kaydet
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
