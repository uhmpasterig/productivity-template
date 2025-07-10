"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SuccessPage, commonActions } from "@/components/ui/status-page-presets";
import { toast } from "sonner";
import { useErrorHandler } from "@/components/ui/error-boundary";
import { AuthError, logError } from "@/utils/error";

export default function AuthCallbackPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          const authError = new AuthError(error.message, "AUTH_CALLBACK_ERROR");
          logError(authError, "auth-callback");
          handleError(authError);
          return;
        }

        if (user) {
          setUser(user);
          toast.success(`Successfully logged in as ${user.email}!`);
        } else {
          // No user but no error - redirect to login
          router.push("/login");
        }
      } catch {
        const authError = new AuthError(
          "Authentication failed during callback", 
          "AUTH_CALLBACK_UNKNOWN"
        );
        logError(authError, "auth-callback");
        handleError(authError);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [supabase, router, handleError]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <SuccessPage
      title="Welcome Back!"
      message="You've been successfully logged in"
      actions={[
        commonActions.exploreDashboard,
        commonActions.completeOnboarding,
      ]}
    />
  );
}
