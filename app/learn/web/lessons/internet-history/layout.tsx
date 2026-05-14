import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "internet-history";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `A Brief History of the Internet — How a Cold War Network Became the Web | ${SITE.name}`,
  description:
    "From Arpanet to TCP/IP to the World Wide Web to Web 2.0 and AI. The shortest version of how a Cold War research network turned into the thing every business runs on. 7 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Internet History")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "A Brief History of the Internet",
  url: absoluteUrl(PATH),
  description:
    "Original lesson tracing the evolution of the internet from Arpanet and TCP/IP through the early web, Web 2.0, and modern AI-driven Web 3.0.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT7M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Internet history" },
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
            { name: "Internet History", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
