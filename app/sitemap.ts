import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";

// The public site is the static author site in /public.
const PAGES: [string, number][] = [
  ["", 1.0],
  ["built-for-more", 0.9],
  ["read", 0.9],
  ["books", 0.8],
  ["figure-it-out", 0.8],
  ["about", 0.7],
  ["teams", 0.7],
  ["york", 0.6],
  ["orders", 0.4],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map(([path, priority]) => ({
    url: path ? `${SITE.url}/${path}` : SITE.url,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
