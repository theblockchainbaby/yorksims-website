import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "collections";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Sets, Tuples & Dictionaries — When to Use Which | ${SITE.name}`,
  description:
    "Lists aren't the only collection in Python. Dictionaries hold key/value pairs. Sets reject duplicates. Tuples are immutable lists. Here's when to reach for each one. 10 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Sets, Tuples & Dicts")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Sets, Tuples & Dictionaries",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python's other built-in collections: dictionaries (key/value pairs), sets (unique unordered values), and tuples (immutable ordered values), with practical when-to-use guidance.",
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
            { name: "Sets, Tuples & Dicts", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
