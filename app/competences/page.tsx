"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import acLibrary from "@/data/ac-library.json";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

type Comp = "comprendre" | "concevoir" | "exprimer" | "développer" | "entreprendre";

// Mapping AC → compétence (déduit du préfixe : AC1X = BUT1 / AC2X = BUT2 / AC3X = BUT3)
function competenceOf(ac: string): Comp | null {
  // Le 4e caractère du code AC identifie la famille de compétence
  // AC11.xx = comprendre, AC12.xx = concevoir, AC13.xx = exprimer, AC14.xx = développer, AC15.xx = entreprendre
  // AC21.xx = comprendre, AC22.xx = concevoir, AC23.xx = exprimer, AC24.xx = développer, AC25.xx = entreprendre
  // AC34.xx = développer, AC35.xx = entreprendre
  const fam = ac.slice(2, 4); // ex "11", "24", "34"
  const second = fam.charAt(1);
  switch (second) {
    case "1": return "comprendre";
    case "2": return "concevoir";
    case "3": return "exprimer";
    case "4": return "développer";
    case "5": return "entreprendre";
    default: return null;
  }
}

function yearOf(ac: string): "BUT1" | "BUT2" | "BUT3" | null {
  const first = ac.charAt(2);
  if (first === "1") return "BUT1";
  if (first === "2") return "BUT2";
  if (first === "3") return "BUT3";
  return null;
}

const COMPETENCES: { key: Comp; label_fr: string; label_en: string; color: string; description_fr: string; description_en: string; }[] = [
  { key: "comprendre", label_fr: "Comprendre", label_en: "Understand",
    color: "#C9A9DC",
    description_fr: "Audits, recherche utilisateur, analyse stratégique, lecture critique d'écosystèmes.",
    description_en: "Audits, user research, strategic analysis, critical reading of ecosystems." },
  { key: "concevoir", label_fr: "Concevoir", label_en: "Design",
    color: "#FFA755",
    description_fr: "UX/UI, design systems, modélisation de données, spécifications techniques.",
    description_en: "UX/UI, design systems, data modeling, technical specifications." },
  { key: "exprimer", label_fr: "Exprimer", label_en: "Express",
    color: "#FFC72C",
    description_fr: "Identité visuelle, écriture, vidéo, contenus optimisés, communication multimédia.",
    description_en: "Visual identity, writing, video, optimised content, multimedia communication." },
  { key: "développer", label_fr: "Développer", label_en: "Develop",
    color: "#FF96B3",
    description_fr: "Apps Next.js, React Native, back Node, intégration WordPress, dispositifs interactifs sophistiqués.",
    description_en: "Next.js apps, React Native, Node back-end, WordPress integration, sophisticated interactive devices." },
  { key: "entreprendre", label_fr: "Entreprendre", label_en: "Initiate",
    color: "#7B638A",
    description_fr: "Snoozly, Rahnya Studio, alternance, engagement associatif, pilotage de projets.",
    description_en: "Snoozly, Rahnya Studio, apprenticeship, student union, project leadership." },
];

const YEAR_RECAP: Record<"BUT1" | "BUT2" | "BUT3", { fr: string; en: string }> = {
  BUT1: {
    fr: "Découverte transversale des 5 compétences. Premiers sites HTML/CSS, première identité visuelle, premiers contenus journalistiques, premier business plan, premiers entretiens utilisateurs. Tronc commun.",
    en: "Cross-cutting discovery of all 5 competences. First HTML/CSS sites, first visual identity, first journalistic content, first business plan, first user interviews. Common core."
  },
  BUT2: {
    fr: "Choix du parcours Développement Web et Dispositifs Interactifs. Approfondissement technique (React, Laravel, MVC, hébergement) et stratégique (SEO, parcours utilisateur, écosystèmes).",
    en: "Choice of the Web Development & Interactive Devices track. Technical (React, Laravel, MVC, hosting) and strategic (SEO, customer journeys, ecosystems) deepening."
  },
  BUT3: {
    fr: "Spécialisation : seulement Développer + Entreprendre dans le référentiel. Frameworks avancés, dispositifs interactifs sophistiqués, déploiement, pilotage de projet, défense convaincante. Alternance + Pépite en parallèle.",
    en: "Specialisation: only Develop + Initiate remain in the curriculum. Advanced frameworks, sophisticated interactive devices, deployment, project leadership, convincing pitches. Apprenticeship + Pépite incubation in parallel."
  },
};

