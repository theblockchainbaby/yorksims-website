import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../components/JsonLd";

const PATH = "/learn/python/unit-1";

export const metadata: Metadata = pageMetadata({
  title: `Python Unit 1 — Fundamentals (7 Free Lessons) | ${SITE.name}`,
  description:
    "Seven original lessons covering Python fundamentals: programming concepts, data types, numbers, strings, conditionals, functions, and exceptions. Each lesson ~8-9 minutes, free, no signup.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Python Unit 1 — Fundamentals")}&vertical=${encodeURIComponent("Software")}`,
});

const courseSchema = {
  "@type": "Course",
  "@id": `${SITE.url}${PATH}#course`,
  name: "Python Unit 1 — Fundamentals",
  url: absoluteUrl(PATH),
  description:
    "Unit 1 of the YorkSims Python learning path: programming concepts, data types and variables, numbers and operators, strings, conditionals and booleans, functions, and errors and exceptions.",
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
            { name: "Python", path: "/learn/python" },
            { name: "Unit 1 · Fundamentals", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
