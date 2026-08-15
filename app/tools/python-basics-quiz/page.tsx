"use client";

import PythonQuizTool, {
  type Tier,
  type FaqItem,
} from "../../components/PythonQuizTool";
import {
  QUESTIONS,
  TOPIC_LABELS,
  TOPICS,
} from "../../lib/python-quiz";

function tier(pct: number): Tier {
  if (pct >= 85) {
    return {
      label: "Solid",
      message:
        "You know Python. This quiz isn't where your time is best spent.",
      headline: "Stop quizzing. Go build something.",
      advice:
        "If you scored 85%+ on Python fundamentals, you don't need more Python tutorials — you need a project that forces you to use it under real constraints. The Software vertical walks through shipping a production SaaS in 30 days using Python-adjacent stacks. The free Module 01 is a good entry point: multi-tenant database schema design that you can clone and run today.",
      actions: [
        {
          label: "Software Free Module",
          href: "/verticals/software/free-module",
          primary: true,
        },
        { label: "Browse the books", href: "/books" },
      ],
    };
  }
  if (pct >= 60) {
    return {
      label: "Getting there",
      message:
        "The fundamentals are there but a few topics need work. Targeted practice, not more theory.",
      headline: "Plug the gaps, then ship something.",
      advice:
        "You've got the basics. The biggest mistake at this stage is doing more tutorials instead of writing code. Pick the weakest topic from your breakdown above, find one focused resource on just that topic, and then move into a real project. The Software vertical's free module is a good first project — multi-tenant SaaS schema design with real code you can run.",
      actions: [
        {
          label: "Software Free Module",
          href: "/verticals/software/free-module",
          primary: true,
        },
        {
          label: "Free book — Python for Everybody",
          href: "https://www.py4e.com/html3/",
          external: true,
        },
      ],
    };
  }
  return {
    label: "Foundations need work",
    message: "Be honest: more practice on the basics first.",
    headline: "Build the foundations first.",
    advice:
      "Under 60% on a fundamentals quiz means more tutorials aren't the problem — but the right tutorial is. YorkSims is a platform for builders who already know how to code, so I'm sending you elsewhere first. The two free resources below are the best on the internet for learning Python from zero. Come back here when you can crush this quiz; the Software vertical will be more useful then.",
    actions: [
      {
        label: "Python for Everybody (free book)",
        href: "https://www.py4e.com/html3/",
        primary: true,
        external: true,
      },
      {
        label: "Automate the Boring Stuff (free)",
        href: "https://automatetheboringstuff.com/",
        external: true,
      },
    ],
  };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How long does the quiz take?",
    a: "About 5 minutes for 20 questions. There is no timer — go at your own pace.",
  },
  {
    q: "Do I need to know Python already?",
    a: "The quiz is designed for people who have learned the basics and want to test what stuck. If you've never written a line of Python, start with one of the free resources linked on the results page first.",
  },
  {
    q: "Is the quiz free? Do I have to sign up?",
    a: "The quiz and your score are completely free, no account required. You can optionally drop an email at the end for a personalized study plan based on your weakest topic.",
  },
  {
    q: "Can I retake it?",
    a: "Yes — hit the retake button on the results screen, or refresh the page. Questions appear in the same order each time so you can track your improvement.",
  },
  {
    q: "Where do the questions come from?",
    a: "Questions are original to YorkSims. The underlying topics align with Python for Everybody by Dr. Charles R. Severance (py4e.com), licensed under Creative Commons Attribution 3.0.",
  },
];

export default function PythonBasicsQuizPage() {
  return (
    <PythonQuizTool
      quizSlug="python-basics-quiz"
      kicker="Software · Free Tool · Unit 1"
      title="Python Basics Quiz"
      titleSuffix="— 20 Questions"
      subtitle="Five minutes. Twenty questions. Real answers with explanations after each one. You'll see your overall score and a per-topic breakdown so you know exactly what to work on next."
      questions={QUESTIONS}
      topicLabels={TOPIC_LABELS}
      topics={TOPICS}
      tier={tier}
      faqItems={FAQ_ITEMS}
    />
  );
}
