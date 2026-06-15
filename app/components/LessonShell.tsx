"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "./Nav";

const ACCENT = "#e63946";

/* ────────────────────────────────────────────────────────────── */
/* PUBLIC PROPS                                                    */
/* ────────────────────────────────────────────────────────────── */

export interface LessonShellProps {
  /** Small kicker text above the title, e.g. "Lesson · Unit 1 · 8 min read". */
  kicker: string;
  /** Main bold portion of the title. */
  titleMain: string;
  /** Greyed-out accent portion of the title. Renders inline after `titleMain`. */
  titleAccent: string;
  /** Hero subtitle / lede. */
  subtitle: string;
  /** Where the "back" link goes, e.g. "/learn/python/unit-1". */
  backHref: string;
  /** Label for the back link, e.g. "Unit 1". */
  backLabel: string;
  /** Lesson body (use the exported Section / P / Code / Inline / SubHeading primitives). */
  children: React.ReactNode;
  /** Optional: footer "next" CTA (typically a quiz link). */
  nextCta?: {
    label: string;
    href: string;
  };
  /** Optional: navigation between adjacent lessons. */
  prevLesson?: { label: string; href: string };
  nextLesson?: { label: string; href: string };
  /**
   * Optional: override the curriculum-source attribution block.
   * Pass `null` to hide it entirely (for tracks with no external source).
   * Defaults to the py4e attribution used by the Python track.
   */
  attribution?: React.ReactNode | null;
  /**
   * Optional: override the footer "Learn" link target.
   * Defaults to /learn/python.
   */
  learnHref?: string;
}

/* ────────────────────────────────────────────────────────────── */
/* SHELL                                                            */
/* ────────────────────────────────────────────────────────────── */

export default function LessonShell({
  kicker,
  titleMain,
  titleAccent,
  subtitle,
  backHref,
  backLabel,
  children,
  nextCta,
  prevLesson,
  nextLesson,
  attribution,
  learnHref = "/learn/python",
}: LessonShellProps) {
  const attributionBlock =
    attribution === undefined ? (
      <>
        <p className="font-mono uppercase tracking-wider text-[10px] text-white/40 mb-2">
          Curriculum source
        </p>
        <p className="text-xs text-white/30 leading-relaxed">
          Lesson content is original to YorkSims. Topic structure aligns with{" "}
          <em>Python for Everybody</em> by Dr. Charles R. Severance (
          <a
            href="https://www.py4e.com/html3/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#e63946]"
          >
            py4e.com
          </a>
          ), licensed under Creative Commons Attribution 3.0 Unported.
        </p>
      </>
    ) : (
      attribution
    );
  return (
    <div className="min-h-screen bg-[#0c0a0a] text-white">
      <Nav />

      {/* HERO */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "100px", paddingBottom: "40px" }}
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
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse, ${ACCENT}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href={backHref}
            className="text-xs font-mono text-white/20 hover:text-white transition-colors"
          >
            ← {backLabel}
          </Link>
          <div style={{ height: "28px" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-5">
            {kicker}
          </p>
          <motion.h1
            className="text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {titleMain}{" "}
            <span className="text-white/30">{titleAccent}</span>
          </motion.h1>
          <motion.p
            className="text-lg text-white/50 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* BODY */}
      <article
        className="px-6 md:px-16"
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
      >
        <div className="max-w-3xl mx-auto">{children}</div>
      </article>

      {/* PREV/NEXT NAVIGATION */}
      {(prevLesson || nextLesson) && (
        <section
          className="px-6 md:px-16 border-t border-white/[0.06]"
          style={{ paddingTop: "32px", paddingBottom: "32px" }}
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            {prevLesson ? (
              <Link
                href={prevLesson.href}
                className="group flex flex-col items-start text-left max-w-[45%]"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                  ← Previous
                </span>
                <span className="text-sm text-white/60 group-hover:text-white transition-colors mt-1">
                  {prevLesson.label}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <Link
                href={nextLesson.href}
                className="group flex flex-col items-end text-right max-w-[45%]"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                  Next →
                </span>
                <span className="text-sm text-white/60 group-hover:text-white transition-colors mt-1">
                  {nextLesson.label}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>
      )}

      {/* NEXT CTA (typically links to the unit quiz) */}
      {nextCta && (
        <section
          className="px-6 md:px-16 border-t border-white/[0.06]"
          style={{ paddingTop: "48px", paddingBottom: "48px" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-4">
              Test what stuck
            </p>
            <Link
              href={nextCta.href}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-[#e63946] text-white hover:bg-[#ff4d5a] transition-all"
            >
              {nextCta.label} →
            </Link>
          </div>
        </section>
      )}

      {/* ATTRIBUTION */}
      {attribution !== null && (
        <section
          className="px-6 md:px-16 border-t border-white/[0.06]"
          style={{ paddingTop: "32px", paddingBottom: "32px" }}
        >
          <div className="max-w-3xl mx-auto">{attributionBlock}</div>
        </section>
      )}

      {/* FOOTER */}
      <footer
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{
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
              { label: "Learn", href: learnHref },
              { label: "Tools", href: "/tools" },
              { label: "Pricing", href: "/pricing" },
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

/* ────────────────────────────────────────────────────────────── */
/* CONTENT PRIMITIVES                                              */
/* ────────────────────────────────────────────────────────────── */

export function Section({
  title,
  children,
}: {
  title: string;
  /** Accepted for backward-compat with existing lesson pages; no longer
   *  rendered — per-section eyebrows read as an AI tic. */
  sectionNumber?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mb-6 leading-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SubHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-lg md:text-xl font-display font-extrabold tracking-tight mb-3 text-white/90 ${className}`}
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] md:text-base text-white/65 leading-relaxed mb-5">
      {children}
    </p>
  );
}

export function Inline({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.92em] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/85">
      {children}
    </code>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mb-6 overflow-x-auto rounded-[14px] border border-white/[0.08] bg-white/[0.02] p-5 text-[13px] leading-relaxed text-white/80 font-mono">
      <code>{children}</code>
    </pre>
  );
}

export function Callout({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "warn";
}) {
  const color = variant === "warn" ? "#e63946" : "#4ade80";
  return (
    <div
      className="mb-6 border-l-2 pl-5 py-3 text-[15px] text-white/65 leading-relaxed"
      style={{ borderColor: color }}
    >
      {children}
    </div>
  );
}
