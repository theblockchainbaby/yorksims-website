"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";

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
            ← Back to Blog
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
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e63946]">Business</span>
          <span className="text-white/10">·</span>
          <span className="text-[10px] font-mono text-white/20">Mar 26, 2026</span>
          <span className="text-white/10">·</span>
          <span className="text-[10px] font-mono text-white/20">14 min read</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          How I Built a Business That Runs Without Me
        </motion.h1>

        <div style={{ height: "48px" }} />

        <motion.p
          className="text-lg text-white/30 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          The real systems behind Caipher AI LLC. AI agents, automated workflows, and the architecture that lets me build across 10 verticals without burning out.
        </motion.p>

        <div style={{ height: "64px" }} />

        {/* Body */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          <p>
            I am going to be real with you. A year ago I was doing everything myself. Every email. Every client call. Every deployment. Every invoice. I was the CEO, the developer, the sales team, and the customer support. All at once.
          </p>

          <p>
            And I was drowning.
          </p>

          <p>
            Not because the work was hard. I have been through harder. I played D1 basketball, went pro overseas in Ankara, Turkey, came back and started building companies from scratch. Hard is not the problem. The problem was that I was the bottleneck for everything.
          </p>

          <p>
            So I started asking myself a different question. Instead of "how do I get more done?" I started asking "what if I was not involved at all?"
          </p>

          <p>
            That question changed everything.
          </p>

          <h2>The First Thing I Automated Was Myself</h2>

          <p>
            Let me explain what I mean. I looked at my week and wrote down every single thing I did. Not what I thought I did. What I actually did. I tracked it for two weeks straight.
          </p>

          <p>
            Here is what I found. About 70% of my time was spent on things that did not require me to think. Responding to the same types of emails. Scheduling calls. Updating project boards. Sending invoices. Following up with leads. Posting content. Checking analytics.
          </p>

          <p>
            None of that needed me. It needed a system.
          </p>

          <h2>Building MoltBot</h2>

          <p>
            That is when I built MoltBot. MoltBot is my autonomous AI agent that handles CMO and CEO level tasks without me touching it. I am not talking about a chatbot. I am talking about an agent that actually does work.
          </p>

          <p>
            Here is what MoltBot handles right now:
          </p>

          <ul>
            <li>Email triage and responses for common inquiries</li>
            <li>Lead research and outreach sequences</li>
            <li>Weekly reporting across all my projects</li>
            <li>Content scheduling and distribution</li>
            <li>Meeting prep with context pulled from past conversations</li>
            <li>Client follow-ups on autopilot</li>
          </ul>

          <p>
            I built MoltBot using a combination of n8n workflows, OpenAI function calling, and custom tooling. It is not one big monolithic thing. It is a collection of 20+ skills that get triggered based on events. An email comes in, MoltBot reads it, classifies it, and either responds automatically or flags it for me if it actually needs a human.
          </p>

          <p>
            The key was making it good enough that I trust it. Not perfect. Good enough. Because "good enough on autopilot" beats "perfect but only when I have time" every single day.
          </p>

          <h2>Otto Handles the Voice Side</h2>

          <p>
            MoltBot is text-based. But a lot of my business runs on voice. Client calls. Sales conversations. Support lines. That is where Otto comes in.
          </p>

          <p>
            Otto is my voice AI agent. It handles inbound calls, qualifies leads, books appointments, and answers product questions. I built it using ElevenLabs for voice synthesis and a custom routing layer that connects to my CRM.
          </p>

          <p>
            When someone calls one of my businesses, they talk to Otto first. Otto is not pretending to be me. It is just handling the 80% of calls that are "what are your prices" or "can I schedule a consultation" or "do you offer this service." The 20% that actually need me get routed through.
          </p>

          <p>
            Before Otto, I was missing calls all the time. I would be deep in a code session building something and my phone would ring and I would have to context switch completely. Now Otto handles that. I check the transcripts at the end of the day and follow up on anything that matters.
          </p>

          <h2>The Stack That Holds It Together</h2>

          <p>
            People always ask me "what tools do you use?" So here is the honest answer. It is not fancy.
          </p>

          <ul>
            <li><strong>n8n</strong> for workflow automation. Self-hosted. I run probably 40+ workflows right now.</li>
            <li><strong>OpenAI API</strong> for the intelligence layer. Function calling is the move.</li>
            <li><strong>ElevenLabs</strong> for voice generation in Otto.</li>
            <li><strong>Supabase</strong> for the database layer. Postgres under the hood, real-time subscriptions, auth built in.</li>
            <li><strong>Vercel</strong> for deploying all my web properties. Push and it is live.</li>
            <li><strong>GitHub</strong> for version control. 15+ public repos and counting.</li>
            <li><strong>Linear</strong> for project management across all verticals.</li>
            <li><strong>Stripe</strong> for payments. Set it up once and forget about it.</li>
          </ul>

          <p>
            The important thing is not the specific tools. It is how they connect. Every tool talks to at least one other tool through an API or webhook. Nothing is isolated. When a Stripe payment comes in, it triggers a workflow that updates the CRM, sends a welcome email through MoltBot, provisions access in Supabase, and logs it in Linear. All automatic.
          </p>

          <h2>How I Actually Spend My Time Now</h2>

          <p>
            Now that the operational stuff runs itself, here is what my actual week looks like:
          </p>

          <ul>
            <li><strong>Monday and Tuesday:</strong> Deep building. This is when I write code, design systems, or work on whatever vertical I am focused on that quarter. No calls. No meetings. Just building.</li>
            <li><strong>Wednesday:</strong> Review day. I look at MoltBot reports, Otto transcripts, analytics, and financials. I make decisions based on real data instead of gut feelings.</li>
            <li><strong>Thursday:</strong> People day. Coaching calls, builder sessions, 1-on-1 consulting. This is the only day I am consistently on calls.</li>
            <li><strong>Friday:</strong> Content and planning. I write, record, or outline what I am shipping next week. Then I am done.</li>
          </ul>

          <p>
            That is it. I went from working 14 hour days doing everything to working focused 6-8 hour days doing only the things that actually move the needle. The agents handle everything else.
          </p>

          <h2>What Most People Get Wrong About Automation</h2>

          <p>
            Here is where I see people mess up. They try to automate everything at once. They buy 15 tools, connect them all together in some massive Rube Goldberg machine, and then when one thing breaks the whole system falls apart.
          </p>

          <p>
            Do not do that.
          </p>

          <p>
            Start with one thing. The thing you do most often that you hate the most. Automate that. Get it stable. Trust it. Then move on to the next thing.
          </p>

          <p>
            For me it was email. Email was eating my life. So I built the email triage system first. Once that was solid and I was not worried about it dropping the ball, I moved to lead follow-ups. Then scheduling. Then reporting. One at a time.
          </p>

          <p>
            It took me about 4 months to get to where I am now. And honestly I am still tweaking things. The system is never "done." But it is good enough that the business runs without me being involved in every single decision.
          </p>

          <h2>The Numbers</h2>

          <p>
            I will share some real numbers because I think people need to hear this.
          </p>

          <ul>
            <li>I save roughly 25-30 hours per week on operational tasks</li>
            <li>MoltBot handles about 85% of inbound emails without my input</li>
            <li>Otto resolves about 75% of inbound calls without routing to me</li>
            <li>My response time to leads went from 6-12 hours to under 5 minutes</li>
            <li>I went from managing 2-3 projects at a time to running 10 verticals simultaneously</li>
          </ul>

          <p>
            That last one is the big one. The reason I can build across software, AI, hardware, blockchain, business, products, land, athletics, automotive, and creative tech is not because I am some genius. It is because I built systems that handle the repetitive work so I can focus on the creative and strategic work that actually matters.
          </p>

          <h2>You Can Build This Too</h2>

          <p>
            Look, I am not special. I just got tired of being the bottleneck. Everything I built is using tools and APIs that are available to you right now. The AI models are here. The automation platforms are here. The infrastructure is here.
          </p>

          <p>
            The question is not whether you can automate your business. The question is whether you are willing to invest the time upfront to build the systems. Most people would rather keep doing things manually because it feels productive in the moment. But you are not being productive. You are being busy. And there is a massive difference between the two.
          </p>

          <p>
            If you want to see how I built these systems step by step, that is literally what YorkSims.com is for. The AI Agents vertical walks through building autonomous agents from scratch. The Business vertical covers structuring your company so it can run without you. And the Software vertical teaches you how to ship the tools that tie everything together.
          </p>

          <p>
            Stop doing everything yourself. Build the machine that does it for you. Then go build the next thing.
          </p>

          <div className="mt-16 pt-8 border-t border-white/[0.06]">
            <p className="text-xs text-white/20 font-mono mb-6">
              Pro members get the full MoltBot architecture breakdown, n8n workflow templates, and the Otto voice agent setup guide.
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
          content: "→";
          position: absolute;
          left: 0;
          color: rgba(230,57,70,0.5);
        }
        .prose-custom strong {
          color: rgba(255,255,255,0.75);
          font-weight: 600;
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
