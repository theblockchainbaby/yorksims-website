import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "files";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python File I/O — open, read, write, with | ${SITE.name}`,
  description:
    "How to read and write files in Python. The four file modes, the with statement, line-by-line iteration for huge files, JSON and CSV in the standard library, and the encoding pitfall every beginner hits once. 10 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Python File I/O")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python File I/O",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python file I/O: open(), read modes, the with statement, line-by-line streaming, JSON and CSV from the standard library, and encoding errors.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
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
            { name: "File I/O", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
