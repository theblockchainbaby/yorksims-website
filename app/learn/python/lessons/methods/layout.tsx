import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "methods";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Methods & self — Functions that Live on a Class | ${SITE.name}`,
  description:
    "A method is a function bound to an instance. Here's how self works, the difference between methods that mutate and methods that return, and the special methods (__str__, __repr__) that make your objects play nice. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Methods & self")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Methods & self",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on Python instance methods, the self parameter, mutating vs returning methods, and special methods like __str__ and __repr__.",
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
            { name: "Methods", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
