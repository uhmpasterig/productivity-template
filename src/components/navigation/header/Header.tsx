"use client";

import { useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { cn } from "@/utils/cn";

// Import the new smaller components
import { Logo } from "@/components/ui/logo";
import HeaderNavigation from "./HeaderNav";
import { HeaderActions } from "./HeaderActions";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { MobileMenu } from "./MobileMenu";
import { headerNavConfig } from "@/config/header-navigation";

type HeaderProps = {
  user?: SupabaseUser | null;
};

export default function Header({ user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-16",
        "bg-background/80 backdrop-blur-lg border-b border-border/40 transition-none"
      )}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Logo variant="full" size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <HeaderNavigation config={headerNavConfig} />
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Header Actions (theme, search, notifications) */}
            <HeaderActions user={user} />

            {/* User Menu or Auth Buttons */}
            {user ? <UserMenu user={user} /> : <AuthButtons />}

            {/* Mobile Menu Toggle */}
            <MobileMenuToggle
              isOpen={isMobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        user={user}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
