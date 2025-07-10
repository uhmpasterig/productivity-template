// Error handling utilities for Next.js App Router
import { redirect } from "next/navigation";
import { forbidden, unauthorized } from "next/navigation";
import { NextResponse } from "next/server";

/**
 * Custom error types for different scenarios
 */
export class AppError extends Error {
  constructor(message: string, public code?: string, public statusCode?: number) {
    super(message);
    this.name = "AppError";
    if (code) this.code = code;
    if (statusCode) this.statusCode = statusCode;
  }
}

export class AuthError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code, 401);
    this.name = "AuthError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code, 403);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code, 404);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string, code?: string) {
    super(message, code, 400);
    this.name = "ValidationError";
    if (field) this.field = field;
  }
}

/**
 * Server-side interrupt functions for different error scenarios
 * Usage: Only in server components, server actions, or middleware
 */
export function triggerUnauthorized(): never {
  unauthorized();
}

export function triggerForbidden(): never {
  forbidden();
}

export function redirectToNotFound() {
  redirect("/not-found");
}

/**
 * Client-side redirect functions for different error scenarios
 * Usage: Only in client components/hooks
 */
export function clientRedirectToUnauthorized() {
  window.location.assign("/login");
}

export function clientRedirectToForbidden() {
  window.location.assign("/");
}

export function clientRedirectToNotFound() {
  window.location.assign("/not-found");
}

/**
 * API route error responses
 */
export function createErrorResponse(error: AppError) {
  return NextResponse.json(
    { 
      error: error.message, 
      code: error.code,
      type: error.name 
    },
    { status: error.statusCode || 500 }
  );
}

export function createUnauthorizedResponse(message = "Authentication required") {
  return NextResponse.json(
    { error: message, code: "UNAUTHORIZED" },
    { status: 401 }
  );
}

export function createForbiddenResponse(message = "Access forbidden") {
  return NextResponse.json(
    { error: message, code: "FORBIDDEN" },
    { status: 403 }
  );
}

export function createNotFoundResponse(message = "Resource not found") {
  return NextResponse.json(
    { error: message, code: "NOT_FOUND" },
    { status: 404 }
  );
}

export function createValidationErrorResponse(message: string, field?: string) {
  return NextResponse.json(
    { error: message, code: "VALIDATION_ERROR", field },
    { status: 400 }
  );
}

/**
 * Error wrapper for async operations
 */
export async function withErrorHandler<T>(
  operation: () => Promise<T>,
  context?: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    logError(error, context);
    throw error;
  }
}

/**
 * Enhanced error logging
 */
export function logError(error: unknown, context?: string) {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` [${context}]` : "";
  
  if (error instanceof AppError) {
    console.error(
      `[${timestamp}]${contextStr} ${error.name}: ${error.message}`,
      {
        code: error.code,
        statusCode: error.statusCode,
        stack: error.stack
      }
    );
  } else if (error instanceof Error) {
    console.error(
      `[${timestamp}]${contextStr} ${error.name}: ${error.message}`,
      { stack: error.stack }
    );
  } else {
    console.error(`[${timestamp}]${contextStr} Unknown error:`, error);
  }
  
  // TODO: Send to monitoring service (Sentry, LogRocket, etc.)
  // Example: Sentry.captureException(error, { extra: { context } });
}

/**
 * Type guard for checking if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Extract error message safely from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
}

/**
 * Extract error code safely from unknown error
 */
export function getErrorCode(error: unknown): string | undefined {
  if (error instanceof AppError) {
    return error.code;
  }
  return undefined;
}
