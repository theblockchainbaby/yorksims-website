"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";

const ACCENT = "#e63946";

interface Unit {
  number: number;
  title: string;
  blurb: string;
  topics: string[];
  level: string;
  indexHref: string;
  lessonCount: number;
  quizSlug: string;
  quizLabel: string;
}

const UNITS: Unit[] = [
  {
    number: 1,
    title: "Web Foundations",
    blurb:
      "How the internet got built, how a request actually moves from your browser to a server in another country, and the design work that has to happen before you write a single line of code.",
    topics: [
      "A brief history of the internet",
      "How the web works (TCP/IP, HTTP)",
      "DNS, IP addresses & URLs",
      "Web servers and CMSes",
      "Wireframes & UX",
      "Responsive, mobile-first design",
      "Dev workflow & IDEs",
    ],
    level: "Beginner",
    indexHref: "/learn/web/unit-1",
    lessonCount: 7,
    quizSlug: "web-foundations-quiz",
    quizLabel: "Take the Web Foundations Quiz",
  },
  {
    number: 2,
    title: "Document Markup",
    blurb:
      "HTML and CSS — the structure and the look. Markup languages, semantic HTML, forms, the box model, selectors, layout, typography, and how to make any of it accessible.",
    topics: [
      "HTML, XML, JSON, SVG, Markdown",
      "HTML document structure",
      "Links, images, video & audio",
      "Forms & validation",
      "CSS selectors & specificity",
      "Box model, flex & grid",
      "Typography, a11y & responsive",
    ],
    level: "Beginner → Intermediate",
    indexHref: "/learn/web/unit-2",
    lessonCount: 7,
    quizSlug: "web-markup-quiz",
    quizLabel: "Take the HTML & CSS Quiz",
  },
  {
    number: 3,
    title: "Scripting & Storage",
    blurb:
      "Where pages stop being documents and start being software. JavaScript, the DOM, talking to APIs, server-side code, databases, and the security mistakes that get sites pwned.",
    topics: [
      "JavaScript fundamentals",
      "DOM manipulation & events",
      "Fetch, AJAX & APIs",
      "Client vs server-side code",
      "Cookies, sessions & localStorage",
      "Database basics & SQL",
      "Web security (XSS, SQLi, CSRF)",
    ],
    level: "Intermediate",
    indexHref: "/learn/web/unit-3",
    lessonCount: 7,
    quizSlug: "web-scripting-quiz",
    quizLabel: "Take the JS & Storage Quiz",
  },
];

export default function LearnWebPage() {
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
            Software · Free Learning Path
          </p>
          <motion.h1
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Learn the web.
            <br />
            <span className="text-white/30">Then go build it.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-white/50 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Three units, twenty-one lessons, zero filler. Start at the wire,
            end at JavaScript talking to a database. No signup. No video
            padding. No certificates designed to be framed.
          </motion.p>
        </div>
      </section>

      {/* PATH OVERVIEW */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "80px", paddingBottom: "40px" }}
      >
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-10 bg-[#e63946]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold">
              The Path
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            From packets to production.
          </h2>
          <p className="text-white/50 leading-relaxed max-w-2xl">
            Work the units in order if the web is new to you. Skip ahead if
            you&rsquo;re reviewing. Every lesson is short, dense, and written
            to be read once and remembered.
          </p>
        </div>
      </section>

      {/* UNIT CARDS */}
      <section
        className="px-6 md:px-16"
        style={{ paddingBottom: "80px" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {UNITS.map((u, i) => (
            <motion.div
              key={u.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              className="border border-white/[0.08] rounded-[24px] p-8 md:p-10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#e63946] mb-3">
                    Unit {u.number} · {u.level}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                    {u.title}
                  </h3>
                  <p className="text-white/55 leading-relaxed max-w-2xl">
                    {u.blurb}
                  </p>
                </div>
                <span
                  className="text-7xl font-black text-white/[0.06] leading-none flex-shrink-0"
                  aria-hidden="true"
                >
                  0{u.number}
                </span>
              </div>

              {/* Topics */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-8">
                {u.topics.map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  href={u.indexHref}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-[#e63946] text-white hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_20px_rgba(230,57,70,0.3)]"
                >
                  Start Unit {u.number} · {u.lessonCount} lessons →
                </Link>
                <Link
                  href={`/tools/${u.quizSlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-all"
                >
                  {u.quizLabel} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY THIS PATH */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-10 bg-[#e63946]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold">
              Why This Path
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
            Built for people who&rsquo;ll actually ship a site.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                01 · From the wire up
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                Most courses skip how the network actually works and you spend
                three years confused about CORS, DNS, and ports. We start at
                the wire.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                02 · Honest scope
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                We don&rsquo;t pretend you&rsquo;ll be a senior engineer in 3
                hours. You&rsquo;ll know what every part of a web stack is and
                what to learn next.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                03 · Original lessons
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                Every lesson is written from scratch by someone who ships code
                for a living. No regurgitated MDN, no AI slop, no signup wall.
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
