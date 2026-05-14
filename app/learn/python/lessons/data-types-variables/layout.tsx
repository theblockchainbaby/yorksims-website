import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "data-types-variables";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Data Types & Variables — The 4 Types You'll Use 95% of the Time | ${SITE.name}`,
  description:
    "Strings, ints, floats, booleans, and None — what each one is for, the rules for naming variables, and the type errors that bite every beginner. 8 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Data Types & Variables")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Data Types & Variables",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python's core data types (str, int, float, bool, None), variable naming rules, and the type-conversion mistakes that break beginner programs.",
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
            { name: "Data Types & Variables", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
