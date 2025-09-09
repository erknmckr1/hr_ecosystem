import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ConfirmSendMail } from "./MailSendAlert";
import { Button } from "@/components/ui/button";
type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClearSelected?: () => void;
  onSendMail: () => void;
};

function SearchBar({
  value,
  onChange,
  onClearSelected,
  onSendMail,
}: SearchBarProps) {
  return (
    <div className="flex justify-between py-2 border-b">
      <div className="h-10 relative w-40">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ara..."
          className="pl-8"
        />
        <Search
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          size={16}
        />
      </div>
      <div className="space-x-3">
        <Button onClick={onClearSelected}>Seçilenleri Temizle</Button>
        <ConfirmSendMail onConfirm={onSendMail} />
      </div>
    </div>
  );
}

export default SearchBar;
