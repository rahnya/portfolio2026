"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Récupère le thème actuel du DOM
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = theme === "dark" ? "light" : "dark";

    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  if (!mounted) return null; // Évite hydration mismatch

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full dark:border-white/10 hover:bg-gray-100/10 dark:hover:bg-white/5 transition-colors"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-[#FF6B35]" />
      ) : (
        <Moon className="w-5 h-5 text-text-primary/30" />
      )}
    </button>
  );
}