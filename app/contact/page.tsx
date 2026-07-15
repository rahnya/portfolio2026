"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Send, Linkedin, Github, Clock, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function ContactPage() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:rahnyapro@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${body}`;
      setStatus("success");
      return;
    }
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name, from_email: form.email,
        subject: form.subject, message: form.message,
      }, { publicKey: PUBLIC_KEY });
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch { setStatus("error"); }
  };

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-14 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-widest mb-4 text-rose dark:text-pink">— Contact</p>
          <h1 className="font-display text-huge text-text-primary dark:text-white leading-[1.05]">
            {L("On échange ?","Let's talk?")}
          </h1>
          <p className="mt-5 font-body text-lg text-text-secondary dark:text-white/75 leading-relaxed">
            {L("Site, app, identité, audit, accompagnement — ou juste un café visio. Réponse sous 48h.","Site, app, identity, audit, advisory — or just a video coffee. Reply within 48h.")}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <ScrollReveal direction="left" className="lg:col-span-7">
            <form onSubmit={submit} className="space-y-5 bg-text-primary/5 dark:bg-white/3 border border-text-primary/12 dark:border-white/10 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block font-display text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/65 mb-2">{L("Nom","Name")}</span>
                  <input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-cream dark:bg-white/6 border border-text-primary/15 dark:border-white/12 rounded-lg px-4 py-2.5 text-text-primary dark:text-white font-body text-sm focus:outline-none focus:border-text-secondary dark:focus:border-pink transition-colors" />
                </label>
                <label className="block">
                  <span className="block font-display text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/65 mb-2">Email</span>
                  <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full bg-cream dark:bg-white/6 border border-text-primary/15 dark:border-white/12 rounded-lg px-4 py-2.5 text-text-primary dark:text-white font-body text-sm focus:outline-none focus:border-text-secondary dark:focus:border-pink transition-colors" />
                </label>
              </div>
              <label className="block">
                <span className="block font-display text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/65 mb-2">{L("Sujet","Subject")}</span>
                <input required value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})}
                  className="w-full bg-cream dark:bg-white/6 border border-text-primary/15 dark:border-white/12 rounded-lg px-4 py-2.5 text-text-primary dark:text-white font-body text-sm focus:outline-none focus:border-text-secondary dark:focus:border-pink transition-colors" />
              </label>
              <label className="block">
                <span className="block font-display text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/65 mb-2">Message</span>
                <textarea required rows={6} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full bg-cream dark:bg-white/6 border border-text-primary/15 dark:border-white/12 rounded-lg px-4 py-2.5 text-text-primary dark:text-white font-body text-sm focus:outline-none focus:border-text-secondary dark:focus:border-pink transition-colors resize-y" />
              </label>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text-primary dark:bg-pink text-cream dark:text-deep-dark font-body text-sm font-medium hover:bg-text-secondary dark:hover:bg-pink/85 transition-colors disabled:opacity-50">
                  <Send className="w-4 h-4" />
                  {status === "sending" ? L("Envoi…","Sending…") : L("Envoyer","Send")}
                </button>
                {status === "success" && (
                  <span className="inline-flex items-center gap-1.5 font-body text-sm text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> {L("Envoyé, merci !","Sent, thanks!")}
                  </span>
                )}
                {status === "error" && (
                  <span className="inline-flex items-center gap-1.5 font-body text-sm text-rose dark:text-pink">
                    <AlertCircle className="w-4 h-4" /> {L("Erreur — essaie l'email direct","Error — try direct email")}
                  </span>
                )}
              </div>
            </form>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-5 space-y-6">
            <div>
              <p className="font-display text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/65 mb-2">Email</p>
              <a href="mailto:rahnyapro@gmail.com" className="group inline-flex items-baseline gap-2 font-display text-2xl md:text-3xl text-text-primary dark:text-white">
                rahnyapro@gmail.com
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="space-y-3 pt-5 border-t border-text-primary/12 dark:border-white/10">
              <a href="https://www.linkedin.com/in/rahnya-lanyeri" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-text-primary dark:text-white hover:opacity-70 transition-opacity">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://github.com/rahnya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-text-primary dark:text-white hover:opacity-70 transition-opacity">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <p className="flex items-center gap-3 font-body text-text-secondary dark:text-white/70"><Clock className="w-4 h-4" /> {L("Réponse sous 48h","Reply within 48h")}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
