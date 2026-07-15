"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import acLibrary from "@/data/ac-library.json";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight, X as XIcon, ZoomIn } from "lucide-react";

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const { lang } = useLang();
  const slug = params?.slug as string;
  const idx = (projectsData as any[]).findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = (projectsData as any[])[idx];
  const prev = (projectsData as any[])[(idx - 1 + projectsData.length) % projectsData.length];
  const next = (projectsData as any[])[(idx + 1) % projectsData.length];

  const p = project[lang as "fr" | "en"] ?? project.fr;
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const accent: string = project.color || "#B03A50";
  const screenshots: string[] = Array.isArray(p?.screenshots) ? p.screenshots : [];
  const acs: string[] = project.acs || [];
  const butSkills: string[] = project.butSkills || [];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIdx(i), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const nextImage = useCallback(() => setLightboxIdx((i) => (i === null ? null : (i + 1) % screenshots.length)), [screenshots.length]);
  const prevImage = useCallback(() => setLightboxIdx((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length)), [screenshots.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, closeLightbox, nextImage, prevImage]);

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <Link href="/projects" className="group inline-flex items-center gap-2 font-body text-sm text-text-secondary dark:text-white/65 hover:text-text-primary dark:hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {L("Tous les projets", "All projects")}
        </Link>

        <ScrollReveal>
          <header className="mb-12 lg:mb-16 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {project.year && (
                <span className="font-display text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
                  {project.year}
                </span>
              )}
              {(project.categories || []).filter((c: string) => !["school","professional","entrepreneurship"].includes(c)).slice(0, 3).map((c: string) => (
                <span key={c} className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/70 px-2.5 py-1 rounded-full border border-text-primary/20 dark:border-white/15">{c}</span>
              ))}
            </div>
            <h1 className="font-display text-huge text-text-primary dark:text-white leading-[1.02] mb-5">{p.title}</h1>
            <p className="font-body text-lg text-text-secondary dark:text-white/75 max-w-3xl leading-relaxed">{p.shortDescription}</p>
          </header>
        </ScrollReveal>

        {screenshots[0] && (
          <ScrollReveal direction="fade">
            <button
              onClick={() => openLightbox(0)}
              className="group relative block w-full mb-16 lg:mb-20 rounded-2xl overflow-hidden border border-text-primary/12 dark:border-white/10 bg-text-primary/8 dark:bg-white/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink"
              aria-label={L("Agrandir l'image principale","Enlarge main image")}
            >
              <div className="aspect-[16/9] md:aspect-[16/8] relative overflow-hidden">
                <img src={screenshots[0]} alt={p.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" loading="eager" />
                <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-cream/95 dark:bg-deep-dark/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5 text-text-primary dark:text-white" aria-hidden="true" />
                </span>
              </div>
            </button>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8 space-y-14">
            {(p as any).context && <ScrollReveal><Section title={L("Contexte", "Context")} body={(p as any).context} /></ScrollReveal>}
            {(p as any).role && <ScrollReveal><Section title={L("Mon rôle", "My role")} body={(p as any).role} /></ScrollReveal>}
            {(p as any).selfEvaluation && <ScrollReveal><Section title={L("Auto-évaluation", "Self-assessment")} body={(p as any).selfEvaluation} /></ScrollReveal>}
            {(p as any).features && (p as any).features.length > 0 && (
              <ScrollReveal>
                <section aria-labelledby="features-title">
                  <h2 id="features-title" className="font-display text-big text-text-primary dark:text-white mb-6">
                    {L("Réalisations", "Deliverables")}
                  </h2>
                  <ul className="space-y-3">
                    {(p as any).features.map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 font-body text-base text-text-secondary dark:text-white/75">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-1.5" style={{ color: accent }} aria-hidden="true" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>
            )}
            {screenshots.length > 1 && (
              <ScrollReveal>
                <section aria-labelledby="gallery-title">
                  <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
                    <h2 id="gallery-title" className="font-display text-big text-text-primary dark:text-white">
                      {L("Galerie", "Gallery")}
                    </h2>
                    <p className="font-body text-xs text-text-secondary dark:text-white/60">
                      {screenshots.length - 1} {L("visuels","visuals")} · {L("cliquer pour agrandir","click to enlarge")}
                    </p>
                  </div>
                  <div className="gallery-masonry">
                    {screenshots.slice(1).map((src, i) => (
                      <button key={i} onClick={() => openLightbox(i + 1)}
                        className="group block w-full rounded-xl overflow-hidden border border-text-primary/12 dark:border-white/10 hover:border-text-primary/30 dark:hover:border-white/25 transition-all card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink relative"
                        aria-label={`${L("Agrandir l'image","Enlarge image")} ${i + 2}`}
                      >
                        <img src={src} alt={`${p.title} ${i + 2}`} loading="lazy" className="w-full h-auto block" />
                        <span className="absolute top-2 right-2 w-8 h-8 rounded-full bg-cream/95 dark:bg-deep-dark/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-3.5 h-3.5 text-text-primary dark:text-white" aria-hidden="true" />
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-5" aria-label={L("Informations","Information")}>
            {(p as any).technologies && (p as any).technologies.length > 0 && (
              <ScrollReveal direction="right" distance={16}>
                <div className="bg-text-primary/6 dark:bg-white/3 border border-text-primary/12 dark:border-white/10 rounded-2xl p-6">
                  <h3 className="font-display text-xs uppercase tracking-widest text-text-secondary dark:text-white/65 mb-4">{L("Technologies","Technologies")}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {(p as any).technologies.map((t: string) => (
                      <span key={t} className="font-body text-xs px-2 py-1 rounded text-text-secondary dark:text-white/75 border border-text-primary/15 dark:border-white/10">{t}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {butSkills.length > 0 && (
              <ScrollReveal direction="right" distance={16} delay={0.06}>
                <div className="bg-text-primary/6 dark:bg-white/3 border border-text-primary/12 dark:border-white/10 rounded-2xl p-6">
                  <h3 className="font-display text-xs uppercase tracking-widest text-text-secondary dark:text-white/65 mb-4">
                    {L("Compétences BUT","BUT skills")}
                    {project.year && <span className="ml-2 opacity-75">· {project.year}</span>}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {butSkills.map((s) => (
                      <span key={s} className="font-body text-xs px-2.5 py-1 rounded-full text-text-primary dark:text-white border capitalize" style={{ backgroundColor: `${accent}20`, borderColor: `${accent}66` }}>{s}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {acs.length > 0 && (
              <ScrollReveal direction="right" distance={16} delay={0.10}>
                <div className="bg-text-primary/6 dark:bg-white/3 border border-text-primary/12 dark:border-white/10 rounded-2xl p-6">
                  <h3 className="font-display text-xs uppercase tracking-widest text-text-secondary dark:text-white/65 mb-4">
                    {L("Apprentissages critiques","Critical learnings")}
                  </h3>
                  <ul className="space-y-2.5">
                    {acs.map((ac) => {
                      const label = (acLibrary as Record<string, string>)[ac] || "";
                      return (
                        <li key={ac} className="flex gap-2 text-xs leading-snug">
                          <span className="font-display flex-shrink-0 px-1.5 rounded text-text-primary dark:text-white border" style={{ backgroundColor: `${accent}1a`, borderColor: `${accent}66` }}>{ac}</span>
                          <span className="font-body text-text-secondary dark:text-white/70">{label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {(p.githubUrl || p.liveUrl) && (
              <ScrollReveal direction="right" distance={16} delay={0.14}>
                <div className="bg-text-primary/6 dark:bg-white/3 border border-text-primary/12 dark:border-white/10 rounded-2xl p-6 space-y-3">
                  <h3 className="font-display text-xs uppercase tracking-widest text-text-secondary dark:text-white/65 mb-1">{L("Liens","Links")}</h3>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 font-body text-sm text-text-primary dark:text-white">
                      <Github className="w-4 h-4" aria-hidden="true" />
                      <span className="border-b border-text-primary/30 dark:border-white/30 group-hover:border-text-primary dark:group-hover:border-white">GitHub</span>
                      <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 font-body text-sm text-text-primary dark:text-white">
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      <span className="border-b border-text-primary/30 dark:border-white/30 group-hover:border-text-primary dark:group-hover:border-white">{L("Voir en ligne", "Live demo")}</span>
                      <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </ScrollReveal>
            )}
          </aside>
        </div>

        <nav aria-label={L("Navigation entre projets","Project navigation")} className="mt-20 pt-8 border-t border-text-primary/12 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-3 p-4 rounded-xl border border-text-primary/12 dark:border-white/10 hover:border-text-primary/30 dark:hover:border-white/25 transition-colors">
            <ChevronLeft className="w-5 h-5 text-text-secondary dark:text-white/65 transition-transform group-hover:-translate-x-1" />
            <div>
              <p className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/55">{L("Précédent","Previous")}</p>
              <p className="font-body text-sm text-text-primary dark:text-white">{prev[lang as "fr"|"en"]?.title ?? prev.fr.title}</p>
            </div>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group flex items-center gap-3 p-4 rounded-xl border border-text-primary/12 dark:border-white/10 hover:border-text-primary/30 dark:hover:border-white/25 transition-colors md:justify-end md:text-right">
            <div className="md:order-1">
              <p className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/55">{L("Suivant","Next")}</p>
              <p className="font-body text-sm text-text-primary dark:text-white">{next[lang as "fr"|"en"]?.title ?? next.fr.title}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-text-secondary dark:text-white/65 transition-transform group-hover:translate-x-1 md:order-2" />
          </Link>
        </nav>
      </div>

      {lightboxIdx !== null && (
        <div role="dialog" aria-modal="true" aria-label={L("Image agrandie","Enlarged image")} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <button onClick={closeLightbox} className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label={L("Fermer","Close")}>
            <XIcon className="w-5 h-5" />
          </button>
          {screenshots.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label={L("Précédent","Previous")}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label={L("Suivant","Next")}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <img src={screenshots[lightboxIdx]} alt="" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
          {screenshots.length > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-xs text-white/70 tabular">
              {lightboxIdx + 1} / {screenshots.length}
            </p>
          )}
        </div>
      )}
    </main>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="font-display text-big text-text-primary dark:text-white mb-4">{title}</h2>
      <div className="font-body text-base lg:text-lg text-text-secondary dark:text-white/75 leading-[1.75] whitespace-pre-line prose-relaxed">{body}</div>
    </section>
  );
}
