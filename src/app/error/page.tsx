"use client";
import { useSearchParams } from "next/navigation";
import ErrorDisplay from "@/components/ErrorDisplay";
import PageContainer from "@/components/PageContainer";

export type ErrorPageParams = {
  error?: string;
  message?: string;
  goBack?: boolean;
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("error") || undefined;
  const message = searchParams.get("message") || undefined;
  const goBack = searchParams.get("goBack") || undefined;

  return (
    <PageContainer>
      <ErrorDisplay
        title={title}
        message={message}
        showRefresh={false}
        showGoBack={goBack === "true"}
      />
    </PageContainer>
  );
}
