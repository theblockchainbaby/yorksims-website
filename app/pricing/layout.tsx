import type { Metadata } from "next";
import { pageMetadata, SITE } from "../lib/seo";
import { JsonLd, breadcrumbSchema, productSchema, faqSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Pricing — ${SITE.name}`,
    description:
      "Every module across all 10 verticals — code, contracts, templates, both learning paths — is free. The only paid thing is the three books, $19–$50 each as instant PDF downloads.",
    path: "/pricing",
    ogImage: `/api/og?title=${encodeURIComponent("Pricing — Everything Free + 3 Books")}&vertical=${encodeURIComponent("YorkSims")}`,
  }),
};

const FAQS = [
  {
    question: "Wait — the modules are really free?",
    answer:
      "Yes. Every walkthrough, every code repo, every template across all 10 verticals — free to read, clone, and use. No login, no paywall, no email gate. The site exists to be useful first.",
  },
  {
    question: "Are the books free too?",
    answer:
      "No — the three books (YORK, Built For More, Figure It Out) are the only thing on this site with a price tag: $19–$50 as PDFs, or $30–$100 as printed copies shipped to your door with the PDF included.",
  },
  {
    question: "How do I get the books?",
    answer:
      "Buy on the Books page. Card checkout via Stripe; PDFs download on the confirmation screen right after payment. Printed copies collect your shipping address at checkout and arrive in 5–10 business days (US). No account needed.",
  },
  {
    question: "Do I need to know how to code to use the free modules?",
    answer:
      "Some verticals (Software, Hardware, AI Agents) assume coding ability. Others (Business, Land, Athlete) do not. Each module says upfront what it expects.",
  },
  {
    question: "Why give everything away for free?",
    answer:
      "Because the bottleneck isn't access to information — it's execution. The modules are the ground game. The books are the story behind them — that's the only thing for sale.",
  },
  {
    question: "What about refunds?",
    answer:
      "If a book file is broken, won't download, you were charged twice, or a printed copy shows up damaged, email contact@yorksims.com and I'll replace it, fix it, or refund it. No questions, no friction.",
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
