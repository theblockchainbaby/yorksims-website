import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "../../components/JsonLd";
import { getToolBySlug } from "../../lib/tools";

const SLUG = "python-classes-quiz";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Python Classes & Modules Quiz — 20 Questions, Free | ${SITE.name}`,
    description:
      "Test your grip on Python classes, __init__, methods, inheritance, scope, modules, and file I/O in 5 minutes. 20 original questions, free, no signup, with per-topic score breakdown.",
    path: `/tools/${SLUG}`,
    ogImage: `/api/og?title=${encodeURIComponent("Python Classes Quiz")}&vertical=${encodeURIComponent("Software")}`,
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
  name: "Python Classes & Modules Quiz",
  url: absoluteUrl(`/tools/${SLUG}`),
  description:
    "Twenty-question quiz on object-oriented Python: classes, __init__, methods, inheritance, scope, modules, and file I/O.",
  educationalLevel: "intermediate",
  learningResourceType: "Quiz",
  inLanguage: SITE.language,
  about: [
    { "@type": "Thing", name: "Python (programming language)" },
    { "@type": "Thing", name: "Object-oriented programming" },
    { "@type": "Thing", name: "File I/O" },
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
    question: "What does this quiz cover?",
    answer:
      "This is Unit 3 of the path. It tests object-oriented Python (classes, __init__, attributes, methods, inheritance), variable scope (local vs. global), modules and imports, and basic file I/O.",
  },
  {
    question: "Should I take the other two quizzes first?",
    answer:
      "Yes if you're new to Python. The path is Python Basics → Lists & Loops → Classes & Modules. If you've been writing Python for a while and just want to test your OOP knowledge specifically, you can jump straight here.",
  },
  {
    question: "Is the quiz free? Do I have to sign up?",
    answer:
      "Yes, free and no account required. You can optionally drop an email at the end for a personalized study plan based on your weakest topic.",
  },
  {
    question: "Can I retake it?",
    answer:
      "Yes — refresh the page or hit the retake button. Questions appear in the same order so you can track improvement.",
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
