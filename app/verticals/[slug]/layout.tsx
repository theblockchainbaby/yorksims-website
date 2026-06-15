import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { VERTICALS } from "../../lib/portals";
import { getVerticalContent } from "../../lib/vertical-content";
import {
  JsonLd,
  courseSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vertical = VERTICALS.find((v) => v.id === slug);
  const content = getVerticalContent(slug);

  if (!vertical) {
    return {
      title: "Vertical Not Found — YorkSims.com",
      robots: { index: false, follow: false },
    };
  }

  return pageMetadata({
    title: content?.seo.title ?? `${vertical.title} — YorkSims.com`,
    description: content?.seo.description ?? vertical.desc,
    path: vertical.route,
    ogImage: `/api/og?title=${encodeURIComponent(vertical.title)}&vertical=${encodeURIComponent(vertical.shortTitle)}`,
  });
}

export default async function VerticalSlugLayout({ params, children }: Props) {
  const { slug } = await params;
  const vertical = VERTICALS.find((v) => v.id === slug);

  if (!vertical) return <>{children}</>;

  return (
    <>
      <JsonLd
        data={[
          courseSchema(vertical),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Verticals", path: "/verticals" },
            { name: vertical.shortTitle, path: vertical.route },
          ]),
        ]}
      />
      {children}
    </>
  );
}

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ slug: v.id }));
}
