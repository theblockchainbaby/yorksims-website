import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "while-loops";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python While Loops — Indefinite Iteration, Done Right | ${SITE.name}`,
  description:
    "While loops run until a condition becomes false. Learn the syntax, when to reach for while vs for, the patterns for retries and polling, and how to avoid infinite loops. 8 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("While Loops")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python While Loops",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python while loops: syntax, indefinite iteration patterns, avoiding infinite loops, retry/polling patterns, and when to choose while over for.",
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
            { name: "While Loops", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
