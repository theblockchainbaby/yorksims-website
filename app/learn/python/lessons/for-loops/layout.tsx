import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "for-loops";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python For Loops & Range — The Workhorse of Iteration | ${SITE.name}`,
  description:
    "For loops walk through any iterable: lists, strings, dicts, files. Learn range(), enumerate(), zip(), and the patterns that turn a 10-line loop into a 2-line comprehension. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("For Loops & Range")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python For Loops & Range",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python for loops: iterating any iterable, range(), enumerate(), zip(), and an intro to list comprehensions.",
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
            { name: "For Loops & Range", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
