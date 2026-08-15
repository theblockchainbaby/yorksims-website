import type { Metadata } from "next";
import { pageMetadata, SITE } from "../lib/seo";
import { JsonLd, breadcrumbSchema, productSchema, faqSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Pricing — ${SITE.name}`,
    description:
      "Every module across all 10 verticals — code, contracts, templates, both learning paths — is free. The paid things: three book PDFs ($19–$50) and a 1-on-1 session with York at $99/hour.",
    path: "/pricing",
    ogImage: `/api/og?title=${encodeURIComponent("Pricing — Free + $99/hr 1-on-1")}&vertical=${encodeURIComponent("YorkSims")}`,
  }),
};

const FAQS = [
  {
    question: "Wait — the modules are really free?",
    answer:
      "Yes. Every walkthrough, every code repo, every template across all 10 verticals — free to read, clone, and use. No login, no paywall, no email gate. The site exists to be useful first.",
  },
  {
    question: "What does the $99/hr session actually cover?",
    answer:
      "Whatever you bring. Most sessions are SaaS architecture, AI agent design, business structure (LLC, contracts), or technical review of code you're shipping. If you want the deep-dive instead of figuring it out from the free modules, book a session.",
  },
  {
    question: "How do I book a 1-on-1?",
    answer:
      "Email contact@yorksims.com or use the Contact page. Tell me what you want to work on; I'll send back available slots. Payment via Stripe before the session.",
  },
  {
    question: "Are the books free too?",
    answer:
      "No — the three books (YORK, Built For More, Figure It Out) are paid PDFs at $19–$50 each. Buy on the Books page, pay with card via Stripe, download instantly. Everything else on the site is free.",
  },
  {
    question: "Do I need to know how to code to use the free modules?",
    answer:
      "Some verticals (Software, Hardware, AI Agents) assume coding ability. Others (Business, Land, Athlete) do not. Each module says upfront what it expects.",
  },
  {
    question: "Why give everything away for free?",
    answer:
      "Because the bottleneck isn't access to information — it's execution. The modules are the ground game. The 1-on-1 is for when you're stuck on something specific and want a real opinion fast.",
  },
  {
    question: "What about refunds on the 1-on-1?",
    answer:
      "If a session doesn't deliver value, email contact@yorksims.com within 48 hours and I'll refund it. No questions, no friction.",
  },
];

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
