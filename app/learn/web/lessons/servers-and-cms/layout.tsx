import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "servers-and-cms";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Web Servers & CMSes — Static vs Dynamic, and When to Use Each | ${SITE.name}`,
  description:
    "What a web server actually is, the difference between static and dynamic content, and when to reach for a CMS like WordPress vs writing your own HTML. 8 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Web Servers & CMS")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Web Servers & CMSes",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on what a web server does, the static vs dynamic distinction, and when to use a CMS like WordPress or Shopify versus building from scratch.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Web hosting" },
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
            { name: "Servers & CMS", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
