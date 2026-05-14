import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "list-methods";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python List Methods & Slicing — append, extend, sort, pop, slice | ${SITE.name}`,
  description:
    "The 8 list methods you'll actually use, the difference between sort() and sorted(), advanced slicing tricks, and the mutating-method trap that loses your data. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("List Methods")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python List Methods & Slicing",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python list methods (append, extend, insert, remove, pop, sort, reverse) and slice syntax including step and negative indexes.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
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
            { name: "List Methods", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
