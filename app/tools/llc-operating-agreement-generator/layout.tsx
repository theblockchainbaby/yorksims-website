import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema } from "../../components/JsonLd";
import { getToolBySlug } from "../../lib/tools";

const SLUG = "llc-operating-agreement-generator";
const tool = getToolBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Free LLC Operating Agreement Generator — ${SITE.name}`,
    description:
      "Free LLC operating agreement generator. Answer 6 questions, get a customized, state-specific draft for single-member or multi-member LLCs. Member-managed or manager-managed. Built by a founder running a 5-subsidiary holding company.",
    path: `/tools/${SLUG}`,
    ogImage: `/api/og?title=${encodeURIComponent("LLC Operating Agreement Generator")}&vertical=${encodeURIComponent("Business")}`,
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
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: { "@id": `${SITE.url}/#organization` },
};

const FAQS = [
  {
    question: "Is this LLC operating agreement legally binding?",
    answer:
      "The generated document is a starting draft, not legal advice. It includes common provisions used in most US states, but you should review it with a licensed attorney in your jurisdiction before signing. Every draft carries a clear disclaimer with this guidance.",
  },
  {
    question: "Does this cover single-member and multi-member LLCs?",
    answer:
      "Yes. You pick single-member or multi-member at the start of the wizard. Multi-member agreements include capital contributions, ownership percentages, buy-sell provisions, right of first refusal, and distribution rules per member.",
  },
  {
    question: "Member-managed or manager-managed — which should I pick?",
    answer:
      "Member-managed is the default and works for most solo or small-team LLCs. Manager-managed is cleaner if you have passive investors or want to separate ownership from day-to-day decisions. The generator supports both and produces different management articles accordingly.",
  },
  {
    question: "Can I download and edit the agreement?",
    answer:
      "Yes. After generating, you can copy the plain text, download it as an HTML document (prints cleanly to PDF from any browser), or share the link with your attorney for review.",
  },
  {
    question: "Which states are supported?",
    answer:
      "All 50 US states. The governing law clause and formation references are customized to the state you select. State-specific quirks (like Wyoming's series LLC or California's $800 franchise tax) are not automatically handled — that's what attorney review is for.",
  },
  {
    question: "Do you save my information?",
    answer:
      "If you provide an email to unlock the download, we save the email to send you follow-ups about new tools and posts. The operating agreement itself is generated entirely in your browser and never sent to our servers.",
  },
];

export default function LlcGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
