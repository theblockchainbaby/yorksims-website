"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import {
  generateLlcAgreement,
  generateLlcAgreementHtml,
  type LlcAgreementInput,
  type MemberStructure,
  type ManagementStructure,
  type Member,
} from "../../lib/llc-template";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

const TOTAL_STEPS = 6;

/* ─────────────────────────────────────────────────────────────── */

export default function LlcGeneratorPage() {
  const [step, setStep] = useState(0);
  const [entityName, setEntityName] = useState("");
  const [state, setState] = useState("Wyoming");
  const [formationDate, setFormationDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [principalOffice, setPrincipalOffice] = useState("");
  const [purpose, setPurpose] = useState("");
  const [memberStructure, setMemberStructure] =
    useState<MemberStructure>("single");
  const [managementStructure, setManagementStructure] =
    useState<ManagementStructure>("member-managed");
  const [members, setMembers] = useState<Member[]>([
    { name: "", contribution: 1000, ownershipPct: 100 },
  ]);

  const [generated, setGenerated] = useState<string | null>(null);
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const input: LlcAgreementInput = useMemo(
    () => ({
      entityName: entityName || "[Entity Name]",
      state,
      formationDate,
      principalOffice: principalOffice || "[Principal Office Address]",
      purpose: purpose || "any lawful business activity",
      memberStructure,
      managementStructure,
      members:
        memberStructure === "single"
          ? [{ ...members[0], ownershipPct: 100 }]
          : members,
    }),
    [
      entityName,
      state,
      formationDate,
      principalOffice,
      purpose,
      memberStructure,
      managementStructure,
      members,
    ]
  );

  /* ── Step validity ── */
  const canAdvance = (() => {
    switch (step) {
      case 0:
        return entityName.trim().length >= 2;
      case 1:
        return Boolean(state) && Boolean(formationDate);
      case 2:
        return principalOffice.trim().length >= 4 && purpose.trim().length >= 4;
      case 3:
        return memberStructure === "single" || memberStructure === "multi";
      case 4:
        return members.every(
          (m) => m.name.trim().length >= 2 && m.contribution >= 0
        );
      case 5:
        return Boolean(managementStructure);
      default:
        return true;
    }
  })();

  /* ── Member management ── */
  const addMember = () => {
    setMembers((prev) => {
      const count = prev.length + 1;
      const evenPct = Number((100 / count).toFixed(2));
      const rebalanced = prev.map((m) => ({ ...m, ownershipPct: evenPct }));
      return [
        ...rebalanced,
        { name: "", contribution: 1000, ownershipPct: evenPct },
      ];
    });
  };
  const removeMember = (index: number) => {
    setMembers((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((_, i) => i !== index);
      const evenPct = Number((100 / next.length).toFixed(2));
      return next.map((m) => ({ ...m, ownershipPct: evenPct }));
    });
  };
  const updateMember = (
    index: number,
    patch: Partial<Member>
  ): void => {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, ...patch } : m))
    );
  };

  /* ── Generation ── */
  const handleGenerate = () => {
    setGenerated(generateLlcAgreement(input));
  };

  /* ── Email unlock ── */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    setEmailSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "tool:llc-operating-agreement-generator",
          toolSlug: "llc-operating-agreement-generator",
          metadata: {
            entityName: input.entityName,
            state: input.state,
            memberStructure: input.memberStructure,
          },
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setEmailUnlocked(true);
    } catch {
      setEmailError("Something went wrong. Try again.");
    } finally {
      setEmailSubmitting(false);
    }
  };

  /* ── Downloads ── */
  const downloadText = () => {
    if (!generated) return;
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName(input.entityName)}-operating-agreement.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const downloadHtml = () => {
    if (!generated) return;
    const html = generateLlcAgreementHtml(input);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName(input.entityName)}-operating-agreement.html`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const copyText = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* ── HERO ── */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "100px", paddingBottom: "40px" }}
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/tools"
            className="text-xs font-mono text-white/20 hover:text-[#e63946] transition-colors"
          >
            ← All tools
          </Link>
          <div style={{ height: "24px" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-5">
            Business · Free Tool
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1] mb-6">
            LLC Operating Agreement <span className="text-white/20">Generator</span>
          </h1>
          <p className="text-lg text-white/40 leading-relaxed max-w-2xl">
            Answer 6 questions. Get a state-customized operating agreement
            draft you can review with an attorney. Single or multi-member.
            Member or manager managed. No signup wall to use it.
          </p>
        </div>
      </section>

      {/* ── WIZARD OR RESULT ── */}
      <section
        className="px-6 md:px-16"
        style={{ paddingTop: "40px", paddingBottom: "80px" }}
      >
        <div className="max-w-3xl mx-auto">
          {!generated ? (
            <Wizard
              step={step}
              setStep={setStep}
              canAdvance={canAdvance}
              onGenerate={handleGenerate}
              {...{
                entityName,
                setEntityName,
                state,
                setState,
                formationDate,
                setFormationDate,
                principalOffice,
                setPrincipalOffice,
                purpose,
                setPurpose,
                memberStructure,
                setMemberStructure,
                managementStructure,
                setManagementStructure,
                members,
                addMember,
                removeMember,
                updateMember,
              }}
            />
          ) : (
            <Result
              generated={generated}
              emailUnlocked={emailUnlocked}
              email={email}
              setEmail={setEmail}
              emailSubmitting={emailSubmitting}
              emailError={emailError}
              onEmailSubmit={handleEmailSubmit}
              downloadText={downloadText}
              downloadHtml={downloadHtml}
              copyText={copyText}
              onEdit={() => setGenerated(null)}
            />
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "80px", paddingBottom: "120px" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[2px] w-10 bg-[#e63946]" />
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Questions & Answers
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {FAQ_ITEMS.map((f, i) => (
              <details
                key={i}
                className="border border-white/[0.06] rounded-[16px] px-6 py-5 group"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="text-base font-bold text-white">
                    {f.q}
                  </span>
                  <span className="text-[#e63946] group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-white/40 mt-4 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
              { label: "Tools", href: "/tools" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
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

/* ─────────────────────────────────────────────────────────────── */
/* WIZARD                                                           */
/* ─────────────────────────────────────────────────────────────── */

interface WizardProps {
  step: number;
  setStep: (n: number) => void;
  canAdvance: boolean;
  onGenerate: () => void;

  entityName: string;
  setEntityName: (v: string) => void;
  state: string;
  setState: (v: string) => void;
  formationDate: string;
  setFormationDate: (v: string) => void;
  principalOffice: string;
  setPrincipalOffice: (v: string) => void;
  purpose: string;
  setPurpose: (v: string) => void;
  memberStructure: MemberStructure;
  setMemberStructure: (v: MemberStructure) => void;
  managementStructure: ManagementStructure;
  setManagementStructure: (v: ManagementStructure) => void;
  members: Member[];
  addMember: () => void;
  removeMember: (i: number) => void;
  updateMember: (i: number, patch: Partial<Member>) => void;
}

function Wizard(props: WizardProps) {
  const {
    step,
    setStep,
    canAdvance,
    onGenerate,
    entityName,
    setEntityName,
    state,
    setState,
    formationDate,
    setFormationDate,
    principalOffice,
    setPrincipalOffice,
    purpose,
    setPurpose,
    memberStructure,
    setMemberStructure,
    managementStructure,
    setManagementStructure,
    members,
    addMember,
    removeMember,
    updateMember,
  } = props;

  return (
    <div
      className="border border-white/[0.06] rounded-[24px]"
      style={{ padding: "44px 48px" }}
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-mono text-white/30">
          Step {step + 1} of {TOTAL_STEPS}
        </span>
        <div className="flex gap-[6px]">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className="h-[3px] w-8 rounded-full"
              style={{
                backgroundColor:
                  i <= step ? "#e63946" : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <StepFrame title="What is the entity name?" subtitle="The legal name exactly as it will appear on formation documents.">
              <input
                type="text"
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                placeholder="Acme Holdings LLC"
                className="input-field"
                autoFocus
              />
              <p className="text-xs text-white/30 mt-3">
                Include the entity designator (LLC, L.L.C., Limited Liability Company). Most states require it on the formation filing.
              </p>
            </StepFrame>
          )}

          {step === 1 && (
            <StepFrame
              title="Where is the LLC formed?"
              subtitle="Pick the state of formation and the effective date."
            >
              <label className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                State of Formation
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="input-field mt-2"
              >
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <div className="mt-6">
                <label className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                  Formation Date
                </label>
                <input
                  type="date"
                  value={formationDate}
                  onChange={(e) => setFormationDate(e.target.value)}
                  className="input-field mt-2"
                />
              </div>
            </StepFrame>
          )}

          {step === 2 && (
            <StepFrame title="Where is the principal office and what does the company do?">
              <label className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                Principal Office Address
              </label>
              <input
                type="text"
                value={principalOffice}
                onChange={(e) => setPrincipalOffice(e.target.value)}
                placeholder="123 Main St, City, ST 00000"
                className="input-field mt-2"
                autoFocus
              />

              <div className="mt-6">
                <label className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                  Primary Business Purpose
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="software development and consulting services"
                  className="input-field mt-2 min-h-[100px]"
                />
                <p className="text-xs text-white/30 mt-2">
                  Keep it broad enough to cover future pivots. Most operating
                  agreements add &ldquo;and any other lawful business&rdquo; —
                  we append that automatically.
                </p>
              </div>
            </StepFrame>
          )}

          {step === 3 && (
            <StepFrame
              title="Single-member or multi-member?"
              subtitle="This changes the entire structure of the agreement."
            >
              <div className="grid md:grid-cols-2 gap-4">
                <OptionCard
                  selected={memberStructure === "single"}
                  onClick={() => setMemberStructure("single")}
                  title="Single-Member"
                  body="You are the only owner. Taxed as a disregarded entity by default. Simpler agreement."
                />
                <OptionCard
                  selected={memberStructure === "multi"}
                  onClick={() => setMemberStructure("multi")}
                  title="Multi-Member"
                  body="Two or more owners. Taxed as a partnership by default. Includes buy-sell and ROFR."
                />
              </div>
            </StepFrame>
          )}

          {step === 4 && (
            <StepFrame
              title={
                memberStructure === "single"
                  ? "Tell us about the member"
                  : "Add the members"
              }
              subtitle={
                memberStructure === "single"
                  ? "Just you. Name and initial capital contribution."
                  : "Each member's name, capital contribution, and ownership %."
              }
            >
              <div className="flex flex-col gap-4">
                {members.map((m, i) => (
                  <div
                    key={i}
                    className="border border-white/[0.06] rounded-[16px] p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                        Member {String(i + 1).padStart(2, "0")}
                      </span>
                      {memberStructure === "multi" && members.length > 1 && (
                        <button
                          onClick={() => removeMember(i)}
                          className="text-xs text-white/30 hover:text-[#e63946] transition-colors"
                          type="button"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <label className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) =>
                        updateMember(i, { name: e.target.value })
                      }
                      placeholder="York Sims"
                      className="input-field mt-2"
                    />

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                          Capital Contribution (USD)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={m.contribution}
                          onChange={(e) =>
                            updateMember(i, {
                              contribution: Number(e.target.value),
                            })
                          }
                          className="input-field mt-2"
                        />
                      </div>
                      {memberStructure === "multi" && (
                        <div>
                          <label className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                            Ownership %
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={m.ownershipPct}
                            onChange={(e) =>
                              updateMember(i, {
                                ownershipPct: Number(e.target.value),
                              })
                            }
                            className="input-field mt-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {memberStructure === "multi" && (
                  <button
                    onClick={addMember}
                    type="button"
                    className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-[#e63946] transition-colors mt-2"
                  >
                    + Add another member
                  </button>
                )}
              </div>

              {memberStructure === "multi" && (
                <p className="text-xs text-white/30 mt-5">
                  Ownership percentages should total 100. We don&rsquo;t
                  auto-correct — double-check before generating.
                </p>
              )}
            </StepFrame>
          )}

          {step === 5 && (
            <StepFrame
              title="Who manages the company?"
              subtitle="Member-managed is the default. Pick manager-managed if you want to separate ownership from day-to-day decisions."
            >
              <div className="grid md:grid-cols-2 gap-4">
                <OptionCard
                  selected={managementStructure === "member-managed"}
                  onClick={() => setManagementStructure("member-managed")}
                  title="Member-Managed"
                  body="Members run the company. Simplest. Works for most solo and small-team LLCs."
                />
                <OptionCard
                  selected={managementStructure === "manager-managed"}
                  onClick={() => setManagementStructure("manager-managed")}
                  title="Manager-Managed"
                  body="One or more Managers run the company. Cleaner for passive investors or separation of ownership."
                />
              </div>
            </StepFrame>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          type="button"
          className="text-sm font-mono text-white/30 hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
        >
          ← Back
        </button>

        {step < TOTAL_STEPS - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canAdvance}
            type="button"
            className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-3 bg-[#e63946] text-[#0a0a0a] rounded-full hover:bg-[#ffae5c] transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={onGenerate}
            disabled={!canAdvance}
            type="button"
            className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-3 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Generate Agreement
          </button>
        )}
      </div>

      {/* Input styles scoped to this component */}
      <style jsx>{`
        :global(.input-field) {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px 18px;
          color: white;
          font-size: 15px;
          transition: all 0.2s;
          font-family: inherit;
        }
        :global(.input-field:focus) {
          outline: none;
          border-color: rgba(230, 57, 70, 0.6);
          background: rgba(255, 255, 255, 0.04);
        }
        :global(.input-field::placeholder) {
          color: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </div>
  );
}

function StepFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-white/40 mb-6 leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  body,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  body: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left border rounded-[16px] p-6 transition-all"
      style={{
        borderColor: selected
          ? "rgba(230,57,70,0.6)"
          : "rgba(255,255,255,0.08)",
        background: selected
          ? "rgba(230,57,70,0.04)"
          : "transparent",
      }}
    >
      <h3 className="text-lg font-black tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{body}</p>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* RESULT                                                           */
/* ─────────────────────────────────────────────────────────────── */

function Result({
  generated,
  emailUnlocked,
  email,
  setEmail,
  emailSubmitting,
  emailError,
  onEmailSubmit,
  downloadText,
  downloadHtml,
  copyText,
  onEdit,
}: {
  generated: string;
  emailUnlocked: boolean;
  email: string;
  setEmail: (v: string) => void;
  emailSubmitting: boolean;
  emailError: string | null;
  onEmailSubmit: (e: React.FormEvent) => void;
  downloadText: () => void;
  downloadHtml: () => void;
  copyText: () => void;
  onEdit: () => void;
}) {
  const PREVIEW_CHARS = 1400;
  const preview = emailUnlocked
    ? generated
    : generated.slice(0, PREVIEW_CHARS) + "\n\n...";

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          Your Operating Agreement
        </h2>
        <button
          onClick={onEdit}
          type="button"
          className="text-xs font-mono text-white/40 hover:text-[#e63946] transition-colors"
        >
          ← Edit answers
        </button>
      </div>

      {/* Preview */}
      <div
        className="border border-white/[0.06] rounded-[20px] overflow-hidden relative"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <pre
          className="text-[13px] leading-[1.7] text-white/60 p-8 max-h-[540px] overflow-y-auto whitespace-pre-wrap font-mono"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          {preview}
        </pre>

        {!emailUnlocked && (
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "160px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.9) 60%, #0a0a0a 100%)",
            }}
          />
        )}
      </div>

      {/* Gate or Actions */}
      {!emailUnlocked ? (
        <form
          onSubmit={onEmailSubmit}
          className="mt-8 border border-white/[0.08] rounded-[20px] p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(230,57,70,0.04), rgba(255,255,255,0.005))",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-3">
            Unlock full agreement
          </p>
          <h3 className="text-xl font-black tracking-tight mb-3">
            Drop your email. Get the full agreement + the next free tool.
          </h3>
          <p className="text-sm text-white/40 mb-6 leading-relaxed">
            We send you the full agreement, one weekly build breakdown from
            York, and access to new tools as they ship. No spam, cancel in one
            click.
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="input-field flex-1"
              required
            />
            <button
              type="submit"
              disabled={emailSubmitting}
              className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-3 bg-[#e63946] text-[#0a0a0a] rounded-full hover:bg-[#ffae5c] transition-all hover:scale-105 disabled:opacity-40"
            >
              {emailSubmitting ? "Unlocking..." : "Unlock"}
            </button>
          </div>
          {emailError && (
            <p className="text-xs text-[#e63946] mt-3">{emailError}</p>
          )}

          <style jsx>{`
            :global(.input-field) {
              width: 100%;
              background: rgba(255, 255, 255, 0.02);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 999px;
              padding: 14px 22px;
              color: white;
              font-size: 15px;
              font-family: inherit;
            }
            :global(.input-field:focus) {
              outline: none;
              border-color: rgba(230, 57, 70, 0.6);
            }
          `}</style>
        </form>
      ) : (
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button
            onClick={downloadHtml}
            type="button"
            className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-4 bg-[#e63946] text-[#0a0a0a] rounded-full hover:bg-[#ffae5c] transition-all hover:scale-105"
          >
            Download HTML
          </button>
          <button
            onClick={downloadText}
            type="button"
            className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-4 border border-white/10 text-white/70 rounded-full hover:border-white/30 hover:text-white transition-all"
          >
            Download Text
          </button>
          <button
            onClick={copyText}
            type="button"
            className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-4 border border-white/10 text-white/70 rounded-full hover:border-white/30 hover:text-white transition-all"
          >
            Copy to Clipboard
          </button>
        </div>
      )}

      {/* Attorney notice */}
      <div className="mt-10 border-l-2 border-[#e63946] pl-6 py-3">
        <p className="text-xs font-mono uppercase tracking-wider text-[#e63946] mb-2">
          Important
        </p>
        <p className="text-sm text-white/50 leading-relaxed">
          This draft is a starting point, not legal advice. Before executing,
          have it reviewed by a licensed attorney in your state. Every
          jurisdiction has quirks the generator does not handle automatically.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* HELPERS                                                          */
/* ─────────────────────────────────────────────────────────────── */

function safeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "llc";
}

const FAQ_ITEMS = [
  {
    q: "Is this legally binding?",
    a: "The generated document is a starting draft, not legal advice. It includes common provisions used in most US states, but you should review it with a licensed attorney before signing. Every draft carries a clear disclaimer with this guidance.",
  },
  {
    q: "Single-member vs multi-member LLC — what's the difference?",
    a: "Single-member LLCs are taxed as disregarded entities by default, so the income flows through to your personal return as sole proprietor income. Multi-member LLCs default to partnership taxation. The structural difference in the agreement is significant — multi-member versions include capital contributions per member, ownership percentages, buy-sell, right of first refusal, and distribution mechanics.",
  },
  {
    q: "Member-managed or manager-managed?",
    a: "Member-managed is the default for most small LLCs — the members run the company. Manager-managed separates ownership from day-to-day management, which is cleaner if you have passive investors or want a clear chain of authority. Our generator produces different management articles based on your pick.",
  },
  {
    q: "Can I edit the agreement after generating?",
    a: "Yes. You can copy the plain text, download it as a formatted HTML document (prints cleanly to PDF from any browser), or send it to your attorney. All edits happen outside the generator.",
  },
  {
    q: "Which states are supported?",
    a: "All 50 US states. The governing law clause and formation references are customized to your pick. State-specific quirks (like Wyoming's series LLC or California's $800 franchise tax) are not automatically handled — that is what attorney review is for.",
  },
  {
    q: "Do you save my information?",
    a: "The operating agreement itself is generated entirely in your browser and never sent to our servers. If you provide an email to unlock the download, we save the email to send you follow-ups about new tools and posts. Unsubscribe in one click.",
  },
];
