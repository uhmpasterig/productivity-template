"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  loginWithEmailAction,
  loginWithGoogleAction,
} from "@/lib/actions/auth";
import { useActionState } from "react";
import AuthFeedback from "./AuthFeedback";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Logo } from "../ui/logo";

type AuthFormProps = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode = "login" }: AuthFormProps) {
  const [state, formAction] = useActionState(loginWithEmailAction, {
    error: undefined,
    success: undefined,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show feedback when state changes to error or success
  useEffect(() => {
    if (state.error || state.success) {
      setShowFeedback(true);
    }
  }, [state.error, state.success]);

  const reset = () => {
    setLoading(false);
    setShowFeedback(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error, url } = await loginWithGoogleAction();
    if (error) {
      setShowFeedback(true);
    }
    if (url) {
      redirect(url);
    }
  };

  const handleAppleLogin = async () => {
    /* const { error, url, success } = await loginWithAppleAction();
    if (error) {
      setShowFeedback(true);
    } */
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {showFeedback ? (
          <motion.div
            key={state.error ? "error" : "success"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AuthFeedback
              type={state.error ? "error" : "success"}
              message={state.error || state.success || ""}
              onRetry={reset}
            />
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={formAction}
            onSubmit={() => setLoading(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-col items-center gap-2 font-medium">
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <Logo variant="icon" size="md" />
                  </div>
                  <span className="sr-only">{siteConfig.name}</span>
                </div>
                <h1 className="text-2xl font-bold">
                  Welcome to {siteConfig.name}
                </h1>

                {mode === "login" && (
                  <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
                {mode === "signup" && (
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? "Loading..."
                    : mode === "login"
                    ? "Login"
                    : "Sign up"}
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  or
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full text-xs"
                  onClick={handleAppleLogin}
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Apple
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full text-xs"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
