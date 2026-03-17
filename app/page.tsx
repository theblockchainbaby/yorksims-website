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
import { Marquee } from "./components/magicui/marquee";

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
  { num: "01", title: "Build Software From Zero",           tag: "Next.js · Supabase · Vercel",       href: "/verticals/software" },
  { num: "02", title: "Agentic AI Agents & Automation",      tag: "ElevenLabs · MCP · OpenAI",          href: "/verticals/ai-agents" },
  { num: "03", title: "Hardware & Semiconductor",           tag: "SystemVerilog · RTL · VLSI",          href: "/verticals/hardware" },
  { num: "04", title: "Blockchain & Fintech",               tag: "XRPL · EVM · Solana",                 href: "/verticals/blockchain" },
  { num: "05", title: "Start & Structure a Business",       tag: "LLC · Contracts · Sales",             href: "/verticals/business" },
  { num: "06", title: "Physical Products & Manufacturing",  tag: "CPG · Sourcing · Retail",             href: "/verticals/products" },
  { num: "07", title: "Land & Real Estate Development",     tag: "Raw Land · Permits · Zoning",         href: "/verticals/land" },
  { num: "08", title: "Athlete to Entrepreneur",            tag: "D1 · Discipline · Transition",        href: "/verticals/athlete" },
  { num: "09", title: "Automotive Industry Tech",           tag: "AI Dealership · Otto · Voice",        href: "/verticals/automotive" },
  { num: "10", title: "Creative Tech & AI Production",      tag: "Canvas · fal.ai · Kling 3.0",         href: "/verticals/creative" },
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
        start: "top top",
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

          <h1 ref={headlineRef} className="font-black tracking-tight leading-[0.92] mb-16">
            <span className="hero-line-1 block text-[clamp(52px,8vw,120px)] text-white">
              Stop learning.
            </span>
            <span className="hero-line-2 block text-[clamp(52px,8vw,120px)] text-[#e63946]">
              Start building.
            </span>
          </h1>

          <p ref={taglineRef} className="hero-sub text-lg md:text-xl text-[#555] max-w-2xl leading-relaxed mb-12">
            Competitors tell you <span className="text-white font-semibold">what</span> to do.
            YorkSims teaches you <span className="text-white font-semibold">how</span>.
            Real code. Real contracts. Real hardware. Every course ends with
            something you use today.
          </p>

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
      <div className="relative border-t border-white/[0.04] py-8 overflow-hidden" style={{ zIndex: 1, background: "#0a0a0a" }}>
        <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem]">
          {["Next.js", "Supabase", "Vercel", "ElevenLabs", "OpenAI", "Solana", "XRPL", "SystemVerilog", "MCP", "GSAP", "Three.js", "Framer Motion", "Neon", "Python", "Node.js", "Docker"].map((tech) => (
            <span key={tech} className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-mono whitespace-nowrap px-4">
              {tech}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── PROBLEM / SOLUTION ────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.08] py-52 flex justify-center" style={{ zIndex: 1, background: "#0a0a0a" }}>
        <div className="w-full max-w-5xl mx-auto px-8 md:px-16 text-center">

          {/* Headline block */}
          <div className="mb-20">
            <div style={{ height: "50px" }} />
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#e63946]">The Difference</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-[clamp(40px,5.5vw,72px)] leading-[0.96] font-semibold tracking-tight max-w-4xl mx-auto" style={{ paddingLeft: "24px" }}>
                The education space is full of talkers.
              </h2>
              <div style={{ height: "25px" }} />
              <p className="text-[17px] leading-7 text-white/40 max-w-2xl mx-auto">
                Not theory. Not commentary. Real shipped work across software, AI, hardware, blockchain, business, and physical products.
              </p>
              <div style={{ height: "25px" }} />
            </Reveal>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-2 gap-5 mb-6">
            <SlideFrom dir="left" delay={0.05}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/20 px-2">Every other platform</p>
            </SlideFrom>
            <SlideFrom dir="right" delay={0.05}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#e63946] px-2">YorkSims.com</p>
            </SlideFrom>
          </div>

          {/* Individual comparison rows */}
          {[
            {
              bad: "Interviews about what successful people did",
              good: "Here's how I built it — and here's the code",
            },
            {
              bad: "Surface-level business concepts & motivation",
              good: "Deep technical: build a SaaS, design a chip, structure a deal",
            },
            {
              bad: "Podcast episodes, webinars, community talks",
              good: "Templates, codebases, contracts, SOPs you use TODAY",
            },
            {
              bad: "Finish knowing what an LLC is",
              good: "Finish having formed the LLC — op agreement in hand",
            },
            {
              bad: "Leave inspired — still stuck",
              good: "Leave with a deployed SaaS on Vercel",
            },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-5 mb-4">
              <SlideFrom dir="left" delay={0.08 + i * 0.07}>
                <div className="rounded-[20px] bg-white/[0.02] ring-1 ring-white/[0.05] px-6 py-5 flex gap-4 items-start">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/15 shrink-0" />
                  <span className="text-[14px] leading-relaxed text-white/30">{row.bad}</span>
                </div>
              </SlideFrom>
              <SlideFrom dir="right" delay={0.08 + i * 0.07}>
                <motion.div
                  className="rounded-[20px] ring-1 ring-white/[0.08] px-6 py-5 flex gap-4 items-start"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: "0 0 40px rgba(230,57,70,0.05)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(230,57,70,0.12)" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#e63946] shrink-0" />
                  <span className="text-[14px] leading-relaxed text-white/80">{row.good}</span>
                </motion.div>
              </SlideFrom>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10 VERTICALS — HORIZONTAL SCROLL ─────────────────────────────── */}
      <section
        ref={horizontalRef}
        className="relative overflow-hidden py-0"
        style={{ zIndex: 1, background: "#0a0a0a" }}
      >
        <div className="border-t border-white/[0.08] py-48 px-8 md:px-16 max-w-6xl mx-auto lg:px-16 lg:max-w-none">
          <div className="max-w-6xl mx-auto mb-20">
            <div style={{ height: "96px" }} />
            <FlipIn>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#e63946] mb-5">10 Verticals</p>
            </FlipIn>
            <div style={{ height: "32px" }} />
            <h2 className="text-[clamp(36px,5vw,72px)] leading-[0.96] font-semibold tracking-tight max-w-3xl mb-5">
              <WordReveal text="More breadth than any single competitor. Every one with receipts." delay={0.05} />
            </h2>
            <Reveal delay={0.2}>
              <p className="text-[17px] leading-7 text-white/40 max-w-xl">
                Software. AI. Hardware. Blockchain. Business. Products. Land. Athletics. Automotive. Creative Tech.
              </p>
            </Reveal>
          </div>

          {/* Desktop: horizontal scroll track */}
          <div className="hidden lg:block overflow-hidden">
            <div ref={trackRef} className="flex gap-4 px-8 md:px-16 w-max pb-4">
              {VERTICALS.map((v, i) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                >
                  <Link href={v.href}>
                    <MagicCard className="w-[300px] rounded-[28px] p-8 cursor-pointer h-52 flex flex-col justify-between bg-[#0a0a0a]">
                      <div>
                        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/20 block mb-5">{v.num}</span>
                        <p className="text-[20px] leading-[1.15] font-semibold text-white">{v.title}</p>
                      </div>
                      <span className="text-[11px] tracking-[0.08em] uppercase text-white/25">{v.tag}</span>
                    </MagicCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile grid */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VERTICALS.map((v, i) => (
              <FlipIn key={v.num} delay={i * 0.05}>
                <Link href={v.href}>
                  <MagicCard className="rounded-[28px] p-8 bg-[#0a0a0a]">
                    <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/20 block mb-4">{v.num}</span>
                    <p className="text-[18px] leading-[1.2] font-semibold text-white mb-6">{v.title}</p>
                    <span className="text-[11px] tracking-[0.08em] uppercase text-white/25">{v.tag}</span>
                  </MagicCard>
                </Link>
              </FlipIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section className="relative py-52 px-8 md:px-16 border-t border-white/[0.08]" style={{ zIndex: 1, background: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <FlipIn>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#e63946] mb-8">Built by a Builder</p>
            </FlipIn>
            <SlideFrom dir="left" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-8">
                <WordReveal text="Not a course creator who read a book." />
              </h2>
            </SlideFrom>
            <SlideFrom dir="left" delay={0.15}>
              <p className="text-sm text-[#555] leading-relaxed mb-4">
                D1 college basketball → professional basketball in Ankara, Turkey →
                CEO of Caipher AI LLC. 15 public GitHub repositories spanning SaaS,
                AI voice agents, semiconductor design, blockchain gaming, and
                automotive AI.
              </p>
            </SlideFrom>
            <SlideFrom dir="left" delay={0.25}>
              <p className="text-sm text-[#555] leading-relaxed mb-8">
                Cannabis farms. Raw land developed from scratch. Physical products
                on retail shelves. Every course comes with the receipts.
              </p>
              <a
                href="https://github.com/theblockchainbaby"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#e63946] hover:text-white transition-colors group"
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
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Full-Stack SaaS",     sub: "VitrOS — Next.js + Supabase" },
              { label: "AI Voice Agents",      sub: "Otto + MoltBot + YorkAi" },
              { label: "Semiconductor RTL",    sub: "HBM memory in SystemVerilog" },
              { label: "Web3 / Blockchain",    sub: "DualPay · ChainPlay · XRPL" },
              { label: "Cannabis Industry",    sub: "Farm to distribution" },
              { label: "Land Development",     sub: "Raw land → built from scratch" },
            ].map((item, i) => (
              <FlipIn key={item.label} delay={0.1 + i * 0.08}>
                <MagicCard className="rounded-[16px] p-4 cursor-default bg-[#0a0a0a]">
                  <p className="text-xs font-semibold text-white mb-1">{item.label}</p>
                  <p className="text-[10px] text-white/25 font-mono">{item.sub}</p>
                </MagicCard>
              </FlipIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section id="pricing" className="relative py-44 px-8 md:px-16 border-t border-white/[0.08]" style={{ zIndex: 1, background: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto">
          <FlipIn>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#e63946] mb-6">Pricing</p>
          </FlipIn>
          <div style={{ height: "24px" }} />
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16">
            <WordReveal text="Pick your level. Start building." delay={0.1} />
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <MagicCard
                  className={`h-full rounded-xl p-6 flex flex-col ${plan.accent ? "bg-[#0f0f0f]" : "bg-[#0a0a0a]"}`}
                  gradientFrom={plan.accent ? "#e63946" : "#333"}
                  gradientTo={plan.accent ? "#6b0a10" : "#111"}
                  gradientColor={plan.accent ? "#1a0608" : "#111"}
                >
                  {plan.accent && <BorderBeam colorFrom="#e63946" colorTo="#ff8c94" duration={4} />}
                  {plan.accent && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#e63946] mb-3 block">
                      Most Popular
                    </span>
                  )}
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-widest text-[#444] font-mono mb-2">{plan.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black">{plan.price}</span>
                      {plan.per && <span className="text-sm text-[#444]">{plan.per}</span>}
                    </div>
                    <p className="text-xs text-[#444] mt-1">{plan.desc}</p>
                  </div>
                  <motion.ul
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-2.5 mb-8 flex-1"
                  >
                    {plan.features.map((f) => (
                      <motion.li key={f} variants={staggerItem} className="flex gap-2 text-xs text-[#777] items-start">
                        <span className="text-[#e63946] shrink-0 mt-px">→</span>
                        {f}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <Link
                    href={plan.href}
                    className={`text-xs font-bold uppercase tracking-widest py-3 text-center rounded-lg transition-all block ${
                      plan.accent
                        ? "bg-[#e63946] text-white hover:bg-[#ff4d5a]"
                        : "border border-[#222] text-white hover:border-[#444]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING STATEMENT ─────────────────────────────────────────────── */}
      <section className="relative py-52 px-8 md:px-16 border-t border-white/[0.08] overflow-hidden" style={{ zIndex: 1, background: "#0a0a0a" }}>
        <Meteors number={24} />
        {/* Pulsing red ambient glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <ScaleUp>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#e63946] mb-8">The Moat</p>
          </ScaleUp>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] mb-10">
            <WordReveal
              text="Nobody else can teach across 10 verticals with real shipped projects in every one."
              delay={0.05}
            />
          </h2>

          <Reveal delay={0.3}>
            <p className="text-white/25 text-sm mb-12 font-mono">That&apos;s the moat. Let&apos;s build.</p>
          </Reveal>

          <ScaleUp delay={0.4}>
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
          </ScaleUp>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="relative border-t border-white/[0.08] py-16 px-8 md:px-16" style={{ zIndex: 1, background: "#0a0a0a" }}>
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20px" }}
        >
          <motion.span variants={staggerItem} className="text-sm font-black tracking-widest uppercase">
            York<span className="text-[#e63946]">Sims</span>.com
          </motion.span>
          <motion.p variants={staggerItem} className="text-xs text-[#2a2a2a] font-mono">
            Teaching Execution, Not Theory — Built by a Builder, for Builders
          </motion.p>
          <motion.div variants={staggerItem} className="flex gap-6">
            {[
              { label: "GitHub", href: "https://github.com/theblockchainbaby", external: true },
              { label: "Platform", href: "/hub", external: false },
              { label: "Blog", href: "/blog", external: false },
              { label: "Contact", href: "/contact", external: false },
            ].map((l) => (
              l.external
                ? <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                     className="text-xs text-[#333] hover:text-white transition-colors">{l.label}</a>
                : <Link key={l.label} href={l.href}
                        className="text-xs text-[#333] hover:text-white transition-colors">{l.label}</Link>
            ))}
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}
