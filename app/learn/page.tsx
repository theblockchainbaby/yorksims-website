"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../components/Nav";

const ACCENT = "#e63946";

interface Track {
  name: string;
  href: string;
  blurb: string;
  level: string;
  unitCount: number;
  lessonCount: number;
  quizCount: number;
  units: string[];
  status: "live" | "coming-soon";
}

const TRACKS: Track[] = [
  {
    name: "Python",
    href: "/learn/python",
    blurb:
      "From zero Python to writing your own classes. Variables and types through to OOP, modules, and file I/O. Each unit ends with a 20-question quiz that scores you and tells you what to work on next.",
    level: "Beginner → Intermediate",
    unitCount: 3,
    lessonCount: 21,
    quizCount: 3,
    units: [
      "Unit 1 — Fundamentals (types, operators, strings, conditionals, functions, exceptions)",
      "Unit 2 — Data & Control Flow (lists, dicts, sets, loops, function args)",
      "Unit 3 — Classes, Modules & Files (OOP, inheritance, scope, imports, I/O)",
    ],
    status: "live",
  },
  {
    name: "Web Development",
    href: "/learn/web",
    blurb:
      "From how the internet actually works to JavaScript talking to a database. Internet history, TCP/IP, HTTP, HTML, CSS, JS, async, server-side, databases, and the security mistakes you can't ship.",
    level: "Beginner → Intermediate",
    unitCount: 3,
    lessonCount: 21,
    quizCount: 3,
    units: [
      "Unit 1 — Web Foundations (internet history, TCP/IP, DNS, servers, design, workflow)",
      "Unit 2 — Document Markup (HTML, links, forms, CSS selectors, box model, a11y)",
      "Unit 3 — Scripting & Storage (JS, DOM, async, server-side, storage, DBs, security)",
    ],
    status: "live",
  },
];

export default function LearnIndexPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* HERO */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "100px", paddingBottom: "60px" }}
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
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] pointer-events-none"
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse, ${ACCENT}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-xs font-mono text-white/20 hover:text-white transition-colors"
          >
            ← Home
          </Link>
          <div style={{ height: "28px" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-5">
            Free Learning Paths
          </p>
          <motion.h1
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Stop reading.
            <br />
            <span className="text-white/30">Start building.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-white/50 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Two complete three-unit paths. 42 original lessons. 6 free
            quizzes. No video padding, no signup wall, no certificate
            designed to be framed. Pick a track and go.
          </motion.p>
        </div>
      </section>

      {/* TRACK CARDS */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "60px", paddingBottom: "80px" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {TRACKS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              className="border border-white/[0.08] rounded-[24px] p-8 md:p-10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#e63946] mb-3">
                    {t.level} · {t.lessonCount} lessons · {t.quizCount}{" "}
                    quizzes
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                    {t.name}
                  </h3>
                  <p className="text-white/55 leading-relaxed max-w-2xl">
                    {t.blurb}
                  </p>
                </div>
                <span
                  className="text-7xl font-black text-white/[0.06] leading-none flex-shrink-0"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </div>

              {/* Units */}
              <div className="mt-4 mb-8 flex flex-col gap-2">
                {t.units.map((unit) => (
                  <div
                    key={unit}
                    className="flex items-start gap-3 text-sm text-white/55"
                  >
                    <span
                      className="mt-[8px] w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span>{unit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  href={t.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-[#e63946] text-white hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_20px_rgba(230,57,70,0.3)]"
                >
                  Start the {t.name} path →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-10 bg-[#e63946]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold">
              How YorkSims teaches
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
            Practical, terse, free.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                01 · No filler
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                Every lesson is 7-10 minutes. Skim it once, work the example,
                move on. Lessons are written, not videoed — search and reread
                are 10× faster.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                02 · Honest scoring
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                Quizzes return a per-topic breakdown so you know exactly which
                lesson to revisit. No participation trophies and no fluff
                badges.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                03 · Built to move on
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                Score 85%+ on a unit&rsquo;s quiz and we tell you to stop
                quizzing and go build. The point is to get you out of tutorial
                mode.
              </p>
            </div>
          </div>
        </div>
      </section>

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
              { label: "Tools", href: "/tools" },
              { label: "Verticals", href: "/verticals" },
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
