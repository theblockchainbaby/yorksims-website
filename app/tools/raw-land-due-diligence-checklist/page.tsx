"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface CheckItem {
  id: string;
  title: string;
  why: string;
  howTo: string;
  cost: string;
  timeline: string;
  severity: "blocker" | "major" | "minor";
  tips: string[];
}

const ITEMS: CheckItem[] = [
  {
    id: "zoning",
    title: "Zoning",
    why: "Determines what you can build. Residential, agricultural, commercial, mixed-use — the zone dictates your options. If the land is zoned agricultural and you want to build a house, you may need a variance or rezone, which can take months or get denied.",
    howTo: "Call the county planning department directly. Do not trust the listing description or the seller. Ask for the exact zoning designation, the permitted uses, the setback requirements, and whether any rezoning applications are pending nearby.",
    cost: "Free (phone call to county)",
    timeline: "1-2 days",
    severity: "blocker",
    tips: [
      "Ask about future zoning changes — a planned highway or commercial rezoning nearby can change everything",
      "Get the zoning confirmation in writing, not just verbally",
      "Check if there are any HOA or deed restrictions layered on top of zoning",
    ],
  },
  {
    id: "access",
    title: "Legal access",
    why: "You must have a legal right to drive to your land. Sounds obvious until you find out the 'road' on the plat map is a neighbor's driveway and they can gate it tomorrow. Deeded access, recorded easement, or a public road — nothing else counts.",
    howTo: "Review the deed and title report for any recorded easements. Check whether the road is public (maintained by the county) or private. If private, get the easement document and confirm it runs with the land, not with a specific owner.",
    cost: "Included in title search ($200-$500)",
    timeline: "1-2 weeks (part of title work)",
    severity: "blocker",
    tips: [
      "Never accept verbal assurance of access — 'the neighbor lets us use their road' is not access",
      "Check if the road is year-round passable or seasonal (mud, snow)",
      "If the access easement crosses someone else's property, check who maintains it",
    ],
  },
  {
    id: "water",
    title: "Water viability",
    why: "If you cannot get water on the land, you cannot build on it. In rural areas this usually means drilling a well. Wells are expensive, and there is no guarantee of hitting water. You need to know what the aquifer looks like before you buy.",
    howTo: "Talk to a local well driller (not a general contractor — a well driller). Ask them: how deep are wells in this area, what are the typical flow rates, and have they ever drilled a dry hole nearby. Also check the state well logs database — most states have public records of every permitted well with depth and flow data.",
    cost: "Free (phone calls + state database). Well drilling itself is $10,000-$25,000+",
    timeline: "3-5 days for research",
    severity: "blocker",
    tips: [
      "You pay for drilling whether they hit water or not — understand the financial risk",
      "Flow rate matters more than depth. 5 gallons per minute is the minimum for a residential well",
      "Water quality test is required before occupancy — budget for filtration if the area has known issues (arsenic, iron, sulfur)",
    ],
  },
  {
    id: "perc",
    title: "Perc test (septic viability)",
    why: "The perc test determines whether the soil can absorb water from a septic system. If the soil doesn't perc, you either need an expensive alternative system (mound, ATU) or the land is unbuildable. This is the single most common deal-killer on raw land.",
    howTo: "Hire a licensed septic designer or soil scientist to perform the perc test. They dig test holes, pour water in, and measure how fast it drains. Results determine which type of septic system is allowed. Your county health department sets the rules.",
    cost: "$500-$1,500 for the test. System costs range from $12,000 (conventional) to $30,000+ (mound/ATU)",
    timeline: "2-4 weeks (scheduling + results)",
    severity: "blocker",
    tips: [
      "A 'marginal' perc result usually means a mound system — budget accordingly",
      "Test in the wet season if possible — you want worst-case conditions",
      "Some counties require a specific licensed tester. Call the health department before hiring anyone",
      "The perc test location determines where the septic goes, which constrains where the house goes — think about layout before testing",
    ],
  },
  {
    id: "power",
    title: "Power distance",
    why: "How far is the nearest utility pole? The utility company charges per foot to trench power to your building site. 500 feet is affordable ($4,000-$6,000). 2,000 feet starts hurting ($24,000+). 5,000 feet might justify off-grid solar instead.",
    howTo: "Call the local utility company. Give them the parcel number and ask for an estimate to run service. They will tell you the distance, the cost per foot, and whether a new transformer is needed (transformers add $5,000-$15,000).",
    cost: "Free estimate. Typical cost: $8-$15 per foot for underground trench",
    timeline: "1-2 weeks for the estimate",
    severity: "major",
    tips: [
      "Ask if you can dig the trench yourself to save money — some utilities allow this",
      "Underground (trench) is more expensive than overhead but looks better and avoids tree clearance",
      "If the estimate is over $15,000, price out a solar + battery system as a comparison",
      "Power hookup often requires a permit from the county — add this to your permit timeline",
    ],
  },
  {
    id: "flood",
    title: "Flood zone status",
    why: "If the land is in a FEMA flood zone, your insurance costs explode, your permit requirements change dramatically, and your buildable area may shrink to a fraction of the parcel. Not a guaranteed deal-killer, but a massive cost multiplier.",
    howTo: "Check FEMA's Flood Map Service Center (msc.fema.gov). Enter the address or coordinates. Zones A and AE are high-risk. Zone X is low-risk. Zone D means not studied — you are on your own.",
    cost: "Free (online lookup)",
    timeline: "10 minutes",
    severity: "major",
    tips: [
      "Even if the land is in Zone X, check the actual topography — FEMA maps can be outdated",
      "Flood insurance in Zone A/AE can cost $2,000-$10,000+ per year",
      "If only part of the parcel is in a flood zone, you may be able to build on the non-flood portion",
      "A surveyor can do an elevation certificate to determine your exact flood risk relative to the base flood elevation",
    ],
  },
  {
    id: "wetlands",
    title: "Wetlands designation",
    why: "Wetlands are federally protected under the Clean Water Act. If the Army Corps of Engineers has designated any part of your land as wetlands, you cannot fill, grade, or build on that area without a permit that is extremely difficult (and sometimes impossible) to get. This can kill a project permanently.",
    howTo: "Check the US Fish and Wildlife Service National Wetlands Inventory (fws.gov/wetlands/). Also check with your state environmental agency. For certainty, hire an environmental consultant to do a formal wetlands delineation.",
    cost: "Free for the online check. Professional delineation: $2,000-$5,000",
    timeline: "Online check: 30 minutes. Professional delineation: 4-8 weeks",
    severity: "blocker",
    tips: [
      "Wetlands can exist even on land that looks dry — vernal pools, seasonal wetlands, and jurisdictional waters are not always obvious",
      "Do not accept the seller's assurance that there are no wetlands — verify independently",
      "If wetlands are found on part of the parcel, a mitigation plan may allow you to build elsewhere on the property, but this is expensive and slow",
    ],
  },
  {
    id: "survey",
    title: "Boundary survey",
    why: "The plat map is not the property boundary. Fences are not the property boundary. Only a licensed survey is the property boundary. Without a survey, you might build on your neighbor's land, encroach on an easement, or discover the 'road frontage' is 10 feet narrower than you thought.",
    howTo: "Hire a licensed surveyor in your state. They will locate the corners with GPS, mark them with stakes or pins, and produce a certified survey plat. This document is your legal proof of the property boundaries.",
    cost: "$1,200-$3,000 depending on parcel size and terrain",
    timeline: "2-4 weeks",
    severity: "major",
    tips: [
      "Get the survey before closing, not after — it is a legitimate contingency",
      "Ask the surveyor to mark the corners with iron pins and flagging tape",
      "Compare the survey to the legal description in the deed — discrepancies should be resolved before closing",
      "If the parcel is landlocked or has unclear access, the survey is where that becomes legally visible",
    ],
  },
];

