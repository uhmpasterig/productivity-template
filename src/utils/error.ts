// Error handling utilities for Next.js App Router
import { redirect } from "next/navigation";
import { ErrorPageParams } from "@/app/error/page";

/**
 * Custom error class for app-specific errors.
 */
export class AppError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "AppError";
    if (code) this.code = code;
  }
}

/**
 * Server-side: Redirect to the error page with optional message and code.
 * Usage: Only in server components or server actions.
 */
export function redirectToErrorPage(errorPageParams: ErrorPageParams) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(errorPageParams)) {
    if (value !== undefined) params.set(key, String(value));
  }
  redirect(`/error?${params.toString()}`);
}

/**
 * Client-side: Redirect to the error page with optional message and code.
 * Usage: Only in client components/hooks.
 */
export function clientRedirectToErrorPage(errorPageParams: ErrorPageParams) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(errorPageParams)) {
    if (value !== undefined) params.set(key, String(value));
  }
  window.location.assign(`/error?${params.toString()}`);
}

/**
 * Optionally log errors (to console, Sentry, etc.)
 */
export function logError(error: unknown) {
  // Extend this to send to a logging service
  if (error instanceof Error) {
    console.error(`[AppError] ${error.name}: ${error.message}`);
  } else {
    console.error("[AppError] Unknown error:", error);
  }
}
