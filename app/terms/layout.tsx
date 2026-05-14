import type { Metadata } from "next";
import { pageMetadata, SITE } from "../lib/seo";
import { JsonLd, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Terms of Service | ${SITE.name}`,
  description:
    "Terms of service for YorkSims.com. The rules of using the site, courses, and tools, in plain language. Caipher AI LLC.",
  path: "/terms",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      {children}
    </>
  );
}
