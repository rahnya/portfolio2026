"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import labData from "@/data/lab.json";
import { ArrowLeft, Github, ExternalLink, Zap } from "lucide-react";
import { notFound } from "next/navigation";

interface LabDetailPageProps {
  params: {
    slug: string;
  };
}

export default function LabDetailPage({ params }: LabDetailPageProps) {
  const { t, lang } = useLang();
  const item = labData.find((i: any) => i.slug === params.slug);

  // Si l'item n'existe pas, affiche une page 404
  if (!item) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            404
          </h1>
          <p className="text-white/50 mb-6">
            {lang === "en"
              ? "Cet élément de lab n'existe pas."
              : "Cet élément de lab n'existe pas."}
          </p>
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF3B8D] text-white hover:bg-[#FF96B3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Retour au Lab" : "Retour au Lab"}
          </Link>
        </div>
      </div>
    );
  }

  const content = item[lang as "en" | "fr"];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "MOOC":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Exercice":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Prototype":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      case "Article":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Ressource":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default:
        return "bg-white/5 text-white/60 border-white/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complété":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "En cours":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Publié":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-white/5 text-white/60 border-white/10";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-[#FF3B8D] hover:text-[#FF96B3] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "en" ? "Back to Lab" : "Retour au Lab"}
        </Link>

        {/* Header */}
        <div className="mb-8">
          {/* Color bar */}
          <div
            className="h-1 w-12 mb-6 rounded-full"
            style={{ backgroundColor: item.color }}
          />

          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white mb-4">
            {content.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div
              className={`font-mono text-sm px-3 py-1 rounded-lg border ${getTypeColor(
                item.type
              )}`}
            >
              {item.type}
            </div>
            {item.status && (
              <div
                className={`font-mono text-sm px-3 py-1 rounded-lg border ${getStatusColor(
                  item.status
                )}`}
              >
                {item.status}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="font-body text-lg text-white/70 leading-relaxed max-w-2xl">
            {content.description}
          </p>
        </div>

        {/* Progress section */}
        {item.progress && (
          <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-white">
                {lang === "en" ? "Progression" : "Progression"}
              </h3>
              <span className="font-mono text-lg text-[#FF3B8D]">
                {item.progress}%
              </span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${item.progress}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        )}

        {/* Skills section */}
        {content.skills && content.skills.length > 0 && (
          <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-8 mb-8">
            <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FF3B8D]" />
              {lang === "en" ? "Compétences développées" : "Compétences développées"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="font-mono text-sm px-3 py-2 rounded-lg bg-white/5 text-white/70 border border-white/10 hover:border-white/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags section */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="font-mono text-xs text-white/50 uppercase tracking-widest mb-3">
              Catégories
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="font-mono text-sm px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: `${item.color}25`,
                    color: item.color,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/50 mb-4">
            {lang === "en"
              ? "Intéressé par cette expérience ?"
              : "Intéressé par cette expérience ?"}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF3B8D] text-white hover:bg-[#FF96B3] transition-colors font-body font-medium"
          >
            {lang === "en" ? "Me contacter" : "Me contacter"} →
          </Link>
        </div>
      </div>
    </div>
  );
}
