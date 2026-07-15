"use client";
import React from "react";
import { useLang } from "@/components/LangContext";
import recommendations from "@/data/recommendations.json";
import ScrollReveal from "@/components/ScrollReveal";
import { Quote } from "lucide-react";

export default function RecommendationsPage() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const items = recommendations as any[];

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-14 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-widest mb-4 text-rose dark:text-pink">— {L("Recommandations","Recommendations")}</p>
          <h1 className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
            {L("Ce qu'on dit de mon travail.","What others say.")}
          </h1>
          <p className="mt-5 font-body text-lg text-text-secondary dark:text-white/75 leading-relaxed">
            {L("Retours de professeurs et de collaborateurs qui ont travaillé avec moi.","From professors and collaborators who worked with me.")}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((r, i) => {
            const text = r.text?.[lang] ?? r.text?.fr ?? "";
            const role = r.role?.[lang] ?? r.role?.fr ?? "";
            return (
              <ScrollReveal key={i} delay={(i%4)*0.05}>
                <blockquote className="p-6 rounded-2xl border border-text-primary/12 dark:border-white/10 bg-text-primary/5 dark:bg-white/3 h-full">
                  <Quote className="w-5 h-5 text-rose dark:text-pink mb-3" />
                  <p className="font-body text-text-primary dark:text-white/90 leading-relaxed mb-4 italic">« {text} »</p>
                  <footer className="pt-4 border-t border-text-primary/10 dark:border-white/10">
                    <p className="font-display text-lg text-text-primary dark:text-white">{r.name}</p>
                    <p className="font-body text-xs text-text-secondary dark:text-white/60">{role}</p>
                  </footer>
                </blockquote>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </main>
  );
}
