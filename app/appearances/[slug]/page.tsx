"use client";
import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useLang } from "@/components/LangContext";
import appearancesData from "@/data/appearances.json";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeft, ExternalLink, Mic, Youtube, BookOpen, Award, Monitor } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  article: <BookOpen className="w-4 h-4" aria-hidden="true" />,
  event: <Award className="w-4 h-4" aria-hidden="true" />,
  video: <Youtube className="w-4 h-4" aria-hidden="true" />,
  podcast: <Mic className="w-4 h-4" aria-hidden="true" />,
  installation: <Monitor className="w-4 h-4" aria-hidden="true" />,
};

export default function AppearanceDetailPage() {
  const params = useParams<{ slug: string }>();
  const { lang } = useLang();

  const appearance = appearancesData.find((a: any) => a.slug === params.slug);
  if (!appearance) notFound();

  const a = appearance[lang as "en" | "fr"];
  const screenshots: string[] = Array.isArray(a.screenshots) ? a.screenshots : [];
  const accent = appearance.color || "#FF96B3";

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link
          href="/appearances"
          className="inline-flex items-center gap-2 text-text-secondary dark:text-white/55 hover:text-text-primary dark:hover:text-white font-body text-sm mb-12 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink rounded"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" aria-hidden="true" />
          {lang === "fr" ? "Toutes les apparitions" : "All appearances"}
        </Link>

        {/* Hero */}
        <ScrollReveal direction="up" distance={25}>
          <header className="relative rounded-3xl mb-12 overflow-hidden border border-text-primary/12 dark:border-white/10 bg-text-primary/8 dark:bg-navy/40">
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(circle at 20% 30%, ${accent}40 0%, transparent 55%), radial-gradient(circle at 80% 70%, ${accent}20 0%, transparent 55%)`,
              }}
              aria-hidden="true"
            />
            <div className="relative p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className="inline-flex items-center gap-1.5 font-bebas text-[10px] uppercase tracking-widest px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: accent }}
                >
                  {typeIcons[appearance.type]}
                  {appearance.type}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-text-primary dark:text-white mb-4 max-w-3xl">
                {a.title}
              </h1>
              <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed max-w-2xl">
                {a.description}
              </p>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              aria-hidden="true"
            />
          </header>
        </ScrollReveal>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main */}
          <div className="md:col-span-2 space-y-12">
            {screenshots.length > 0 && (
              <ScrollReveal>
                <section aria-labelledby="gallery-title">
                  <h2
                    id="gallery-title"
                    className="font-display text-2xl text-text-primary dark:text-white mb-5"
                  >
                    {lang === "fr" ? "Galerie" : "Gallery"}
                  </h2>
                  <div className={`grid gap-4 ${screenshots.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                    {screenshots.map((src, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden border border-text-primary/12 dark:border-white/10 hover:border-text-primary/25 dark:hover:border-white/25 transition-all duration-300"
                      >
                        <img
                          src={src}
                          alt={`${a.title} ${i + 1}`}
                          className="w-full object-cover object-top hover:scale-[1.03] transition-transform duration-500"
                          loading="lazy"
                          style={{ maxHeight: "320px" }}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6" aria-label={lang === "fr" ? "Métadonnées" : "Metadata"}>
            <ScrollReveal direction="right" distance={20}>
              <div className="bg-text-primary/10 dark:bg-navy/40 border border-text-primary/15 dark:border-white/10 rounded-2xl p-6">
                <h3 className="font-bebas text-xs text-text-primary dark:text-white mb-4 uppercase tracking-widest">
                  {lang === "fr" ? "Information" : "Information"}
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bebas text-[10px] text-text-secondary dark:text-white/55 uppercase tracking-widest mb-1">
                      Type
                    </p>
                    <p className="font-body text-text-primary dark:text-white capitalize inline-flex items-center gap-1.5">
                      {typeIcons[appearance.type]}
                      {appearance.type}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {a.externalUrl && (
              <ScrollReveal direction="right" distance={20} delay={0.1}>
                <div className="bg-text-primary/10 dark:bg-navy/40 border border-text-primary/15 dark:border-white/10 rounded-2xl p-6">
                  <h3 className="font-bebas text-xs text-text-primary dark:text-white mb-4 uppercase tracking-widest">
                    {lang === "fr" ? "Lien externe" : "External link"}
                  </h3>
                  <a
                    href={a.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink"
                    style={{ backgroundColor: accent }}
                  >
                    {a.externalLabel}
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </ScrollReveal>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
