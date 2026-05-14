/**
 * YorkSims.com — Free tools registry.
 *
 * Each tool is a lead magnet. Tools live at /tools/[slug]. Shipped tools
 * are rendered on the /tools index + the sitemap. "Coming soon" tools are
 * listed for SEO anchor value but don't yet have their own page.
 */

export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  vertical: string;
  verticalSlug: string;
  description: string;
  status: "shipped" | "coming-soon";
  keywords: string[];
}

export const TOOLS: Tool[] = [
  {
    slug: "llc-operating-agreement-generator",
    title: "LLC Operating Agreement Generator",
    shortTitle: "LLC Operating Agreement",
    vertical: "Business",
    verticalSlug: "business",
    description:
      "Answer 6 questions and get a free, state-customized LLC operating agreement draft. Single-member or multi-member, member- or manager-managed. Not legal advice — but a serious starting point.",
    status: "shipped",
    keywords: [
      "llc operating agreement",
      "llc operating agreement template",
      "free llc operating agreement",
      "single member llc operating agreement",
      "multi member llc",
    ],
  },
  {
    slug: "raw-land-due-diligence-checklist",
    title: "Raw Land Due Diligence Checklist",
    shortTitle: "Raw Land Checklist",
    vertical: "Land",
    verticalSlug: "land",
    description:
      "The 8-item checklist that protects you from buying unbuildable dirt. Zoning, access, water, perc, power, flood, wetlands, survey.",
    status: "shipped",
    keywords: ["raw land checklist", "due diligence land", "land buying checklist"],
  },
  {
    slug: "saas-pricing-calculator",
    title: "SaaS Pricing Calculator",
    shortTitle: "SaaS Pricing",
    vertical: "Software",
    verticalSlug: "software",
    description:
      "Plug in seat price, seats, and churn. Get a 12-month MRR + LTV projection with the unit economics.",
    status: "coming-soon",
    keywords: ["saas pricing", "saas calculator", "mrr calculator", "ltv calculator"],
  },
  {
    slug: "python-basics-quiz",
    title: "Python Basics Quiz — 20 Questions",
    shortTitle: "Python Basics Quiz",
    vertical: "Software",
    verticalSlug: "software",
    description:
      "Unit 1 of 3. Test your Python fundamentals in 5 minutes. 20 questions across data types, operators, strings, conditionals, functions, and exceptions. Score + per-topic breakdown + a personalized study plan.",
    status: "shipped",
    keywords: [
      "python quiz",
      "python basics quiz",
      "python test",
      "python fundamentals",
      "learn python",
      "python practice",
    ],
  },
  {
    slug: "python-lists-loops-quiz",
    title: "Python Lists & Loops Quiz — 20 Questions",
    shortTitle: "Lists & Loops Quiz",
    vertical: "Software",
    verticalSlug: "software",
    description:
      "Unit 2 of 3. Test your grip on Python data collections (lists, dicts, sets, tuples), for and while loops, break/continue, and function arguments. 20 questions, 5 minutes, free.",
    status: "shipped",
    keywords: [
      "python lists quiz",
      "python loops quiz",
      "python dictionaries",
      "python for loop",
      "python while loop",
      "python data structures",
    ],
  },
  {
    slug: "python-classes-quiz",
    title: "Python Classes & Modules Quiz — 20 Questions",
    shortTitle: "Classes Quiz",
    vertical: "Software",
    verticalSlug: "software",
    description:
      "Unit 3 of 3. Test your understanding of object-oriented Python: classes, __init__, inheritance, scope, modules, imports, and file I/O. 20 questions, 5 minutes, free.",
    status: "shipped",
    keywords: [
      "python classes quiz",
      "python oop quiz",
      "python inheritance",
      "python modules",
      "python file io",
      "object oriented python",
    ],
  },
  {
    slug: "web-foundations-quiz",
    title: "Web Foundations Quiz — 20 Questions",
    shortTitle: "Web Foundations Quiz",
    vertical: "Software",
    verticalSlug: "software",
    description:
      "Unit 1 of 3. Test how the web actually works in 5 minutes. 20 questions across internet history, TCP/IP and HTTP, DNS and URLs, web servers, design, and dev workflow. Score + per-topic breakdown + a personalized study plan.",
    status: "shipped",
    keywords: [
      "web development quiz",
      "internet basics quiz",
      "how the web works",
      "tcp ip http quiz",
      "dns quiz",
      "learn web development",
    ],
  },
  {
    slug: "web-markup-quiz",
    title: "HTML & CSS Quiz — 20 Questions",
    shortTitle: "HTML & CSS Quiz",
    vertical: "Software",
    verticalSlug: "software",
    description:
      "Unit 2 of 3. Test your HTML and CSS in 5 minutes. 20 questions across markup languages, semantic HTML, links and media, forms, CSS selectors, the box model, flex and grid, and accessibility. Free, no signup.",
    status: "shipped",
    keywords: [
      "html quiz",
      "css quiz",
      "html css test",
      "css selectors quiz",
      "css box model quiz",
      "accessibility quiz",
    ],
  },
  {
    slug: "web-scripting-quiz",
    title: "Web Scripting & Storage Quiz — 20 Questions",
    shortTitle: "JS & Storage Quiz",
    vertical: "Software",
    verticalSlug: "software",
    description:
      "Unit 3 of 3. Test JavaScript, the DOM, async/fetch, client vs server, cookies and storage, databases, and web security. Full-stack fundamentals in 20 questions, 5 minutes, free.",
    status: "shipped",
    keywords: [
      "javascript quiz",
      "javascript test",
      "dom quiz",
      "async javascript quiz",
      "sql quiz",
      "web security quiz",
      "fullstack quiz",
    ],
  },
  {
    slug: "ai-agent-starter-kit",
    title: "AI Agent Starter Kit",
    shortTitle: "Agent Starter",
    vertical: "AI Agents",
    verticalSlug: "ai-agents",
    description:
      "Describe your use case. Get the n8n workflow skeleton, recommended prompts, and a 3-phase trust model.",
    status: "coming-soon",
    keywords: ["ai agent", "n8n workflow", "agent starter", "claude agent"],
  },
  {
    slug: "xrpl-transaction-simulator",
    title: "XRPL Transaction Simulator",
    shortTitle: "XRPL Simulator",
    vertical: "Blockchain",
    verticalSlug: "blockchain",
    description:
      "Run a test XRPL transfer without a wallet. Idempotent submission, memo fields, fee estimation.",
    status: "coming-soon",
    keywords: ["xrpl", "xrp ledger", "xrpl simulator", "xrp test"],
  },
  {
    slug: "hbm-memory-calculator",
    title: "HBM Memory Controller Visualizer",
    shortTitle: "HBM Visualizer",
    vertical: "Hardware",
    verticalSlug: "hardware",
    description:
      "Toy simulation of bank scheduling. See how a good scheduler beats a lazy one 10×.",
    status: "coming-soon",
    keywords: ["hbm", "memory controller", "bank scheduling", "systemverilog"],
  },
  {
    slug: "athlete-transition-assessment",
    title: "Athlete → Founder Self-Assessment",
    shortTitle: "Athlete Assessment",
    vertical: "Athlete",
    verticalSlug: "athlete",
    description:
      "20 questions. Score. Personalized next steps for athletes transitioning into business or tech.",
    status: "coming-soon",
    keywords: ["athlete transition", "d1 to business", "athlete founder"],
  },
  {
    slug: "animation-engine-cost-calculator",
    title: "Animation Engine Cost Calculator",
    shortTitle: "Animation Cost",
    vertical: "Creative Tech",
    verticalSlug: "creative",
    description:
      "How much would your product launch animation cost across traditional vs AI pipelines? Specific to frame count and fidelity.",
    status: "coming-soon",
    keywords: ["product launch", "animation cost", "ai video cost"],
  },
  {
    slug: "voice-agent-roi-calculator",
    title: "Voice Agent ROI Calculator",
    shortTitle: "Voice Agent ROI",
    vertical: "Voice Agents",
    verticalSlug: "automotive",
    description:
      "How much does every missed call cost you? Calculate the ROI of deploying a voice agent for your business.",
    status: "coming-soon",
    keywords: ["voice agent", "missed call roi", "elevenlabs"],
  },
  {
    slug: "landed-cost-calculator",
    title: "Physical Product Landed Cost Calculator",
    shortTitle: "Landed Cost",
    vertical: "Products",
    verticalSlug: "products",
    description:
      "COGS + freight + tariff + warehousing + returns → your true landed cost per unit.",
    status: "coming-soon",
    keywords: ["landed cost", "cogs calculator", "import cost", "manufacturing"],
  },
];

export const SHIPPED_TOOLS = TOOLS.filter((t) => t.status === "shipped");

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
