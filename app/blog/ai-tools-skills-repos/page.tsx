"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";

/* ── Helper for external links ── */
function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="ext-link">
      {children}
    </a>
  );
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      <article className="px-6 md:px-16" style={{ maxWidth: "780px", margin: "0 auto", paddingTop: "24px", paddingBottom: "120px" }}>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog" className="text-xs font-mono text-white/20 hover:text-[#e63946] transition-colors">
            &larr; Back to Blog
          </Link>
        </motion.div>

        <div style={{ height: "48px" }} />

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e63946]">AI Agents</span>
          <span className="text-white/10">&middot;</span>
          <span className="text-[10px] font-mono text-white/20">Apr 8, 2026</span>
          <span className="text-white/10">&middot;</span>
          <span className="text-[10px] font-mono text-white/20">18 min read</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          47 AI Skills, MCP Servers &amp; GitHub Repos That Changed My Workflow
        </motion.h1>

        <div style={{ height: "48px" }} />

        <motion.p
          className="text-lg text-white/30 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          The ultimate toolkit &mdash; Claude Code skills, MCP servers, agent frameworks, local AI, automation engines, and 40+ fresh repos worth watching. No fluff. Just the tools I actually use.
        </motion.p>

        <div style={{ height: "64px" }} />

        {/* Body */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
        >

          {/* ═══════════════════════════════════════════════════════════════
              PART 1 — SKILLS & MCP SERVERS
          ═══════════════════════════════════════════════════════════════ */}

          <h2>Part 1: Skills &amp; MCP Servers</h2>

          <p>
            Skills teach Claude <em>how</em> to do things. MCP gives it <em>access</em> to the outside world. Together they turn Claude Code from a chatbot into an actual workforce. Here are the ones worth installing.
          </p>

          {/* ── Document & Office ── */}
          <h2>Document &amp; Office (Official Anthropic) <span className="section-emoji">&#x1F4F0;</span></h2>

          <ol className="numbered-list">
            <li>
              <strong>PDF Processing</strong> &mdash; Read, extract tables, fill forms, merge/split. Highest-utility skill for knowledge workers.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/pdf">github.com/anthropics/skills &rarr; pdf</ExtLink>
            </li>
            <li>
              <strong>DOCX</strong> &mdash; Create &amp; edit Word docs with tracked changes, comments, formatting.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/docx">github.com/anthropics/skills &rarr; docx</ExtLink>
            </li>
            <li>
              <strong>PPTX</strong> &mdash; Slide decks from natural language. Layouts, charts, speaker notes.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/pptx">github.com/anthropics/skills &rarr; pptx</ExtLink>
            </li>
            <li>
              <strong>XLSX</strong> &mdash; Formulas, analysis, charts via plain English.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/xlsx">github.com/anthropics/skills &rarr; xlsx</ExtLink>
            </li>
            <li>
              <strong>Doc Co-Authoring</strong> &mdash; Real collaborative writing. Human writes, Claude responds, back and forth.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring">github.com/anthropics/skills &rarr; doc-coauthoring</ExtLink>
            </li>
          </ol>

          {/* ── Design & Creative ── */}
          <h2>Design &amp; Creative <span className="section-emoji">&#x1F3A8;</span></h2>

          <ol className="numbered-list" start={6}>
            <li>
              <strong>Frontend Design</strong> &mdash; Escape &ldquo;AI slop&rdquo; aesthetics. Real design systems, bold typography. 277k+ installs.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/frontend-design">github.com/anthropics/skills &rarr; frontend-design</ExtLink>
            </li>
            <li>
              <strong>Canvas Design</strong> &mdash; Social graphics, posters, covers &mdash; text in, PNG/PDF out.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/canvas-design">github.com/anthropics/skills &rarr; canvas-design</ExtLink>
            </li>
            <li>
              <strong>Algorithmic Art</strong> &mdash; Fractal patterns, geometric compositions via p5.js.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/algorithmic-art">github.com/anthropics/skills &rarr; algorithmic-art</ExtLink>
            </li>
            <li>
              <strong>Theme Factory</strong> &mdash; Batch-generate color schemes from one prompt.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/theme-factory">github.com/anthropics/skills &rarr; theme-factory</ExtLink>
            </li>
            <li>
              <strong>Web Artifacts Builder</strong> &mdash; Calculators, dashboards via natural language. No frontend skills needed.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder">github.com/anthropics/skills &rarr; web-artifacts-builder</ExtLink>
            </li>
          </ol>

          {/* ── Dev & Engineering ── */}
          <h2>Dev &amp; Engineering <span className="section-emoji">&#x1F468;&#x200D;&#x1F4BB;</span></h2>

          <ol className="numbered-list" start={11}>
            <li>
              <strong>Superpowers</strong> &mdash; 20+ battle-tested skills. TDD, debugging, plan-to-execute pipeline. 96k+ stars.
              <br /><ExtLink href="https://github.com/obra/superpowers">github.com/obra/superpowers</ExtLink>
            </li>
            <li>
              <strong>Systematic Debugging</strong> &mdash; Root cause analysis first, fix second. 4-phase methodology. S9.2 on SkillHub.
              <br /><ExtLink href="https://github.com/obra/superpowers">github.com/obra/superpowers</ExtLink>
            </li>
            <li>
              <strong>File Search</strong> &mdash; Ripgrep + ast-grep mastery. S9.0 rated.
              <br /><ExtLink href="https://github.com/massgen/massgen">github.com/massgen/massgen</ExtLink>
            </li>
            <li>
              <strong>Context Optimization</strong> &mdash; Reduce token costs, KV-cache tricks. 13.9k stars.
              <br /><ExtLink href="https://github.com/muratcankoylan/agent-skills-for-context-engineering">github.com/muratcankoylan/agent-skills-for-context-engineering</ExtLink>
            </li>
            <li>
              <strong>Skill Creator (Official)</strong> &mdash; Meta-skill: describe a workflow, get a SKILL.md in 5 min.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/skill-creator">github.com/anthropics/skills &rarr; skill-creator</ExtLink>
            </li>
            <li>
              <strong>Remotion Best Practices</strong> &mdash; AI video generation. 117k weekly installs.
              <br /><ExtLink href="https://github.com/remotion-dev/remotion">github.com/remotion-dev/remotion</ExtLink>
            </li>
          </ol>

          {/* ── Marketing & SEO ── */}
          <h2>Marketing &amp; SEO <span className="section-emoji">&#x1F5DE;</span></h2>

          <ol className="numbered-list" start={17}>
            <li>
              <strong>Marketing Skills by Corey Haines</strong> &mdash; 20+ skills: CRO, copywriting, SEO, email sequences, growth.
              <br /><ExtLink href="https://github.com/coreyhaines31/marketingskills">github.com/coreyhaines31/marketingskills</ExtLink>
            </li>
            <li>
              <strong>Claude SEO</strong> &mdash; Full-site audits, schema validation. 12 sub-skills.
              <br /><ExtLink href="https://github.com/AgriciDaniel/claude-seo">github.com/AgriciDaniel/claude-seo</ExtLink>
            </li>
            <li>
              <strong>Brand Guidelines</strong> &mdash; Encode your brand into a skill. Auto-applies everywhere.
              <br /><ExtLink href="https://github.com/anthropics/skills/tree/main/skills/brand-guidelines">github.com/anthropics/skills &rarr; brand-guidelines</ExtLink>
            </li>
          </ol>

          {/* ── Knowledge & Learning ── */}
          <h2>Knowledge &amp; Learning <span className="section-emoji">&#x1F9E0;</span></h2>

          <ol className="numbered-list" start={20}>
            <li>
              <strong>NotebookLM Integration</strong> &mdash; Claude + NotebookLM bridge. Summaries, mind maps, flashcards.
              <br /><ExtLink href="https://github.com/PleasePrompto/notebooklm-skill">github.com/PleasePrompto/notebooklm-skill</ExtLink>
            </li>
            <li>
              <strong>Obsidian Skills</strong> &mdash; By Obsidian&rsquo;s CEO. Auto-tagging, auto-linking, vault-native.
              <br /><ExtLink href="https://github.com/kepano/obsidian-skills">github.com/kepano/obsidian-skills</ExtLink>
            </li>
            <li>
              <strong>Excel MCP Server</strong> &mdash; Manipulate Excel without Microsoft Excel.
              <br /><ExtLink href="https://github.com/haris-musa/excel-mcp-server">github.com/haris-musa/excel-mcp-server</ExtLink>
            </li>
          </ol>

          <p>
            All official skills: <ExtLink href="https://github.com/anthropics/skills">github.com/anthropics/skills</ExtLink><br />
            Browse 80k+ community skills: <ExtLink href="https://skillsmp.com">skillsmp.com</ExtLink>
          </p>

          {/* ── Must-Have MCP Servers ── */}
          <h2>My Must-Have MCP Servers</h2>

          <p>
            Beyond skills &mdash; these are the ones I love using. Skills teach Claude HOW to do things. MCP gives it ACCESS to the outside world. These three changed my workflow.
          </p>

          <h3>Tavily</h3>
          <p>
            Search engine built for AI agents. Not blue links &mdash; clean structured data. Four tools: search, extract, crawl, map. Connects as remote MCP in one minute.
          </p>
          <p><ExtLink href="https://github.com/tavily-ai/tavily-mcp">github.com/tavily-ai/tavily-mcp</ExtLink></p>

          <h3>Context7</h3>
          <p>
            Injects up-to-date library docs into your LLM&rsquo;s context. No more hallucinated APIs. No more deprecated methods. Just add &ldquo;use context7&rdquo; to your prompt. Supports Next.js, React, Supabase, MongoDB, thousands more.
          </p>
          <p><ExtLink href="https://github.com/upstash/context7">github.com/upstash/context7</ExtLink></p>

          <h3>Task Master AI</h3>
          <p>
            Your AI&rsquo;s project manager. Feed a PRD &rarr; structured tasks with dependencies &rarr; Claude executes one by one. Turns chaotic sessions into a proper pipeline. Works across Cursor, Claude Code, Windsurf.
          </p>
          <p><ExtLink href="https://github.com/eyaltoledano/claude-task-master">github.com/eyaltoledano/claude-task-master</ExtLink></p>


          {/* ═══════════════════════════════════════════════════════════════
              PART 2 — GITHUB REPOS
          ═══════════════════════════════════════════════════════════════ */}

          <h2>Part 2: GitHub Repos</h2>
          <p>25 open-source engines powering the AI revolution. Starting with the most famous and going into more lowkey ones.</p>

          {/* ── Agent Frameworks ── */}
          <h2>Agent Frameworks</h2>

          <ol className="numbered-list" start={23}>
            <li>
              <strong>OpenClaw</strong> &mdash; The viral AI agent. Persistent, multi-channel, writes its own skills. 210k+ stars.
              <br /><ExtLink href="https://github.com/openclaw/openclaw">github.com/openclaw/openclaw</ExtLink>
            </li>
            <li>
              <strong>AutoGPT</strong> &mdash; Full agent platform for long-running tasks.
              <br /><ExtLink href="https://github.com/Significant-Gravitas/AutoGPT">github.com/Significant-Gravitas/AutoGPT</ExtLink>
            </li>
            <li>
              <strong>LangGraph</strong> &mdash; Agents as graphs. Multi-agent orchestration. 26.8k stars.
              <br /><ExtLink href="https://github.com/langchain-ai/langgraph">github.com/langchain-ai/langgraph</ExtLink>
            </li>
            <li>
              <strong>OWL</strong> &mdash; Multi-agent cooperation. Tops GAIA benchmark.
              <br /><ExtLink href="https://github.com/camel-ai/owl">github.com/camel-ai/owl</ExtLink>
            </li>
            <li>
              <strong>Dify</strong> &mdash; Open-source LLM app builder. Workflows, RAG, agents all-in-one.
              <br /><ExtLink href="https://github.com/langgenius/dify">github.com/langgenius/dify</ExtLink>
            </li>
            <li>
              <strong>CrewAI</strong> &mdash; Multi-agent with roles, goals, backstories.
              <br /><ExtLink href="https://github.com/crewAIInc/crewAI">github.com/crewAIInc/crewAI</ExtLink>
            </li>
            <li>
              <strong>CopilotKit</strong> &mdash; Embed AI copilots into React apps.
              <br /><ExtLink href="https://github.com/CopilotKit/CopilotKit">github.com/CopilotKit/CopilotKit</ExtLink>
            </li>
          </ol>

          {/* ── Local AI ── */}
          <h2>Local AI</h2>

          <ol className="numbered-list" start={30}>
            <li>
              <strong>Ollama</strong> &mdash; Run LLMs locally with one command.
              <br /><ExtLink href="https://github.com/ollama/ollama">github.com/ollama/ollama</ExtLink>
            </li>
            <li>
              <strong>Open WebUI</strong> &mdash; Self-hosted ChatGPT-like interface.
              <br /><ExtLink href="https://github.com/open-webui/open-webui">github.com/open-webui/open-webui</ExtLink>
            </li>
            <li>
              <strong>LlamaFile</strong> &mdash; LLM as single executable. Zero dependencies.
              <br /><ExtLink href="https://github.com/Mozilla-Ocho/llamafile">github.com/Mozilla-Ocho/llamafile</ExtLink>
            </li>
            <li>
              <strong>Unsloth</strong> &mdash; Fine-tune 2x faster, 70% less memory.
              <br /><ExtLink href="https://github.com/unslothai/unsloth">github.com/unslothai/unsloth</ExtLink>
            </li>
          </ol>

          {/* ── Workflow & Automation ── */}
          <h2>Workflow &amp; Automation</h2>

          <ol className="numbered-list" start={34}>
            <li>
              <strong>n8n</strong> &mdash; Open-source automation, 400+ integrations + AI nodes.
              <br /><ExtLink href="https://github.com/n8n-io/n8n">github.com/n8n-io/n8n</ExtLink>
            </li>
            <li>
              <strong>Langflow</strong> &mdash; Visual drag-and-drop for agent pipelines. 140k stars.
              <br /><ExtLink href="https://github.com/langflow-ai/langflow">github.com/langflow-ai/langflow</ExtLink>
            </li>
            <li>
              <strong>Huginn</strong> &mdash; Self-hosted web agents. Monitoring, alerts. Privacy-first.
              <br /><ExtLink href="https://github.com/huginn/huginn">github.com/huginn/huginn</ExtLink>
            </li>
          </ol>

          {/* ── Search & Data ── */}
          <h2>Search &amp; Data</h2>

          <ol className="numbered-list" start={37}>
            <li>
              <strong>GPT Researcher</strong> &mdash; Autonomous research &rarr; compiled reports.
              <br /><ExtLink href="https://github.com/assafelovic/gpt-researcher">github.com/assafelovic/gpt-researcher</ExtLink>
            </li>
            <li>
              <strong>Firecrawl</strong> &mdash; Any website &rarr; LLM-ready data.
              <br /><ExtLink href="https://github.com/mendableai/firecrawl">github.com/mendableai/firecrawl</ExtLink>
            </li>
            <li>
              <strong>Vanna AI</strong> &mdash; Natural language &rarr; SQL.
              <br /><ExtLink href="https://github.com/vanna-ai/vanna">github.com/vanna-ai/vanna</ExtLink>
            </li>
          </ol>

          {/* ── Dev Tools ── */}
          <h2>Dev Tools</h2>

          <ol className="numbered-list" start={40}>
            <li>
              <strong>Codebase Memory MCP</strong> &mdash; Codebase &rarr; persistent knowledge graph.
              <br /><ExtLink href="https://github.com/DeusData/codebase-memory-mcp">github.com/DeusData/codebase-memory-mcp</ExtLink>
            </li>
            <li>
              <strong>DSPy</strong> &mdash; Program (not prompt) foundation models.
              <br /><ExtLink href="https://github.com/stanfordnlp/dspy">github.com/stanfordnlp/dspy</ExtLink>
            </li>
            <li>
              <strong>Spec Kit (GitHub)</strong> &mdash; Spec-driven dev. Write specs, AI generates code. 50k+ stars.
              <br /><ExtLink href="https://github.com/github/spec-kit">github.com/github/spec-kit</ExtLink>
            </li>
            <li>
              <strong>NVIDIA NemoClaw</strong> &mdash; Secure sandbox for autonomous agents.
              <br /><ExtLink href="https://github.com/NVIDIA/NemoClaw">github.com/NVIDIA/NemoClaw</ExtLink>
            </li>
          </ol>

          {/* ── Curated Collections ── */}
          <h2>Curated Collections</h2>

          <ol className="numbered-list" start={44}>
            <li>
              <strong>Awesome Claude Skills</strong> &mdash; Best curated skill list. 22k+ stars.
              <br /><ExtLink href="https://github.com/travisvn/awesome-claude-skills">github.com/travisvn/awesome-claude-skills</ExtLink>
            </li>
            <li>
              <strong>Anthropic Skills Repo</strong> &mdash; Official reference implementations.
              <br /><ExtLink href="https://github.com/anthropics/skills">github.com/anthropics/skills</ExtLink>
            </li>
            <li>
              <strong>Awesome Agents</strong> &mdash; 100+ open-source agent tools.
              <br /><ExtLink href="https://github.com/kyrolabs/awesome-agents">github.com/kyrolabs/awesome-agents</ExtLink>
            </li>
            <li>
              <strong>MAGI//ARCHIVE</strong> &mdash; Daily feed of fresh AI repos.
              <br /><ExtLink href="https://tom-doerr.github.io/repo_posts/">tom-doerr.github.io/repo_posts</ExtLink>
            </li>
          </ol>


          {/* ═══════════════════════════════════════════════════════════════
              40 FRESH GITHUB REPOS
          ═══════════════════════════════════════════════════════════════ */}

          <h2>40 Fresh GitHub Repos Worth Watching</h2>
          <p>
            I scanned 1,000+ repos from GitHub forums and picked the most interesting AI projects. Do not forget to do your own security check.
          </p>

          {/* ── Agent Orchestration ── */}
          <h3>Agent Orchestration &amp; Multi-Agent <span className="section-emoji">&#x1F916;</span></h3>
          <ul>
            <li><ExtLink href="https://github.com/garrytan/gstack">gstack</ExtLink> &mdash; Claude Code as virtual engineering team</li>
            <li><ExtLink href="https://github.com/craigsc/cmux">cmux</ExtLink> &mdash; Multiple Claude agents in parallel</li>
            <li><ExtLink href="https://github.com/byt3bl33d3r/figaro">figaro</ExtLink> &mdash; Orchestrate Claude agent fleets on desktop</li>
            <li><ExtLink href="https://github.com/smtg-ai/claude-squad">claude-squad</ExtLink> &mdash; Terminal agents in parallel sessions</li>
            <li><ExtLink href="https://github.com/bytedance/deer-flow">deer-flow (ByteDance)</ExtLink> &mdash; Sub-agents and sandboxes through skills</li>
            <li><ExtLink href="https://github.com/Agent-Field/SWE-AF">SWE-AF</ExtLink> &mdash; One API call spins up engineering team</li>
            <li><ExtLink href="https://github.com/myshell-ai/AIlice">AIlice</ExtLink> &mdash; Complex tasks &rarr; dynamic agents</li>
            <li><ExtLink href="https://github.com/sequenzia/agent-alchemy">Agent Alchemy</ExtLink> &mdash; Claude Code + plugins + task manager</li>
          </ul>

          {/* ── Agent Infrastructure ── */}
          <h3>Agent Infrastructure &amp; Security <span className="section-emoji">&#x1F510;</span></h3>
          <ul>
            <li><ExtLink href="https://github.com/ghostwright/ghost-os">Ghost OS</ExtLink> &mdash; AI agents operate every Mac app</li>
            <li><ExtLink href="https://github.com/e2b-dev/desktop">e2b/desktop</ExtLink> &mdash; Isolated virtual desktops for agents</li>
            <li><ExtLink href="https://github.com/dagger/container-use">container-use (Dagger)</ExtLink> &mdash; Containerized environments for coding agents</li>
            <li><ExtLink href="https://github.com/kwalus/Canopy">Canopy</ExtLink> &mdash; Encrypted P2P mesh for AI agents</li>
            <li><ExtLink href="https://github.com/microsoft/agent-governance-toolkit">agent-governance-toolkit (Microsoft)</ExtLink> &mdash; Security middleware for agents</li>
            <li><ExtLink href="https://github.com/anthropics/claude-code-security-review">claude-code-security-review (Anthropic)</ExtLink> &mdash; PRs analyzed for security</li>
            <li><ExtLink href="https://github.com/promptfoo/promptfoo">promptfoo</ExtLink> &mdash; Automated security testing for AI models</li>
          </ul>

          {/* ── Memory & Context ── */}
          <h3>Memory &amp; Context <span className="section-emoji">&#x1F4DD;</span></h3>
          <ul>
            <li><ExtLink href="https://github.com/mem9-ai/mem9">Mem9</ExtLink> &mdash; Memory system for AI agents</li>
            <li><ExtLink href="https://github.com/websitebutlers/codefire-app">Codefire</ExtLink> &mdash; Persistent memory for coding agents</li>
            <li><ExtLink href="https://github.com/memodb-io/memobase">Memobase</ExtLink> &mdash; User profile memory for LLMs</li>
          </ul>

          {/* ── Coding Agents ── */}
          <h3>Coding Agents &amp; Dev Tools <span className="section-emoji">&#x1F4BB;</span></h3>
          <ul>
            <li><ExtLink href="https://github.com/QwenLM/qwen-code">Qwen Code</ExtLink> &mdash; Terminal AI coding agent by QwenLM</li>
            <li><ExtLink href="https://github.com/gptme/gptme">gptme</ExtLink> &mdash; Personal AI agent in terminal</li>
            <li><ExtLink href="https://github.com/kangraemin/claude-inspector">Claude Inspector</ExtLink> &mdash; See hidden Claude Code prompt mechanics</li>
            <li><ExtLink href="https://github.com/nizos/tdd-guard">TDD Guard</ExtLink> &mdash; Enforces test-first for AI agents</li>
            <li><ExtLink href="https://github.com/karpathy/rendergit">rendergit (Karpathy)</ExtLink> &mdash; Git repo &rarr; single file for humans and LLMs</li>
            <li><ExtLink href="https://github.com/karpathy/autoresearch">autoresearch (Karpathy)</ExtLink> &mdash; Autonomous LLM training system</li>
            <li><ExtLink href="https://github.com/pydantic/pydantic-ai">pydantic-ai</ExtLink> &mdash; Type-safe agent framework</li>
            <li><ExtLink href="https://github.com/199-biotechnologies/claude-deep-research-skill">claude-deep-research-skill</ExtLink> &mdash; 8-phase research with auto-continuation</li>
          </ul>

          {/* ── MCP & Integrations ── */}
          <h3>MCP &amp; Integrations <span className="section-emoji">&#x1F517;</span></h3>
          <ul>
            <li><ExtLink href="https://github.com/executeautomation/mcp-playwright">MCP Playwright</ExtLink> &mdash; Browser automation for LLMs</li>
            <li><ExtLink href="https://github.com/vibheksoni/stealth-browser-mcp">stealth-browser-mcp</ExtLink> &mdash; Undetectable browser automation</li>
            <li><ExtLink href="https://github.com/jlowin/fastmcp">fastmcp</ExtLink> &mdash; Build MCP servers in minimal Python</li>
            <li><ExtLink href="https://github.com/zcaceres/markdownify-mcp">markdownify-mcp</ExtLink> &mdash; PDFs, images, audio &rarr; Markdown</li>
            <li><ExtLink href="https://github.com/samanhappy/mcphub">MCPHub</ExtLink> &mdash; Manage multiple MCP servers via HTTP</li>
          </ul>

          {/* ── Search, Data & LLM Tools ── */}
          <h3>Search, Data &amp; LLM Tools <span className="section-emoji">&#x1F50D;</span></h3>
          <ul>
            <li><ExtLink href="https://github.com/BeaconBay/ck">CK (BeaconBay)</ExtLink> &mdash; Search code by meaning, not keywords</li>
            <li><ExtLink href="https://github.com/enoch3712/ExtractThinker">ExtractThinker</ExtLink> &mdash; ORM for document intelligence</li>
            <li><ExtLink href="https://github.com/diegosouzapw/OmniRoute">OmniRoute</ExtLink> &mdash; API proxy for 44+ AI providers</li>
            <li><ExtLink href="https://github.com/dlt-hub/dlt">dlt</ExtLink> &mdash; LLM-native data pipelines from 5,000+ sources</li>
            <li><ExtLink href="https://github.com/simonw/llm">simonw/llm</ExtLink> &mdash; Lightweight CLI for local and remote LLMs</li>
            <li><ExtLink href="https://github.com/Portkey-AI/gateway">Portkey-AI/gateway</ExtLink> &mdash; Route requests to 250+ LLMs</li>
            <li><ExtLink href="https://github.com/lmnr-ai/lmnr">lmnr</ExtLink> &mdash; Trace and evaluate agent behavior</li>
          </ul>

          {/* ── Video & More ── */}
          <h3>Video &amp; More <span className="section-emoji">&#x1F4FD;</span></h3>
          <ul>
            <li><ExtLink href="https://github.com/Lightricks/LTX-Desktop">LTX-Desktop (Lightricks)</ExtLink> &mdash; Generate and edit videos locally</li>
            <li><ExtLink href="https://github.com/aiming-lab/MetaClaw">MetaClaw</ExtLink> &mdash; Evolve AI agents without GPU</li>
            <li><ExtLink href="https://github.com/ItzCrazyKns/Vane">Vane</ExtLink> &mdash; AI answering engine with local LLMs</li>
          </ul>


          {/* ═══════════════════════════════════════════════════════════════
              WHERE TO FIND MORE
          ═══════════════════════════════════════════════════════════════ */}

          <h2>Where to Find More Skills</h2>

          <ul>
            <li><ExtLink href="https://skillsmp.com">skillsmp.com</ExtLink> &mdash; 80k+ skills, largest catalog</li>
            <li><ExtLink href="https://aitmpl.com/skills">aitmpl.com/skills</ExtLink> &mdash; Templates, one-command install</li>
            <li><ExtLink href="https://skillhub.club">skillhub.club</ExtLink> &mdash; 31k+ skills, AI-rated</li>
            <li><ExtLink href="https://agentskills.io">agentskills.io</ExtLink> &mdash; Official spec</li>
          </ul>

          <p>
            Install any skill:<br />
            Personal: <code>~/.claude/skills/</code><br />
            Project: <code>.claude/skills/</code><br />
            Clone, copy, restart. Done.
          </p>

          {/* ── CTA ── */}
          <div className="mt-16 pt-8 border-t border-white/[0.06]">
            <p className="text-xs text-white/20 font-mono mb-6">
              Pro members get install scripts, CLAUDE.md templates, and MCP server configs for every tool on this list.
            </p>
            <Link
              href="/#pricing"
              className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)]"
            >
              Join Pro
            </Link>
          </div>
        </motion.div>
      </article>

      <style jsx global>{`
        .prose-custom p {
          color: rgba(255,255,255,0.5);
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
          color: rgba(255,255,255,0.85);
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
          color: rgba(255,255,255,0.45);
          font-size: 16px;
          line-height: 1.8;
          padding-left: 1.5em;
          position: relative;
          margin-bottom: 0.5em;
        }
        .prose-custom ul li::before {
          content: "\\2192";
          position: absolute;
          left: 0;
          color: rgba(230,57,70,0.5);
        }
        .prose-custom ol.numbered-list {
          list-style: none;
          padding: 0;
          margin-bottom: 1.5em;
          counter-reset: none;
        }
        .prose-custom ol.numbered-list li {
          color: rgba(255,255,255,0.45);
          font-size: 16px;
          line-height: 1.8;
          padding-left: 2.5em;
          position: relative;
          margin-bottom: 1.2em;
          counter-increment: none;
        }
        .prose-custom ol.numbered-list li::before {
          content: counter(list-item, decimal-leading-zero);
          position: absolute;
          left: 0;
          color: rgba(230,57,70,0.6);
          font-size: 13px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          top: 2px;
        }
        .prose-custom strong {
          color: rgba(255,255,255,0.75);
          font-weight: 600;
        }
        .prose-custom em {
          color: rgba(255,255,255,0.6);
          font-style: italic;
        }
        .prose-custom code {
          color: rgba(230,57,70,0.8);
          font-size: 14px;
          background: rgba(255,255,255,0.04);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .prose-custom .ext-link {
          color: rgba(230,57,70,0.7);
          font-size: 13px;
          font-family: ui-monospace, monospace;
          text-decoration: none;
          border-bottom: 1px solid rgba(230,57,70,0.15);
          transition: all 0.2s;
        }
        .prose-custom .ext-link:hover {
          color: #e63946;
          border-bottom-color: rgba(230,57,70,0.5);
        }
        .prose-custom .section-emoji {
          font-size: 20px;
          margin-left: 4px;
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
              { label: "Platform", href: "/hub" },
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
