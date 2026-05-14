import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Learn Python — Three-Unit Path, Free | ${SITE.name}`,
  description:
    "A practical three-unit path from zero Python to writing your own classes. Each unit ends with a free 20-question quiz that scores you and tells you exactly what to work on next. No fluff, no signup.",
  path: "/learn/python",
  ogImage: `/api/og?title=${encodeURIComponent("Learn Python")}&vertical=${encodeURIComponent("Software")}`,
});

const courseSchema = {
  "@type": "Course",
  "@id": `${SITE.url}/learn/python#course`,
  name: "Learn Python — Three-Unit Path",
  url: absoluteUrl("/learn/python"),
  description:
    "A three-unit Python curriculum covering fundamentals, data structures and control flow, and object-oriented programming with modules and file I/O. Each unit ends with a free assessment quiz.",
  provider: { "@id": `${SITE.url}/#organization` },
  inLanguage: SITE.language,
  educationalLevel: "beginner",
  isAccessibleForFree: true,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT4H",
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
          ]),
        ]}
      />
      {children}
    </>
  );
}
