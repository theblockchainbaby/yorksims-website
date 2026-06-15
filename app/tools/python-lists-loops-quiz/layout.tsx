import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "../../components/JsonLd";
import { getToolBySlug } from "../../lib/tools";

const SLUG = "python-lists-loops-quiz";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Python Lists & Loops Quiz — 20 Questions, Free | ${SITE.name}`,
    description:
      "Test your grip on Python lists, dictionaries, sets, tuples, for/while loops, and functions in 5 minutes. 20 questions, free, no signup, with per-topic score breakdown.",
    path: `/tools/${SLUG}`,
    ogImage: `/api/og?title=${encodeURIComponent("Python Lists & Loops Quiz")}&vertical=${encodeURIComponent("Software")}`,
  }),
  keywords: tool.keywords,
};

const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": `${SITE.url}/tools/${SLUG}#app`,
  name: tool.title,
  url: absoluteUrl(`/tools/${SLUG}`),
  description: tool.description,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${SITE.url}/#organization` },
};

const quizSchema = {
  "@type": "Quiz",
  "@id": `${SITE.url}/tools/${SLUG}#quiz`,
  name: "Python Lists & Loops Quiz",
  url: absoluteUrl(`/tools/${SLUG}`),
  description:
    "Twenty-question quiz on Python data collections (lists, sets, tuples, dicts), control flow (for/while), loop control, and function arguments and return values.",
  educationalLevel: "beginner",
  learningResourceType: "Quiz",
  inLanguage: SITE.language,
  about: [
    { "@type": "Thing", name: "Python (programming language)" },
    { "@type": "Thing", name: "Data structures" },
    { "@type": "Thing", name: "Control flow" },
  ],
  provider: { "@id": `${SITE.url}/#organization` },
};

const FAQS = [
  {
    question: "How long does the quiz take?",
    answer:
      "About 5 minutes for 20 questions. There's no timer — go at your own pace.",
  },
  {
    question: "What does this quiz cover that the Python Basics quiz doesn't?",
    answer:
      "This is Unit 2 of the path. It tests data collections (lists, sets, tuples, dictionaries), loop constructs (while, for, range, enumerate), break and continue, and function arguments / return values. If you haven't taken the Python Basics quiz yet, that's the better starting point.",
  },
  {
    question: "Do I need to know Python already?",
    answer:
      "You should be comfortable with Python syntax, variables, conditionals, and basic functions before taking this one. If you're at zero, start with the Python Basics quiz first.",
  },
  {
    question: "Is the quiz free? Do I have to sign up?",
    answer:
      "Yes, free and no account required. You can optionally drop an email at the end for a personalized study plan based on your weakest topic.",
  },
  {
    question: "Can I retake it?",
    answer:
      "Yes — refresh the page or hit the retake button on the results screen. Questions are presented in the same order so you can track improvement.",
  },
  {
    question: "Where do the questions come from?",
    answer:
      "Questions are original to YorkSims. The underlying curriculum aligns with Dr. Charles R. Severance's free book Python for Everybody (py4e.com), licensed under Creative Commons Attribution 3.0.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema,
          quizSchema,
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: tool.shortTitle, path: `/tools/${SLUG}` },
          ]),
        ]}
      />
      {children}
    </>
  );
}
