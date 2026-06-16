"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import acLibrary from "@/data/ac-library.json";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeft, Github, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const [currentImage, setCurrentImage] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const p = project[lang as "en" | "fr"];

  const categories = Array.isArray((project as any).categories)
    ? (project as any).categories
    : (project as any).category
    ? [(project as any).category]
    : [];

  const screenshots: string[] = Array.isArray(p.screenshots) ? p.screenshots : [];
  const context: string = (p as any).context ?? "";
  const role: string = (p as any).role ?? "";
  const selfEvaluation: string = (p as any).selfEvaluation ?? "";
  const butSkills: string[] = (project as any).butSkills ?? [];
  const acs: string[] = (project as any).acs ?? [];
  const year: string = (project as any).year ?? "";

  // Auto-play carousel
  useEffect(() => {
    if (screenshots.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % screenshots.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [screenshots.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white font-body text-sm mb-12 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {t.projects.title}
        </Link>

        {/* Hero avec Carousel d'images */}
        <div className="relative rounded-3xl h-96 md:h-[28rem] mb-12 overflow-hidden border border-text-primary/8 dark:border-white/8 group cursor-pointer"
          onClick={() => screenshots.length > 0 && setLightbox(currentImage)}
        >
          {/* Images en fond */}
          {screenshots.length > 0 ? (
            <>
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={screenshot}
                    alt={`${p.title} ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary dark:from-deep-dark via-text-primary/50 dark:via-deep-dark/50 to-transparent" />
                </div>
              ))}

              {/* Navigation carousel */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 dark:hover:bg-black/40 transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 dark:hover:bg-black/40 transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Indicateurs */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImage(index);
                        }}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentImage
                            ? "w-8 h-2 bg-white"
                            : "w-2 h-2 bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            // Fallback si pas d'images
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 20% 50%, ${project.color}35 0%, transparent 65%), radial-gradient(circle at 80% 20%, ${project.color}15 0%, transparent 50%)`,
                backgroundColor: `${project.color}12`,
              }}
            />
          )}

          {/* Barre de couleur en bas */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          />

          {/* Contenu du hero */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat: string) => (
                <span
                  key={cat}
                  className="font-bebas text-xs px-3 py-1 rounded-full w-fit backdrop-blur-sm"
                  style={{ backgroundColor: `${project.color}40`, color: "white" }}
                >
                  {cat.toUpperCase()}
                </span>
              ))}
            </div>
            <h1 className="font-bebas text-4xl md:text-5xl text-white drop-shadow-lg">
              {p.title}
            </h1>
            {screenshots.length > 0 && (
              <p className="font-bebas text-xs text-white/60 mt-3">
                Cliquez pour agrandir • {currentImage + 1}/{screenshots.length}
              </p>
            )}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main */}
          <div className="md:col-span-2 space-y-10">
            {/* Contexte */}
            {context && (
              <ScrollReveal>
                <section aria-labelledby="ctx-title">
                  <h2 id="ctx-title" className="font-display text-xl text-text-primary dark:text-white mb-4">
                    {lang === "fr" ? "Contexte" : "Context"}
                  </h2>
                  <p className="font-body text-text-secondary dark:text-white/70 leading-relaxed whitespace-pre-line">
                    {context}
                  </p>
                </section>
              </ScrollReveal>
            )}

            {/* Role */}
            {role && (
              <ScrollReveal>
                <section aria-labelledby="role-title">
                  <h2 id="role-title" className="font-display text-xl text-text-primary dark:text-white mb-4">
                    {lang === "fr" ? "Mon rôle" : "My role"}
                  </h2>
                  <p className="font-body text-text-secondary dark:text-white/70 leading-relaxed whitespace-pre-line">
                    {role}
                  </p>
                </section>
              </ScrollReveal>
            )}

            {/* AutoEvaluation */}
            {selfEvaluation && (
              <ScrollReveal>
                <section aria-labelledby="eval-title">
                  <h2 id="eval-title" className="font-display text-xl text-text-primary dark:text-white mb-4">
                    {lang === "fr" ? "Auto-évaluation" : "Self-assessment"}
                  </h2>
                  <p className="font-body text-text-secondary dark:text-white/70 leading-relaxed whitespace-pre-line">
                    {selfEvaluation}
                  </p>
                </section>
              </ScrollReveal>
            )}

            {/* Features */}
            {p.features && p.features.length > 0 && (
              <ScrollReveal>
                <section aria-labelledby="features-title">
                  <h2 id="features-title" className="font-display text-xl text-text-primary dark:text-white mb-4">
                    {t.projects.features}
                  </h2>
                  <ul className="space-y-3">
                    {p.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: project.color }}
                          aria-hidden="true"
                        />
                        <span className="font-body text-sm text-text-secondary dark:text-white/70">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6" aria-label={lang === "fr" ? "Informations projet" : "Project info"}>
            {/* Tech stack */}
            {p.technologies && p.technologies.length > 0 && (
              <div className="bg-text-primary/10 dark:bg-navy/30 border border-text-primary/10 dark:border-white/8 rounded-2xl p-6">
                <h3 className="font-display text-sm text-text-primary dark:text-white mb-4 uppercase tracking-wider">
                  {t.projects.technologies}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {p.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-bebas text-xs px-2.5 py-1 rounded-full border border-text-primary/10 dark:border-white/10 text-text-secondary dark:text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Compétences BUT */}
            {butSkills.length > 0 && (
              <div className="bg-text-primary/10 dark:bg-navy/30 border border-text-primary/10 dark:border-white/8 rounded-2xl p-6">
                <h3 className="font-display text-sm text-text-primary dark:text-white mb-4 uppercase tracking-wider">
                  {lang === "fr" ? "Compétences BUT" : "BUT Skills"}
                  {year && (
                    <span className="ml-2 font-bebas text-[10px] text-text-secondary dark:text-white/55 normal-case tracking-widest">
                      · {year}
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {butSkills.map((skill) => (
                    <span
                      key={skill}
                      className="font-bebas text-xs px-3 py-1 rounded-full capitalize text-text-primary dark:text-white border"
                      style={{ backgroundColor: `${project.color}25`, borderColor: `${project.color}80` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="font-body text-[11px] text-text-muted dark:text-white/50 mt-3 leading-snug">
                  {lang === "fr"
                    ? "Compétences MMI mobilisées sur ce projet."
                    : "MMI competences mobilised on this project."}
                </p>
              </div>
            )}

            {/* Apprentissages Critiques (AC) */}
            {acs.length > 0 && (
              <div className="bg-text-primary/10 dark:bg-navy/30 border border-text-primary/10 dark:border-white/8 rounded-2xl p-6">
                <h3 className="font-display text-sm text-text-primary dark:text-white mb-4 uppercase tracking-wider">
                  {lang === "fr" ? "Apprentissages critiques" : "Critical learnings"}
                </h3>
                <ul className="space-y-2.5">
                  {acs.map((ac) => {
                    const label = (acLibrary as Record<string, string>)[ac] || "";
                    return (
                      <li key={ac} className="flex gap-2 text-xs leading-snug">
                        <span
                          className="font-bebas flex-shrink-0 px-1.5 rounded text-text-primary dark:text-white border"
                          style={{ backgroundColor: `${project.color}25`, borderColor: `${project.color}80` }}
                        >
                          {ac}
                        </span>
                        <span className="font-body text-text-secondary dark:text-white/70">
                          {label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Links */}
            {(p.githubUrl || p.liveUrl) && (
              <div className="bg-text-primary/10 dark:bg-navy/30 border border-text-primary/8 dark:border-white/8 rounded-2xl p-6 space-y-3">
                <h3 className="font-display text-sm text-text-primary dark:text-white mb-4 uppercase tracking-wider">
                  {lang === "fr" ? "Liens" : "Links"}
                </h3>
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.projects.github} (${lang === "fr" ? "ouvre dans un nouvel onglet" : "opens in new tab"})`}
                    className="flex items-center gap-3 text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink rounded"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span className="font-body text-sm">{t.projects.github}</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                  </a>
                )}
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.projects.live_demo} (${lang === "fr" ? "ouvre dans un nouvel onglet" : "opens in new tab"})`}
                    className="flex items-center gap-3 text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink rounded"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span className="font-body text-sm">{t.projects.live_demo}</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && screenshots.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === "fr" ? "Aperçu image" : "Image preview"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowLeft" && screenshots.length > 1)
              setLightbox((prev) => (prev! - 1 + screenshots.length) % screenshots.length);
            if (e.key === "ArrowRight" && screenshots.length > 1)
              setLightbox((prev) => (prev! + 1) % screenshots.length);
          }}
          tabIndex={-1}
        >
          {/* Fermer */}
          <button
            onClick={() => setLightbox(null)}
            aria-label={lang === "fr" ? "Fermer l'aperçu" : "Close preview"}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span aria-hidden="true">✕</span>
          </button>

          {/* Flèche gauche */}
          {screenshots.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => (prev! - 1 + screenshots.length) % screenshots.length);
              }}
              aria-label={lang === "fr" ? "Image précédente" : "Previous image"}
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-colors duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span aria-hidden="true">‹</span>
            </button>
          )}

          {/* Image */}
          <img
            src={screenshots[lightbox]}
            alt={`${p.title} — ${lang === "fr" ? "capture" : "screenshot"} ${lightbox + 1}`}
            className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Flèche droite */}
          {screenshots.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => (prev! + 1) % screenshots.length);
              }}
              aria-label={lang === "fr" ? "Image suivante" : "Next image"}
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-colors duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span aria-hidden="true">›</span>
            </button>
          )}

          {/* Compteur */}
          <div className="absolute bottom-6 font-bebas text-xs text-white/60 z-10" aria-live="polite">
            {lightbox + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </div>
  );
}