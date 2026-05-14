import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Learn Web Development — Three-Unit Path, Free | ${SITE.name}`,
  description:
    "A three-unit path from how the internet works to writing your own JavaScript, talking to a database, and shipping a styled page. Original lessons, no signup, no fluff.",
  path: "/learn/web",
  ogImage: `/api/og?title=${encodeURIComponent("Learn Web Development")}&vertical=${encodeURIComponent("Software")}`,
});

const courseSchema = {
  "@type": "Course",
  "@id": `${SITE.url}/learn/web#course`,
  name: "Learn Web Development — Three-Unit Path",
  url: absoluteUrl("/learn/web"),
  description:
    "A three-unit web development curriculum covering internet & web fundamentals, document markup (HTML & CSS), and scripting & storage (JavaScript, server-side, databases, security).",
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
            { name: "Web Development", path: "/learn/web" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
