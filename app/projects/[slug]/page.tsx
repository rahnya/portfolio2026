"use client";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import { ArrowLeft, Github, ExternalLink, CheckCircle2 } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const p = project[lang as "en" | "fr"];

  const categories = Array.isArray((project as any).categories)
    ? (project as any).categories
    : (project as any).category
    ? [(project as any).category]
    : [];

  const screenshots: string[] = Array.isArray(p.screenshots) ? p.screenshots : [];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white font-body text-sm mb-12 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {t.projects.title}
        </Link>

        {/* Hero */}
        <div
          className="relative rounded-3xl h-64 md:h-80 mb-12 overflow-hidden border border-white/8"
          style={{ backgroundColor: `${project.color}12` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 50%, ${project.color}35 0%, transparent 65%), radial-gradient(circle at 80% 20%, ${project.color}15 0%, transparent 50%)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat: string) => (
                <span
                  key={cat}
                  className="font-mono text-xs px-3 py-1 rounded-full w-fit"
                  style={{ backgroundColor: `${project.color}20`, color: project.color }}
                >
                  {cat.toUpperCase()}
                </span>
              ))}
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white">
              {p.title}
            </h1>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main */}
          <div className="md:col-span-2 space-y-10">

            {/* Description */}
            <div>
              <h2 className="font-display font-bold text-xl text-white mb-4">
                Description
              </h2>
              <p className="font-body text-white/60 leading-relaxed">{p.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-display font-bold text-xl text-white mb-4">
                {t.projects.features}
              </h2>
              <ul className="space-y-3">
                {p.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: project.color }}
                    />
                    <span className="font-body text-sm text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-xl text-white mb-4">
                  {t.projects.screenshots}
                </h2>
                <div className={`grid gap-4 ${screenshots.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                  {screenshots.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(i)}
                      className="rounded-xl overflow-hidden border border-white/8 hover:border-white/25 transition-all duration-200 cursor-zoom-in group"
                    >
                      <img
                        src={src}
                        alt={`${p.title} ${i + 1}`}
                        className="w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        style={{ maxHeight: "240px" }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech stack */}
            <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-6">
              <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                {t.projects.technologies}
              </h3>
              <div className="flex flex-wrap gap-2">
                {p.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded-full border border-white/8 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-6 space-y-3">
              <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                Links
              </h3>
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-200 group"
                >
                  <Github className="w-4 h-4" />
                  <span className="font-body text-sm">{t.projects.github}</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              )}
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-200 group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-body text-sm">{t.projects.live_demo}</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          {/* Fermer */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
          >
            ✕
          </button>

          {/* Flèche gauche */}
          {screenshots.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + screenshots.length) % screenshots.length);
              }}
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-colors duration-200"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <img
            src={screenshots[lightbox]}
            alt=""
            className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Flèche droite */}
          {screenshots.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % screenshots.length);
              }}
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-colors duration-200"
            >
              ›
            </button>
          )}

          {/* Compteur */}
          <div className="absolute bottom-6 font-mono text-xs text-white/40">
            {lightbox + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </div>
  );
}