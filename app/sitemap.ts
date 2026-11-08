import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";

// The public site is the static author site in /public.
const PAGES: [string, number][] = [
  ["", 1.0],
  ["built-for-more.html", 0.9],
  ["read.html", 0.9],
  ["books.html", 0.8],
  ["figure-it-out.html", 0.8],
  ["about.html", 0.7],
  ["teams.html", 0.7],
  ["york.html", 0.6],
  ["orders.html", 0.4],
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
