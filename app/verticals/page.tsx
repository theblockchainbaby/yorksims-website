"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Nav from "../components/Nav";

const VERTICALS = [
  {
    num: "01", title: "Build Software From Zero", tag: "Next.js · Supabase · Vercel",
    desc: "SaaS, full-stack, multi-tenant, deploy to production. VitrOS as the live case study.",
    href: "/verticals/software",
    proofs: ["/proofs/software-1.webp", "/proofs/software-2.webp", "/proofs/software-3.webp"],
    proofFit: ["object-left object-cover", "object-left object-cover", "object-left object-cover"],
  },
  {
    num: "02", title: "Agentic AI Agents & Automation", tag: "ElevenLabs · MCP · OpenAI",
    desc: "Voice agents, autonomous bots, n8n workflows, white-label AI SaaS.",
    href: "/verticals/ai-agents",
    proofs: ["/proofs/ai-1.webp", "/proofs/ai-2.webp", "/proofs/ai-3.webp"],
    proofFit: ["object-left-top object-cover", "object-left object-cover", "object-center-bottom object-cover"],
  },
  {
    num: "03", title: "Hardware & Semiconductor", tag: "SystemVerilog · RTL · VLSI",
    desc: "RTL design, HBM memory, verification, reliability simulation.",
    href: "/verticals/hardware",
    proofs: ["/proofs/hardware-1.webp", "/proofs/hardware-2.webp", "/proofs/hardware-3.webp"],
    proofFit: ["object-center object-cover", "object-left-top object-cover", "object-left-top object-cover"],
  },
  {
    num: "04", title: "Blockchain & Fintech", tag: "XRPL · EVM · Solana · Bitcoin",
    desc: "XRP Ledger, crypto/fiat, Web3 gaming, multi-chain wallet integration.",
    href: "/verticals/blockchain",
    proofs: ["/proofs/blockchain-1.webp", "/proofs/blockchain-2.webp", "/proofs/blockchain-3.webp"],
    proofFit: ["object-top object-cover", "object-center object-cover", "object-center object-cover"],
  },
  {
    num: "05", title: "Start & Structure a Business", tag: "LLC · Contracts · Sales",
    desc: "LLC formation, contracts, pricing, sales pipelines, exits.",
    href: "/verticals/business",
    proofs: ["/proofs/business-1.webp", "/proofs/business-2.webp", "/proofs/business-3.webp"],
    proofFit: ["object-top object-cover", "object-top object-cover", "object-center object-cover"],
  },
  {
    num: "06", title: "Physical Products & Manufacturing", tag: "CPG · Sourcing · Retail",
    desc: "Idea to shelf, global sourcing, retail distribution, brand building.",
    href: "/verticals/products",
    proofs: ["/proofs/mfg-a.webp", "/proofs/mfg-b.webp", "/proofs/mfg-c.webp"],
    proofFit: ["object-center object-cover", "object-center object-cover", "object-top object-cover"],
  },
  {
    num: "07", title: "Land & Real Estate Development", tag: "Raw Land · Permits · Zoning",
    desc: "Raw land acquisition, permits, well/septic/power from scratch.",
    href: "/verticals/land",
    proofs: ["/proofs/land-1.webp", "/proofs/land-2.webp", "/proofs/land-3.webp"],
    proofFit: ["object-center object-cover", "object-center object-cover", "object-top object-cover"],
  },
  {
    num: "08", title: "Athlete to Entrepreneur", tag: "D1 · Discipline · Transition",
    desc: "D1 → pro → builder: discipline, transition, brand building.",
    href: "/verticals/athlete",
    proofs: ["/proofs/athlete-1.webp", "/proofs/athlete-2.webp", "/proofs/athlete-3.webp"],
    proofFit: ["object-[50%_0%] object-cover", "object-center object-cover", "object-top object-cover"],
  },
  {
    num: "09", title: "Vertical SaaS & Voice Agents", tag: "Voice · Vertical SaaS · White-Label",
    desc: "Voice AI agents, white-label SaaS, vertical industry automation.",
    href: "/verticals/automotive",
    proofs: ["/proofs/creative-1.webp", "/proofs/creative-2.webp", "/proofs/creative-3.webp"],
    proofFit: ["object-left-top object-cover", "object-top object-cover", "object-left-top object-cover"],
  },
  {
    num: "10", title: "Creative Tech & AI Production", tag: "Canvas · fal.ai · Kling 3.0",
    desc: "Scroll animations, AI video pipelines, Apple-level product launch pages.",
    href: "/verticals/creative",
    proofs: ["/proofs/saas-a.webp", "/proofs/saas-b.webp", "/proofs/saas-c.webp"],
    proofFit: ["object-left-top object-cover", "object-top object-cover", "object-right-top object-cover"],
  },
];

