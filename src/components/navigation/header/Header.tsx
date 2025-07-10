"use client";

import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { cn } from "@/utils/cn";
import { AnimatePresence } from "framer-motion";

// Import the new smaller components
import { Logo } from "@/components/ui/logo";
import HeaderNavigation from "./HeaderNav";
import { HeaderActions } from "./HeaderActions";
import { UserMenu, UserMenuSkeleton } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { MobileMenu } from "./MobileMenu";
import { pageNavigationConfig } from "@/config/page-navigation";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        setLoading(false);
        return;
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    getUser();
  }, [supabase]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 w-full lg:px-16 md:px-8 px-4",
        "flex items-center justify-between",
        "bg-background/80 backdrop-blur-lg border-b border-border/40 transition-none"
      )}
    >
      <div className="px-4 h-16 w-full flex items-center justify-between">
        <div className="flex items-center justify-center space-x-8">
          {/* Logo */}
          <Logo variant="full" size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:block items-center space-x-1">
            <HeaderNavigation config={pageNavigationConfig} />
          </nav>
        </div>

        {/* Right Side */}
        <div className="items-center space-x-4 hidden lg:flex justify-end w-96">
          {/* Header Actions (theme, search, notifications) */}
          <HeaderActions />

          {/* User Menu or Auth Buttons */}
          {loading || !user ? <AuthButtons /> : <UserMenu user={user} />}
        </div>
        {/* Mobile Menu Toggle */}
        <MobileMenuToggle
          isOpen={isMobileMenuOpen}
          onToggle={toggleMobileMenu}
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            user={user}
            onClose={() => setIsMobileMenuOpen(false)}
            config={pageNavigationConfig}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
