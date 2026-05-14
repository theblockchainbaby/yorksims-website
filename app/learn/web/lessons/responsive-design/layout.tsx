import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "responsive-design";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Responsive, Mobile-First Design — Breakpoints, Fluid Layouts, Real Devices | ${SITE.name}`,
  description:
    "Why mobile-first matters in 2026, what fluid grids and flexible images mean, the breakpoints worth caring about, and the difference between responsive and a mobile site bolted on. 7 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Responsive Design")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Responsive, Mobile-First Design",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on responsive web design: mobile-first methodology, fluid grids, flexible images, breakpoints, and pitfalls of legacy mobile-version sites.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT7M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Responsive web design" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          learningResource,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
            { name: "Web Development", path: "/learn/web" },
            { name: "Responsive Design", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
