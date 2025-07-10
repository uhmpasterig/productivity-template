"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import { headerConfig } from "@/config/navigation";
import { authConfig } from "@/config/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";

interface MobileMenuProps {
  isOpen: boolean;
  user?: SupabaseUser | null;
  onClose: () => void;
}

export function MobileMenu({ isOpen, user, onClose }: MobileMenuProps) {
  const handleSignOut = async () => {
    await signOutAction();
    onClose();
  };

  const handleNavClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 md:hidden",
      "bg-background/80 backdrop-blur-lg"
    )}>
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-lg border-l">
        <div className="flex flex-col h-full p-6">
          {/* User Section */}
          {user && (
            <div className="flex items-center space-x-3 pb-6 border-b">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.user_metadata.name?.[0] || user.user_metadata.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.user_metadata.name || "User"}</p>
                <p className="text-sm text-muted-foreground">{user.user_metadata.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 py-6">
            <div className="space-y-4">
              {/* Main Navigation Items - You can customize these */}
              <Link 
                href="/" 
                onClick={handleNavClick}
                className="block text-lg font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/docs" 
                onClick={handleNavClick}
                className="block text-lg font-medium hover:text-primary transition-colors"
              >
                Docs
              </Link>
              
              {/* User Menu Items */}
              {user && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Account</p>
                  {headerConfig.userMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      className="flex items-center space-x-3 py-2 text-sm hover:text-primary transition-colors"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="border-t pt-4">
            {user ? (
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign out
              </Button>
            ) : (
              <div className="space-y-2">
                <Button variant="ghost" asChild className="w-full">
                  <Link href={authConfig.loginUrl} onClick={handleNavClick}>
                    Sign in
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Link href="/signup" onClick={handleNavClick}>
                    Get started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 