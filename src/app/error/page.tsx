"use client";
import { useSearchParams } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import { ErrorPage, commonActions } from "@/components/ui/status-page-presets";

export type ErrorPageParams = {
  error?: string;
  message?: string;
  goBack?: boolean;
};

export default function ErrorPageRoute() {
  const searchParams = useSearchParams();
  const title = searchParams.get("error") || "Something went wrong";
  const message =
    searchParams.get("message") ||
    "We're sorry, but something unexpected happened. Please try again.";

  const actions = [
    commonActions.goHome,
    commonActions.support,
  ];

  return (
    <PageContainer>
      <ErrorPage title={title} message={message} actions={actions} />
    </PageContainer>
  );
}
