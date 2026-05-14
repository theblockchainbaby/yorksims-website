"use client";

import PythonQuizTool, {
  type Tier,
  type FaqItem,
} from "../../components/PythonQuizTool";
import {
  QUESTIONS,
  TOPIC_LABELS,
  TOPICS,
} from "../../lib/web-markup-quiz";

function tier(pct: number): Tier {
  if (pct >= 85) {
    return {
      label: "Solid",
      message:
        "You can write clean, semantic HTML and CSS. Time to add behavior.",
      headline: "Stop quizzing. Build interactivity.",
      advice:
        "85%+ on markup means you know the structure and the styling. Unit 3 picks up where this ends — JavaScript, the DOM, talking to APIs, server-side code, databases, and the security mistakes you can't ship.",
      actions: [
        {
          label: "Continue to Unit 3 — Scripting & Storage",
          href: "/learn/web/unit-3",
          primary: true,
        },
        { label: "Software Free Module", href: "/verticals/software/free-module" },
      ],
    };
  }
  if (pct >= 60) {
    return {
      label: "Getting there",
      message:
        "You know the basics. A few topics — usually selectors, the box model, or accessibility — need targeted review.",
      headline: "Plug the gaps in markup, then ship a page.",
      advice:
        "Look at your weakest topic on the breakdown above. Re-read just that lesson, then build a real page (a landing page, a portfolio, a docs site). You learn HTML and CSS by writing it, not by reading more theory.",
      actions: [
        {
          label: "Re-read Unit 2 lessons",
          href: "/learn/web/unit-2",
          primary: true,
        },
        { label: "Continue to Unit 3 — Scripting & Storage", href: "/learn/web/unit-3" },
      ],
    };
  }
  return {
    label: "Foundations need work",
    message: "Under 60% on markup means more fundamentals before adding JS.",
    headline: "Solidify HTML & CSS first.",
    advice:
      "Don't try to add JavaScript until the markup underneath is solid — you'll just chase confusing bugs. Re-read Unit 2 in order. Each lesson is short and dense. MDN's reference is the gold standard if you want a second source.",
    actions: [
      {
        label: "Restart Unit 2 — Document Markup",
        href: "/learn/web/unit-2",
        primary: true,
      },
      { label: "MDN — HTML reference", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", external: true },
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
    a: "Seven topics across HTML and CSS: markup languages (HTML/XML/JSON/SVG/Markdown), HTML document structure, links and media, forms, CSS selectors and the cascade, the box model and layout (flexbox/grid), and typography and accessibility.",
  },
  {
    q: "Do I need to know JavaScript?",
    a: "No. This quiz is markup-only — HTML and CSS. JavaScript questions are in the Web Scripting & Storage Quiz (Unit 3).",
  },
  {
    q: "Is the quiz free?",
    a: "Yes — free, no signup. Optional email at the end for a personalized study plan.",
  },
  {
    q: "Can I retake it?",
    a: "Yes. Refresh or hit retake on the results screen.",
  },
  {
    q: "Where do the questions come from?",
    a: "All questions and explanations are original to YorkSims. They cover the standard intro HTML and CSS curriculum.",
  },
];

export default function WebMarkupQuizPage() {
  return (
    <PythonQuizTool
      quizSlug="web-markup-quiz"
      kicker="Software · Free Tool · Web Unit 2"
      title="HTML & CSS Quiz"
      titleSuffix="— 20 Questions"
      subtitle="Five minutes. Twenty questions on the markup of the web. Semantic HTML, links and media, forms, CSS selectors, the box model, flex and grid, typography, and accessibility."
      questions={QUESTIONS}
      topicLabels={TOPIC_LABELS}
      topics={TOPICS}
      tier={tier}
      faqItems={FAQ_ITEMS}
    />
  );
}
