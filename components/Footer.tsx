"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "./LangContext";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B2A] border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display font-bold text-2xl text-white">
            Rahnya<span className="text-[#FF3B8D]">.</span>
            </span>
            <p className="mt-3 text-white/40 text-sm font-body leading-relaxed">
              Developer & Interface Designer.<br />Building at the intersection of code and craft.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200">
                <span className="text-xs font-bold">Be</span>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-xs text-[#FF3B8D] uppercase tracking-widest mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: t.nav.home },
                { href: "/projects", label: t.nav.projects },
                { href: "/lab", label: t.nav.lab },
                { href: "/appearances", label: t.nav.appearances },
                { href: "/contact", label: t.nav.contact },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200 w-fit">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Extra */}
          <div>
            <p className="font-mono text-xs text-[#FF3B8D] uppercase tracking-widest mb-4">Downloads</p>
            <div className="flex flex-col gap-2">
              <a href="/cv/cv.pdf" download
                className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1 group w-fit">
                {t.nav.cv}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 translate-x-0.5 group-hover:translate-x-0 transition-all duration-200" />
              </a>
              <Link href="/recommendations"
                className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1 group w-fit">
                {t.nav.recommendations}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/25">
            Crafted by Rahnya Lanyeri — © {year} {t.footer.rights}
          </p>
          <p className="font-mono text-xs text-white/20">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
