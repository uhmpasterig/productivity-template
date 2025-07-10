import PageContainer from "@/components/layout/PageContainer";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
