"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./components/Nav";
import { Meteors } from "./components/magicui/meteors";
import { ShimmerButton } from "./components/magicui/shimmer-button";
import { BorderBeam } from "./components/magicui/border-beam";
import { MagicCard } from "./components/magicui/magic-card";


gsap.registerPlugin(ScrollTrigger);

// Three.js scene — client only
const HeroScene = dynamic(() => import("./components/HeroScene"), { ssr: false });

// ── DATA ──────────────────────────────────────────────────────────────────────

const PROOF: { value: number; suffix: string; label: string; format?: boolean }[] = [
  { value: 15,    suffix: "",  label: "Public GitHub Repos" },
  { value: 10,    suffix: "+", label: "Industries Shipped" },
  { value: 10000, suffix: "+", label: "Builder Hours", format: true },
  { value: 2,     suffix: "x", label: "Pro Athlete → Founder" },
];

const VERTICALS = [
  { num: "01", title: "Build Software From Zero",           tag: "Next.js · Supabase · Vercel",       href: "/verticals/software",
    proofs: ["/proofs/software-1.webp", "/proofs/software-2.webp", "/proofs/software-3.webp"],
    proofFit: ["object-left object-cover", "object-left object-cover", "object-left object-cover"] },
  { num: "02", title: "Agentic AI Agents & Automation",      tag: "ElevenLabs · MCP · OpenAI",          href: "/verticals/ai-agents",
    proofs: ["/proofs/ai-1.webp", "/proofs/ai-2.webp", "/proofs/ai-3.webp"],
    proofFit: ["object-left-top object-cover", "object-left object-cover", "object-center-bottom object-cover"] },
  { num: "03", title: "Hardware & Semiconductor",           tag: "SystemVerilog · RTL · VLSI",          href: "/verticals/hardware",
    proofs: ["/proofs/hardware-1.webp", "/proofs/hardware-2.webp", "/proofs/hardware-3.webp"],
    proofFit: ["object-center object-cover", "object-left-top object-cover", "object-left-top object-cover"] },
  { num: "04", title: "Blockchain & Fintech",               tag: "XRPL · EVM · Solana · Bitcoin",      href: "/verticals/blockchain",
    proofs: ["/proofs/blockchain-1.webp", "/proofs/blockchain-2.webp", "/proofs/blockchain-3.webp"],
    proofFit: ["object-top object-cover", "object-center object-cover scale-[1.4]", "object-center object-cover scale-[1.4]"] },
  { num: "05", title: "Start & Structure a Business",       tag: "LLC · Contracts · Sales",             href: "/verticals/business",
    proofs: ["/proofs/business-1.webp", "/proofs/business-2.webp", "/proofs/business-3.webp"],
    proofFit: ["object-top object-cover", "object-top object-cover", "object-center object-cover scale-[1.3]"] },
  { num: "06", title: "Physical Products & Manufacturing",  tag: "CPG · Sourcing · Retail",             href: "/verticals/products",
    proofs: ["/proofs/mfg-a.webp", "/proofs/mfg-b.webp", "/proofs/mfg-c.webp"],
    proofFit: ["object-center object-cover", "object-center object-cover", "object-top object-cover"] },
  { num: "07", title: "Land & Real Estate Development",     tag: "Raw Land · Permits · Zoning",         href: "/verticals/land",
    proofs: ["/proofs/land-1.webp", "/proofs/land-2.webp", "/proofs/land-3.webp"],
    proofFit: ["object-center object-cover", "object-center object-cover", "object-top object-cover"] },
  { num: "08", title: "Athlete to Entrepreneur",            tag: "D1 · Discipline · Transition",        href: "/verticals/athlete",
    proofs: ["/proofs/athlete-1.webp", "/proofs/athlete-2.webp", "/proofs/york-headshot.png"],
    proofFit: ["object-[50%_0%] object-cover", "object-center object-cover", "object-[50%_25%] object-cover"] },
  { num: "09", title: "Vertical SaaS & Voice Agents",       tag: "Voice · Vertical SaaS · White-Label", href: "/verticals/automotive",
    proofs: ["/proofs/creative-1.webp", "/proofs/creative-2.webp", "/proofs/creative-3.webp"],
    proofFit: ["object-left-top object-cover", "object-top object-cover", "object-left-top object-cover"] },
  { num: "10", title: "Creative Tech & AI Production",      tag: "Canvas · fal.ai · Kling 3.0",         href: "/verticals/creative",
    proofs: ["/proofs/saas-a.webp", "/proofs/saas-b.webp", "/proofs/saas-c.webp"],
    proofFit: ["object-left-top object-cover", "object-top object-cover", "object-right-top object-cover"] },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    per: "forever",
    desc:
      "Every module, every repo, every tool across all 10 verticals. No login, no email gate, no upsell. The bulk of what's here costs nothing.",
    features: [
      "All 10 verticals — modules, code & contracts",
      "All public GitHub repos with full history",
      "Both learning paths (Python + Web Development)",
      "Free tools: LLC generator, raw-land checklist, quizzes",
      "Every blog breakdown",
    ],
    cta: "Browse the verticals",
    href: "/verticals",
    accent: false,
  },
  {
    name: "1-on-1 with York",
    price: "$99",
    per: "/ hour",
    desc:
      "One hour, your problem, a real opinion. SaaS architecture, AI agents, business structure, technical review. Booked by the session — no retainer.",
    features: [
      "SaaS architecture & technical review",
      "AI agents — n8n, MCP, Claude Code, ElevenLabs",
      "Hardware / RTL — SystemVerilog, FPGA",
      "Business structure — LLC, contracts, equity",
      "Land deals & raw-land development",
      "48-hour refund if it doesn't deliver",
    ],
    cta: "Book a session",
    href: "/contact",
    accent: true,
  },
];

// ── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function Counter({ value, suffix, format }: { value: number; suffix: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => {
        const n = Math.round(obj.val);
        el.textContent = (format ? n.toLocaleString() : n) + suffix;
      },
    });
  }, [inView, value, suffix, format]);

  return <span ref={ref}>0{suffix}</span>;
}

// ── REVEAL WRAPPER (fade-up) ──────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── SLIDE FROM SIDE ───────────────────────────────────────────────────────────

function SlideFrom({ children, dir = "left", delay = 0, className = "" }: {
  children: React.ReactNode; dir?: "left" | "right"; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: dir === "left" ? -80 : 80, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── SCALE UP ──────────────────────────────────────────────────────────────────

function ScaleUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── FLIP IN ───────────────────────────────────────────────────────────────────

function FlipIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 60, y: 40, transformPerspective: 800 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── WORD-BY-WORD REVEAL ───────────────────────────────────────────────────────

function WordReveal({ text, className = "", delay = 0 }: {
  text: string; className?: string; delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.045 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── 3-D TILT CARD ─────────────────────────────────────────────────────────────

// ── STAGGER LIST (children animate in) ───────────────────────────────────────

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const staggerItem = {
  hidden: { opacity: 0, x: 12 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

// ── MAIN ─────────────────────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section
      id="pricing"
      className="px-6 md:px-16"
      style={{
        zIndex: 1,
        background: "#0c0a0a",
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "160px",
        paddingBottom: "160px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1100px" }}>
        <FlipIn>
          <p className="text-[14px] uppercase tracking-[0.24em] text-[#e63946] mb-6 font-semibold text-center">
            Pricing
          </p>
        </FlipIn>
        <div style={{ height: "24px" }} />
        <Reveal delay={0.1}>
          <h2 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight mb-6 text-center leading-[1]">
            Everything&rsquo;s free.{" "}
            <span className="text-white/25">
              Book a session when you want a real opinion.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="text-base md:text-lg text-white/35 text-center max-w-2xl mx-auto leading-relaxed mb-14">
            The modules, the repos, the tools &mdash; all free, forever. The
            only paid thing is a 1-on-1 with York at $99/hour for when you
            want a deep-dive on something specific.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-[920px] mx-auto">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="group h-full"
            >
              <div
                className={`relative h-full flex flex-col border transition-colors overflow-hidden ${
                  plan.accent
                    ? "border-[#e63946]/30 group-hover:border-[#e63946]/55"
                    : "border-white/[0.08] group-hover:border-white/[0.18] bg-white/[0.015]"
                }`}
                style={{
                  borderRadius: "28px",
                  padding: "44px 32px 32px",
                  background: plan.accent
                    ? "linear-gradient(135deg, rgba(230,57,70,0.05), rgba(255,255,255,0.005))"
                    : undefined,
                }}
              >
                <p
                  className={`text-[11px] uppercase tracking-[0.28em] font-semibold mb-5 ${
                    plan.accent ? "text-[#e63946]" : "text-white/45"
                  }`}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-6xl font-display font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-base text-white/30">{plan.per}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-8">
                  {plan.desc}
                </p>
                <div className="w-full h-px bg-white/[0.06] mb-7" />
                <ul className="flex-1 flex flex-col gap-3 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-[7px] w-[5px] h-[5px] rounded-full flex-shrink-0 ${
                          plan.accent ? "bg-[#e63946]" : "bg-white/30"
                        }`}
                      />
                      <span className="text-[14.5px] text-white/65 leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center text-sm font-bold uppercase tracking-widest py-4 rounded-full transition-colors ${
                    plan.accent
                      ? "bg-[#e63946] text-white hover:bg-[#ff4d5a]"
                      : "border border-white/12 text-white/80 hover:text-white hover:border-white/30"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef     = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // GSAP hero entrance — one orchestrated entrance on load, nothing else.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-label",    { y: 20, opacity: 0, duration: 0.7 })
        .from(".hero-line-1",   { y: 60, opacity: 0, duration: 0.9 }, "-=0.3")
        .from(".hero-line-2",   { y: 60, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-sub",      { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-ctas > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.4")
        .from(".hero-proof",    { x: 28, opacity: 0, duration: 0.8 }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // GSAP horizontal scroll for verticals on large screens
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = horizontalRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 56px",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -totalWidth * self.progress });
        },
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  // GSAP section line reveal
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".section-line").forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  }, []);

  return (
    <div className="bg-[#0c0a0a] text-white overflow-x-hidden">
      {/* Three.js background — fixed, only in hero viewport */}
      <div className="fixed inset-0 h-screen pointer-events-none" style={{ zIndex: 0 }}>
        <HeroScene />
        {/* Radial vignette to fade edges */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #0c0a0a 100%)" }}
        />
      </div>

      <Nav />

      {/* ── HERO — content-height, left-biased, proof on the right ────────── */}
      <section
        ref={heroRef}
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ zIndex: 1, paddingTop: "172px", paddingBottom: "112px" }}
      >
        <div className="w-full max-w-[1180px] mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-x-14 gap-y-14 items-start">

          {/* LEFT — the statement */}
          <div>
            <p className="hero-label inline-flex items-center gap-2.5 text-xs md:text-sm font-mono uppercase tracking-[0.18em] text-[#e63946]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e63946]" />
              Teaching execution, not theory
            </p>

            <h1
              ref={headlineRef}
              className="font-display font-extrabold tracking-tight leading-[0.93] mt-7"
            >
              <span className="hero-line-1 block text-[clamp(46px,6.6vw,98px)] text-white">
                Stop learning.
              </span>
              <span className="hero-line-2 block text-[clamp(46px,6.6vw,98px)] text-[#e63946]">
                Start building.
              </span>
            </h1>

            <p className="hero-sub text-lg text-white/55 leading-relaxed max-w-xl mt-8">
              Competitors tell you <span className="text-white font-semibold">what</span> to
              do. York teaches you <span className="text-white font-semibold">how</span> —
              with real code, real contracts, real hardware. Every course ends with
              something you ship that day.
            </p>

            <div className="hero-ctas flex flex-wrap items-center gap-x-7 gap-y-4 mt-10">
              <Link href="/hub">
                <ShimmerButton
                  shimmerColor="#ff8c94"
                  background="rgba(230,57,70,1)"
                  borderRadius="10px"
                  className="text-xs font-bold uppercase tracking-widest"
                >
                  Explore the platform
                </ShimmerButton>
              </Link>
              <Link
                href="/verticals"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white/55 hover:text-white transition-colors"
              >
                See the 10 verticals
                <span className="text-[#e63946] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT — receipts, real numbers, no invented metrics */}
          <aside className="hero-proof lg:mt-2">
            <div className="border border-white/[0.08] rounded-[20px] bg-white/[0.015] p-7">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/35 mb-6">
                The receipts
              </p>

              <div className="flex items-end gap-7 mb-7">
                <div>
                  <div className="font-display text-5xl font-extrabold leading-none text-white">
                    10
                  </div>
                  <div className="text-xs text-white/40 mt-2">verticals shipped</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <div className="font-display text-5xl font-extrabold leading-none text-white">
                    15
                  </div>
                  <div className="text-xs text-white/40 mt-2">public repos</div>
                </div>
              </div>

              <ul className="flex flex-col border-t border-white/[0.06]">
                {[
                  "SaaS platforms",
                  "AI voice agents",
                  "Semiconductor RTL",
                  "Blockchain gaming",
                  "Automotive AI",
                  "Raw land, developed",
                  "Physical products on retail shelves",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-2.5 border-b border-white/[0.06] text-sm text-white/65"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#e63946] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://github.com/theblockchainbaby"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 text-xs font-mono text-white/40 hover:text-white transition-colors"
              >
                github.com/theblockchainbaby
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ── PROOF COUNTERS ────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.08] py-8 md:py-10 px-8 md:px-16" style={{ zIndex: 1, background: "#0c0a0a" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {PROOF.map((p, i) => (
            <ScaleUp key={p.label} delay={i * 0.1}>
              <motion.div
                className="text-center"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-display font-extrabold text-4xl md:text-5xl text-[#e63946] mb-1 tabular-nums leading-none">
                  <Counter value={p.value} suffix={p.suffix} format={p.format} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/25 font-mono">{p.label}</div>
              </motion.div>
            </ScaleUp>
          ))}
        </div>
      </section>

      {/* ── TECH MARQUEE ──────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/[0.04] py-6 overflow-hidden" style={{ zIndex: 1, background: "#0c0a0a" }}>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[...Array(2)].map((_, dupeIdx) => (
            <div key={dupeIdx} className="flex shrink-0">
              {["Next.js", "Supabase", "Vercel", "ElevenLabs", "OpenAI", "Solana", "XRPL", "SystemVerilog", "MCP", "GSAP", "Three.js", "Framer Motion", "Neon", "Python", "Node.js", "Docker"].map((tech) => (
                <span key={`${dupeIdx}-${tech}`} className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-mono whitespace-nowrap px-6">
                  {tech} <span className="text-[#e63946]/30 ml-3">{"\u2022"}</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PROBLEM / SOLUTION ────────────────────────────────────────────── */}
      <section className="px-6 md:px-16" style={{ zIndex: 1, background: "#0c0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "120px", paddingBottom: "120px" }}>
        <div style={{ width: "100%", maxWidth: "1100px", textAlign: "center" }}>

          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#e63946]">The Difference</p>
          </Reveal>

          <div style={{ height: "40px" }} />

          <Reveal delay={0.05}>
            <h2 className="text-[clamp(40px,5.5vw,72px)] leading-[0.96] font-semibold tracking-tight">
              The education space is full of talkers.
            </h2>
          </Reveal>

          <div style={{ height: "48px" }} />

          {/* Animated subtitle — word-by-word with color highlights */}
          <div style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "80px" }}>
            {(() => {
              const words = "Not theory. Not commentary. Real shipped work across software, AI, hardware, blockchain, business, and physical products.".split(" ");
              const highlights = new Set(["software,", "AI,", "hardware,", "blockchain,", "business,"]);
              return (
                <p className="text-[17px] leading-8 text-white/40" style={{ textAlign: "center" }}>
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.04 }}
                      style={{
                        display: "inline-block",
                        marginRight: "0.3em",
                        color: highlights.has(word) ? "rgba(230,57,70,0.8)" : undefined,
                        fontWeight: highlights.has(word) ? 600 : undefined,
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              );
            })()}
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <SlideFrom dir="left" delay={0.05}>
              <p className="text-[14px] uppercase tracking-[0.22em] text-white/20 font-semibold">Every other platform</p>
            </SlideFrom>
            <SlideFrom dir="right" delay={0.05}>
              <p className="text-[14px] uppercase tracking-[0.22em] text-[#e63946] font-semibold">YorkSims.com</p>
            </SlideFrom>
          </div>

          {/* Comparison rows */}
          {[
            { bad: "Interviews about what successful people did", good: "Here\u2019s how I built it \u2014 and here\u2019s the code" },
            { bad: "Surface-level business concepts & motivation", good: "Deep technical: build a SaaS, design a chip, structure a deal" },
            { bad: "Podcast episodes, webinars, community talks", good: "Templates, codebases, contracts, SOPs you use TODAY" },
            { bad: "Finish knowing what an LLC is", good: "Finish having formed the LLC \u2014 op agreement in hand" },
            { bad: "Leave inspired \u2014 still stuck", good: "Leave with a deployed SaaS on Vercel" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5">
              <SlideFrom dir="left" delay={0.08 + i * 0.07}>
                <div className="rounded-[20px] bg-white/[0.02] ring-1 ring-white/[0.05] px-8 py-6 flex gap-4 items-start text-left">
                  <span className="mt-2.5 h-2 w-2 rounded-full bg-white/15 shrink-0" />
                  <span className="text-[17px] leading-relaxed text-white/30">{row.bad}</span>
                </div>
              </SlideFrom>
              <SlideFrom dir="right" delay={0.08 + i * 0.07}>
                <motion.div
                  className="rounded-[20px] ring-1 ring-white/[0.08] px-8 py-6 flex gap-4 items-start text-left"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: "0 0 40px rgba(230,57,70,0.05)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(230,57,70,0.12)" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="mt-2.5 h-2 w-2 rounded-full bg-[#e63946] shrink-0" />
                  <span className="text-[17px] leading-relaxed text-white/80">{row.good}</span>
                </motion.div>
              </SlideFrom>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10 VERTICALS — HORIZONTAL SCROLL ─────────────────────────────── */}
      <section
        ref={horizontalRef}
        className="relative overflow-hidden"
        style={{ zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "48px 0 0 0" }}
      >
        <div className="flex justify-center px-6 md:px-16 mb-3">
          <div style={{ width: "100%", maxWidth: "896px", textAlign: "center" }}>
            <FlipIn>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#e63946]" style={{ marginBottom: "40px" }}>10 Verticals</p>
            </FlipIn>
            <Reveal delay={0.05}>
              <h2 className="text-[clamp(36px,5vw,72px)] leading-[0.96] font-semibold tracking-tight" style={{ maxWidth: "720px", margin: "0 auto", marginBottom: "40px" }}>
                More breadth than any single competitor. Every one with receipts.
              </h2>
            </Reveal>
            {/* Animated verticals list */}
            <div style={{ margin: "0 auto", maxWidth: "700px", marginBottom: "8px" }}>
              <p className="text-[17px] leading-7" style={{ textAlign: "center" }}>
                {["Software.", "AI.", "Hardware.", "Blockchain.", "Business.", "Products.", "Land.", "Athletics.", "Automotive.", "Creative Tech."].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 + i * 0.06 }}
                    style={{
                      display: "inline-block",
                      marginRight: "0.4em",
                      color: i % 2 === 0 ? "rgba(255,255,255,0.5)" : "rgba(230,57,70,0.6)",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: horizontal scroll track */}
        <div className="hidden lg:block overflow-hidden" style={{ paddingBottom: "120px" }}>
          <div ref={trackRef} style={{ display: "flex", gap: "20px", width: "max-content", paddingLeft: "calc(50vw - 220px)", paddingRight: "calc(50vw - 220px)", paddingBottom: "16px" }}>
            {VERTICALS.map((v, i) => {
              const rotations = [
                ["-rotate-[5deg]", "rotate-[3deg]", "-rotate-[2deg]"],
                ["-rotate-[4deg]", "rotate-[2deg]", "-rotate-[6deg]"],
                ["-rotate-[3deg]", "rotate-[5deg]", "-rotate-[1deg]"],
                ["-rotate-[6deg]", "rotate-[2deg]", "-rotate-[4deg]"],
                ["-rotate-[5deg]", "rotate-[4deg]", "-rotate-[2deg]"],
                ["-rotate-[3deg]", "rotate-[6deg]", "-rotate-[3deg]"],
                ["-rotate-[4deg]", "rotate-[3deg]", "-rotate-[5deg]"],
                ["-rotate-[5deg]", "rotate-[2deg]", "-rotate-[3deg]"],
                ["-rotate-[6deg]", "rotate-[4deg]", "-rotate-[2deg]"],
                ["-rotate-[3deg]", "rotate-[5deg]", "-rotate-[4deg]"],
              ];
              const rots = rotations[i] || rotations[0];

              return (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              >
                <Link href={v.href}>
                  <div className="relative w-[520px] rounded-[24px] cursor-pointer overflow-hidden group transition-shadow duration-500 hover:shadow-[0_0_80px_-20px_rgba(230,57,70,0.25)]">
                    {/* Base layer — dark bg */}
                    <div className="absolute inset-0 bg-[#0c0c0c]" />
                    <div className="absolute inset-0 border border-white/[0.06] rounded-[24px] group-hover:border-white/[0.12] transition-colors duration-500" />

                    {/* Red glow on hover */}
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.15) 0%, transparent 70%)" }}
                    />

                    {/* Text content — top */}
                    <div className="relative z-10 px-8 pt-8 pb-5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono text-[#e63946]/60 tracking-widest">{v.num}</span>
                        <div className="w-8 h-px bg-[#e63946]/20 group-hover:w-12 group-hover:bg-[#e63946]/40 transition-all duration-500" />
                      </div>
                      <p className="text-[22px] leading-[1.15] font-bold text-white">{v.title}</p>
                      <span className="text-[10px] tracking-[0.12em] uppercase text-white/20 group-hover:text-white/40 transition-colors duration-500 mt-3 block">{v.tag}</span>
                    </div>

                    {/* Proof layer — 3 images spread horizontally */}
                    <div className="relative z-10 px-6 pb-6 flex gap-3 items-end">
                      {v.proofs.map((src, j) => {
                        const fit = v.proofFit?.[j] || "object-cover object-left";
                        const scaleMatch = fit.match(/scale-\[([^\]]+)\]/);
                        const scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
                        const fitClasses = fit.replace(/scale-\[[^\]]+\]\s*/g, "").trim();
                        return (
                        <div
                          key={j}
                          className={`w-[155px] h-[180px] rounded-lg shadow-2xl border border-white/[0.06] overflow-hidden ${rots[j]} opacity-100 transition-all duration-500`}
                          style={{
                            transitionDelay: `${j * 100}ms`,
                            transform: `translateY(${10 + j * 4}px)`,
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt=""
                            className={`w-full h-full ${fitClasses}`}
                            style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
                          />
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile grid */}
        <div className="lg:hidden flex justify-center px-4 md:px-10 pb-32 md:pb-48">
          <div style={{ width: "100%", maxWidth: "896px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            {VERTICALS.map((v, i) => (
              <FlipIn key={v.num} delay={i * 0.05}>
                <Link href={v.href}>
                  <motion.div
                    className="group relative overflow-hidden"
                    style={{ borderRadius: "24px", padding: "28px 24px" }}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: "1px" }}>
                      <div className="w-full h-full rounded-[23px] bg-[#0c0a0a]" />
                    </div>
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#e63946]/30 to-transparent group-hover:via-[#e63946]/60 transition-all duration-500" />
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono text-[#e63946]/50 tracking-widest">{v.num}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/[0.04] to-transparent" />
                      </div>
                      <p className="text-[17px] leading-[1.25] font-semibold text-white mb-4 group-hover:text-white transition-colors">{v.title}</p>
                      <span className="text-[10px] tracking-[0.12em] uppercase text-white/20 group-hover:text-white/35 transition-colors">{v.tag}</span>
                    </div>
                  </motion.div>
                </Link>
              </FlipIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16" style={{ zIndex: 1, background: "#0c0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "120px", paddingBottom: "120px" }}>
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <FlipIn>
            <p className="text-[14px] uppercase tracking-[0.24em] text-[#e63946] mb-8 font-semibold">Built by a Builder</p>
          </FlipIn>
          <div style={{ height: "40px" }} />
          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.05]">
              Not a course creator who read a book.
            </h2>
          </Reveal>
          <div style={{ height: "40px" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16" style={{ alignItems: "start" }}>
            <div>
              <SlideFrom dir="left" delay={0.15}>
                <p className="text-base text-white/40 leading-relaxed mb-6">
                  D1 college basketball → professional basketball in Ankara, Turkey →
                  CEO of Caipher AI LLC. 15 public GitHub repositories spanning SaaS,
                  AI voice agents, semiconductor design, blockchain gaming, and
                  automotive AI.
                </p>
              </SlideFrom>
              <SlideFrom dir="left" delay={0.25}>
                <p className="text-base text-white/40 leading-relaxed mb-8">
                  Cannabis farms. Raw land developed from scratch. Physical products
                  on retail shelves. Every course comes with the receipts.
                </p>
                <a
                  href="https://github.com/theblockchainbaby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-[#e63946] hover:text-white transition-colors group"
                >
                  github.com/theblockchainbaby
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </a>
              </SlideFrom>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-5">
            {[
              { label: "Full-Stack SaaS",     sub: "VitrOS \u2014 Next.js + Supabase" },
              { label: "Agentic AI Agents",   sub: "Otto + MoltBot + YorkAi" },
              { label: "Semiconductor RTL",    sub: "HBM memory in SystemVerilog" },
              { label: "Web3 / Blockchain",    sub: "DualPay \u00b7 ChainPlay \u00b7 XRPL" },
              { label: "Cannabis Industry",    sub: "Farm to distribution" },
              { label: "Land Development",     sub: "Raw land \u2192 built from scratch" },
            ].map((item, i) => (
              <FlipIn key={item.label} delay={0.1 + i * 0.08}>
                <MagicCard className="rounded-[16px] p-6 cursor-default bg-[#0c0a0a]">
                  <p className="text-sm font-semibold text-white mb-2">{item.label}</p>
                  <p className="text-xs text-white/25 font-mono">{item.sub}</p>
                </MagicCard>
              </FlipIn>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <PricingSection />

      {/* ── BOOK ─────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16" style={{ zIndex: 1, background: "#0c0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "120px", paddingBottom: "120px" }}>
        <div style={{ width: "100%", maxWidth: "896px", textAlign: "center" }}>
          <FlipIn>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#e63946] mb-6">The Book</p>
          </FlipIn>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">YORK</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[17px] text-white/40 mb-12">by York W. Sims Jr.</p>
          </Reveal>
          <ScaleUp delay={0.2}>
            <div style={{ maxWidth: "550px", margin: "0 auto", marginBottom: "48px", position: "relative" }}>
              <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                background: "radial-gradient(ellipse at center, transparent 40%, #0c0a0a 85%)",
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/york-book.png"
                alt="YORK — by York W. Sims Jr."
                className="w-full"
                style={{ boxShadow: "0 20px 80px rgba(230,57,70,0.15), 0 0 120px rgba(0,0,0,0.5)" }}
              />
            </div>
          </ScaleUp>
          <Reveal delay={0.3}>
            <p className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white mb-4">Coming Soon</p>
            <p className="text-sm text-white/30 font-mono italic">&ldquo;I am most dangerous when I am desperate.&rdquo;</p>
          </Reveal>
        </div>
      </section>

      {/* ── CLOSING STATEMENT ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 md:px-16" style={{ zIndex: 1, display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "120px", paddingBottom: "120px" }}>
        <Meteors number={24} />
        {/* Pulsing red ambient glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)" }}
        />

        <div className="relative" style={{ width: "100%", maxWidth: "896px", textAlign: "center" }}>
          <ScaleUp>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#e63946] mb-8">The Moat</p>
          </ScaleUp>

          <div style={{ height: "48px" }} />
          <Reveal delay={0.05}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.0]">
              Nobody else can teach across 10 verticals with real shipped projects in every one.
            </h2>
          </Reveal>
          <div style={{ height: "48px" }} />

          <Reveal delay={0.2}>
            <p className="text-white/25 text-sm font-mono">That&apos;s the moat. Let&apos;s build.</p>
          </Reveal>

          <div style={{ height: "40px" }} />

          <ScaleUp delay={0.3}>
            <div className="flex justify-center">
              <Link href="/#pricing">
                <ShimmerButton
                  shimmerColor="#ff8c94"
                  background="rgba(230,57,70,1)"
                  borderRadius="12px"
                  className="text-xs font-bold uppercase tracking-widest px-12 py-5"
                >
                  Start Building
                </ShimmerButton>
              </Link>
            </div>
          </ScaleUp>

        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ zIndex: 1, background: "#0c0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "64px" }}>
        <motion.div
          style={{ width: "100%", maxWidth: "896px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20px" }}
        >
          <motion.div variants={staggerItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/york-state-logo.png" alt="York State University" style={{ height: "80px", width: "auto" }} />
          </motion.div>
          <motion.p variants={staggerItem} className="text-xs text-white/30 font-mono">
            Teaching Execution, Not Theory {"\u2014"} Built by a Builder, for Builders
          </motion.p>
          <motion.div variants={staggerItem} style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "GitHub", href: "https://github.com/theblockchainbaby", external: true },
              { label: "Platform", href: "/hub", external: false },
              { label: "Blog", href: "/blog", external: false },
              { label: "Contact", href: "/contact", external: false },
              { label: "Privacy", href: "/privacy", external: false },
              { label: "Terms", href: "/terms", external: false },
            ].map((l) => (
              l.external
                ? <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                     className="text-xs text-white/40 hover:text-white transition-colors">{l.label}</a>
                : <Link key={l.label} href={l.href}
                        className="text-xs text-white/40 hover:text-white transition-colors">{l.label}</Link>
            ))}
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}
