"use client";

import Link from "next/link";

type Page = {
  id: string;
  label: string;
  href: string;
  desc: string;
};

type Props = {
  pages: Page[];
  iconMap?: Record<string, React.ReactNode>;
};

export function PageList({ pages, iconMap = {} }: Props) {
  return (
    <ul className="space-y-2">
      {pages.map((page) => (
        <li key={page.id}>
          <Link
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 rounded-md border hover:bg-primary/10 hover:text-primary transition"
          >
            <div className="flex items-center gap-2 font-medium">
              {iconMap[page.label]}
              {page.label}
            </div>
            <div className="text-sm text-muted-foreground">{page.desc}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
