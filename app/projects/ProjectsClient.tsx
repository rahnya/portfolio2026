"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import { ArrowUpRight, Github, ExternalLink, Briefcase, GraduationCap, Layers } from "lucide-react";

type Track = "all" | "pro" | "school";
type Category = "all" | "web" | "uxui" | "data";
type ButSkill = "tous" | "comprendre" | "concevoir" | "exprimer" | "développer" | "entreprendre";

const ALLOWED_SKILLS: ButSkill[] = ["tous", "comprendre", "concevoir", "exprimer", "développer", "entreprendre"];

export default function ProjectsClient() {
  const { t, lang } = useLang();
  const searchParams = useSearchParams();
  const [track, setTrack] = useState<Track>("all");
  const [category, setCategory] = useState<Category>("all");
  const [butSkill, setButSkill] = useState<ButSkill>("tous");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Read ?butSkill=X (and optional ?track=school) on first mount to pre-apply
  // filters when the user arrives from a deep link (e.g. the home BUT competence cards).
  useEffect(() => {
    const skillParam = searchParams.get("butSkill");
    const trackParam = searchParams.get("track");
    if (skillParam && (ALLOWED_SKILLS as string[]).includes(skillParam)) {
      // BUT skill filter only makes sense within the Academic track,
      // so flip the track automatically.
      setTrack("school");
      setButSkill(skillParam as ButSkill);
    } else if (trackParam === "pro" || trackParam === "school") {
      setTrack(trackParam as Track);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = (project: any): string[] => {
    if (Array.isArray((project as any).categories)) return (project as any).categories;
    if ((project as any).category) return [(project as any).category];
    return [];
  };

  const isPro = (project: any) =>
    getCategories(project).some((c) => ["professional", "entrepreneurship"].includes(c));
  const isSchool = (project: any) => getCategories(project).includes("school");

  const filters: { key: Category; label: string }[] = [
    { key: "all", label: t.projects.filter_all },
    { key: "web", label: t.projects.filter_web },
    { key: "uxui", label: t.projects.filter_uxui },
    { key: "data", label: t.projects.filter_data },
  ];

  const filtered = projectsData.filter((p) => {
    // Track filter
    if (track === "pro" && !isPro(p)) return false;
    if (track === "school" && !isSchool(p)) return false;

    // Category filter (independent of track when not "all")
    const categories = getCategories(p);
    if (category !== "all" && !categories.includes(category)) return false;

    // BUT skill filter — only applies in Academic track
    if (track === "school" && butSkill !== "tous") {
      const skills: string[] = (p as any).butSkills ?? [];
      if (!skills.includes(butSkill)) return false;
    }
    return true;
  });

  // When switching track, reset the BUT skill filter (academic-only) to avoid stale state
  const handleTrackChange = (k: Track) => {
    setTrack(k);
    if (k !== "school") setButSkill("tous");
  };

  const handleImageError = (slug: string) => {
    setImageErrors((prev) => new Set([...prev, slug]));
  };

  // Localised track labels
  const trackLabel = (k: Track) =>
    k === "all"
      ? (lang === "fr" ? "Tout" : "All")
      : k === "pro"
      ? (lang === "fr" ? "Pro & Freelance" : "Pro & Freelance")
      : (lang === "fr" ? "Académique" : "Academic");

  const trackIcon = (k: Track) =>
    k === "all" ? <Layers className="w-3.5 h-3.5" /> : k === "pro" ? <Briefcase className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />;

  const skillsRow: ButSkill[] = ["tous", "comprendre", "concevoir", "exprimer", "développer", "entreprendre"];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-4">
            — Portfolio
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-text-primary dark:text-white mb-4">
            {t.projects.title}
          </h1>
          <p className="font-body text-text-secondary dark:text-white/60 text-lg max-w-2xl">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Track switcher (Pro / Académique / Tout) */}
        <div
          className="inline-flex p-1 mb-6 rounded-full bg-text-primary/5 dark:bg-white/5 border border-text-primary/10 dark:border-white/10"
          role="tablist"
          aria-label={lang === "fr" ? "Parcours" : "Track"}
        >
          {(["all", "pro", "school"] as Track[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={track === k}
              onClick={() => handleTrackChange(k)}
              className={`font-body text-sm px-4 py-1.5 rounded-full transition-all duration-200 inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink ${
                track === k
                  ? "bg-text-primary dark:bg-pink text-white shadow-sm"
                  : "text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white"
              }`}
            >
              {trackIcon(k)}
              {trackLabel(k)}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label={lang === "fr" ? "Catégorie" : "Category"}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setCategory(f.key)}
              aria-pressed={category === f.key}
              className={`font-bebas text-xs px-4 py-2 rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink ${
                category === f.key
                  ? "bg-text-primary dark:bg-pink border-text-primary dark:border-pink text-white"
                  : "border-text-primary/15 dark:border-white/10 text-text-secondary dark:text-white/60 hover:border-text-primary/30 dark:hover:border-white/20 hover:text-text-primary dark:hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* BUT competence filters — only shown in Academic track (pluridisciplinarité argument is academic) */}
        {track === "school" && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pl-1">
            <span className="font-bebas text-[10px] text-text-secondary dark:text-white/50 uppercase tracking-widest mr-1">
              {lang === "fr" ? "Compétence MMI" : "MMI Competence"} —
            </span>
            {skillsRow.map((skill) => (
              <button
                key={skill}
                onClick={() => setButSkill(skill)}
                aria-pressed={butSkill === skill}
                className={`font-bebas text-xs px-3 py-1.5 rounded-full border transition-all duration-200 capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink ${
                  butSkill === skill
                    ? "bg-sunset-orange dark:bg-pink border-sunset-orange dark:border-pink text-white"
                    : "border-text-primary/10 dark:border-white/10 text-text-secondary dark:text-white/60 hover:border-text-primary/25 dark:hover:border-white/25 hover:text-text-primary dark:hover:text-white"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        )}
        {track !== "school" && <div className="mb-10" />}

        {/* Result count */}
        <p
          className="font-bebas text-xs text-text-muted dark:text-white/40 mb-6"
          aria-live="polite"
        >
          {filtered.length} {lang === "fr" ? (filtered.length > 1 ? "projets affichés" : "projet affiché") : (filtered.length > 1 ? "projects shown" : "project shown")}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-text-muted dark:text-white/40">
              {lang === "fr" ? "Aucun projet ne correspond à ces filtres." : "No project matches these filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => {
              const p = project[lang as "en" | "fr"];
              const hasImage = p.screenshots && p.screenshots[0] && !imageErrors.has(project.slug);
              const skills: string[] = (project as any).butSkills ?? [];

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="card-hover group relative bg-text-primary/10 dark:bg-navy/30 border border-text-primary/15 dark:border-white/8 rounded-2xl overflow-hidden hover:border-text-primary/30 dark:hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  aria-label={`${p.title} — ${p.shortDescription}`}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative h-52 overflow-hidden bg-cover bg-center bg-text-primary/15 dark:bg-navy/40"
                  >
                    {hasImage ? (
                      <img
                        src={p.screenshots[0]}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(project.slug)}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 30% 50%, ${project.color}55 0%, transparent 70%)`,
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Tech stack pills */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-bebas text-[10px] px-2 py-1 rounded-full bg-black/55 text-white border border-white/15 backdrop-blur-sm"
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
                          className="font-bebas text-[10px] px-2 py-1 rounded-full text-white backdrop-blur-sm border"
                          style={{ backgroundColor: `${project.color}aa`, borderColor: project.color }}
                        >
                          {cat.toUpperCase()}
                        </span>
                      ))}
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowUpRight className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-display text-lg text-text-primary dark:text-white mb-2 group-hover:text-sunset-orange dark:group-hover:text-pink-light transition-colors duration-200">
                      {p.title}
                    </h2>
                    <p className="font-body text-sm text-text-secondary dark:text-white/60 leading-relaxed line-clamp-2">
                      {p.shortDescription}
                    </p>

                    {/* BUT competence dots — visualises pluridisciplinarité at a glance */}
                    {skills.length > 0 && (
                      <div className="mt-4 flex items-center gap-1.5" aria-label={`${skills.length} ${lang === "fr" ? "compétences mobilisées" : "competences"}`}>
                        {skills.map((s) => (
                          <span
                            key={s}
                            title={s}
                            className="font-bebas text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider text-text-primary dark:text-white border"
                            style={{ backgroundColor: `${project.color}20`, borderColor: `${project.color}55` }}
                          >
                            {s.slice(0, 4)}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bebas text-xs text-sunset-orange dark:text-pink-light group-hover:text-sunset-pink dark:group-hover:text-pink transition-colors duration-200">
                        {t.projects.view_project} →
                      </span>
                      <div className="flex gap-2">
                        {p.githubUrl && (
                          <span className="w-7 h-7 rounded-full border border-text-primary/10 dark:border-white/10 flex items-center justify-center text-text-muted dark:text-white/30" aria-hidden="true">
                            <Github className="w-3 h-3" />
                          </span>
                        )}
                        {p.liveUrl && (
                          <span className="w-7 h-7 rounded-full border border-text-primary/10 dark:border-white/10 flex items-center justify-center text-text-muted dark:text-white/30" aria-hidden="true">
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
        )}
      </div>
    </div>
  );
}
