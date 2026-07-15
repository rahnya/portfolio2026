"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import projectsData from "@/data/projects.json";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowRight, ArrowUpRight, Mail, Sparkles, Code2, Briefcase,
  Palette, Network, MoveRight, Plane, Boxes, PenLine, Compass,
  MonitorPlay,
} from "lucide-react";

const findProject = (slug: string) => (projectsData as any[]).find((p) => p.slug === slug);

const SELECTED_SLUGS = [
  "snoozly-app-dev",
  "alternance",
  "rahnya-studio",
  "aurora-sola",
  "snoozly-maquettes",
  "visio-conference-app",
];

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <MarqueeStrip />
      <About />
      <SelectedWorks />
      <WhatIDo />
      <Ventures />
      <VieMMI />
      <Explore />
      <ContactStrip />
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO — présence forte, texte à gauche + portrait à droite, portfolio 3D intégré
// ═══════════════════════════════════════════════════════════════════════════
function Hero() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-10 px-6 md:px-12 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="relative max-w-[1400px] mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

        {/* Colonne gauche — texte */}
        <div className="lg:col-span-7 relative z-10">
          <ScrollReveal direction="up" distance={20}>
            <h1
              id="hero-title"
              className="font-display leading-[0.9] text-text-primary dark:text-white"
              style={{ fontSize: "clamp(3.25rem, 9vw, 8rem)" }}
            >
              Rahnya<br/>Lanyeri<span className="text-rose dark:text-pink">.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.1}>
            <p className="mt-6 md:mt-8 font-body text-lg md:text-xl text-text-secondary dark:text-white/80 leading-relaxed max-w-xl">
              {L(
                "Designer, développeuse et entrepreneuse. Je conçois des produits — sites, apps, identités — pour des marques, des startups et mes propres ventures.",
                "Designer, developer and entrepreneur. I build products — sites, apps, identities — for brands, startups and my own ventures."
              )}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#selected"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-text-primary dark:bg-white text-cream dark:text-deep-dark font-body text-sm font-medium hover:bg-text-secondary dark:hover:bg-white/85 transition-colors"
              >
                {L("Voir mes travaux", "See my work")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href="https://rahnya-studio.vercel.app"
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-text-primary/25 dark:border-white/25 text-text-primary dark:text-white font-body text-sm font-medium hover:border-text-primary/50 dark:hover:border-white/50 transition-colors"
              >
                {L("Studio freelance", "Freelance studio")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          {/* Entrée alternative : portfolio 3D */}
          <ScrollReveal direction="fade" delay={0.35}>
            <a
              href="/lab/labyrinthe.html"
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mt-9 font-body text-xs text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors"
            >
              <Boxes className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="link-underline">
                {L("Ou entre par la version 3D", "Or enter through the 3D version")}
              </span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </ScrollReveal>
        </div>

        {/* Colonne droite — portrait éditorial */}
        <div className="lg:col-span-5 relative">
          <ScrollReveal direction="scale" duration={1} delay={0.15}>
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {/* Cadre + portrait */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-text-primary/8 dark:bg-white/5 border border-text-primary/12 dark:border-white/10">
                <img
                  src="/projects/moi.jpg"
                  alt="Rahnya Lanyeri"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Voile chaud subtil */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                     style={{ background: "linear-gradient(180deg, transparent 40%, rgba(43,15,22,0.4) 100%)" }} aria-hidden="true" />
              </div>

              {/* Badge flottant */}
              <div className="absolute -bottom-4 -left-4 md:bottom-6 md:-left-8 bg-cream dark:bg-deep-dark border border-text-primary/15 dark:border-white/15 rounded-xl px-4 py-3 shadow-soft-lg float-slow">
                <p className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/60">
                  {L("Fondatrice", "Founder")}
                </p>
                <p className="font-display text-lg text-text-primary dark:text-white">Snoozly</p>
              </div>
              <div className="absolute -top-4 -right-4 md:top-8 md:-right-8 bg-cream dark:bg-deep-dark border border-text-primary/15 dark:border-white/15 rounded-xl px-4 py-3 shadow-soft-lg float-slow" style={{ animationDelay: "2s" }}>
                <p className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/60">
                  {L("Alternante", "Apprentice")}
                </p>
                <p className="font-display text-lg text-text-primary dark:text-white">Weproc</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MARQUEE — bande de disciplines défilante
// ═══════════════════════════════════════════════════════════════════════════
function MarqueeStrip() {
  const items = [
    "Web design", "Brand identity", "UX/UI",
    "Editorial SEO", "Product design",
    "Front-end", "React Native", "Full-stack",
    "Content strategy", "Art direction",
  ];
  return (
    <section aria-hidden="true" className="border-y border-text-primary/12 dark:border-white/10 py-6 overflow-hidden bg-text-primary/5 dark:bg-white/2">
      <div className="marquee marquee-track font-display text-2xl md:text-3xl text-text-secondary dark:text-white/70 select-none">
        {Array.from({ length: 2 }).map((_, k) =>
          items.map((it, i) => (
            <React.Fragment key={`${k}-${i}`}>
              <span>{it}</span>
              <span aria-hidden="true" className="text-rose dark:text-pink opacity-70">✦</span>
            </React.Fragment>
          ))
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ABOUT — éditorial magazine, structure narrative, portrait secondaire
// ═══════════════════════════════════════════════════════════════════════════
function About() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 relative" aria-labelledby="about-title">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow + big title */}
        <ScrollReveal direction="up" distance={20}>
          <p className="font-display text-xs uppercase tracking-widest mb-4 text-rose dark:text-pink">
            — {L("À propos", "About")}
          </p>
          <h2 id="about-title" className="font-display text-huge text-text-primary dark:text-white max-w-4xl leading-[1.02] mb-12">
            {L(
              "Code, design & curiosité sans fin.",
              "Code, design & endless curiosity."
            )}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Colonne récit */}
          <div className="lg:col-span-7 space-y-6 prose-relaxed">
            <ScrollReveal direction="up" distance={16}>
              <p className="font-body text-lg md:text-xl text-text-primary dark:text-white/90 leading-[1.6]">
                {L(
                  "Je suis Rahnya, 21 ans. Étudiante en BUT MMI Développement Web à l'IUT de Toulon, passionnée par tout le spectre de la conception numérique — du code propre et efficace aux interfaces qui rendent le complexe évident.",
                  "I'm Rahnya, 21, in my third year at IUT Toulon (BUT MMI, Web Development track). Passionate about the full spectrum of digital craft — from clean, efficient code to interfaces that make the complex feel obvious."
                )}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={16} delay={0.06}>
              <p className="font-body text-text-secondary dark:text-white/75 leading-[1.75]">
                {L(
                  "Mon travail se situe au carrefour du développement, du design et de la stratégie. Je construis des choses qui fonctionnent avec élégance : sites vitrines soignés, apps mobiles, identités visuelles, articles SEO qui remontent. Cette polyvalence me permet aussi de porter Snoozly seule — UX, app, backend, branding, business plan.",
                  "My work sits at the crossroads of development, design and strategy. I build things that work elegantly: polished showcase sites, mobile apps, visual identities, SEO articles that rank. That range is what lets me carry Snoozly solo — UX, app, backend, branding, business plan."
                )}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={16} delay={0.12}>
              <p className="font-body text-text-secondary dark:text-white/75 leading-[1.75] flex items-start gap-3">
                <Plane className="w-4 h-4 flex-shrink-0 mt-1.5 text-copper dark:text-yellow" aria-hidden="true" />
                <span>{L(
                  "En dehors de la tech : passion pour l'aéronautique — la précision de la pensée aérospatiale influence ma façon d'aborder les problèmes.",
                  "Outside tech: a passion for aviation — the precision of aerospace thinking shapes how I tackle problems."
                )}</span>
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={16} delay={0.18}>
              <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/projects" className="group inline-flex items-center gap-1.5 font-body text-sm text-text-primary dark:text-white">
                  <span className="link-underline">{L("Voir mes 40+ projets", "See my 40+ projects")}</span>
                  <MoveRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link href="/competences" className="group inline-flex items-center gap-1.5 font-body text-sm text-text-secondary dark:text-white/70">
                  <span className="link-underline">{L("Mon parcours MMI", "My MMI journey")}</span>
                  <MoveRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <a href="/lab/labyrinthe.html" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-body text-sm text-text-secondary dark:text-white/70">
                  <Boxes className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="link-underline">{L("Version 3D du portfolio", "3D portfolio version")}</span>
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Colonne carte narrative — statuts empilés */}
          <ScrollReveal direction="right" distance={30} className="lg:col-span-5">
            <div className="relative bg-cream dark:bg-white/5 border border-text-primary/15 dark:border-white/15 rounded-2xl p-7 md:p-8 shadow-soft space-y-5 overflow-hidden">
              {/* Halo décoratif */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-30 blur-3xl pointer-events-none bg-plum dark:bg-purple" aria-hidden="true" />

              <div className="relative flex items-start gap-3 pb-5 border-b border-text-primary/10 dark:border-white/10">
                <span className="block w-1 h-14 rounded-full bg-rose dark:bg-pink" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl md:text-2xl text-text-primary dark:text-white">BUT MMI</p>
                  <p className="font-body text-sm text-text-secondary dark:text-white/65">{L("Diplôme en cours · IUT Toulon","Degree in progress · IUT Toulon")}</p>
                </div>
              </div>

              <div className="relative flex items-start gap-3 pb-5 border-b border-text-primary/10 dark:border-white/10">
                <span className="block w-1 h-14 rounded-full bg-copper dark:bg-yellow" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl md:text-2xl text-text-primary dark:text-white">3+ <span className="text-text-secondary dark:text-white/60 text-lg">{L("années","years")}</span></p>
                  <p className="font-body text-sm text-text-secondary dark:text-white/65">{L("De pratique en design & code","Of design & code practice")}</p>
                </div>
              </div>

              <div className="relative flex items-start gap-3 pb-5 border-b border-text-primary/10 dark:border-white/10">
                <span className="block w-1 h-14 rounded-full bg-plum dark:bg-purple" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl md:text-2xl text-text-primary dark:text-white">40+ <span className="text-text-secondary dark:text-white/60 text-lg">{L("projets","projects")}</span></p>
                  <p className="font-body text-sm text-text-secondary dark:text-white/65">{L("Livrés en école, alternance et freelance","Shipped in school, apprenticeship and freelance")}</p>
                </div>
              </div>

              <div className="relative flex items-start gap-3">
                <span className="block w-1 h-14 rounded-full bg-gold dark:bg-yellow" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl md:text-2xl text-text-primary dark:text-white">Full-stack</p>
                  <p className="font-body text-sm text-text-secondary dark:text-white/65">{L("Design produit · code · contenu","Product design · code · content")}</p>
                </div>
              </div>

              <div className="relative pt-4 border-t border-text-primary/10 dark:border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <p className="font-body text-xs text-text-secondary dark:text-white/65">
                  {L("Ouverte aux missions freelance & collaborations","Open to freelance work & collaborations")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SELECTED WORKS — 6 études, layout alterné éditorial
// ═══════════════════════════════════════════════════════════════════════════
function SelectedWorks() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <section id="selected" className="py-24 md:py-32 px-6 md:px-12 border-t border-text-primary/10 dark:border-white/8" aria-labelledby="selected-title">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-16">
            <div>
              <p className="font-display text-xs uppercase tracking-widest mb-3 text-rose dark:text-pink">
                — {L("Travaux sélectionnés", "Selected work")}
              </p>
              <h2 id="selected-title" className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
                {L("Six études de cas.", "Six case studies.")}
              </h2>
            </div>
            <Link href="/projects" className="group font-body text-sm text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white inline-flex items-center gap-1.5">
              {L("Tous les projets", "All projects")} ({(projectsData as any[]).length})
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="space-y-24 md:space-y-28">
          {SELECTED_SLUGS.map((slug, i) => {
            const p = findProject(slug);
            if (!p) return null;
            return <SelectedItem key={slug} project={p} index={i} lang={lang} />;
          })}
        </div>
      </div>
    </section>
  );
}

function SelectedItem({ project, index, lang }: { project: any; index: number; lang: string }) {
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const p = project[lang as "fr" | "en"] ?? project.fr;
  const accent: string = project.color || "#B03A50";
  const screenshot: string | undefined = p?.screenshots?.[0];
  const reverse = index % 2 === 1;

  return (
    <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center" aria-labelledby={`work-${project.slug}`}>
      <ScrollReveal direction={reverse ? "right" : "left"} distance={24} className={`lg:col-span-1 ${reverse ? "lg:order-3" : ""}`}>
        <span className="font-display text-4xl md:text-5xl block leading-none opacity-40 tabular" style={{ color: accent }} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </ScrollReveal>

      <ScrollReveal direction={reverse ? "right" : "left"} distance={32} className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
        <Link
          href={`/projects/${project.slug}`}
          className="block relative rounded-2xl overflow-hidden border border-text-primary/12 dark:border-white/10 card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink"
          aria-label={`${p.title} — ${L("étude de cas", "case study")}`}
        >
          <div
            className={`${index % 3 === 0 ? "aspect-[16/11]" : "aspect-[4/3]"} relative`}
            style={{
              background: screenshot ? undefined : `radial-gradient(circle at 30% 40%, ${accent}45 0%, transparent 65%), radial-gradient(circle at 70% 70%, ${accent}25 0%, transparent 70%)`,
              backgroundColor: screenshot ? undefined : `var(--surface-strong)`,
            }}
          >
            {screenshot && (
              <img src={screenshot} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-cream/95 dark:bg-deep-dark/85 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300" aria-hidden="true">
              <ArrowUpRight className="w-5 h-5 text-text-primary dark:text-white" />
            </span>
          </div>
        </Link>
      </ScrollReveal>

      <ScrollReveal direction={reverse ? "left" : "right"} distance={32} className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <div className="space-y-4">
          <p className="font-body text-xs text-text-secondary dark:text-white/55">
            {project.year}
            {project.categories?.filter((c: string) => !["school","professional","entrepreneurship"].includes(c)).slice(0, 2).map((c: string) => (
              <span key={c}> · {c}</span>
            ))}
          </p>
          <h3 id={`work-${project.slug}`} className="font-display text-3xl md:text-4xl text-text-primary dark:text-white leading-[1.05]">
            <Link href={`/projects/${project.slug}`} className="hover:opacity-80 transition-opacity">{p.title}</Link>
          </h3>
          <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed max-w-md">{p.shortDescription}</p>
          {p.technologies && p.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {p.technologies.slice(0, 4).map((t: string) => (
                <span key={t} className="font-body text-[11px] px-2 py-0.5 rounded text-text-secondary dark:text-white/65 border border-text-primary/15 dark:border-white/10">{t}</span>
              ))}
            </div>
          )}
          <Link href={`/projects/${project.slug}`} className="group inline-flex items-center gap-1.5 font-body text-sm text-text-primary dark:text-white pt-2">
            <span className="link-underline">{L("Lire l'étude de cas", "Read the case study")}</span>
            <MoveRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </ScrollReveal>
    </article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// WHAT I DO — interactif, système à onglets latéraux
// ═══════════════════════════════════════════════════════════════════════════
function WhatIDo() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const [active, setActive] = useState(0);

  const disciplines = [
    {
      icon: Code2,
      title_fr: "Sites & applications",
      title_en: "Websites & apps",
      lead_fr: "Sites vitrines, e-commerce, dashboards, web apps complètes en Next.js / React. Apps mobiles React Native / Expo. Backends Node.js / MongoDB.",
      lead_en: "Showcase sites, e-commerce, dashboards, full web apps in Next.js / React. Mobile apps in React Native / Expo. Node.js / MongoDB backends.",
      tools: ["Next.js","React Native","Node.js","MongoDB","Tailwind"],
      linked_fr: "Snoozly app, alternance Weproc, Aurora SOLA, portfolio",
      linked_en: "Snoozly app, Weproc apprenticeship, Aurora SOLA, portfolio",
      accent: "copper",
    },
    {
      icon: Palette,
      title_fr: "Identité & design",
      title_en: "Identity & design",
      lead_fr: "Direction artistique, charte graphique complète, design system, UX/UI mobile et desktop. Conception qui se tient à long terme.",
      lead_en: "Art direction, complete brand guidelines, design system, mobile and desktop UX/UI. Design that stands the test of time.",
      tools: ["Figma","FigJam","Adobe Suite","Notion"],
      linked_fr: "Snoozly maquettes, Rahnya Studio, identités visuelles",
      linked_en: "Snoozly mockups, Rahnya Studio, visual identities",
      accent: "rose",
    },
    {
      icon: PenLine,
      title_fr: "Contenu & SEO",
      title_en: "Content & SEO",
      lead_fr: "Stratégie éditoriale, optimisation SEO on-page et GEO (visibilité IA), rédaction longue et courte, audits Semrush.",
      lead_en: "Editorial strategy, on-page and GEO SEO (AI visibility), long and short copy, Semrush audits.",
      tools: ["Semrush","WPML","Schema.org","Yoast","LinkedIn"],
      linked_fr: "Alternance Weproc, articles de fond, stratégie GEO",
      linked_en: "Weproc apprenticeship, long-form articles, GEO strategy",
      accent: "gold",
    },
    {
      icon: Compass,
      title_fr: "Stratégie & produit",
      title_en: "Strategy & product",
      lead_fr: "Mon profil mêle dev, design et stratégie. J'accompagne les fondateur·rice·s de l'idée au produit vivant — maquettes, MVP, branding, mise en marché.",
      lead_en: "My profile mixes dev, design and strategy. I help founders from idea to living product — mockups, MVP, branding, go-to-market.",
      tools: ["Business plan","MVP","Pitch","Personas"],
      linked_fr: "Snoozly (concept, BP, roadmap), Studio réseau",
      linked_en: "Snoozly (concept, BP, roadmap), Studio network",
      accent: "plum",
    },
    {
      icon: Network,
      title_fr: "Gestion de projet & pilotage",
      title_en: "Project management & delivery",
      lead_fr: "Pilotage de projet, coordination d'équipes transverses, méthodes agiles, évaluation et gestion des risques. Je poursuis en Master MSI (Management de l'Entreprise en Réseau) à Toulouse en 2026.",
      lead_en: "Project piloting, cross-functional team coordination, agile methods, evaluation and risk management. Continuing in Master's MSI (Networked Enterprise Management) in Toulouse in 2026.",
      tools: ["Agile","Scrum","Notion","Roadmapping","ERP"],
      linked_fr: "Trésorière BDE MM'IN, coordination MMI LAN, alternance Weproc, Snoozly",
      linked_en: "BDE MM'IN treasurer, MMI LAN coordination, Weproc apprenticeship, Snoozly",
      accent: "teal",
    },
  ];

  const activeItem = disciplines[active];
  const ActiveIcon = activeItem.icon;

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 border-t border-text-primary/10 dark:border-white/8" aria-labelledby="what-title">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-16 items-end">
            <div className="lg:col-span-6">
              <p className="font-display text-xs uppercase tracking-widest mb-3 text-rose dark:text-pink">
                — {L("Ce que je fais", "What I do")}
              </p>
              <h2 id="what-title" className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
                {L("Cinq disciplines,", "Five disciplines,")}<br/>
                <span className="text-rose dark:text-pink">{L("un seul cerveau.", "one brain.")}</span>
              </h2>
            </div>
            <p className="lg:col-span-6 font-body text-base md:text-lg text-text-secondary dark:text-white/75 leading-[1.6]">
              {L(
                "Je pilote les projets de bout en bout — conception, exécution, mise en marché. Ça simplifie ta relation client et ça t'évite d'aligner plusieurs prestataires.",
                "I run projects end to end — conception, execution, go-to-market. Simpler client relationship, no need to align several freelancers."
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive layout : onglets à gauche + panneau à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Onglets latéraux */}
          <div className="lg:col-span-5" role="tablist" aria-label={L("Disciplines","Disciplines")}>
            <div className="divide-y divide-text-primary/12 dark:divide-white/8">
              {disciplines.map((d, i) => {
                const isActive = i === active;
                const Icon = d.icon;
                const accentClass = d.accent === "copper" ? "text-copper dark:text-yellow"
                                  : d.accent === "rose" ? "text-rose dark:text-pink"
                                  : d.accent === "gold" ? "text-gold dark:text-yellow"
                                  : d.accent === "teal" ? "text-[#3D5F6E] dark:text-[#7BA8BF]"
                                  : "text-plum dark:text-purple";
                return (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="whatido-panel"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full text-left py-6 px-2 flex items-center gap-5 group transition-all ${
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-90"
                    }`}
                  >
                    <span className="font-display text-2xl md:text-3xl tabular text-text-secondary dark:text-white/60 flex-shrink-0 w-14">
                      0{i+1}
                    </span>
                    <div className="flex items-center gap-3 flex-1">
                      <Icon className={`w-5 h-5 flex-shrink-0 ${accentClass}`} aria-hidden="true" />
                      <span className="font-display text-2xl md:text-3xl text-text-primary dark:text-white">
                        {lang === "fr" ? d.title_fr : d.title_en}
                      </span>
                    </div>
                    <MoveRight className={`w-5 h-5 flex-shrink-0 text-text-secondary dark:text-white/50 transition-all ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    }`} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panneau détail */}
          <div
            id="whatido-panel"
            role="tabpanel"
            aria-live="polite"
            className="lg:col-span-7 lg:sticky lg:top-24 self-start"
          >
            <div key={active} className="bg-text-primary/6 dark:bg-white/4 border border-text-primary/12 dark:border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden">
              {/* Halo décoratif dynamique */}
              <div className={`absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-25 blur-3xl pointer-events-none ${
                activeItem.accent === "copper" ? "bg-copper dark:bg-yellow"
                : activeItem.accent === "rose" ? "bg-rose dark:bg-pink"
                : activeItem.accent === "gold" ? "bg-gold dark:bg-yellow"
                : activeItem.accent === "teal" ? "bg-[#3D5F6E] dark:bg-[#7BA8BF]"
                : "bg-plum dark:bg-purple"
              }`} aria-hidden="true" />

              <div className="relative">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${
                  activeItem.accent === "copper" ? "bg-copper/15 text-copper dark:bg-yellow/15 dark:text-yellow"
                  : activeItem.accent === "rose" ? "bg-rose/15 text-rose dark:bg-pink/15 dark:text-pink"
                  : activeItem.accent === "gold" ? "bg-gold/15 text-gold dark:bg-yellow/15 dark:text-yellow"
                  : activeItem.accent === "teal" ? "bg-[#3D5F6E]/15 text-[#3D5F6E] dark:bg-[#7BA8BF]/15 dark:text-[#7BA8BF]"
                  : "bg-plum/15 text-plum dark:bg-purple/15 dark:text-purple"
                }`}>
                  <ActiveIcon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-text-primary dark:text-white mb-4 leading-[1.05]">
                  {lang === "fr" ? activeItem.title_fr : activeItem.title_en}
                </h3>
                <p className="font-body text-base md:text-lg text-text-secondary dark:text-white/75 leading-relaxed mb-8">
                  {lang === "fr" ? activeItem.lead_fr : activeItem.lead_en}
                </p>

                <div className="mb-6">
                  <p className="font-display text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/55 mb-3">
                    {L("Outils","Tools")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.tools.map((t) => (
                      <span key={t} className="font-body text-xs px-2.5 py-1 rounded-full text-text-secondary dark:text-white/75 border border-text-primary/15 dark:border-white/12">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-text-primary/10 dark:border-white/10">
                  <p className="font-display text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/55 mb-2">
                    {L("Traces récentes","Recent traces")}
                  </p>
                  <p className="font-body text-sm text-text-secondary dark:text-white/70">
                    {lang === "fr" ? activeItem.linked_fr : activeItem.linked_en}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VENTURES — Snoozly + Studio, palettes DA
// ═══════════════════════════════════════════════════════════════════════════
function Ventures() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-t border-text-primary/10 dark:border-white/8" aria-labelledby="ventures-title">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <p className="font-display text-xs uppercase tracking-widest mb-3 text-rose dark:text-pink">
                — {L("Ce que je construis", "What I'm building")}
              </p>
              <h2 id="ventures-title" className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
                {L("En parallèle des clients.", "Alongside client work.")}
              </h2>
            </div>
            <p className="lg:col-span-7 font-body text-lg text-text-secondary dark:text-white/70 leading-relaxed self-end">
              {L(
                "Deux projets en propre : une startup à impact en santé mentale (Snoozly, Pépite Méditerranée), et un studio freelance qui mène vers une plateforme de réseau de spécialistes.",
                "Two ventures of my own: an impact startup in mental health (Snoozly, Pépite Méditerranée), and a freelance studio leading toward a curated specialists network platform."
              )}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* SNOOZLY */}
          <ScrollReveal direction="up" distance={24}>
            <Link href="/pepite" className="group block relative h-full rounded-2xl overflow-hidden border border-text-primary/12 dark:border-white/10 hover:border-text-primary/40 dark:hover:border-white/25 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink">
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1F3450 0%, #2E4A6B 55%, #C97B4A 100%)" }} aria-hidden="true" />
              <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 15%, #F4ECDF 0%, transparent 45%)" }} aria-hidden="true" />
              <div className="relative p-8 md:p-10 min-h-[380px] flex flex-col text-[#F4ECDF]">
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#F4ECDF]/15 text-[#F4ECDF] border border-[#F4ECDF]/25">
                    <Sparkles className="w-3 h-3" aria-hidden="true" /> Startup · Pépite 2026
                  </span>
                </div>
                <p className="font-display text-xs uppercase tracking-widest mb-3 opacity-75">Snoozly</p>
                <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mb-4 max-w-md">
                  {L("Le repos comme un droit.", "Rest as a right.")}
                </h3>
                <p className="font-body text-sm text-[#F4ECDF]/85 max-w-md leading-relaxed mb-auto">
                  {L(
                    "Capsules de sieste connectées en entreprises et campus. Sleep as a Service, app mobile, protocole sanitaire automatisé. Société à Mission en construction.",
                    "Connected nap capsules for companies and campuses. Sleep as a Service, mobile app, automated sanitary protocol."
                  )}
                </p>
                <div className="mt-8 pt-6 border-t border-[#F4ECDF]/15 flex items-center justify-between">
                  <span className="font-body text-sm font-medium">{L("Découvrir Snoozly", "Discover Snoozly")}</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* STUDIO */}
          <ScrollReveal direction="up" distance={24} delay={0.08}>
            <a href="https://rahnya-studio.vercel.app" target="_blank" rel="noopener noreferrer" className="group block relative h-full rounded-2xl overflow-hidden border border-text-primary/12 dark:border-white/10 hover:border-text-primary/40 dark:hover:border-white/25 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink">
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2B0F16 0%, #4A2329 50%, #B888A0 100%)" }} aria-hidden="true" />
              <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 20%, #D4A55A 0%, transparent 50%)" }} aria-hidden="true" />
              <div className="relative p-8 md:p-10 min-h-[380px] flex flex-col text-white">
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20">
                    <Briefcase className="w-3 h-3" aria-hidden="true" /> {L("Freelance · en ligne", "Freelance · live")}
                  </span>
                </div>
                <p className="font-display text-xs uppercase tracking-widest mb-3 opacity-70">Rahnya Studio</p>
                <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mb-4 max-w-md">
                  {L("Un studio, un réseau.", "A studio, a network.")}
                </h3>
                <p className="font-body text-sm text-white/85 max-w-md leading-relaxed mb-auto">
                  {L(
                    "Mon activité freelance — sites, identités, accompagnement créatif. Une plateforme annexe en construction : un réseau de spécialistes curés.",
                    "My freelance practice — sites, brand identities, creative direction. A sister platform in the works: a curated specialists network."
                  )}
                </p>
                <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                  <span className="font-body text-sm font-medium">rahnya-studio.vercel.app</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VIE EN MMI — mosaïque cliquable défilante (elle a validé)
// ═══════════════════════════════════════════════════════════════════════════
function VieMMI() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const visuals: { src: string; alt: string; href: string }[] = [
    { src: "/projects/mmi-lan-2.png",           alt: "MMI LAN",             href: "/projects/mmi-lan-event" },
    { src: "/projects/30-ans-mmi.png",          alt: "30 ans MMI",          href: "/projects/mmi-30-years-communication" },
    { src: "/projects/site-lan.jpg",            alt: "Site MMI LAN",        href: "/projects/mmi-lan-event" },
    { src: "/projects/mmi-lan-3.png",           alt: "MMI LAN scène",       href: "/projects/mmi-lan-event" },
    { src: "/projects/mmi-decouvertes.png",     alt: "MMI Découvertes",     href: "/projects/mmi-decouvertes" },
    { src: "/projects/epitech_club_coding.png", alt: "Coding Club",         href: "/projects/epitech-coding-club" },
    { src: "/projects/konbini.png",             alt: "Merry Cashmas",       href: "/projects/merry-cashmas-reportage" },
    { src: "/projects/jingle.png",              alt: "Logo & jingle",       href: "/projects/logo-jingle-animation" },
    { src: "/projects/agence-1ris-site.png",    alt: "Agence 1ris",         href: "/projects/1ris-agency-website" },
    { src: "/projects/article_weproc.png",      alt: "Article Weproc",      href: "/projects/alternance" },
    { src: "/projects/meteo.png",               alt: "App météo",           href: "/projects/weather-app-design" },
    { src: "/projects/picsou-blog.png",         alt: "Laravel blog",        href: "/projects/laravel-blog-platform" },
  ];

  return (
    <section className="py-24 md:py-32 border-y border-text-primary/10 dark:border-white/8 overflow-hidden" aria-labelledby="vie-mmi-title">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
        <ScrollReveal>
          <p className="font-display text-xs uppercase tracking-widest mb-3 text-rose dark:text-pink">
            — {L("Coulisses","Behind the scenes")}
          </p>
          <h2 id="vie-mmi-title" className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
            {L("La vie en MMI.", "Life at MMI.")}
          </h2>
          <p className="mt-6 font-body text-base md:text-lg text-text-secondary dark:text-white/75 max-w-2xl leading-relaxed">
            {L(
              "Projets collectifs, MMI LAN, JPO, hackathons, audits clients — les moments qui n'apparaissent pas comme cas d'étude mais qui ont bâti ma polyvalence.",
              "Team projects, MMI LAN, Open Days, hackathons, client audits — the moments that don't show up as case studies but built my range."
            )}
          </p>
        </ScrollReveal>
      </div>

      <div className="space-y-3">
        {[0, 1, 2].map((row) => {
          const items = visuals.filter((_, i) => i % 3 === row);
          const reverse = row === 1;
          const rowHeight = row === 0 ? "h-40 md:h-52" : row === 1 ? "h-36 md:h-44" : "h-44 md:h-56";
          return (
            <div key={row} className="marquee marquee-track slow gap-3 pr-3" style={reverse ? { animationDirection: "reverse" } : {}}>
              {Array.from({ length: 2 }).map((_, k) =>
                items.map((v, i) => (
                  <Link
                    key={`${k}-${i}`}
                    href={v.href}
                    className={`group flex-shrink-0 w-60 md:w-80 rounded-xl overflow-hidden border border-text-primary/12 dark:border-white/10 bg-text-primary/8 dark:bg-white/3 relative ${rowHeight} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary dark:focus-visible:ring-pink`}
                    aria-label={v.alt}
                  >
                    <img src={v.src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream/95 dark:bg-deep-dark/85 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                      <ArrowUpRight className="w-4 h-4 text-text-primary dark:text-white" />
                    </span>
                  </Link>
                ))
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPLORE — 3 pistes narratives (au-delà des projets)
// ═══════════════════════════════════════════════════════════════════════════
function Explore() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const spaces = [
    {
      num: "01",
      icon: MonitorPlay,
      href: "/appearances",
      title_fr: "Là où je passe",
      title_en: "Where I show up",
      lead_fr: "Hackathons, JPO, événements, interventions publiques — les moments où on me voit à l'œuvre ou où je prends la parole.",
      lead_en: "Hackathons, Open Days, events, public talks — moments where you can see me at work or hear me out.",
      count_fr: "Presse & apparitions",
      count_en: "Press & appearances",
    },
    {
      num: "02",
      icon: Sparkles,
      href: "/lab",
      title_fr: "Ce que j'expérimente",
      title_en: "What I experiment with",
      lead_fr: "MOOCs terminés, prototypes en cours, ressources retenues. Pour suivre ce que j'apprends entre deux projets.",
      lead_en: "Completed MOOCs, prototypes in progress, references kept. What I'm learning between projects.",
      count_fr: "Lab · expérimentations",
      count_en: "Lab · experiments",
    },
    {
      num: "03",
      icon: PenLine,
      href: "/recommendations",
      title_fr: "Ce que mes profs et pairs disent",
      title_en: "What mentors say",
      lead_fr: "Recommandations de professeurs et de collaborateurs qui ont travaillé avec moi sur le terrain.",
      lead_en: "Endorsements from professors and collaborators who worked with me in the field.",
      count_fr: "Recommandations écrites",
      count_en: "Written recommendations",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-t border-text-primary/10 dark:border-white/8" aria-labelledby="explore-title">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <p className="font-display text-xs uppercase tracking-widest mb-3 text-rose dark:text-pink">
                — {L("Explorer plus loin", "Explore further")}
              </p>
              <h2 id="explore-title" className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
                {L("Au-delà des livrables.", "Beyond deliverables.")}
              </h2>
            </div>
            <p className="lg:col-span-7 font-body text-base md:text-lg text-text-secondary dark:text-white/75 leading-relaxed self-end">
              {L(
                "Ce que je fais existe aussi en dehors des projets livrés — dans les apparitions publiques, les explorations en labo et les retours de celles et ceux qui ont travaillé avec moi.",
                "What I do also lives outside shipped projects — in public appearances, lab experiments, and testimonials from people who worked with me."
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* Index éditorial de 3 pistes */}
        <div className="border-t border-text-primary/10 dark:border-white/8">
          {spaces.map((s, i) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.href} delay={i * 0.06}>
                <Link
                  href={s.href}
                  className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-text-primary/10 dark:border-white/8 hover:bg-text-primary/4 dark:hover:bg-white/2 transition-colors -mx-6 md:-mx-12 px-6 md:px-12"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-display text-2xl md:text-3xl text-text-secondary dark:text-white/60 tabular" aria-hidden="true">
                      {s.num}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-5 flex items-center gap-3">
                    <Icon className="w-5 h-5 text-rose dark:text-pink flex-shrink-0" aria-hidden="true" />
                    <h3 className="font-display text-2xl md:text-3xl text-text-primary dark:text-white leading-tight">
                      {lang === "fr" ? s.title_fr : s.title_en}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">
                      {lang === "fr" ? s.lead_fr : s.lead_en}
                    </p>
                    <p className="font-display text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/55 mt-2">
                      {lang === "fr" ? s.count_fr : s.count_en}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-1 flex items-center justify-end">
                    <ArrowUpRight className="w-6 h-6 text-text-primary dark:text-white transition-all opacity-40 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════════════════
function ContactStrip() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-t border-text-primary/10 dark:border-white/8" aria-labelledby="contact-title">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal direction="up" distance={20}>
          <p className="font-display text-xs uppercase tracking-widest mb-5 text-rose dark:text-pink">— Contact</p>
          <h2 id="contact-title" className="font-display text-huge text-text-primary dark:text-white leading-[1.05] mb-5 max-w-3xl">
            {L("Travaillons ensemble.", "Let's work together.")}
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary dark:text-white/75 max-w-2xl leading-relaxed mb-9">
            {L(
              "Site, app, identité, audit, accompagnement — ou juste un café visio pour échanger. Le plus simple, c'est l'email.",
              "Site, app, identity, audit, advisory — or just a video coffee to chat. Easiest is email."
            )}
          </p>
        </ScrollReveal>
        <ScrollReveal direction="up" distance={16} delay={0.1}>
          <div className="flex flex-wrap items-baseline gap-3">
            <a href="mailto:rahnyapro@gmail.com" className="group font-display text-2xl md:text-3xl text-text-primary dark:text-white inline-flex items-baseline gap-3">
              rahnyapro@gmail.com
              <ArrowUpRight className="w-6 h-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary dark:bg-white text-cream dark:text-deep-dark font-body font-medium hover:bg-text-secondary dark:hover:bg-white/85 transition-colors">
              <Mail className="w-4 h-4" aria-hidden="true" />
              {L("Via le formulaire", "Use the form")}
            </Link>
            <a href="https://www.linkedin.com/in/rahnya-lanyeri" target="_blank" rel="noopener noreferrer" className="font-body text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white underline underline-offset-4">LinkedIn</a>
            <span className="text-text-muted dark:text-white/40">·</span>
            <a href="https://github.com/rahnya" target="_blank" rel="noopener noreferrer" className="font-body text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white underline underline-offset-4">GitHub</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
