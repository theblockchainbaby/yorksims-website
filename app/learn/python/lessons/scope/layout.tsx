import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "scope";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Variable Scope — Local, Global, Enclosing | ${SITE.name}`,
  description:
    "Where a name is visible — and where it isn't. The LEGB rule, the global keyword, nonlocal for nested functions, and why globals are almost always the wrong answer. 8 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Variable Scope")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Variable Scope",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python variable scope: the LEGB lookup rule, local vs enclosing vs global vs built-in, the global and nonlocal keywords, and why globals are usually a smell.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
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
            { name: "Variable Scope", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
