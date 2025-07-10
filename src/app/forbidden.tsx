"use client";

import { ShieldX } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import StatusPage from "@/components/ui/status-page";
import { commonActions } from "@/components/ui/status-page-presets";

export default function ForbiddenPage() {
  const actions = [
    commonActions.goHome,
    commonActions.goBack,
    commonActions.signOut,
    commonActions.support,
  ];

  return (
    <PageContainer>
      <StatusPage
        icon={ShieldX}
        iconColor="bg-orange-100 text-orange-600"
        title="Access forbidden"
        message="You don't have permission to access this resource. If you believe this is an error, please contact support."
        actions={actions}
      />
    </PageContainer>
  );
} 