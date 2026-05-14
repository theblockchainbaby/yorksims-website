import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "typography-and-responsive";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Typography, Accessibility & Responsive CSS — Fonts, rem, ARIA, Media Queries | ${SITE.name}`,
  description:
    "Font stacks and web fonts, why rem beats px, contrast and accessibility, ARIA when you need it, and the responsive media query patterns that make Unit 1 design real. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Typography & A11y")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Typography, Accessibility & Responsive CSS",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on CSS typography, the rem unit, accessibility (contrast, semantic HTML, ARIA), and the media query patterns of responsive design.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Web typography and accessibility" },
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
            { name: "Typography & Responsive", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
