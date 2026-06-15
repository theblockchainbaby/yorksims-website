"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";
import { TOOLS } from "../lib/tools";

const ACCENT = "#e63946";

function ToolCard({
  tool,
  index,
}: {
  tool: (typeof TOOLS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const accent = ACCENT;
  const isShipped = tool.status === "shipped";

  const body = (
    <div
      className="relative border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden h-full"
      style={{ borderRadius: "24px", padding: "36px 40px" }}
    >
      {isShipped && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: accent }}
        />
      )}
      <div className="flex items-start justify-between gap-6 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {tool.vertical}
          </span>
          <span className="text-white/10">·</span>
          <span
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: isShipped ? "#4ade80" : "#666" }}
          >
            {isShipped ? "Live" : "Coming Soon"}
          </span>
        </div>
      </div>
      <h3 className="text-xl font-display font-extrabold tracking-tight mb-3 leading-snug">
        {tool.title}
      </h3>
      <p className="text-sm text-white/35 leading-relaxed">
        {tool.description}
      </p>
      {isShipped && (
        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white/70 group-hover:text-[#e63946] transition-colors">
          Try it free <span>→</span>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
    >
      {isShipped ? (
        <Link href={`/tools/${tool.slug}`} className="block group h-full">
          {body}
        </Link>
      ) : (
        <div className="block group h-full opacity-60">{body}</div>
      )}
    </motion.div>
  );
}

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen bg-[#0c0a0a] text-white">
      <Nav />

      {/* Hero */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "120px", paddingBottom: "60px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse, rgba(230,57,70,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.p
            className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Free Builder Tools
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[0.95]"
            style={{ marginBottom: "24px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Free tools. <span className="text-white/20">No signup wall.</span>
          </motion.h1>
          <motion.p
            className="text-sm text-white/30 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            One free tool per vertical. No fluff. No tutorial. Use it, export
            the output, get back to building.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section
        className="px-6 md:px-16"
        style={{
          paddingTop: "40px",
          paddingBottom: "140px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="grid md:grid-cols-2 gap-5">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
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
              { label: "Blog", href: "/blog" },
              { label: "Verticals", href: "/verticals" },
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
