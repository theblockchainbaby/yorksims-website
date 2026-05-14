import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "dom-and-events";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `The DOM & Events — querySelector, addEventListener, Dynamic Pages | ${SITE.name}`,
  description:
    "How the browser turns HTML into an object tree, how to query and mutate elements, and the event system that makes pages interactive. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("DOM & Events")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "The DOM & Events",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on the Document Object Model, querying and mutating elements, and the JavaScript event system.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Document Object Model" },
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
            { name: "DOM & Events", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
