"use client";

import Link from "next/link";
import { Copy } from "lucide-react";

type Page = {
  id: string;
  label: string;
  href: string;
  desc: string;
};

type Props = {
  pages: Page[];
  iconMap?: Record<string, React.ReactNode>;
  onCopy?: (url: string) => void;
};

export function PageList({ pages, iconMap = {}, onCopy }: Props) {
  return (
    <ul className="space-y-2">
      {pages.map((page) => (
        <li
          key={page.id}
          className="flex items-center justify-between px-4 py-3 rounded-md border hover:bg-primary/10 transition"
        >
          {/* Sol taraf (ikon + içerik) */}
          <div>
            <div className="flex items-center gap-2 font-medium">
              {iconMap[page.label]}
              <Link
                href={page.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {page.label}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">{page.desc}</div>
          </div>

          {/* Sağ taraf (kopyalama butonu) */}
          <button
            onClick={() => onCopy?.(page.href)}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition"
            title="Bağlantıyı kopyala"
          >
            <Copy size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}

