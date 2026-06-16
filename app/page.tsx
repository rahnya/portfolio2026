"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Plane,
  Code2,
  Palette,
  Wrench,
  MapPin,
  Calendar,
  Maximize2,
  Gamepad2,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24" aria-labelledby="hero-title">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            color: "var(--text-primary)",
          }}
        />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-sunset-orange dark:bg-pink"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.3 + (i % 3) * 0.15,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto w-full py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-text-primary/30 bg-text-primary/5 dark:border-pink/30 dark:bg-pink/10 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-text-primary dark:bg-pink animate-pulse" />
            <span className="font-bebas text-xs text-text-primary dark:text-pink-light">{t.hero.available}</span>
          </div>
          <p className="font-body text-text-secondary dark:text-white/60 text-lg mb-2 animate-fade-up delay-100">{t.hero.greeting}</p>
          <h1
            id="hero-title"
            className="font-display font-extrabold text-6xl md:text-8xl text-text-primary dark:text-white leading-[0.95] mb-4 animate-fade-up delay-200"
          >
            {t.hero.name}
          </h1>
          <div className="flex items-center gap-3 mb-8 animate-fade-up delay-300">
            <div className="h-px w-12 bg-text-primary dark:bg-pink" />
            <h2 className="font-display text-xl md:text-2xl gradient-text font-medium">{t.hero.title}</h2>
          </div>
          <p className="font-body text-text-secondary dark:text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 animate-fade-up delay-400">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up delay-500">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-text-primary hover:bg-text-secondary dark:bg-pink dark:hover:bg-pink/90 text-white font-body font-medium text-sm rounded-xl transition-all duration-200 dark:hover:shadow-[0_0_30px_rgba(255,59,141,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink focus-visible:ring-offset-2"
            >
              {t.hero.cta_projects}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href="/cv/CV_Rahnya.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-text-primary/25 dark:border-white/15 hover:border-text-primary/50 dark:hover:border-white/30 text-text-primary dark:text-white/80 hover:text-text-primary dark:hover:text-white font-body font-medium text-sm rounded-xl transition-all duration-200 hover:bg-text-primary/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink focus-visible:ring-offset-2"
            >
              <Download className="w-4 h-4" />
              {t.hero.cta_cv}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white font-body font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink focus-visible:ring-offset-2 rounded-xl"
            >
              <Mail className="w-4 h-4" />
              {t.hero.cta_contact}
            </Link>
          </div>
          <div className="flex items-center gap-6 mt-16 animate-fade-up delay-600">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/rahnya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink rounded"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rahnya-lanyeri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink rounded"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="w-px h-4 bg-text-primary/20 dark:bg-white/10" aria-hidden="true" />
            <div className="flex items-center gap-2 text-text-muted dark:text-white/40">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-bebas text-xs">Toulon, France</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-800" aria-hidden="true">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-text-primary/30 dark:to-white/20" />
        <div className="w-1 h-1 rounded-full bg-text-primary/30 dark:bg-white/20" />
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const { t, lang } = useLang();
  return (
    <section className="py-32 px-6" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="left" distance={40}>
            <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-4">— {t.about.title}</p>
            <h2 id="about-title" className="font-display font-bold text-4xl md:text-5xl text-text-primary dark:text-white mb-8 leading-tight">
              {lang === "fr" ? "Code, design &" : "Code, design &"}
              <br />
              <span className="gradient-text">{lang === "fr" ? "curiosité sans fin." : "endless curiosity."}</span>
            </h2>
            <div className="space-y-5">
              <p className="font-body text-text-secondary dark:text-white/70 text-base leading-relaxed">{t.about.paragraph1}</p>
              <p className="font-body text-text-secondary dark:text-white/70 text-base leading-relaxed">{t.about.paragraph2}</p>
              <p className="font-body text-text-secondary dark:text-white/70 text-base leading-relaxed flex items-start gap-3">
                <Plane className="w-4 h-4 flex-shrink-0 mt-1" aria-hidden="true" />
                {t.about.paragraph3}
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link href="/projects" className="font-body text-sm text-text-primary dark:text-white hover:text-sunset-orange dark:hover:text-pink transition-colors duration-200 flex items-center gap-1 group">
                {lang === "fr" ? "Voir mon travail" : "View my work"}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" distance={40} delay={0.15}>
            <div className="relative">
              <div className="relative bg-text-primary/10 dark:bg-navy/40 border border-text-primary/8 dark:border-white/8 rounded-2xl p-8 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-20 h-20 bg-sunset-orange/15 dark:bg-pink/15 rounded-bl-[60px] rounded-tr-2xl" aria-hidden="true" />
                <div className="space-y-6">
                  {[
                    { value: "BUT MMI", label: lang === "fr" ? "Diplôme en cours" : "Current Degree", color: "var(--accent-pink, #FF96B3)" },
                    { value: "3+", label: lang === "fr" ? "Années de pratique" : "Years of Practice", color: "var(--accent-yellow, #FFC72C)" },
                    { value: "30+", label: lang === "fr" ? "Projets réalisés" : "Projects Built", color: "var(--accent-purple, #8A6F9B)" },
                    { value: "Full-Stack", label: lang === "fr" ? "Approche" : "Approach", color: "var(--accent-lavender, #D0A8BC)" },
                  ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} aria-hidden="true" />
                    <div>
                      <p className="font-display font-bold text-xl text-text-primary dark:text-white">{item.value}</p>
                      <p className="font-body text-xs text-text-muted dark:text-white/50">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-text-primary/8 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-text-primary dark:bg-pink animate-pulse" aria-hidden="true" />
                  <span className="font-bebas text-xs text-text-muted dark:text-white/50">{lang === "fr" ? "Ouverte aux stages & collaborations" : "Open to internships & collaborations"}</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-sunset-orange/15 dark:bg-yellow/10 rounded-full blur-2xl" aria-hidden="true" />
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── BUT COMPETENCES OVERVIEW ─────────────────────────────────────────────────
// New section: shows the 5 BUT MMI competences at a glance — addresses the
// "pluridisciplinarité" criterion of the jury grid head-on.
function ButCompetences() {
  const { lang } = useLang();
  const items = [
    {
      key: "comprendre",
      label: { fr: "Comprendre", en: "Understand" },
      desc: {
        fr: "Audits, recherche utilisateur, lecture critique d'écosystèmes.",
        en: "Audits, user research, critical reading of ecosystems.",
      },
      color: "#C9A9DC",
    },
    {
      key: "concevoir",
      label: { fr: "Concevoir", en: "Design" },
      desc: {
        fr: "UX/UI, design systems, modélisation, spécifications.",
        en: "UX/UI, design systems, modelling, specifications.",
      },
      color: "#FFA755",
    },
    {
      key: "exprimer",
      label: { fr: "Exprimer", en: "Express" },
      desc: {
        fr: "Identité visuelle, écriture, vidéo, contenus optimisés.",
        en: "Visual identity, writing, video, optimised content.",
      },
      color: "#FFC72C",
    },
    {
      key: "développer",
      label: { fr: "Développer", en: "Develop" },
      desc: {
        fr: "Apps Next.js, React Native, back Node, intégration WordPress.",
        en: "Next.js apps, React Native, Node back-end, WordPress integration.",
      },
      color: "#FF96B3",
    },
    {
      key: "entreprendre",
      label: { fr: "Entreprendre", en: "Initiate" },
      desc: {
        fr: "Snoozly, Rahnya Studio, alternance, engagement associatif.",
        en: "Snoozly, Rahnya Studio, apprenticeship, student association.",
      },
      color: "#7B638A",
    },
  ];
  return (
    <section className="py-24 px-6" aria-labelledby="competences-title">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-4">
              — {lang === "fr" ? "Compétences BUT MMI" : "BUT MMI Competences"}
            </p>
            <h2 id="competences-title" className="font-display font-bold text-4xl md:text-5xl text-text-primary dark:text-white max-w-3xl">
              {lang === "fr" ? "Cinq compétences, un fil rouge." : "Five competences, one thread."}
            </h2>
            <p className="font-body text-text-secondary dark:text-white/75 text-base md:text-lg max-w-2xl mt-4">
              {lang === "fr"
                ? "Trois années à les croiser sur des projets concrets — pédagogiques, professionnels et entrepreneuriaux. Cliquez sur une compétence pour voir les traces correspondantes."
                : "Three years of weaving them through real projects — academic, professional and entrepreneurial. Click a competence to see the matching traces."}
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((it, i) => (
            <ScrollReveal key={it.key} delay={i * 0.06} direction="up" distance={20}>
              <Link
                href={`/projects?butSkill=${encodeURIComponent(it.key)}`}
                aria-label={`${it.label[lang as "fr" | "en"]} — ${lang === "fr" ? "voir les traces" : "see traces"}`}
                className="group block h-full rounded-2xl border border-text-primary/15 dark:border-white/10 bg-text-primary/10 dark:bg-navy/30 backdrop-blur-sm p-5 hover:border-text-primary/35 dark:hover:border-white/25 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-display text-lg text-white border"
                  style={{ backgroundColor: `${it.color}90`, borderColor: it.color }}
                >
                  {i + 1}
                </div>
                <p className="font-display text-lg text-text-primary dark:text-white mb-2 group-hover:translate-x-0.5 transition-transform">
                  {it.label[lang as "fr" | "en"]}
                </p>
                <p className="font-body text-xs text-text-secondary dark:text-white/75 leading-relaxed mb-3">
                  {it.desc[lang as "fr" | "en"]}
                </p>
                <span className="font-bebas text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/60 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {lang === "fr" ? "Voir les traces" : "See traces"} →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  const { t, lang } = useLang();
  const skillGroups = [
    { icon: <Code2 className="w-5 h-5" />, label: t.skills.development, color: "#FF96B3", items: ["C#","C++","JavaScript","TypeScript","React","Node.js","Python","Next.js","Laravel","HTML5","CSS","Tailwind CSS","Filament","PHP","WordPress"] },
    { icon: <Palette className="w-5 h-5" />, label: t.skills.design, color: "#C9A9DC", items: ["UX/UI Design","Figma","Suite Adobe","Canva","Suite Affinity","Blender","Unity + Zapworks (MR/VR/AR)","Design Systems","User Research"] },
    { icon: <Wrench className="w-5 h-5" />, label: t.skills.tools, color: "#FFC72C", items: ["Git & GitHub","Docker","MongoDB","MySQL","Vercel","Notion","Semrush (SEO)","MS Project","Trello","Pack Office","Discord","JSON / REST APIs"] },
  ];
  return (
    <section className="py-32 px-6 relative overflow-hidden" aria-labelledby="skills-title">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-primary/10 dark:via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-primary/10 dark:via-white/5 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-4">— {t.skills.title}</p>
            <h2 id="skills-title" className="font-display font-bold text-4xl md:text-5xl text-text-primary dark:text-white">
              {lang === "fr" ? "Ce avec quoi je travaille" : "What I work with"}
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <ScrollReveal key={gi} delay={gi * 0.1} direction="up" distance={30}>
              <div className="card-hover relative bg-text-primary/10 dark:bg-navy/30 border border-text-primary/15 dark:border-white/8 rounded-2xl p-8 overflow-hidden group h-full">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }} aria-hidden="true" />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${group.color}25`, color: group.color, border: `1px solid ${group.color}55` }} aria-hidden="true">
                  {group.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary dark:text-white mb-6">{group.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="font-bebas text-xs px-3 py-1.5 rounded-full border border-text-primary/15 dark:border-white/10 text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white hover:border-text-primary/35 dark:hover:border-white/25 transition-all duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LABYRINTH TEASER ─────────────────────────────────────────────────────────
function LabyrinthTeaser() {
  const { lang } = useLang();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [active, setActive] = useState(false);

  const copy = {
    en: {
      eyebrow: "— Interactive experiment",
      title: "Explore my portfolio in 3D",
      subtitle: "Navigate a mini-game labyrinth where each room is a project, skill or experience. Built entirely in Three.js.",
      cta: "Open fullscreen",
      hint: "Click inside to activate · WASD / ↑↓ move · ← → turn · Space interact",
      activate: "Click to activate",
    },
    fr: {
      eyebrow: "— Expérience interactive",
      title: "Explorez mon portfolio en 3D",
      subtitle: "Naviguez dans un labyrinthe mini-jeu où chaque salle est un projet, une compétence ou une expérience. Construit entièrement en Three.js.",
      cta: "Ouvrir en plein écran",
      hint: "Clic pour activer · WASD / ↑↓ avancer · ← → tourner · Espace interagir",
      activate: "Cliquer pour activer",
    },
  };
  const c = copy[lang as "en" | "fr"] ?? copy.en;

  return (
    <section className="py-24 px-6 relative overflow-hidden" aria-labelledby="lab-title">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sunset-orange/15 dark:via-pink/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sunset-orange/10 dark:via-pink/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sunset-orange/5 dark:bg-pink/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-3">{c.eyebrow}</p>
            <h2 id="lab-title" className="font-display font-bold text-4xl md:text-5xl text-text-primary dark:text-white mb-3">{c.title}</h2>
            <p className="font-body text-text-secondary dark:text-white/60 text-base max-w-xl leading-relaxed">{c.subtitle}</p>
          </div>
          <a
            href="/lab/labyrinthe.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-text-primary/25 dark:border-pink/30 bg-text-primary/5 dark:bg-pink/10 text-text-primary dark:text-pink-light hover:bg-text-primary/10 dark:hover:bg-pink/20 hover:border-text-primary/40 dark:hover:border-pink/50 font-body text-sm font-medium transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink"
          >
            <Maximize2 className="w-4 h-4" />
            {c.cta}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Iframe container */}
        <div className="relative rounded-2xl overflow-hidden border border-text-primary/10 dark:border-white/8 shadow-[0_0_80px_rgba(255,59,141,0.08)]"
          style={{ aspectRatio: "16/9" }}>

          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 z-10 bg-gradient-to-r from-pink via-yellow to-purple" aria-hidden="true" />

          {/* Iframe */}
          <iframe
            ref={iframeRef}
            src="/lab/labyrinthe.html"
            className="w-full h-full border-0 block"
            title={lang === "fr" ? "Labyrinthe 3D du portfolio" : "Portfolio 3D labyrinth"}
            allow="pointer-lock; fullscreen"
            loading="lazy"
          />

          {/* Overlay: shown until user clicks in */}
          {!active && (
            <button
              onClick={() => {
                setActive(true);
                setTimeout(() => iframeRef.current?.focus(), 50);
              }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-deep-dark/70 backdrop-blur-sm group transition-all duration-200 hover:bg-deep-dark/50 cursor-pointer border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              aria-label={c.activate}
            >
              <div className="w-16 h-16 rounded-full border border-pink/40 bg-pink/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink/20 transition-all duration-200">
                <Gamepad2 className="w-7 h-7 text-pink" aria-hidden="true" />
              </div>
              <span className="font-bebas text-sm text-white/80 tracking-widest uppercase">{c.activate}</span>
            </button>
          )}

          {/* Hint bar bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-2 bg-gradient-to-t from-deep-dark/80 to-transparent pointer-events-none">
            <p className="font-bebas text-[10px] text-white/40 text-center tracking-wider">{c.hint}</p>
          </div>
        </div>

        {/* Lab link */}
        <div className="mt-6 text-center">
          <Link
            href="/lab"
            className="font-body text-sm text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-pink-light transition-colors duration-200 inline-flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-orange dark:focus-visible:ring-pink rounded"
          >
            {lang === "fr" ? "Voir tous mes experiments" : "See all lab experiments"}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ────────────────────────────────────────────────────────────────
function Experience() {
  const { t, lang } = useLang();
  const timeline = [
    { date: "2023 – Present", title: "BUT MMI", subtitle: "IUT, Toulon", type: "education", icon: <GraduationCap className="w-3 h-3" />, description: { en: "Bachelor's degree in Multimedia and Internet Professions. Specializing in web development and Interactive devices.", fr: "BUT Métiers du Multimédia et de l'Internet. Spécialisation développement web et Dispositifs Interactifs." }, color: "#FF96B3" },
    { date: "June 2024 → Today", title: "Treasurer — BDE MM'IN", subtitle: "Université de Toulon — Student Association", type: "engagement", icon: <Sparkles className="w-3 h-3" />, description: { en: "Managing accounts and finances of the student union (+budgets, invoices). Representing the MMI program at fairs, meetings and open days.", fr: "Gestion des comptes et des finances du BDE (+budgets prévisionnels, factures). Représentante de la formation lors des salons, réunions et JPO." }, color: "#C9A9DC" },
    { date: "Sept. 2025 → July 2026", title: "Webmaster éditorial & SEO", subtitle: "Weproc, Toulon — Apprenticeship", type: "work", icon: <Briefcase className="w-3 h-3" />, description: { en: "Website redesign, UX improvement proposals, and on-page SEO optimization using Semrush. Working on a SaaS platform currently integrating AI solutions.", fr: "Refonte du site web, propositions d'amélioration UX et optimisation SEO on-page avec Semrush. Travail sur une plateforme SaaS intégrant des solutions IA." }, color: "#FFC72C" },
    { date: "June 2025 → Today", title: "Student Entrepreneurship Project", subtitle: "PÉPITE Entrepreneurship Program", type: "project", icon: <Sparkles className="w-3 h-3" />, description: { en: "Development of Snoozly, a student entrepreneurship project supported by the PÉPITE program. Work on product ideation, branding, UX/UI design, and early-stage business strategy.", fr: "Développement de Snoozly, un projet entrepreneurial étudiant accompagné par le programme PÉPITE. Travail sur l'idéation du produit, le branding, l'UX/UI et la réflexion stratégique autour du lancement." }, color: "#7B638A" },
    { date: "Feb. → Mar. 2025", title: "WordPress Integration Intern", subtitle: "Les Productions de la Rade, Toulon — 8-week internship", type: "work", icon: <Briefcase className="w-3 h-3" />, description: { en: "Development and optimization of two WordPress websites. Set up social media presence and created reusable templates.", fr: "Développement et optimisation de deux sites web sous WordPress. Mise en place des réseaux sociaux et création de templates réutilisables." }, color: "#FFA755" },
    { date: "2020 – 2023", title: "Baccalauréat", subtitle: "Jean Macé, Rennes", type: "education", icon: <GraduationCap className="w-3 h-3" />, description: { en: "Scientific Baccalaureate with specializations in Mathematics and LLCER Spanish. Baccalaureate with honors and European section English DNL History Geography", fr: "Baccalauréat scientifique avec spécialités Mathématiques et LLCER Espagnol. Bac avec mention et section européenne anglais DNL Histoire Géographie" }, color: "#FF96B3" },
  ];
  return (
    <section className="py-32 px-6" aria-labelledby="experience-title">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-bebas text-xs text-text-primary dark:text-pink uppercase tracking-widest mb-4">— {t.experience.title}</p>
            <h2 id="experience-title" className="font-display font-bold text-4xl md:text-5xl text-text-primary dark:text-white">{lang === "fr" ? "Mon parcours" : "My journey"}</h2>
          </div>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-text-primary/40 dark:from-pink/30 via-text-primary/15 dark:via-white/10 to-transparent" aria-hidden="true" />
          <ol className="space-y-0">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} as="li" delay={i * 0.08} direction="left" distance={25}>
                <div className="relative pl-12 md:pl-24 pb-12 group">
                  <div className="absolute left-[13px] md:left-[29px] w-3 h-3 rounded-full border-2 top-1.5 group-hover:scale-125 transition-transform duration-200" style={{ borderColor: item.color, backgroundColor: `${item.color}40` }} aria-hidden="true" />
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-bebas text-xs text-text-secondary dark:text-white/40 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" aria-hidden="true" />{item.date}
                    </span>
                    <span className="font-bebas text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 text-text-primary dark:text-white border" style={{ backgroundColor: `${item.color}25`, borderColor: `${item.color}80` }}>
                      {item.icon}
                      {item.type}
                    </span>
                  </div>
                  <div className="bg-text-primary/10 dark:bg-navy/30 border border-text-primary/15 dark:border-white/8 rounded-xl p-6 hover:border-text-primary/25 dark:hover:border-white/15 transition-colors duration-200">
                    <h3 className="font-display font-bold text-lg text-text-primary dark:text-white mb-1">{item.title}</h3>
                    <p className="font-bebas text-xs text-text-secondary dark:text-white/50 mb-3">{item.subtitle}</p>
                    <p className="font-body text-sm text-text-secondary dark:text-white/70 leading-relaxed">{item.description[lang as "en" | "fr"]}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ────────────────────────────────────────────────────────────────
// Restored original: deep navy gradient with pink + yellow blobs.
// Works equally well on both modes (the dark band naturally contrasts with the
// rose sunset background in light mode and blends with the navy in dark mode).
function CTABanner() {
  const { t, lang } = useLang();
  return (
    <section className="py-20 px-6" aria-labelledby="cta-recos-title">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="scale">
          <div className="relative bg-gradient-to-br from-[#183153] to-[#373750] rounded-3xl p-12 md:p-16 overflow-hidden border border-white/8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3B8D]/15 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFC72C]/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-bebas text-xs text-[#FF96B3] uppercase tracking-widest mb-3">
                {lang === "fr" ? "Ils m'ont recommandée →" : "They recommended me →"}
              </p>
              <h2 id="cta-recos-title" className="font-display font-bold text-3xl md:text-4xl text-white">
                {lang === "fr" ? "Lisez ce qu'ils en disent" : "Read what people say"}
              </h2>
              <p className="font-body text-white/60 mt-2 max-w-md">
                {lang === "fr" ? "Téléchargez les lettres de recommandation de professeurs et collègues." : "Download recommendation letters from professors and colleagues."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/recommendations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B333A] hover:bg-[#3A1B22] text-white font-body font-medium text-sm rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t.nav.recommendations}<ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="/cv/CV_Rahnya.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-body font-medium text-sm rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={lang === "fr" ? "Télécharger le CV" : "Download CV"}
              >
                <Download className="w-4 h-4" aria-hidden="true" />{t.nav.cv}
              </a>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ButCompetences />
      <Skills />
      <LabyrinthTeaser />
      <Experience />
      <CTABanner />
    </>
  );
}
