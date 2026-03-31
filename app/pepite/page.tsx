"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { ArrowRight, Zap, Lightbulb, Users } from "lucide-react";

const primaryColor = "#FF6B35";
const accentColor = "#FF3B8D";

export default function PepitePage() {
  const { lang } = useLang();
  const [activeProject, setActiveProject] = useState<"snoozly" | "freelance">(
    "snoozly"
  );

  const content = {
    en: {
      title: "Pépite Méditerranée",
      subtitle: "Entrepreneurship & Innovation Hub",
      hero: "Two ambitious projects reshaping how organizations think about wellbeing and digital transformation.",
      cta: "Explore Projects",

      projects: {
        snoozly: {
          name: "Snoozly",
          tagline: "Sleep pods for performance",
          description:
            "Innovative modular rest capsules designed for enterprises and universities. Addressing mental fatigue through micro-breaks and strategic recovery.",
          highlights: [
            "Connected sleep pods with smart access system",
            "Automated hygiene & ventilation protocols",
            "Location-based rental model (Sleep as a Service)",
            "Eco-designed with FSC-certified materials",
          ],
          status: "Prototype Phase",
          team: "Rahnya (CTO), Mathilde (CRO), Luis Miguel (CFO)",
          impact:
            "Targeting 40 units deployed by Year 3 with +105k€ revenue projection",
          cta: "View Business Plan",
        },
        freelance: {
          name: "Freelance Agency",
          tagline: "Affordable design & dev for social impact",
          description:
            "Boutique agency specializing in web design and development for nonprofits, associations, and early-stage startups. Building quality digital products without enterprise price tags.",
          highlights: [
            "Custom websites with full UX/UI design process",
            "Affordable rates for mission-driven organizations",
            "Collaborative workflow & brand consistency tools",
            "Network of trusted specialists (photographers, copywriters, etc.)",
          ],
          status: "Active - Taking Clients",
          team: "Rahnya (Full Stack Designer & Developer)",
          impact: "Empowering social impact organizations with digital tools",
          cta: "Start a Project",
        },
      },
    },

    fr: {
      title: "Pépite Méditerranée",
      subtitle: "Hub Entrepreneurial & Innovation",
      hero: "Deux projets ambitieux transformant la façon dont les organisations pensent le bien-être et la transformation digitale.",
      cta: "Explorer les Projets",

      projects: {
        snoozly: {
          name: "Snoozly",
          tagline: "Capsules de repos pour la performance",
          description:
            "Capsules de repos modulaires innovantes conçues pour les entreprises et universités. Répondre à la fatigue mentale par des micro-pauses et une récupération stratégique.",
          highlights: [
            "Capsules de sommeil connectées avec système d'accès intelligent",
            "Protocoles d'hygiène & ventilation automatisés",
            "Modèle de location par site (Sleep as a Service)",
            "Éco-conçue avec matériaux FSC certifiés",
          ],
          status: "Phase Prototype",
          team: "Rahnya (CTO), Mathilde (CRO), Luis Miguel (CFO)",
          impact:
            "Ciblant 40 unités déployées à l'année 3 avec projection de +105k€ de revenus",
          cta: "Voir le Business Plan",
        },
        freelance: {
          name: "Agence Freelance",
          tagline: "Design & dev abordable pour l'impact social",
          description:
            "Agence boutique spécialisée dans le design web et le développement pour organisations à but non lucratif, associations et startups en phase de démarrage.",
          highlights: [
            "Sites web personnalisés avec processus UX/UI complet",
            "Tarifs abordables pour organisations à mission",
            "Outils de flux collaboratif & cohérence de marque",
            "Réseau de spécialistes validés (photographes, rédacteurs, etc.)",
          ],
          status: "Actif - Accepte les Clients",
          team: "Rahnya (Designer & Développeuse Full Stack)",
          impact: "Donner aux organisations d'impact des outils digitaux",
          cta: "Lancer un Projet",
        },
      },
    },
  };

  const current = content[lang as "en" | "fr"];
  const projects = current.projects;
  const activeData =
    projects[activeProject as keyof typeof projects];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="mb-32">
          <div className="mb-8">
            <span
              className="inline-block font-mono text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
            >
              Side Projects
            </span>
          </div>

          <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            {current.title}
          </h1>

          <p className="font-mono text-sm text-white/40 uppercase tracking-widest mb-8">
            {current.subtitle}
          </p>

          <p className="font-body text-xl md:text-2xl text-white/70 max-w-3xl mb-12 leading-relaxed">
            {current.hero}
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-body font-medium transition-all duration-300"
              style={{ backgroundColor: primaryColor }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {current.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects" className="mb-32">
          {/* Toggle */}
          <div className="flex gap-4 mb-16 border-b border-white/10 pb-8">
            {(["snoozly", "freelance"] as const).map((project) => (
              <button
                key={project}
                onClick={() => setActiveProject(project)}
                className="relative font-display font-bold text-2xl transition-all duration-300"
              >
                <span
                  className={`${
                    activeProject === project
                      ? "text-white"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {projects[project as keyof typeof projects].name}
                </span>
                {activeProject === project && (
                  <div
                    className="absolute bottom-0 left-0 h-1 w-full rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <div className="mb-6">
                <span
                  className="inline-block font-mono text-xs px-3 py-1 rounded-full font-bold mb-4"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                  }}
                >
                  {activeData.status}
                </span>
              </div>

              <h2 className="font-display font-extrabold text-5xl text-white mb-3">
                {activeData.name}
              </h2>

              <p
                className="font-mono text-sm mb-8 uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                {activeData.tagline}
              </p>

              <p className="font-body text-lg text-white/70 mb-8 leading-relaxed">
                {activeData.description}
              </p>

              {/* Highlights */}
              <div className="space-y-4 mb-8">
                {activeData.highlights.map((highlight: string, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <Zap
                      className="w-5 h-5 flex-shrink-0 mt-1"
                      style={{ color: primaryColor }}
                    />
                    <p className="font-body text-white/60 text-sm">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>

              {/* Team & Impact */}
              <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-6 mb-8">
                <div className="mb-6">
                  <p className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                    {lang === "en" ? "Team" : "Équipe"}
                  </p>
                  <p className="font-body text-white/80">{activeData.team}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                    {lang === "en" ? "Impact" : "Impact"}
                  </p>
                  <p className="font-body text-white/80">{activeData.impact}</p>
                </div>
              </div>

              {/* CTA */}
              <a
                href={
                  activeProject === "snoozly"
                    ? "#"
                    : "/contact"
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-body font-medium transition-all duration-300"
                style={{ backgroundColor: accentColor }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {activeData.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right - Visual */}
            <div className="relative h-96 lg:h-full min-h-96 rounded-3xl border border-white/8 overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: `${activeProject === "snoozly" ? "#62E0D5" : primaryColor}15` }}>
              <div className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${activeProject === "snoozly" ? "#62E0D5" : primaryColor}40 0%, transparent 70%)`,
                }} />
              <div className="relative z-10 text-center">
                <div className="text-8xl mb-4">
                  {activeProject === "snoozly" ? "💤" : "💻"}
                </div>
                <p className="font-display font-bold text-2xl text-white">
                  {activeData.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-32">
          <h2 className="font-display font-extrabold text-5xl text-white mb-16">
            {lang === "en" ? "Pépite's Philosophy" : "La Philosophie de Pépite"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                en: "Impact First",
                fr: "L'impact d'abord",
                desc_en:
                  "Every project is about creating meaningful change, whether through wellness innovation or digital access.",
                desc_fr:
                  "Chaque projet vise à créer un changement significatif, à travers l'innovation bien-être ou l'accès digital.",
              },
              {
                icon: "🔧",
                en: "Practical Innovation",
                fr: "Innovation Pratique",
                desc_en:
                  "Ideas that work. Prototypes that solve real problems. Solutions that scale.",
                desc_fr:
                  "Des idées qui marchent. Des prototypes qui résolvent de vrais problèmes. Des solutions qui grandissent.",
              },
              {
                icon: "🌱",
                en: "Sustainable Growth",
                fr: "Croissance Durable",
                desc_en:
                  "Built on solid foundations. Long-term thinking. Real unit economics.",
                desc_fr:
                  "Construit sur des fondations solides. Pensée long terme. Vraie économie d'unité.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#183153]/30 border border-white/8 rounded-2xl p-8 hover:border-white/15 transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {lang === "en" ? item.en : item.fr}
                </h3>
                <p className="font-body text-sm text-white/60">
                  {lang === "en" ? item.desc_en : item.desc_fr}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div
          className="rounded-3xl p-16 text-center"
          style={{ backgroundColor: `${primaryColor}10`, border: `1px solid ${primaryColor}20` }}
        >
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            {lang === "en"
              ? "Interested in collaborating?"
              : "Intéressé pour collaborer ?"}
          </h2>
          <p className="font-body text-white/60 mb-8 max-w-2xl mx-auto">
            {lang === "en"
              ? "Whether you're looking for sleep pod solutions, a web partner, or want to explore opportunities together."
              : "Que vous cherchiez des solutions de capsules de repos, un partenaire web, ou que vous exploriez des opportunités ensemble."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-body font-medium transition-all duration-300"
            style={{ backgroundColor: primaryColor }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {lang === "en" ? "Get in Touch" : "Me Contacter"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}