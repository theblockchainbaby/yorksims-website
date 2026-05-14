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
    slug: "programming-fundamentals",
    title: "What programs actually do",
    blurb:
      "The input/process/output model that every program — from a calculator to a cloud platform — is built on. Plus the development loop you'll spend your career in.",
    minutes: 8,
  },
  {
    number: "02",
    slug: "data-types-variables",
    title: "Data types & variables",
    blurb:
      "The four types you'll use 95% of the time (str, int, float, bool), the rules for naming variables, and the type-conversion bugs that bite every beginner.",
    minutes: 8,
  },
  {
    number: "03",
    slug: "numbers-operators",
    title: "Numbers & operators",
    blurb:
      "Arithmetic, modulo, exponents, floor division, and the floating-point trap. Where to use modulo in real code. Why you should never store money in a float.",
    minutes: 8,
  },
  {
    number: "04",
    slug: "strings",
    title: "Strings",
    blurb:
      "Quotes, escape sequences, f-strings, indexing, slicing, immutability, and the 8 string methods that handle 95% of real text work.",
    minutes: 9,
  },
  {
    number: "05",
    slug: "conditionals",
    title: "Conditionals & booleans",
    blurb:
      "if / elif / else, comparison operators, and / or / not, truthiness rules, and two refactors that flatten ugly conditional chains.",
    minutes: 8,
  },
  {
    number: "06",
    slug: "functions",
    title: "Functions",
    blurb:
      "How to stop repeating yourself. def, parameters vs arguments, return values, default values, the mutable-default trap, and local scope.",
    minutes: 9,
  },
  {
    number: "07",
    slug: "exceptions",
    title: "Errors & exceptions",
    blurb:
      "Reading tracebacks, syntax errors vs runtime exceptions, try/except/else/finally, the five exceptions you'll see most, and when to catch vs let it crash.",
    minutes: 8,
  },
];

const TOTAL_MIN = LESSONS.reduce((s, l) => s + l.minutes, 0);

export default function Unit1IndexPage() {
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
            Unit 1 of 3 · Beginner · {TOTAL_MIN} min total
          </p>
          <motion.h1
            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Fundamentals.{" "}
            <span className="text-white/30">
              Everything you need before line 21.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-white/50 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Seven short lessons covering the language itself — types, math,
            text, decisions, functions, and what to do when things break. Work
            them in order. Then take the quiz and find out what stuck.
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
              functions are sharp but conditionals are wobbly, you know
              exactly which lesson to revisit before moving to Unit 2.
            </p>
            <Link
              href="/tools/python-basics-quiz"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-[#e63946] text-white hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_20px_rgba(230,57,70,0.3)]"
            >
              Take the Python Basics Quiz →
            </Link>
          </div>
        </div>
      </section>

      {/* NEXT UNIT TEASE */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/learn/python/unit-2"
            className="group flex items-center justify-between gap-4 py-2"
          >
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">
                Next up
              </p>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-[#e63946] transition-colors">
                Unit 2 · Data &amp; Control Flow →
              </h3>
            </div>
            <span className="text-white/20 group-hover:text-[#e63946] transition-colors text-2xl">
              →
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
