/**
 * YorkSims.com — Site-wide SEO & metadata constants.
 *
 * Single source of truth for canonical URL, brand strings, and default
 * metadata. Every layout.tsx, generateMetadata, sitemap, robots, manifest,
 * and JSON-LD helper reads from this file.
 */

export const SITE = {
  name: "YorkSims.com",
  legalName: "Caipher AI LLC",
  tagline: "Teaching Execution, Not Theory",
  hero: "Stop Learning. Start Building.",
  description:
    "A premium education and execution platform built by a builder who ships across 10 industries. Real code, real contracts, real results — not theory.",
  url: "https://yorksims.com",
  locale: "en_US",
  language: "en",

  twitter: "@yorksims",
  author: {
    name: "York Sims",
    url: "https://yorksims.com",
    twitter: "@yorksims",
    sameAs: [
      "https://github.com/yorksims",
      "https://twitter.com/yorksims",
      "https://linkedin.com/in/yorksims",
    ],
  },

  social: {
    twitter: "https://twitter.com/yorksims",
    github: "https://github.com/yorksims",
    linkedin: "https://linkedin.com/in/yorksims",
  },

  defaults: {
    ogImage: "/og-default.png",
    themeColor: "#0a0a0a",
    accent: "#e63946",
  },
} as const;

export function absoluteUrl(path: string = "/"): string {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${cleaned === "/" ? "" : cleaned}`;
}

/**
 * Build a canonical + OG metadata object. Call from layout.tsx or
 * generateMetadata to guarantee every public page has the same shape.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
}) {
  const url = absoluteUrl(opts.path);
  const image = opts.ogImage ?? SITE.defaults.ogImage;
  const absoluteImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: opts.type ?? "website",
      locale: SITE.locale,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
      ...(opts.type === "article"
        ? {
            publishedTime: opts.publishedTime,
            modifiedTime: opts.modifiedTime ?? opts.publishedTime,
            authors: opts.authors ?? [SITE.author.name],
            tags: opts.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: opts.title,
      description: opts.description,
      site: SITE.twitter,
      creator: SITE.author.twitter,
      images: [absoluteImage],
    },
  };
}
