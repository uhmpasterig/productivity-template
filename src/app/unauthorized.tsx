"use client";

import { Lock } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import StatusPage from "@/components/ui/status-page";
import { commonActions } from "@/components/ui/status-page-presets";

export default function UnauthorizedPage() {
  const actions = [
    {
      label: "Sign in",
      href: "/login",
      icon: Lock,
    },
    commonActions.goHome,
    commonActions.support,
  ];

  return (
    <PageContainer>
      <StatusPage
        icon={Lock}
        iconColor="bg-blue-100 text-blue-600"
        title="Authentication required"
        message="You need to sign in to access this resource. Please log in with your account credentials."
        actions={actions}
      />
    </PageContainer>
  );
} 