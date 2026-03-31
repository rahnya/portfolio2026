"use client";
import React, { useState } from "react";
import { useLang } from "@/components/LangContext";
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from '@emailjs/browser';

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.483 1.953 1.944 1.953.599 0 1.172-.246 1.38-.76h2.432zm-5.101-7.5c-1.313 0-2.141.7-2.304 2h4.404c-.057-.982-.686-2-2.1-2zM9 14H5.67v1.98H9c1.087 0 1.752-.482 1.752-1.037C10.752 14.393 10.085 14 9 14zm.667-3.33c0-.47-.333-.87-1.182-.87H5.67V11.2h2.726c.832 0 1.271-.34 1.271-.868v-.662zM3 19h6.386c2.47 0 3.814-1.329 3.814-3.35 0-1.513-.878-2.64-2.22-3.002C12.046 12.12 12.764 11.1 12.764 9.7c0-2.01-1.353-3.7-3.804-3.7H3v13z"/>
  </svg>
);

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
  
    setLoading(true);   // 🔹 on active le loader
    setStatus("idle");  // 🔹 on reset le status
  
    emailjs.send(
      'service_i9see4n', // ton service
      'template_b45cwb9', // ton template
      form,
      'KOxrqs9MrABdI4Qqb' // ton clé publique
    )
    
    .then(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    })
    .catch(() => {
      setStatus("error");
    })
    .finally(() => {
      setLoading(false);  // 🔹 on désactive le loader
    });
  };

  const contacts = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "rahnyapro@gmail.com", href: "mailto:rahnyapro@gmail.com", color: "#FF3B8D"},
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "https://www.linkedin.com/in/rahnya-lanyeri/", href: "https://www.linkedin.com/in/rahnya-lanyeri", color: "#0077B5" },
    { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "github.com/rahnya", href: "  https://github.com/rahnya", color: "#ffffff" },
    { icon: <BehanceIcon />, label: "Behance", value: "behance.net/rahnya_lanyeri", href: "https://www.behance.net/rahnya_lanyeri", color: "#1769FF" },
  ];

  const inputClass = "w-full bg-[#183153]/30 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#FF3B8D]/50 focus:bg-[#183153]/50 transition-all duration-200";

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#FF6B35] dark:text-[#FF3B8D] uppercase tracking-widest mb-4">
            — {t.contact.title}
          </p>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[#0F2847] dark:text-white mb-4">
            {t.contact.title}
          </h1>
          <p className="font-body text-[#0F2847] dark:text-white/50 text-lg max-w-xl">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="bg-[#183153]/20 border border-white/8 rounded-2xl p-8">
            <div className="space-y-4">
              <div>
                <label className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2 block">
                  {t.contact.name}
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.contact.placeholder_name}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2 block">
                  {t.contact.email}
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.contact.placeholder_email}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2 block">
                  {t.contact.message}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.contact.placeholder_message}
                  rows={6}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-green-400 text-sm font-body">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.contact.success}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm font-body">
                  <AlertCircle className="w-4 h-4" />
                  {t.contact.error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF3B8D] hover:bg-[#FF3B8D]/90 text-white font-body font-medium text-sm rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,59,141,0.25)] group mt-2 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white/50 border-t-white w-4 h-4 rounded-full" />
                ) : (
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                )}
                {t.contact.send}
              </button>
            </div>
          </div>

          {/* Direct contacts */}
          <div className="flex flex-col justify-center space-y-4">
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
              {t.contact.or}
            </p>

            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex items-center gap-4 bg-[#183153]/20 border border-white/8 rounded-xl p-5 hover:border-white/15"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${c.color}15`, color: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <p className="font-mono text-xs text-white/40 uppercase tracking-wider">{c.label}</p>
                  <p className="font-body text-sm text-white/80 group-hover:text-white transition-colors duration-200">
                    {c.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Availability note */}
            <div className="mt-6 p-5 bg-[#FF3B8D]/5 border border-[#FF3B8D]/15 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#FF3B8D] animate-pulse" />
                <span className="font-mono text-xs text-[#FF96B3]">Currently Available</span>
              </div>
              <p className="font-body text-xs text-white/40 leading-relaxed">
                Open to internships, apprenticeships, and collaborative projects.
                Typical response time: 24–48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
