"use client";

import PythonQuizTool, {
  type Tier,
  type FaqItem,
} from "../../components/PythonQuizTool";
import {
  QUESTIONS,
  TOPIC_LABELS,
  TOPICS,
} from "../../lib/python-lists-loops-quiz";

function tier(pct: number): Tier {
  if (pct >= 85) {
    return {
      label: "Solid",
      message:
        "You can reach for the right collection type and the right loop without thinking about it.",
      headline: "Stop quizzing. Go build something.",
      advice:
        "At 85%+ on data structures and control flow, you're ready for projects that exercise them under pressure. The Software vertical's free module walks through shipping a production SaaS in 30 days — schema design, multi-tenant data, real Python tooling. That's a better use of your next hour than another quiz.",
      actions: [
        {
          label: "Software Free Module",
          href: "/verticals/software/free-module",
          primary: true,
        },
        { label: "Take the Classes quiz", href: "/tools/python-classes-quiz" },
      ],
    };
  }
  if (pct >= 60) {
    return {
      label: "Getting there",
      message:
        "Most of the patterns are there but a few topics are still shaky. Plug the gaps before moving on.",
      headline: "Plug the gaps, then move to OOP.",
      advice:
        "You've got the basics. Find your weakest topic in the breakdown above, write 20 lines of code that exercise just that — list slicing if slicing was weak, dict access if dicts were weak — and then take the Python Classes quiz. The biggest mistake at this stage is doing more tutorials when targeted practice would close the gap in 30 minutes.",
      actions: [
        {
          label: "Take the Classes quiz",
          href: "/tools/python-classes-quiz",
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
      "Be honest: more reps on lists, loops, and dicts will pay off before you tackle classes.",
    headline: "Tighten the foundations first.",
    advice:
      "Under 60% on data structures and loops means you'll struggle with classes, file I/O, and anything object-oriented. Spend a week writing small programs that use lists and dicts heavily — parse some CSV, count word frequencies, build a tiny address book. Then retake this quiz before moving to Unit 3.",
    actions: [
      {
        label: "Retake Python Basics first",
        href: "/tools/python-basics-quiz",
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
    q: "What does this quiz cover that the Python Basics quiz doesn't?",
    a: "This is Unit 2 of the path. It tests data collections (lists, sets, tuples, dicts), loop constructs (while, for, range, enumerate), break/continue, and function arguments/return values. If you haven't taken the Python Basics quiz, start there.",
  },
  {
    q: "Do I need to know Python already?",
    a: "You should be comfortable with Python syntax, variables, conditionals, and basic functions before taking this one. If you're at zero, start with the Python Basics quiz first.",
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
      quizSlug="python-lists-loops-quiz"
      kicker="Software · Free Tool · Unit 2"
      title="Python Lists & Loops Quiz"
      titleSuffix="— 20 Questions"
      subtitle="Five minutes. Twenty questions on lists, dicts, sets, tuples, for/while loops, and function args. You'll get a per-topic breakdown and a recommendation on what to work on next."
      questions={QUESTIONS}
      topicLabels={TOPIC_LABELS}
      topics={TOPICS}
      tier={tier}
      faqItems={FAQ_ITEMS}
    />
  );
}
