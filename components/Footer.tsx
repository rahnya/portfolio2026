"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { ArrowUpRight, Github, Linkedin, Globe, Mail } from "lucide-react";

export default function Footer() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 pb-8 pt-20 border-t border-text-primary/10 dark:border-white/8" role="contentinfo">
      <div className="max-w-[1400px] mx-auto">
        {/* Top : Quote éditoriale + email géant */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="font-body text-2xl md:text-3xl text-text-primary dark:text-white leading-snug max-w-xl">
              <span className="italic text-text-secondary dark:text-white/70">« </span>
              {L(
                "Coder ce que j'ai dessiné, écrire ce que j'ai conçu, vendre ce que j'ai produit.",
                "Coding what I've drawn, writing what I've designed, selling what I've built."
              )}
              <span className="italic text-text-secondary dark:text-white/70"> »</span>
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col lg:items-end lg:justify-between gap-4">
            <a href="mailto:rahnyapro@gmail.com" className="group inline-flex items-baseline gap-2 font-display text-2xl md:text-3xl text-text-primary dark:text-white">
              rahnyapro@gmail.com
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <div className="flex flex-wrap items-center gap-3 font-body text-sm">
              <Link href="/contact" className="text-text-primary dark:text-white underline underline-offset-4 hover:opacity-70">{L("Formulaire","Form")}</Link>
              <span className="text-text-muted dark:text-white/35">·</span>
              <a href="https://www.linkedin.com/in/rahnya-lanyeri" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white">
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" /> LinkedIn
              </a>
              <a href="https://github.com/rahnya" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white">
                <Github className="w-3.5 h-3.5" aria-hidden="true" /> GitHub
              </a>
              <a href="https://www.behance.net/rahnya_lanyeri" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" /> Behance
              </a>
            </div>
          </div>
        </div>

        {/* 4 colonnes nav */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-8 border-t border-b border-text-primary/10 dark:border-white/8 py-10">
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-text-secondary dark:text-white/60 mb-4">{L("Naviguer","Navigate")}</p>
            <ul className="space-y-2 font-body text-sm">
              <li><Link href="/projects" className="text-text-primary dark:text-white/85 hover:opacity-70">{L("Travaux","Work")}</Link></li>
              <li><Link href="/competences" className="text-text-primary dark:text-white/85 hover:opacity-70">{L("Parcours","Journey")}</Link></li>
              <li><Link href="/pepite" className="text-text-primary dark:text-white/85 hover:opacity-70">Pépite</Link></li>
              <li><Link href="/lab" className="text-text-primary dark:text-white/85 hover:opacity-70">Lab</Link></li>
              <li><Link href="/appearances" className="text-text-primary dark:text-white/85 hover:opacity-70">{L("Presse","Press")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-text-secondary dark:text-white/60 mb-4">Ventures</p>
            <ul className="space-y-2 font-body text-sm">
              <li><Link href="/pepite" className="text-text-primary dark:text-white/85 hover:opacity-70">Snoozly</Link></li>
              <li>
                <a href="https://rahnya-studio.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-text-primary dark:text-white/85 hover:opacity-70">
                  Rahnya Studio <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-text-secondary dark:text-white/60 mb-4">Extras</p>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <a href="/lab/labyrinthe.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-text-primary dark:text-white/85 hover:opacity-70">
                  {L("Portfolio 3D","3D Portfolio")} <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li><a href="/cv/CV_Rahnya.pdf" download className="text-text-primary dark:text-white/85 hover:opacity-70">{L("Télécharger CV","Download CV")}</a></li>
              <li><Link href="/recommendations" className="text-text-primary dark:text-white/85 hover:opacity-70">{L("Recommandations","Recommendations")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-text-secondary dark:text-white/60 mb-4">{L("Contact","Contact")}</p>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <a href="mailto:rahnyapro@gmail.com" className="inline-flex items-center gap-1 text-text-primary dark:text-white/85 hover:opacity-70">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-text-secondary dark:text-white/55 font-body text-xs">
          <p>© {year} Rahnya Lanyeri · France</p>
          <p className="italic">{L("Conçu et codé à la maison.","Designed and coded at home.")}</p>
        </div>
      </div>
    </footer>
  );
}
