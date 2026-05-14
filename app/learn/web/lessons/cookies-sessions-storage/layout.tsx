import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "cookies-sessions-storage";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Cookies, Sessions & Storage — Where Web Data Lives Between Requests | ${SITE.name}`,
  description:
    "Cookies, sessions, localStorage, sessionStorage, IndexedDB. What goes where, what survives a refresh, and the security flags every cookie needs. 8 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Cookies & Storage")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Cookies, Sessions & Storage",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on web storage mechanisms: cookies, server-side sessions, localStorage, sessionStorage, and IndexedDB, plus the security flags every cookie needs.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "HTTP cookies and web storage" },
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
            { name: "Cookies & Storage", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
