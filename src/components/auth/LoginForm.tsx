"use client";

import * as z from "zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { toast } from "sonner";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  id_dec: z
    .string()
    .min(1, "ID zorunludur")
    .regex(/^\d+$/, "Sadece rakam kullanın"),
  password: z.string().min(1, "Şifre zorunludur"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { id_dec: "", password: "" },
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      id_dec: values.id_dec,
      password: values.password,
      callbackUrl,
    });
    setLoading(false);

    if (res?.error) {
      toast.error("Giriş başarısız. ID veya şifre hatalı.");
      return;
    }
    toast.success("Hoş geldiniz!");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Oturum Aç</CardTitle>
        <CardDescription>Devam etmek için bilgilerinizi girin.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id_dec"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID (Decimal)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Örn: 123456"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Yetkiniz yoksa yöneticinizle iletişime geçin.
      </CardFooter>
    </Card>
  );
}
