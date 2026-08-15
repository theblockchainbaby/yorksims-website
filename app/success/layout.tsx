import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Order confirmed — YorkSims.com",
    description: "Your purchase is confirmed. Download your PDF.",
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
