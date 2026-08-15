"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";
import { BOOKS, formatBookPrice } from "../lib/books";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FREE_INCLUDES = [
  "All 10 verticals — every module, walkthrough, and contract",
  "All public GitHub repos with full commit history",
  "All free tools (LLC generator, raw-land checklist, quizzes)",
  "Both learning paths — Python and Web Development",
  "Every blog post, every breakdown, no signup wall",
];

const ONE_ON_ONE_INCLUDES = [
  "SaaS architecture & technical review",
  "AI agents — n8n, MCP, ElevenLabs, Claude Code workflows",
  "Hardware / RTL — SystemVerilog, FPGA, semiconductor walkthroughs",
  "Business structure — LLC formation, contracts, equity",
  "Land deals & raw-land development",
  "Go-to-market strategy for technical products",
];

const FAQS = [
  {
    q: "Wait — the modules are really free?",
    a: "Yes. Every walkthrough, every code repo, every template across all 10 verticals — free to read, clone, and use. No login, no paywall, no email gate. The site exists to be useful first.",
  },
  {
    q: "What does the $99/hr session actually cover?",
    a: "Whatever you bring. Most sessions are SaaS architecture, AI agent design, business structure (LLC, contracts), or technical review of code you're shipping. If you want the deep-dive instead of figuring it out from the free modules, book a session.",
  },
  {
    q: "How do I book?",
    a: "Email contact@yorksims.com or hit the Contact page. Tell me what you want to work on; I'll send back available slots. Payment via Stripe before the session.",
  },
  {
    q: "Are the books free too?",
    a: "No — the three books (YORK, Built For More, Figure It Out) are paid PDFs at $19–$50 each. Buy on the Books page, pay with card via Stripe, download instantly. Everything else on the site is free.",
  },
  {
    q: "Do I need to know how to code to use the free modules?",
    a: "Some verticals (Software, Hardware, AI Agents) assume coding ability. Others (Business, Land, Athlete) do not. Each module says upfront what it expects.",
  },
  {
    q: "Why give everything away for free?",
    a: "Because the bottleneck isn't access to information — it's execution. The modules are the ground game. The 1-on-1 is for when you're stuck on something specific and want a real opinion fast.",
  },
  {
    q: "What about refunds?",
    a: "If a 1-on-1 session doesn't deliver value, email contact@yorksims.com within 48 hours and I'll refund it. No questions, no friction.",
  },
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
    <div className="min-h-screen bg-[#0c0a0a] text-white">
      <Nav />

      {/* Hero */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "150px", paddingBottom: "40px" }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.p
            className="text-[11px] uppercase tracking-[0.28em] text-[#e63946] font-semibold mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Pricing
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[0.95] mb-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          >
            Everything&rsquo;s free.{" "}
            <span className="text-white/25">
              Book a session when you want a real opinion.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-white/45 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
          >
            Every module across all 10 verticals — code, contracts, templates,
            both learning paths — is free to read, clone, and use. The paid
            things: the three book PDFs ($19–$50 each) and a 1-on-1 session
            with York at $99/hour for when you want the deep-dive on something
            specific.
          </motion.p>
        </div>
      </section>

      {/* Two cards: Free + 1-on-1 */}
      <section
        className="px-6 md:px-16"
        style={{ paddingTop: "60px", paddingBottom: "80px" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* FREE */}
          <FadeIn>
            <div className="border border-white/[0.08] rounded-[28px] p-10 h-full flex flex-col bg-white/[0.015]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 font-semibold mb-5">
                Free — everything
              </p>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-6xl font-display font-extrabold tracking-tight">
                  $0
                </span>
                <span className="text-base text-white/30">forever</span>
              </div>
              <p className="text-sm text-white/45 mb-9 leading-relaxed">
                The modules, the repos, the tools, the lessons. No login.
                No email gate. No upsell at the end. This is the bulk of
                what&rsquo;s here and it costs nothing.
              </p>
              <ul className="flex-1 flex flex-col gap-3 mb-10">
                {FREE_INCLUDES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-white/30 flex-shrink-0" />
                    <span className="text-[15px] text-white/65">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/verticals"
                className="block text-center text-sm font-bold uppercase tracking-widest px-8 py-4 border border-white/12 text-white/80 rounded-full hover:text-white hover:border-white/30 transition-colors"
              >
                Browse the verticals
              </Link>
            </div>
          </FadeIn>

          {/* 1-on-1 */}
          <FadeIn delay={0.08}>
            <div
              className="relative border border-[#e63946]/30 rounded-[28px] p-10 h-full flex flex-col"
              style={{
                background:
                  "linear-gradient(135deg, rgba(230,57,70,0.05), rgba(255,255,255,0.005))",
              }}
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#e63946] font-semibold mb-5">
                1-on-1 with York
              </p>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-6xl font-display font-extrabold tracking-tight">
                  $99
                </span>
                <span className="text-base text-white/35">/ hour</span>
              </div>
              <p className="text-sm text-white/55 mb-9 leading-relaxed">
                One hour, your problem, a real opinion. Booked by the
                session — no subscription, no minimum, no retainer. Email
                first to scope what we cover.
              </p>
              <ul className="flex-1 flex flex-col gap-3 mb-10">
                {ONE_ON_ONE_INCLUDES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#e63946] flex-shrink-0" />
                    <span className="text-[15px] text-white/65">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center text-sm font-bold uppercase tracking-widest px-8 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-colors"
              >
                Book a session
              </Link>
              <p className="text-xs text-white/30 text-center mt-4">
                48-hour refund if the session doesn&rsquo;t deliver value.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The books */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "80px", paddingBottom: "60px" }}
      >
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-10 bg-[#e63946]" />
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">
                The books
              </h2>
            </div>
            <p className="text-sm text-white/40 mb-10 max-w-xl leading-relaxed">
              Three books, sold as PDFs. Pay with card, download on the next
              screen.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-4">
            {BOOKS.map((book, i) => (
              <FadeIn key={book.id} delay={i * 0.06}>
                <Link
                  href="/books"
                  className="group flex items-center gap-4 border border-white/[0.06] rounded-[16px] px-5 py-4 hover:border-white/20 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={book.cover}
                    alt={`${book.title} — book cover`}
                    loading="lazy"
                    className="w-12 h-16 object-cover rounded-[6px] flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-[#e63946] transition-colors truncate">
                      {book.title}
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      {formatBookPrice(book.priceCents)} · PDF
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <div className="text-center mt-8">
              <Link
                href="/books"
                className="text-sm text-white/30 hover:text-[#e63946] transition-colors font-mono"
              >
                See the books →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The 10 verticals */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "80px", paddingBottom: "60px" }}
      >
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[2px] w-10 bg-[#e63946]" />
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">
                What&rsquo;s in the free tier
              </h2>
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
              <Link
                href="/verticals"
                className="text-sm text-white/30 hover:text-[#e63946] transition-colors font-mono"
              >
                See all 10 verticals →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "80px", paddingBottom: "100px" }}
      >
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[2px] w-10 bg-[#e63946]" />
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">
                Questions
              </h2>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-4">
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <details className="border border-white/[0.06] rounded-[16px] px-6 py-5 group">
                  <summary className="cursor-pointer list-none flex items-center justify-between">
                    <span className="text-base font-bold text-white">{f.q}</span>
                    <span className="text-[#e63946] group-open:rotate-45 transition-transform text-xl">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-white/45 mt-4 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 md:px-16"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "48px",
          paddingBottom: "48px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/york-state-logo.png"
            alt="York State University"
            style={{ height: "60px", width: "auto" }}
          />
          <p className="text-xs text-white/20 font-mono">
            Teaching Execution, Not Theory
          </p>
          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            {[
              { label: "Home", href: "/" },
              { label: "Verticals", href: "/verticals" },
              { label: "Tools", href: "/tools" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-white/30 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
