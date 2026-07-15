"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import labData from "@/data/lab.json";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeft, Zap, CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function LabDetailPage() {
  const params = useParams();
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const slug = params?.slug as string;
  const item = (labData as any[]).find((i: any) => i.slug === slug);

  if (!item) {
    return (
      <main className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl text-text-primary dark:text-white mb-4">404</h1>
          <p className="text-text-secondary dark:text-white/65 mb-6">
            {L("Cet élément de lab n'existe pas.","This lab item does not exist.")}
          </p>
          <Link href="/lab" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-text-primary dark:bg-pink text-cream dark:text-deep-dark hover:bg-text-secondary dark:hover:bg-pink/90 transition-colors">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {L("Retour au Lab","Back to Lab")}
          </Link>
        </div>
      </main>
    );
  }

  const content = item[lang as "en" | "fr"];
  const accent = item.color || "#FF96B3";

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-text-secondary dark:text-white/55 hover:text-text-primary dark:hover:text-white font-body text-sm mb-12 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink rounded"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" aria-hidden="true" />
          {L("Retour au Lab","Back to Lab")}
        </Link>

        {/* Hero card */}
        <ScrollReveal direction="up" distance={25}>
          <header className="relative rounded-3xl overflow-hidden border border-text-primary/12 dark:border-white/10 bg-text-primary/8 dark:bg-navy/40 p-8 md:p-12 mb-12">
            <div
              className="absolute inset-0 opacity-80 pointer-events-none"
              style={{ background: `radial-gradient(circle at 15% 25%, ${accent}40 0%, transparent 55%), radial-gradient(circle at 85% 75%, ${accent}20 0%, transparent 55%)` }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {item.type && (
                  <span
                    className="inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {item.type}
                  </span>
                )}
                {item.status && (
                  <span className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/65 px-3 py-1 rounded-full border border-text-primary/25 dark:border-white/15">
                    {item.status}
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-text-primary dark:text-white mb-4">{content.title}</h1>
              <p className="font-body text-text-secondary dark:text-white/75 text-lg leading-relaxed max-w-2xl">{content.description}</p>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              aria-hidden="true"
            />
          </header>
        </ScrollReveal>

        {/* Progress */}
        {item.progress && (
          <ScrollReveal>
            <section aria-labelledby="lab-progress" className="bg-text-primary/10 dark:bg-navy/40 border border-text-primary/15 dark:border-white/10 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 id="lab-progress" className="font-display text-xl text-text-primary dark:text-white">
                  {L("Progression","Progress")}
                </h2>
                <span className="font-display text-lg" style={{ color: accent }}>{item.progress}%</span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden bg-text-primary/15 dark:bg-white/10"
                role="progressbar"
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="h-full transition-all duration-700" style={{ width: `${item.progress}%`, backgroundColor: accent }} />
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Skills */}
        {content.skills && content.skills.length > 0 && (
          <ScrollReveal>
            <section aria-labelledby="lab-skills" className="bg-text-primary/10 dark:bg-navy/40 border border-text-primary/15 dark:border-white/10 rounded-2xl p-8 mb-8">
              <h2 id="lab-skills" className="font-display text-xl text-text-primary dark:text-white mb-4 inline-flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: accent }} aria-hidden="true" />
                {L("Compétences développées","Skills developed")}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {content.skills.map((skill: string, i: number) => (
                  <li key={i} className="font-body text-sm text-text-secondary dark:text-white/75 inline-flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <ScrollReveal>
            <section aria-labelledby="lab-tags" className="mb-12">
              <h2 id="lab-tags" className="font-display text-xs text-text-secondary dark:text-white/55 uppercase tracking-widest mb-3">
                {L("Catégories","Categories")}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {item.tags.map((tag: string) => (
                  <li key={tag} className="font-display text-xs uppercase tracking-wider px-3 py-1.5 rounded-full text-text-primary dark:text-white border" style={{ backgroundColor: `${accent}22`, borderColor: `${accent}66` }}>
                    {tag}
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        )}

        {/* CTA */}
        <ScrollReveal>
          <div className="pt-8 border-t border-text-primary/15 dark:border-white/10">
            <p className="font-body text-text-secondary dark:text-white/65 mb-4">
              {L("Cette expérience t'intéresse ?","Interested in this experiment?")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink"
              style={{ backgroundColor: accent }}
            >
              {L("Me contacter","Contact me")} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
