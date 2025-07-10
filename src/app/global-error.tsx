"use client";

import { useEffect } from "react";
import { ErrorPage, commonActions } from "@/components/ui/status-page-presets";
import { logError } from "@/utils/error";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error }: Omit<GlobalErrorProps, 'reset'>) {
  useEffect(() => {
    // Log error for monitoring
    logError(error);
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === "development";

  // Critical error - use minimal UI
  const title = "Critical Error";
  const message = isDevelopment
    ? `A critical error occurred: ${error.message}`
    : "A critical error occurred. Please refresh the page or contact support.";

  const actions = [
    {
      label: "Refresh page",
      onClick: () => window.location.reload(),
      icon: commonActions.tryAgain.icon,
    },
    {
      label: "Go to homepage",
      onClick: () => (window.location.href = "/"),
      variant: "outline" as const,
      icon: commonActions.goHome.icon,
    },
  ];

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="w-full max-w-md">
            <ErrorPage title={title} message={message} actions={actions} />
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
          </div>
        </div>
      </body>
    </html>
  );
}
