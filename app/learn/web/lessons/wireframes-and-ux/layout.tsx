import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "wireframes-and-ux";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Wireframes & UX — Why You Sketch Before You Code | ${SITE.name}`,
  description:
    "Why design beats execution as the most common reason sites fail. Wireframes, storyboarding, UI vs UX, the fold, and typography that holds up. 8 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Wireframes & UX")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Wireframes & UX",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on the design phase of a web project: wireframes, storyboarding, UI versus UX, the fold, and typography choices that compound over time.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "User experience design" },
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
            { name: "Wireframes & UX", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
