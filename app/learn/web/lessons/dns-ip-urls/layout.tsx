import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "dns-ip-urls";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `DNS, IP Addresses & URLs — How a Domain Becomes a Server | ${SITE.name}`,
  description:
    "How yorksims.com turns into an IP address you can open a TCP connection to, and how a URL splits into scheme, host, path, query, and fragment. 8 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("DNS, IP & URLs")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "DNS, IP Addresses & URLs",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on how DNS resolves a domain name to an IP address, what makes up a URL, and the role of root, TLD, and authoritative name servers.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Domain Name System" },
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
            { name: "DNS, IP & URLs", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
