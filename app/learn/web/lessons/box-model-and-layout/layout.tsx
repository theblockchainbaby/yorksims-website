import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "box-model-and-layout";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `The Box Model & Layout — Block, Inline, Position, Flex & Grid | ${SITE.name}`,
  description:
    "The four-layer box every element wears, how block and inline flow, and when to reach for position, flex, or grid. The mental model that builds every page on the web. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Box Model & Layout")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "The Box Model & Layout",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on the CSS box model, block vs inline display, and the four layout systems: normal flow, positioned, flexbox, and grid.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "CSS layout" },
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
            { name: "Box Model & Layout", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
