import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ConditionalLayout from "./ConditionalLayout";
import { Providers } from "./Provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
