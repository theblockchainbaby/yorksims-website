import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "programming-fundamentals";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `What Programs Actually Do — Python Fundamentals | ${SITE.name}`,
  description:
    "Every program — from your phone's calculator to a 50M-line cloud platform — does the same three things. Learn the input/process/output model and write your first useful Python script.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Programming Fundamentals")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "What Programs Actually Do — Python Fundamentals",
  url: absoluteUrl(PATH),
  description:
    "Original lesson introducing programming concepts: the input/process/output model, what an algorithm is, and how to translate a plain-English idea into Python.",
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
            { name: "Programming Fundamentals", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
