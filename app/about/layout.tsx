import type { Metadata } from "next";
import { pageMetadata, SITE } from "../lib/seo";
import { JsonLd, personSchema, breadcrumbSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `About York Sims — ${SITE.name}`,
    description:
      "D1 basketball. Pro overseas in Ankara, Turkey. Now building 10 verticals under Caipher AI LLC. 15+ public repos, $4,200 MRR on VitrOS, and a 20-skill autonomous AI agent. Here's the full story.",
    path: "/about",
    ogImage: `/api/og?title=${encodeURIComponent("About York Sims")}&vertical=${encodeURIComponent("Founder")}`,
  }),
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
