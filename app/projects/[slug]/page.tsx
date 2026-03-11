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
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const p = project[lang as "en" | "fr"];

  const categories = Array.isArray((project as any).categories)
    ? (project as any).categories
    : (project as any).category
    ? [(project as any).category]
    : [];

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

            {/* Screenshots placeholder */}
            <div>
              <h2 className="font-display font-bold text-xl text-white mb-4">
                {t.projects.screenshots}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="h-40 rounded-xl border border-white/8 flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}08` }}
                  >
                    <span className="font-mono text-xs text-white/20">Screenshot {n}</span>
                  </div>
                ))}
              </div>
            </div>
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
    </div>
  );
}
