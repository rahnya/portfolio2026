"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import appearancesData from "@/data/appearances.json";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function AppearanceDetailPage() {
  const params = useParams();
  const { lang, t } = useLang();
  const slug = params?.slug as string;

  const item = appearancesData.find((a: any) => a.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            404
          </h1>
          <p className="text-white/50 mb-6">
            {lang === "en"
              ? "This appearance does not exist."
              : "Cette apparition n'existe pas."}
          </p>
          <Link
            href="/appearances"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF3B8D] text-white hover:bg-[#FF96B3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to Appearances" : "Retour aux apparitions"}
          </Link>
        </div>
      </div>
    );
  }

  const a = item[lang as "en" | "fr"];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          href="/appearances"
          className="inline-flex items-center gap-2 text-[#FF3B8D] hover:text-[#FF96B3] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "en" ? "Back to Appearances" : "Retour aux apparitions"}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white mb-4">
            {a.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="font-mono text-sm px-3 py-1 rounded-lg bg-[#FF3B8D]/20 text-[#FF96B3] border border-[#FF3B8D]/30">
              {item.type}
            </span>
            {item.date && (
              <span className="font-mono text-sm px-3 py-1 rounded-lg bg-white/5 text-white/60 border border-white/10">
                {item.date}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="font-body text-lg text-white/70 leading-relaxed max-w-2xl">
            {a.description}
          </p>
        </div>

        {/* Content section */}
        {a.content && (
          <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-8 mb-8">
            <h3 className="font-display font-bold text-white mb-4">
              {lang === "en" ? "Details" : "Détails"}
            </h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 leading-relaxed">{a.content}</p>
            </div>
          </div>
        )}

        {/* Links section */}
        {(a.link || a.videoUrl) && (
          <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-8 mb-8">
            <h3 className="font-display font-bold text-white mb-4">
              {lang === "en" ? "Links" : "Liens"}
            </h3>
            <div className="flex flex-wrap gap-3">
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF3B8D] text-white hover:bg-[#FF96B3] transition-colors"
                >
                  {lang === "en" ? "Visit" : "Visiter"} →
                </a>
              )}
              {a.videoUrl && (
                <a
                  href={a.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20"
                >
                  {lang === "en" ? "Watch Video" : "Regarder la vidéo"} →
                </a>
              )}
            </div>
          </div>
        )}

        {/* CTA section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/50 mb-4">
            {lang === "en"
              ? "Want to collaborate?"
              : "Envie de collaborer ?"}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF3B8D] text-white hover:bg-[#FF96B3] transition-colors font-body font-medium"
          >
            {lang === "en" ? "Contact me" : "Me contacter"} →
          </Link>
        </div>
      </div>
    </div>
  );
}
