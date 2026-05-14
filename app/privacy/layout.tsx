import type { Metadata } from "next";
import { pageMetadata, SITE } from "../lib/seo";
import { JsonLd, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Privacy Policy | ${SITE.name}`,
  description:
    "How YorkSims.com collects, uses, and protects your information. Plain-language privacy policy for Caipher AI LLC.",
  path: "/privacy",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      {children}
    </>
  );
}
