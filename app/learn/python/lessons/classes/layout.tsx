import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "classes";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Classes — Defining Your Own Types | ${SITE.name}`,
  description:
    "A class lets you bundle related data and behavior into a single type. Learn the class keyword, why you'd write one instead of using a dict, and the smallest useful class you can write. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Python Classes")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Classes",
  url: absoluteUrl(PATH),
  description:
    "Original lesson introducing Python classes: the class keyword, instances, the difference between a class and a dict, and the smallest useful class you can write.",
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
            { name: "Classes", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
