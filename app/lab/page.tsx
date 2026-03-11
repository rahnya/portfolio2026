"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import labData from "@/data/lab.json";
import { ArrowUpRight, FlaskConical } from "lucide-react";

export default function LabPage() {
  const { t, lang } = useLang();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-5 h-5 text-[#FF3B8D]" />
            <p className="font-mono text-xs text-[#FF3B8D] uppercase tracking-widest">
              Experiments
            </p>
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4">
            {t.lab.title}
          </h1>
          <p className="font-body text-white/50 text-lg max-w-2xl">
            {t.lab.subtitle}
          </p>
        </div>

        {/* Pinterest-like grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {labData.map((item, i) => {
            const entry = item[lang as "en" | "fr"];
            const heights = ["h-64", "h-80", "h-72", "h-96"];
            const h = heights[i % heights.length];

            return (
              <Link
                key={item.slug}
                href={`/lab/${item.slug}`}
                className={`card-hover group block break-inside-avoid bg-[#183153]/30 border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 relative ${h}`}
              >
                {/* Color bg */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 70% 30%, ${item.color}20 0%, transparent 60%)`,
                  }}
                />

                {/* Top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${item.color}20`, color: item.color }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display font-bold text-xl text-white mb-3 group-hover:text-[#FF96B3] transition-colors duration-200">
                      {entry.title}
                    </h2>
                    <p className="font-body text-sm text-white/50 leading-relaxed line-clamp-3">
                      {entry.description}
                    </p>
                  </div>

                  {/* Code preview snippet */}
                  <div className="mt-4 bg-black/30 rounded-xl p-3 border border-white/5 overflow-hidden">
                    <pre className="font-mono text-[10px] text-[#FF96B3]/70 line-clamp-3 whitespace-pre-wrap">
                      {entry.codeSnippet}
                    </pre>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight className="w-4 h-4 text-white" />
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
