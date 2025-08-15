// src/app/layout.tsx
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-dvh flex">
        <Sidebar />
        <div className="flex-1 ">
          <Header />
          <main className="min-h-[calc(100vh-80px)]  ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
