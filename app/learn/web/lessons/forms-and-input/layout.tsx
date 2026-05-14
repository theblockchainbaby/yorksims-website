import type { Metadata } from "next";
import { pageMetadata, SITE, absoluteUrl } from "../../../../lib/seo";
import { JsonLd, breadcrumbSchema } from "../../../../components/JsonLd";

const SLUG = "forms-and-input";
const PATH = `/learn/web/lessons/${SLUG}`;

export const metadata: Metadata = pageMetadata({
  title: `HTML Forms & Input — Types, Labels, Validation, GET vs POST | ${SITE.name}`,
  description:
    "Input types, the label element, native validation, GET vs POST submission, and the accessibility rules that turn a broken form into a usable one. 9 min.",
  path: PATH,
  ogImage: `/api/og?title=${encodeURIComponent("HTML Forms")}&vertical=${encodeURIComponent("Software")}`,
});

const learningResource = {
  "@type": "LearningResource",
  "@id": `${SITE.url}${PATH}#lesson`,
  name: "HTML Forms & Input",
  url: absoluteUrl(PATH),
  description:
    "Original lesson on HTML forms: input types, the label and fieldset elements, native validation, GET vs POST submission, and accessibility.",
  learningResourceType: "Lesson",
  educationalLevel: "beginner",
  inLanguage: SITE.language,
  timeRequired: "PT9M",
  isAccessibleForFree: true,
  provider: { "@id": `${SITE.url}/#organization` },
  about: { "@type": "Thing", name: "HTML forms" },
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
            { name: "Forms & Input", path: PATH },
          ]),
        ]}
      />
      {children}
    </>
  );
}
