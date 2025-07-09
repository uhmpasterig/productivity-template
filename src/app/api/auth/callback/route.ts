"use server";

import { redirectToErrorPage } from "@/utils/error";
import { createClient } from "@/lib/supabase/server";
import { buildUrl } from "@/utils/url";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("INSIDE CALLBACK");
  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get("code");
  const next = requestURL.searchParams.get("next") || "/";
  const nextURL = buildUrl(next);

  if (!code) {
    return redirectToErrorPage({
      error: "No code",
      message: "No code was provided",
    });
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.log(error);
    return redirectToErrorPage({
      error: "Authentication Error",
      message:
        "There was an issue with your login attempt. Please try logging in again.",
    });
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  // User is logged in, redirect to the next page
  return NextResponse.redirect(nextURL);
}
