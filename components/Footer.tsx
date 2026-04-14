"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "./LangContext";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/utils/trackEvent";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white/70 dark:bg-deep-dark border-t border-text-primary/8 dark:border-white/5 py-16 px-6 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl text-text-primary dark:text-white">
              Rahnya<span className="text-sunset-orange dark:text-pink">.</span>
            </span>
            <p className="mt-3 text-text-muted dark:text-white/40 text-sm font-body leading-relaxed">
              Developer & Interface Designer.
              <br />
              Building at the intersection of code and craft.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/rahnya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-text-primary/10 dark:border-white/10 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:border-text-primary/30 dark:hover:border-white/30 transition-all duration-200"
                onClick={() => trackEvent("open_github", "engagement", "footer")}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/rahnya-lanyeri/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-text-primary/10 dark:border-white/10 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:border-text-primary/30 dark:hover:border-white/30 transition-all duration-200"
                onClick={() => trackEvent("open_linkedin", "engagement", "footer")}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.behance.net/rahnya_lanyeri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-text-primary/10 dark:border-white/10 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:border-text-primary/30 dark:hover:border-white/30 transition-all duration-200"
                onClick={() => trackEvent("open_behance", "engagement", "footer")}
              >
                <span className="text-xs font-bold">Be</span>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-bebas text-xs text-sunset-orange dark:text-pink uppercase tracking-widest mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: t.nav.home },
                { href: "/projects", label: t.nav.projects },
                { href: "/lab", label: t.nav.lab },
                { href: "/appearances", label: t.nav.appearances },
                { href: "/contact", label: t.nav.contact },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Extra */}
          <div>
            <p className="font-bebas text-xs text-sunset-orange dark:text-pink uppercase tracking-widest mb-4">
              Downloads
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="/cv/CV_Rahnya.pdf"
                download
                className="font-body text-sm text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors duration-200 flex items-center gap-1 group w-fit"
                onClick={() => trackEvent("open_cv", "engagement", "footer")}
              >
                {t.nav.cv}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 translate-x-0.5 group-hover:translate-x-0 transition-all duration-200" />
              </a>
              <Link
                href="/recommendations"
                className="font-body text-sm text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors duration-200 flex items-center gap-1 group w-fit"
                onClick={() => trackEvent("open_recommendations", "engagement", "footer")}
              >
                {t.nav.recommendations}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-text-primary/8 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-text-muted dark:text-white/25">
            Crafted by Rahnya Lanyeri — © {year} {t.footer.rights}
          </p>
          <p className="font-bebas text-xs text-text-muted/60 dark:text-white/20">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}