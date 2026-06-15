/**
 * Rich content for every vertical. Rendered by app/verticals/[slug]/page.tsx.
 * Keyed by vertical id (matches VERTICALS.id in portals.ts).
 */

export interface VerticalModule {
  num: string;
  title: string;
  summary: string;
  hours: string;
  /** Marks the Free-tier module for this vertical. At most one per vertical. */
  free?: boolean;
  /** Optional click-through (module landing page or external resource). */
  cta?: { label: string; href: string };
}

export interface VerticalContent {
  longDescription: string;
  heroStatement: string;
  outcomes: string[];
  modules: VerticalModule[];
  stack: string[];
  caseStudy: {
    name: string;
    summary: string;
    metrics: string[];
  };
  relatedPostSlugs: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const VERTICAL_CONTENT: Record<string, VerticalContent> = {
  software: {
    heroStatement:
      "Ship production SaaS in 30 days. Real stack, real users, real revenue.",
    longDescription:
      "The Software vertical walks you through building a multi-tenant SaaS from empty repo to paying customers using Next.js 16, PostgreSQL, Prisma, NextAuth v5, Stripe, and Vercel. No demo projects. The case study is VitrOS — a real product I shipped in 30 days that is live and generating revenue today. You get the schema, the Stripe webhook handlers, the role-based access control, the PWA offline queue, and every painful lesson I learned along the way.",
    outcomes: [
      "Design a multi-tenant Postgres schema that prevents cross-workspace data leaks",
      "Wire NextAuth v5 with email, OAuth, and session management in under an hour",
      "Build a Stripe subscription flow that survives webhook replays and retries",
      "Ship a PWA with offline write queueing using IndexedDB",
      "Deploy to Vercel with branch previews and automatic rollbacks",
      "Build a functional admin panel on day one instead of day thirty",
    ],
    modules: [
      {
        num: "01",
        title: "Schema & Multi-Tenancy",
        summary:
          "Prisma schema, Membership table, scoped query helpers, migration strategy.",
        hours: "3h",
        free: true,
        cta: {
          label: "Start Free Module",
          href: "/verticals/software/free-module",
        },
      },
      {
        num: "02",
        title: "Auth & Access Control",
        summary:
          "NextAuth v5, OAuth, email verification, role-based middleware, session debugging.",
        hours: "2h",
      },
      {
        num: "03",
        title: "Core UI & State",
        summary:
          "App shell, workspace switcher, shadcn/ui, Framer Motion, optimistic updates.",
        hours: "4h",
      },
      {
        num: "04",
        title: "Payments & Webhooks",
        summary:
          "Stripe Checkout, subscription state machine, webhook idempotency, dunning.",
        hours: "3h",
      },
      {
        num: "05",
        title: "PWA & Offline",
        summary:
          "Service worker, cache strategy, IndexedDB queue, sync on reconnect.",
        hours: "2h",
      },
      {
        num: "06",
        title: "Admin Panel & Observability",
        summary:
          "Internal tools, audit logs, Sentry, metrics dashboard, on-call runbook.",
        hours: "2h",
      },
    ],
    stack: [
      "Next.js 16",
      "PostgreSQL",
      "Prisma",
      "NextAuth v5",
      "Stripe",
      "Tailwind 4",
      "Vercel",
      "shadcn/ui",
    ],
    caseStudy: {
      name: "VitrOS",
      summary:
        "A visual ops system for small teams. Built from empty repo to first paying customer in 30 days. Currently generating mid-four-figure MRR.",
      metrics: [
        "30 days — zero to paying customer",
        "$4,200+ MRR and growing",
        "100% test coverage on Stripe webhook handlers",
        "Sub-90s production deploys",
      ],
    },
    relatedPostSlugs: ["building-vitros-saas", "llc-operating-agreement"],
    seo: {
      title: "Build SaaS From Zero — Software Vertical | YorkSims.com",
      description:
        "Ship production SaaS in 30 days. Next.js 16, Postgres, Prisma, Stripe, multi-tenant RBAC, PWA. Real case study: VitrOS generating $4,200+ MRR.",
      keywords: [
        "SaaS",
        "Next.js 16",
        "multi-tenant",
        "Stripe",
        "Postgres",
        "indie SaaS",
        "production",
      ],
    },
  },

  "ai-agents": {
    heroStatement:
      "Build autonomous AI agents that actually ship work. Not demos. Not chatbots.",
    longDescription:
      "The AI Agents vertical is the playbook behind MoltBot — my 20-skill autonomous agent that runs email, lead gen, outreach, reporting, and content scheduling with 85% autonomy. You learn how to architect multi-skill agents, orchestrate them with n8n, integrate function-calling, build trust incrementally through shadow → draft → autonomous modes, and avoid the failure modes that kill most agent projects.",
    outcomes: [
      "Architect multi-skill agents that fail gracefully instead of collapsing on one error",
      "Use function calling with strict JSON schemas to eliminate output parsing",
      "Orchestrate 20+ agents with n8n workflows and Supabase logging",
      "Build the 3-phase trust model (shadow → draft → autonomous) that keeps you safe",
      "Defend against prompt injection, tool failures, and infinite loops",
      "Reduce operational cost to under $250/month for a full back-office replacement",
    ],
    modules: [
      {
        num: "01",
        title: "Agent Architecture",
        summary:
          "Multi-skill vs monolithic, when to split, how to route, shared state design.",
        hours: "2h",
      },
      {
        num: "02",
        title: "Function Calling Deep Dive",
        summary:
          "JSON schema contracts, tool design, response validation, fallbacks.",
        hours: "3h",
      },
      {
        num: "03",
        title: "n8n Orchestration",
        summary:
          "Triggers, workflow composition, error handling, scheduled jobs.",
        hours: "3h",
      },
      {
        num: "04",
        title: "Trust Model Implementation",
        summary:
          "Shadow mode, draft queues, approval flows, autonomous graduation.",
        hours: "2h",
      },
      {
        num: "05",
        title: "Failure Defenses",
        summary:
          "Prompt injection sanitization, tool timeouts, circuit breakers, loop detection.",
        hours: "2h",
      },
      {
        num: "06",
        title: "Observability & Feedback",
        summary:
          "Logging every action, daily audit reviews, prompt iteration playbook.",
        hours: "2h",
      },
    ],
    stack: [
      "n8n",
      "Claude API",
      "OpenAI API",
      "Supabase",
      "ElevenLabs",
      "Persona KYB",
      "Zapier",
    ],
    caseStudy: {
      name: "MoltBot",
      summary:
        "20-skill autonomous agent running CMO/CEO-adjacent work across email, leads, content, meetings, and reporting. Handles 85% of inbound email without intervention.",
      metrics: [
        "20 skills running in production",
        "85% inbound email handled autonomously",
        "$180/month in total token spend",
        "25-30 hours/week saved on operational work",
      ],
    },
    relatedPostSlugs: [
      "moltbot-autonomous-ai-agent",
      "ai-tools-skills-repos",
      "business-runs-without-me",
    ],
    seo: {
      title: "Build Autonomous AI Agents — AI Agents Vertical | YorkSims.com",
      description:
        "The MoltBot playbook: 20-skill autonomous agents, function calling, n8n orchestration, trust models. Handles 85% of back-office work for under $250/mo.",
      keywords: [
        "AI agents",
        "autonomous agents",
        "n8n",
        "Claude",
        "OpenAI",
        "function calling",
        "MoltBot",
      ],
    },
  },

  hardware: {
    heroStatement:
      "Write semiconductor-grade SystemVerilog. Build the memory controllers other people read about.",
    longDescription:
      "The Hardware vertical is for the 0.1% of builders who want to go deep on RTL design. You will build an HBM-style memory controller from scratch in SystemVerilog: address mapper, command scheduler, bank state machines, ECC, power manager, and refresh engine. You learn the timing constraints nobody explains in textbooks, how to debug with Verilator, and why random stimulus finds bugs directed tests never will.",
    outcomes: [
      "Design a multi-channel DRAM controller with bank-level parallelism",
      "Implement SECDED ECC at the bank level with correctable/uncorrectable error handling",
      "Build a command scheduler that respects 20+ timing constraints simultaneously",
      "Handle refresh, power-down, and self-refresh without data loss",
      "Debug synchronous logic with assertion-based scoreboarding",
      "Run random-stimulus testing that catches bugs directed tests miss",
    ],
    modules: [
      {
        num: "01",
        title: "SystemVerilog Fundamentals",
        summary:
          "Modules, always blocks, synthesis vs simulation semantics, common pitfalls.",
        hours: "4h",
      },
      {
        num: "02",
        title: "Memory Architecture",
        summary:
          "DDR vs HBM, banks, channels, rows, columns, timing parameters explained.",
        hours: "3h",
      },
      {
        num: "03",
        title: "Command Scheduler",
        summary:
          "Request queue, bank tracking, reorder logic, stall minimization.",
        hours: "4h",
      },
      {
        num: "04",
        title: "ECC & Data Path",
        summary:
          "Hamming codes, SECDED implementation, error reporting, recovery.",
        hours: "3h",
      },
      {
        num: "05",
        title: "Power & Refresh",
        summary:
          "Power states, transition timing, refresh scheduling, thermal considerations.",
        hours: "2h",
      },
      {
        num: "06",
        title: "Verification",
        summary:
          "Verilator setup, assertions, scoreboards, random stimulus harness.",
        hours: "3h",
      },
    ],
    stack: [
      "SystemVerilog",
      "Verilator",
      "GTKWave",
      "Cocotb",
      "Icarus",
      "VCS",
    ],
    caseStudy: {
      name: "HBM Memory Subsystem",
      summary:
        "4,500-line SystemVerilog HBM-style controller. Runs in Verilator, passes directed + random stimulus tests, models multi-channel bank parallelism with ECC and power states.",
      metrics: [
        "4,500 lines of production-style SystemVerilog",
        "3 critical bugs caught by random stimulus (missed by directed tests)",
        "10× bandwidth difference between lazy and optimal scheduler",
        "Full refresh timing validation under burst traffic",
      ],
    },
    relatedPostSlugs: ["hbm-memory-systemverilog"],
    seo: {
      title: "HBM Memory Controller in SystemVerilog | YorkSims.com",
      description:
        "Build a production-style HBM memory controller from scratch. SystemVerilog, Verilator, ECC, bank parallelism, power states. The deep-dive nobody else ships.",
      keywords: [
        "SystemVerilog",
        "HBM",
        "memory controller",
        "RTL",
        "VLSI",
        "Verilator",
        "ECC",
      ],
    },
  },

  blockchain: {
    heroStatement:
      "Build a multi-rail payment system. XRPL, stablecoins, and fiat in one product.",
    longDescription:
      "The Blockchain vertical covers DualPay — my cross-border payment system that settles in under 5 seconds across three rails (XRPL native, stablecoins, and fiat via Stripe). You learn XRPL transaction handling with xrpl.js, idempotency patterns using memo fields, reconciliation services that catch stuck transactions, volatility buffer management, and the KYB compliance layer you cannot skip.",
    outcomes: [
      "Submit idempotent XRPL transactions that survive network retries",
      "Route the same transfer through XRPL, stablecoin, or fiat rails based on sender/receiver",
      "Build a reconciliation service that catches the 0.25% of stuck transactions",
      "Manage volatility buffers without eating margin on small transfers",
      "Integrate KYB (Persona) and OFAC screening before routing",
      "Architect a multi-rail payment system that scales from $1 to $10M",
    ],
    modules: [
      {
        num: "01",
        title: "XRPL Fundamentals",
        summary:
          "Ledger model, transaction types, fees, validation, why XRPL for payments.",
        hours: "2h",
      },
      {
        num: "02",
        title: "xrpl.js Integration",
        summary:
          "Wallet management, transaction submission, memo-based idempotency, error paths.",
        hours: "3h",
      },
      {
        num: "03",
        title: "Multi-Rail Routing",
        summary:
          "Rail selection logic, quote engine, slippage buffers, bridge transactions.",
        hours: "3h",
      },
      {
        num: "04",
        title: "Reconciliation Service",
        summary:
          "Pending transfer tracking, ground truth queries, status updates, manual queue.",
        hours: "2h",
      },
      {
        num: "05",
        title: "Stablecoins & Market Making",
        summary:
          "RLUSD integration, XRPL DEX, inventory management, rebalancing.",
        hours: "2h",
      },
      {
        num: "06",
        title: "Compliance Layer",
        summary:
          "Persona KYB flow, OFAC screening, transaction limits, manual review workflow.",
        hours: "2h",
      },
    ],
    stack: [
      "XRPL",
      "xrpl.js",
      "Stripe",
      "Persona",
      "Supabase",
      "RLUSD",
      "Node.js",
    ],
    caseStudy: {
      name: "DualPay",
      summary:
        "Three-rail payment system settling on XRPL. Median settlement 4.2 seconds, median fee 3 cents, reconciliation service catches edge cases in the 0.25% of transfers that fall through.",
      metrics: [
        "4.2s median settlement time",
        "3¢ median transaction fee",
        "0.25% of transfers route to manual review",
        "Mid-5-figure daily volume",
      ],
    },
    relatedPostSlugs: ["dualpay-xrp-ledger"],
    seo: {
      title: "Multi-Rail Crypto Payment System — Blockchain | YorkSims.com",
      description:
        "Build DualPay: a 3-rail payment system on XRPL with stablecoins, fiat bridging, reconciliation, and compliance. 4-second settlement. 3-cent fees.",
      keywords: [
        "XRPL",
        "XRP Ledger",
        "DualPay",
        "crypto payments",
        "stablecoin",
        "Stripe",
        "fintech",
      ],
    },
  },

  business: {
    heroStatement:
      "Structure your company right the first time. LLC, contracts, pricing, exit strategy.",
    longDescription:
      "The Business vertical is the unglamorous foundation every builder skips until it hurts. You get the exact operating agreement I use for Caipher AI LLC, the holding-company structure, equity splits with vesting, buy-sell provisions, how to price your product without undercharging, and exit strategy thinking even when you are not exiting. No legal advice — real-world playbooks from a founder running 10 verticals under one entity.",
    outcomes: [
      "Decide between single-member, holding company, or series LLC based on your stage",
      "Draft an operating agreement with the clauses that matter (distributions, buy-sell, capital)",
      "Structure equity vesting with cliffs, acceleration, and drag/tag rights",
      "Price your product 2× to 5× higher without flinching",
      "Separate personal and business finances from day one to preserve your liability shield",
      "Think about exit strategy during formation so structure supports it later",
    ],
    modules: [
      {
        num: "01",
        title: "Entity Formation",
        summary:
          "LLC vs C-Corp vs S-Corp, Delaware vs Wyoming, single vs multi-member. Ships with the operating agreement template and formation checklist.",
        hours: "2h",
        free: true,
        cta: { label: "Start Free Module", href: "/verticals/business/free-module" },
      },
      {
        num: "02",
        title: "Operating Agreement Deep Dive",
        summary:
          "Manager vs member managed, distributions, buy-sell, capital contribution math.",
        hours: "3h",
      },
      {
        num: "03",
        title: "Holding Company Structure",
        summary:
          "When to use it, subsidiary setup, inter-company transfers, accounting separation.",
        hours: "2h",
      },
      {
        num: "04",
        title: "Equity & Vesting",
        summary:
          "Founder splits, vesting schedules, acceleration, drag/tag, pro-rata rights.",
        hours: "2h",
      },
      {
        num: "05",
        title: "Contracts & Sales",
        summary:
          "MSAs, SOWs, deal desk basics, objection handling, closing.",
        hours: "3h",
      },
      {
        num: "06",
        title: "Pricing & Monetization",
        summary:
          "Value-based pricing, tiers, anchor prices, price increases, discount discipline.",
        hours: "2h",
      },
    ],
    stack: [
      "Wyoming LLC",
      "Delaware sub-LLCs",
      "Stripe",
      "Mercury Bank",
      "Pilot bookkeeping",
      "Ironclad",
    ],
    caseStudy: {
      name: "Caipher AI LLC",
      summary:
        "Wyoming holding company owning 5 operating subsidiaries across SaaS, AI agents, fintech, real estate, and creative tech. Clean separation, shared admin, single tax filing strategy.",
      metrics: [
        "5 operating subsidiaries under one holding entity",
        "7 months from formation to fully operational across verticals",
        "$800 initial attorney spend saved $4k in restructuring later",
        "Zero co-mingled transactions since month 3",
      ],
    },
    relatedPostSlugs: ["llc-operating-agreement", "business-runs-without-me"],
    seo: {
      title: "Start & Structure a Business — Business Vertical | YorkSims.com",
      description:
        "LLC formation, operating agreements, equity splits, pricing, and exit strategy. The exact playbook behind Caipher AI LLC — a 5-subsidiary holding company.",
      keywords: [
        "LLC",
        "operating agreement",
        "holding company",
        "business structure",
        "Wyoming LLC",
        "startup legal",
      ],
    },
  },

  products: {
    heroStatement:
      "Take a physical product from idea to shelf. Manufacturing, sourcing, distribution.",
    longDescription:
      "The Physical Products vertical covers the stuff most tech founders never touch: global sourcing, contract manufacturing, retail distribution, and building a brand around something you can hold. You learn how to source from overseas without getting ripped off, negotiate MOQs, manage quality control, build retail relationships, and scale from 100 units to 100,000 without your margins collapsing.",
    outcomes: [
      "Source manufacturers from Alibaba, 1688, and trade shows without getting scammed",
      "Negotiate MOQs, lead times, and quality control protocols",
      "Manage landed cost calculations (tariffs, freight, duties, warehousing)",
      "Build retail distribution through direct, wholesale, and Amazon",
      "Protect your margins as you scale production runs",
      "Handle the logistics tail: returns, warranty, reverse logistics",
    ],
    modules: [
      {
        num: "01",
        title: "Product Validation",
        summary:
          "Market sizing, prototype testing, pricing research, pre-order campaigns.",
        hours: "2h",
      },
      {
        num: "02",
        title: "Sourcing & Manufacturing",
        summary:
          "Finding factories, vetting samples, MOQ negotiation, QC protocols.",
        hours: "3h",
      },
      {
        num: "03",
        title: "Landed Cost Math",
        summary:
          "COGS, freight, tariffs, warehousing, returns, margin modeling.",
        hours: "2h",
      },
      {
        num: "04",
        title: "Distribution Channels",
        summary:
          "DTC, wholesale, Amazon FBA, retail pitches, trade shows.",
        hours: "3h",
      },
      {
        num: "05",
        title: "Brand & Packaging",
        summary:
          "Identity design, unboxing, sustainability, storytelling.",
        hours: "2h",
      },
      {
        num: "06",
        title: "Scaling Operations",
        summary:
          "3PL selection, inventory forecasting, cash flow, second product launch.",
        hours: "2h",
      },
    ],
    stack: [
      "Alibaba",
      "1688",
      "Flexport",
      "ShipBob",
      "Shopify",
      "Amazon Seller Central",
      "QuickBooks",
    ],
    caseStudy: {
      name: "Product Vertical Case Study",
      summary:
        "Playbook from a sourcing-to-shelf run: validated demand with a pre-order campaign, sourced two suppliers, negotiated MOQ from 5,000 down to 1,500, shipped to US warehouse, launched on Shopify and Amazon in the same week.",
      metrics: [
        "1,500 MOQ negotiated (from 5,000)",
        "18% landed cost reduction vs initial quote",
        "Launched on 2 channels simultaneously",
        "Break-even at unit 840",
      ],
    },
    relatedPostSlugs: ["llc-operating-agreement"],
    seo: {
      title: "Physical Products & Manufacturing | YorkSims.com",
      description:
        "From idea to shelf: sourcing, MOQ negotiation, landed cost, retail distribution. The physical product playbook for tech founders.",
      keywords: [
        "physical products",
        "manufacturing",
        "Alibaba",
        "sourcing",
        "Amazon FBA",
        "Shopify",
        "CPG",
      ],
    },
  },

  land: {
    heroStatement:
      "Buy raw land. Turn it into something livable. 100% equity gain, no lender required.",
    longDescription:
      "The Land vertical is the deepest-water vertical on the platform. You learn how to find raw land that can actually be developed, how to do the due diligence that protects you from unbuildable dirt, and how to install wells, septic systems, power, and driveways. This is a real-world playbook from a parcel I bought, improved, and now owns with $76k of equity built from physical work.",
    outcomes: [
      "Run the 8-item pre-purchase due diligence checklist that catches unbuildable parcels",
      "Negotiate land purchases with contingencies that protect you",
      "Spec and install a well (and know what to do if it comes up dry)",
      "Choose between conventional, mound, and ATU septic systems based on perc results",
      "Price power: utility trench vs off-grid solar decisions",
      "Navigate 7+ separate permits without losing 6 months",
    ],
    modules: [
      {
        num: "01",
        title: "Finding Developable Land",
        summary:
          "Listing sources, zoning lookups, off-market deals, negotiating with sellers.",
        hours: "2h",
      },
      {
        num: "02",
        title: "Due Diligence Checklist",
        summary:
          "Zoning, access, water, perc, power, flood zones, wetlands, survey.",
        hours: "3h",
      },
      {
        num: "03",
        title: "Well Installation",
        summary:
          "Driller selection, contract terms, dry hole risk, water testing.",
        hours: "2h",
      },
      {
        num: "04",
        title: "Septic Systems",
        summary:
          "Perc test interpretation, system selection, permit process, inspections.",
        hours: "3h",
      },
      {
        num: "05",
        title: "Power & Driveway",
        summary:
          "Utility coordination, trenching, off-grid alternatives, driveway engineering.",
        hours: "2h",
      },
      {
        num: "06",
        title: "Permits & Inspections",
        summary:
          "Permit stack, inspection scheduling, engineer hiring, county politics.",
        hours: "2h",
      },
    ],
    stack: [
      "Zillow Land",
      "LandWatch",
      "Parcel Fact",
      "Civil engineer",
      "Well driller",
      "Septic installer",
    ],
    caseStudy: {
      name: "10-Acre Development",
      summary:
        "Bought 10 acres for $38k, spent $60k on improvements (well, septic, power, driveway, permits), landed at $175k appraised value. $76k equity gain in 7 months.",
      metrics: [
        "$38k land + $60k improvements = $98k total",
        "$175k appraised after improvements",
        "$76k equity gain in 7 months",
        "Well, septic, power, driveway all code-compliant",
      ],
    },
    relatedPostSlugs: ["raw-land-development"],
    seo: {
      title: "Raw Land Development — Land Vertical | YorkSims.com",
      description:
        "Buy raw land, install wells and septic, run power, fight permits, build equity. Real playbook from a 10-acre development with $76k equity gain.",
      keywords: [
        "raw land",
        "land development",
        "well drilling",
        "septic system",
        "permits",
        "real estate",
      ],
    },
  },

  athlete: {
    heroStatement:
      "D1 to pro to founder. Turn your discipline into an unfair business advantage.",
    longDescription:
      "The Athlete vertical is the bridge I wish existed when I was transitioning from pro basketball in Ankara back to building companies. It is a tactical playbook for former (or current) athletes moving into business, tech, or investing. You learn which habits transfer, which do not, and why the discipline you built in 10,000 hours of deliberate practice is a bigger advantage than most founders realize.",
    outcomes: [
      "Identify which athletic habits transfer directly to business and which need translation",
      "Build a deliberate-practice framework for learning new business skills fast",
      "Translate team sports dynamics into co-founder and team management",
      "Use film-session methodology for code review, sales reviews, and strategy reviews",
      "Manage the loneliness transition out of locker-room culture",
      "Apply the 18-month skill acquisition model to business competencies",
    ],
    modules: [
      {
        num: "01",
        title: "Transition Framework",
        summary:
          "What transfers, what does not, how to reframe identity after sport.",
        hours: "2h",
      },
      {
        num: "02",
        title: "Deliberate Practice for Business",
        summary:
          "Coach selection, feedback loops, measurement, 18-month skill acquisition.",
        hours: "2h",
      },
      {
        num: "03",
        title: "Film Sessions",
        summary:
          "Code reviews, sales call reviews, strategy reviews as weekly rituals.",
        hours: "2h",
      },
      {
        num: "04",
        title: "Team Dynamics Translation",
        summary:
          "Co-founder selection, team building, leadership vs captain role.",
        hours: "2h",
      },
      {
        num: "05",
        title: "Pain Wall Management",
        summary:
          "Recognizing conditioning patterns in fundraising, launches, and bad quarters.",
        hours: "1h",
      },
      {
        num: "06",
        title: "The Lonely Transition",
        summary:
          "Locker-room replacement, community building, mental health realities.",
        hours: "1h",
      },
    ],
    stack: [
      "Notion",
      "Loom",
      "Calendly",
      "Discord",
      "Journal practice",
    ],
    caseStudy: {
      name: "D1 → Pro → Founder",
      summary:
        "Played D1 basketball, went pro overseas in Ankara, Turkey, returned and built Caipher AI LLC across 10 verticals. The playbook is lived, not theoretical.",
      metrics: [
        "4 years D1 college basketball",
        "Pro contract in Ankara, Turkey",
        "10 verticals now shipping under one holding company",
        "5:30 AM daily build sessions since transition",
      ],
    },
    relatedPostSlugs: ["d1-to-entrepreneur", "business-runs-without-me"],
    seo: {
      title: "Athlete to Entrepreneur — Transition Playbook | YorkSims.com",
      description:
        "D1 basketball to pro overseas to building 10 verticals. The tactical playbook for athletes transitioning to business, tech, or investing.",
      keywords: [
        "athlete to entrepreneur",
        "D1 basketball",
        "sport to business",
        "transition",
        "discipline",
        "founder mindset",
      ],
    },
  },

  automotive: {
    heroStatement:
      "Vertical SaaS + voice agents. Dominate a niche industry and automate the phones.",
    longDescription:
      "The Voice Agents / Vertical SaaS track teaches you how to build a software product for a specific industry (automotive, dental, home services, legal) paired with a voice AI agent that handles inbound and outbound calls. You learn ElevenLabs integration, conversational flow design, CRM routing, call transcription and summary, and the playbook to white-label the system for multiple clients.",
    outcomes: [
      "Choose a vertical market with voice-heavy workflows",
      "Build a voice agent with ElevenLabs that handles 80% of inbound calls",
      "Design conversational flows that feel natural and know when to escalate",
      "Integrate call data with CRM, scheduling, and lead management",
      "White-label the system for multi-tenant delivery to small business clients",
      "Price a vertical SaaS + voice agent offering at $500-$2000/month per location",
    ],
    modules: [
      {
        num: "01",
        title: "Vertical Selection",
        summary:
          "Which verticals work for voice, industry research, competitor analysis.",
        hours: "2h",
      },
      {
        num: "02",
        title: "Voice Agent Architecture",
        summary:
          "ElevenLabs, speech-to-text, intent detection, response generation.",
        hours: "3h",
      },
      {
        num: "03",
        title: "Conversational Flow Design",
        summary:
          "Happy path, edge cases, escalation triggers, confirmation patterns.",
        hours: "3h",
      },
      {
        num: "04",
        title: "CRM & Scheduling Integration",
        summary:
          "Twilio, Calendly API, HubSpot, call disposition workflows.",
        hours: "2h",
      },
      {
        num: "05",
        title: "Multi-Tenant White-Labeling",
        summary:
          "Client onboarding, custom voices, per-tenant configuration.",
        hours: "2h",
      },
      {
        num: "06",
        title: "Sales & Pricing",
        summary:
          "Vertical-specific sales pitch, pricing tiers, success metrics.",
        hours: "2h",
      },
    ],
    stack: [
      "ElevenLabs",
      "Twilio",
      "Deepgram",
      "OpenAI Realtime",
      "Supabase",
      "Next.js",
      "Stripe",
    ],
    caseStudy: {
      name: "Otto Voice Agent",
      summary:
        "Inbound/outbound voice AI handling 75% of calls across Caipher subsidiaries. Books appointments, qualifies leads, answers FAQs, routes the 25% that need a human.",
      metrics: [
        "75% of inbound calls resolved without human routing",
        "Sub-300ms voice response latency",
        "Works across 6 different business phone numbers",
        "Full call transcripts synced to CRM automatically",
      ],
    },
    relatedPostSlugs: ["moltbot-autonomous-ai-agent", "business-runs-without-me"],
    seo: {
      title: "Voice Agents & Vertical SaaS | YorkSims.com",
      description:
        "Build voice AI agents and white-label them as vertical SaaS. ElevenLabs, Twilio, CRM integration, multi-tenant delivery. $500-$2000/month pricing playbook.",
      keywords: [
        "voice agents",
        "vertical SaaS",
        "ElevenLabs",
        "Twilio",
        "voice AI",
        "white label",
      ],
    },
  },

  creative: {
    heroStatement:
      "Ship Apple-grade product launch pages with AI pipelines. $14.50 per animation instead of $8,000.",
    longDescription:
      "The Creative Tech vertical is the fast-moving edge of AI-powered production. You learn how to build automated pipelines that turn a single product photo into a scroll-driven launch page with smooth 240-frame animations, using fal.ai, Kling 3.0, and ffmpeg. You also cover color correction, scroll-driven frontend patterns, and the failure modes of image-to-video AI.",
    outcomes: [
      "Build an end-to-end AI pipeline from product photo to 240-frame animation",
      "Use fal.ai Nano Banana 2 for high-quality image variations",
      "Use Kling 3.0 for smooth motion interpolation between keyframes",
      "Fix color drift, handle refractive materials, and know when to exclude faces",
      "Implement a scroll-driven React component with progressive frame preloading",
      "Ship a launch page in 90 minutes for under $15 in AI costs",
    ],
    modules: [
      {
        num: "01",
        title: "Pipeline Architecture",
        summary:
          "Stage breakdown, tool selection, Python glue, asset management.",
        hours: "2h",
      },
      {
        num: "02",
        title: "Image Generation with fal.ai",
        summary:
          "Nano Banana 2 setup, keyframe prompts, style consistency.",
        hours: "2h",
      },
      {
        num: "03",
        title: "Video Interpolation with Kling",
        summary:
          "Motion prompts, transition length, quality vs cost tradeoffs.",
        hours: "2h",
      },
      {
        num: "04",
        title: "Color & Consistency Fixes",
        summary:
          "Color drift detection, hue clamping, frame-by-frame QC.",
        hours: "2h",
      },
      {
        num: "05",
        title: "Frontend Scroll Engine",
        summary:
          "React + Framer Motion, frame mapping, progressive preload, caching.",
        hours: "3h",
      },
      {
        num: "06",
        title: "Productization",
        summary:
          "Web-based interface, queue worker, progress UI, pricing.",
        hours: "2h",
      },
    ],
    stack: [
      "fal.ai",
      "Nano Banana 2",
      "Kling 3.0",
      "ffmpeg",
      "Python",
      "Next.js",
      "Framer Motion",
    ],
    caseStudy: {
      name: "Animation Engine",
      summary:
        "600-line Python pipeline that takes a single product photo and outputs 240 frames of scroll-driven animation. Shipped 7 product launch pages for under $120 total.",
      metrics: [
        "240 frames per animation at 2560×1440",
        "$14.50 cost per full animation",
        "90 minutes from photo to shippable frames",
        "7 launch pages shipped, ~$30k traditional cost avoided",
      ],
    },
    relatedPostSlugs: ["animation-engine-fal-ai"],
    seo: {
      title: "AI Animation Engine & Product Launches | YorkSims.com",
      description:
        "Automated scroll-driven product launch pages using fal.ai, Kling 3.0, and ffmpeg. 240 frames for $14.50. The full Animation Engine pipeline.",
      keywords: [
        "animation engine",
        "fal.ai",
        "Kling",
        "scroll animation",
        "product launch",
        "AI video",
      ],
    },
  },
};

export function getVerticalContent(
  slug: string
): VerticalContent | undefined {
  return VERTICAL_CONTENT[slug];
}
