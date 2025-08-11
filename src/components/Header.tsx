"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import UseTheme from "./UseTheme";
import { Button } from "./ui/button";

function Header() {
  const { theme, toggleTheme, setTheme } = UseTheme();
  return (
    <div className="h-20 w-full bg-muted sticky top-0 shrink-0">
      <div className=" w-full h-full flex justify-between items-center px-4">
        <div></div>
        <div></div>
        <Button
          className="p-2 border border-border hover:bg-muted"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>
    </div>
  );
}

export default Header;
