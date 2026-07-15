"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight, Award, Sparkles, Briefcase, Network } from "lucide-react";

type Key = "snoozly" | "studio";

export default function PepitePage() {
  const { lang } = useLang();
  const [active, setActive] = useState<Key>("snoozly");
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-12 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-widest mb-3 text-rose dark:text-pink">
            — {L("Pépite & Entrepreneuriat","Pépite & Entrepreneurship")}
          </p>
          <h1 className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
            {L("Ce que je construis.","What I'm building.")}
          </h1>
          <p className="mt-6 font-body text-base md:text-lg text-text-secondary dark:text-white/75 leading-relaxed">
            {L("Deux projets en parallèle : Snoozly côté startup à impact, Rahnya Studio côté freelance — avec une plateforme annexe en construction.","Two parallel ventures.")}
          </p>
        </header>

        <div role="tablist" className="inline-flex p-1 mb-14 rounded-full bg-text-primary/8 dark:bg-white/5 border border-text-primary/15 dark:border-white/10">
          <button role="tab" aria-selected={active === "snoozly"} onClick={() => setActive("snoozly")}
            className={`font-body text-sm px-5 py-1.5 rounded-full inline-flex items-center gap-1.5 ${active === "snoozly" ? "bg-snoozly-navy text-snoozly-cream" : "text-text-secondary dark:text-white/65 hover:text-text-primary dark:hover:text-white"}`}>
            <Sparkles className="w-3.5 h-3.5" /> Snoozly
          </button>
          <button role="tab" aria-selected={active === "studio"} onClick={() => setActive("studio")}
            className={`font-body text-sm px-5 py-1.5 rounded-full inline-flex items-center gap-1.5 ${active === "studio" ? "bg-text-primary dark:bg-pink text-cream dark:text-deep-dark" : "text-text-secondary dark:text-white/65 hover:text-text-primary dark:hover:text-white"}`}>
            <Briefcase className="w-3.5 h-3.5" /> Rahnya Studio
          </button>
        </div>

        {active === "snoozly" ? <SnoozlyView lang={lang} /> : <StudioView lang={lang} />}

        <div className="mt-24 pt-10 border-t border-text-primary/12 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-body text-text-secondary dark:text-white/70 text-sm max-w-md">
            {L("Pour collaborer, investir, échanger ou simplement comprendre ces projets de plus près.","Reach out to collaborate, invest, talk, or simply get closer.")}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary dark:bg-pink text-cream dark:text-white font-body text-sm font-medium hover:bg-text-secondary dark:hover:bg-pink/85 transition-colors self-start sm:self-auto">
            {L("Discutons-en","Let's talk")}<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function SnoozlyView({ lang }: { lang: string }) {
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const navy = "#1F3450", copper = "#C97B4A", cream = "#F4ECDF";
  const c = lang === "fr" ? {
    intro: "Snoozly conçoit et déploie des capsules de repos individuelles et connectées dans les entreprises et les établissements d'enseignement supérieur. Modèle Sleep as a Service, protocole sanitaire automatisé, app mobile à charge cognitive nulle. Société à Mission (Loi PACTE) à la création.",
    ctx: "Fatigue chronique et burn-out en entreprise, dégradation documentée de la santé mentale étudiante depuis 2020. Les acteurs existants ciblent quasi exclusivement le B2B haut de gamme.",
    prop: "Capsule éco-conçue (bois FSC, biosourcé, démontable). App React Native qui réserve, déverrouille, personnalise l'ambiance, réveille progressivement. Protocole sanitaire visible entre chaque usage. Sur les campus : tarif solidaire.",
    diff: [
      { t: "Positionnement hybride", b: "Aucun concurrent ne traite sérieusement le monde universitaire avec un tarif solidaire structuré." },
      { t: "Protocole sanitaire visible", b: "Automatisation hygiène entre chaque usager — répond au principal frein psychologique." },
      { t: "Société à Mission", b: "Engagement public auditable inscrit dans les statuts." },
      { t: "Charge cognitive nulle", b: "Trois personas pilotent la conception. Deux tapotements pour réserver." },
    ],
    role: "Je porte le projet en SNEE depuis octobre 2025. Côté produit : UX, DA, développement React Native / Expo, backend Node.js / Express / MongoDB. Côté entrepreneurial : LLD, partenariats mutuelles et universités, dossier Pépitizy, candidature Prix Pépite 2026.",
    cap: "Création de la SAS Société à Mission au premier semestre 2027. Six capsules en exploitation fin 2027 (5 entreprises + 1 pilote campus), puis 10-15 capsules au premier semestre 2028.",
  } : {
    intro: "Snoozly designs connected nap capsules for companies and universities.",
    ctx: "Chronic fatigue and burnout, documented decline in student mental health since 2020.",
    prop: "Eco-designed capsule, React Native app, visible sanitary protocol. Solidarity rate on campus.",
    diff: [
      { t: "Hybrid positioning", b: "No competitor addresses higher education with a structured solidarity rate." },
      { t: "Visible sanitary protocol", b: "Automation between users." },
      { t: "Société à Mission", b: "Public commitment in the bylaws." },
      { t: "Zero cognitive load", b: "Two taps to book." },
    ],
    role: "Running the project as a SNEE since October 2025.",
    cap: "Société à Mission SAS incorporation H1 2027.",
  };

  return (
    <article className="space-y-12">
      <ScrollReveal>
        <header className="relative rounded-3xl overflow-hidden p-8 md:p-12" style={{ background: `linear-gradient(135deg, ${navy} 0%, #2E4A6B 55%, ${copper} 100%)`, color: cream }}>
          <div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(circle at 85% 15%, ${cream} 0%, transparent 45%)` }} />
          <div className="relative max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: `${cream}25`, color: cream, border: `1px solid ${cream}55` }}>
                <Award className="w-3 h-3" /> {L("Prix Pépite 2026","Pépite Prize 2026")}
              </span>
              <span className="font-display text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: cream, border: `1px solid ${cream}55` }}>{L("Fondatrice & CTO","Founder & CTO")}</span>
            </div>
            <p className="font-display text-xs uppercase tracking-widest mb-3 opacity-75">Snoozly</p>
            <h2 className="font-display text-huge leading-[1.05] mb-5">{L("Le repos comme un droit.","Rest as a right.")}</h2>
            <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: cream, opacity: 0.9 }}>{c.intro}</p>
          </div>
        </header>
      </ScrollReveal>

      <div className="max-w-4xl space-y-12">
        <ScrollReveal>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><h3 className="font-display text-xl md:text-2xl text-text-primary dark:text-white mb-3">{L("Le constat","Starting point")}</h3><p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">{c.ctx}</p></div>
            <div><h3 className="font-display text-xl md:text-2xl text-text-primary dark:text-white mb-3">{L("La proposition","The proposition")}</h3><p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">{c.prop}</p></div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <h3 className="font-display text-2xl md:text-3xl text-text-primary dark:text-white mb-6 pb-3 border-b border-text-primary/12 dark:border-white/10">{L("Ce qui change avec Snoozly","What changes with Snoozly")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {c.diff.map((d, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-display text-2xl flex-shrink-0 leading-none tabular" style={{ color: copper }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className="font-display text-lg text-text-primary dark:text-white mb-1">{d.t}</h4>
                    <p className="font-body text-sm text-text-secondary dark:text-white/75 leading-relaxed">{d.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-text-primary/12 dark:border-white/10">
            <div><h3 className="font-display text-xl md:text-2xl text-text-primary dark:text-white mb-3">{L("Mon rôle","My role")}</h3><p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">{c.role}</p></div>
            <div><h3 className="font-display text-xl md:text-2xl text-text-primary dark:text-white mb-3">{L("Cap visé","Trajectory")}</h3><p className="font-body text-text-secondary dark:text-white/75 leading-relaxed">{c.cap}</p></div>
          </section>
        </ScrollReveal>
      </div>
    </article>
  );
}

function StudioView({ lang }: { lang: string }) {
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const accent = "#A05F2A";
  return (
    <article className="space-y-12">
      <ScrollReveal>
        <header className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-white" style={{ background: "linear-gradient(135deg, #2B0F16 0%, #4A2329 50%, #B888A0 100%)" }}>
          <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 80% 20%, ${accent} 0%, transparent 50%)` }} />
          <div className="relative max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/25">
                <Sparkles className="w-3 h-3" /> {L("Vitrine en ligne","Live showcase")}
              </span>
            </div>
            <p className="font-display text-xs uppercase tracking-widest mb-3 opacity-75">Rahnya Studio</p>
            <h2 className="font-display text-huge leading-[1.05] mb-5">{L("Un studio, un réseau.","A studio, a network.")}</h2>
            <p className="font-body text-base md:text-lg leading-relaxed text-white/85">
              {L("Mon activité freelance : sites web, identités visuelles et accompagnement créatif. Une plateforme annexe en construction — un réseau de spécialistes curés.","My freelance practice: websites, visual identities and creative direction. A curated specialists network in the works.")}
            </p>
          </div>
        </header>
      </ScrollReveal>

      <div className="max-w-4xl space-y-12">
        <ScrollReveal>
          <section>
            <h3 className="font-display text-2xl md:text-3xl text-text-primary dark:text-white mb-6 pb-3 border-b border-text-primary/12 dark:border-white/10">
              1 · {L("Le studio freelance","The freelance studio")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <p className="md:col-span-3 font-body text-text-secondary dark:text-white/75 leading-relaxed">
                {L("Sites vitrines, identités visuelles, refontes, accompagnement direction artistique. Travail direct avec mes clients.","Showcase sites, visual identities, redesigns, art direction support.")}
              </p>
              <div className="md:col-span-2">
                <ul className="space-y-2 mb-5 font-body text-sm text-text-secondary dark:text-white/75">
                  {(lang==="fr"?["Sites vitrines & portfolios","Identités visuelles & DA","Refontes et migrations","Conseil UX / éditorial"]:["Showcase sites","Visual identity & AD","Redesigns","UX consulting"]).map((s,i)=>(
                    <li key={i} className="flex items-baseline gap-2"><span style={{color:accent}}>·</span>{s}</li>
                  ))}
                </ul>
                <a href="https://rahnya-studio.vercel.app" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-body text-sm text-text-primary dark:text-white">
                  <span className="link-underline">rahnya-studio.vercel.app</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <div className="inline-flex items-center gap-2 mb-3">
              <Network className="w-4 h-4 text-text-secondary dark:text-white/65" />
              <span className="font-display text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/65">{L("Concept · en construction","Concept · WIP")}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-text-primary dark:text-white mb-6 pb-3 border-b border-text-primary/12 dark:border-white/10">
              2 · {L("Le réseau (annexe du studio)","The network")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-display text-lg md:text-xl text-text-primary dark:text-white mb-2">{L("Le problème","The problem")}</h4>
                <p className="font-body text-sm text-text-secondary dark:text-white/75 leading-relaxed">
                  {L("Un site seul ne suffit pas : il faut photographe, rédacteur·rice, expert·e SEO, vidéaste. Trouver, vérifier, coordonner — ça pèse.","A website alone isn't enough — coordinating specialists is heavy.")}
                </p>
              </div>
              <div>
                <h4 className="font-display text-lg md:text-xl text-text-primary dark:text-white mb-2">{L("La proposition","Proposition")}</h4>
                <p className="font-body text-sm text-text-secondary dark:text-white/75 leading-relaxed">
                  {L("Une plateforme comme une équipe étendue à la demande : un réseau de spécialistes personnellement sélectionnés, fiches soignées, contact direct.","A platform built as an on-demand extended team.")}
                </p>
              </div>
            </div>

            <h4 className="font-display text-lg md:text-xl text-text-primary dark:text-white mb-3">{L("Spécialités envisagées","Specialties in scope")}</h4>
            <ul className="flex flex-wrap gap-2">
              {(lang==="fr"?["Photographes","Rédacteurs·rices web","Expert·e·s SEO","Vidéastes & motion","Illustrateurs·rices","Sound designers"]:["Photographers","Copywriters","SEO experts","Video & motion","Illustrators","Sound designers"]).map((s,i)=>(
                <li key={i} className="font-display text-xs uppercase tracking-wider px-3 py-1.5 rounded-full text-text-primary dark:text-white border" style={{backgroundColor:`${accent}1f`, borderColor:`${accent}66`}}>{s}</li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      </div>
    </article>
  );
}
