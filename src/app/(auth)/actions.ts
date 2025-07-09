"use server";

import { authConfig } from "@/config/auth";
import { buildUrl, withValidation } from "@/utils";
import { createClient } from "@/utils/supabase/server";
import z from "zod";

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
