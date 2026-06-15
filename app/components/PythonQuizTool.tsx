"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";

const ACCENT = "#e63946";

/* ────────────────────────────────────────────────────────────── */
/* TYPES                                                            */
/* ────────────────────────────────────────────────────────────── */

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Tier {
  label: string;
  message: string;
  headline: string;
  advice: string;
  actions: { label: string; href: string; primary?: boolean; external?: boolean }[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PythonQuizConfig {
  /** URL-safe slug for the tool — used in lead capture analytics. */
  quizSlug: string;
  /** Small kicker above the title, e.g. "Software · Free Tool". */
  kicker: string;
  /** Main title, e.g. "Python Lists & Loops Quiz". */
  title: string;
  /** Greyed suffix appended to title, e.g. "— 20 Questions". */
  titleSuffix?: string;
  /** Subtitle / hero copy. */
  subtitle: string;
  /** The quiz questions. */
  questions: QuizQuestion[];
  /** Human-readable labels for each topic key used in `questions[].topic`. */
  topicLabels: Record<string, string>;
  /** Ordered list of topic keys (for the breakdown panel). */
  topics: string[];
  /** Score-tier function — drives the "what to do next" recommendation. */
  tier: (pct: number) => Tier;
  /** FAQ items shown below the quiz. */
  faqItems: FaqItem[];
}

type Answers = Record<string, number | null>;

interface TopicScore {
  topic: string;
  correct: number;
  total: number;
  pct: number;
}

/* ────────────────────────────────────────────────────────────── */
/* MAIN COMPONENT                                                  */
/* ────────────────────────────────────────────────────────────── */

export default function PythonQuizTool(config: PythonQuizConfig) {
  const {
    quizSlug,
    kicker,
    title,
    titleSuffix,
    subtitle,
    questions,
    topicLabels,
    topics,
    tier,
    faqItems,
  } = config;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const total = questions.length;
  const current = questions[index];
  const currentAnswer = answers[current.id] ?? null;
  const hasAnsweredCurrent = currentAnswer !== null;
  const isLast = index === total - 1;
  const answeredCount = Object.values(answers).filter(
    (v) => v !== null && v !== undefined
  ).length;

  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) correct++;
    }
    return { correct, total, pct: Math.round((correct / total) * 100) };
  }, [submitted, answers, total, questions]);

  const topicScores: TopicScore[] = useMemo(() => {
    return topics.map((topic) => {
      const topicQs = questions.filter((q) => q.topic === topic);
      const correct = topicQs.filter(
        (q) => answers[q.id] === q.correctIndex
      ).length;
      return {
        topic,
        correct,
        total: topicQs.length,
        pct:
          topicQs.length === 0
            ? 0
            : Math.round((correct / topicQs.length) * 100),
      };
    });
  }, [answers, topics, questions]);

  function selectAnswer(optIdx: number) {
    setAnswers((prev) => ({ ...prev, [current.id]: optIdx }));
  }

  function goNext() {
    if (isLast) {
      setSubmitted(true);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setIndex((i) => Math.min(i + 1, total - 1));
    }
  }

  function goPrev() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  function retake() {
    setAnswers({});
    setSubmitted(false);
    setIndex(0);
    setEmail("");
    setEmailUnlocked(false);
    setEmailError(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
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
          source: `tool:${quizSlug}`,
          toolSlug: quizSlug,
          metadata: {
            score: score?.pct,
            correct: score?.correct,
            total: score?.total,
            weakestTopic: weakest(topicScores)?.topic,
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
  }

  /* ────────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-[#0c0a0a] text-white">
      <Nav />

      {/* HERO */}
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
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse, ${ACCENT}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/tools"
            className="text-xs font-mono text-white/20 hover:text-white transition-colors"
          >
            ← All tools
          </Link>
          <div style={{ height: "28px" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-5">
            {kicker}
          </p>
          <motion.h1
            className="text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-[1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
            {titleSuffix && (
              <>
                {" "}
                <span className="text-white/20">{titleSuffix}</span>
              </>
            )}
          </motion.h1>
          <motion.p
            className="text-lg text-white/40 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* QUIZ OR RESULTS */}
      <section
        className="px-6 md:px-16"
        style={{ paddingTop: "40px", paddingBottom: "80px" }}
      >
        <div className="max-w-3xl mx-auto">
          {!submitted ? (
            <QuizBody
              index={index}
              total={total}
              current={current}
              currentAnswer={currentAnswer}
              hasAnsweredCurrent={hasAnsweredCurrent}
              isLast={isLast}
              answeredCount={answeredCount}
              topicLabels={topicLabels}
              selectAnswer={selectAnswer}
              goNext={goNext}
              goPrev={goPrev}
            />
          ) : (
            <Results
              score={score!}
              topicScores={topicScores}
              topicLabels={topicLabels}
              tier={tier}
              email={email}
              setEmail={setEmail}
              emailSubmitting={emailSubmitting}
              emailUnlocked={emailUnlocked}
              emailError={emailError}
              handleEmailSubmit={handleEmailSubmit}
              retake={retake}
            />
          )}
        </div>
      </section>

      {/* ATTRIBUTION + FAQ */}
      <section
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{ paddingTop: "60px", paddingBottom: "100px" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[2px] w-10 bg-[#e63946]" />
            <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">
              Questions
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqItems.map((f, i) => (
              <details
                key={i}
                className="border border-white/[0.06] rounded-[16px] px-6 py-5 group"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="text-base font-bold text-white">{f.q}</span>
                  <span className="text-[#e63946] group-open:rotate-45 transition-transform text-xl">
                    +
                  </span>
                </summary>
                <p className="text-sm text-white/40 mt-4 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-xs text-white/30 leading-relaxed">
            <p className="font-mono uppercase tracking-wider text-white/40 mb-2">
              Source
            </p>
            <p>
              Questions are original to YorkSims. Topics align with{" "}
              <em>Python for Everybody</em> by Dr. Charles R. Severance,{" "}
              <a
                href="https://www.py4e.com/html3/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#e63946]"
              >
                py4e.com
              </a>
              , licensed under Creative Commons Attribution 3.0 Unported.
            </p>
          </div>
        </div>
      </section>

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
              { label: "Tools", href: "/tools" },
              { label: "Verticals", href: "/verticals" },
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

/* ────────────────────────────────────────────────────────────── */
/* QUIZ BODY                                                       */
/* ────────────────────────────────────────────────────────────── */

interface QuizBodyProps {
  index: number;
  total: number;
  current: QuizQuestion;
  currentAnswer: number | null;
  hasAnsweredCurrent: boolean;
  isLast: boolean;
  answeredCount: number;
  topicLabels: Record<string, string>;
  selectAnswer: (i: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

function QuizBody({
  index,
  total,
  current,
  currentAnswer,
  hasAnsweredCurrent,
  isLast,
  answeredCount,
  topicLabels,
  selectAnswer,
  goNext,
  goPrev,
}: QuizBodyProps) {
  return (
    <div
      className="border border-white/[0.06] rounded-[24px]"
      style={{ padding: "40px 44px" }}
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <span className="text-xs font-mono text-white/30">
          Question {index + 1} of {total}
        </span>
        <span className="text-xs font-mono text-white/30">
          {topicLabels[current.topic] ?? current.topic}
        </span>
      </div>
      <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden mb-10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: ACCENT }}
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <QuestionDisplay
            text={current.question}
            options={current.options}
            selected={currentAnswer}
            correct={current.correctIndex}
            explanation={current.explanation}
            onSelect={selectAnswer}
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between mt-10 flex-wrap gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="text-sm font-mono text-white/30 hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <span className="text-xs text-white/25 font-mono">
          {answeredCount}/{total} answered
        </span>

        <button
          type="button"
          onClick={goNext}
          disabled={!hasAnsweredCurrent}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-7 py-3 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 bg-[#e63946] text-white hover:bg-[#ff4d5a]"
        >
          {isLast ? "Finish Quiz" : "Next →"}
        </button>
      </div>
    </div>
  );
}

function QuestionDisplay({
  text,
  options,
  selected,
  correct,
  explanation,
  onSelect,
}: {
  text: string;
  options: string[];
  selected: number | null;
  correct: number;
  explanation: string;
  onSelect: (i: number) => void;
}) {
  const isAnswered = selected !== null;
  const isCorrect = selected === correct;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-display font-extrabold tracking-tight mb-8 leading-snug">
        {text}
      </h2>

      <div className="flex flex-col gap-3">
        {options.map((opt, i) => {
          const isThisSelected = selected === i;
          const isThisCorrect = i === correct;

          let borderColor = "rgba(255,255,255,0.08)";
          let bg = "transparent";
          let textColor = "rgba(255,255,255,0.7)";

          if (isAnswered) {
            if (isThisCorrect) {
              borderColor = "rgba(74,222,128,0.5)";
              bg = "rgba(74,222,128,0.06)";
              textColor = "rgba(255,255,255,0.9)";
            } else if (isThisSelected) {
              borderColor = "rgba(230,57,70,0.5)";
              bg = "rgba(230,57,70,0.06)";
              textColor = "rgba(255,255,255,0.8)";
            }
          } else if (isThisSelected) {
            borderColor = "rgba(230,57,70,0.5)";
            bg = "rgba(230,57,70,0.04)";
            textColor = "rgba(255,255,255,0.9)";
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => !isAnswered && onSelect(i)}
              disabled={isAnswered}
              className="text-left rounded-[14px] px-5 py-4 transition-all border flex items-start gap-3 disabled:cursor-default"
              style={{
                borderColor,
                background: bg,
                color: textColor,
              }}
            >
              <span
                className="text-[10px] font-mono font-bold mt-[3px] flex-shrink-0"
                style={{
                  color: isAnswered
                    ? isThisCorrect
                      ? "#4ade80"
                      : isThisSelected
                        ? "#e63946"
                        : "rgba(255,255,255,0.3)"
                    : "rgba(255,255,255,0.4)",
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[15px] leading-relaxed">{opt}</span>
              {isAnswered && isThisCorrect && (
                <span className="ml-auto text-[#4ade80] text-sm flex-shrink-0">
                  ✓
                </span>
              )}
              {isAnswered && !isThisCorrect && isThisSelected && (
                <span className="ml-auto text-[#e63946] text-sm flex-shrink-0">
                  ✕
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 border-l-2 pl-5 py-3"
          style={{ borderColor: isCorrect ? "#4ade80" : "#e63946" }}
        >
          <p
            className="text-[10px] uppercase tracking-widest font-mono mb-2"
            style={{ color: isCorrect ? "#4ade80" : "#e63946" }}
          >
            {isCorrect ? "Correct" : "Not quite"}
          </p>
          <p className="text-sm text-white/55 leading-relaxed">{explanation}</p>
        </motion.div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* RESULTS                                                          */
/* ────────────────────────────────────────────────────────────── */

interface ResultsProps {
  score: { correct: number; total: number; pct: number };
  topicScores: TopicScore[];
  topicLabels: Record<string, string>;
  tier: (pct: number) => Tier;
  email: string;
  setEmail: (v: string) => void;
  emailSubmitting: boolean;
  emailUnlocked: boolean;
  emailError: string | null;
  handleEmailSubmit: (e: React.FormEvent) => void;
  retake: () => void;
}

function Results({
  score,
  topicScores,
  topicLabels,
  tier,
  email,
  setEmail,
  emailSubmitting,
  emailUnlocked,
  emailError,
  handleEmailSubmit,
  retake,
}: ResultsProps) {
  const tierData = tier(score.pct);
  const weakestTopic = topicScores
    .filter((t) => t.total > 0)
    .sort((a, b) => a.pct - b.pct)[0];

  return (
    <div>
      {/* Score headline */}
      <div className="text-center mb-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-5">
          Your Score
        </p>
        <div className="flex items-baseline justify-center gap-3 mb-4">
          <span className="text-7xl md:text-8xl font-display font-extrabold tracking-tight">
            {score.correct}
          </span>
          <span className="text-2xl text-white/30">/ {score.total}</span>
        </div>
        <p className="text-sm text-white/40 font-mono mb-1">
          {score.pct}% correct
        </p>
        <p className="text-base text-white/60 max-w-lg mx-auto mt-4 leading-relaxed">
          {tierData.label} — {tierData.message}
        </p>
      </div>

      {/* Per-topic breakdown */}
      <div className="border border-white/[0.06] rounded-[24px] p-8 mb-8">
        <h3 className="text-lg font-display font-extrabold tracking-tight mb-6">
          Breakdown by topic
        </h3>
        <div className="flex flex-col gap-4">
          {topicScores.map((t) => (
            <div key={t.topic}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-white/70">
                  {topicLabels[t.topic] ?? t.topic}
                </span>
                <span className="text-xs font-mono text-white/40">
                  {t.correct}/{t.total}
                </span>
              </div>
              <div className="h-[6px] rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor:
                      t.pct >= 70
                        ? "#4ade80"
                        : t.pct >= 40
                          ? "#f59e0b"
                          : "#e63946",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${t.pct}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation based on score */}
      <div
        className="border border-white/[0.08] rounded-[24px] p-8 mb-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(230,57,70,0.04), rgba(255,255,255,0.005))",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-4">
          What to do next
        </p>
        <h3 className="text-2xl font-display font-extrabold tracking-tight mb-4">
          {tierData.headline}
        </h3>
        <p className="text-white/55 leading-relaxed mb-6">{tierData.advice}</p>

        <div className="flex flex-wrap gap-3">
          {tierData.actions.map((a, i) => (
            <Link
              key={i}
              href={a.href}
              {...(a.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={
                a.primary
                  ? "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-[#e63946] text-white hover:bg-[#ff4d5a] transition-all"
                  : "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-all"
              }
            >
              {a.label} {a.external ? "↗" : "→"}
            </Link>
          ))}
        </div>
      </div>

      {/* Email gate — personalized plan */}
      {!emailUnlocked ? (
        <form
          onSubmit={handleEmailSubmit}
          className="border border-white/[0.06] rounded-[24px] p-8 mb-8"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-3">
            Optional · Personalized study plan
          </p>
          <h3 className="text-xl font-display font-extrabold tracking-tight mb-3">
            Want a personalized study plan?
          </h3>
          <p className="text-sm text-white/45 mb-6 leading-relaxed">
            Drop your email and we&rsquo;ll send a one-page plan tailored to
            your weakest topic
            {weakestTopic
              ? ` (${topicLabels[weakestTopic.topic] ?? weakestTopic.topic})`
              : ""}
            {" "}— what to read, what to build, in what order. No spam,
            unsubscribe in one click.
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
              className="flex-1 bg-white/[0.02] border border-white/[0.08] rounded-full px-5 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#e63946]/50"
            />
            <button
              type="submit"
              disabled={emailSubmitting}
              className="text-sm font-bold uppercase tracking-widest px-6 py-3 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all disabled:opacity-40"
            >
              {emailSubmitting ? "Sending..." : "Send plan"}
            </button>
          </div>
          {emailError && (
            <p className="text-xs text-[#e63946] mt-3 font-mono">{emailError}</p>
          )}
        </form>
      ) : (
        <div className="border border-[#4ade80]/30 rounded-[24px] p-8 mb-8 bg-[#4ade80]/[0.04]">
          <p className="text-sm text-[#4ade80] font-mono">
            ✓ Got it. Check your inbox in a couple minutes.
          </p>
        </div>
      )}

      {/* Retake */}
      <div className="text-center">
        <button
          type="button"
          onClick={retake}
          className="text-sm font-mono text-white/40 hover:text-[#e63946] transition-colors"
        >
          ← Retake the quiz
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* HELPERS                                                          */
/* ────────────────────────────────────────────────────────────── */

function weakest(scores: TopicScore[]): TopicScore | undefined {
  return scores.filter((t) => t.total > 0).sort((a, b) => a.pct - b.pct)[0];
}
