import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "javascript-basics";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `JavaScript Basics — Variables, Types, Arrays, Functions | ${SITE.name}`,
  description:
    "let, const, the eight types, arrays, functions, where JavaScript actually runs, and the loose-typing footguns every beginner trips on. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("JavaScript Basics")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "JavaScript Basics",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on JavaScript fundamentals: variables, primitive types, arrays, functions, and where JavaScript executes (browser vs Node).",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "JavaScript" },
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
            { name: "JavaScript Basics", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
