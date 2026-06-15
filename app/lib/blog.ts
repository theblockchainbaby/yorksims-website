/**
 * YorkSims.com — Blog post registry.
 *
 * Single source of truth for blog post metadata. Used by:
 *   - app/blog/page.tsx (listing)
 *   - app/sitemap.ts (SEO)
 *   - app/blog/[slug]/layout.tsx (generateMetadata, future)
 *   - JSON-LD structured data
 */

export interface BlogPost {
  slug: string;
  vertical: string;
  verticalSlug: string;
  title: string;
  excerpt: string;
  date: string; // human-readable
  isoDate: string; // ISO 8601 for sitemap/schema
  readTime: string;
  author: string;
  tags: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "capability-is-not-instruction",
    vertical: "AI Agents",
    verticalSlug: "ai-agents",
    title:
      "Capability Is Not Instruction: A Camera That Cannot Look Unless You Let It",
    excerpt:
      "Your phone taught you to distrust the camera permission you granted. Now we are handing that same coarse permission to AI agents. Here is what enforcing the boundary looks like, with a worker that cannot open the camera unless its manifest says so.",
    date: "Jun 14, 2026",
    isoDate: "2026-06-14",
    readTime: "6 min",
    author: "York Sims",
    tags: ["AI Agents", "AI Safety", "Capabilities", "Nia", "Open Source"],
  },
  {
    slug: "ai-tools-skills-repos",
    vertical: "AI Agents",
    verticalSlug: "ai-agents",
    title: "47 AI Skills, MCP Servers & GitHub Repos That Changed My Workflow",
    excerpt:
      "The ultimate toolkit — Claude Code skills, MCP servers, agent frameworks, local AI, automation engines, and 40+ fresh repos worth watching.",
    date: "Apr 8, 2026",
    isoDate: "2026-04-08",
    readTime: "18 min",
    author: "York Sims",
    tags: ["AI", "Claude Code", "MCP", "Agents", "Tools"],
  },
  {
    slug: "business-runs-without-me",
    vertical: "Business",
    verticalSlug: "business",
    title: "How I Built a Business That Runs Without Me",
    excerpt:
      "The real systems behind Caipher AI LLC. AI agents, automated workflows, and the architecture that lets me build across 10 verticals without burning out.",
    date: "Mar 26, 2026",
    isoDate: "2026-03-26",
    readTime: "14 min",
    author: "York Sims",
    tags: ["Business", "Automation", "Systems", "AI Agents"],
  },
  {
    slug: "building-vitros-saas",
    vertical: "Software",
    verticalSlug: "software",
    title: "Building VitrOS: From Zero to Production SaaS in 30 Days",
    excerpt:
      "Next.js 16, Prisma, PostgreSQL, NextAuth v5, multi-tenant RBAC, PWA offline capability — and it's live. Here's the full build breakdown.",
    date: "Mar 10, 2026",
    isoDate: "2026-03-10",
    readTime: "12 min",
    author: "York Sims",
    tags: ["SaaS", "Next.js", "Postgres", "Multi-tenant"],
  },
  {
    slug: "moltbot-autonomous-ai-agent",
    vertical: "AI Agents",
    verticalSlug: "ai-agents",
    title: "MoltBot: Building a 20-Skill Autonomous AI Agent for Business",
    excerpt:
      "How I built an AI that handles CMO/CEO functions — email, research, outreach, reporting — without touching it. Full architecture breakdown.",
    date: "Mar 5, 2026",
    isoDate: "2026-03-05",
    readTime: "9 min",
    author: "York Sims",
    tags: ["AI Agents", "Automation", "n8n", "OpenAI"],
  },
  {
    slug: "hbm-memory-systemverilog",
    vertical: "Hardware",
    verticalSlug: "hardware",
    title: "HBM Memory Subsystem Design in SystemVerilog",
    excerpt:
      "Building an HBM-style controller with interleaving, ECC, and power states from scratch. What I learned building semiconductor-grade RTL on my own.",
    date: "Feb 28, 2026",
    isoDate: "2026-02-28",
    readTime: "15 min",
    author: "York Sims",
    tags: ["Hardware", "SystemVerilog", "HBM", "RTL", "VLSI"],
  },
  {
    slug: "dualpay-xrp-ledger",
    vertical: "Blockchain",
    verticalSlug: "blockchain",
    title: "Building DualPay: Multi-Payment on the XRP Ledger",
    excerpt:
      "Crypto + fiat in one system. How DualPay handles XRPL transactions, stablecoins, and fiat rails simultaneously — the full technical walkthrough.",
    date: "Feb 20, 2026",
    isoDate: "2026-02-20",
    readTime: "11 min",
    author: "York Sims",
    tags: ["Blockchain", "XRPL", "Crypto", "Payments", "Fintech"],
  },
  {
    slug: "llc-operating-agreement",
    vertical: "Business",
    verticalSlug: "business",
    title: "How I Structured Caipher AI LLC — and What I'd Do Differently",
    excerpt:
      "Entity setup, operating agreements, equity splits, and exit strategies. The real decisions behind building a holding company for multiple SaaS products.",
    date: "Feb 14, 2026",
    isoDate: "2026-02-14",
    readTime: "8 min",
    author: "York Sims",
    tags: ["Business", "Legal", "LLC", "Operating Agreement"],
  },
  {
    slug: "raw-land-development",
    vertical: "Land",
    verticalSlug: "land",
    title: "Developing Raw Land From Scratch: Well, Septic, Power, Permits",
    excerpt:
      "Nobody teaches this. Buying a piece of raw land and turning it into something livable — the permits, the contractors, the county fights, the math.",
    date: "Feb 6, 2026",
    isoDate: "2026-02-06",
    readTime: "10 min",
    author: "York Sims",
    tags: ["Real Estate", "Land", "Development", "Permits"],
  },
  {
    slug: "d1-to-entrepreneur",
    vertical: "Athlete",
    verticalSlug: "athlete",
    title: "From D1 Basketball to Ankara, Turkey to Building a Tech Company",
    excerpt:
      "What playing pro basketball overseas teaches you about business — and why the discipline you built in athletics is your biggest unfair advantage.",
    date: "Jan 30, 2026",
    isoDate: "2026-01-30",
    readTime: "7 min",
    author: "York Sims",
    tags: ["Athlete", "Mindset", "Transition", "Founder"],
  },
  {
    slug: "animation-engine-fal-ai",
    vertical: "Creative Tech",
    verticalSlug: "creative",
    title:
      "The Animation Engine: Turning Product Images into Scroll-Driven Websites",
    excerpt:
      "engine.py: an automated pipeline using fal.ai Nano Banana 2 + Kling 3.0 + ffmpeg. From a product photo to a full Apple-style launch page — with code.",
    date: "Jan 22, 2026",
    isoDate: "2026-01-22",
    readTime: "13 min",
    author: "York Sims",
    tags: ["Creative Tech", "AI", "Animation", "Video"],
  },
];

export const VERTICAL_COLORS: Record<string, string> = {
  Software: "#60a5fa",
  "AI Agents": "#c084fc",
  Hardware: "#eab308",
  Blockchain: "#4ade80",
  Business: "#fb923c",
  Products: "#a78bfa",
  Land: "#f59e0b",
  Athlete: "#22d3ee",
  "Voice Agents": "#06b6d4",
  "Creative Tech": "#f472b6",
};

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return POSTS.slice(0, limit);
  return POSTS.filter(
    (p) => p.slug !== slug && p.verticalSlug === current.verticalSlug
  )
    .concat(POSTS.filter((p) => p.slug !== slug && p.verticalSlug !== current.verticalSlug))
    .slice(0, limit);
}
