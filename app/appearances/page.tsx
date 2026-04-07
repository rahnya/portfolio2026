"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import appearancesData from "@/data/appearances.json";
import { ArrowUpRight, Mic, Youtube, BookOpen, Award, Monitor } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  article:      <BookOpen className="w-4 h-4" />,
  event:        <Award className="w-4 h-4" />,
  video:        <Youtube className="w-4 h-4" />,
  podcast:      <Mic className="w-4 h-4" />,
  installation: <Monitor className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  article:      "#FF3B8D",
  event:        "#FFC72C",
  video:        "#FF3B8D",
  podcast:      "#8A6F9B",
  installation: "#D0A8BC",
};

// Color patterns for placeholder images
const patternColors = [
  ["#183153", "#FF3B8D"],
  ["#373750", "#FFC72C"],
  ["#183153", "#8A6F9B"],
  ["#0D1B2A", "#D0A8BC"],
  ["#373750", "#FF96B3"],
  ["#183153", "#FFC72C"],
];

export default function AppearancesPage() {
  const { t, lang } = useLang();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#FF6B35] dark:text-[#FF3B8D] uppercase tracking-widest mb-4">
            — Press & Media
          </p>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4">
            {t.appearances.title}
          </h1>
          <p className="font-body text-white/50 text-lg max-w-2xl">
            {t.appearances.subtitle}
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {appearancesData.map((item, i) => {
            const a = item[lang as "en" | "fr"];
            const [bg1, bg2] = patternColors[i % patternColors.length];
            const typeColor = typeColors[item.type] || "#FF3B8D";
            const heights = ["h-72", "h-80", "h-64", "h-96", "h-72", "h-80"];
            const h = heights[i % heights.length];

            return (
              <Link
                key={item.slug}
                href={`/appearances/${item.slug}`}
                className={`card-hover group block break-inside-avoid rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 relative ${h}`}
              >
                {/* Placeholder image — grayscale by default, color on hover */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${bg1} 0%, ${bg2}40 100%)`,
                    filter: "grayscale(1)",
                  }}
                >
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, ${bg2} 0, ${bg2} 1px, transparent 0, transparent 50%)`,
                      backgroundSize: "12px 12px",
                    }}
                  />
                </div>
                {/* Color version shown on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${bg1} 0%, ${bg2}60 100%)`,
                  }}
                >
                  <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-700"
                    style={{
                      background: `radial-gradient(circle at 40% 60%, ${typeColor}30 0%, transparent 60%)`,
                    }}
                  />
                </div>

                {/* Overlay gradient (bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Type badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full w-fit"
                    style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                  >
                    {typeIcons[item.type]}
                    <span className="font-mono text-[10px] uppercase">{item.type}</span>
                  </div>

                  {/* Bottom */}
                  <div>
                    <h2 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#FF96B3] transition-colors duration-300">
                      {a.title}
                    </h2>
                    <p className="font-body text-xs text-white/50 line-clamp-2 leading-relaxed">
                      {a.description}
                    </p>
                    <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-mono text-xs text-[#FF96B3]">
                        {t.appearances.view}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-[#FF96B3]" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
