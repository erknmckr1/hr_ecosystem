"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";

export default function SessionTimeoutHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;


  const timer = setTimeout(() => {
      toast.error("Oturumunuz sonlandırıldı."); 
      // 1.5 saniye bekleyip yönlendir
      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 1500);
    }, 15 * 60 * 1000); // 15 dakika

    return () => clearTimeout(timer);
  }, [session]);

  return null;
}