import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "../../components/JsonLd";
import { getToolBySlug } from "../../lib/tools";

const SLUG = "web-foundations-quiz";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Web Foundations Quiz — 20 Questions, Free | ${SITE.name}`,
    description:
      "Test your understanding of how the web actually works in 5 minutes. 20 questions across internet history, TCP/IP and HTTP, DNS and URLs, web servers, design, and dev workflow. Free, no signup, with a per-topic score breakdown.",
    path: `/tools/${SLUG}`,
    ogImage: `/api/og?title=${encodeURIComponent("Web Foundations Quiz")}&vertical=${encodeURIComponent("Software")}`,
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
  name: "Web Foundations Quiz",
  url: absoluteUrl(`/tools/${SLUG}`),
  description:
    "Twenty-question quiz on web fundamentals: internet history, TCP/IP and HTTP, DNS and URLs, web servers and CMSes, wireframes and UX, responsive design, and dev workflow.",
  educationalLevel: "beginner",
  learningResourceType: "Quiz",
  inLanguage: SITE.language,
  about: [
    { "@type": "Thing", name: "Web development" },
    { "@type": "Thing", name: "Internet protocols" },
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
    question: "Do I need to read the lessons first?",
    answer:
      "It helps, but it's not required. The quiz covers standard intro web development topics — if you've worked with the web for any length of time, try it cold first.",
  },
  {
    question: "Is the quiz free? Do I have to sign up?",
    answer:
      "Yes, free, no account required. You can optionally drop an email at the end to get a personalized study plan based on your weakest topics.",
  },
  {
    question: "What topics does it cover?",
    answer:
      "Seven topics: internet history, how the web works (TCP/IP, HTTP, OSI), DNS and URLs, web servers and CMSes, wireframes and UX, responsive design, and dev workflow.",
  },
  {
    question: "Can I retake it?",
    answer:
      "Yes — refresh the page or hit retake on the results screen. Questions appear in the same order so you can track improvement.",
  },
  {
    question: "Where do the questions come from?",
    answer:
      "Questions, options, and explanations are all original to YorkSims. They cover the standard intro web development curriculum.",
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
