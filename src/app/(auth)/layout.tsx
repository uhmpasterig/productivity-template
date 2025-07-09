// layout without design changes
import type { Metadata } from "next";
import { createMetadata } from "@/utils/metadata";
import PageContainer from "@/components/layout/PageContainer";

export const metadata: Metadata = createMetadata({
  title: "Auth",
  description: "Authentication page",
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageContainer>{children}</PageContainer>;
}
