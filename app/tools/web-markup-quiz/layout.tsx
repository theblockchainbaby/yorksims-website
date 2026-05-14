import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "../../components/JsonLd";
import { getToolBySlug } from "../../lib/tools";

const SLUG = "web-markup-quiz";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `HTML & CSS Quiz — 20 Questions, Free | ${SITE.name}`,
    description:
      "Test your HTML and CSS in 5 minutes. 20 questions across markup languages, semantic HTML, links and media, forms, CSS selectors, the box model, flex and grid, and accessibility. Free, no signup, per-topic breakdown.",
    path: `/tools/${SLUG}`,
    ogImage: `/api/og?title=${encodeURIComponent("HTML & CSS Quiz")}&vertical=${encodeURIComponent("Software")}`,
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
  name: "HTML & CSS Quiz",
  url: absoluteUrl(`/tools/${SLUG}`),
  description:
    "Twenty-question quiz on document markup: markup languages, HTML document structure, links and media, forms and input, CSS selectors and the cascade, the box model and layout, and typography & accessibility.",
  educationalLevel: "beginner",
  learningResourceType: "Quiz",
  inLanguage: SITE.language,
  about: [
    { "@type": "Thing", name: "HTML" },
    { "@type": "Thing", name: "CSS" },
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
      "Seven topics: markup languages (HTML/XML/JSON/SVG/Markdown), HTML document structure, links and media, forms, CSS selectors and the cascade, the box model and layout (flexbox/grid), and typography and accessibility.",
  },
  {
    question: "Do I need to know JavaScript?",
    answer:
      "No. This quiz is markup-only — HTML and CSS. JavaScript and database questions are in the separate Web Scripting & Storage Quiz.",
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
      "All questions and explanations are original to YorkSims, covering the standard intro HTML and CSS curriculum.",
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
