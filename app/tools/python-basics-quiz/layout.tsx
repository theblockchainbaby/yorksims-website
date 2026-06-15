import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "../../components/JsonLd";
import { getToolBySlug } from "../../lib/tools";

const SLUG = "python-basics-quiz";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Python Basics Quiz — 20 Questions, Free | ${SITE.name}`,
    description:
      "Test your Python fundamentals in 5 minutes. 20 questions covering data types, operators, strings, conditionals, functions, and exceptions. Free, no signup, with a per-topic score breakdown.",
    path: `/tools/${SLUG}`,
    ogImage: `/api/og?title=${encodeURIComponent("Python Basics Quiz")}&vertical=${encodeURIComponent("Software")}`,
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
  name: "Python Basics Quiz",
  url: absoluteUrl(`/tools/${SLUG}`),
  description:
    "Twenty-question quiz on Python fundamentals: data types, operators, strings, conditionals, functions, and exceptions.",
  educationalLevel: "beginner",
  learningResourceType: "Quiz",
  inLanguage: SITE.language,
  about: [
    { "@type": "Thing", name: "Python (programming language)" },
    { "@type": "Thing", name: "Programming fundamentals" },
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
    question: "Do I need to know Python already?",
    answer:
      "The quiz is designed for people who have learned the basics and want to test what stuck. If you've never written a line of Python, start with a free intro course first — the results page links to good free options.",
  },
  {
    question: "Is the quiz free? Do I have to sign up?",
    answer:
      "The quiz and your score are completely free, no account required. You can optionally drop an email at the end to get a personalized study plan based on your weakest topics.",
  },
  {
    question: "What topics does it cover?",
    answer:
      "Seven topics, drawn from the standard Python fundamentals curriculum: programming concepts (algorithms, input/processing/output), data types and variables, numbers and operators, strings, conditionals and booleans, functions and methods, and exceptions.",
  },
  {
    question: "Can I retake it?",
    answer:
      "Yes — refresh the page or hit the retake button on the results screen. Questions are presented in the same order each time so you can track improvement.",
  },
  {
    question: "Where do the questions come from?",
    answer:
      "Questions are original to YorkSims but the underlying topics align with Dr. Charles R. Severance's free book Python for Everybody (py4e.com), which is licensed under Creative Commons Attribution 3.0.",
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
