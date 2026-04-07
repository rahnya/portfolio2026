"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

type Category = "all" | "web" | "uxui" | "data" | "school";

export default function ProjectsPage() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<Category>("all");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const getCategories = (project: any): string[] => {
    if (Array.isArray((project as any).categories)) {
      return (project as any).categories;
    }
    if ((project as any).category) {
      return [(project as any).category];
    }
    return [];
  };

  const filters: { key: Category; label: string }[] = [
    { key: "all",    label: t.projects.filter_all },
    { key: "web",    label: t.projects.filter_web },
    { key: "uxui",   label: t.projects.filter_uxui },
    { key: "data",   label: t.projects.filter_data },
    { key: "school", label: t.projects.filter_school },
  ];

  const filtered = projectsData.filter((p) => {
    if (active === "all") return true;
    const categories = getCategories(p);
    return categories.includes(active);
  });

  const handleImageError = (slug: string) => {
    setImageErrors(prev => new Set([...prev, slug]));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#FF6B35] dark:text-[#FF3B8D] uppercase tracking-widest mb-4">
            — Portfolio
          </p>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4">
            {t.projects.title}
          </h1>
          <p className="font-body text-white/50 text-lg max-w-2xl">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                active === f.key
                  ? "bg-[#FF3B8D] border-[#FF3B8D] text-white"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const p = project[lang as "en" | "fr"];
            const hasImage = p.screenshots && p.screenshots[0] && !imageErrors.has(project.slug);
            
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="card-hover group relative bg-[#183153]/30 border border-white/8 rounded-2xl overflow-hidden hover:border-white/15"
              >
                {/* Thumbnail with screenshot or color splash */}
                <div
                  className="relative h-52 overflow-hidden bg-cover bg-center"
                  style={{ backgroundColor: `${project.color}15` }}
                >
                  {hasImage ? (
                    <img
                      src={p.screenshots[0]}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(project.slug)}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 30% 50%, ${project.color}30 0%, transparent 70%)`,
                      }}
                    />
                  )}
                  {/* Tech stack pills */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-1 rounded-full bg-black/40 text-white/60 border border-white/10 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Category tag */}
                  <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-1 max-w-[60%]">
                    {getCategories(project).map((cat) => (
                      <span
                        key={cat}
                        className="font-mono text-[10px] px-2 py-1 rounded-full"
                        style={{ backgroundColor: `${project.color}25`, color: project.color }}
                      >
                        {cat.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  {/* Arrow indicator */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#FF96B3] transition-colors duration-200">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed line-clamp-2">
                    {p.shortDescription}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#FF96B3] group-hover:text-[#FF3B8D] transition-colors duration-200">
                      {t.projects.view_project} →
                    </span>
                    <div className="flex gap-2">
                      {p.githubUrl && (
                        <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30">
                          <Github className="w-3 h-3" />
                        </span>
                      )}
                      {p.liveUrl && (
                        <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30">
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}