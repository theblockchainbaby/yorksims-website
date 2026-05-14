"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PRO_FEATURES = [
  "Monthly live Q&A with York",
  "Private Discord community",
  "Gamified XP progression + certificates",
  "All 10 verticals — modules are free anyway, this is the live layer",
  "Submit questions for the Q&A in advance",
  "First to know when new modules drop",
];

const BUILDER_FEATURES = [
  "Everything in Pro",
  "Direct email access to York (24h reply)",
  "Small-group coaching (capped at 20)",
  "Priority repo drops before public release",
  "Quarterly strategy call",
];

const FAQS = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your dashboard. No penalty, no questions. You keep access through the end of your billing period." },
  { q: "Wait — the modules are free? What am I paying for?", a: "The modules — every walkthrough, every code repo, every template across all 10 verticals — are free to read and follow. Pro ($29/mo) is the live layer: the monthly Q&A with York where you can actually ask questions, the private Discord community, and the gamified progress tracking. Builder ($499/mo) adds direct email access and small-group coaching. You're paying for the room and the access, not the content." },
  { q: "Is there a free trial?", a: "No free trial, but there is a 7-day full refund policy. If it's not for you, email York and you get your money back." },
  { q: "Do I need to know how to code?", a: "Some verticals (Software, Hardware, AI Agents) assume coding ability. Others (Business, Land, Athlete) do not. Most members start with 1–2 verticals and expand." },
  { q: "What if I only care about one vertical?", a: "Then read that vertical's modules for free. If you want into the live Q&A and the community — and most people do once they're a few modules in, because the systems cross-pollinate — that's Pro. SaaS pricing models apply to AI agents. LLC structure applies to land deals. That's the point." },
  { q: "Why is Builder capped at 20?", a: "Because the direct email promise stops working above that. Every Builder member gets a 24-hour reply time from York. That's only possible at small scale." },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* Hero */}
      <section className="relative px-6 md:px-16 overflow-hidden" style={{ paddingTop: "120px", paddingBottom: "40px" }}>
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

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}>
            Pricing
          </motion.p>
          <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}>
            The modules are free. <span className="text-white/20">Pay for the room.</span>
          </motion.h1>
          <motion.p className="text-lg text-white/35 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}>
            Every module across all 10 verticals — code, contracts, templates — is free to read and follow. Pro ($29/mo) is the live layer: monthly Q&amp;A, the private community, progress tracking. Builder ($499/mo) adds direct email and coaching. Cancel anytime.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="px-6 md:px-16" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Pro */}
          <FadeIn>
            <div className="relative border border-white/[0.08] rounded-[28px] p-10 h-full flex flex-col" style={{
              background: "linear-gradient(135deg, rgba(230,57,70,0.03), rgba(255,255,255,0.01))",
            }}>
              <div className="absolute top-6 right-8">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#e63946] bg-[#e63946]/10 px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-4">Pro</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-black tracking-tight">$29</span>
                <span className="text-lg text-white/30">/mo</span>
              </div>
              <p className="text-sm text-white/35 mb-8 leading-relaxed">
                The modules are already free. Pro is the live layer on top: monthly Q&amp;A with York, the private community, and gamified progress across all 10 verticals. Cancel anytime.
              </p>
              <ul className="flex-1 flex flex-col gap-3 mb-10">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-[7px] w-[6px] h-[6px] rounded-full bg-[#e63946] flex-shrink-0" />
                    <span className="text-[15px] text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center text-sm font-bold uppercase tracking-widest px-8 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)]"
              >
                Join Pro — Cancel Anytime
              </Link>
              <p className="text-xs text-white/20 text-center mt-4">7-day full refund if it&rsquo;s not for you.</p>
            </div>
          </FadeIn>

          {/* Builder */}
          <FadeIn delay={0.08}>
            <div className="border border-white/[0.06] rounded-[28px] p-10 h-full flex flex-col">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-semibold mb-4">Builder</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-black tracking-tight">$499</span>
                <span className="text-lg text-white/30">/mo</span>
              </div>
              <p className="text-sm text-white/35 mb-8 leading-relaxed">
                For serious builders who want York&rsquo;s direct line. Application required. Capped at 20 members for real reasons.
              </p>
              <ul className="flex-1 flex flex-col gap-3 mb-6">
                {BUILDER_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-[7px] w-[6px] h-[6px] rounded-full bg-white/20 flex-shrink-0" />
                    <span className="text-[15px] text-white/50">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border border-white/[0.06] rounded-[16px] p-5 mb-8 bg-white/[0.015]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-white/40">Seats filled</span>
                  <span className="text-xs font-mono text-white/60">14 / 20</span>
                </div>
                <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-white/20" style={{ width: "70%" }} />
                </div>
              </div>
              <Link
                href="/contact"
                className="block text-center text-sm font-bold uppercase tracking-widest px-8 py-4 border border-white/10 text-white/70 rounded-full hover:border-white/30 hover:text-white transition-all"
              >
                Apply to Builder
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Annual note */}
        <FadeIn delay={0.12}>
          <p className="text-center text-sm text-white/25 mt-10 max-w-lg mx-auto">
            Annual plan coming soon: $290/year (save $58). All other terms identical.
          </p>
        </FadeIn>
      </section>

      {/* What's included */}
      <section className="px-6 md:px-16 border-t border-white/[0.06]" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[2px] w-10 bg-[#e63946]" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">Free vs Pro vs Builder</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Free — the modules", body: "Every walkthrough, every GitHub repo, every template and contract across all 10 verticals. The build as it happened, commits and all. No login, no paywall. This is the bulk of the value and it costs nothing." },
              { title: "Pro ($29/mo) — the live layer", body: "Monthly live Q&A with York where you actually ask questions. Private Discord of builders across every vertical. Gamified XP, progress tracking, and certificates. You're paying for the room, not the content." },
              { title: "Builder ($499/mo) — the direct line", body: "Everything in Pro, plus direct email access to York with a 24-hour reply, small-group coaching capped at 20, and priority repo drops. Application required." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="border border-white/[0.06] rounded-[20px] p-7 h-full">
                  <h3 className="text-lg font-black tracking-tight mb-3">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The 10 verticals */}
      <section className="px-6 md:px-16" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[2px] w-10 bg-[#e63946]" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">All 10 verticals, one price</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Software (SaaS)",
              "AI Agents",
              "Hardware & Semiconductor",
              "Blockchain & Fintech",
              "Business Operations",
              "Physical Products",
              "Land & Real Estate",
              "Athlete to Entrepreneur",
              "Voice Agents / Vertical SaaS",
              "Creative Tech & AI Production",
            ].map((name, i) => (
              <FadeIn key={name} delay={i * 0.03}>
                <div className="flex items-center gap-3 border border-white/[0.06] rounded-[12px] px-5 py-4">
                  <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#e63946]" />
                  <span className="text-sm text-white/60">{name}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <div className="text-center mt-8">
              <Link href="/verticals" className="text-sm text-white/30 hover:text-[#e63946] transition-colors font-mono">
                See all 10 verticals →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-16 border-t border-white/[0.06]" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[2px] w-10 bg-[#e63946]" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">Questions</h2>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-4">
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <details className="border border-white/[0.06] rounded-[16px] px-6 py-5 group">
                  <summary className="cursor-pointer list-none flex items-center justify-between">
                    <span className="text-base font-bold text-white">{f.q}</span>
                    <span className="text-[#e63946] group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <p className="text-sm text-white/40 mt-4 leading-relaxed">{f.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "48px", paddingBottom: "48px", display: "flex", justifyContent: "center" }}>
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" style={{ height: "60px", width: "auto" }} />
          <p className="text-xs text-white/20 font-mono">Teaching Execution, Not Theory</p>
          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            {[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Verticals", href: "/verticals" },
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
