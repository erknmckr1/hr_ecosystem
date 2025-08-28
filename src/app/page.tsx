"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
function page() {
  const { data: session } = useSession();
  return <div>anasayfa</div>;
}

export default page;
