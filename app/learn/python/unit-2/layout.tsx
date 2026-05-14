import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../components/JsonLd";

const PATH = "/learn/python/unit-2";

export const metadata: Metadata = pageMetadata({
  title: `Python Unit 2 — Data & Control Flow (7 Free Lessons) | ${SITE.name}`,
  description:
    "Seven original lessons covering Python data collections (lists, dicts, sets, tuples), loop constructs (while, for, range, enumerate), break/continue, and function arguments. Each lesson ~8-10 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Python Unit 2 — Data & Control Flow")}&vertical=${encodeURIComponent("Software")}`,
});

const courseSchema = {
  "@type": "Course",
  "@id": `${SITE.url}${PATH}#course`,
  name: "Python Unit 2 — Data & Control Flow",
  url: absoluteUrl(PATH),
  description:
    "Unit 2 of the YorkSims Python learning path: lists, list methods and slicing, sets/tuples/dicts, while loops, for loops with range and enumerate, break/continue and nesting, and function arguments.",
  provider: { "@id": `${SITE.url}/#organization` },
  inLanguage: SITE.language,
  educationalLevel: "beginner",
  isAccessibleForFree: true,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT1H10M",
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
            { name: "Unit 2 · Data & Control Flow", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
