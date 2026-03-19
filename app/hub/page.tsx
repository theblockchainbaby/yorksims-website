"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Nav from "../components/Nav";

const FEATURES = [
  {
    icon: "▶",
    title: "Live Build Sessions",
    desc: "Watch York build real products from zero — SaaS, voice agents, hardware, blockchain. Not demos. Actual production deploys.",
  },
  {
    icon: "⬡",
    title: "Templates, Contracts & SOPs",
    desc: "Every vertical ships with plug-and-play assets: LLC docs, sales contracts, code starters, pitch decks, sourcing playbooks.",
  },
  {
    icon: "◈",
    title: "Monthly Live Q&A",
    desc: "Direct access to York every month. Bring your idea, your problem, your pitch. Leave with a plan.",
  },
  {
    icon: "◎",
    title: "Private Community",
    desc: "Builders only. No noise. Share projects, get feedback, find co-founders across 10 different industries.",
  },
  {
    icon: "⟁",
    title: "Full Code Repos",
    desc: "Every build session ships with the full repo. Fork it, modify it, launch it. Builder tier gets priority access.",
  },
  {
    icon: "◇",
    title: "Small Group Coaching",
    desc: "Builder tier is capped at 20. You're not a number — you're getting real feedback on your actual project.",
  },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Pick your vertical", desc: "Start with what you want to build — software, blockchain, real estate, a product. We have receipts in all 10." },
  { num: "02", title: "Watch it get built live", desc: "Not a pre-recorded course. Live sessions, real decisions, real mistakes, real fixes. Ship with York in real time." },
  { num: "03", title: "Use the assets", desc: "Every vertical ships with templates, contracts, code repos, and frameworks you can deploy immediately." },
  { num: "04", title: "Build in the community", desc: "Share your progress, get feedback, collaborate with other builders across industries. No theory. All execution." },
];

const STATS = [
  { value: "10", label: "Verticals Covered" },
  { value: "10K+", label: "Builder Hours Logged" },
  { value: "15+", label: "Public GitHub Repos" },
  { value: "2x", label: "Pro Athlete → Founder" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HubPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "65vh", padding: "120px 64px 80px" }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Red glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)" }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 flex flex-col items-center">
          <motion.p
            className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            The Platform
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-center"
            style={{ marginBottom: "32px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Not a course.<br /><span className="text-white/20">A builder OS.</span>
          </motion.h1>
          <motion.p
            className="text-sm text-white/30 max-w-lg text-center leading-relaxed"
            style={{ marginBottom: "48px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            Live builds, real assets, direct access. Everything you need to execute across 10 industries — from a builder who&apos;s already done it.
          </motion.p>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
          >
            <Link
              href="/#pricing"
              className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)]"
            >
              Join Now
            </Link>
            <Link
              href="/verticals"
              className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 border border-white/10 text-white/50 rounded-full hover:text-white hover:border-white/25 transition-all"
            >
              Browse Verticals
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-transparent to-white/20 mx-auto"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-b border-white/[0.06]" style={{ padding: "64px" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06}>
              <div className="bg-[#0a0a0a] px-10 py-10 text-center">
                <p className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">{s.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ padding: "140px 64px", maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-4 text-center">What&apos;s Inside</p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center mb-20">
            Built for execution,<br /><span className="text-white/20">not consumption.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <motion.div
                className="group bg-[#0a0a0a] border border-transparent hover:border-white/[0.08] transition-all duration-500 relative overflow-hidden"
                style={{ padding: "48px 40px", borderRadius: "0" }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.01)" }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-[#e63946] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
                <p className="text-2xl mb-6 text-[#e63946]/60 group-hover:text-[#e63946] transition-colors duration-300">{f.icon}</p>
                <h3 className="text-base font-black tracking-tight text-white mb-3">{f.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed">{f.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-white/[0.06]" style={{ padding: "140px 64px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-4 text-center">How It Works</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center mb-20">
              Four steps.<br /><span className="text-white/20">Zero fluff.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.08}>
                <motion.div
                  className="group relative border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
                  style={{ borderRadius: "32px", padding: "48px" }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#e63946] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                    style={{ borderRadius: "2px" }}
                  />
                  <p className="text-[60px] font-black text-white/[0.04] leading-none mb-4 select-none">{step.num}</p>
                  <h3 className="text-xl font-black tracking-tight text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed">{step.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative flex flex-col items-center text-center border-t border-white/[0.06]" style={{ padding: "140px 64px" }}>
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.07) 0%, transparent 70%)" }}
        />
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6">Start Building</p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Pro starts at $29/mo.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-sm text-white/30 mb-12 max-w-md">Full access to all 10 verticals, templates, live Q&A, and the private community.</p>
        </FadeIn>
        <FadeIn delay={0.14}>
          <Link
            href="/#pricing"
            className="inline-block text-sm font-bold uppercase tracking-widest px-12 py-5 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)] hover:shadow-[0_0_50px_rgba(230,57,70,0.5)]"
          >
            See All Plans
          </Link>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 64px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" style={{ height: "60px", width: "auto" }} />
          <p className="text-xs text-white/20 font-mono">Teaching Execution, Not Theory</p>
          <div className="flex gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Verticals", href: "/verticals" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-xs text-white/30 hover:text-white transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
