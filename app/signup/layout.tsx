import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Sign Up — YorkSims.com",
    description: "Create your YorkSims account.",
    path: "/signup",
    noIndex: true,
  }),
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
