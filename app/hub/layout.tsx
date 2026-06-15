import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import { JsonLd, breadcrumbSchema, productSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "The Platform — YorkSims Hub",
    description:
      "Not a course. A builder OS. Full access to 10 verticals, real code, real contracts, live Q&A, and a private community of builders.",
    path: "/hub",
  }),
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/hub" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
