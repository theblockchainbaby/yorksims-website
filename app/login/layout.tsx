import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Sign In — YorkSims.com",
    description: "Sign in to your YorkSims account.",
    path: "/login",
    noIndex: true,
  }),
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
