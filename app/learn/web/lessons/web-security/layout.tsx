import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "web-security";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Web Security 101 — XSS, SQL Injection, CSRF & Broken Auth | ${SITE.name}`,
  description:
    "The four security mistakes that break most web apps, and the patterns that prevent each. Plus a short checklist you should run against every new project before shipping. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Web Security 101")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Web Security 101",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on common web application security risks — XSS, SQL injection, CSRF, broken authentication — and the patterns that prevent each.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Web application security" },
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
            { name: "Web Security", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
