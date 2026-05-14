import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "databases-basics";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Database Basics — Relational vs Document, SQL CRUD, and ORMs | ${SITE.name}`,
  description:
    "Relational vs document databases, the four SQL operations you'll do 95% of the time, joins in 60 seconds, and how ORMs like Prisma and Drizzle fit on top. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Database Basics")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Database Basics",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on databases: relational vs document models, basic SQL CRUD, joins, and how ORMs fit on top of a database.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Databases" },
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
            { name: "Database Basics", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
