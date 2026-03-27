"use client";
import React from "react";
import { useTheme } from "@/components/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-white/10 dark:border-white/10 hover:bg-white/5 dark:hover:bg-white/5 transition-colors"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-[#FF6B35] dark:text-[#FF3B8D]" />
      ) : (
        <Moon className="w-5 h-5 text-[#FF6B35]" />
      )}
    </button>
  );
}
