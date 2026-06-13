"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import ScrollReveal from "@/components/ScrollReveal";
import { SnoozlyCapsuleIllustration, StudioNetworkIllustration } from "@/components/PepiteIllustrations";
import { ArrowRight, ArrowUpRight, Award, Network, Sparkles } from "lucide-react";

type ProjectKey = "snoozly" | "studio";

export default function PepitePage() {
  const { lang } = useLang();
  const [active, setActive] = useState<ProjectKey>("snoozly");

  const t = lang === "fr"
    ? {
        eyebrow: "— Pépite & Entrepreneuriat",
        title: "Entreprendre",
        lead:
          "Statut National Étudiant-Entrepreneur (SNEE), accompagnement Pépite Méditerranée. Deux projets en parallèle : Snoozly côté startup à impact, Rahnya Studio côté activité freelance — avec une plateforme annexe en construction.",
        pickerLabel: "Projet",
        contactCta: "Discutons-en",
      }
    : {
        eyebrow: "— Pépite & Entrepreneurship",
        title: "Building",
        lead:
          "France's Student-Entrepreneur status (SNEE), Pépite Méditerranée incubation. Two parallel projects: Snoozly on the impact-startup side, Rahnya Studio as the freelance practice — with a sister platform in the works.",
        pickerLabel: "Project",
        contactCta: "Let's talk",
      };

  const tabs: { key: ProjectKey; label: string; color: string }[] = [
    { key: "snoozly", label: "Snoozly", color: "#FF96B3" },
    { key: "studio",  label: "Rahnya Studio", color: "#FFA755" },
  ];

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ─── Header ────────────────────────────────────────────────── */}
        <header className="mb-12 max-w-3xl">
          <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-4">
            {t.eyebrow}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-text-primary dark:text-white mb-5">
            {t.title}
          </h1>
          <p className="font-body text-text-secondary dark:text-white/75 text-lg leading-relaxed">
            {t.lead}
          </p>
        </header>

        {/* ─── Tab picker ────────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label={t.pickerLabel}
          className="inline-flex p-1 mb-12 rounded-full bg-text-primary/10 dark:bg-white/5 border border-text-primary/15 dark:border-white/10"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.key)}
                className={`font-body text-sm px-5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink ${
                  isActive
                    ? "text-white shadow-sm"
                    : "text-text-secondary dark:text-white/65 hover:text-text-primary dark:hover:text-white"
                }`}
                style={isActive ? { backgroundColor: tab.color } : {}}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── Active view ───────────────────────────────────────────── */}
        {active === "snoozly" ? <SnoozlyView lang={lang} /> : <StudioView lang={lang} />}

        {/* ─── Footer CTA ────────────────────────────────────────────── */}
        <div className="mt-24 pt-12 border-t border-text-primary/15 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-body text-text-secondary dark:text-white/65 text-sm max-w-md">
            {lang === "fr"
              ? "Pour collaborer, investir, échanger ou simplement comprendre ces projets de plus près."
              : "Reach out to collaborate, invest, talk, or simply get closer to these projects."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-medium text-white bg-text-primary dark:bg-pink hover:bg-text-secondary dark:hover:bg-pink/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink self-start sm:self-auto"
          >
            {t.contactCta}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// SNOOZLY VIEW — 2-column narrative, no bento, no monthly breakdown
// ═════════════════════════════════════════════════════════════════════════
function SnoozlyView({ lang }: { lang: string }) {
  const accent = "#FF96B3";

  const c = lang === "fr"
    ? {
        statusPill: "Candidate Prix Pépite 2026",
        rolePill: "Fondatrice & CTO",
        tagline: "« Le repos comme un droit : capsules de sieste connectées. »",
        intro:
          "Snoozly conçoit et déploie des capsules de repos individuelles et connectées dans les entreprises et les établissements d'enseignement supérieur. Le modèle est celui du Sleep as a Service — Location Longue Durée, maintenance et logiciel inclus — et l'entreprise se constituera en Société à Mission (Loi PACTE) dès la création.",

        contextLabel: "Le constat",
        contextBody:
          "Fatigue chronique et burn-out en entreprise, dégradation documentée de la santé mentale étudiante depuis 2020 (OVE, Santé publique France). Pas d'espace de repos légitime, dédié, accessible. Les acteurs existants (Nap&Up, Podtime, Energypod, Restworks) ciblent quasi exclusivement le B2B haut de gamme.",

        propLabel: "La proposition",
        propBody:
          "Une capsule éco-conçue (bois FSC, matériaux biosourcés, démontable, réparable). Une application mobile qui réserve, déverrouille, personnalise l'ambiance et déclenche le réveil progressif — pensée pour une charge cognitive nulle (deux tapotements maximum pour réserver). Un protocole sanitaire automatisé visible : entre chaque usage, 5 minutes de blocage et de ventilation forcée. Sur les campus, un tarif solidaire subventionné via mutuelles ou CROUS rend la micro-sieste accessible à tous les étudiants.",

        diffLabel: "Ce qui change avec Snoozly",
        diff: [
          { t: "Positionnement hybride", b: "Aucun concurrent ne traite sérieusement le monde universitaire avec un tarif solidaire structuré." },
          { t: "Protocole sanitaire visible", b: "Automatisation hygiène entre chaque usager — répond frontalement au principal frein des espaces partagés." },
          { t: "Société à Mission", b: "Engagement public auditable inscrit dans les statuts, pas un argument marketing." },
          { t: "Charge cognitive nulle", b: "Trois personas pilotent la conception (urgence, découverte, rituel). Deux tapotements pour réserver." },
        ],

        roleLabel: "Mon rôle",
        roleBody:
          "Je porte le projet en SNEE depuis octobre 2025. Côté produit : conception UX, direction artistique, développement de l'application mobile en React Native / Expo et de son backend Node.js / Express / MongoDB. Côté entrepreneurial : structuration du modèle économique LLD, travail des partenariats mutuelles et universités, dossier Pépitizy, candidature Prix Pépite 2026.",

        stack: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "Figma", "Notion"],

        capLabel: "Cap visé",
        capBody:
          "Création de la SAS Société à Mission au premier semestre 2027 après finalisation du prototype et signature d'un premier client. Déploiement de 6 capsules en exploitation d'ici fin 2027 (5 entreprises + 1 pilote campus), premier accord-cadre mutuelle, et 10 à 15 capsules au premier semestre 2028.",
      }
    : {
        statusPill: "Pépite Prize 2026 candidate",
        rolePill: "Founder & CTO",
        tagline: "« Rest as a right: connected nap capsules. »",
        intro:
          "Snoozly designs and deploys individual, connected nap capsules for companies and universities. The model is Sleep as a Service — long-term leasing with maintenance and software included — and the company will be incorporated as a French Société à Mission (PACTE Law) from day one.",
        contextLabel: "Starting point",
        contextBody:
          "Chronic fatigue and burnout in companies, documented decline in student mental health since 2020 (OVE, Santé publique France). No legitimate, dedicated, accessible rest space. Existing players (Nap&Up, Podtime, Energypod, Restworks) target premium B2B almost exclusively.",
        propLabel: "Proposition",
        propBody:
          "An eco-designed capsule (FSC wood, biosourced materials, dismantlable, repairable). A mobile app that books, unlocks, personalizes ambiance and triggers progressive wake-up — built for zero cognitive load (two taps to book). A visible automated sanitary protocol: 5 min lockout and forced ventilation between every use. On campus, a subsidized solidarity rate via mutuals or CROUS makes naps accessible to all students.",
        diffLabel: "What changes with Snoozly",
        diff: [
          { t: "Hybrid positioning", b: "No competitor seriously addresses higher education with a structured solidarity rate." },
          { t: "Visible sanitary protocol", b: "Hygiene automation between users — directly addresses the main psychological barrier to shared spaces." },
          { t: "Société à Mission", b: "Publicly auditable commitment written into the bylaws, not a marketing line." },
          { t: "Zero cognitive load", b: "Three personas drive design (urgent, discovery, ritual). Two taps to book." },
        ],
        roleLabel: "My role",
        roleBody:
          "Running the project as a SNEE since October 2025. Product side: UX design, art direction, mobile app development in React Native / Expo and its Node.js / Express / MongoDB backend. Entrepreneurial side: leasing business model structuring, mutual and university partnership work, Pépitizy application, Pépite Prize 2026 candidate.",
        stack: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "Figma", "Notion"],
        capLabel: "Trajectory",
        capBody:
          "Société à Mission SAS incorporation in H1 2027 after prototype finalization and first client signature. Six capsules in operation by end of 2027 (5 companies + 1 campus pilot), first mutual partnership, then 10–15 capsules in H1 2028.",
      };

  return (
    <article className="space-y-16" aria-labelledby="snoozly-heading">
      {/* Hero — left text, right illustration */}
      <header>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="inline-flex items-center gap-1.5 font-bebas text-[10px] uppercase tracking-widest px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: accent }}
              >
                <Award className="w-3 h-3" aria-hidden="true" />
                {c.statusPill}
              </span>
              <span className="font-bebas text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/65 px-3 py-1 rounded-full border border-text-primary/25 dark:border-white/15">
                {c.rolePill}
              </span>
            </div>
            <h2 id="snoozly-heading" className="font-display text-4xl md:text-5xl text-text-primary dark:text-white mb-4">
              Snoozly
            </h2>
            <p className="font-display text-xl text-text-secondary dark:text-white/80 italic mb-6">
              {c.tagline}
            </p>
            <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">
              {c.intro}
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-text-primary/8 dark:bg-navy/40 border border-text-primary/12 dark:border-white/8 p-4">
              <SnoozlyCapsuleIllustration color={accent} />
            </div>
          </div>
        </div>
      </header>

      {/* Constat / Proposition — 2 column grid for readability */}
      <section
        aria-label={lang === "fr" ? "Constat et proposition" : "Context and proposition"}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl"
      >
        <div>
          <h3 className="font-display text-xl text-text-primary dark:text-white mb-3">
            {c.contextLabel}
          </h3>
          <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">
            {c.contextBody}
          </p>
        </div>
        <div>
          <h3 className="font-display text-xl text-text-primary dark:text-white mb-3">
            {c.propLabel}
          </h3>
          <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">
            {c.propBody}
          </p>
        </div>
      </section>

      {/* Différenciation — 2x2 grid of numbered items */}
      <section aria-labelledby="snoozly-diff" className="max-w-5xl">
        <h3 id="snoozly-diff" className="font-display text-2xl text-text-primary dark:text-white mb-7">
          {c.diffLabel}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
          {c.diff.map((d, i) => (
            <div key={i} className="flex gap-4">
              <span
                className="font-display text-2xl flex-shrink-0 leading-none mt-0.5"
                style={{ color: accent }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-display text-base text-text-primary dark:text-white mb-1.5">
                  {d.t}
                </h4>
                <p className="font-body text-sm text-text-secondary dark:text-white/75 leading-relaxed">
                  {d.b}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mon rôle + Stack + Cap visé — 2-column */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        <div>
          <h3 className="font-display text-xl text-text-primary dark:text-white mb-3">
            {c.roleLabel}
          </h3>
          <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed mb-5">
            {c.roleBody}
          </p>
          <ul className="flex flex-wrap gap-2">
            {c.stack.map((tech) => (
              <li
                key={tech}
                className="font-bebas text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md text-text-secondary dark:text-white/75 border border-text-primary/20 dark:border-white/15"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl text-text-primary dark:text-white mb-3">
            {c.capLabel}
          </h3>
          <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">
            {c.capBody}
          </p>
        </div>
      </section>
    </article>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// STUDIO VIEW — two clearly separated parts: freelance practice + future platform
// ═════════════════════════════════════════════════════════════════════════
function StudioView({ lang }: { lang: string }) {
  const accent = "#FFA755";

  const c = lang === "fr"
    ? {
        statusPill: "Vitrine en ligne · premiers cas clients",
        rolePill: "Fondatrice indépendante",
        tagline: "« Studio freelance · direction artistique, design et développement. »",
        intro:
          "Rahnya Studio est mon activité de freelance — sites web, identités visuelles et accompagnement créatif. Le studio a aussi un deuxième volet en construction : une plateforme annexe pensée comme un réseau de spécialistes curés.",

        freelanceLabel: "1 · Le studio freelance",
        freelanceBody:
          "Sites vitrines, identités visuelles, refontes, accompagnement direction artistique. Je travaille en direct avec mes clients sur des projets où le soin du détail — typographie, micro-interactions, accessibilité — fait la différence. Site vitrine en ligne, premiers cas clients en cours.",
        services: [
          "Sites vitrines & portfolios",
          "Identités visuelles & DA",
          "Refontes et migrations",
          "Conseil UX / éditorial",
        ],
        visitLink: "Visiter rahnya-studio.vercel.app",

        platformTagLabel: "Concept · en construction",
        platformLabel: "2 · Le réseau (annexe du studio)",
        platformTagline: "Plateforme dédiée, nom propre à venir.",

        platformProblemLabel: "Le problème",
        platformProblemBody:
          "Quand on accompagne un client, on se rend vite compte qu'un site seul ne suffit pas : il faut souvent un·e photographe, un·e rédacteur·rice, un·e expert·e SEO, un·e vidéaste. Trouver ces personnes, vérifier leur niveau, gérer la coordination — ça pèse sur le client. Et la qualité varie énormément sur les plateformes freelance grand public.",

        platformPropLabel: "La proposition",
        platformPropBody:
          "Une plateforme conçue comme une équipe étendue à la demande : pour chaque projet, le client accède à un réseau de spécialistes que j'aurai personnellement sélectionnés. Chaque profil affiche une fiche soignée — un ou deux exemples de réalisations pour juger le style — et permet un contact direct. Le client construit son équipe au lieu de subir une marketplace.",

        principlesLabel: "Les principes",
        principles: [
          { t: "Sélection à la main", b: "Pas un open marketplace — un standard de qualité homogène." },
          { t: "Lisible en 30 secondes", b: "Une fiche, un visuel fort, deux exemples, un contact." },
          { t: "Studio référent", b: "Je peux orchestrer ou m'effacer, au choix du client." },
          { t: "Relation, pas enchère", b: "Pas de mise en concurrence à la course au moins-disant." },
        ],

        specLabel: "Spécialités envisagées",
        specialists: ["Photographes", "Rédacteurs·rices web", "Expert·e·s SEO", "Vidéastes & motion", "Illustrateurs·rices", "Sound designers"],
      }
    : {
        statusPill: "Live · first client cases",
        rolePill: "Independent founder",
        tagline: "« Freelance studio · art direction, design and development. »",
        intro:
          "Rahnya Studio is my freelance practice — websites, visual identities and creative direction. The studio also has a second arm in the works: a sister platform built as a curated network of specialists.",
        freelanceLabel: "1 · The freelance studio",
        freelanceBody:
          "Showcase websites, visual identities, redesigns, art direction support. I work directly with clients on projects where attention to detail — typography, micro-interactions, accessibility — makes the difference. Live showcase, first client cases in progress.",
        services: ["Showcase sites & portfolios", "Visual identity & art direction", "Redesigns & migrations", "UX & editorial consulting"],
        visitLink: "Visit rahnya-studio.vercel.app",
        platformTagLabel: "Concept · work in progress",
        platformLabel: "2 · The network (sister of the studio)",
        platformTagline: "Dedicated platform, own brand coming.",
        platformProblemLabel: "The problem",
        platformProblemBody:
          "When you support a client, you quickly realise a website alone isn't enough: you usually need a photographer, a copywriter, an SEO expert, a videographer. Finding those people, vetting them and coordinating everyone weighs on the client. And quality on mainstream freelance platforms varies wildly.",
        platformPropLabel: "Proposition",
        platformPropBody:
          "A platform built as an on-demand extended team: for each project, the client accesses a network of specialists I've personally curated. Each profile shows a clean page — one or two work samples so the client can read the style — and allows direct contact. Clients assemble their team rather than scrolling a marketplace.",
        principlesLabel: "Principles",
        principles: [
          { t: "Hand-picked", b: "Not an open marketplace — consistent quality bar." },
          { t: "Readable in 30 seconds", b: "One profile, one strong visual, two samples, one contact." },
          { t: "Studio as reference", b: "I can orchestrate or step aside, the client decides." },
          { t: "Relationship, not bidding", b: "No race-to-the-bottom dynamics." },
        ],
        specLabel: "Specialties in scope",
        specialists: ["Photographers", "Copywriters", "SEO experts", "Video & motion", "Illustrators", "Sound designers"],
      };

  return (
    <article className="space-y-16" aria-labelledby="studio-heading">
      {/* Hero — text + network illustration */}
      <header>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="inline-flex items-center gap-1.5 font-bebas text-[10px] uppercase tracking-widest px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: accent }}
              >
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                {c.statusPill}
              </span>
              <span className="font-bebas text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/65 px-3 py-1 rounded-full border border-text-primary/25 dark:border-white/15">
                {c.rolePill}
              </span>
            </div>
            <h2 id="studio-heading" className="font-display text-4xl md:text-5xl text-text-primary dark:text-white mb-4">
              Rahnya Studio
            </h2>
            <p className="font-display text-xl text-text-secondary dark:text-white/80 italic mb-6">
              {c.tagline}
            </p>
            <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">
              {c.intro}
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-text-primary/8 dark:bg-navy/40 border border-text-primary/12 dark:border-white/8 p-4">
              <StudioNetworkIllustration color={accent} />
            </div>
          </div>
        </div>
      </header>

      {/* PART 1 — Freelance studio */}
      <section aria-labelledby="studio-part1" className="max-w-5xl">
        <h3 id="studio-part1" className="font-display text-2xl text-text-primary dark:text-white mb-4">
          {c.freelanceLabel}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <p className="md:col-span-3 font-body text-text-secondary dark:text-white/75 leading-relaxed">
            {c.freelanceBody}
          </p>
          <div className="md:col-span-2">
            <ul className="space-y-2 mb-5">
              {c.services.map((s, i) => (
                <li key={i} className="flex items-baseline gap-2 font-body text-sm text-text-secondary dark:text-white/75">
                  <span aria-hidden="true" style={{ color: accent }}>·</span>
                  {s}
                </li>
              ))}
            </ul>
            <a
              href="https://rahnya-studio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-sm text-text-primary dark:text-pink-light hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink rounded underline underline-offset-4 decoration-text-primary/40 dark:decoration-pink/40"
            >
              {c.visitLink}
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="border-t border-dashed border-text-primary/25 dark:border-white/15 max-w-5xl"
        aria-hidden="true"
      />

      {/* PART 2 — The platform (in progress) */}
      <section aria-labelledby="studio-part2" className="max-w-5xl">
        <div className="flex items-center gap-2 mb-3">
          <Network className="w-4 h-4 text-text-secondary dark:text-white/65" aria-hidden="true" />
          <span className="font-bebas text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/65">
            {c.platformTagLabel}
          </span>
        </div>
        <h3 id="studio-part2" className="font-display text-2xl text-text-primary dark:text-white mb-2">
          {c.platformLabel}
        </h3>
        <p className="font-body text-sm text-text-secondary dark:text-white/65 italic mb-8">
          {c.platformTagline}
        </p>

        {/* Problem / Proposition — 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <h4 className="font-display text-lg text-text-primary dark:text-white mb-3">
              {c.platformProblemLabel}
            </h4>
            <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">
              {c.platformProblemBody}
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg text-text-primary dark:text-white mb-3">
              {c.platformPropLabel}
            </h4>
            <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">
              {c.platformPropBody}
            </p>
          </div>
        </div>

        {/* Principles — 4 columns of titled mini-items */}
        <h4 className="font-display text-lg text-text-primary dark:text-white mb-5">
          {c.principlesLabel}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mb-12">
          {c.principles.map((p, i) => (
            <div key={i}>
              <h5
                className="font-display text-base text-text-primary dark:text-white mb-2 pb-2 border-b"
                style={{ borderColor: `${accent}66` }}
              >
                {p.t}
              </h5>
              <p className="font-body text-sm text-text-secondary dark:text-white/75 leading-relaxed">
                {p.b}
              </p>
            </div>
          ))}
        </div>

        {/* Specialties — pills */}
        <h4 className="font-display text-lg text-text-primary dark:text-white mb-4">
          {c.specLabel}
        </h4>
        <ul className="flex flex-wrap gap-2">
          {c.specialists.map((s, i) => (
            <li
              key={i}
              className="font-bebas text-xs uppercase tracking-wider px-3 py-1.5 rounded-full text-text-primary dark:text-white border"
              style={{
                backgroundColor: `${accent}1f`,
                borderColor: `${accent}66`,
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
