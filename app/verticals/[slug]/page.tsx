"use client";

import Link from "next/link";
import { use, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "../../components/Nav";
import { VERTICALS } from "../../lib/portals";
import { getVerticalContent } from "../../lib/vertical-content";
import { getPostBySlug, VERTICAL_COLORS } from "../../lib/blog";

export default function VerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const vertical = VERTICALS.find((v) => v.id === slug);
  const content = getVerticalContent(slug);

  if (!vertical) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4 text-sm">Vertical not found</p>
          <Link
            href="/verticals"
            className="text-xs text-[#e63946] hover:text-white transition-colors"
          >
            ← Back to Verticals
          </Link>
        </div>
      </div>
    );
  }

  const accent = VERTICAL_COLORS[vertical.shortTitle] ?? "#e63946";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* ── HERO ── */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}
      >
        {/* Grid background */}
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
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse, ${accent}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/verticals"
              className="text-xs font-mono text-white/20 hover:text-[#e63946] transition-colors"
            >
              ← All Verticals
            </Link>
          </motion.div>

          <div style={{ height: "32px" }} />

          <motion.p
            className="text-xs font-mono uppercase tracking-[0.3em] mb-6"
            style={{ color: accent }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Vertical {vertical.num} — {vertical.shortTitle}
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl font-black tracking-tight leading-[1] mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.08,
            }}
          >
            {vertical.title}
          </motion.h1>

          <motion.p
            className="text-lg text-white/40 leading-relaxed max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
          >
            {content?.heroStatement ?? vertical.desc}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {vertical.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-3 py-1.5 border border-white/[0.08] text-white/40 rounded"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT (if available) ── */}
      {content ? (
        <>
          {/* Long description */}
          <Section>
            <p className="text-lg text-white/50 leading-[1.85] max-w-3xl">
              {content.longDescription}
            </p>
          </Section>

          {/* Outcomes */}
          <Section title="What You'll Learn" accent={accent}>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
              {content.outcomes.map((o, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-[10px] w-[6px] h-[6px] rounded-full flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <p className="text-[15px] text-white/60 leading-relaxed">
                      {o}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Section>

          {/* Modules */}
          <Section title="Curriculum" accent={accent}>
            <div className="max-w-4xl mb-8">
              <p className="text-sm text-white/40 leading-relaxed">
                Every module below is free to read and follow — the code, the
                templates, the receipts. Pro ($29/mo) is for the monthly live
                Q&amp;A and the private community. Builder ($499/mo) adds direct
                email access and small-group coaching.
              </p>
            </div>
            <div className="flex flex-col gap-4 max-w-4xl">
              {content.modules.map((m, i) => (
                <FadeIn key={m.num} delay={i * 0.05}>
                  <div
                    className="relative border transition-all duration-500 group"
                    style={{
                      borderRadius: "20px",
                      padding: "28px 32px",
                      borderColor: m.free
                        ? `${accent}40`
                        : "rgba(255,255,255,0.06)",
                      background: m.free
                        ? `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`
                        : "transparent",
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] origin-top group-hover:scale-y-100 transition-transform duration-500"
                      style={{
                        backgroundColor: accent,
                        transform: m.free ? "scaleY(1)" : "scaleY(0)",
                      }}
                    />
                    <div className="flex items-start justify-between gap-6 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span
                            className="text-[11px] font-mono font-bold tracking-wider"
                            style={{ color: accent }}
                          >
                            MODULE {m.num}
                          </span>
                          <span className="text-white/10">·</span>
                          <span className="text-[11px] font-mono text-white/30">
                            {m.hours}
                          </span>
                          {m.free && (
                            <>
                              <span className="text-white/10">·</span>
                              <span
                                className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-full"
                                style={{
                                  color: accent,
                                  backgroundColor: `${accent}18`,
                                  border: `1px solid ${accent}40`,
                                }}
                              >
                                Free
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="text-xl font-black tracking-tight mb-2">
                          {m.title}
                        </h3>
                        <p className="text-sm text-white/40 leading-relaxed">
                          {m.summary}
                        </p>
                        {m.cta && (
                          <Link
                            href={m.cta.href}
                            className="inline-flex items-center gap-2 mt-5 text-sm font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
                            style={{
                              color: "#fff",
                              backgroundColor: accent,
                            }}
                          >
                            {m.cta.label} <span>→</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Section>

          {/* Stack */}
          <Section title="The Stack" accent={accent}>
            <div className="flex flex-wrap gap-3 max-w-4xl">
              {content.stack.map((s) => (
                <span
                  key={s}
                  className="text-sm font-mono px-4 py-2 border border-white/[0.08] text-white/60 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* Case study */}
          <Section title="Case Study" accent={accent}>
            <div
              className="border border-white/[0.08] rounded-[24px] p-10 max-w-4xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.015), rgba(255,255,255,0.005))",
              }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.3em] font-bold mb-4"
                style={{ color: accent }}
              >
                Live Build
              </p>
              <h3 className="text-3xl font-black tracking-tight mb-4">
                {content.caseStudy.name}
              </h3>
              <p className="text-white/50 leading-relaxed mb-8">
                {content.caseStudy.summary}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {content.caseStudy.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="border-l border-white/[0.08] pl-4 py-1"
                  >
                    <p className="text-sm text-white/70">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Related posts */}
          {content.relatedPostSlugs.length > 0 && (
            <Section title="Related Posts" accent={accent}>
              <div className="flex flex-col gap-4 max-w-4xl">
                {content.relatedPostSlugs
                  .map((s) => getPostBySlug(s))
                  .filter((p): p is NonNullable<typeof p> => Boolean(p))
                  .map((p, i) => (
                    <FadeIn key={p.slug} delay={i * 0.05}>
                      <Link href={`/blog/${p.slug}`} className="block group">
                        <div
                          className="relative border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
                          style={{
                            borderRadius: "20px",
                            padding: "28px 32px",
                          }}
                        >
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                            style={{ backgroundColor: accent }}
                          />
                          <div className="flex items-start justify-between gap-6">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-3">
                                <span
                                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                                  style={{ color: accent }}
                                >
                                  {p.vertical}
                                </span>
                                <span className="text-white/10">·</span>
                                <span className="text-[10px] font-mono text-white/20">
                                  {p.date}
                                </span>
                                <span className="text-white/10">·</span>
                                <span className="text-[10px] font-mono text-white/20">
                                  {p.readTime} read
                                </span>
                              </div>
                              <h4 className="text-lg font-black tracking-tight mb-2 leading-snug">
                                {p.title}
                              </h4>
                              <p className="text-sm text-white/35 leading-relaxed">
                                {p.excerpt}
                              </p>
                            </div>
                            <span className="text-white/20 group-hover:text-[#e63946] transition-colors shrink-0 mt-1 text-lg">
                              →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
              </div>
            </Section>
          )}

          {/* CTA */}
          <section
            className="px-6 md:px-16"
            style={{ paddingTop: "40px", paddingBottom: "120px" }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs text-white/20 font-mono mb-6">
                  The modules are free. Pro is for the monthly live Q&amp;A and
                  the community. Builder adds direct access and coaching.
                </p>
                <Link
                  href="/pricing"
                  className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)]"
                >
                  Join Pro — Live Q&amp;A + Community
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        <section className="px-6 md:px-16" style={{ paddingBottom: "120px" }}>
          <div className="max-w-2xl mx-auto border border-[#e63946]/20 bg-[#e63946]/5 rounded p-10 text-center">
            <p className="text-sm font-semibold mb-2">
              Module content coming soon — and it&rsquo;ll be free.
            </p>
            <p className="text-xs text-white/40 mb-6">
              Every module ships free to read and follow. Pro is for the
              monthly live Q&amp;A and community. Join now and get notified the
              moment this vertical launches.
            </p>
            <Link
              href="/pricing"
              className="inline-block px-6 py-2.5 bg-[#e63946] text-white text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#ff4d5a] transition-colors"
            >
              Join Pro — Live Q&amp;A + Community
            </Link>
          </div>
        </section>
      )}

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
              { label: "Verticals", href: "/verticals" },
              { label: "Blog", href: "/blog" },
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

/* ── Helpers ── */

function Section({
  title,
  accent,
  children,
}: {
  title?: string;
  accent?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-6 md:px-16" style={{ paddingTop: "60px", paddingBottom: "40px" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto"
      >
        {title && (
          <div className="flex items-center gap-4 mb-10">
            <div
              className="h-[2px] w-10"
              style={{ backgroundColor: accent ?? "#e63946" }}
            />
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              {title}
            </h2>
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
