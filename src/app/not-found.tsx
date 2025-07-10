"use client";

import { FileQuestion } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import StatusPage from "@/components/ui/status-page";
import { commonActions } from "@/components/ui/status-page-presets";

export default function NotFound() {
  const actions = [
    commonActions.goHome,
    commonActions.goBack,
    commonActions.support,
  ];

  return (
    <PageContainer>
      <StatusPage
        icon={FileQuestion}
        iconColor="bg-gray-100 text-gray-600"
        title="Page not found"
        message="Sorry, we couldn't find the page you're looking for. It may have been moved or deleted."
        actions={actions}
      />
    </PageContainer>
  );
} 