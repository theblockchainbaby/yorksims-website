import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Welcome — YorkSims.com",
    description: "Your YorkSims subscription is active.",
    path: "/success",
    noIndex: true,
  }),
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
