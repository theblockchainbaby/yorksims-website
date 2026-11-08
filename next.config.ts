import type { NextConfig } from "next";

// The public site is the static author site in /public (index.html, about.html,
// books.html ...). Next.js still serves /api/*, /success, /privacy and /terms.
// Old app pages redirect to the matching new page; their code is left in place.
const OLD_TO_HOME = [
  "blog", "certificate", "community", "dashboard", "hub", "learn", "login",
  "portals", "pricing", "signup", "tools", "verticals",
];

const nextConfig: NextConfig = {
  // Book PDFs live outside /public (payment-gated). Make sure Vercel bundles
  // them with the download route's serverless function.
  outputFileTracingIncludes: {
    "/api/download": ["./app/private/books/*.pdf"],
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/index.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about.html", permanent: false },
      { source: "/books", destination: "/books.html", permanent: false },
      { source: "/contact", destination: "/teams.html", permanent: false },
      ...OLD_TO_HOME.flatMap((p) => [
        { source: `/${p}`, destination: "/", permanent: false },
        { source: `/${p}/:path*`, destination: "/", permanent: false },
      ]),
    ];
  },
};

export default nextConfig;
