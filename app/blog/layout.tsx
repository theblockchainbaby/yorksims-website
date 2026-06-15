import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import { JsonLd, blogSchema, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "The Build Blog — YorkSims.com",
    description:
      "Every post is a breakdown of something that was actually built — code, receipts, and decisions included. No motivation. No fluff.",
    path: "/blog",
  }),
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          blogSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
