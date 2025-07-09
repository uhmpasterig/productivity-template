"use server";

import { authConfig } from "@/config/auth";
import { buildUrl, withValidation } from "@/utils";
import { createClient } from "@/lib/supabase/server";
import z from "zod";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(),
});

type ErrorSuccessState = {
  error?: string;
  success?: string;
};

export const loginWithEmailAction = withValidation(
  loginSchema,
  async ({ email }): Promise<ErrorSuccessState> => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: buildUrl(authConfig.callbackUrl, {
          next: authConfig.redirectAfterSignin,
        }),
      },
    });

    if (error) {
      return { error: error.message, success: undefined };
    }

    return {
      error: undefined,
      success: "Check your email for the login link!",
    };
  }
);

type GoogleAuthState = {
  url?: string;
  error?: string;
  success?: string;
};

export const loginWithGoogleAction = async (): Promise<GoogleAuthState> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: buildUrl(authConfig.callbackUrl, {
        next: authConfig.redirectAfterSignin,
      }),
    },
  });
  if (error) {
    return { error: error.message, success: undefined };
  }
  return {
    error: undefined,
    success: "Redirecting to Google...",
    url: data.url,
  };
};

export const signOutAction = async (): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    // Optionally throw or handle error differently
    throw new Error("Failed to sign out");
  }

  // Redirect to the configured sign out page
  redirect(authConfig.redirectAfterSignout);
};
