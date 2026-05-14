import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../components/JsonLd";

const PATH = "/learn/web/unit-1";

export const metadata: Metadata = pageMetadata({
  title: `Web Unit 1 — Web Foundations (7 Free Lessons) | ${SITE.name}`,
  description:
    "Seven original lessons on how the web actually works: internet history, TCP/IP, DNS and URLs, web servers, wireframing, responsive design, and the dev workflow. Free, no signup.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Web Unit 1 — Foundations")}&vertical=${encodeURIComponent("Software")}`,
});

const courseSchema = {
  "@type": "Course",
  "@id": `${SITE.url}${PATH}#course`,
  name: "Web Development Unit 1 — Foundations",
  url: absoluteUrl(PATH),
  description:
    "Unit 1 of the YorkSims web development path: internet history, how the web works, DNS and URLs, web servers and CMSes, wireframing and UX, responsive design, and the development workflow.",
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
            { name: "Unit 1 · Web Foundations", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
