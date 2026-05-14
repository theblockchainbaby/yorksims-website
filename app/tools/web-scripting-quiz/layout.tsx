import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "../../components/JsonLd";
import { getToolBySlug } from "../../lib/tools";

const SLUG = "web-scripting-quiz";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Web Scripting & Storage Quiz — JS, DOM, APIs, DBs & Security | ${SITE.name}`,
    description:
      "Test your JavaScript, DOM, fetch, server-side, cookies, databases, and web security in 5 minutes. 20 questions, free, per-topic breakdown so you know exactly what to study next.",
    path: `/tools/${SLUG}`,
    ogImage: `/api/og?title=${encodeURIComponent("JavaScript & Storage Quiz")}&vertical=${encodeURIComponent("Software")}`,
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
  name: "Web Scripting & Storage Quiz",
  url: absoluteUrl(`/tools/${SLUG}`),
  description:
    "Twenty-question quiz covering JavaScript basics, DOM manipulation and events, async and the fetch API, client vs server-side code, cookies and storage, database basics, and web security.",
  educationalLevel: "intermediate",
  learningResourceType: "Quiz",
  inLanguage: SITE.language,
  about: [
    { "@type": "Thing", name: "JavaScript" },
    { "@type": "Thing", name: "Web security" },
    { "@type": "Thing", name: "Databases" },
  ],
  provider: { "@id": `${SITE.url}/#organization` },
};

const FAQS = [
  {
    question: "How long does the quiz take?",
    answer:
      "About 5 minutes for 20 questions. No timer — go at your own pace.",
  },
  {
    question: "What topics does it cover?",
    answer:
      "Seven topics: JavaScript basics, the DOM and events, async and the fetch API, client vs server-side code, cookies and storage, database basics (relational + SQL), and web security (XSS, SQL injection, CSRF, auth).",
  },
  {
    question: "Is this just a JavaScript quiz?",
    answer:
      "No — JS is the biggest chunk, but it's full-stack: server-side concepts, databases, and the security pitfalls that break shipped apps are all in scope.",
  },
  {
    question: "Is the quiz free?",
    answer:
      "Yes — free, no signup. Optional email at the end for a personalized study plan.",
  },
  {
    question: "Can I retake it?",
    answer:
      "Yes. Refresh the page or hit retake on the results screen.",
  },
  {
    question: "Where do the questions come from?",
    answer:
      "All questions and explanations are original to YorkSims, covering the standard intro full-stack curriculum.",
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
