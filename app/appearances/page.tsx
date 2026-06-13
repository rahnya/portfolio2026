"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import appearancesData from "@/data/appearances.json";
import { ArrowUpRight, Mic, Youtube, BookOpen, Award, Monitor } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  article: <BookOpen className="w-4 h-4" aria-hidden="true" />,
  event: <Award className="w-4 h-4" aria-hidden="true" />,
  video: <Youtube className="w-4 h-4" aria-hidden="true" />,
  podcast: <Mic className="w-4 h-4" aria-hidden="true" />,
  installation: <Monitor className="w-4 h-4" aria-hidden="true" />,
};

// Palette charte unifiée (studio pour dark, sunset pour light)
// On garde une teinte par type, mais sobre.
const typeAccent: Record<string, string> = {
  article: "#FF96B3",
  event: "#FFC72C",
  video: "#FF96B3",
  podcast: "#7B638A",
  installation: "#C9A9DC",
};

// Cards : un fond uniforme par mode (marron transparent en light, navy en dark)
// Le coloris d'accent vient juste du badge type.
export default function AppearancesPage() {
  const { t, lang } = useLang();

  const heights = ["h-72", "h-80", "h-64", "h-96", "h-72", "h-80"];

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-4">
            — Press & Media
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-text-primary dark:text-white mb-4">
            {t.appearances.title}
          </h1>
          <p className="font-body text-text-secondary dark:text-white/70 text-lg max-w-2xl">
            {t.appearances.subtitle}
          </p>
        </header>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {appearancesData.map((item, i) => {
            const a = item[lang as "en" | "fr"];
            const accent = typeAccent[item.type] || "#FF96B3";
            const h = heights[i % heights.length];

            return (
              <Link
                key={item.slug}
                href={`/appearances/${item.slug}`}
                aria-label={a.title}
                className={`card-hover group block break-inside-avoid rounded-2xl overflow-hidden border border-text-primary/10 dark:border-white/10 hover:border-text-primary/25 dark:hover:border-white/25 relative ${h} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink`}
              >
                {/* Base background — marron transparent en light, navy en dark */}
                <div className="absolute inset-0 bg-text-primary/15 dark:bg-[#183153]/60" aria-hidden="true" />

                {/* Soft accent halo (always visible, intensifies on hover) */}
                <div
                  className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 40% 60%, ${accent}30 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Subtle diagonal pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, ${accent} 0, ${accent} 1px, transparent 0, transparent 50%)`,
                    backgroundSize: "12px 12px",
                  }}
                  aria-hidden="true"
                />

                {/* Bottom readability scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent dark:from-deep-dark dark:via-deep-dark/40 dark:to-transparent" aria-hidden="true" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Type badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full w-fit text-white"
                    style={{ backgroundColor: `${accent}66`, border: `1px solid ${accent}` }}
                  >
                    {typeIcons[item.type]}
                    <span className="font-bebas text-[10px] uppercase tracking-wider">{item.type}</span>
                  </div>

                  {/* Bottom */}
                  <div>
                    <h2 className="font-display text-lg text-white mb-2 group-hover:text-white transition-colors duration-300">
                      {a.title}
                    </h2>
                    <p className="font-body text-xs text-white/80 line-clamp-2 leading-relaxed">
                      {a.description}
                    </p>
                    <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-bebas text-xs text-white">
                        {t.appearances.view}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
