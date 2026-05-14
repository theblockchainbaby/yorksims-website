import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "function-args";
const PATH = `/learn/python/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `Python Function Arguments & Return Values, Deeper Dive | ${SITE.name}`,
  description:
    "Beyond the basics: positional vs keyword arguments, defaults, *args and **kwargs, returning multiple values, and the rules for designing function signatures that don't suck. 9 minutes.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("Function Arguments")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "Python Function Arguments & Return Values, Deeper",
  url: absoluteUrl(PATH),
  description:
    "Original lesson going deeper on Python function arguments: positional vs keyword, default values, *args, **kwargs, returning tuples, and signature design.",
  learningResourceType: "Lesson",
  educationalLevel: "intermediate",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "Python (programming language)" },
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
            { name: "Python", path: "/learn/python" },
            { name: "Function Arguments", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
