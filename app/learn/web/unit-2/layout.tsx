import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../components/JsonLd";

const PATH = "/learn/web/unit-2";

export const metadata: Metadata = pageMetadata({
  title: `Web Unit 2 — Document Markup (7 Free Lessons) | ${SITE.name}`,
  description:
    "Seven original lessons on HTML and CSS: markup languages, document structure, links and media, forms, selectors, the box model, typography and accessibility. Free, no signup.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Web Unit 2 — Document Markup")}&vertical=${encodeURIComponent("Software")}`,
});

const courseSchema = {
  "@type": "Course",
  "@id": `${SITE.url}${PATH}#course`,
  name: "Web Development Unit 2 — Document Markup",
  url: absoluteUrl(PATH),
  description:
    "Unit 2 of the YorkSims web development path: HTML and CSS fundamentals — markup languages, document structure, links and media, forms, CSS selectors, the box model and layout, and responsive typography.",
  provider: { "@id": `${SITE.url}/#organization` },
  inLanguage: SITE.language,
  educationalLevel: "beginner",
  isAccessibleForFree: true,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT1H",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          courseSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
            { name: "Web Development", path: "/learn/web" },
            { name: "Unit 2 · Document Markup", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
