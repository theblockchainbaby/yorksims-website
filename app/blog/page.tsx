"use client";

import Link from "next/link";
import Nav from "../components/Nav";

const POSTS = [
  {
    slug: "building-vitros-saas",
    vertical: "Software",
    title: "Building VitrOS: From Zero to Production SaaS in 30 Days",
    excerpt: "Next.js 16, Prisma, PostgreSQL, NextAuth v5, multi-tenant RBAC, PWA offline capability — and it's live. Here's the full build breakdown.",
    date: "Mar 10, 2026",
    readTime: "12 min",
  },
  {
    slug: "moltbot-autonomous-ai-agent",
    vertical: "AI Agents",
    title: "MoltBot: Building a 20-Skill Autonomous AI Agent for Business",
    excerpt: "How I built an AI that handles CMO/CEO functions — email, research, outreach, reporting — without touching it. Full architecture breakdown.",
    date: "Mar 5, 2026",
    readTime: "9 min",
  },
  {
    slug: "hbm-memory-systemverilog",
    vertical: "Hardware",
    title: "HBM Memory Subsystem Design in SystemVerilog",
    excerpt: "Building an HBM-style controller with interleaving, ECC, and power states from scratch. What I learned building semiconductor-grade RTL on my own.",
    date: "Feb 28, 2026",
    readTime: "15 min",
  },
  {
    slug: "dualpay-xrp-ledger",
    vertical: "Blockchain",
    title: "Building DualPay: Multi-Payment on the XRP Ledger",
    excerpt: "Crypto + fiat in one system. How DualPay handles XRPL transactions, stablecoins, and fiat rails simultaneously — the full technical walkthrough.",
    date: "Feb 20, 2026",
    readTime: "11 min",
  },
  {
    slug: "llc-operating-agreement",
    vertical: "Business",
    title: "How I Structured Caipher AI LLC — and What I'd Do Differently",
    excerpt: "Entity setup, operating agreements, equity splits, and exit strategies. The real decisions behind building a holding company for multiple SaaS products.",
    date: "Feb 14, 2026",
    readTime: "8 min",
  },
  {
    slug: "raw-land-development",
    vertical: "Land",
    title: "Developing Raw Land From Scratch: Well, Septic, Power, Permits",
    excerpt: "Nobody teaches this. Buying a piece of raw land and turning it into something livable — the permits, the contractors, the county fights, the math.",
    date: "Feb 6, 2026",
    readTime: "10 min",
  },
  {
    slug: "d1-to-entrepreneur",
    vertical: "Athlete",
    title: "From D1 Basketball to Ankara, Turkey to Building a Tech Company",
    excerpt: "What playing pro basketball overseas teaches you about business — and why the discipline you built in athletics is your biggest unfair advantage.",
    date: "Jan 30, 2026",
    readTime: "7 min",
  },
  {
    slug: "animation-engine-fal-ai",
    vertical: "Creative Tech",
    title: "The Animation Engine: Turning Product Images into Scroll-Driven Websites",
    excerpt: "engine.py: an automated pipeline using fal.ai Nano Banana 2 + Kling 3.0 + ffmpeg. From a product photo to a full Apple-style launch page — with code.",
    date: "Jan 22, 2026",
    readTime: "13 min",
  },
];

const VERTICAL_COLORS: Record<string, string> = {
  "Software":     "text-blue-400",
  "AI Agents":    "text-purple-400",
  "Hardware":     "text-yellow-500",
  "Blockchain":   "text-green-400",
  "Business":     "text-orange-400",
  "Land":         "text-amber-500",
  "Athlete":      "text-cyan-400",
  "Creative Tech":"text-pink-400",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#e63946] mb-4">The Build Blog</p>
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Show the work.
          </h1>
          <p className="text-[#555] text-sm leading-relaxed">
            Every post is a breakdown of something that was actually built —
            code, receipts, and decisions included. No motivation. No fluff.
          </p>
        </div>

        {/* Posts */}
        <div className="grid gap-px bg-[#1e1e1e] border border-[#1e1e1e] rounded overflow-hidden">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-[#0a0a0a] p-6 md:p-8 group hover:bg-[#0f0f0f] transition-colors flex gap-6 items-start"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${VERTICAL_COLORS[post.vertical] ?? "text-[#666]"}`}>
                    {post.vertical}
                  </span>
                  <span className="text-[#222]">·</span>
                  <span className="text-[10px] font-mono text-[#333]">{post.date}</span>
                  <span className="text-[#222]">·</span>
                  <span className="text-[10px] font-mono text-[#333]">{post.readTime} read</span>
                </div>
                <h2 className="text-base font-semibold text-white group-hover:text-[#e63946] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-[#555] leading-relaxed">{post.excerpt}</p>
              </div>
              <span className="text-[#333] group-hover:text-[#e63946] transition-colors shrink-0 mt-1">→</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#444] mb-4">Pro members get full breakdowns, code, and templates with every post.</p>
          <Link
            href="/#pricing"
            className="inline-block px-6 py-2.5 border border-[#1e1e1e] text-white text-xs font-semibold uppercase tracking-widest rounded hover:border-[#333] transition-colors"
          >
            Join Pro — $29/mo
          </Link>
        </div>
      </div>
    </div>
  );
}
