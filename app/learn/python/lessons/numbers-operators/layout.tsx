import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "numbers-operators";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Numbers & Operators — Arithmetic, Modulo, and Order of Operations | ${SITE.name}`,
  description:
    "Integer and float math in Python: the operators, the order they run in, integer division vs floor division, and the surprising things floats do. 8 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Numbers & Operators")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Numbers & Operators",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on integer and float arithmetic in Python, operator precedence, integer vs floor division, modulo, exponentiation, and floating-point quirks.",
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
            { name: "Numbers & Operators", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
