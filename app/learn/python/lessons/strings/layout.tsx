import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "strings";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Strings — Quotes, F-strings, and the 8 Methods You'll Actually Use | ${SITE.name}`,
  description:
    "Strings show up in every program. Learn the three ways to make them, how to format them with f-strings, and the small set of methods that handle 95% of real-world text work. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Python Strings")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Strings",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python strings: creation, escape sequences, f-strings, indexing, slicing, immutability, and the most useful string methods for real-world work.",
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
            { name: "Strings", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
