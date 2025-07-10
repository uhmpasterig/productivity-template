"use client";

import React, { Component, ReactNode } from "react";
import { ErrorPage, commonActions } from "@/components/ui/status-page-presets";
import { logError } from "@/utils/error";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showRetry?: boolean;
  showHome?: boolean;
  showSupport?: boolean;
  context?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, this.props.context);
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDevelopment = process.env.NODE_ENV === "development";
      const error = this.state.error;

      const title = isDevelopment && error
        ? `Error: ${error.name || "Component Error"}`
        : "Something went wrong";
        
      const message = isDevelopment && error
        ? error.message || "An unexpected error occurred in this component"
        : "We're sorry, but something unexpected happened. Please try refreshing or go back.";

      const actions = [];

      if (this.props.showRetry !== false) {
        actions.push({
          label: "Try again",
          onClick: this.handleRetry,
          icon: commonActions.tryAgain.icon,
        });
      }

      if (this.props.showHome !== false) {
        actions.push(commonActions.goHome);
      }

      if (this.props.showSupport !== false) {
        actions.push(commonActions.support);
      }

      return (
        <div className="w-full max-w-md mx-auto p-4">
          <ErrorPage 
            title={title} 
            message={message} 
            actions={actions} 
          />
          {isDevelopment && error && (
            <details className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <summary className="cursor-pointer text-sm font-medium text-red-800">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 text-xs text-red-700 whitespace-pre-wrap overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary for functional components
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    logError(error, "useErrorHandler");
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { handleError, resetError };
}

/**
 * Higher-order component for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
} 