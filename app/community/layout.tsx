import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import { JsonLd, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Community — YorkSims.com",
    description:
      "Private Discord of builders shipping across 10 verticals. Monthly live Q&A. Small group coaching. You are not a number.",
    path: "/community",
  }),
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Community", path: "/community" },
        ])}
      />
      {children}
    </>
  );
}
