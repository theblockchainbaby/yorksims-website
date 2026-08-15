import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Book PDFs live outside /public (payment-gated). Make sure Vercel bundles
  // them with the download route's serverless function.
  outputFileTracingIncludes: {
    "/api/download": ["./app/private/books/*.pdf"],
  },
};

export default nextConfig;
