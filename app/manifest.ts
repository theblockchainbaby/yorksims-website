import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "YorkSims",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: SITE.defaults.themeColor,
    orientation: "portrait",
    categories: ["education", "business", "productivity", "developer"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
