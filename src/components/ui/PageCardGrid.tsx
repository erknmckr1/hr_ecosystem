"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

export function PageCardGrid({ pages, iconMap = {}, onCopy }: Props) {
  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {pages.map((page) => (
        <motion.div
          key={page.id}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Card className="hover:shadow-lg transition overflow-hidden flex flex-col justify-between">
            {/* İkon */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 8 }}
              className="flex flex-col items-center py-6"
            >
              {iconMap[page.label]}
            </motion.div>

            {/* İçerik */}
            <CardHeader>
              <CardTitle className="text-lg">{page.label}</CardTitle>
              <CardDescription>{page.desc}</CardDescription>
            </CardHeader>

            {/* Footer (Git ve Kopyala yan yana) */}
            <div className="px-6 pb-4 flex items-center justify-between">
              <Link
                href={page.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-medium hover:underline"
              >
                Git →
              </Link>

              <button
                onClick={() => onCopy?.(page.href)}
                className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition"
                title="Bağlantıyı kopyala"
              >
                <Copy size={18} />
              </button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
