"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";

const TIERS = [
  {
    value: "pro",
    name: "Pro",
    price: "$29",
    per: "/mo",
    desc: "Full platform access across all 10 verticals.",
    tag: "Most Popular",
    accent: true,
  },
  {
    value: "builder",
    name: "Builder",
    price: "$99",
    per: "/mo",
    desc: "Live builds, code repos, small group coaching.",
    tag: null,
    accent: false,
  },
  {
    value: "consulting",
    name: "1-on-1",
    price: "$500",
    per: "/hr",
    desc: "Direct access. Limited to 5 hrs/week.",
    tag: "Limited",
    accent: false,
  },
];

const CONSULTING_ITEMS = [
  "SaaS architecture & tech stack decisions",
  "AI product development & go-to-market",
  "Business structure, entity setup, equity splits",
  "Hardware / semiconductor project guidance",
  "Physical product development & sourcing",
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string>("pro");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "38vh", padding: "120px 64px 70px" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.07) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <motion.p
            className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Work With York
          </motion.p>
          <motion.h1
            className="text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-center"
            style={{ marginBottom: "24px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Let&apos;s build<br /><span className="text-white/20">something real.</span>
          </motion.h1>
          <motion.p
            className="text-sm text-white/30 max-w-md text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            Pick your tier, drop a message, and I&apos;ll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section style={{ padding: "40px 64px 140px", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Left — tier selector + consulting info */}
          <div className="flex flex-col gap-5">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-semibold mb-1">Choose Your Path</p>
            </FadeIn>

            {/* Tier cards */}
            {TIERS.map((tier, i) => (
              <FadeIn key={tier.value} delay={i * 0.06}>
                <motion.button
                  onClick={() => setSelected(tier.value)}
                  className="w-full text-left relative overflow-hidden"
                  style={{
                    borderRadius: "24px",
                    padding: "28px 32px",
                    background: selected === tier.value
                      ? tier.accent
                        ? "linear-gradient(135deg, rgba(230,57,70,0.1) 0%, rgba(230,57,70,0.04) 100%)"
                        : "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.01)",
                    border: selected === tier.value
                      ? tier.accent ? "1px solid rgba(230,57,70,0.35)" : "1px solid rgba(255,255,255,0.15)"
                      : "1px solid rgba(255,255,255,0.05)",
                    boxShadow: selected === tier.value && tier.accent ? "0 0 40px -10px rgba(230,57,70,0.2)" : "none",
                    transition: "all 0.3s ease",
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Selected indicator */}
                  <AnimatePresence>
                    {selected === tier.value && (
                      <motion.div
                        className="absolute left-0 top-4 bottom-4 w-[3px] bg-[#e63946]"
                        style={{ borderRadius: "0 3px 3px 0" }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-widest text-white">{tier.name}</span>
                        {tier.tag && (
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            tier.accent ? "bg-[#e63946]/15 text-[#e63946]" : "bg-white/[0.06] text-white/30"
                          }`}>{tier.tag}</span>
                        )}
                      </div>
                      <p className="text-xs text-white/30 leading-relaxed max-w-xs">{tier.desc}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-2xl font-black">{tier.price}</span>
                      <span className="text-xs text-white/20 ml-0.5">{tier.per}</span>
                    </div>
                  </div>
                </motion.button>
              </FadeIn>
            ))}

            {/* Consulting scope — shown when consulting selected */}
            <AnimatePresence>
              {selected === "consulting" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: "24px", padding: "28px 32px",
                      background: "rgba(230,57,70,0.03)",
                      border: "1px solid rgba(230,57,70,0.12)",
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-semibold mb-4">What We Can Cover</p>
                    <ul className="space-y-2.5">
                      {CONSULTING_ITEMS.map((item) => (
                        <li key={item} className="flex gap-3 text-xs text-white/35">
                          <span className="text-[#e63946]/50 shrink-0">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct contact */}
            <FadeIn delay={0.2}>
              <div className="flex gap-3">
                {[
                  { label: "contact@yorksims.com", href: "mailto:contact@yorksims.com" },
                  { label: "GitHub", href: "https://github.com/theblockchainbaby" },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex-1 text-center text-xs text-white/30 hover:text-white transition-colors py-3 px-4"
                    style={{ borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
                    whileHover={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — form */}
          <FadeIn delay={0.12}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center"
                  style={{
                    borderRadius: "32px", padding: "80px 40px",
                    background: "linear-gradient(135deg, rgba(230,57,70,0.06) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(230,57,70,0.2)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-[#e63946]/10 border border-[#e63946]/20 flex items-center justify-center mb-6"
                  >
                    <span className="text-[#e63946] text-xl">✓</span>
                  </motion.div>
                  <p className="text-2xl font-black mb-3">You&apos;re in the queue.</p>
                  <p className="text-sm text-white/30 leading-relaxed">I&apos;ll get back to you within 24 hours. Check your email.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: "32px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Top shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

                  <div style={{ padding: "40px" }}>
                    {/* Selected tier badge */}
                    <div className="flex items-center justify-between mb-8">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-semibold">Your Message</p>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={selected}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.25 }}
                          className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(230,57,70,0.1)", color: "#e63946", border: "1px solid rgba(230,57,70,0.2)" }}
                        >
                          {TIERS.find(t => t.value === selected)?.name}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                          { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20 mb-2">{field.label}</label>
                            <input
                              type={field.type}
                              required
                              value={form[field.key as keyof typeof form]}
                              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                              className="w-full bg-white/[0.03] border border-white/[0.07] px-4 py-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-[#e63946]/40 transition-colors"
                              style={{ borderRadius: "14px" }}
                              placeholder={field.placeholder}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20 mb-2">Message</label>
                        <textarea
                          required
                          rows={6}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/[0.07] px-4 py-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-[#e63946]/40 transition-colors resize-none"
                          style={{ borderRadius: "14px" }}
                          placeholder="What are you building? What do you need?"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className="w-full py-4 bg-[#e63946] text-white text-xs font-bold uppercase tracking-widest relative overflow-hidden"
                        style={{ borderRadius: "100px" }}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(230,57,70,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                        />
                        <span className="relative z-10">Send Message →</span>
                      </motion.button>

                      <p className="text-center text-[10px] text-white/15 font-mono">Replies within 24 hours.</p>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 64px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" style={{ height: "60px", width: "auto" }} />
          <p className="text-xs text-white/20 font-mono">Teaching Execution, Not Theory</p>
          <div className="flex gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Platform", href: "/hub" },
              { label: "Verticals", href: "/verticals" },
              { label: "Blog", href: "/blog" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-xs text-white/30 hover:text-white transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
