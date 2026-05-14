import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../components/JsonLd";

const PATH = "/verticals/software/free-module";

export const metadata: Metadata = pageMetadata({
  title: `Free Module — Multi-Tenant Schema Design with Prisma | ${SITE.name}`,
  description:
    "Free Software Vertical Module 01 from YorkSims. Prisma schema that prevents cross-tenant data leaks by construction, Membership table with roles, scoped query helpers, migration strategy, and seed data — clone and run today.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Software Free Module — Multi-Tenant Schema")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#module`,
  name: "Software Free Module — Multi-Tenant Schema",
  url: absoluteUrl(PATH),
  description:
    "Free first module of the YorkSims Software vertical: design a multi-tenant Prisma schema that prevents cross-tenant data leaks, with scoped query helpers, a migration strategy, and runnable seed data.",
  learningResourceType: "LearningModule",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: [
    { "@type": "Thing", name: "Multi-tenant SaaS architecture" },
    { "@type": "Thing", name: "Prisma" },
    { "@type": "Thing", name: "Database schema design" },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          learningResource,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verticals", path: "/verticals" },
            { name: "Software", path: "/verticals/software" },
            { name: "Free Module", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
