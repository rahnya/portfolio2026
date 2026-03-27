"use client";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useLang } from "@/components/LangContext";
import appearancesData from "@/data/appearances.json";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function AppearanceDetailPage() {
  const params = useParams<{ slug: string }>();
  const { lang } = useLang();

  const appearance = appearancesData.find((a: any) => a.slug === params.slug);
  if (!appearance) notFound();

  const a = appearance[lang as "en" | "fr"];
  const screenshots: string[] = Array.isArray(a.screenshots) ? a.screenshots : [];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          href="/appearances"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white font-body text-sm mb-12 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Appearances
        </Link>

        {/* Hero */}
        <div
          className="relative rounded-3xl h-64 md:h-80 mb-12 overflow-hidden border border-white/8"
          style={{ backgroundColor: `${appearance.color}12` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 50%, ${appearance.color}35 0%, transparent 65%), radial-gradient(circle at 80% 20%, ${appearance.color}15 0%, transparent 50%)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${appearance.color}, transparent)` }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className="font-mono text-xs px-3 py-1 rounded-full w-fit uppercase tracking-wider"
                style={{ backgroundColor: `${appearance.color}20`, color: appearance.color }}
              >
                {appearance.type}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white">
              {a.title}
            </h1>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main */}
          <div className="md:col-span-2 space-y-10">

            {/* Description */}
            <div>
              <h2 className="font-display font-bold text-xl text-white mb-4">
                Description
              </h2>
              <p className="font-body text-white/60 leading-relaxed">{a.description}</p>
            </div>

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-xl text-white mb-4">
                  Gallery
                </h2>
                <div className={`grid gap-4 ${screenshots.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                  {screenshots.map((src, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden border border-white/8 hover:border-white/25 transition-all duration-200"
                    >
                      <img
                        src={src}
                        alt={`${a.title} ${i + 1}`}
                        className="w-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        style={{ maxHeight: "240px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Type & Info */}
            <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-6">
              <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Type</p>
                  <p className="text-white/80 font-body">{appearance.type}</p>
                </div>
              </div>
            </div>

            {/* Links */}
            {a.externalUrl && (
              <div className="bg-[#183153]/30 border border-white/8 rounded-2xl p-6">
                <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                  Links
                </h3>
                <a
                  href={a.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF3B8D] text-white hover:bg-[#FF96B3] transition-colors font-body text-sm"
                >
                  {a.externalLabel}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}