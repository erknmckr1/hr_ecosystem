import React, { useMemo } from "react";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sections } from "@/lib/data/staticData";
import { sectionParts } from "@/lib/data/staticData";
import { useFormContext, useWatch } from "react-hook-form";
function Step3_RoleInfo() {
  const form = useFormContext();
  const selectedSection = useWatch({
    control: form.control,
    name: "op_section",
  });

  const filteredParts = useMemo(() => {
    const sectionObj = sectionParts.find((s) => s.section === selectedSection);
    return sectionObj ? sectionObj.parts : [];
  }, [selectedSection]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Bilgileri</CardTitle>
        <CardDescription>
          Bu adımda personelin role bilgilerini girin.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* section */}
          <FormField
            control={form.control}
            name="op_section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bölüm</FormLabel>
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
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.name}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* part */}
          <FormField
            control={form.control}
            name="part"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birim</FormLabel>
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
                    {filteredParts.map((part) => (
                      <SelectItem value={part} key={part}>
                        {part}
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
            name="shift_validator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mesai Onaylayıcı</FormLabel>
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
                    <SelectItem value="Bölüm1">Onaylayıcı 1</SelectItem>
                    <SelectItem value="Bölüm2">Onaylayıcı 2</SelectItem>
                    <SelectItem value="Bölüm3">Onaylayıcı 3</SelectItem>
                    <SelectItem value="Bölüm4">Onaylayıcı 4</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Step3_RoleInfo;
