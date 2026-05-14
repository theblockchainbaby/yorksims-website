import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../components/JsonLd";

const PATH = "/learn/python/unit-3";

export const metadata: Metadata = pageMetadata({
  title: `Python Unit 3 — Classes, Modules & Files (7 Free Lessons) | ${SITE.name}`,
  description:
    "Seven original lessons covering object-oriented Python — classes, __init__, methods, inheritance, scope — plus modules, imports, and file I/O. Each lesson ~8-10 minutes, free, no signup.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Python Unit 3 — Classes, Modules & Files")}&vertical=${encodeURIComponent("Software")}`,
});

const courseSchema = {
  "@type": "Course",
  "@id": `${SITE.url}${PATH}#course`,
  name: "Python Unit 3 — Classes, Modules & Files",
  url: absoluteUrl(PATH),
  description:
    "Unit 3 of the YorkSims Python learning path: defining your own types with classes, __init__ and attributes, methods and self, inheritance and super(), variable scope, modules and imports, and file I/O.",
  provider: { "@id": `${SITE.url}/#organization` },
  inLanguage: SITE.language,
  educationalLevel: "intermediate",
  isAccessibleForFree: true,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT1H15M",
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
            { name: "Python", path: "/learn/python" },
            { name: "Unit 3 · Classes, Modules & Files", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
