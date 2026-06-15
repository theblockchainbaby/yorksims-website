import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Dashboard — YorkSims.com",
    description: "Your YorkSims member dashboard.",
    path: "/dashboard",
    noIndex: true,
  }),
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
