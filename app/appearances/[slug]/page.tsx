"use client";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLang } from "@/components/LangContext";
import appearancesData from "@/data/appearances.json";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function AppearanceDetailPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLang();
  const item = appearancesData.find((a) => a.slug === params.slug);
  if (!item) notFound();

  const a = item[lang as "en" | "fr"];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link href="/appearances"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white font-body text-sm mb-12 transition-colors duration-200 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {t.appearances.title}
        </Link>

        {/* Image */}
        <div className="h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-white/8 bg-[#183153]/30 flex items-center justify-center">
          <span className="font-mono text-xs text-white/20">Image Placeholder</span>
        </div>

        {/* Type */}
        <span className="font-mono text-xs text-[#FF96B3] uppercase tracking-wider">
          {item.type}
        </span>

        {/* Title */}
        <h1 className="font-display font-extrabold text-4xl text-white mt-2 mb-6">
          {a.title}
        </h1>

        {/* Description */}
        <p className="font-body text-white/60 text-lg leading-relaxed mb-8">
          {a.description}
        </p>

        {/* External link */}
        <a href={a.externalUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF3B8D] hover:bg-[#FF3B8D]/90 text-white font-body font-medium text-sm rounded-xl transition-all duration-200">
          {a.externalLabel}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
