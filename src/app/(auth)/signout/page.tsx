"use client";

import PageContainer from "@/components/layout/PageContainer";
import { InfoPage, commonActions } from "@/components/ui/status-page-presets";
import { authConfig } from "@/config/auth";
import { LogIn, Mail } from "lucide-react";

export default function SignoutPage() {
  return (
    <InfoPage
      title="You've been signed out"
      message="Thanks for using our app! You've been successfully signed out of your account. Your session has been cleared for security."
      actions={[
        {
          label: "Sign in again",
          href: authConfig.loginUrl,
          icon: LogIn,
          variant: "default",
        },
        {
          label: "Sign up",
          href: authConfig.signupUrl,
          icon: Mail,
          variant: "outline",
        },
        commonActions.goHome,
      ]}
    />
  );
}
