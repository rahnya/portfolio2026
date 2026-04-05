"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { ArrowRight, Zap, Lightbulb, Users } from "lucide-react";

const primaryColor = "#FF3B8D";
const accentColor = "#FF6B35";

export default function PepitePage() {
  const { lang } = useLang();
  const [activeProject, setActiveProject] = useState<"snoozly" | "freelance">(
    "snoozly"
  );

  const content = {
    en: {
      title: "Pépite",
      subtitle: "Entrepreneurship & Innovation Hub",
      hero: "I develop my ideas, imagine solutions to real problems, and build businesses with a significant impact.",

      intro: {
        highlight: "Two complementary projects. One shared philosophy: solving problems that matter."
      },

      projects: {
        freelance: {
          name: "Freelance Agency",
          tagline: "High-quality web design & development for mission-driven organizations",
          status: "Active - Taking Clients",

          why: "The Problem",
          whyText: "Nonprofits, associations, and early-stage startups need beautiful, functional websites. But traditional agencies charge €5k–€15k+ for a simple site. These organizations have limited budgets but big ambitions. They get stuck with templated solutions or outdated designs that undermine their credibility.",
          solution: "The Solution",
          solutionText: "I offer bespoke web design and development at sustainable, fair rates. Full UX/UI design process + clean code + collaborative workflow. For each project, clients also gain access to a curated network of specialists (photographers, copywriters, SEO experts) they can hire independently—building their own extended team.",
          
          team: "Rahnya (Full Stack Designer & Developer)",
          impact: "Empowering social impact organizations with digital tools",
        },
        snoozly: {
          name: "Snoozly",
          tagline: "Sleep pods for performance",
          status: "Prototype Phase",

          why: "The Problem",
          whyText: "Mental fatigue is structural in modern work and study environments. Stress, cognitive overload, and lack of recovery spaces directly impact both employee wellbeing and performance. Traditional solutions (gym memberships, meditation apps) don't address the root need: accessible rest.",
          solution: "The Solution",
          solutionText: "Snoozly deploys modular, connected sleep capsules designed for enterprises and universities. Each pod is a micro-recovery station—a 20-minute nap that resets mental clarity, reduces burnout risk, and improves focus. It's not a luxury; it's preventive health infrastructure.",

          team: "Rahnya (CTO), Mathilde (CRO), Luis Miguel (CFO)",
          impact:
            "Targeting 40 units deployed by Year 3 with +105k€ revenue projection",
        }
      },
    },

    fr: {
      title: "Pépite",
      subtitle: "Hub Entrepreneurial & Innovation",
      hero: "J'y développe mes idées, imagine des solutions à de vrais problèmes et construis des entreprises avec un impact significatif.",

      intro: {
        highlight: "Deux projets complémentaires. Une philosophie partagée : résoudre les problèmes qui comptent."
      },

      projects: {
        freelance: {
          name: "Agence Freelance",
          tagline: "Design web et développement de qualité pour organisations à mission",
          status: "Actif - Accepte les Clients",

          why: "Le Problème",
          whyText: "Les organismes à but non lucratif, associations et startups ont besoin de beaux sites web fonctionnels. Mais les agences traditionnelles facturent 5k–15k€+ pour un simple site. Ces organisations ont des budgets limités mais de grandes ambitions. Elles sont coinçées avec des solutions templétées ou des designs obsolètes qui nuisent à leur crédibilité.",
          solution: "La Solution",
          solutionText: "Je propose du design web et du développement sur mesure à des tarifs justes et durables. Processus complet UX/UI + code propre + flux collaboratif. Pour chaque projet, les clients accèdent aussi à un réseau de spécialistes curés (photographes, rédacteurs, experts SEO) qu'ils peuvent embaucher directement—en construisant leur propre équipe étendue.",
        
          team: "Rahnya (Designer & Développeuse Full Stack)",
          impact: "Donner aux organisations d'impact des outils digitaux",
        },
        snoozly: {
          name: "Snoozly",
          tagline: "Repenser le bien-être au travail grâce à des capsules de sommeil intelligentes",
          status: "Phase Prototype",

          why: "Le Problème",
          whyText: "La fatigue mentale est structurelle dans les environnements de travail et d'étude modernes. Le stress, la surcharge cognitive et l'absence d'espaces de récupération impactent directement le bien-être et la performance. Les solutions traditionnelles (abonnements gym, apps de méditation) n'adressent pas le besoin fondamental : l'accès à du repos.",
          solution: "La Solution",
          solutionText: "Snoozly déploie des capsules de repos modulaires et connectées conçues pour les entreprises et universités. Chaque pod est une station de micro-récupération—une sieste de 20 minutes qui réinitialise la clarté mentale, réduit le risque de burnout et améliore la concentration. Ce n'est pas un luxe ; c'est une infrastructure de prévention santé.",
          
          team: "Rahnya (CTO), Mathilde (CRO), Luis Miguel (CFO)",
          impact:
            "Ciblant 40 unités déployées à l'année 3 avec projection de +105k€ de revenus",
        }
      },
    },
  };

  const current = content[lang as "en" | "fr"];
  const projects = current.projects;
  const activeData =
    projects[activeProject as keyof typeof projects];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#FF6B35] dark:text-[#FF3B8D] uppercase tracking-widest mb-4">
          - Side Projects
          </p>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[#0F2847] dark:text-white mb-4">
            {current.title}
          </h1>
          <p className="font-body text-[#0F2847] dark:text-white/50 text-lg max-w-2xl">
            {current.hero}
          </p>
        </div>
        

        {/* Projects Section */}
        <div id="projects" className="mb-32">
          {/* Toggle */}
          <div className="flex gap-4 my-8 border-[#0F2847]/10 dark:border-white/10 ">
            {(["snoozly", "freelance"] as const).map((project) => (
              <button
                key={project}
                onClick={() => setActiveProject(project)}
                className="relative font-display font-bold text-2xl transition-all duration-300"
              >
                <span
                  className={`${
                    activeProject === project
                      ? "text-[#0F2847] dark:text-white"
                      : "text-[#0F2847]/30 hover:text-[#0F2847]/50 dark:text-white/30 dark:hover:text-white/50"
                  }`}
                >
                  {projects[project as keyof typeof projects].name}
                </span>
                {activeProject === project && (
                  <div
                    className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#FF6B35] dark:bg-[#FF3B8D]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Why & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-2xl text-[#0F2847] dark:text-white font-bold mb-4"> {activeData.why}</h3>
              <p className="font-body text-[#0F2847]/70 dark:text-white/70 leading-relaxed">{activeData.whyText}</p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-[#0F2847] dark:text-white font-bold mb-4">{activeData.solution}</h3>
              <p className="font-body text-[#0F2847]/70 dark:text-white/70 leading-relaxed">{activeData.solutionText}</p>
            </div>
          </div>

          {/* Team & Impact */}
          <div className="bg-[#F7F9FC] dark:bg-[#183153]/30 border border-[#0F2847]/10 dark:border-white/10 rounded-2xl p-6 mt-6">
            <div className="mb-6">
              <p className="font-mono text-xs text-[#0F2847]/40 dark:text-white/40 uppercase tracking-wider mb-2">
                {lang === "en" ? "Team" : "Équipe"}
              </p>
              <p className="font-body text-[#0F2847]/80 dark:text-white/80">{activeData.team}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#0F2847]/40 dark:text-white/40 uppercase tracking-wider mb-2">
                {lang === "en" ? "Impact" : "Impact"}
                </p>
                <p className="font-body text-[#0F2847] dark:text-white/80">{activeData.impact}</p>
              </div>
            </div>
          </div>

        {/* Final CTA */}
        <div
          className="rounded-3xl p-16 text-center 
                    bg-[#FF6B35]/10 dark:bg-[#FF3B8D]/10 
                    border border-[#FF6B35]/20 dark:border-[#FF3B8D]/20"
        >
          <h2 className="font-display font-bold text-3xl text-[#0F2847] dark:text-white mb-4">
            {lang === "en"
              ? "Interested in collaborating?"
              : "Intéressé pour collaborer ?"}
          </h2>
          <p className="font-body text-[#0F2847]/60 dark:text-white/60 mb-8 max-w-2xl mx-auto">
            {lang === "en"
              ? "Whether you're looking for sleep pod solutions, a web partner, or want to explore opportunities together."
              : "Que vous cherchiez des solutions de capsules de repos, un partenaire web, ou que vous exploriez des opportunités ensemble."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-medium 
                      text-white 
                      bg-[#FF6B35] hover:bg-[#FF6B35]/90 
                      dark:bg-[#FF3B8D] dark:hover:bg-[#FF3B8D]/90 
                      transition-all duration-300"
          >
            {lang === "en" ? "Get in Touch" : "Me Contacter"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}