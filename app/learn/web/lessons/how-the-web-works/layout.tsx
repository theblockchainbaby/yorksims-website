import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "how-the-web-works";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `How the Web Actually Works — TCP/IP, HTTP, and the Request/Response Loop | ${SITE.name}`,
  description:
    "What really happens between you hitting Enter and the page rendering. OSI in plain English, TCP vs UDP, HTTP requests and responses, status codes, and ports. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("How the Web Works")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "How the Web Actually Works",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on the request/response cycle, the OSI model in practical terms, TCP/IP, HTTP methods and status codes, and ports.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Internet protocols" },
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
            { name: "Web Development", path: "/learn/web" },
            { name: "How the Web Works", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
