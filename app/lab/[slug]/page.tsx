"use client";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLang } from "@/components/LangContext";
import labData from "@/data/lab.json";
import { ArrowLeft, Lightbulb, Code2 } from "lucide-react";

export default function LabDetailPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLang();
  const item = labData.find((l) => l.slug === params.slug);
  if (!item) notFound();

  const entry = item[lang as "en" | "fr"];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link href="/lab"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white font-body text-sm mb-12 transition-colors duration-200 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          {t.lab.title}
        </Link>

        {/* Header */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {entry.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs px-3 py-1 rounded-full"
              style={{ backgroundColor: `${item.color}20`, color: item.color }}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
          {entry.title}
        </h1>
        <p className="font-body text-white/60 text-lg leading-relaxed mb-12">
          {entry.description}
        </p>

        {/* Idea */}
        <div className="bg-[#183153]/40 border border-white/8 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-[#FFC72C]" />
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {t.lab.idea}
            </h2>
          </div>
          <p className="font-body text-sm text-white/60 leading-relaxed">{entry.idea}</p>
        </div>

        {/* Code snippet */}
        <div className="bg-[#0D1B2A] border border-white/8 rounded-2xl p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-[#FF3B8D]" />
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {t.lab.code_snippet}
            </h2>
            {/* Dots */}
            <div className="ml-auto flex gap-1.5">
              {["#FF3B8D", "#FFC72C", "#4CAF50"].map((c) => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c + "60" }} />
              ))}
            </div>
          </div>
          <pre className="font-mono text-sm text-[#FF96B3]/80 overflow-x-auto whitespace-pre leading-relaxed">
            {entry.codeSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
