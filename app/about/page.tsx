"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0c0a0a] text-white">
      <Nav />

      <article className="px-6 md:px-16" style={{ maxWidth: "780px", margin: "0 auto", paddingTop: "100px", paddingBottom: "120px" }}>
        {/* Hero */}
        <motion.p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}>
          About the Builder
        </motion.p>

        <motion.h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1] mb-8"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}>
          York Sims
        </motion.h1>

        <motion.p className="text-lg text-white/40 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}>
          D1 basketball. Pro overseas in Ankara, Turkey. Now building across 10 industries under one holding company. Teaching execution, not theory.
        </motion.p>

        <div style={{ height: "48px" }} />

        <motion.div className="prose-about" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}>

          <h2>The Short Version</h2>

          <p>
            I am a builder. I build software, AI agents, hardware designs, blockchain payment systems, businesses, physical products, and a few things that do not fit in a category. I ship across 10 verticals simultaneously through my company Caipher AI LLC, a Wyoming holding company with 5 operating subsidiaries.
          </p>

          <p>
            Before this I played D1 college basketball and went pro overseas in Ankara, Turkey. The transition from athlete to founder taught me more about building than any degree or program I have encountered. The discipline carries over. The rest you learn by doing.
          </p>

          <h2>Why I Built This</h2>

          <p>
            YorkSims.com exists because the platform I needed did not exist when I started. I wanted one place where I could learn to ship a SaaS product, structure an LLC, build an AI agent, develop raw land, and understand blockchain payments. Every resource I found covered one topic, in one format, by one person who usually had not done the thing they were teaching.
          </p>

          <p>
            So I started building everything myself and documenting it. Not tutorials. Not motivation. The actual work: the code, the contracts, the receipts, the mistakes. That documentation became YorkSims.
          </p>

          <h2>What I Have Built</h2>

          <div className="receipts-grid">
            <Receipt label="VitrOS" detail="Production SaaS, $4,200+ MRR, built in 30 days" link="/blog/building-vitros-saas" />
            <Receipt label="MoltBot" detail="20-skill autonomous AI agent, handles 85% of back-office email" link="/blog/moltbot-autonomous-ai-agent" />
            <Receipt label="DualPay" detail="3-rail payment system on XRPL, 4.2s median settlement" link="/blog/dualpay-xrp-ledger" />
            <Receipt label="HBM Controller" detail="4,500 lines of SystemVerilog, passes random stimulus testing" link="/blog/hbm-memory-systemverilog" />
            <Receipt label="Animation Engine" detail="Product photo → 240-frame scroll animation for $14.50" link="/blog/animation-engine-fal-ai" />
            <Receipt label="Caipher AI LLC" detail="5-subsidiary holding company, clean accounting since month 3" link="/blog/llc-operating-agreement" />
            <Receipt label="10-Acre Development" detail="$38k land + $60k improvements = $175k appraisal, $76k equity" link="/blog/raw-land-development" />
            <Receipt label="Otto" detail="Voice agent handling 75% of inbound calls across 6 business numbers" link="/verticals/automotive" />
          </div>

          <p>
            Every one of these has a public breakdown on the blog or in the verticals. I do not claim things I cannot show.
          </p>

          <h2>The Athlete Arc</h2>

          <p>
            I played D1 basketball. After college I signed a contract to play professionally in Ankara, Turkey. Different country, different language, different style of play. I had a week to figure it out.
          </p>

          <p>
            The first month was miserable. By the second month I stopped trying to force my old game and started learning theirs. That entire experience is what building a business feels like every day. You land in an environment where you do not know the rules. You learn the new rules or you go home.
          </p>

          <p>
            The transition from athletics to business is the most under-documented founder journey I know. The discipline you build in 10,000 hours of deliberate practice is a bigger advantage than most people realize. It is not about grit. It is about repetition under supervision, adapted to a new domain. The Athlete vertical on YorkSims is a direct bridge for anyone making that transition.
          </p>

          <h2>How I Work</h2>

          <ul>
            <li>Monday and Tuesday: deep build sessions. No calls. Just shipping.</li>
            <li>Wednesday: review day. MoltBot reports, Otto transcripts, analytics, financials.</li>
            <li>Thursday: people day. Coaching, Q&amp;A, 1-on-1s.</li>
            <li>Friday: content and planning. Write, record, ship.</li>
          </ul>

          <p>
            I wake up at 5:30 AM and have since college. The morning routine is the same every day. I write code at 6 AM without checking my feelings about it. That sentence sounds dramatic but it is the whole framework.
          </p>

          <h2>What I Believe</h2>

          <ul>
            <li>Execution beats theory every time. Show the work.</li>
            <li>Breadth compounds. The best founders know more domains than their competitors.</li>
            <li>Receipts beat marketing. Link to the repo, the contract, the filing.</li>
            <li>Automation is not laziness. It is focus management.</li>
            <li>Athletes have the biggest unfair advantage and most of them do not know it yet.</li>
            <li>You do not need permission to build across categories.</li>
          </ul>

          <h2>Where to Find Me</h2>

          <ul>
            <li><strong>GitHub:</strong> 15+ public repos, all real production code</li>
            <li><strong>YorkSims.com:</strong> you are here</li>
            <li><strong>Discord:</strong> the private community for Pro and Builder members</li>
            <li><strong>Monthly Q&amp;A:</strong> live, open to everyone, every month</li>
          </ul>

          <p>
            Every module across all 10 verticals is free to read, clone, and use. If you want the full story &mdash; how all of it got built and what it cost &mdash; the three books are on the Books page as instant PDF downloads.
          </p>

          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row gap-4">
            <Link href="/pricing"
              className="inline-block text-center text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all">
              See Pricing
            </Link>
            <Link href="/blog"
              className="inline-block text-center text-sm font-bold uppercase tracking-widest px-10 py-4 border border-white/10 text-white/70 rounded-full hover:border-white/30 hover:text-white transition-all">
              Read the Blog
            </Link>
          </div>
        </motion.div>
      </article>

      <style jsx global>{`
        .prose-about p {
          color: rgba(255,255,255,0.5);
          font-size: 17px;
          line-height: 1.85;
          margin-bottom: 1.5em;
        }
        .prose-about h2 {
          color: white;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 3em;
          margin-bottom: 1em;
        }
        .prose-about ul {
          list-style: none;
          padding: 0;
          margin-bottom: 1.5em;
        }
        .prose-about ul li {
          color: rgba(255,255,255,0.45);
          font-size: 16px;
          line-height: 1.8;
          padding-left: 1.5em;
          position: relative;
          margin-bottom: 0.5em;
        }
        .prose-about ul li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: rgba(230,57,70,0.5);
        }
        .prose-about strong {
          color: rgba(255,255,255,0.75);
          font-weight: 600;
        }
        .receipts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 2em;
        }
        @media (min-width: 640px) {
          .receipts-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      {/* Footer */}
      <footer className="px-6 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "48px", paddingBottom: "48px", display: "flex", justifyContent: "center" }}>
        <div className="w-full max-w-[780px] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" style={{ height: "60px", width: "auto" }} />
          <p className="text-xs text-white/20 font-mono">Teaching Execution, Not Theory</p>
          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            {[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Pricing", href: "/pricing" },
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

function Receipt({ label, detail, link }: { label: string; detail: string; link: string }) {
  return (
    <Link href={link} className="group block border border-white/[0.06] hover:border-white/[0.12] rounded-[14px] px-5 py-4 transition-all">
      <span className="text-sm font-black text-white group-hover:text-[#e63946] transition-colors">{label}</span>
      <span className="block text-xs text-white/35 mt-1 leading-relaxed">{detail}</span>
    </Link>
  );
}
