import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import { JsonLd, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "10 Verticals — Build Across Every Domain | YorkSims.com",
    description:
      "SaaS, AI agents, hardware RTL, blockchain, business ops, real estate, physical products, athletics, voice agents, creative tech. One builder. Ten verticals. All receipts.",
    path: "/verticals",
  }),
};

export default function VerticalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Verticals", path: "/verticals" },
        ])}
      />
      {children}
    </>
  );
}
