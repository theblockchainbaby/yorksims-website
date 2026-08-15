"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";
import { POSTS, VERTICAL_COLORS } from "../lib/blog";

function PostCard({ post, index }: { post: typeof POSTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <div
          className="relative border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
          style={{ borderRadius: "24px", padding: "36px 40px" }}
        >
          {/* Red line on hover */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#e63946] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
            style={{ borderRadius: "2px" }}
          />

          <div className="flex items-start justify-between gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: VERTICAL_COLORS[post.vertical] ?? "#666" }}
                >
                  {post.vertical}
                </span>
                <span className="text-white/10">·</span>
                <span className="text-[10px] font-mono text-white/20">{post.date}</span>
                <span className="text-white/10">·</span>
                <span className="text-[10px] font-mono text-white/20">{post.readTime} read</span>
              </div>
              <h2 className="text-lg font-display font-extrabold tracking-tight text-white group-hover:text-white transition-colors mb-3 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-white/30 leading-relaxed">{post.excerpt}</p>
            </div>
            <motion.span
              className="text-white/20 group-hover:text-[#e63946] transition-colors shrink-0 mt-1 text-lg"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >→</motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0c0a0a] text-white">
      <Nav />

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "40vh", padding: "120px 24px 80px" }}
      >
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        {/* Glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <motion.p
            className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            The Build Blog
          </motion.p>
          <motion.h1
            className="text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[0.95] text-center"
            style={{ marginBottom: "24px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Show the work.<br /><span className="text-white/20">All of it.</span>
          </motion.h1>
          <motion.p
            className="text-sm text-white/30 max-w-md text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            Every post is a breakdown of something that was actually built — code, receipts, and decisions included. No motivation. No fluff.
          </motion.p>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section className="px-6 md:px-16" style={{ paddingTop: "40px", paddingBottom: "140px", maxWidth: "1000px", margin: "0 auto" }}>
        <div className="flex flex-col gap-4">
          {POSTS.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs text-white/20 mb-6 font-mono">Every post is free — full breakdowns, code repos, and templates. The story behind them is in the books.</p>
          <Link
            href="/books"
            className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
          >
            Get the books
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "48px", paddingBottom: "48px", display: "flex", justifyContent: "center" }}>
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" style={{ height: "60px", width: "auto" }} />
          <p className="text-xs text-white/20 font-mono">Teaching Execution, Not Theory</p>
          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            {[
              { label: "Home", href: "/" },
              { label: "Platform", href: "/hub" },
              { label: "Verticals", href: "/verticals" },
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
