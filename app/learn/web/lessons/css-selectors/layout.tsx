import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "css-selectors";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `CSS Selectors & The Cascade — How Styles Actually Get Applied | ${SITE.name}`,
  description:
    "Element, class, ID, attribute, combinator, and pseudo-class selectors. How specificity decides who wins. The cascade in 60 seconds. Why your style isn't applying. 8 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("CSS Selectors")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "CSS Selectors & The Cascade",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on CSS selectors, specificity, and the cascade — how the browser decides which style wins when rules conflict.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "CSS" },
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
            { name: "CSS Selectors", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
