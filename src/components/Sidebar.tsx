"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, User } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const groups = [
  {
    type: "link",
    label: "Ana Sayfa",
    href: "/",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    type: "group",
    id: "personel",
    label: "Personel İşlemleri",
    icon: <User className="w-5 h-5" />,
    items: [
      { label: "Personel Kayıt", href: "/personel-islemleri/kayit" },
      { label: "Personel Güncelle", href: "/personel-islemleri/guncelle" },
      { label: "Personel Listesi", href: "/personel-islemleri" },
    ],
  },
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  const defaultOpen = pathname.startsWith("/personelislem")
    ? "personel"
    : undefined;

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 border-r bg-muted text-muted-foreground transition-all duration-300 w-[72px] lg:w-[240px] p-4"
      )}
    >
      <nav className="flex flex-col gap-2 items-center lg:items-start">
        <div className="w-10 h-10 bg-black rounded-full mb-4" />
        <span className="text-sm font-medium hidden lg:inline mb-4">Erkan</span>

        {/* Düz linkler */}
        {groups
          .filter((g) => g.type === "link")
          .map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full justify-center lg:justify-start hover:bg-primary/10 hover:text-primary",
                pathname === g.href && "bg-accent text-primary font-medium"
              )}
            >
              {g.icon}
              <span className="hidden lg:inline">{g.label}</span>
            </Link>
          ))}

        {/* Gruplu (nested) menüler */}
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultOpen}
          className="w-full"
        >
          {groups
            .filter((g) => g.type === "group")
            .map((g) => (
              <AccordionItem key={g.id} value={g.id} className="border-none">
                <AccordionTrigger className="justify-center lg:justify-between px-3 py-2 rounded-md hover:no-underline hover:bg-primary/10 hover:text-primary">
                  <div className="flex items-center gap-3">
                    {g.icon}
                    <span className="hidden lg:inline">{g.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="mt-1 pl-0 lg:pl-9 space-y-1">
                    {g.items.map((it) => {
                      const active = pathname === it.href;
                      return (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary",
                              active && "bg-accent text-primary font-medium"
                            )}
                          >
                            <span className="hidden lg:inline">{it.label}</span>
                            <span className="lg:hidden">•</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </nav>
    </aside>
  );
}
