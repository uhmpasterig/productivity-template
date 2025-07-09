"use client";

import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface ErrorDisplayProps {
  title?: string;
  message?: string;

  showRefresh?: boolean;
  showHome?: boolean;
  showGoBack?: boolean;

  refresh?: () => void;
  goBack?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = "Something went wrong",
  message = "We're sorry, but something unexpected happened. Please try again.",
  showRefresh = false,
  showHome = true,
  showGoBack = false,
  refresh,
  goBack,
}) => {
  const defaultRefresh = () => {
    window.location.reload();
  };
  const defaultGoBack = () => {
    window.history.back();
  };

  const handleRefresh = refresh || defaultRefresh;
  const handleGoBack = goBack || defaultGoBack;

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="size-6" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {showRefresh && (
              <Button onClick={handleRefresh} className="w-full">
                <RefreshCw className="mr-2 size-4" />
                Try again
              </Button>
            )}
            {showGoBack && (
              <Button onClick={handleGoBack} className="w-full">
                <ArrowLeft className="mr-2 size-4" />
                Go back
              </Button>
            )}
            {showHome && (
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <Home className="mr-2 size-4" />
                  Go home
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorDisplay;
