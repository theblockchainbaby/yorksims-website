"use client";

import Link from "next/link";
import Nav from "../components/Nav";

const VERTICALS = [
  {
    num: "01",
    title: "Build Software From Zero",
    desc: "How to build a SaaS product from scratch. Full-stack with Next.js, Prisma, PostgreSQL. Multi-tenant architecture. Deploy to Vercel and Supabase. Using VitrOS as a live case study.",
    tags: ["Next.js", "Supabase", "Vercel", "PostgreSQL"],
    href: "/verticals/software",
  },
  {
    num: "02",
    title: "AI Agents & Voice Automation",
    desc: "Building AI voice agents with ElevenLabs. Autonomous bots like MoltBot. n8n + MCP workflow automation. White-label AI SaaS with tRPC, Redis, Stripe billing. Selling AI to local businesses.",
    tags: ["ElevenLabs", "MCP", "n8n", "OpenAI"],
    href: "/verticals/ai-agents",
  },
  {
    num: "03",
    title: "Hardware & Semiconductor Engineering",
    desc: "HBM memory subsystem design in SystemVerilog. Hardware verification testbenches. Monte Carlo reliability simulation. Bottleneck analysis. Semiconductor test log automation.",
    tags: ["SystemVerilog", "RTL", "VLSI", "ECC"],
    href: "/verticals/hardware",
  },
  {
    num: "04",
    title: "Blockchain & Fintech",
    desc: "Building on the XRP Ledger. DualPay multi-payment system: crypto + fiat. Web3 gaming with on-chain USDC wagering. Multi-chain wallet integration: XRPL, EVM, Solana.",
    tags: ["XRPL", "EVM", "Solana", "DeFi"],
    href: "/verticals/blockchain",
  },
  {
    num: "05",
    title: "Start & Structure a Business",
    desc: "Entity formation: LLC, S-Corp, C-Corp — which one and why. Operating agreements. NDAs and sales contracts. Pricing strategy. Building a sales pipeline from cold email to close.",
    tags: ["LLC", "Contracts", "Sales", "Operations"],
    href: "/verticals/business",
  },
  {
    num: "06",
    title: "Physical Products & Manufacturing",
    desc: "From idea to retail shelf. Sourcing manufacturers worldwide. Getting into retail: distributors, shelf placement, margins. Brand building, packaging, positioning. Cannabis industry masterclass.",
    tags: ["CPG", "Manufacturing", "Retail", "Sourcing"],
    href: "/verticals/products",
  },
  {
    num: "07",
    title: "Land & Real Estate Development",
    desc: "Buying raw land: due diligence and negotiation. Developing from scratch: well, septic, power, permits. Navigating county zoning — the stuff nobody teaches. Building equity through land vs. traditional real estate.",
    tags: ["Land", "Development", "Permits", "Zoning"],
    href: "/verticals/land",
  },
  {
    num: "08",
    title: "Athlete to Entrepreneur",
    desc: "The athlete's edge: how discipline transfers to business. Playing overseas: what nobody tells you about pro sports abroad. Building your brand while you're still playing. D1 → pro → builder.",
    tags: ["Mindset", "D1", "Performance", "Transition"],
    href: "/verticals/athlete",
  },
  {
    num: "09",
    title: "Automotive Industry Tech",
    desc: "Building Otto: AI for dealerships, zero to production. Automating service centers with phone agents and appointment booking. The Autolux platform architecture. Selling AI to the automotive industry.",
    tags: ["Automotive", "AI", "Voice Agents", "CRM"],
    href: "/verticals/automotive",
  },
  {
    num: "10",
    title: "Creative Tech & AI-Powered Production",
    desc: "The Animation Engine: turn any product image into a scroll-driven website with AI. Apple-level product launch pages. AI video production pipeline. fal.ai masterclass: Kling 3.0, Nano Banana.",
    tags: ["Canvas", "fal.ai", "Kling", "Scroll Animation"],
    href: "/verticals/creative",
  },
];

export default function HubPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#e63946] mb-4">The Platform</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            10 Verticals.<br />All with receipts.
          </h1>
          <p className="text-[#666] text-sm leading-relaxed">
            Every vertical maps to real, shipped projects. Every course includes
            downloadable templates, real code, and actionable frameworks.
            Ten verticals — more than any single competitor covers.
          </p>
        </div>

        {/* Verticals grid */}
        <div className="grid gap-px bg-[#1e1e1e] border border-[#1e1e1e] rounded overflow-hidden">
          {VERTICALS.map((v) => (
            <Link
              key={v.num}
              href={v.href}
              className="bg-[#0a0a0a] p-6 md:p-8 group hover:bg-[#0f0f0f] transition-colors flex gap-6 md:gap-8 items-start"
            >
              {/* Number */}
              <span className="text-xs font-mono text-[#222] shrink-0 w-6 mt-1">{v.num}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-base font-semibold text-white group-hover:text-[#e63946] transition-colors">
                    {v.title}
                  </h2>
                  <span className="text-[#333] group-hover:text-[#e63946] transition-colors shrink-0 mt-0.5">→</span>
                </div>
                <p className="text-sm text-[#555] leading-relaxed mb-3">{v.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {v.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-[#1e1e1e] text-[#444] rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 border border-[#1e1e1e] rounded p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold mb-1">Ready to build?</p>
            <p className="text-xs text-[#555]">Pro starts at $29/mo. Full access to all 10 verticals.</p>
          </div>
          <Link
            href="/#pricing"
            className="px-6 py-3 bg-[#e63946] text-white text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#ff4d5a] transition-colors shrink-0"
          >
            See Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
