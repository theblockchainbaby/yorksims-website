import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "modules";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Modules & Imports — How to Organize Code Across Files | ${SITE.name}`,
  description:
    "A module is a .py file. Learn the three import forms, what the standard library gives you for free, when to split your code into modules, and why star-imports cause silent bugs. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Modules & Imports")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Modules & Imports",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python modules and imports: the three import forms, splitting code into files, the standard library, third-party packages, and namespace hygiene.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
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
            { name: "Modules & Imports", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
