import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import { JsonLd, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Free Tools for Builders — YorkSims.com",
    description:
      "Free tools covering LLC operating agreements, raw land due diligence, SaaS pricing, AI agents, XRPL, hardware, athletes, animation, voice agents, and physical products. Built by a builder, for builders.",
    path: "/tools",
  }),
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />
      {children}
    </>
  );
}
