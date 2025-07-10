"use client";

import { useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { ErrorPage, commonActions } from "@/components/ui/status-page-presets";
import { logError } from "@/utils/error";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error for monitoring
    logError(error);
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === "development";

  // In development, show detailed error info
  const title = isDevelopment 
    ? `Error: ${error.name || "Application Error"}`
    : "Something went wrong";
    
  const message = isDevelopment
    ? error.message || "An unexpected error occurred"
    : "We're sorry, but something unexpected happened. Our team has been notified.";

  const actions = [
    {
      label: "Try again",
      onClick: reset,
      icon: commonActions.tryAgain.icon,
    },
    commonActions.goHome,
    commonActions.support,
  ];

  return (
    <PageContainer>
      <ErrorPage 
        title={title} 
        message={message} 
        actions={actions} 
      />
      {isDevelopment && (
        <details className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
          <summary className="cursor-pointer text-sm font-medium text-red-800">
            Error Details (Development Only)
          </summary>
          <pre className="mt-2 text-xs text-red-700 whitespace-pre-wrap overflow-auto">
            {error.stack}
          </pre>
          {error.digest && (
            <p className="mt-2 text-xs text-red-600">
              Error ID: {error.digest}
            </p>
          )}
        </details>
      )}
    </PageContainer>
  );
} 