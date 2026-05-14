import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "intro-to-lists";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Lists — A 10-Minute Intro for Builders | ${SITE.name}`,
  description:
    "Lists are the workhorse data structure in Python. Learn what they are, how to read and change them, and the three mistakes beginners make. 10 minutes, original examples, no fluff.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Python Lists")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Lists — A 10-Minute Intro",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python lists covering creation, indexing, slicing, and mutability, with practical examples and three common mistakes.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT10M",
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
            { name: "Intro to Lists", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
