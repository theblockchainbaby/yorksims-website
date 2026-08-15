/**
 * JsonLd — render arbitrary Schema.org JSON-LD inside a page.
 *
 * Usage:
 *   <JsonLd data={organizationSchema()} />
 *   <JsonLd data={[orgSchema(), websiteSchema()]} />
 */

import { SITE, absoluteUrl } from "../lib/seo";
import type { BlogPost } from "../lib/blog";
import type { Vertical } from "../lib/portals";
import type { Book } from "../lib/books";

type Schema = Record<string, unknown>;

export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", ...schema }),
          }}
        />
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   Schema builders
────────────────────────────────────────────────────────────── */

export function organizationSchema(): Schema {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/york-state-logo.png"),
    },
    sameAs: SITE.author.sameAs,
    founder: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.author.url,
      sameAs: SITE.author.sameAs,
    },
    description: SITE.description,
  };
}

export function websiteSchema(): Schema {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function personSchema(): Schema {
  return {
    "@type": "Person",
    "@id": `${SITE.url}/#york-sims`,
    name: SITE.author.name,
    url: SITE.author.url,
    sameAs: SITE.author.sameAs,
    jobTitle: "Founder & Builder",
    worksFor: { "@id": `${SITE.url}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Schema {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingSchema(post: BlogPost): Schema {
  return {
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(SITE.defaults.ogImage),
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      "@type": "Person",
      name: post.author,
      url: SITE.author.url,
    },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    keywords: post.tags.join(", "),
    articleSection: post.vertical,
    inLanguage: SITE.language,
  };
}

export function blogSchema(): Schema {
  return {
    "@type": "Blog",
    "@id": `${SITE.url}/blog#blog`,
    url: `${SITE.url}/blog`,
    name: `${SITE.name} — The Build Blog`,
    description:
      "Every post is a breakdown of something that was actually built — code, receipts, and decisions included. No motivation. No fluff.",
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
  };
}

export function courseSchema(vertical: Vertical): Schema {
  return {
    "@type": "Course",
    "@id": `${SITE.url}${vertical.route}#course`,
    name: vertical.title,
    description: vertical.desc,
    url: `${SITE.url}${vertical.route}`,
    provider: { "@id": `${SITE.url}/#organization` },
    keywords: vertical.tags.join(", "),
    inLanguage: SITE.language,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT10H",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/pricing`,
    },
  };
}

export function productSchema(): Schema {
  return {
    "@type": "Product",
    "@id": `${SITE.url}/#product`,
    name: SITE.name,
    description: SITE.description,
    brand: { "@id": `${SITE.url}/#organization` },
    offers: {
      "@type": "Offer",
      name: "Full platform access",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/pricing`,
    },
  };
}

export function bookSchema(book: Book): Schema {
  return {
    "@type": "Book",
    "@id": `${SITE.url}/books#${book.id}`,
    name: book.title,
    description: book.description,
    author: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.author.url,
    },
    bookFormat: "https://schema.org/EBook",
    image: absoluteUrl(book.cover),
    inLanguage: SITE.language,
    offers: {
      "@type": "Offer",
      price: (book.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/books`,
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]): Schema {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
