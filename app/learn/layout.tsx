import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../lib/seo";
import { JsonLd, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Learn — Free Original Courses | ${SITE.name}`,
  description:
    "Two free three-unit learning paths from YorkSims: Python (21 lessons, 3 quizzes) and Web Development (21 lessons, 3 quizzes). Original lessons, no signup, no fluff.",
  path: "/learn",
  ogImage: `/api/og?title=${encodeURIComponent("Learn — Free Courses")}&vertical=${encodeURIComponent("Software")}`,
});

const collectionSchema = {
  "@type": "CollectionPage",
  "@id": `${SITE.url}/learn#collection`,
  name: "YorkSims Free Learning Paths",
  url: absoluteUrl("/learn"),
  description:
    "Index of YorkSims's free, original technical learning paths — currently Python and Web Development. Each path is three units, 21 lessons, and 3 quizzes.",
  inLanguage: SITE.language,
  isPartOf: { "@id": `${SITE.url}/#website` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          collectionSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
