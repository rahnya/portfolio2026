"use client";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowUpRight, Layers, Briefcase, Search, X as XIcon, SlidersHorizontal } from "lucide-react";

type Track = "all" | "pro";
type Category = "all" | "web" | "uxui" | "visuels" | "ar-vr-3d";
type ButSkill = "tous" | "comprendre" | "concevoir" | "exprimer" | "développer" | "entreprendre";
const ALLOWED_SKILLS: ButSkill[] = ["tous","comprendre","concevoir","exprimer","développer","entreprendre"];

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 px-6" />}>
      <ProjectsInner />
    </Suspense>
  );
}

function ProjectsInner() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const [track, setTrack] = useState<Track>("all");
  const [category, setCategory] = useState<Category>("all");
  const [butSkill, setButSkill] = useState<ButSkill>("tous");
  const [year, setYear] = useState<"all" | "BUT1" | "BUT2" | "BUT3">("all");
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [imgErr, setImgErr] = useState<Set<string>>(new Set());
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  useEffect(() => {
    const skillParam = searchParams.get("butSkill");
    const trackParam = searchParams.get("track");
    if (skillParam && (ALLOWED_SKILLS as string[]).includes(skillParam)) {
      setButSkill(skillParam as ButSkill);
      setShowAdvanced(true);
    }
    if (trackParam === "pro") setTrack("pro");
  }, [searchParams]);

  const getCats = (p: any): string[] => Array.isArray(p?.categories) ? p.categories : [];
  const isPro = (p: any) => getCats(p).some((c) => ["professional","entrepreneurship"].includes(c));

  const filters: { key: Category; label: string }[] = [
    { key: "all",      label: L("Tous", "All") },
    { key: "web",      label: "Web" },
    { key: "uxui",     label: "UX/UI" },
    { key: "visuels",  label: L("Visuels", "Visuals") },
    { key: "ar-vr-3d", label: "AR/VR/3D" },
  ];

  const filtered = (projectsData as any[]).filter((p) => {
    if (track === "pro" && !isPro(p)) return false;
    if (category !== "all" && !getCats(p).includes(category)) return false;
    if (butSkill !== "tous" && !(p.butSkills || []).includes(butSkill)) return false;
    if (year !== "all" && p.year !== year) return false;
    if (query) {
      const q = query.toLowerCase();
      const t = (p.fr?.title || "").toLowerCase() + " " + (p.en?.title || "").toLowerCase()
              + " " + (p.fr?.shortDescription || "").toLowerCase()
              + " " + (p.fr?.technologies || []).join(" ").toLowerCase();
      if (!t.includes(q)) return false;
    }
    return true;
  });

  const handleImgError = (slug: string) => setImgErr((prev) => new Set([...prev, slug]));
  const resetAll = () => { setTrack("all"); setCategory("all"); setButSkill("tous"); setYear("all"); setQuery(""); };
  const trackIcon = (k: Track) => k === "pro" ? <Briefcase className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />;
  const trackLabel = (k: Track) => k === "pro" ? L("Pro & Freelance", "Pro & Freelance") : L("Tous", "All");
  const skillsRow: ButSkill[] = ["tous","comprendre","concevoir","exprimer","développer","entreprendre"];
  const years = ["all","BUT3","BUT2","BUT1"] as const;

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-14 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-widest mb-4 text-rose dark:text-pink">
            — {L(`Portfolio · ${(projectsData as any[]).length} traces`, `Portfolio · ${(projectsData as any[]).length} traces`)}
          </p>
          <h1 className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
            {L("Mes travaux.", "My work.")}
          </h1>
          <p className="mt-5 font-body text-lg text-text-secondary dark:text-white/75 max-w-2xl leading-relaxed">
            {L(
              "De l'alternance à la startup en passant par les hackathons : trois années de pratique commentée et reliée aux apprentissages critiques du BUT MMI.",
              "From apprenticeship to startup via hackathons: three years of practice, annotated and tied to the BUT MMI critical learnings."
            )}
          </p>
        </header>

        {/* Filters */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div role="tablist" aria-label="Track" className="inline-flex p-1 rounded-full bg-text-primary/8 dark:bg-white/5 border border-text-primary/15 dark:border-white/10">
              {(["all","pro"] as Track[]).map((k) => (
                <button key={k} role="tab" aria-selected={track === k} onClick={() => setTrack(k)}
                  className={`font-body text-sm px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors ${
                    track === k ? "bg-text-primary dark:bg-pink text-cream dark:text-deep-dark" : "text-text-secondary dark:text-white/65 hover:text-text-primary dark:hover:text-white"
                  }`}>
                  {trackIcon(k)}{trackLabel(k)}
                </button>
              ))}
            </div>
            <div className="relative flex-1 min-w-[180px] max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-white/55 pointer-events-none" aria-hidden="true" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder={L("Rechercher…", "Search…")} aria-label={L("Rechercher", "Search")}
                className="w-full bg-text-primary/8 dark:bg-white/5 border border-text-primary/15 dark:border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink"
              />
            </div>
            <button onClick={() => setShowAdvanced((v) => !v)} aria-expanded={showAdvanced}
              className={`font-body text-sm px-4 py-1.5 rounded-full border inline-flex items-center gap-1.5 transition-colors ${
                showAdvanced || year !== "all" || butSkill !== "tous"
                  ? "bg-text-primary/12 dark:bg-white/10 border-text-primary/30 dark:border-white/25 text-text-primary dark:text-white"
                  : "border-text-primary/20 dark:border-white/15 text-text-secondary dark:text-white/65 hover:border-text-primary/40 dark:hover:border-white/30"
              }`}>
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              {L("Plus de filtres", "More filters")}
              {(year !== "all" || butSkill !== "tous") && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose dark:bg-pink text-white text-[10px] font-medium">
                  {(year !== "all" ? 1 : 0) + (butSkill !== "tous" ? 1 : 0)}
                </span>
              )}
            </button>
            {(track !== "all" || category !== "all" || butSkill !== "tous" || year !== "all" || query) && (
              <button onClick={resetAll} className="font-body text-xs text-text-secondary dark:text-white/65 hover:text-text-primary dark:hover:text-white underline underline-offset-4 inline-flex items-center gap-1">
                <XIcon className="w-3 h-3" /> {L("Réinitialiser","Reset")}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 pl-1">
            {filters.map((f) => (
              <button key={f.key} onClick={() => setCategory(f.key)} aria-pressed={category === f.key}
                className={`font-body text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  category === f.key
                    ? "bg-text-secondary dark:bg-pink border-text-secondary dark:border-pink text-cream dark:text-deep-dark"
                    : "border-text-primary/20 dark:border-white/15 text-text-secondary dark:text-white/65 hover:border-text-primary/40 dark:hover:border-white/30"
                }`}>
                {f.label}
              </button>
            ))}
          </div>

          {showAdvanced && (
            <div className="space-y-3 pt-4 border-t border-text-primary/12 dark:border-white/10 pl-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/55 mr-1">{L("Année","Year")} ·</span>
                {years.map((y) => (
                  <button key={y} onClick={() => setYear(y as any)} aria-pressed={year === y}
                    className={`font-body text-xs px-3 py-1 rounded-full border transition-colors ${
                      year === y
                        ? "bg-text-secondary dark:bg-pink/90 border-text-secondary dark:border-pink/90 text-cream dark:text-deep-dark"
                        : "border-text-primary/20 dark:border-white/15 text-text-secondary dark:text-white/65 hover:border-text-primary/40 dark:hover:border-white/30"
                    }`}>
                    {y === "all" ? L("Toutes","All") : y}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/55 mr-1">{L("Compétence MMI","MMI Competence")} ·</span>
                {skillsRow.map((s) => (
                  <button key={s} onClick={() => setButSkill(s)} aria-pressed={butSkill === s}
                    className={`font-body text-xs px-3 py-1 rounded-full border transition-colors capitalize ${
                      butSkill === s
                        ? "bg-text-secondary dark:bg-pink border-text-secondary dark:border-pink text-cream dark:text-deep-dark"
                        : "border-text-primary/20 dark:border-white/15 text-text-secondary dark:text-white/65 hover:border-text-primary/40 dark:hover:border-white/30"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="font-body text-xs text-text-secondary dark:text-white/55 mb-8" aria-live="polite">
          {filtered.length} {filtered.length > 1 ? L("traces","traces") : L("trace","trace")}
        </p>

        {filtered.length > 0 ? (
          <section aria-labelledby="archive-heading">
            <h2 id="archive-heading" className="sr-only">{L("Liste des projets","Project list")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
              {filtered.map((p, i) => {
                const pattern = i % 7;
                const span = pattern === 0 ? "md:col-span-3" : pattern === 1 ? "md:col-span-3"
                  : pattern === 2 ? "md:col-span-2" : pattern === 3 ? "md:col-span-2"
                  : pattern === 4 ? "md:col-span-2" : pattern === 5 ? "md:col-span-4" : "md:col-span-2";
                const isWide = ["md:col-span-3","md:col-span-4"].includes(span);
                return (
                  <ScrollReveal key={p.slug} delay={(i % 6) * 0.04} className={span}>
                    <ProjectCard project={p} large={isWide} lang={lang} onErr={handleImgError} imgErr={imgErr} />
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="text-center py-20">
            <p className="font-body italic text-xl text-text-secondary dark:text-white/65">
              {L("Aucune trace ne correspond à ces filtres.", "No traces match these filters.")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function ProjectCard({
  project, lang, onErr, imgErr, large,
}: { project: any; lang: string; onErr: (s: string) => void; imgErr: Set<string>; large?: boolean }) {
  const p = project[lang as "fr" | "en"] ?? project.fr;
  const accent: string = project.color || "#B03A50";
  const screenshot: string | undefined = p?.screenshots?.[0];
  const hasImage = screenshot && !imgErr.has(project.slug);

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={p.title}
      className="group block relative rounded-2xl overflow-hidden border border-text-primary/15 dark:border-white/10 bg-text-primary/6 dark:bg-white/3 hover:border-text-primary/40 dark:hover:border-white/25 transition-all duration-400 card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink h-full flex flex-col"
    >
      <div className={`relative ${large ? "aspect-[16/10]" : "aspect-[4/3]"} overflow-hidden`}>
        {hasImage ? (
          <img src={screenshot} alt="" loading="lazy" onError={() => onErr(project.slug)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0" style={{
            background: `radial-gradient(circle at 30% 40%, ${accent}55 0%, transparent 65%), radial-gradient(circle at 75% 75%, ${accent}25 0%, transparent 65%)`,
            backgroundColor: "var(--surface-strong)",
          }} aria-hidden="true" />
        )}
        <span className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${accent}, transparent 60%)` }} aria-hidden="true" />
        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream/95 dark:bg-deep-dark/85 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4 text-text-primary dark:text-white" aria-hidden="true" />
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="font-body text-[11px] text-text-secondary dark:text-white/55 mb-2">
          {project.year}
          {(project.categories || []).filter((c: string) => !["school","professional","entrepreneurship"].includes(c)).slice(0,1).map((c: string) => (
            <span key={c}> · {c}</span>
          ))}
        </p>
        <h3 className="font-display text-lg text-text-primary dark:text-white mb-2 leading-snug">{p.title}</h3>
        <p className="font-body text-sm text-text-secondary dark:text-white/70 leading-relaxed line-clamp-2">
          {p.shortDescription}
        </p>
      </div>
    </Link>
  );
}
