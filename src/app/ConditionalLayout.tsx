"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

  
function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
 

  if (pathName === "/login") {
    return (
      <main className="w-screen h-screen flex justify-center items-center">
        {children}
      </main>
    );
  }
  return (
    <div className="min-h-dvh flex">
      {" "}
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <main className="min-h-[calc(100vh-80px)]  ">{children}</main>
      </div>{" "}
    </div>
  );
}

export default ConditionalLayout;
