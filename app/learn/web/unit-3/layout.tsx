import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../components/JsonLd";

const PATH = "/learn/web/unit-3";

export const metadata: Metadata = pageMetadata({
  title: `Web Unit 3 — Scripting & Storage (7 Free Lessons) | ${SITE.name}`,
  description:
    "Seven original lessons on JavaScript, the DOM, talking to APIs, server-side code, cookies and storage, databases, and web security. Free, no signup.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Web Unit 3 — Scripting & Storage")}&vertical=${encodeURIComponent("Software")}`,
});

const courseSchema = {
  "@type": "Course",
  "@id": `${SITE.url}${PATH}#course`,
  name: "Web Development Unit 3 — Scripting & Storage",
  url: absoluteUrl(PATH),
  description:
    "Unit 3 of the YorkSims web development path: JavaScript fundamentals, DOM manipulation, fetch and AJAX, client vs server-side code, cookies and sessions, database basics, and web security.",
  provider: { "@id": `${SITE.url}/#organization` },
  inLanguage: SITE.language,
  educationalLevel: "intermediate",
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
            { name: "Unit 3 · Scripting & Storage", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
