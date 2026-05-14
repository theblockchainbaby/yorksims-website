import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "init-attrs";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python __init__ & Attributes — How Instances Get Their State | ${SITE.name}`,
  description:
    "__init__ is the method that runs every time you create an instance. Here's what it does, how self works, the difference between instance and class attributes, and the mutable-default trap (again). 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("__init__ & Attributes")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python __init__ & Attributes",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python __init__ method, instance attributes, class attributes, default values, and the mutable-default trap in class definitions.",
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
            { name: "__init__ & Attributes", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
