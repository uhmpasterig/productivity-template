"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import {
  SuccessPage,
  commonActions,
} from "@/components/ui/status-page-presets";
import { clientRedirectToErrorPage } from "@/utils/error";

export default function AuthCallbackPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          clientRedirectToErrorPage({
            error: "Authentication Failed",
            message: error.message,
            goBack: true,
          });
          return;
        }

        if (user) {
          setUser(user);
          toast.success(`Successfully logged in as ${user.email}!`);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error(error);
        clientRedirectToErrorPage({
          error: "Authentication Failed",
          message: "Something went wrong",
          goBack: true,
        });
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [supabase, router]);

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
