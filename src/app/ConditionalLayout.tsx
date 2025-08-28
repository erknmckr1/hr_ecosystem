"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSession} from "next-auth/react";
import SessionTimeoutHandler from "@/components/sessiontimeouthandler";

  
function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  console.log(pathName);
  const session = useSession()
  console.log(session.data)
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
        <SessionTimeoutHandler />
      </div>{" "}
    </div>
  );
}

export default ConditionalLayout;
