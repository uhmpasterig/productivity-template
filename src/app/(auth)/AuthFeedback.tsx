"use client";
import { XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type AuthFeedbackProps = {
  type: "success" | "error";
  message: string;
  email?: string;
  onRetry: () => void;
};

export default function AuthFeedback({
  type,
  message,
  email,
  onRetry,
}: AuthFeedbackProps) {
  const isSuccess = type === "success";

  return (
    <div className="flex flex-col gap-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className={`flex size-12 items-center justify-center rounded-full ${
            isSuccess
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isSuccess ? (
            <Mail className="size-6" />
          ) : (
            <XCircle className="size-6" />
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {isSuccess ? "Check your email" : "Something went wrong"}
          </h2>

          <p className="text-sm text-muted-foreground">
            {isSuccess && email ? (
              <>
                We sent a magic link to <strong>{email}</strong>
              </>
            ) : (
              message
            )}
          </p>

          {isSuccess && (
            <p className="text-xs text-muted-foreground">
              Didn&apos;t receive it? Check your spam folder
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={onRetry}
        variant={isSuccess ? "outline" : "default"}
        className="w-full"
      >
        {isSuccess ? "Try again" : "Go back"}
      </Button>
    </div>
  );
}
