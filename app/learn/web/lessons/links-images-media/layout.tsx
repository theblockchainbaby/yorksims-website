import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "links-images-media";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Links, Images & Media — Anchors, alt, srcset, <video> and <audio> | ${SITE.name}`,
  description:
    "Relative vs absolute URLs, anchor link targets, raster vs vector formats, responsive images with srcset, and the video/audio elements that replaced Flash. 8 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Links, Images & Media")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Links, Images & Media",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on HTML hyperlinks, images (raster and vector, srcset, alt text), and the video and audio elements.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT8M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "HTML media" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          learningResource,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
            { name: "Web Development", path: "/learn/web" },
            { name: "Links, Images & Media", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
