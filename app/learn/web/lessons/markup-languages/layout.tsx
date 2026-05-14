import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "markup-languages";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Markup Languages — HTML, XML, JSON, SVG & Markdown Explained | ${SITE.name}`,
  description:
    "What each markup language is for, where it shows up in a web stack, and why JSON ate XML. The bird's-eye view before diving into HTML. 7 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Markup Languages")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Markup Languages",
  url: absoluteUrl(PATH),
  description:
    "Original lesson comparing HTML, XML, JSON, SVG, and Markdown — what each is used for and how they relate to web development.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT7M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Markup languages" },
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
            { name: "Markup Languages", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
