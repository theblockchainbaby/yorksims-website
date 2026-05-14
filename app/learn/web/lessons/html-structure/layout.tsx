import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "html-structure";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `HTML Document Structure — DOCTYPE, Head, Body & Semantic Tags | ${SITE.name}`,
  description:
    "The skeleton every HTML page is built on, the meta tags that decide how your page renders and shares, and the semantic elements that screen readers and search engines actually use. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("HTML Structure")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "HTML Document Structure",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on HTML document structure: DOCTYPE, html, head, meta, title, body, and the HTML5 semantic elements (header, nav, main, section, article, aside, footer).",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "HTML" },
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
            { name: "HTML Structure", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
