"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import labData from "@/data/lab.json";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowUpRight, Zap, Boxes } from "lucide-react";

type FilterTag = string;

const typeAccent: Record<string, string> = {
  MOOC: "#7B638A",
  Exercice: "#FFA755",
  Prototype: "#FF96B3",
  Article: "#C9A9DC",
  Ressource: "#FFC72C",
};

const statusAccent: Record<string, string> = {
  "Complété": "#FFA755",
  "En cours": "#FFC72C",
  "Publié": "#FF96B3",
};

export default function LabPage() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const [active, setActive] = useState<FilterTag>("all");

  const allTags = Array.from(
    new Set((labData as any[]).flatMap((item: any) => item.tags || []))
  ) as FilterTag[];

  const filters: { key: FilterTag; label: string }[] = [
    { key: "all", label: L("Tous","All") },
    ...allTags.map((tag) => ({ key: tag, label: tag })),
  ];

  const filtered = (labData as any[]).filter((item: any) => {
    if (active === "all") return true;
    return item.tags && item.tags.includes(active);
  });

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-14">
          <p className="font-display text-xs text-rose dark:text-pink uppercase tracking-widest mb-4">
            — Lab & {L("Expérimentations","Experiments")}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-text-primary dark:text-white mb-4">
            {L("Labo","Lab")}
          </h1>
          <p className="font-body text-text-secondary dark:text-white/70 text-lg max-w-2xl">
            {L(
              "Explorations, apprentissages et projets en cours d'une passionnée de technologie.",
              "Explorations, learnings, and ongoing projects of a technology enthusiast."
            )}
          </p>
        </header>

        {/* Portfolio 3D teaser en big */}
        <ScrollReveal>
          <a href="/lab/labyrinthe.html" target="_blank" rel="noopener noreferrer" className="group block relative rounded-3xl overflow-hidden border border-text-primary/15 dark:border-white/10 card-hover mb-14">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 30%, #FF3B8D 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, #8A6F9B 0%, transparent 55%), linear-gradient(135deg, #050510 0%, #0D0D20 60%, #1A0F20 100%)" }} />
            <div className="relative p-8 md:p-12 min-h-[280px] flex flex-col justify-between text-white">
              <div>
                <span className="inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-pink/15 text-pink border border-pink/30 mb-6">
                  <Boxes className="w-3 h-3" /> {L("Expérience 3D","3D experience")}
                </span>
                <h2 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl">{L("Portfolio en 3D.","3D portfolio.")}</h2>
                <p className="mt-4 font-body text-base text-white/75 max-w-2xl">
                  {L("Labyrinthe FPS Three.js, cinq salles. Clavier + souris.","Three.js FPS labyrinth, five rooms. Keyboard + mouse.")}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-display text-lg text-pink group-hover:gap-3 transition-all mt-6">
                {L("Lancer l'expérience","Launch")}
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
          </a>
        </ScrollReveal>

        {/* Filters — style base */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2" role="group" aria-label="Tags">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              aria-pressed={active === f.key}
              className={`font-display text-xs px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink ${
                active === f.key
                  ? "bg-text-primary dark:bg-pink border-text-primary dark:border-pink text-cream dark:text-deep-dark"
                  : "border-text-primary/15 dark:border-white/10 text-text-secondary dark:text-white/65 hover:border-text-primary/30 dark:hover:border-white/25 hover:text-text-primary dark:hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid cards — style base restauré */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: any, i: number) => {
            const content = item[lang as "en" | "fr"];
            const accent = item.color || typeAccent[item.type] || "#FF96B3";
            const statColor = item.status ? (statusAccent[item.status] || accent) : accent;
            return (
              <ScrollReveal key={item.slug} delay={(i % 6) * 0.06} direction="up" distance={20}>
                <Link
                  href={`/lab/${item.slug}`}
                  className="group relative block h-full bg-text-primary/10 dark:bg-navy/30 border border-text-primary/15 dark:border-white/10 rounded-2xl overflow-hidden hover:border-text-primary/30 dark:hover:border-white/25 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink"
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                    aria-hidden="true"
                  />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 className="font-display text-lg text-text-primary dark:text-white group-hover:translate-x-0.5 transition-transform flex-1">
                        {content.title}
                      </h2>
                      <ArrowUpRight
                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                        style={{ color: accent }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Type badge */}
                    {item.type && (
                      <div className="mb-3">
                        <span
                          className="font-display text-[10px] uppercase tracking-wider px-2 py-1 rounded-full text-text-primary dark:text-white border"
                          style={{ backgroundColor: `${accent}22`, borderColor: `${accent}66` }}
                        >
                          {item.type}
                        </span>
                      </div>
                    )}

                    <p className="font-body text-sm text-text-secondary dark:text-white/65 leading-relaxed line-clamp-2 mb-4">
                      {content.description}
                    </p>

                    {/* Progress bar */}
                    {item.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-display text-xs text-text-secondary dark:text-white/55">
                            {L("Progression","Progress")}
                          </span>
                          <span className="font-display text-xs" style={{ color: accent }}>
                            {item.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-text-primary/12 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full transition-all duration-500" style={{ width: `${item.progress}%`, backgroundColor: accent }} />
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="font-display text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-text-primary/8 dark:bg-white/5 text-text-secondary dark:text-white/70 border border-text-primary/12 dark:border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-text-primary/12 dark:border-white/8">
                      {item.status && (
                        <span
                          className="font-display text-[10px] uppercase tracking-wider px-2 py-1 rounded-full text-text-primary dark:text-white border"
                          style={{ backgroundColor: `${statColor}22`, borderColor: `${statColor}66` }}
                        >
                          {item.status}
                        </span>
                      )}
                      {content.skills && content.skills.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3" style={{ color: accent }} aria-hidden="true" />
                          <span className="font-mono text-[10px] text-text-secondary dark:text-white/55">
                            {content.skills.length} {L("compétences","skills")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary dark:text-white/65 text-lg">
              {L("Aucun élément avec ce filtre","No items match this filter")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
