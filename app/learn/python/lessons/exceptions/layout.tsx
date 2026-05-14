import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "exceptions";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Errors & Exceptions — try, except, and the Five Errors You'll See Most | ${SITE.name}`,
  description:
    "Errors aren't crashes — they're information. Learn the difference between syntax errors and exceptions, how try/except works, and the five Python exceptions you'll meet on day one. 8 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Errors & Exceptions")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Errors & Exceptions",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python error handling: reading tracebacks, try/except/else/finally, common exception types, and when to catch errors vs let them propagate.",
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
            { name: "Exceptions", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
