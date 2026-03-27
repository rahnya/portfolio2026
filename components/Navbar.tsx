"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangContext";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { trackEvent } from "@/utils/trackEvent"
import ThemeToggle from "@/components/ThemeToggle";

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.483 1.953 1.944 1.953.599 0 1.172-.246 1.38-.76h2.432zm-5.101-7.5c-1.313 0-2.141.7-2.304 2h4.404c-.057-.982-.686-2-2.1-2zM9 14H5.67v1.98H9c1.087 0 1.752-.482 1.752-1.037C10.752 14.393 10.085 14 9 14zm.667-3.33c0-.47-.333-.87-1.182-.87H5.67V11.2h2.726c.832 0 1.271-.34 1.271-.868v-.662zM3 19h6.386c2.47 0 3.814-1.329 3.814-3.35 0-1.513-.878-2.64-2.22-3.002C12.046 12.12 12.764 11.1 12.764 9.7c0-2.01-1.353-3.7-3.804-3.7H3v13z"/>
  </svg>
);

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/projects", label: t.nav.projects },
    { href: "/lab", label: t.nav.lab },
    { href: "/appearances", label: t.nav.appearances },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0D1B2A]/90 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Rahnya<span className="text-[#FF3B8D]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm transition-all duration-200 ${
                isActive(link.href)
                  ? "text-[#FF3B8D]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social icons */}
          <a href="https://github.com/rahnya" target="_blank" rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-200"
            onClick={() => trackEvent("open_github", "engagement", "navbar")}>
            <Github className="w-4 h-4" />
          </a>
          <a href="www.linkedin.com/in/rahnya-lanyeri" target="_blank" rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-200"
            onClick={() => trackEvent("open_linkedin", "engagement", "navbar")}>
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://www.behance.net/rahnya_lanyeri" target="_blank" rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-200"
            onClick={() => trackEvent("open_behance", "engagement", "navbar")}>
            <BehanceIcon />
          </a>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10" />

          {/* Lang switcher */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full px-1 py-1 border border-white/10">
            <button onClick={() => setLang("en")} className={`font-mono text-xs px-2 py-0.5 rounded-full transition-all duration-200 ${
                lang === "en" ? "bg-[#FF3B8D] text-white" : "text-white/50 hover:text-white"
              }`} > EN </button>
            <button onClick={() => setLang("fr")} className={`font-mono text-xs px-2 py-0.5 rounded-full transition-all duration-200 ${
                lang === "fr" ? "bg-[#FF3B8D] text-white" : "text-white/50 hover:text-white" }`} > FR </button>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0D1B2A]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-body text-base transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-[#FF3B8D]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <a href="  https://github.com/rahnya" target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors duration-200"
                onClick={() => trackEvent("open_github", "engagement", "navbar")}>
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/rahnya-lanyeri" target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors duration-200"
                onClick={() => trackEvent("open_linkedin", "engagement", "navbar")}>
                <Linkedin className="w-5 h-5" />
              </a>
              <div className="ml-auto flex items-center gap-1 bg-white/5 rounded-full px-1 py-1 border border-white/10">
                <button onClick={() => setLang("en")}
                  className={`font-mono text-xs px-2 py-0.5 rounded-full transition-all duration-200 ${lang === "en" ? "bg-[#FF3B8D] text-white" : "text-white/50"}`}>
                  EN
                </button>
                <button onClick={() => setLang("fr")}
                  className={`font-mono text-xs px-2 py-0.5 rounded-full transition-all duration-200 ${lang === "fr" ? "bg-[#FF3B8D] text-white" : "text-white/50"}`}>
                  FR
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
