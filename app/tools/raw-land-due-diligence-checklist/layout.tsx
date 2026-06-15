import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "../../components/JsonLd";
import { getToolBySlug } from "../../lib/tools";

const SLUG = "raw-land-due-diligence-checklist";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Free Raw Land Due Diligence Checklist — ${SITE.name}`,
    description:
      "The 8-item checklist that protects you from buying unbuildable dirt. Zoning, access, water, perc, power, flood, wetlands, survey. Interactive. State-aware. Free.",
    path: `/tools/${SLUG}`,
    ogImage: `/api/og?title=${encodeURIComponent("Raw Land Due Diligence Checklist")}&vertical=${encodeURIComponent("Land")}`,
  }),
  keywords: tool.keywords,
};

const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": `${SITE.url}/tools/${SLUG}#app`,
  name: tool.title,
  url: absoluteUrl(`/tools/${SLUG}`),
  description: tool.description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${SITE.url}/#organization` },
};

const FAQS = [
  {
    question: "What does this checklist cover?",
    answer: "Eight critical due diligence items: zoning, legal access, water viability, perc test for septic, power distance, flood zone status, wetlands designation, and boundary survey. These are the items that determine whether a piece of raw land is buildable.",
  },
  {
    question: "How long does due diligence take?",
    answer: "Typically 4 to 8 weeks. The perc test and survey are the longest lead-time items. Most county offices take 1-2 weeks for zoning and flood zone confirmations. Start all items in parallel.",
  },
  {
    question: "What if one item fails?",
    answer: "It depends on which one. A failed perc test might mean you need a mound septic system ($30k instead of $12k). A wetlands designation could kill the project entirely. The checklist flags severity per item.",
  },
  {
    question: "Is this specific to my state?",
    answer: "The 8 items are universal across all US states. Specific requirements (permit fees, inspection cadences, septic regulations) vary by county. The checklist provides general guidance and encourages you to call your county planning office for specifics.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema,
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
