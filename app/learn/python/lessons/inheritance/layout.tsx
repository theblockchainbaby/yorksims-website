import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "inheritance";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Inheritance — Base Classes, Subclasses, and super() | ${SITE.name}`,
  description:
    "How to share behavior between related classes without copy-paste. The syntax for subclasses, when super() saves you, when to reach for composition instead, and the trap of deep hierarchies. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Inheritance")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Inheritance",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python class inheritance: subclass syntax, method overriding, super(), and when to choose composition over inheritance.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
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
            { name: "Inheritance", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
