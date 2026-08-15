import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import { JsonLd, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Contact — YorkSims.com",
    description:
      "Get in touch with York Sims. Ask about the free modules, get help with a book order, or send partnership / press inquiries.",
    path: "/contact",
  }),
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      {children}
    </>
  );
}
