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
      className="p-2 rounded-full border border-transparent hover:border-text-primary/10 dark:hover:border-white/10 hover:bg-text-primary/5 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink"
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-text-primary/60" aria-hidden="true" />
      )}
    </button>
  );
}