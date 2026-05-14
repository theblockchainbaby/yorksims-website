import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "async-and-apis";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Async, Fetch & APIs — Promises, async/await, and Talking to a Server | ${SITE.name}`,
  description:
    "Why JavaScript is single-threaded but does async, promises and async/await in plain English, fetch(), and what an HTTP API actually feels like to call. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Async & APIs")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Async, Fetch & APIs",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on asynchronous JavaScript: the event loop, promises, async/await, and the fetch API for talking to HTTP servers.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Asynchronous JavaScript" },
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
            { name: "Async & APIs", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
