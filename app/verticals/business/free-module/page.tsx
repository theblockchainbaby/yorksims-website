"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Nav from "../../../components/Nav";

const ACCENT = "#e63946";
const GITHUB_URL =
  "https://github.com/theblockchainbaby/yorksims-business-01-llc-formation";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerUl({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
    >
      {children}
    </motion.ul>
  );
}

function StaggerLi({ children }: { children: ReactNode }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.li>
  );
}

function Section({
  title,
  children,
  number,
}: {
  title?: string;
  children: ReactNode;
  number?: string;
}) {
  return (
    <section className="px-6 md:px-16 py-24 md:py-32 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto">
        {title && (
          <FadeIn>
            <div className="flex items-center gap-5 mb-14">
              <motion.div
                className="h-[2px] flex-shrink-0"
                style={{ backgroundColor: ACCENT }}
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              />
              {number && (
                <span
                  className="text-xs font-mono font-bold tracking-[0.3em]"
                  style={{ color: ACCENT }}
                >
                  STEP {number}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                {title}
              </h2>
            </div>
          </FadeIn>
        )}
        <div className="max-w-4xl mx-auto">{children}</div>
      </div>
    </section>
  );
}

function CodeBlock({ children, lang = "" }: { children: string; lang?: string }) {
  return (
    <pre className="rounded-xl p-5 overflow-x-auto text-[13px] font-mono leading-relaxed border border-white/[0.08] bg-white/[0.02] text-white/80 mt-4 mb-2 text-left">
      {lang && (
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
          {lang}
        </div>
      )}
      <code>{children}</code>
    </pre>
  );
}

function Disclaimer() {
  return (
    <div className="mt-6 border-l-2 pl-5 py-3" style={{ borderColor: ACCENT }}>
      <p className="text-[10px] uppercase tracking-wider font-mono mb-2" style={{ color: ACCENT }}>
        Not legal advice
      </p>
      <p className="text-sm text-white/45 leading-relaxed">
        This is the playbook and the templates I actually use — not legal
        advice and not a substitute for an attorney in your state. Before you
        file or sign anything, have it reviewed by a licensed attorney in your
        jurisdiction. The $800 you spend on a lawyer reviewing this is the
        cheapest insurance you will ever buy.
      </p>
    </div>
  );
}

const OUTCOMES = [
  "A clear decision on LLC vs C-Corp vs S-Corp for your actual situation",
  "A state-of-formation pick (Delaware, Wyoming, or your home state) with the reasoning",
  "The operating agreement template I use for Caipher AI LLC — single- and multi-member versions",
  "A formation checklist so you don't co-mingle funds or skip an inspection",
  "An entity decision matrix you can re-run if your situation changes",
];

export default function BusinessFreeModulePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* HERO */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
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
          style={{ background: `radial-gradient(ellipse, ${ACCENT}15 0%, transparent 70%)` }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/verticals/business"
            className="text-xs font-mono text-white/20 hover:text-white transition-colors"
          >
            ← Back to Business Vertical
          </Link>

          <div style={{ height: "40px" }} />

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
              style={{
                color: ACCENT,
                backgroundColor: `${ACCENT}18`,
                border: `1px solid ${ACCENT}40`,
              }}
            >
              Free Module
            </span>
            <span className="text-[11px] font-mono text-white/30">
              MODULE 01 · 2h · Business Vertical
            </span>
          </div>

          <motion.h1
            className="text-5xl md:text-6xl font-black tracking-tight leading-[1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Entity Formation
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/50 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Most builders form their LLC too fast, with a template they never
            read, and pay for it later. This module is the decision framework
            and the templates I used to set up{" "}
            <span className="text-white">Caipher AI LLC</span> — a Wyoming
            holding company with 5 operating subsidiaries. Pick your entity,
            pick your state, file with an operating agreement that actually
            covers the clauses that matter.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mt-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-[#e63946] text-white hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)]"
            >
              Get the Templates <span>↗</span>
            </a>
            <Link
              href="/tools/llc-operating-agreement-generator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              Or use the Generator
            </Link>
          </motion.div>
        </div>
      </section>

      {/* VIDEO PLACEHOLDER */}
      <Section>
        <FadeIn>
          <div
            className="aspect-video rounded-2xl border border-white/[0.06] flex flex-col items-center justify-center text-center px-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(230,57,70,0.04) 0%, rgba(0,0,0,0.4) 100%)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5 border"
              style={{
                borderColor: `${ACCENT}50`,
                backgroundColor: `${ACCENT}15`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={ACCENT}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
              Video Walkthrough
            </p>
            <p className="text-white/30 text-sm">Loom recording dropping this week.</p>
          </div>
        </FadeIn>
      </Section>

      {/* OUTCOMES */}
      <Section title="What you'll have when you're done">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-7">
          {OUTCOMES.map((o, i) => (
            <FadeIn key={i} delay={i * 0.09}>
              <div className="flex items-start gap-3">
                <span
                  className="mt-[10px] w-[6px] h-[6px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: ACCENT }}
                />
                <p className="text-[15px] text-white/60 leading-relaxed">{o}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <Disclaimer />
      </Section>

      {/* STEP 1 — GET THE TEMPLATES */}
      <Section title="Get the templates" number="01">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            The repo is a document pack, not code. Markdown files you can edit
            in any editor: the entity decision matrix, both versions of the
            operating agreement template, the formation checklist, and a
            post-formation 90-day plan.
          </p>
          <CodeBlock lang="bash">{`git clone ${GITHUB_URL}
cd yorksims-business-01-llc-formation
open .   # or just browse the .md files`}</CodeBlock>
          <p className="text-white/40 text-sm mt-4">
            No build step. No dependencies. If you'd rather generate a filled-in
            operating agreement interactively, the{" "}
            <Link href="/tools/llc-operating-agreement-generator" className="underline" style={{ color: ACCENT }}>
              LLC Operating Agreement Generator
            </Link>{" "}
            does that — same template, web form.
          </p>
        </FadeIn>
      </Section>

      {/* STEP 2 — ENTITY CHOICE */}
      <Section title="LLC, C-Corp, or S-Corp — pick the right one" number="02">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            Don't overthink this, but don't get it wrong either. Here's the
            short version of the decision matrix in the repo:
          </p>
          <StaggerUl className="space-y-7 text-white/50 leading-relaxed pl-4">
            <StaggerLi>
              <span className="text-white">LLC</span> — default choice for almost
              every solo founder or small team. Pass-through taxation, flexible
              ownership, minimal paperwork, strong liability shield if you
              capitalize it properly. This is what I use for everything.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">C-Corp (Delaware)</span> — only if you
              are raising venture capital or planning to. VCs require it. Double
              taxation otherwise. Don't do this "just in case" — convert later if
              you actually raise.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">S-Corp election</span> — not an entity,
              a tax election you put on an LLC or C-Corp once profits are high
              enough that the payroll-tax savings beat the added complexity
              (roughly $40k+ in net profit, talk to your CPA).
            </StaggerLi>
          </StaggerUl>
          <p className="text-white/50 leading-relaxed mt-4">
            If you're a builder shipping products and not raising a round: LLC.
            Move on.
          </p>
        </FadeIn>
      </Section>

      {/* STEP 3 — STATE */}
      <Section title="Where to form it" number="03">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            Three real options. The "form in Delaware/Wyoming for the secrets"
            advice is mostly oversold for small companies, but here's the honest
            breakdown:
          </p>
          <StaggerUl className="space-y-7 text-white/50 leading-relaxed pl-4">
            <StaggerLi>
              <span className="text-white">Your home state</span> — simplest. One
              registration, one franchise fee, no foreign-entity filing. If you
              operate physically in one state, this is usually correct.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">Wyoming</span> — what I use for the
              holding company. Strong charging-order protection, low fees, no
              state income tax, decent privacy. Worth it for a holding entity
              that owns other entities.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">Delaware</span> — only if you're going
              the C-Corp / VC route, or you genuinely benefit from the Chancery
              Court for complex multi-party agreements. For a one-person LLC it's
              overhead, not advantage.
            </StaggerLi>
          </StaggerUl>
          <p className="text-white/50 leading-relaxed mt-4">
            Note: forming out-of-state means you may still need to register as a
            "foreign entity" in the state where you actually operate. That's a
            second fee and a second filing. Factor it in.
          </p>
        </FadeIn>
      </Section>

      {/* STEP 4 — SINGLE VS MULTI */}
      <Section title="Single-member or multi-member" number="04">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            This changes the operating agreement substantially, which is why
            the repo ships both versions.
          </p>
          <StaggerUl className="space-y-7 text-white/50 leading-relaxed pl-4">
            <StaggerLi>
              <span className="text-white">Single-member</span> — you're the only
              owner. Taxed as a disregarded entity (income flows to your personal
              return). The operating agreement is short, but you still need one —
              it's part of what proves the LLC is a real separate entity and
              keeps your liability shield intact.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">Multi-member</span> — two or more
              owners. Taxed as a partnership by default. Now the operating
              agreement matters a lot: capital contributions per member,
              ownership percentages, distribution rules, buy-sell provisions,
              right of first refusal, drag/tag rights, vesting. The repo's
              multi-member template has all of these as fill-in sections.
            </StaggerLi>
          </StaggerUl>
          <p className="text-white/50 leading-relaxed mt-4">
            If you have co-founders, do the vesting conversation now, before you
            file. Standard is 4-year vest, 1-year cliff. The template has the
            language. The awkward conversation is cheaper today than after a
            falling out.
          </p>
        </FadeIn>
      </Section>

      {/* STEP 5 — OPERATING AGREEMENT */}
      <Section title="Fill in the operating agreement" number="05">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            Open <code className="text-white/70 bg-white/[0.05] px-2 py-0.5 rounded text-[13px] font-mono">operating-agreement-single-member.md</code>{" "}
            or <code className="text-white/70 bg-white/[0.05] px-2 py-0.5 rounded text-[13px] font-mono">operating-agreement-multi-member.md</code>.
            Every bracketed field is a fill-in. The clauses that people skip and
            regret — these are already in there:
          </p>
          <StaggerUl className="space-y-7 text-white/50 leading-relaxed pl-4">
            <StaggerLi>
              <span className="text-white">Capital contribution math</span> — how
              much each member put in, and the rule for additional contributions.
              Put a real number here. "$10" makes the entity look undercapitalized
              and weakens your shield.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">Distribution rule with a tax-distribution
              floor</span> — the LLC must distribute enough each year to cover the
              members' tax liability on the profits. Otherwise you owe the IRS on
              money you never took home.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">Buy-sell provisions</span> — what
              happens on death, disability, divorce, or a member wanting out.
              Right of first refusal at a fair-market valuation. Boring until you
              need it; impossible to add cheaply after a conflict.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">Management structure</span> —
              member-managed (default, simplest) or manager-managed (cleaner if
              you have passive investors). The template branches both ways.
            </StaggerLi>
          </StaggerUl>
          <p className="text-white/50 leading-relaxed mt-4">
            Then — and I mean this — pay an attorney $400–$800 to review it for
            your state. The template gets you 90% of the way; the attorney
            catches the state-specific 10% that the template can't know about.
          </p>
        </FadeIn>
      </Section>

      {/* STEP 6 — FORMATION CHECKLIST */}
      <Section title="The formation checklist" number="06">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            Filing the Articles of Organization is the easy part. The repo's{" "}
            <code className="text-white/70 bg-white/[0.05] px-2 py-0.5 rounded text-[13px] font-mono">formation-checklist.md</code>{" "}
            covers the parts people skip:
          </p>
          <StaggerUl className="space-y-7 text-white/50 leading-relaxed pl-4">
            <StaggerLi>File Articles of Organization with the Secretary of State</StaggerLi>
            <StaggerLi>Get an EIN from the IRS (free, takes 10 minutes online)</StaggerLi>
            <StaggerLi>
              <span className="text-white">Open a business bank account the same
              week</span> — Mercury, Relay, or a local bank. Do not pay LLC
              expenses from your personal card. Co-mingling for two months
              quietly destroys your liability shield.
            </StaggerLi>
            <StaggerLi>Sign the operating agreement (you + any other members)</StaggerLi>
            <StaggerLi>Log the initial capital contribution as a transfer into the business account</StaggerLi>
            <StaggerLi>Register as a foreign entity in your operating state if you formed elsewhere</StaggerLi>
            <StaggerLi>Set up bookkeeping from day one — even just a spreadsheet, but separate</StaggerLi>
            <StaggerLi>Check whether your state/city requires a business license</StaggerLi>
          </StaggerUl>
        </FadeIn>
      </Section>

      {/* WHAT'S NEXT */}
      <Section title="What's next">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-10 max-w-3xl">
            You now have a properly formed entity, an operating agreement that
            covers the clauses that matter, and a checklist that keeps your
            liability shield intact. Modules 02-06 of the Business vertical go
            deeper — the operating agreement clause-by-clause, holding-company
            structure when you outgrow one entity, equity &amp; vesting
            mechanics, contracts &amp; sales, pricing without undercharging —
            and they&rsquo;re free too, dropping over the coming weeks. Pro
            ($29/mo) is for the monthly live Q&amp;A and the private community;
            Builder ($499/mo) adds direct email access and small-group
            coaching.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-widest bg-[#e63946] text-white hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)]"
            >
              Join Pro — Live Q&amp;A + Community
            </Link>
            <Link
              href="/verticals/business"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-widest border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              ← Back to Business Vertical
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* FOOTER */}
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
