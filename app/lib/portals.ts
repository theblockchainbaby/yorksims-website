export interface Vertical {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  desc: string;
  tags: string[];
  route: string;
}

export const VERTICALS: Vertical[] = [
  {
    id: "software",
    num: "01",
    title: "Build Software From Zero",
    shortTitle: "Software",
    desc: "SaaS, full-stack, multi-tenant, deploy to production. VitrOS as the live case study.",
    tags: ["Next.js", "Supabase", "Vercel", "PostgreSQL"],
    route: "/verticals/software",
  },
  {
    id: "ai-agents",
    num: "02",
    title: "AI Agents & Voice Automation",
    shortTitle: "AI Agents",
    desc: "Voice agents, autonomous bots, n8n workflows, white-label AI SaaS.",
    tags: ["ElevenLabs", "MCP", "n8n", "OpenAI"],
    route: "/verticals/ai-agents",
  },
  {
    id: "hardware",
    num: "03",
    title: "Hardware & Semiconductor Engineering",
    shortTitle: "Hardware",
    desc: "RTL design, HBM memory, verification, reliability simulation.",
    tags: ["SystemVerilog", "RTL", "VLSI", "ECC"],
    route: "/verticals/hardware",
  },
  {
    id: "blockchain",
    num: "04",
    title: "Blockchain & Fintech",
    shortTitle: "Blockchain",
    desc: "XRP Ledger, crypto/fiat, Web3 gaming, multi-chain wallet integration.",
    tags: ["XRPL", "EVM", "Solana", "Bitcoin", "DeFi"],
    route: "/verticals/blockchain",
  },
  {
    id: "business",
    num: "05",
    title: "Start & Structure a Business",
    shortTitle: "Business",
    desc: "LLC formation, contracts, pricing, sales pipelines, exits.",
    tags: ["LLC", "Contracts", "Sales", "Operations"],
    route: "/verticals/business",
  },
  {
    id: "products",
    num: "06",
    title: "Physical Products & Manufacturing",
    shortTitle: "Products",
    desc: "Idea to shelf, global sourcing, retail distribution, brand building.",
    tags: ["CPG", "Manufacturing", "Retail", "Sourcing"],
    route: "/verticals/products",
  },
  {
    id: "land",
    num: "07",
    title: "Land & Real Estate Development",
    shortTitle: "Land",
    desc: "Raw land acquisition, permits, well/septic/power from scratch.",
    tags: ["Land", "Development", "Permits", "Zoning"],
    route: "/verticals/land",
  },
  {
    id: "athlete",
    num: "08",
    title: "Athlete to Entrepreneur",
    shortTitle: "Athlete",
    desc: "D1 → pro → builder: discipline, transition, brand building.",
    tags: ["Mindset", "D1", "Performance", "Transition"],
    route: "/verticals/athlete",
  },
  {
    id: "automotive",
    num: "09",
    title: "Vertical SaaS & Voice Agents",
    shortTitle: "Voice Agents",
    desc: "Voice AI agents, white-label SaaS, vertical industry automation.",
    tags: ["Voice", "Vertical SaaS", "White-Label"],
    route: "/verticals/automotive",
  },
  {
    id: "creative",
    num: "10",
    title: "Creative Tech & AI-Powered Production",
    shortTitle: "Creative Tech",
    desc: "Scroll animations, AI video pipelines, Apple-level product launch pages.",
    tags: ["Canvas", "fal.ai", "Kling", "Scroll Animation"],
    route: "/verticals/creative",
  },
];
