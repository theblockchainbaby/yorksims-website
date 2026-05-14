import type { Metadata } from "next";
import { pageMetadata, SITE } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `Certificate | ${SITE.name}`,
  description:
    "Personal completion certificate from YorkSims. View, share, or download your cert for the module you completed.",
  path: "/certificate",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
