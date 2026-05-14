import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "loop-control";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python break, continue & Nested Loops | ${SITE.name}`,
  description:
    "How to exit a loop early, skip an iteration, and work with loops inside loops — without writing the spaghetti version. 8 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Loop Control")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python break, continue & Nested Loops",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on loop control statements: break for early exit, continue for skipping iterations, and patterns for writing readable nested loops.",
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
            { name: "Loop Control", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
