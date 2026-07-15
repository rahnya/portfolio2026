"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLang } from "@/components/LangContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/projects",    label: lang === "fr" ? "Travaux" : "Work" },
    { href: "/competences", label: lang === "fr" ? "Parcours" : "Journey" },
    { href: "/pepite",      label: "Pépite" },
    { href: "/lab",         label: "Lab" },
    { href: "/appearances", label: lang === "fr" ? "Presse" : "Press" },
    { href: "/contact",     label: "Contact" },
  ];

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
      scrolled
        ? "bg-cream/85 dark:bg-deep-dark/85 backdrop-blur-xl border-b border-text-primary/10 dark:border-white/8"
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink rounded">
          <img src="/favicon2.png" alt="" className="w-6 h-6 rounded" />
          <span className="font-display text-xl text-text-primary dark:text-white tracking-tight">
            Rahnya<span className="text-rose dark:text-pink">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" role="navigation" aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link key={link.href} href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink rounded ${
                  active
                    ? "text-text-primary dark:text-white font-medium"
                    : "text-text-secondary dark:text-white/65 hover:text-text-primary dark:hover:text-white"
                }`}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div role="group" aria-label="Language" className="font-body text-xs text-text-secondary dark:text-white/65">
            <button onClick={() => setLang("fr")} aria-pressed={lang === "fr"} className={`px-1.5 py-0.5 rounded transition-colors ${lang === "fr" ? "text-text-primary dark:text-white font-medium" : "hover:text-text-primary dark:hover:text-white"}`}>FR</button>
            <span className="opacity-40 mx-0.5">/</span>
            <button onClick={() => setLang("en")} aria-pressed={lang === "en"} className={`px-1.5 py-0.5 rounded transition-colors ${lang === "en" ? "text-text-primary dark:text-white font-medium" : "hover:text-text-primary dark:hover:text-white"}`}>EN</button>
          </div>
          <ThemeToggle />
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)}
          aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="md:hidden p-2 rounded-md text-text-primary dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" role="navigation" aria-label="Mobile" className="md:hidden border-t border-text-primary/10 dark:border-white/8 bg-cream/95 dark:bg-deep-dark/95 backdrop-blur-xl">
          <nav className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`block px-3 py-3 rounded-lg font-body text-base ${
                isActive(link.href)
                  ? "bg-text-primary/10 dark:bg-white/10 text-text-primary dark:text-white"
                  : "text-text-secondary dark:text-white/75 hover:bg-text-primary/5 dark:hover:bg-white/5"
              }`}>
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between px-3">
              <div role="group" aria-label="Language" className="font-body text-xs text-text-secondary dark:text-white/65">
                <button onClick={() => setLang("fr")} aria-pressed={lang === "fr"} className={`px-2 py-1 rounded ${lang === "fr" ? "text-text-primary dark:text-white font-medium" : ""}`}>FR</button>
                <span className="opacity-40 mx-1">/</span>
                <button onClick={() => setLang("en")} aria-pressed={lang === "en"} className={`px-2 py-1 rounded ${lang === "en" ? "text-text-primary dark:text-white font-medium" : ""}`}>EN</button>
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
