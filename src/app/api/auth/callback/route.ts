import { createClient } from "@/lib/supabase/server";
import { buildUrl } from "@/utils/url";
import { NextResponse } from "next/server";
import { 
  createUnauthorizedResponse, 
  createErrorResponse, 
  AuthError, 
  ValidationError,
  logError 
} from "@/utils/error";

export async function GET(request: Request) {
  console.log("INSIDE CALLBACK");
  
  try {
    const requestURL = new URL(request.url);
    const code = requestURL.searchParams.get("code");
    const next = requestURL.searchParams.get("next") || "/";
    const nextURL = buildUrl(next);

    if (!code) {
      const error = new ValidationError("No authorization code provided", "code", "AUTH_NO_CODE");
      logError(error, "auth-callback-api");
      return createUnauthorizedResponse("Authentication failed: No authorization code provided");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      const authError = new AuthError(error.message, "AUTH_CODE_EXCHANGE_ERROR");
      logError(authError, "auth-callback-api");
      return createUnauthorizedResponse("Authentication failed. Please try logging in again.");
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    console.log("User authenticated:", user?.email);
    
    // User is logged in, redirect to the next page
    return NextResponse.redirect(nextURL);
    
  } catch {
    const authError = new AuthError(
      "Unexpected error during authentication callback", 
      "AUTH_CALLBACK_UNKNOWN"
    );
    logError(authError, "auth-callback-api");
    return createErrorResponse(authError);
  }
}
