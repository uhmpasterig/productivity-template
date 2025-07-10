import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authConfig } from "@/config/auth";

export function AuthButtons() {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Button variant="ghost" asChild>
        <Link href={authConfig.loginUrl}>Sign in</Link>
      </Button>
      <Button asChild>
        <Link href={authConfig.signupUrl}>Sign up</Link>
      </Button>
    </div>
  );
}