export default function CompetencesPage() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  // For each competence, group AC by year + count of traces
  const matrix = COMPETENCES.map((c) => {
    const acsByYear: Record<string, string[]> = { BUT1: [], BUT2: [], BUT3: [] };
    Object.keys(acLibrary as Record<string, string>).forEach((ac) => {
      if (competenceOf(ac) === c.key) {
        const y = yearOf(ac);
        if (y) acsByYear[y].push(ac);
      }
    });
    // count traces per year that mobilize this competence
    const tracesByYear: Record<string, string[]> = { BUT1: [], BUT2: [], BUT3: [] };
    projectsData.forEach((p: any) => {
      const skills: string[] = p.butSkills || [];
      const year: string = p.year || "";
      if (skills.includes(c.key) && tracesByYear[year]) {
        tracesByYear[year].push(p.slug);
      }
    });
    return { ...c, acsByYear, tracesByYear };
  });

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-4">
            — {L("Parcours BUT MMI", "BUT MMI journey")}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-text-primary dark:text-white mb-5">
            {L("Monter en compétences.", "Building up skills.")}
          </h1>
          <p className="font-body text-text-secondary dark:text-white/75 text-lg leading-relaxed">
            {L(
              "Trois années pour parcourir cinq compétences. Cette page raconte la progression, année par année, avec les apprentissages critiques officiels et les traces de projets qui les ont mobilisés.",
              "Three years to traverse five competences. This page tells the progression, year by year, with the official critical learnings and the project traces that mobilised them."
            )}
          </p>
        </header>

        {/* Year overview strip */}
        <ScrollReveal>
          <section className="mb-16" aria-labelledby="year-overview">
            <h2 id="year-overview" className="sr-only">{L("Vue d'ensemble des années", "Year overview")}</h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["BUT1","BUT2","BUT3"] as const).map((y, i) => (
                <ScrollReveal key={y} delay={i * 0.08}>
                  <li className="relative bg-text-primary/10 dark:bg-navy/40 border border-text-primary/15 dark:border-white/10 rounded-2xl p-6 h-full">
                    <p className="font-bebas text-xs text-text-secondary dark:text-white/60 uppercase tracking-widest mb-2">
                      {L("Année", "Year")} {i + 1}
                    </p>
                    <h3 className="font-display text-3xl text-text-primary dark:text-white mb-3">
                      {y}
                    </h3>
                    <p className="font-body text-sm text-text-secondary dark:text-white/70 leading-relaxed">
                      {YEAR_RECAP[y][lang as "fr" | "en"]}
                    </p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </section>
        </ScrollReveal>

        {/* Per-competence blocks */}
        <section aria-labelledby="comp-blocks" className="space-y-20">
          <h2 id="comp-blocks" className="sr-only">{L("Détail par compétence", "Per-competence detail")}</h2>
          {matrix.map((c, idx) => {
            const totalAcs = c.acsByYear.BUT1.length + c.acsByYear.BUT2.length + c.acsByYear.BUT3.length;
            const totalTraces = c.tracesByYear.BUT1.length + c.tracesByYear.BUT2.length + c.tracesByYear.BUT3.length;
            return (
              <ScrollReveal key={c.key} delay={0.05}>
                <section aria-labelledby={`comp-${c.key}`}>
                  {/* Block header */}
                  <div className="flex items-baseline gap-4 mb-3">
                    <span
                      className="font-display text-5xl leading-none"
                      style={{ color: c.color }}
                      aria-hidden="true"
                    >
                      0{idx + 1}
                    </span>
                    <h3
                      id={`comp-${c.key}`}
                      className="font-display text-3xl md:text-4xl text-text-primary dark:text-white"
                    >
                      {lang === "fr" ? c.label_fr : c.label_en}
                    </h3>
                  </div>
                  <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed max-w-3xl mb-6">
                    {lang === "fr" ? c.description_fr : c.description_en}
                  </p>
                  <p className="font-bebas text-xs text-text-secondary dark:text-white/60 uppercase tracking-widest mb-8">
                    {totalAcs} {L("AC officiels", "official AC")} · {totalTraces} {L("traces", "traces")}
                    <Link
                      href={`/projects?butSkill=${encodeURIComponent(c.key)}`}
                      className="ml-3 underline underline-offset-4 hover:text-text-primary dark:hover:text-white"
                    >
                      {L("Voir les traces", "See traces")} →
                    </Link>
                  </p>

                  {/* Year columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
                    {(["BUT1","BUT2","BUT3"] as const).map((y) => {
                      const acs = c.acsByYear[y];
                      const traces = c.tracesByYear[y];
                      const isEmpty = acs.length === 0;
                      return (
                        <div
                          key={y}
                          className={`rounded-2xl p-5 border ${
                            isEmpty
                              ? "bg-text-primary/5 dark:bg-white/2 border-text-primary/8 dark:border-white/5 opacity-70"
                              : "bg-text-primary/10 dark:bg-navy/40 border-text-primary/15 dark:border-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: `${c.color}55` }}>
                            <span className="font-display text-base text-text-primary dark:text-white">{y}</span>
                            <span className="font-bebas text-[10px] text-text-secondary dark:text-white/55 uppercase tracking-widest">
                              {acs.length} AC · {traces.length} {L("traces", "traces")}
                            </span>
                          </div>
                          {isEmpty ? (
                            <p className="font-body text-xs italic text-text-muted dark:text-white/45">
                              {y === "BUT3" && (c.key === "comprendre" || c.key === "concevoir" || c.key === "exprimer")
                                ? L(
                                    "Non évaluée en BUT3 dans le parcours Dev Web (référentiel officiel).",
                                    "Not assessed in BUT3 for the Dev Web track (official curriculum)."
                                  )
                                : L("—", "—")}
                            </p>
                          ) : (
                            <ul className="space-y-1.5">
                              {acs.map((ac) => (
                                <li key={ac} className="font-body text-xs text-text-secondary dark:text-white/70 flex gap-1.5">
                                  <span
                                    className="font-bebas text-[10px] px-1 rounded text-text-primary dark:text-white border flex-shrink-0"
                                    style={{ backgroundColor: `${c.color}22`, borderColor: `${c.color}66` }}
                                  >
                                    {ac}
                                  </span>
                                  <span className="leading-snug">{(acLibrary as Record<string, string>)[ac]}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              </ScrollReveal>
            );
          })}
        </section>

        {/* Footer CTA */}
        <div className="mt-24 pt-12 border-t border-text-primary/15 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-body text-text-secondary dark:text-white/70 text-sm max-w-md">
            {L(
              "Chaque AC est mobilisé par au moins une trace. Cliquez sur une compétence ci-dessus pour filtrer le portfolio en conséquence.",
              "Every AC is mobilised by at least one trace. Click a competence above to filter the portfolio accordingly."
            )}
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-medium text-white bg-text-primary dark:bg-pink hover:bg-text-secondary dark:hover:bg-pink/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink self-start sm:self-auto"
          >
            {L("Toutes les traces", "All traces")}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
