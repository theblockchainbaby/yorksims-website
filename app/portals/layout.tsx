import { ReactNode } from 'react';
import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Portals — YorkSims Platform",
    description: "Member-only portals. Auth required.",
    path: "/portals",
    noIndex: true,
  }),
};

export default function PortalsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

