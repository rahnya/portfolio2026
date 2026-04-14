"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

type Category = "all" | "web" | "uxui" | "data" | "school";
type ButSkill = "tous" | "développer" | "concevoir" | "exprimer" | "comprendre" | "entreprendre";

export default function ProjectsPage() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<Category>("all");
  const [butSkill, setButSkill] = useState<ButSkill>("tous");
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
    { key: "all", label: t.projects.filter_all },
    { key: "web", label: t.projects.filter_web },
    { key: "uxui", label: t.projects.filter_uxui },
    { key: "data", label: t.projects.filter_data },
    { key: "school", label: t.projects.filter_school },
  ];

  const filtered = projectsData.filter((p) => {
    const categories = getCategories(p);
    if (active === "all") return true;
    if (!categories.includes(active)) return false;

    if (active === "school" && butSkill !== "tous") {
      const skills: string[] = (p as any).butSkills ?? [];
      return skills.includes(butSkill);
    }
    return true;
  });

  const handleImageError = (slug: string) => {
    setImageErrors((prev) => new Set([...prev, slug]));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-bebas text-xs text-primary dark:text-pink uppercase tracking-widest mb-4">
            — Portfolio
          </p>
          <h1 className="font-display text-5xl md:text-6xl dark:text-white mb-4">
            {t.projects.title}
          </h1>
          <p className="font-body dark:text-white/50 text-lg max-w-2xl">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`font-bebas text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                active === f.key
                  ? "bg-text-primary dark:bg-pink border-text-primary dark:border-pink text-white"
                  : "border-text-primary/10 dark:border-white/10 text-text-secondary dark:text-white/50 hover:border-text-primary/20 dark:hover:border-white/20 hover:text-text-primary dark:hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Filtres BUT — visibles uniquement dans l'onglet School */}
        {active === "school" && (
          <div className="flex flex-wrap gap-2 mb-12 -mt-6 pl-1 border-l-2 border-sunset-orange/30 dark:border-pink/30">
            {(["tous", "développer", "concevoir", "exprimer", "comprendre", "entreprendre"] as ButSkill[]).map(
              (skill) => (
                <button
                  key={skill}
                  onClick={() => setButSkill(skill)}
                  className={`font-bebas text-xs px-3 py-1.5 rounded-full border transition-all duration-200 capitalize ${
                    butSkill === skill
                      ? "bg-sunset-orange dark:bg-yellow border-sunset-orange dark:border-yellow text-white"
                      : "border-text-primary/10 dark:border-white/10 text-text-muted dark:text-white/40 hover:border-text-primary/20 dark:hover:border-white/20 hover:text-text-primary dark:hover:text-white"
                  }`}
                >
                  {skill}
                </button>
              )
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const p = project[lang as "en" | "fr"];
            const hasImage = p.screenshots && p.screenshots[0] && !imageErrors.has(project.slug);

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="card-hover group relative bg-white/85 dark:bg-navy/30 border border-text-primary/8 dark:border-white/8 rounded-2xl overflow-hidden hover:border-text-primary/15 dark:hover:border-white/15"
              >
                {/* Thumbnail */}
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
                        className="font-bebas text-[10px] px-2 py-1 rounded-full bg-text-primary/80 dark:bg-black/40 text-white border border-white/10 backdrop-blur-sm"
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
                        className="font-bebas text-[10px] px-2 py-1 rounded-full"
                        style={{ backgroundColor: `${project.color}25`, color: project.color }}
                      >
                        {cat.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-lg text-text-primary dark:text-white mb-2 group-hover:text-sunset-orange dark:group-hover:text-pink-light transition-colors duration-200">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary dark:text-white/50 leading-relaxed line-clamp-2">
                    {p.shortDescription}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bebas text-xs text-sunset-orange dark:text-pink-light group-hover:text-sunset-pink dark:group-hover:text-pink transition-colors duration-200">
                      {t.projects.view_project} →
                    </span>
                    <div className="flex gap-2">
                      {p.githubUrl && (
                        <span className="w-7 h-7 rounded-full border border-text-primary/10 dark:border-white/10 flex items-center justify-center text-text-muted dark:text-white/30">
                          <Github className="w-3 h-3" />
                        </span>
                      )}
                      {p.liveUrl && (
                        <span className="w-7 h-7 rounded-full border border-text-primary/10 dark:border-white/10 flex items-center justify-center text-text-muted dark:text-white/30">
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