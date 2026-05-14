import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "conditionals";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Conditionals & Booleans — if, elif, else | ${SITE.name}`,
  description:
    "How decisions work in Python: comparison operators, boolean logic (and/or/not), the truthiness rules, and writing if/elif/else chains that don't read like a wall of text. 8 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Conditionals & Booleans")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Conditionals & Booleans",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python conditionals: if/elif/else syntax, comparison operators, boolean operators (and/or/not), truthiness rules, and clean conditional patterns.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Python (programming language)" },
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
            { name: "Python", path: "/learn/python" },
            { name: "Conditionals", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
