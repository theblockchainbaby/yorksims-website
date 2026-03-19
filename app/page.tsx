"use client";

import { useEffect, useRef } from "react";
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
    proofs: ["/proofs/manufacturing-1.webp", "/proofs/manufacturing-2.webp", "/proofs/manufacturing-grid.webp"],
    proofFit: ["object-center object-cover", "object-center object-cover", "object-top object-cover"] },
  { num: "07", title: "Land & Real Estate Development",     tag: "Raw Land · Permits · Zoning",         href: "/verticals/land",
    proofs: ["/proofs/land-1.webp", "/proofs/land-2.webp", "/proofs/land-3.webp"],
    proofFit: ["object-center object-cover", "object-center object-cover", "object-top object-cover"] },
  { num: "08", title: "Athlete to Entrepreneur",            tag: "D1 · Discipline · Transition",        href: "/verticals/athlete",
    proofs: ["/proofs/athlete-1.webp", "/proofs/athlete-2.webp", "/proofs/athlete-3.webp"],
    proofFit: ["object-[50%_0%] object-cover", "object-center object-cover", "object-top object-cover"] },
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
    desc: "Sample before you build.",
    features: ["1 free module per vertical", "Weekly build newsletter", "YouTube channel access", "Free blog breakdowns"],
    cta: "Start Free",
    href: "/hub",
    accent: false,
  },
  {
    name: "Pro",
    price: "$29",
    per: "/mo",
    desc: "Full platform access.",
    features: ["All courses across 10 verticals", "Templates, contracts & SOPs", "Monthly live Q&A with York", "Private community", "Weekly new content"],
    cta: "Join Pro",
    href: "/contact",
    accent: true,
  },
  {
    name: "Builder",
    price: "$99",
    per: "/mo",
    desc: "Watch it happen live.",
    features: ["Everything in Pro", "Live build sessions", "Full code repos & starters", "Small group coaching (20 max)", "Priority tool access"],
    cta: "Join Builder",
    href: "/contact",
    accent: false,
  },
  {
    name: "1-on-1",
    price: "$500",
    per: "/hr",
    desc: "Direct access. Limited.",
    features: ["SaaS & AI consulting", "Business structure review", "Go-to-market strategy", "Hardware guidance", "Limited to 5 hrs/week"],
    cta: "Book Session",
    href: "/contact",
    accent: false,
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

export default function Home() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // GSAP hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-label",    { y: 20, opacity: 0, duration: 0.7 })
        .from(".hero-line-1",   { y: 60, opacity: 0, duration: 0.9 }, "-=0.3")
        .from(".hero-line-2",   { y: 60, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-sub",      { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-ctas > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.4")
        .from(".scroll-hint",   { opacity: 0, duration: 0.8 }, "-=0.2");
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
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Three.js background — fixed, only in hero viewport */}
      <div className="fixed inset-0 h-screen pointer-events-none" style={{ zIndex: 0 }}>
        <HeroScene />
        {/* Radial vignette to fade edges */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #0a0a0a 100%)" }}
        />
      </div>

      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 text-center overflow-hidden" style={{ zIndex: 1 }}>
        <Meteors number={18} />

        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          <p className="hero-label text-sm md:text-base font-mono uppercase tracking-[0.2em] text-[#e63946] mb-16">
            Teaching Execution, Not Theory — Built by a Builder, for Builders
          </p>

          <div style={{ height: "48px" }} />
          <h1 ref={headlineRef} className="font-black tracking-tight leading-[0.92]">
            <span className="hero-line-1 block text-[clamp(52px,8vw,120px)] text-white">
              Stop learning.
            </span>
            <span className="hero-line-2 block text-[clamp(52px,8vw,120px)] text-[#e63946]">
              Start building.
            </span>
          </h1>
          <div style={{ height: "48px" }} />

          <p ref={taglineRef} className="hero-sub text-lg md:text-xl text-[#555] max-w-2xl leading-relaxed">
            Competitors tell you <span className="text-white font-semibold">what</span> to do.
            York teaches you <span className="text-white font-semibold">how</span>.
            Real code. Real contracts. Real hardware. Every course ends with
            something you use today.
          </p>
          <div style={{ height: "40px" }} />

          <div className="hero-ctas flex justify-center">
            <Link href="/hub">
              <ShimmerButton
                shimmerColor="#ff8c94"
                background="rgba(230,57,70,1)"
                borderRadius="10px"
                className="text-xs font-bold uppercase tracking-widest"
              >
                Explore Platform
              </ShimmerButton>
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div ref={scrollHintRef} className="scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-transparent to-[#e63946]"
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#333]">Scroll</span>
        </div>
      </section>

      {/* ── PROOF COUNTERS ────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.08] py-40 px-8 md:px-16" style={{ zIndex: 1, background: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {PROOF.map((p, i) => (
            <ScaleUp key={p.label} delay={i * 0.1}>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-5xl font-black text-[#e63946] mb-2 tabular-nums">
                  <Counter value={p.value} suffix={p.suffix} format={p.format} />
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/25 font-mono">{p.label}</div>
              </motion.div>
            </ScaleUp>
          ))}
        </div>
      </section>

      {/* ── TECH MARQUEE ──────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/[0.04] py-6 overflow-hidden" style={{ zIndex: 1, background: "#0a0a0a" }}>
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
      <section style={{ zIndex: 1, background: "#0a0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "208px 64px" }}>
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
          <div className="grid grid-cols-2 gap-6 mb-8">
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
            <div key={i} className="grid grid-cols-2 gap-6 mb-5">
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
        <div style={{ display: "flex", justifyContent: "center", padding: "0 64px", marginBottom: "12px" }}>
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
        <div className="lg:hidden" style={{ display: "flex", justifyContent: "center", padding: "0 40px 192px" }}>
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
                      <div className="w-full h-full rounded-[23px] bg-[#0a0a0a]" />
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
      <section style={{ zIndex: 1, background: "#0a0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "208px 64px" }}>
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <FlipIn>
            <p className="text-[14px] uppercase tracking-[0.24em] text-[#e63946] mb-8 font-semibold">Built by a Builder</p>
          </FlipIn>
          <div style={{ height: "40px" }} />
          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Not a course creator who read a book.
            </h2>
          </Reveal>
          <div style={{ height: "40px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <div>
              <SlideFrom dir="left" delay={0.15}>
                <p className="text-base text-[#555] leading-relaxed mb-6">
                  D1 college basketball → professional basketball in Ankara, Turkey →
                  CEO of Caipher AI LLC. 15 public GitHub repositories spanning SaaS,
                  AI voice agents, semiconductor design, blockchain gaming, and
                  automotive AI.
                </p>
              </SlideFrom>
              <SlideFrom dir="left" delay={0.25}>
                <p className="text-base text-[#555] leading-relaxed mb-8">
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { label: "Full-Stack SaaS",     sub: "VitrOS \u2014 Next.js + Supabase" },
              { label: "Agentic AI Agents",   sub: "Otto + MoltBot + YorkAi" },
              { label: "Semiconductor RTL",    sub: "HBM memory in SystemVerilog" },
              { label: "Web3 / Blockchain",    sub: "DualPay \u00b7 ChainPlay \u00b7 XRPL" },
              { label: "Cannabis Industry",    sub: "Farm to distribution" },
              { label: "Land Development",     sub: "Raw land \u2192 built from scratch" },
            ].map((item, i) => (
              <FlipIn key={item.label} delay={0.1 + i * 0.08}>
                <MagicCard className="rounded-[16px] p-6 cursor-default bg-[#0a0a0a]">
                  <p className="text-sm font-semibold text-white mb-2">{item.label}</p>
                  <p className="text-xs text-white/25 font-mono">{item.sub}</p>
                </MagicCard>
              </FlipIn>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK ─────────────────────────────────────────────────────────── */}
      <section style={{ zIndex: 1, background: "#0a0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "160px 64px" }}>
        <div style={{ width: "100%", maxWidth: "896px", textAlign: "center" }}>
          <FlipIn>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#e63946] mb-6">The Book</p>
          </FlipIn>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">YORK</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[17px] text-white/40 mb-12">by York W. Sims Jr.</p>
          </Reveal>
          <ScaleUp delay={0.2}>
            <div style={{ maxWidth: "550px", margin: "0 auto", marginBottom: "48px", position: "relative" }}>
              <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                background: "radial-gradient(ellipse at center, transparent 40%, #0a0a0a 85%)",
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
            <p className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4">Coming Soon</p>
            <p className="text-sm text-white/30 font-mono italic">&ldquo;I am most dangerous when I am desperate.&rdquo;</p>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ zIndex: 1, background: "#0a0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "176px 64px" }}>
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <FlipIn>
            <p className="text-[14px] uppercase tracking-[0.24em] text-[#e63946] mb-6 font-semibold text-center">Pricing</p>
          </FlipIn>
          <div style={{ height: "24px" }} />
          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-16 text-center">
              Pick your level. Start building.
            </h2>
          </Reveal>

          <div style={{ height: "40px" }} />

          <div className="flex items-stretch justify-center gap-5">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group"
                style={{ width: "265px" }}
              >
                <div
                  className={`relative h-full flex flex-col backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
                    plan.accent
                      ? "bg-[#e63946]/[0.06] border-[#e63946]/20 group-hover:border-[#e63946]/50 group-hover:shadow-[0_0_60px_-12px_rgba(230,57,70,0.3)]"
                      : "bg-white/[0.02] border-white/[0.06] group-hover:border-white/[0.12] group-hover:shadow-[0_0_60px_-12px_rgba(255,255,255,0.06)]"
                  }`}
                  style={{ borderRadius: "32px", padding: "48px 28px 32px" }}
                >
                  {plan.accent && <BorderBeam colorFrom="#e63946" colorTo="#ff8c94" duration={4} />}
                  {plan.accent && (
                    <span className="absolute top-4 left-7 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#e63946] bg-[#e63946]/10 px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e63946] animate-pulse" />
                      Most Popular
                    </span>
                  )}
                  <div className="mb-7">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/25 font-medium mb-4">{plan.name}</p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                      {plan.per && <span className="text-sm text-white/20 font-medium">{plan.per}</span>}
                    </div>
                    <p className="text-[13px] text-white/30 mt-3 leading-relaxed">{plan.desc}</p>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-7" />
                  <motion.ul
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-3.5 mb-9 flex-1"
                  >
                    {plan.features.map((f) => (
                      <motion.li key={f} variants={staggerItem} className="flex gap-3 text-[13px] text-white/40 items-start">
                        <span className={`shrink-0 mt-0.5 text-xs ${plan.accent ? "text-[#e63946]" : "text-white/20"}`}>{"\u2192"}</span>
                        {f}
                      </motion.li>
                    ))}
                  </motion.ul>
                  {plan.accent ? (
                    <Link href={plan.href} className="block">
                      <motion.div
                        className="relative text-sm font-bold uppercase tracking-widest py-4 text-center bg-[#e63946] text-white overflow-hidden"
                        style={{ borderRadius: "100px" }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(230,57,70,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                        />
                        <span className="relative z-10">{plan.cta}</span>
                      </motion.div>
                    </Link>
                  ) : (
                    <Link href={plan.href} className="block">
                      <motion.div
                        className="relative text-sm font-bold uppercase tracking-widest py-4 text-center border border-white/10 text-white/60 overflow-hidden hover:text-white hover:border-white/25 transition-colors"
                        style={{ borderRadius: "100px" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {plan.cta}
                      </motion.div>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING STATEMENT ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ zIndex: 1, display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "208px 64px" }}>
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
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0]">
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
      <footer style={{ zIndex: 1, background: "#0a0a0a", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "64px" }}>
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
