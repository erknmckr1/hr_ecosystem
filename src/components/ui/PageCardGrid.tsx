"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

export function PageCardGrid({ pages, iconMap = {} }: Props) {
  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {pages.map((page) => (
        <Link key={page.id} 
          href={page.href}
          target="_blank"
          rel="noopener noreferrer"
          >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition overflow-hidden">
              {/* İkon */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 8,
                }}
                className="flex flex-col items-center py-6"
              >
                {iconMap[page.label]}
              </motion.div>

              {/* İçerik */}
              <CardHeader>
                <CardTitle className="text-lg">{page.label}</CardTitle>
                <CardDescription>{page.desc}</CardDescription>
              </CardHeader>

              {/* Footer */}
              <div className="px-6 pb-4">
                <span className="text-primary text-sm font-medium">Git →</span>
              </div>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
