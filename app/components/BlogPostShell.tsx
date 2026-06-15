"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "./Nav";
import { VERTICAL_COLORS } from "../lib/blog";
import type { BlogPost } from "../lib/blog";

interface Props {
  post: BlogPost;
  children: React.ReactNode;
  ctaCopy?: string;
}

/**
 * BlogPostShell — shared chrome for every long-form blog post.
 * Handles nav, back link, meta block, animated title + lede, prose container,
 * footer, and global prose styles. Individual post pages pass the article
 * body as children.
 */
export default function BlogPostShell({ post, children, ctaCopy }: Props) {
  const verticalColor = VERTICAL_COLORS[post.vertical] ?? "#e63946";

  return (
    <div className="min-h-screen bg-[#0c0a0a] text-white">
      <Nav />

      <article
        className="px-6 md:px-16"
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          paddingTop: "24px",
          paddingBottom: "120px",
        }}
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="text-xs font-mono text-white/20 hover:text-[#e63946] transition-colors"
          >
            ← Back to Blog
          </Link>
        </motion.div>

        <div style={{ height: "48px" }} />

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex items-center gap-3 mb-6 flex-wrap"
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: verticalColor }}
          >
            {post.vertical}
          </span>
          <span className="text-white/10">·</span>
          <span className="text-[10px] font-mono text-white/20">{post.date}</span>
          <span className="text-white/10">·</span>
          <span className="text-[10px] font-mono text-white/20">
            {post.readTime} read
          </span>
          <span className="text-white/10">·</span>
          <span className="text-[10px] font-mono text-white/20">
            {post.author}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.1] mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {post.title}
        </motion.h1>

        <div style={{ height: "48px" }} />

        <motion.p
          className="text-lg text-white/30 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {post.excerpt}
        </motion.p>

        <div style={{ height: "64px" }} />

        {/* Body */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          {children}

          {/* CTA */}
          <div className="mt-16 pt-8 border-t border-white/[0.06]">
            <p className="text-xs text-white/20 font-mono mb-6">
              {ctaCopy ??
                "Pro members get the full breakdown, code repo, templates, and all the receipts that didn't make the post."}
            </p>
            <Link
              href="/#pricing"
              className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
            >
              Book a session
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Shared prose styles */}
      <style jsx global>{`
        .prose-custom p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 17px;
          line-height: 1.85;
          margin-bottom: 1.5em;
        }
        .prose-custom h2 {
          color: white;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 3em;
          margin-bottom: 1em;
        }
        .prose-custom h3 {
          color: rgba(255, 255, 255, 0.85);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-top: 2em;
          margin-bottom: 0.75em;
        }
        .prose-custom ul {
          list-style: none;
          padding: 0;
          margin-bottom: 1.5em;
        }
        .prose-custom ul li {
          color: rgba(255, 255, 255, 0.45);
          font-size: 16px;
          line-height: 1.8;
          padding-left: 1.5em;
          position: relative;
          margin-bottom: 0.5em;
        }
        .prose-custom ul li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: rgba(230, 57, 70, 0.5);
        }
        .prose-custom ol {
          counter-reset: item;
          list-style: none;
          padding: 0;
          margin-bottom: 1.5em;
        }
        .prose-custom ol li {
          color: rgba(255, 255, 255, 0.45);
          font-size: 16px;
          line-height: 1.8;
          padding-left: 2em;
          position: relative;
          margin-bottom: 0.75em;
          counter-increment: item;
        }
        .prose-custom ol li::before {
          content: counter(item, decimal-leading-zero);
          position: absolute;
          left: 0;
          color: rgba(230, 57, 70, 0.55);
          font-weight: 700;
          font-size: 13px;
          font-variant-numeric: tabular-nums;
          top: 3px;
        }
        .prose-custom strong {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
        }
        .prose-custom em {
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }
        .prose-custom code {
          color: rgba(230, 57, 70, 0.85);
          font-size: 14px;
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
        }
        .prose-custom pre {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 20px 24px;
          overflow-x: auto;
          margin-bottom: 1.5em;
          font-size: 13px;
          line-height: 1.6;
        }
        .prose-custom pre code {
          background: none;
          padding: 0;
          color: rgba(255, 255, 255, 0.7);
        }
        .prose-custom blockquote {
          border-left: 2px solid #e63946;
          padding-left: 20px;
          margin: 1.5em 0;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }
        .prose-custom a {
          color: rgba(230, 57, 70, 0.9);
          text-decoration: none;
          border-bottom: 1px solid rgba(230, 57, 70, 0.25);
          transition: all 0.2s;
        }
        .prose-custom a:hover {
          color: #e63946;
          border-bottom-color: rgba(230, 57, 70, 0.7);
        }
      `}</style>

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
        <div className="w-full max-w-[780px] flex flex-col md:flex-row justify-between items-center gap-6">
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
              { label: "Platform", href: "/hub" },
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
