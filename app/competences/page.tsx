"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import acLibrary from "@/data/ac-library.json";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Info, ChevronDown } from "lucide-react";

type Year = "BUT1" | "BUT2" | "BUT3" | "M1";
type Skill = "comprendre" | "concevoir" | "exprimer" | "développer" | "entreprendre";
const YEARS: Year[] = ["BUT1", "BUT2", "BUT3", "M1"];

// AC BUT par année × compétence
const AC_BY_YEAR_SKILL: Record<"BUT1"|"BUT2"|"BUT3", Record<Skill, string[]>> = {
  BUT1: {
    comprendre:  ["AC11.01","AC11.02","AC11.03","AC11.04","AC11.05","AC11.06"],
    concevoir:   ["AC12.01","AC12.02","AC12.03","AC12.04"],
    exprimer:    ["AC13.01","AC13.02","AC13.03","AC13.04","AC13.05","AC13.06"],
    développer:  ["AC14.01","AC14.02","AC14.03","AC14.04","AC14.05","AC14.06"],
    entreprendre:["AC15.01","AC15.02","AC15.03","AC15.04","AC15.05","AC15.06","AC15.07"],
  },
  BUT2: {
    comprendre:  ["AC21.01","AC21.02","AC21.03","AC21.04","AC21.05"],
    concevoir:   ["AC22.01","AC22.02","AC22.03","AC22.04","AC22.05"],
    exprimer:    ["AC23.01","AC23.02","AC23.03","AC23.04","AC23.05","AC23.06"],
    développer:  ["AC24.01","AC24.02","AC24.03","AC24.04","AC24.05","AC24.06"],
    entreprendre:["AC25.01","AC25.02","AC25.03","AC25.04","AC25.05","AC25.06"],
  },
  BUT3: {
    comprendre: [], concevoir: [], exprimer: [],
    développer:  ["AC34.01","AC34.02","AC34.03","AC34.04","AC34.05"],
    entreprendre:["AC35.01","AC35.02","AC35.03","AC35.04"],
  },
};

// Master 1 MSI — Parcours Management de l'Entreprise en Réseau (Toulouse)
// UE prévues (0 trace pour le moment)
type M1Block = { code: string; title_fr: string; title_en: string; sub: string[] };
const M1_UE: M1Block[] = [
  { code: "KSIB7AAU", title_fr: "Fondamentaux de gestion", title_en: "Management fundamentals",
    sub: ["Logistique", "Planification & contrôle", "Stratégie"] },
  { code: "KSIB7ABU", title_fr: "Systèmes d'information", title_en: "Information systems",
    sub: ["ERP", "SI comptable & tableaux de bord"] },
  { code: "KSIB7ACU", title_fr: "Management de projets", title_en: "Project management",
    sub: ["Pilotage de projets", "Investissement & financement", "Management d'équipes transverses"] },
  { code: "KSIB7ADU", title_fr: "Recherche & projets", title_en: "Research & projects",
    sub: ["Initiation à la recherche", "Formation-action : coordination de projets"] },
  { code: "KSIB7AEU", title_fr: "Méthodes & outils de communication", title_en: "Methods & communication tools",
    sub: ["Bilan de professionnalisation", "Langue étrangère appliquée"] },
  { code: "KSIB8AAU", title_fr: "Spécialisation MER : Ingénierie des SI", title_en: "MER Specialisation: IS Engineering",
    sub: [] },
  { code: "KSIB8ABU", title_fr: "Systèmes d'information (S2)", title_en: "Information systems (S2)",
    sub: ["Démarches d'amélioration continue", "Projets SI & marketing digital", "Outils de gestion de projets"] },
  { code: "KSIB8ACU", title_fr: "Management de projets (S2)", title_en: "Project management (S2)",
    sub: ["Évaluation de projets", "Diagnostic & management des risques"] },
  { code: "KSIB8AFU", title_fr: "Stage", title_en: "Internship", sub: [] },
];

const SKILL_ORDER: Skill[] = ["comprendre","concevoir","exprimer","développer","entreprendre"];
const SKILL_COLOR: Record<Skill,string> = {
  comprendre: "text-plum dark:text-purple",
  concevoir:  "text-copper dark:text-yellow",
  exprimer:   "text-rose dark:text-pink",
  développer: "text-gold dark:text-yellow",
  entreprendre: "text-plum dark:text-purple",
};

