import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/dashboard/",
          "/portals",
          "/portals/",
          "/signup",
          "/login",
          "/success",
          "/_next/",
          "/private/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/dashboard/",
          "/portals",
          "/portals/",
          "/signup",
          "/login",
          "/success",
        ],
      },
      {
        userAgent: ["GPTBot", "Google-Extended", "CCBot", "anthropic-ai", "ClaudeBot", "PerplexityBot"],
        allow: "/",
        disallow: ["/api/", "/dashboard", "/portals"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
