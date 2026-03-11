"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { ArrowRight, Download, Mail, Github, Linkedin, Plane, Code2, Palette, Wrench, MapPin, Calendar } from "lucide-react";

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mesh gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF3B8D]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8A6F9B]/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#183153]/30 rounded-full blur-[80px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#FF3B8D]"
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
          {/* Available badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF3B8D]/20 bg-[#FF3B8D]/5 mb-8 animate-fade-up"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3B8D] animate-pulse" />
            <span className="font-mono text-xs text-[#FF96B3]">{t.hero.available}</span>
          </div>

          {/* Greeting */}
          <p className="font-body text-white/50 text-lg mb-2 animate-fade-up delay-100">
            {t.hero.greeting}
          </p>

          {/* Name */}
          <h1
            className="font-display font-extrabold text-6xl md:text-8xl text-white leading-[0.95] mb-4 animate-fade-up delay-200"
          >
            {t.hero.name}
          </h1>

          {/* Title with gradient */}
          <div className="flex items-center gap-3 mb-8 animate-fade-up delay-300">
            <div className="h-px w-12 bg-[#FF3B8D]" />
            <h2 className="font-display text-xl md:text-2xl gradient-text font-medium">
              {t.hero.title}
            </h2>
          </div>

          {/* Description */}
          <p
            className="font-body text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 animate-fade-up delay-400"
          >
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-up delay-500">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#FF3B8D] hover:bg-[#FF3B8D]/90 text-white font-body font-medium text-sm rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,59,141,0.3)]"
            >
              {t.hero.cta_projects}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href="/cv/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-body font-medium text-sm rounded-xl transition-all duration-200 hover:bg-white/5"
            >
              <Download className="w-4 h-4" />
              {t.hero.cta_cv}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-white/60 hover:text-white font-body font-medium text-sm transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              {t.hero.cta_contact}
            </Link>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-6 mt-16 animate-fade-up delay-600">
            <div className="flex items-center gap-4">
              <a href="  https://github.com/rahnya" target="_blank" rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/rahnya-lanyeri" target="_blank" rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2 text-white/25">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-mono text-xs">Toulon, France</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-800">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        <div className="w-1 h-1 rounded-full bg-white/20" />
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const { t } = useLang();

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: text */}
          <div>
            <p className="font-mono text-xs text-[#FF3B8D] uppercase tracking-widest mb-4">
              — {t.about.title}
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-8 leading-tight">
              Code, design &<br />
              <span className="gradient-text">endless curiosity.</span>
            </h2>
            <div className="space-y-5">
              <p className="font-body text-white/60 text-base leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="font-body text-white/60 text-base leading-relaxed">
                {t.about.paragraph2}
              </p>
              <p className="font-body text-white/60 text-base leading-relaxed flex items-start gap-3">
                <Plane className="w-4 h-4 text-[#FFC72C] flex-shrink-0 mt-1" />
                {t.about.paragraph3}
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <Link href="/projects"
                className="font-body text-sm text-[#FF96B3] hover:text-[#FF3B8D] transition-colors duration-200 flex items-center gap-1 group">
                View my work
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Right: visual card */}
          <div className="relative">
            <div className="relative bg-[#183153]/40 border border-white/8 rounded-2xl p-8 backdrop-blur-sm">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF3B8D]/10 rounded-bl-[60px] rounded-tr-2xl" />

              <div className="space-y-6">
                {/* Stat items */}
                {[
                  { value: "BUT MMI", label: "Current Degree", color: "#FF3B8D" },
                  { value: "3+", label: "Years of Practice", color: "#FFC72C" },
                  { value: "10+", label: "Projects Built", color: "#8A6F9B" },
                  { value: "Full-Stack", label: "Approach", color: "#D0A8BC" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="w-1 h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <p className="font-display font-bold text-xl text-white">{item.value}</p>
                      <p className="font-body text-xs text-white/40">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom badge */}
              <div className="mt-8 pt-6 border-t border-white/8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF3B8D] animate-pulse" />
                  <span className="font-mono text-xs text-white/40">Open to internships & collaborations</span>
                </div>
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#FFC72C]/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  const { t } = useLang();

  const skillGroups = [
    {
      icon: <Code2 className="w-5 h-5" />,
      label: t.skills.development,
      color: "#FF3B8D",
      items: ["C#","C++", "JavaScript", "TypeScript", "React", "Node.js", "Python", "Next.js", "Laravel", "HTML5", "CSS", "Tailwind CSS", "Filament", "PHP","WordPress"],
    },
    {
      icon: <Palette className="w-5 h-5" />,
      label: t.skills.design,
      color: "#8A6F9B",
      items: ["UX/UI Design", "Figma", "Suite Adobe", "Canva", "Suite Affinity", "Blender", "Unity + Zapworks (MR/VR/AR)", "Design Systems", "User Research"],
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      label: t.skills.tools,
      color: "#FFC72C",
      items: ["Git & GitHub", "Docker", "MongoDB", "MySQL", "Vercel", "Notion","Semrush (SEO)", "MS Project", "Trello", "Pack Office", "Discord", "JSON / REST APIs"],
    },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-[#FF3B8D] uppercase tracking-widest mb-4">
            — {t.skills.title}
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            What I work with
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <div
              key={gi}
              className="card-hover relative bg-[#183153]/30 border border-white/8 rounded-2xl p-8 overflow-hidden group"
            >
              {/* Top color bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${group.color}15`, color: group.color }}
              >
                {group.icon}
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-6">{group.label}</h3>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/8 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE TIMELINE ───────────────────────────────────────────────────────
function Experience() {
  const { t, lang } = useLang();

  const timeline = [
    {
      date: "2023 – Present",
      title: "BUT MMI",
      subtitle: "IUT, Toulon",
      type: "education",
      description: {
        en: "Bachelor's degree in Multimedia and Internet Professions. Specializing in web development and Interactive devices.",
        fr: "BUT Métiers du Multimédia et de l'Internet. Spécialisation développement web et Dispositifs Intéractifs.",
      },
      color: "#FF3B8D",
    },
    {
      date: "June 2024 → Today",
      title: "Treasurer — BDE MM'IN",
      subtitle: "Université de Toulon — Student Association",
      type: "engagement",
      description: {
        en: "Managing accounts and finances of the student union (+budgets, invoices). Representing the MMI program at fairs, meetings and open days.",
        fr: "Gestion des comptes et des finances du BDE (+budgets prévisionnels, factures). Représentante de la formation lors des salons, réunions et JPO.",
      },
      color: "#8A6F9B",
    },
    {
      date: "Sept. 2025 → July 2026",
      title: "Webmaster éditorial & SEO",
      subtitle: "Weproc, Toulon — Apprenticeship",
      type: "work",
      description: {
        en: "Website redesign, UX improvement proposals, and on-page SEO optimization using Semrush. Working on a SaaS platform currently integrating AI solutions.",
        fr: "Refonte du site web, propositions d'amélioration UX et optimisation SEO on-page avec Semrush. Travail sur une plateforme SaaS intégrant des solutions IA.",
      },
      color: "#FFC72C",
    },
    {
      date: "June 2025 → Today",
      title: "Student Entrepreneurship Project",
      subtitle: "PÉPITE Entrepreneurship Program",
      type: "project",
      description: {
        en: "Development of Snoozly, a student entrepreneurship project supported by the PÉPITE program. Work on product ideation, branding, UX/UI design, and early-stage business strategy.",
        fr: "Développement de Snoozly, un projet entrepreneurial étudiant accompagné par le programme PÉPITE. Travail sur l’idéation du produit, le branding, l’UX/UI et la réflexion stratégique autour du lancement.",
      },
      color: "#8A6F9B",
    },
    {
      date: "Feb. → Mar. 2025",
      title: "WordPress Integration Intern",
      subtitle: "Les Productions de la Rade, Toulon — 8-week internship",
      type: "work",
      description: {
        en: "Development and optimization of two WordPress websites. Set up social media presence and created reusable templates.",
        fr: "Développement et optimisation de deux sites web sous WordPress. Mise en place des réseaux sociaux et création de templates réutilisables.",
      },
      color: "#FFC72C",
    },
    {
      date: "2020 – 2023",
      title: "Baccalauréat",
      subtitle: "Jean Macé, Rennes",
      type: "education",
      description: {
        en: "Scientific Baccalaureate with specializations in Mathematics and LLCER Spanish (NSI until the first year). Baccalaureate with honors and European section English DNL History Geography",
        fr: "Baccalauréat scientifique avec spécialités Mathématiques et LLCER Espagnol (NSI jusqu'en première). Bac avec mention et section européenne anglais DNL Histoire Géographie",
      },
      color: "#FF3B8D",
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs text-[#FF3B8D] uppercase tracking-widest mb-4">
            — {t.experience.title}
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">My journey</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF3B8D]/30 via-white/10 to-transparent" />

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-12 md:pl-24 pb-12 group">
                {/* Dot */}
                <div
                  className="absolute left-[13px] md:left-[29px] w-3 h-3 rounded-full border-2 border-current top-1.5 group-hover:scale-125 transition-transform duration-200"
                  style={{ borderColor: item.color, backgroundColor: `${item.color}30` }}
                />

                {/* Date */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-white/30 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.type}
                  </span>
                </div>

                {/* Content */}
                <div className="bg-[#183153]/20 border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors duration-200">
                  <h3 className="font-display font-bold text-lg text-white mb-1">{item.title}</h3>
                  <p className="font-mono text-xs text-white/40 mb-3">{item.subtitle}</p>
                  <p className="font-body text-sm text-white/60 leading-relaxed">
                    {item.description[lang as "en" | "fr"]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ────────────────────────────────────────────────────────────────
function CTABanner() {
  const { t } = useLang();

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#183153] to-[#373750] rounded-3xl p-12 md:p-16 overflow-hidden border border-white/8">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3B8D]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFC72C]/8 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs text-[#FF96B3] uppercase tracking-widest mb-3">
                They recommended me →
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                Read what people say
              </h2>
              <p className="font-body text-white/50 mt-2 max-w-md">
                Download recommendation letters from professors and colleagues.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/recommendations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF3B8D] hover:bg-[#FF3B8D]/90 text-white font-body font-medium text-sm rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,59,141,0.3)]"
              >
                {t.nav.recommendations}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="/cv/cv.pdf" download
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-body font-medium text-sm rounded-xl transition-all duration-200">
                <Download className="w-4 h-4" />
                {t.nav.cv}
              </a>
            </div>
          </div>
        </div>
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
      <Skills />
      <Experience />
      <CTABanner />
    </>
  );
}
