import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "dev-workflow";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Dev Workflow & The IDE — Methodologies, Version Control, and the Inner Loop | ${SITE.name}`,
  description:
    "Waterfall vs Agile in 90 seconds, the structure patterns every site uses, git in one paragraph, the IDE you should pick, and the four-step loop you'll spend your career in. 8 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Dev Workflow & IDE")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Dev Workflow & The IDE",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on web development workflow: project management methods, version control, IDE choice, the development inner loop, and best practices.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Software development methodologies" },
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
            { name: "Dev Workflow", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
