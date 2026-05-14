import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "client-vs-server";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Client vs Server-Side Code — Where Code Runs and Why It Matters | ${SITE.name}`,
  description:
    "Server-side vs client-side rendering, PHP/Node/serverless, what each language is for in 2026, and why secrets never go in code that ships to the browser. 8 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Client vs Server")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Client vs Server-Side Code",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on the distinction between client-side and server-side code: rendering models, popular server languages, serverless functions, and why secrets cannot live in client code.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Server-side scripting" },
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
            { name: "Client vs Server", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
