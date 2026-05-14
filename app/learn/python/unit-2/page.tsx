"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../../../components/Nav";

const ACCENT = "#e63946";

interface Lesson {
  number: string;
  slug: string;
  title: string;
  blurb: string;
  minutes: number;
}

const LESSONS: Lesson[] = [
  {
    number: "01",
    slug: "intro-to-lists",
    title: "Intro to lists",
    blurb:
      "Python's workhorse data structure. Creating, reading, slicing, mutability, and the three mistakes every beginner makes.",
    minutes: 10,
  },
  {
    number: "02",
    slug: "list-methods",
    title: "List methods & slicing",
    blurb:
      "append, extend, insert, remove, pop, sort. sorted vs sort. Slicing with step, slice assignment, and the reference-vs-copy trap.",
    minutes: 9,
  },
  {
    number: "03",
    slug: "collections",
    title: "Sets, tuples & dictionaries",
    blurb:
      "Lists aren't the only shape data takes. Dicts for key/value lookups, sets for uniqueness and fast membership, tuples for fixed groupings.",
    minutes: 10,
  },
  {
    number: "04",
    slug: "while-loops",
    title: "While loops",
    blurb:
      "Indefinite iteration: retry loops, polling, input validation. When to choose while over for, and how to avoid infinite loops.",
    minutes: 8,
  },
  {
    number: "05",
    slug: "for-loops",
    title: "For loops & range",
    blurb:
      "The workhorse loop. range(), enumerate(), zip(), looping over dicts, and an intro to list comprehensions for one-liners.",
    minutes: 9,
  },
  {
    number: "06",
    slug: "loop-control",
    title: "break, continue & nesting",
    blurb:
      "Exit early with break, skip iterations with continue, work with nested loops without writing spaghetti. Plus the rare loop-else clause.",
    minutes: 8,
  },
  {
    number: "07",
    slug: "function-args",
    title: "Arguments & return values",
    blurb:
      "Deeper on functions: positional vs keyword, defaults, *args, **kwargs, returning multiple values, and the design rules for signatures that don't suck.",
    minutes: 9,
  },
];

const TOTAL_MIN = LESSONS.reduce((s, l) => s + l.minutes, 0);

export default function Unit2IndexPage() {
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
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse, ${ACCENT}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/learn/python"
            className="text-xs font-mono text-white/20 hover:text-white transition-colors"
          >
            ← Learn Python
          </Link>
          <div style={{ height: "28px" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-5">
            Unit 2 of 3 · Beginner → Intermediate · {TOTAL_MIN} min total
          </p>
          <motion.h1
            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Data & control flow.{" "}
            <span className="text-white/30">
              The shapes data takes and the loops that walk through them.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-white/50 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Seven lessons that take you from &ldquo;I can write an if
            statement&rdquo; to &ldquo;I can process a file, deduplicate it,
            sort it, and pass it to a function with sensible defaults.&rdquo;
            Work them in order, then prove it with the Unit 2 quiz.
          </motion.p>
        </div>
      </section>

      {/* LESSONS */}
      <section
        className="px-6 md:px-16"
        style={{ paddingTop: "20px", paddingBottom: "60px" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col">
          {LESSONS.map((l, i) => (
            <motion.div
              key={l.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04 * i }}
            >
              <Link
                href={`/learn/python/lessons/${l.slug}`}
                className="group block border-t border-white/[0.06] py-6 hover:bg-white/[0.015] transition-colors"
              >
                <div className="flex items-start gap-5">
                  <span className="text-xs font-mono text-white/30 mt-1 flex-shrink-0 w-8">
                    {l.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-4 flex-wrap mb-2">
                      <h2 className="text-lg md:text-xl font-black tracking-tight text-white group-hover:text-[#e63946] transition-colors">
                        {l.title}
                      </h2>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                        {l.minutes} min read
                      </span>
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed">
                      {l.blurb}
                    </p>
                  </div>
                  <span className="text-white/20 group-hover:text-[#e63946] transition-colors text-lg mt-1 flex-shrink-0">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>
      </section>

      {/* CTA TO QUIZ */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="border border-white/[0.08] rounded-[24px] p-8 md:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(230,57,70,0.04), rgba(255,255,255,0.005))",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-4">
              When you finish the lessons
            </p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
              Test what stuck. 20 questions, 5 minutes.
            </h2>
            <p className="text-white/55 leading-relaxed mb-6 max-w-2xl">
              You&rsquo;ll get a score and a per-topic breakdown — so if your
              list operations are sharp but dicts are wobbly, you know exactly
              which lesson to revisit before moving to Unit 3.
            </p>
            <Link
              href="/tools/python-lists-loops-quiz"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-[#e63946] text-white hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_20px_rgba(230,57,70,0.3)]"
            >
              Take the Lists & Loops Quiz →
            </Link>
          </div>
        </div>
      </section>

      {/* PREV / NEXT UNIT */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/learn/python/unit-1"
            className="group flex flex-col items-start text-left"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
              ← Previous
            </span>
            <span className="text-base text-white/60 group-hover:text-white transition-colors mt-1">
              Unit 1 · Fundamentals
            </span>
          </Link>
          <Link
            href="/learn/python/unit-3"
            className="group flex flex-col items-end text-right"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
              Next →
            </span>
            <span className="text-base text-white/60 group-hover:text-white transition-colors mt-1">
              Unit 3 · Classes, Modules & Files
            </span>
          </Link>
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
              { label: "Learn", href: "/learn/python" },
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
