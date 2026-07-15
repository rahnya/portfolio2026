"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-display text-hero text-text-primary dark:text-white opacity-30 mb-4">404</p>
      <h1 className="font-display text-huge text-text-primary dark:text-white mb-4">
        Perdu·e ?
      </h1>
      <p className="font-body text-text-secondary dark:text-white/70 max-w-md mb-8 leading-relaxed">
        Cette page n'existe pas — ou plus. On rentre à la maison ?
      </p>
      <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary dark:bg-white text-cream dark:text-deep-dark font-body text-sm font-medium hover:bg-text-secondary dark:hover:bg-white/85 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Retour accueil
      </Link>
    </main>
  );
}
