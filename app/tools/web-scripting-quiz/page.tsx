"use client";

import PythonQuizTool, {
  type Tier,
  type FaqItem,
} from "../../components/PythonQuizTool";
import {
  QUESTIONS,
  TOPIC_LABELS,
  TOPICS,
} from "../../lib/web-scripting-quiz";

function tier(pct: number): Tier {
  if (pct >= 85) {
    return {
      label: "Solid",
      message:
        "You've got the full stack — markup, scripting, storage, security. Stop quizzing, start shipping.",
      headline: "Stop quizzing. Go build something real.",
      advice:
        "85%+ across JS, async, the DOM, databases, and security means you have what you need to ship a real web app. Pick a project you'd actually use — a personal site, a tool you wish existed, a clone of something you use. Build it. Ship it. That's the only way the skills compound.",
      actions: [
        {
          label: "Software Free Module",
          href: "/verticals/software/free-module",
          primary: true,
        },
        { label: "Join Pro — Live Q&A", href: "/pricing" },
      ],
    };
  }
  if (pct >= 60) {
    return {
      label: "Getting there",
      message:
        "Most of the stack is there. The lowest topic on your breakdown is what to fix before shipping.",
      headline: "Plug the gaps, then build.",
      advice:
        "60-85% on a full-stack quiz is good — you know enough to start a project, you just need to look up your weakest area as you hit it. The biggest mistake at this stage is doing more tutorials instead of writing code. Pick a project. Build the part you understand. Look up the rest as you go.",
      actions: [
        {
          label: "Software Free Module",
          href: "/verticals/software/free-module",
          primary: true,
        },
        { label: "Re-read Unit 3 lessons", href: "/learn/web/unit-3" },
      ],
    };
  }
  return {
    label: "Foundations need work",
    message: "Under 60% on the full stack means more practice before shipping.",
    headline: "Solidify the fundamentals first.",
    advice:
      "Under 60% on scripting and storage usually means the underlying mental model needs reinforcing. Re-read Unit 3 in order — JavaScript, the DOM, async, then the storage and security pieces. MDN's JavaScript guide is the gold standard if you want a second source. Come back when these are solid.",
    actions: [
      {
        label: "Restart Unit 3 — Scripting & Storage",
        href: "/learn/web/unit-3",
        primary: true,
      },
      { label: "MDN — JavaScript guide", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", external: true },
    ],
  };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How long does the quiz take?",
    a: "About 5 minutes for 20 questions. No timer — go at your own pace.",
  },
  {
    q: "What topics does it cover?",
    a: "Seven topics across the dynamic web: JavaScript basics, the DOM and events, async and fetch, client vs server-side code, cookies and storage, database basics (relational + SQL), and web security (XSS, SQL injection, CSRF, auth).",
  },
  {
    q: "Is this just a JavaScript quiz?",
    a: "No. JS is the biggest chunk, but the quiz also covers server-side topics, databases, and the security mistakes that break shipped apps. It's intentionally full-stack.",
  },
  {
    q: "Is the quiz free?",
    a: "Yes — free, no signup. Optional email at the end for a personalized study plan.",
  },
  {
    q: "Can I retake it?",
    a: "Yes. Refresh the page or hit retake on the results screen.",
  },
  {
    q: "Where do the questions come from?",
    a: "All questions and explanations are original to YorkSims, covering the standard intro full-stack curriculum.",
  },
];

export default function WebScriptingQuizPage() {
  return (
    <PythonQuizTool
      quizSlug="web-scripting-quiz"
      kicker="Software · Free Tool · Web Unit 3"
      title="Web Scripting & Storage Quiz"
      titleSuffix="— 20 Questions"
      subtitle="Five minutes. Twenty questions on JavaScript, the DOM, fetch and async, client vs server, cookies and storage, databases, and web security. The end of the path. If you crush this, you're ready to ship."
      questions={QUESTIONS}
      topicLabels={TOPIC_LABELS}
      topics={TOPICS}
      tier={tier}
      faqItems={FAQ_ITEMS}
    />
  );
}