export default function CompetencesPage() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const [activeYear, setActiveYear] = useState<Year>("BUT3");
  const [openAC, setOpenAC] = useState<string | null>(null);

  const projectsByAC = (ac: string) => (projectsData as any[]).filter((p) => (p.acs || []).includes(ac));
  const allButACs = Object.values(AC_BY_YEAR_SKILL).flatMap((y) => Object.values(y).flat());
  const coveredACs = new Set((projectsData as any[]).flatMap((p) => p.acs || []));
  const stats = {
    total: allButACs.length,
    covered: allButACs.filter((ac) => coveredACs.has(ac)).length,
  };

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <header className="mb-14 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-widest mb-4 text-rose dark:text-pink">
            — {L("Parcours","Journey")}
          </p>
          <h1 className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
            {L("Trois ans, ", "Three years, ")}<span className="text-rose dark:text-pink">{L("cinq compétences.","five competences.")}</span>
          </h1>
          <p className="mt-5 font-body text-lg text-text-secondary dark:text-white/75 leading-relaxed">
            {L(
              "Mon dossier pour le jury du BUT MMI — chaque apprentissage critique (AC) relié à ses traces. Rentrée 2026 : Master MSI parcours Management de l'Entreprise en Réseau à Toulouse.",
              "My BUT MMI portfolio dossier — each critical learning (AC) linked to its evidence. From September 2026: Master's MSI in Toulouse."
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-text-primary/12 dark:border-white/10">
            <div>
              <p className="font-display text-3xl text-text-primary dark:text-white tabular">{stats.covered}/{stats.total}</p>
              <p className="font-body text-xs text-text-secondary dark:text-white/60 uppercase tracking-widest mt-1">{L("AC BUT couverts","BUT ACs covered")}</p>
            </div>
            <div>
              <p className="font-display text-3xl text-text-primary dark:text-white tabular">{(projectsData as any[]).length}</p>
              <p className="font-body text-xs text-text-secondary dark:text-white/60 uppercase tracking-widest mt-1">{L("Traces","Traces")}</p>
            </div>
            <div>
              <p className="font-display text-3xl text-text-primary dark:text-white tabular">M1</p>
              <p className="font-body text-xs text-text-secondary dark:text-white/60 uppercase tracking-widest mt-1">{L("Rentrée 2026","Sept 2026")}</p>
            </div>
          </div>
        </header>

        {/* Year filter */}
        <div className="mb-14 inline-flex p-1 rounded-full bg-text-primary/8 dark:bg-white/5 border border-text-primary/15 dark:border-white/10" role="tablist" aria-label={L("Année","Year")}>
          {YEARS.map((y) => (
            <button key={y} role="tab" aria-selected={activeYear === y} onClick={() => { setActiveYear(y); setOpenAC(null); }}
              className={`font-display text-sm tracking-wide px-5 py-1.5 rounded-full transition-colors ${
                activeYear === y ? "bg-text-primary dark:bg-pink text-cream dark:text-deep-dark" : "text-text-secondary dark:text-white/65 hover:text-text-primary dark:hover:text-white"
              }`}>
              {y}
            </button>
          ))}
        </div>

        {/* Contenu */}
        {activeYear === "M1" ? (
          <>
            <YearNote year="M1" lang={lang} />
            <M1View lang={lang} />
          </>
        ) : (
          <>
            <YearNote year={activeYear} lang={lang} />
            <ButView year={activeYear} lang={lang} openAC={openAC} setOpenAC={setOpenAC} projectsByAC={projectsByAC} />
          </>
        )}

        <ScrollReveal direction="up">
          <div className="mt-20 pt-8 border-t border-text-primary/12 dark:border-white/10 flex items-start gap-3 max-w-3xl">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-text-secondary dark:text-white/60" aria-hidden="true" />
            <p className="font-body text-sm text-text-secondary dark:text-white/70 leading-relaxed">
              {L(
                "BUT3 en cours, M1 en préparation. Le portfolio est pensé pour évoluer avec le master (MSI parcours MER) puis un horizon MITAT — chaque étape trouve sa place ici.",
                "BUT3 in progress, M1 upcoming. Portfolio designed to evolve with the master's, then a possible MITAT horizon."
              )}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}

// ─── Note d'évolution par année (auto-évaluation) ──────────────────────
function YearNote({ year, lang }: { year: Year; lang: string }) {
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const notes: Record<Year, { title_fr: string; title_en: string; body_fr: string; body_en: string }> = {
    BUT1: {
      title_fr: "BUT1 — je découvre",
      title_en: "BUT1 — discovering",
      body_fr: "L'année où j'ai posé les fondations. HTML/CSS, méthodes d'analyse, entretiens utilisateurs, création graphique, communication produit. J'ai touché à chaque discipline sans encore savoir laquelle je préférais — et c'est précisément ce qui m'a permis de garder plus tard un profil hybride.",
      body_en: "The year I built the foundations. HTML/CSS, analysis methods, user interviews, graphic creation, product communication. I touched every discipline without knowing yet which I preferred — and that's precisely what let me keep a hybrid profile later.",
    },
    BUT2: {
      title_fr: "BUT1 → BUT2 — je commence à livrer",
      title_en: "BUT1 → BUT2 — starting to deliver",
      body_fr: "Passage à la mise en pratique. Là où le BUT1 posait les bases, le BUT2 me met en position de livrer : premières apps Laravel, premiers projets pilotés en équipe, premiers audits pour des vrais clients. Les disciplines commencent à s'articuler entre elles — le code sert le design, la stratégie encadre le développement.",
      body_en: "Moving to practice. Where BUT1 laid the groundwork, BUT2 puts me in position to deliver: first Laravel apps, first team-led projects, first audits for real clients. Disciplines start articulating with each other — code serves design, strategy frames development.",
    },
    BUT3: {
      title_fr: "BUT2 → BUT3 — je bascule dans le réel",
      title_en: "BUT2 → BUT3 — into the real world",
      body_fr: "L'année où théorie et professionnel se rejoignent. L'alternance chez Weproc me fait passer d'exercices étudiants à des livrables qui existent en production, avec impact SEO mesurable. Snoozly, en parallèle, me demande d'assumer un projet de bout en bout — sans filet, sans énoncé. J'apprends à décider seule quand personne ne peut trancher à ma place.",
      body_en: "The year where theory and professional life meet. My apprenticeship at Weproc takes me from student exercises to real production deliverables with measurable SEO impact. In parallel, Snoozly requires me to own a project end to end — no safety net, no brief. I learn to decide alone when no one else can call the shot.",
    },
    M1: {
      title_fr: "BUT3 → M1 — j'élargis vers le pilotage",
      title_en: "BUT3 → M1 — expanding into management",
      body_fr: "Le master MSI parcours Management de l'Entreprise en Réseau (Toulouse) élargit vers le pilotage global d'organisation. Logistique, stratégie, systèmes d'information, ingénierie et management de projet, gestion d'équipes transverses. L'objectif : cumuler mon socle MMI (produit, design, code, SEO) avec une culture solide en management, pour piloter en connaissant tous les métiers autour de la table.",
      body_en: "The Master's MSI (Networked Enterprise Management, Toulouse) broadens the scope toward whole-organisation piloting. Logistics, strategy, information systems, project engineering, cross-team management. The goal: layer solid management culture on top of my MMI base (product, design, code, SEO), to lead knowing every discipline around the table.",
    },
  };

  const n = notes[year];
  return (
    <ScrollReveal direction="up" distance={12} className="mb-10">
      <div className="p-5 md:p-6 rounded-2xl border border-text-primary/12 dark:border-white/10 bg-text-primary/4 dark:bg-white/3 max-w-3xl">
        <p className="font-display text-[10px] uppercase tracking-widest text-rose dark:text-pink mb-2">
          {L("Auto-évaluation","Self-assessment")} · {year}
        </p>
        <h3 className="font-display text-xl md:text-2xl text-text-primary dark:text-white mb-3 leading-tight">
          {lang === "fr" ? n.title_fr : n.title_en}
        </h3>
        <p className="font-body text-sm md:text-base text-text-secondary dark:text-white/75 leading-relaxed">
          {lang === "fr" ? n.body_fr : n.body_en}
        </p>
      </div>
    </ScrollReveal>
  );
}

// ─── Vue BUT : liste plate d'AC par compétence ──────────────────────────
function ButView({ year, lang, openAC, setOpenAC, projectsByAC }: {
  year: "BUT1"|"BUT2"|"BUT3"; lang: string;
  openAC: string | null; setOpenAC: (v: string | null) => void;
  projectsByAC: (ac: string) => any[];
}) {
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <div className="space-y-14">
      {SKILL_ORDER.map((skill) => {
        const acs = AC_BY_YEAR_SKILL[year][skill];
        if (!acs.length) return null;
        return (
          <ScrollReveal key={skill} direction="up" distance={12}>
            <section aria-labelledby={`skill-${year}-${skill}`}>
              <header className="flex items-baseline gap-4 mb-5 pb-3 border-b border-text-primary/12 dark:border-white/10">
                <h2 id={`skill-${year}-${skill}`} className={`font-display text-2xl md:text-3xl capitalize ${SKILL_COLOR[skill]}`}>
                  {skill}
                </h2>
                <span className="font-body text-xs text-text-secondary dark:text-white/55">
                  {acs.length} AC · {acs.filter((ac) => projectsByAC(ac).length > 0).length} {L("couvert" + (acs.filter((ac) => projectsByAC(ac).length > 0).length > 1 ? "s" : ""),"covered")}
                </span>
              </header>

              <ul className="divide-y divide-text-primary/10 dark:divide-white/8">
                {acs.map((ac) => {
                  const label = (acLibrary as Record<string, string>)[ac] || "";
                  const projects = projectsByAC(ac);
                  const isOpen = openAC === ac;
                  const covered = projects.length > 0;
                  return (
                    <li key={ac}>
                      <button
                        onClick={() => setOpenAC(isOpen ? null : ac)}
                        disabled={!covered}
                        aria-expanded={isOpen}
                        className={`w-full text-left py-3.5 flex items-start gap-4 transition-colors ${
                          covered ? "hover:bg-text-primary/4 dark:hover:bg-white/2 -mx-3 px-3 rounded-lg cursor-pointer" : "opacity-45"
                        }`}
                      >
                        <span className="font-display text-sm text-text-primary dark:text-white tabular pt-0.5 w-16 flex-shrink-0">{ac}</span>
                        <span className="font-body text-sm text-text-secondary dark:text-white/75 flex-1 leading-snug">{label}</span>
                        {covered && (
                          <span className="font-body text-xs text-text-secondary dark:text-white/60 tabular flex-shrink-0 flex items-center gap-2">
                            {projects.length} {projects.length > 1 ? L("traces","traces") : L("trace","trace")}
                            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                          </span>
                        )}
                      </button>
                      {isOpen && covered && (
                        <div className="pl-16 pb-4 pr-3 -mx-3 space-y-1.5">
                          {projects.map((p: any) => (
                            <Link key={p.slug} href={`/projects/${p.slug}`} className="group flex items-center gap-2 font-body text-sm text-text-primary dark:text-white/85 hover:text-text-primary dark:hover:text-white transition-colors">
                              <span className="opacity-40">·</span>
                              <span className="link-underline">{p.fr.title}</span>
                              <ArrowRight className="w-3 h-3 opacity-40 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

// ─── Vue M1 MSI ────────────────────────────────────────────────────────
function M1View({ lang }: { lang: string }) {
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  return (
    <div className="space-y-4">
      {M1_UE.map((ue) => (
          <ScrollReveal key={ue.code} direction="up" distance={12}>
            <div className="rounded-xl border border-text-primary/12 dark:border-white/10 bg-text-primary/4 dark:bg-white/3 p-5 md:p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/55 mb-1">{ue.code}</p>
                  <h3 className="font-display text-xl text-text-primary dark:text-white leading-tight">{lang === "fr" ? ue.title_fr : ue.title_en}</h3>
                </div>
                <span className="font-body text-[11px] text-text-secondary dark:text-white/55 opacity-70 whitespace-nowrap">0 {L("trace","trace")}</span>
              </div>
              {ue.sub.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mt-2">
                  {ue.sub.map((s, i) => (
                    <li key={i} className="font-body text-xs px-2.5 py-1 rounded-full text-text-secondary dark:text-white/70 border border-text-primary/15 dark:border-white/10 opacity-80">{s}</li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollReveal>
        ))}
    </div>
  );
}
