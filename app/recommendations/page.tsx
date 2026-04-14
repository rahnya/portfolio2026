"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import recommendationsData from "@/data/recommendations.json";
import { Download, Quote, ArrowLeft } from "lucide-react";

export default function RecommendationsPage() {
  const { t, lang } = useLang();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white font-body text-sm mb-12 transition-colors duration-200 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <p className="font-bebas text-xs dark:text-[#FF3B8D] uppercase tracking-widest mb-4">
            — Testimonials
          </p>
          <h1 className="font-display font-extrabold text-5xl text-white mb-4">
            {t.recommendations.title}
          </h1>
          <p className="font-body text-white/50 text-lg">
            {t.recommendations.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {recommendationsData.map((rec, i) => (
            <div key={i}
              className="bg-[#183153]/30 border border-white/8 rounded-2xl p-8 relative overflow-hidden group hover:border-white/15 transition-colors duration-300">
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#FF6B35]/15 dark:text-[#FF3B8D]/15" />

              <div className="flex items-start gap-4 mb-6">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-md flex-shrink-0 flex items-center justify-center">
                  <span className="font-display font-bold text-white/60 text-sm">
                    {rec.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-white">{rec.name}</p>
                  <p className="font-bebas text-xs text-white/40 mt-0.5">
                    {rec.role[lang as "en" | "fr"]}
                  </p>
                </div>
              </div>

              <blockquote className="font-body text-white/70 leading-relaxed italic mb-8">
                &ldquo;{rec.text[lang as "en" | "fr"]}&rdquo;
              </blockquote>

              <a
                href={`/cv/${rec.filename}`}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-text-primary/10 dark:bg-[#FF3B8D]/10 hover:bg-text-primary/20 dark:hover:bg-[#FF3B8D]/20 border-text-primary/20 dark:border-[#FF3B8D]/20 hover:border-text-primary/40 dark:hover:border-[#FF3B8D]/40 text-white dark:text-[#FF96B3] font-body font-medium text-sm rounded-xl transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                {t.recommendations.download}
              </a>
            </div>
          ))}
        </div>

        {/* CV Download CTA */}
        <div className="mt-12 text-center p-8 bg-[#183153]/20 border border-white/5 rounded-2xl">
          <p className="font-body text-white/50 mb-4">Looking for the full CV?</p>
          <a href="/cv/CV_Rahnya.pdf" download
            className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary dark:bg-[#FF3B8D] hover:bg-text-primary/90 dark:hover:bg-[#FF3B8D]/90 text-white font-body font-medium text-sm rounded-xl transition-all duration-200">
            <Download className="w-4 h-4" />
            {t.nav.cv}
          </a>
        </div>
      </div>
    </div>
  );
}
