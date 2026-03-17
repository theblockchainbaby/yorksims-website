"use client";

import { useState } from "react";
import Nav from "../components/Nav";

const OPTIONS = [
  { label: "Pro Membership ($29/mo)",      value: "pro" },
  { label: "Builder Membership ($99/mo)",  value: "builder" },
  { label: "1-on-1 Consulting ($500/hr)",  value: "consulting" },
  { label: "General / Other",              value: "general" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", interest: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#e63946] mb-6">Work With York</p>
            <h1 className="text-4xl font-black tracking-tight mb-6">
              Let&apos;s build something.
            </h1>
            <p className="text-[#666] text-sm leading-relaxed mb-10">
              Whether you&apos;re joining Pro, looking for 1-on-1 consulting, or just want
              to connect — reach out. Limited consulting slots available per week.
            </p>

            {/* Consulting details */}
            <div className="border border-[#1e1e1e] rounded p-6 mb-6">
              <p className="text-xs uppercase tracking-widest text-[#e63946] font-mono mb-4">1-on-1 Consulting</p>
              <ul className="space-y-2">
                {[
                  "SaaS architecture & tech stack decisions",
                  "AI product development & go-to-market",
                  "Business structure, entity setup, equity splits",
                  "Hardware / semiconductor project guidance",
                  "Physical product development & sourcing",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-[#666]">
                    <span className="text-[#e63946] shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#1e1e1e]">
                <span className="text-2xl font-black">$500</span>
                <span className="text-sm text-[#555] ml-1">/hr</span>
                <p className="text-xs text-[#444] mt-1">Limited to 5 hours/week. Book early.</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-2">
              <a
                href="mailto:contact@yorksims.com"
                className="flex items-center gap-2 text-xs text-[#444] hover:text-white transition-colors"
              >
                <span className="text-[#e63946]">→</span>
                contact@yorksims.com
              </a>
              <a
                href="https://github.com/theblockchainbaby"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#444] hover:text-white transition-colors"
              >
                <span className="text-[#e63946]">→</span>
                github.com/theblockchainbaby
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="border border-[#e63946]/30 bg-[#e63946]/5 rounded p-8 text-center">
                <div className="text-2xl mb-4">✓</div>
                <p className="text-sm font-semibold mb-2">Message received.</p>
                <p className="text-xs text-[#555]">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#555] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#111] border border-[#1e1e1e] rounded px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#e63946] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#555] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#111] border border-[#1e1e1e] rounded px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#e63946] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#555] mb-2">
                    I&apos;m interested in
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full bg-[#111] border border-[#1e1e1e] rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e63946] transition-colors"
                  >
                    <option value="">Select one</option>
                    {OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#555] mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#111] border border-[#1e1e1e] rounded px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#e63946] transition-colors resize-none"
                    placeholder="What are you building? What do you need?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#e63946] text-white text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#ff4d5a] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
