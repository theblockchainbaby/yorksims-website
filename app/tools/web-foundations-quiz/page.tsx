"use client";

import PythonQuizTool, {
  type Tier,
  type FaqItem,
} from "../../components/PythonQuizTool";
import {
  QUESTIONS,
  TOPIC_LABELS,
  TOPICS,
} from "../../lib/web-foundations-quiz";

function tier(pct: number): Tier {
  if (pct >= 85) {
    return {
      label: "Solid",
      message:
        "You know how the web actually works. Stop quizzing yourself on theory — go ship.",
      headline: "Stop quizzing. Go build something.",
      advice:
        "85%+ on foundations means you understand the wire and the protocol. The next step isn't more reading — it's a real project. Unit 2 of the path covers HTML and CSS in depth, and Unit 3 takes you to JavaScript and databases. Or skip ahead and start building.",
      actions: [
        {
          label: "Continue to Unit 2 — Document Markup",
          href: "/learn/web/unit-2",
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
        "Solid base, a few topics need work. Use the per-topic breakdown to target your review.",
      headline: "Plug the gaps, then move on.",
      advice:
        "You've got the shape. Look at your lowest topic on the breakdown above and re-read just that lesson — the lesson links are right there. Don't redo the whole unit; targeted review is faster.",
      actions: [
        {
          label: "Re-read Unit 1 lessons",
          href: "/learn/web/unit-1",
          primary: true,
        },
        { label: "Continue to Unit 2 — Document Markup", href: "/learn/web/unit-2" },
      ],
    };
  }
  return {
    label: "Foundations need work",
    message: "Be honest: the basics first. The good news — they're short.",
    headline: "Build the foundations first.",
    advice:
      "Under 60% means the underlying mental model needs reinforcing — and that's normal. The seven Unit 1 lessons are 7-9 minutes each. Work through them in order, then come back. The rest of web development gets dramatically easier once these are solid.",
    actions: [
      {
        label: "Start Unit 1 — Web Foundations",
        href: "/learn/web/unit-1",
        primary: true,
      },
      { label: "MDN — Learn web development", href: "https://developer.mozilla.org/en-US/docs/Learn", external: true },
    ],
  };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How long does the quiz take?",
    a: "About 5 minutes for 20 questions. There is no timer — go at your own pace.",
  },
  {
    q: "Do I need to read the lessons first?",
    a: "It helps, but it's not required. The quiz covers the standard intro web development topics — internet history, TCP/IP and HTTP, DNS and URLs, web servers, design, responsive layout, and dev workflow. If you've worked with the web for any length of time, give it a shot cold.",
  },
  {
    q: "Is the quiz free? Do I have to sign up?",
    a: "Yes, free, no account required. You'll get a score and a per-topic breakdown. You can optionally drop an email at the end for a personalized study plan based on your weakest topics.",
  },
  {
    q: "Can I retake it?",
    a: "Yes — refresh the page or hit retake on the results screen. Questions appear in the same order so you can track your improvement.",
  },
  {
    q: "Where do the questions come from?",
    a: "All questions, options, and explanations are written from scratch by YorkSims. They cover the standard intro web development curriculum.",
  },
];

export default function WebFoundationsQuizPage() {
  return (
    <PythonQuizTool
      quizSlug="web-foundations-quiz"
      kicker="Software · Free Tool · Web Unit 1"
      title="Web Foundations Quiz"
      titleSuffix="— 20 Questions"
      subtitle="Five minutes, twenty questions. The internet history, TCP/IP, HTTP, DNS, web servers, design, and dev workflow you need before touching HTML. Score plus a per-topic breakdown."
      questions={QUESTIONS}
      topicLabels={TOPIC_LABELS}
      topics={TOPICS}
      tier={tier}
      faqItems={FAQ_ITEMS}
    />
  );
}
