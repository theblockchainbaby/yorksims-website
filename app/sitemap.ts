import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";
import { POSTS } from "./lib/blog";
import { VERTICALS } from "./lib/portals";
import { SHIPPED_TOOLS } from "./lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE.url}/hub`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/verticals`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/community`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE.url}/learn`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const verticalRoutes: MetadataRoute.Sitemap = VERTICALS.map((v) => ({
    url: `${SITE.url}${v.route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.isoDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const toolRoutes: MetadataRoute.Sitemap = SHIPPED_TOOLS.map((t) => ({
    url: `${SITE.url}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Learn — Python path: overview, three unit indexes, all 21 lesson pages
  const PYTHON_LESSON_SLUGS = [
    // Unit 1 — Fundamentals
    "programming-fundamentals",
    "data-types-variables",
    "numbers-operators",
    "strings",
    "conditionals",
    "functions",
    "exceptions",
    // Unit 2 — Data & Control Flow
    "intro-to-lists",
    "list-methods",
    "collections",
    "while-loops",
    "for-loops",
    "loop-control",
    "function-args",
    // Unit 3 — Classes, Modules & Files
    "classes",
    "init-attrs",
    "methods",
    "inheritance",
    "scope",
    "modules",
    "files",
  ];

  const learnRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/learn/python`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/learn/python/unit-1`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/learn/python/unit-2`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/learn/python/unit-3`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...PYTHON_LESSON_SLUGS.map((slug) => ({
      url: `${SITE.url}/learn/python/lessons/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // Learn — Web Development path: overview, three unit indexes, all 21 lesson pages
  const WEB_LESSON_SLUGS = [
    // Unit 1 — Web Foundations
    "internet-history",
    "how-the-web-works",
    "dns-ip-urls",
    "servers-and-cms",
    "wireframes-and-ux",
    "responsive-design",
    "dev-workflow",
    // Unit 2 — Document Markup
    "markup-languages",
    "html-structure",
    "links-images-media",
    "forms-and-input",
    "css-selectors",
    "box-model-and-layout",
    "typography-and-responsive",
    // Unit 3 — Scripting & Storage
    "javascript-basics",
    "dom-and-events",
    "async-and-apis",
    "client-vs-server",
    "cookies-sessions-storage",
    "databases-basics",
    "web-security",
  ];

  const webRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/learn/web`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/learn/web/unit-1`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/learn/web/unit-2`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/learn/web/unit-3`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...WEB_LESSON_SLUGS.map((slug) => ({
      url: `${SITE.url}/learn/web/lessons/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    ...staticRoutes,
    ...verticalRoutes,
    ...blogRoutes,
    ...toolRoutes,
    ...learnRoutes,
    ...webRoutes,
  ];
}
