"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Nav from "../../../components/Nav";

const ACCENT = "#e63946";
const GITHUB_URL = "https://github.com/theblockchainbaby/yorksims-software-01-schema";

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

const OUTCOMES = [
  "A Prisma schema that prevents cross-tenant data leaks by construction",
  "A Membership table that links Users to Workspaces with roles",
  "Scoped query helpers so every query is workspace-aware",
  "A migration strategy that won't blow up your data later",
  "Seed data so you can demo the app within 5 minutes of cloning",
];

export default function FreeModulePage() {
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
            href="/verticals/software"
            className="text-xs font-mono text-white/20 hover:text-white transition-colors"
          >
            ← Back to Software Vertical
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
              MODULE 01 · 3h · Software Vertical
            </span>
          </div>

          <motion.h1
            className="text-5xl md:text-6xl font-black tracking-tight leading-[1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Schema & Multi-Tenancy
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/50 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Most multi-tenant SaaS apps leak data because the schema makes it easy to.
            This module shows you the schema that makes it{" "}
            <span className="text-white">structurally impossible</span> — pulled
            directly from VitrOS, the SaaS I shipped from empty repo to paying
            customer in 30 days.
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
              Clone Starter Repo <span>↗</span>
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              Join Pro — Live Q&amp;A
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
      </Section>

      {/* STEP 1 — CLONE */}
      <Section title="Clone the starter" number="01">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            The repo is a stripped-down version of the schema layer used in
            VitrOS. Next.js 16, Prisma, Postgres. Nothing else — no auth, no
            payments yet. We'll add those in Modules 02 and 04.
          </p>
          <CodeBlock lang="bash">{`git clone ${GITHUB_URL}
cd yorksims-software-01-schema
pnpm install`}</CodeBlock>
          <p className="text-white/40 text-sm mt-4">
            You need Node 20+, pnpm, and a Postgres database. The README has
            instructions for both local Postgres and Neon (free tier).
          </p>
        </FadeIn>
      </Section>

      {/* STEP 2 — SCHEMA */}
      <Section title="The schema that prevents cross-tenant leaks" number="02">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            Most tutorials hand you a User table and call it multi-tenant
            because there's a `workspaceId` column on everything. That works
            until the day a developer forgets the where clause. Here's the
            shape that makes that impossible:
          </p>
          <CodeBlock lang="prisma">{`model Workspace {
  id        String       @id @default(cuid())
  slug      String       @unique
  name      String
  members   Membership[]
  projects  Project[]
  createdAt DateTime     @default(now())
}

model User {
  id          String       @id @default(cuid())
  email       String       @unique
  memberships Membership[]
  createdAt   DateTime     @default(now())
}

model Membership {
  id          String     @id @default(cuid())
  user        User       @relation(fields: [userId], references: [id])
  userId      String
  workspace   Workspace  @relation(fields: [workspaceId], references: [id])
  workspaceId String
  role        Role       @default(MEMBER)
  createdAt   DateTime   @default(now())

  @@unique([userId, workspaceId])
  @@index([workspaceId])
}

enum Role {
  OWNER
  ADMIN
  MEMBER
}

model Project {
  id          String    @id @default(cuid())
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  workspaceId String
  name        String
  createdAt   DateTime  @default(now())

  @@index([workspaceId])
}`}</CodeBlock>
          <p className="text-white/50 leading-relaxed mt-4">
            Two things to notice. First, <span className="text-white">Membership</span>{" "}
            is the join — Users don't belong to Workspaces directly. Second, every
            tenant-scoped table (Project, and later: Task, Document, Invoice…) gets
            a <span className="text-white">workspaceId</span> with an index. That index
            is non-negotiable. Without it, your queries scan the whole table once
            you have real customers.
          </p>
        </FadeIn>
      </Section>

      {/* STEP 3 — SCOPED QUERIES */}
      <Section title="Scoped query helpers" number="03">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            The way you stop yourself from forgetting the workspaceId filter is to
            never write a query without it. Wrap Prisma in a thin scoped client:
          </p>
          <CodeBlock lang="typescript">{`// lib/db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function scopedDb(workspaceId: string) {
  return {
    project: {
      findMany: (args: Omit<Parameters<typeof prisma.project.findMany>[0], "where"> & {
        where?: Parameters<typeof prisma.project.findMany>[0]["where"];
      } = {}) =>
        prisma.project.findMany({
          ...args,
          where: { ...args.where, workspaceId },
        }),

      create: (data: Omit<Parameters<typeof prisma.project.create>[0]["data"], "workspaceId">) =>
        prisma.project.create({
          data: { ...data, workspaceId },
        }),
    },
    // ...repeat for every tenant-scoped model
  };
}

export { prisma };`}</CodeBlock>
          <p className="text-white/50 leading-relaxed mt-4">
            Usage: <code className="text-white/70 bg-white/[0.05] px-2 py-0.5 rounded text-[13px] font-mono">scopedDb(workspaceId).project.findMany()</code>{" "}
            instead of <code className="text-white/70 bg-white/[0.05] px-2 py-0.5 rounded text-[13px] font-mono">prisma.project.findMany()</code>.
            The compiler now refuses to let you write the unsafe version.
          </p>
        </FadeIn>
      </Section>

      {/* STEP 4 — MIGRATIONS */}
      <Section title="Migrations that won't blow up later" number="04">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            Three rules I learned the hard way:
          </p>
          <StaggerUl className="space-y-7 text-white/50 leading-relaxed pl-4">
            <StaggerLi>
              <span className="text-white">Never edit a migration after it's deployed.</span>{" "}
              Add a new one instead.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">Make additive changes safe by default.</span>{" "}
              New columns get a default value or are nullable. Adding NOT NULL to
              an existing column needs a backfill migration first.
            </StaggerLi>
            <StaggerLi>
              <span className="text-white">Renames are two migrations, not one.</span>{" "}
              Add the new column, copy data, deploy. Drop the old column, deploy.
              Otherwise old-version pods break during a rolling deploy.
            </StaggerLi>
          </StaggerUl>
          <CodeBlock lang="bash">{`# Generate a new migration after editing schema.prisma
pnpm prisma migrate dev --name add_projects

# Apply pending migrations in production
pnpm prisma migrate deploy`}</CodeBlock>
        </FadeIn>
      </Section>

      {/* STEP 5 — SEED */}
      <Section title="Seed data so the app works on first clone" number="05">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-6">
            The repo ships with a seed that creates a demo workspace, a demo
            user, and a handful of projects so you can run the app immediately:
          </p>
          <CodeBlock lang="bash">{`pnpm prisma db seed`}</CodeBlock>
          <CodeBlock lang="typescript">{`// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const ws = await prisma.workspace.create({
    data: { slug: "demo", name: "Demo Workspace" },
  });
  const user = await prisma.user.create({
    data: { email: "demo@yorksims.com" },
  });
  await prisma.membership.create({
    data: { userId: user.id, workspaceId: ws.id, role: "OWNER" },
  });
  await prisma.project.createMany({
    data: [
      { workspaceId: ws.id, name: "Onboarding" },
      { workspaceId: ws.id, name: "Marketing site" },
      { workspaceId: ws.id, name: "Q3 launches" },
    ],
  });
}

main().finally(() => prisma.$disconnect());`}</CodeBlock>
        </FadeIn>
      </Section>

      {/* WHAT'S NEXT */}
      <Section title="What's next">
        <FadeIn>
          <p className="text-white/50 leading-relaxed mb-10 max-w-3xl">
            You now have a multi-tenant schema you can&rsquo;t accidentally leak
            data across. Modules 02-06 build the rest of VitrOS — auth, the app
            shell, Stripe payments, the PWA layer, the admin panel — and
            they&rsquo;re free too, dropping over the coming weeks. Pro
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
              href="/verticals/software"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-widest border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              ← Back to Software Vertical
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