function VerticalRow({ v, index }: { v: typeof VERTICALS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      className="group relative"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.04) 0%, transparent 70%)" }}
      />

      <Link href={v.href} className="block">
        <div
          className="relative border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
          style={{ borderRadius: "40px", padding: "56px 64px" }}
        >
          {/* Animated red line on hover */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#e63946] origin-top"
            initial={{ scaleY: 0 }}
            whileHover={{ scaleY: 1 }}
            style={{ borderRadius: "2px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className={`flex items-center gap-16 ${isEven ? "" : "flex-row-reverse"}`}>
            {/* Text side */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-5 mb-5">
                <motion.span
                  className="text-[80px] font-black leading-none text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500 select-none tabular-nums"
                  style={{ y }}
                >
                  {v.num}
                </motion.span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-1">{v.tag}</p>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-white transition-colors">
                    {v.title}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-white/30 leading-relaxed max-w-md mb-8">{v.desc}</p>
              <motion.div
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-[#e63946] transition-colors duration-300"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Explore Vertical
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >→</motion.span>
              </motion.div>
            </div>

            {/* Images side */}
            <motion.div
              className="flex gap-3 shrink-0"
              initial={{ opacity: 0, x: isEven ? 40 : -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {v.proofs.map((src, j) => {
                const fit = v.proofFit[j] || "object-cover";
                const scaleMatch = fit.match(/scale-\[([^\]]+)\]/);
                const scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
                const fitClasses = fit.replace(/scale-\[[^\]]+\]/, "").trim();
                return (
                  <motion.div
                    key={j}
                    className="relative overflow-hidden border border-white/[0.06]"
                    style={{
                      width: j === 1 ? "130px" : "110px",
                      height: j === 1 ? "170px" : "145px",
                      borderRadius: "16px",
                      translateY: j === 1 ? -12 : j === 2 ? 8 : 0,
                    }}
                    whileHover={{ scale: 1.04, borderColor: "rgba(230,57,70,0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={src}
                      fill
                      alt=""
                      className={`w-full h-full ${fitClasses}`}
                      style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function VerticalsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center text-center overflow-hidden" style={{ minHeight: "60vh", padding: "90px 64px 80px" }}>
        {/* Animated background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Red ambient glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)" }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 flex flex-col items-center text-center w-full">
          <motion.p
            className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            10 Verticals
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95]"
            style={{ marginTop: "48px", marginBottom: "48px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Every Industry.
            <br />
            <span className="text-white/20">One Builder.</span>
          </motion.h1>
          <motion.p
            className="text-sm text-white/30 max-w-lg mx-auto leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            Real shipped projects across software, hardware, blockchain, real estate, manufacturing, and more. No theory. All execution.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-transparent to-white/20"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── VERTICAL LIST ── */}
      <section style={{ padding: "40px 64px 160px", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="flex flex-col gap-4">
          {VERTICALS.map((v, i) => (
            <VerticalRow key={v.num} v={v} index={i} />
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative flex flex-col items-center text-center border-t border-white/[0.06]" style={{ padding: "120px 64px" }}>
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.07) 0%, transparent 70%)" }}
        />
        <motion.p
          className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Ready to Build
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl font-black tracking-tight mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.06 }}
        >
          Pick a vertical. Ship something real.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <Link
            href="/#pricing"
            className="inline-block text-sm font-bold uppercase tracking-widest px-12 py-5 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)] hover:shadow-[0_0_50px_rgba(230,57,70,0.5)]"
          >
            Join Now
          </Link>
        </motion.div>
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
              { label: "Hub", href: "/hub" },
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
