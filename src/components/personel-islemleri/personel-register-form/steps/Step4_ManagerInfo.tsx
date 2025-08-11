import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
function Step4_ManagerInfo() {
  const form = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onaylayıcı Bilgileri</CardTitle>
        <CardDescription>
          Bu adımda personelin izin onaylayıcılarını seçin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="auth1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1. Onaylayıcı</FormLabel>
                <FormControl>
                  <Input placeholder="1. Onaylayıcı" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="auth2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2. Onaylayıcı</FormLabel>
                <FormControl>
                  <Input placeholder="2. Onaylayıcı" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Role Seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Role 1">Role 1</SelectItem>
                    <SelectItem value="Role 2">Role 2</SelectItem>
                    <SelectItem value="Role 3">Role 3</SelectItem>
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

export default Step4_ManagerInfo;
