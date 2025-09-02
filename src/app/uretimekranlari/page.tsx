"use client";

import { useState } from "react";
import { pages } from "@/lib/data/staticData";
import { SearchBar} from "@/components/ui/SearchBar";
import { PageList } from "@/components/ui/PageList";
import { PageCardGrid } from "@/components/ui/PageCardGrid";

import {
  House,
  Scissors,
  LinkSimple,
  CheckCircle,
  Calendar,
  Gear,
  Sparkle,
} from "phosphor-react";

type Page = {
  id: string;
  label: string;
  href: string;
  icon: string;
  desc: string;
};

const iconMap: Record<string, React.ReactNode> = {
  "Ana Sayfa": <House size={28} weight="duotone" className="text-primary" />,
  "Kuru Tıraş": <Scissors size={28} weight="duotone" className="text-primary" />,
  "Tel Çekme Ekranı": <LinkSimple size={28} weight="duotone" className="text-purple-800" />,
  "Kalite Kontrol Ekranı": <CheckCircle size={28} weight="duotone" className="text-green-600" />,
  İzin: <Calendar size={28} weight="duotone" className="text-blue-600" />,
  Taslama: <Gear size={28} weight="duotone" className="text-orange-600" />,
  Cila: <Sparkle size={28} weight="duotone" className="text-yellow-500" />,
};

export default function UretimIslemleriPage() {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [search, setSearch] = useState("");

  const filteredPages = pages.filter(
    (p: Page) =>
      p.label.toLocaleLowerCase("tr").includes(search.toLocaleLowerCase("tr")) ||
      p.desc.toLocaleLowerCase("tr").includes(search.toLocaleLowerCase("tr"))
  );

  return (
    <div className="p-6 space-y-6">
 
      <div className="flex items-center justify-between border-b pb-3">
        <SearchBar value={search} onChange={setSearch} />

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-2 rounded-md text-sm ${viewMode === "list" ? "bg-primary text-white" : "border"}`}
          >
            Liste Görünümü
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-3 py-2 rounded-md text-sm ${viewMode === "card" ? "bg-primary text-white" : "border"}`}
          >
            Kart Görünümü
          </button>
        </div>
      </div>

    
      {viewMode === "list" ? (
        <PageList pages={filteredPages} iconMap={iconMap} />
      ) : (
        <PageCardGrid pages={filteredPages} iconMap={iconMap} />
      )}
    </div>
  );
}
