import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../components/JsonLd";

const PATH = "/verticals/business/free-module";

export const metadata: Metadata = pageMetadata({
  title: `Free Module — Entity Formation (LLC, OA Templates, Checklist) | ${SITE.name}`,
  description:
    "Free Business Vertical Module 01 from YorkSims. The LLC vs C-Corp decision matrix, fill-in operating agreement templates (single + multi-member), formation checklist, and 90-day post-formation plan — same playbook used to form Caipher AI LLC.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Business Free Module — Entity Formation")}&vertical=${encodeURIComponent("Business")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#module`,
  name: "Business Free Module — Entity Formation",
  url: absoluteUrl(PATH),
  description:
    "Free first module of the YorkSims Business vertical: form an LLC, pick a state, fill out an operating agreement, and run the 90-day post-formation checklist.",
  learningResourceType: "LearningModule",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: [
    { "@type": "Thing", name: "Business entity formation" },
    { "@type": "Thing", name: "LLC operating agreement" },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          learningResource,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verticals", path: "/verticals" },
            { name: "Business", path: "/verticals/business" },
            { name: "Free Module", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
