"use server";

import { authConfig } from "@/config/auth";
import { buildUrl, withValidation } from "@/utils";
import { createClient } from "@/lib/supabase/server";
import z from "zod";
import { redirect } from "next/navigation";
import { logError, withErrorHandler, AuthError } from "@/utils/error";

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
    return await withErrorHandler(async () => {
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
        logError(new AuthError(error.message, "EMAIL_SIGNIN_ERROR"), "loginWithEmailAction");
        return { error: error.message, success: undefined };
      }

      return {
        error: undefined,
        success: "Check your email for the login link!",
      };
    }, "loginWithEmailAction");
  }
);

type GoogleAuthState = {
  url?: string;
  error?: string;
  success?: string;
};

export const loginWithGoogleAction = async (): Promise<GoogleAuthState> => {
  return await withErrorHandler(async () => {
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
      logError(new AuthError(error.message, "GOOGLE_SIGNIN_ERROR"), "loginWithGoogleAction");
      return { error: error.message, success: undefined };
    }
    
    return {
      error: undefined,
      success: "Redirecting to Google...",
      url: data.url,
    };
  }, "loginWithGoogleAction");
};

export const signOutAction = async (): Promise<void> => {
  return await withErrorHandler(async () => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
      logError(new AuthError(error.message, "SIGNOUT_ERROR"), "signOutAction");
      // Optionally throw or handle error differently
      throw new Error("Failed to sign out");
    }

    // Redirect to the configured sign out page
    redirect(authConfig.redirectAfterSignout);
  }, "signOutAction");
};