const SEVERITY_CONFIG = {
  blocker: { label: "Deal Breaker", color: "#e63946", bg: "rgba(230,57,70,0.06)" },
  major: { label: "Major Cost Factor", color: "#e63946", bg: "rgba(230,57,70,0.06)" },
  minor: { label: "Minor", color: "#4ade80", bg: "rgba(74,222,128,0.06)" },
};

export default function RawLandChecklistPage() {
  const [checked, setChecked] = useState<Record<string, "pass" | "fail" | "pending" | null>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  const completed = ITEMS.filter((item) => checked[item.id] != null).length;
  const blockersFailed = ITEMS.filter((item) => item.severity === "blocker" && checked[item.id] === "fail").length;

  const handleStatus = (id: string, status: "pass" | "fail" | "pending") => {
    setChecked((prev) => ({ ...prev, [id]: prev[id] === status ? null : status }));
  };

  const handleExport = () => {
    const lines = [
      "RAW LAND DUE DILIGENCE CHECKLIST",
      `Generated: ${new Date().toLocaleDateString()}`,
      `Source: https://yorksims.com/tools/raw-land-due-diligence-checklist`,
      "",
      `Completed: ${completed}/${ITEMS.length}`,
      blockersFailed > 0 ? `WARNING: ${blockersFailed} deal-breaker item(s) marked FAIL` : "No deal-breakers flagged.",
      "",
      "─".repeat(60),
      "",
    ];

    for (const item of ITEMS) {
      const status = checked[item.id] ?? "not checked";
      const note = notes[item.id] ?? "";
      lines.push(`[${String(status).toUpperCase().padEnd(7)}] ${item.title} (${SEVERITY_CONFIG[item.severity].label})`);
      if (note) lines.push(`  Notes: ${note}`);
      lines.push("");
    }

    lines.push("─".repeat(60));
    lines.push("");
    lines.push("Full guide: https://yorksims.com/blog/raw-land-development");
    lines.push("DISCLAIMER: This checklist is educational, not legal or professional advice.");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "raw-land-due-diligence-checklist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setEmailSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "tool:raw-land-due-diligence-checklist",
          toolSlug: "raw-land-due-diligence-checklist",
        }),
      });
      setEmailSubmitted(true);
    } catch { /* silent */ } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* Hero */}
      <section className="relative px-6 md:px-16 overflow-hidden" style={{ paddingTop: "100px", paddingBottom: "40px" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/tools" className="text-xs font-mono text-white/20 hover:text-[#e63946] transition-colors">
            ← All tools
          </Link>
          <div style={{ height: "24px" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-5">Land · Free Tool</p>
          <motion.h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1] mb-6"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}>
            Raw Land Due Diligence <span className="text-white/20">Checklist</span>
          </motion.h1>
          <motion.p className="text-lg text-white/40 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
            8 items that determine whether a piece of raw land is buildable. Check each one before you sign anything. Based on my real 10-acre development.
          </motion.p>
        </div>
      </section>

      {/* Progress bar */}
      <section className="px-6 md:px-16" style={{ paddingTop: "24px", paddingBottom: "8px" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-white/30">{completed}/{ITEMS.length} checked</span>
            {blockersFailed > 0 && (
              <span className="text-xs font-mono text-[#e63946]">{blockersFailed} deal-breaker{blockersFailed > 1 ? "s" : ""} failed</span>
            )}
          </div>
          <div className="h-[4px] rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ backgroundColor: blockersFailed > 0 ? "#e63946" : "#e63946" }}
              animate={{ width: `${(completed / ITEMS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: EASE }} />
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="px-6 md:px-16" style={{ paddingTop: "32px", paddingBottom: "80px" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {ITEMS.map((item, i) => {
            const status = checked[item.id];
            const sev = SEVERITY_CONFIG[item.severity];

            return (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
                className="border border-white/[0.06] rounded-[20px] overflow-hidden transition-all"
                style={{ borderColor: status === "fail" ? "rgba(230,57,70,0.3)" : status === "pass" ? "rgba(74,222,128,0.15)" : undefined }}>

                <details className="group">
                  <summary className="cursor-pointer list-none px-7 py-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className="text-xs font-mono text-white/25 w-5">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
                          <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
                            style={{ color: sev.color, backgroundColor: sev.bg }}>
                            {sev.label}
                          </span>
                        </div>
                        <p className="text-sm text-white/30 leading-relaxed line-clamp-1">{item.why.split(".")[0]}.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {(["pass", "pending", "fail"] as const).map((s) => (
                        <button key={s} type="button"
                          onClick={(e) => { e.preventDefault(); handleStatus(item.id, s); }}
                          className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all"
                          style={{
                            borderColor: status === s ? (s === "pass" ? "#4ade80" : s === "fail" ? "#e63946" : "#e63946") : "rgba(255,255,255,0.08)",
                            backgroundColor: status === s ? (s === "pass" ? "rgba(74,222,128,0.1)" : s === "fail" ? "rgba(230,57,70,0.1)" : "rgba(230,57,70,0.1)") : "transparent",
                            color: status === s ? (s === "pass" ? "#4ade80" : s === "fail" ? "#e63946" : "#e63946") : "rgba(255,255,255,0.35)",
                          }}>
                          {s === "pass" ? "Pass" : s === "fail" ? "Fail" : "TBD"}
                        </button>
                      ))}
                      <span className="text-white/20 group-open:rotate-90 transition-transform ml-2">▶</span>
                    </div>
                  </summary>

                  <div className="px-7 pb-7 pt-2 border-t border-white/[0.04]">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-2">Why it matters</p>
                        <p className="text-sm text-white/50 leading-relaxed">{item.why}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-2">How to check</p>
                        <p className="text-sm text-white/50 leading-relaxed">{item.howTo}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Cost:</span>
                        <span className="text-sm text-white/50">{item.cost}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Timeline:</span>
                        <span className="text-sm text-white/50">{item.timeline}</span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-2">Tips</p>
                      <ul className="flex flex-col gap-2">
                        {item.tips.map((tip, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#e63946] flex-shrink-0" />
                            <span className="text-sm text-white/45 leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-2">Your notes</p>
                      <textarea
                        value={notes[item.id] ?? ""}
                        onChange={(e) => setNotes((prev) => ({ ...prev, [item.id]: e.target.value }))}
                        placeholder="Add notes for this item..."
                        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-[12px] px-4 py-3 text-sm text-white/60 placeholder:text-white/20 focus:outline-none focus:border-[#e63946]/40 resize-none min-h-[80px]"
                      />
                    </div>
                  </div>
                </details>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Export + email */}
      <section className="px-6 md:px-16 border-t border-white/[0.06]" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Export */}
            <div className="flex-1 border border-white/[0.06] rounded-[20px] p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-3">Export</p>
              <h3 className="text-xl font-black tracking-tight mb-3">Download your checklist</h3>
              <p className="text-sm text-white/40 mb-6 leading-relaxed">
                Plain text file with all 8 items, your status marks, and your notes. Share it with your attorney, your lender, or yourself in 6 months.
              </p>
              <button onClick={handleExport} type="button"
                className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-3 bg-[#e63946] text-[#0a0a0a] rounded-full hover:bg-[#ffbb33] transition-all hover:scale-105">
                Download Checklist
              </button>
            </div>

            {/* Email */}
            <div className="flex-1 border border-white/[0.06] rounded-[20px] p-8" style={{ background: "rgba(230,57,70,0.02)" }}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-3">Stay updated</p>
              <h3 className="text-xl font-black tracking-tight mb-3">Get the full land development guide</h3>
              <p className="text-sm text-white/40 mb-6 leading-relaxed">
                The blog post behind this tool covers every item in depth — plus well costs, septic systems, and the full math on a real 10-acre development.
              </p>
              {emailSubmitted ? (
                <p className="text-sm text-[#4ade80] font-mono">Sent. Check your inbox.</p>
              ) : (
                <form onSubmit={handleEmail} className="flex flex-col sm:flex-row gap-3">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com" required
                    className="flex-1 bg-white/[0.02] border border-white/[0.08] rounded-full px-5 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#e63946]/50" />
                  <button type="submit" disabled={emailSubmitting}
                    className="text-sm font-bold uppercase tracking-widest px-6 py-3 bg-[#e63946] text-[#0a0a0a] rounded-full hover:bg-[#ffbb33] transition-all disabled:opacity-40">
                    {emailSubmitting ? "..." : "Send"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related content */}
      <section className="px-6 md:px-16" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/blog/raw-land-development" className="text-sm text-white/30 hover:text-[#e63946] transition-colors font-mono">
            Read the full breakdown: Developing Raw Land From Scratch →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-16 border-t border-white/[0.06]" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[2px] w-10 bg-[#e63946]" />
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { q: "What does this checklist cover?", a: "Eight critical due diligence items: zoning, legal access, water viability, perc test for septic, power distance, flood zone status, wetlands designation, and boundary survey." },
              { q: "How long does due diligence take?", a: "Typically 4 to 8 weeks. The perc test and survey are the longest lead-time items. Start all items in parallel." },
              { q: "What if one item fails?", a: "Depends on which one. A failed perc test means a more expensive septic system. A wetlands designation could kill the project. The checklist flags severity per item." },
              { q: "Is this specific to my state?", a: "The 8 items are universal across all US states. Specific requirements vary by county. Call your county planning office for local details." },
            ].map((f, i) => (
              <details key={i} className="border border-white/[0.06] rounded-[16px] px-6 py-5 group">
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="text-base font-bold text-white">{f.q}</span>
                  <span className="text-[#e63946] group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="text-sm text-white/40 mt-4 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "48px", paddingBottom: "48px", display: "flex", justifyContent: "center" }}>
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" style={{ height: "60px", width: "auto" }} />
          <p className="text-xs text-white/20 font-mono">Teaching Execution, Not Theory</p>
          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            {[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Blog", href: "/blog" },
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
