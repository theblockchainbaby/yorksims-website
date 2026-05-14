import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "functions";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Functions — Defining, Calling, Arguments, Return Values | ${SITE.name}`,
  description:
    "Functions are how you stop repeating yourself. Learn def, parameters vs arguments, return values, default arguments, and the rules for scope. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Python Functions")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Functions",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on defining and calling Python functions: parameters, arguments, return values, keyword arguments, default values, and local scope.",
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
            { name: "Functions", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
