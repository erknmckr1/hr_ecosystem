"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";
function UseTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const thm = localStorage.getItem("theme") as Theme | null;
    if (thm === "dark" || thm === "light") {
      setTheme(thm);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}

export default UseTheme;
