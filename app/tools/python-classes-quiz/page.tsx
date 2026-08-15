"use client";

import PythonQuizTool, {
  type Tier,
  type FaqItem,
} from "../../components/PythonQuizTool";
import {
  QUESTIONS,
  TOPIC_LABELS,
  TOPICS,
} from "../../lib/python-classes-quiz";

function tier(pct: number): Tier {
  if (pct >= 85) {
    return {
      label: "Solid",
      message:
        "You can model real-world data with classes and reach for the right module without thinking about it.",
      headline: "You've got the fundamentals. Now ship something.",
      advice:
        "85%+ on classes, modules, and file I/O means you have everything you need to build real Python projects. Stop quizzing. The Software vertical's free module walks through shipping a production SaaS in 30 days — schema design, multi-tenant data, real deployment. Better use of your next hour than another tutorial.",
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
        "OOP is starting to click but a few topics still trip you up. Targeted reps will close the gap fast.",
      headline: "Plug the gaps, then build a project.",
      advice:
        "Find your weakest topic in the breakdown above and write a small program that exercises it specifically. If inheritance was weak, design a 3-class hierarchy. If file I/O was weak, write a script that reads a CSV and writes a filtered copy. 30 minutes of focused practice beats another hour of reading.",
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
    message:
      "OOP, modules, and files all build on each other. Patch the foundation before you keep going.",
    headline: "Step back and tighten the basics.",
    advice:
      "Under 60% here usually means classes haven't quite clicked yet. The fastest fix: write one small class from scratch — anything, a Counter, a BankAccount, a Playlist — with __init__, two attributes, and three methods. Then write a second class that inherits from it. The concepts crystallize when you implement them, not when you read about them.",
    actions: [
      {
        label: "Retake Lists & Loops first",
        href: "/tools/python-lists-loops-quiz",
        primary: true,
      },
      {
        label: "Python for Everybody (free book)",
        href: "https://www.py4e.com/html3/",
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
    q: "What does this quiz cover?",
    a: "This is Unit 3 of the path. It tests object-oriented Python (classes, __init__, attributes, methods, inheritance), variable scope, modules and imports, and basic file I/O.",
  },
  {
    q: "Should I take the other two quizzes first?",
    a: "Yes if you're new to Python. The path is Python Basics → Lists & Loops → Classes & Modules. If you've been writing Python for a while and just want to test your OOP knowledge, you can jump straight here.",
  },
  {
    q: "Is the quiz free? Do I have to sign up?",
    a: "Yes, free and no account required. You can optionally drop an email at the end for a personalized study plan based on your weakest topic.",
  },
  {
    q: "Can I retake it?",
    a: "Yes — refresh the page or hit the retake button. Questions appear in the same order each time so you can track improvement.",
  },
  {
    q: "Where do the questions come from?",
    a: "Questions are original to YorkSims. Topics align with Python for Everybody by Dr. Charles R. Severance (py4e.com), licensed under Creative Commons Attribution 3.0.",
  },
];

export default function Page() {
  return (
    <PythonQuizTool
      quizSlug="python-classes-quiz"
      kicker="Software · Free Tool · Unit 3"
      title="Python Classes & Modules Quiz"
      titleSuffix="— 20 Questions"
      subtitle="Five minutes. Twenty questions on classes, __init__, inheritance, scope, modules, and file I/O. You'll get a per-topic breakdown and a recommendation on what to work on next."
      questions={QUESTIONS}
      topicLabels={TOPIC_LABELS}
      topics={TOPICS}
      tier={tier}
      faqItems={FAQ_ITEMS}
    />
  );
}
