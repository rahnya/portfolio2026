"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import labData from "@/data/lab.json";
import { ArrowUpRight, Zap } from "lucide-react";

type FilterTag = "IA/Data" | "Développement" | "UX/IHM" | "Aérien/Transport" | "Apprentissage/Veille" | "all";

export default function LabPage() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<FilterTag>("all");

  // Récupère tous les tags uniques
  const allTags = Array.from(
    new Set(labData.flatMap((item: any) => item.tags || []))
  ) as FilterTag[];

  const filters: { key: FilterTag; label: string }[] = [
    { key: "all", label: "Tous" },
    ...allTags.map((tag) => ({ key: tag, label: tag })),
  ];

  // Filtre les items
  const filtered = labData.filter((item: any) => {
    if (active === "all") return true;
    return item.tags && item.tags.includes(active);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complété":
        return "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30";
      case "En cours":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30";
      case "Publié":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 border-gray-300 dark:border-white/10";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "MOOC":
        return "bg-purple-500/20 text-purple-600 dark:text-purple-400";
      case "Exercice":
        return "bg-orange-500/20 text-orange-600 dark:text-orange-400";
      case "Prototype":
        return "bg-pink-500/20 text-pink-600 dark:text-pink-400";
      case "Article":
        return "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400";
      case "Ressource":
        return "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400";
      default:
        return "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-white dark:bg-[#0F2847] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-orange-500 dark:text-[#FF3B8D] uppercase tracking-widest mb-4">
            — Lab & Expérimentations
          </p>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-gray-900 dark:text-white mb-4">
            {lang === "en" ? "Lab" : "Labo"}
          </h1>
          <p className="font-body text-gray-600 dark:text-white/50 text-lg max-w-2xl">
            {lang === "en"
              ? "Explorations, apprentissages et projets en cours d'une passionnée de technologie."
              : "Explorations, apprentissages et projets en cours d'une passionnée de technologie."}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${
                active === f.key
                  ? "bg-orange-500 dark:bg-[#FF3B8D] border-orange-500 dark:border-[#FF3B8D] text-white"
                  : "border-gray-300 dark:border-white/10 text-gray-600 dark:text-white/50 hover:border-gray-400 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: any) => {
            const content = item[lang as "en" | "fr"];
            return (
              <Link
                key={item.slug}
                href={`/lab/${item.slug}`}
                className="group relative bg-gray-50 dark:bg-[#183153]/30 border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-white/15 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-[#FF3B8D]/10"
              >
                {/* Color accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: item.color }}
                />

                {/* Content */}
                <div className="p-6">
                  {/* Header with status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-[#FF96B3] transition-colors duration-200 flex-1">
                      {content.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-orange-500 dark:text-[#FF3B8D] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </div>

                  {/* Type badge */}
                  <div className="mb-3">
                    <span
                      className={`font-mono text-[10px] px-2 py-1 rounded-full ${getTypeColor(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-gray-600 dark:text-white/50 leading-relaxed line-clamp-2 mb-4">
                    {content.description}
                  </p>

                  {/* Progress bar if exists */}
                  {item.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs text-gray-500 dark:text-white/40">
                          Progression
                        </span>
                        <span className="font-mono text-xs text-orange-500 dark:text-[#FF3B8D]">
                          {item.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${item.progress}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Status & Skills footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-white/5">
                    {item.status && (
                      <span
                        className={`font-mono text-[10px] px-2 py-1 rounded-full border ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    )}
                    {content.skills && content.skills.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="font-mono text-[10px] text-gray-500 dark:text-white/40">
                          {content.skills.length} skills
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-white/50 text-lg">
              {lang === "en"
                ? "Aucun élément avec ce filtre"
                : "Aucun élément avec ce filtre"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}