"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import { headerConfig } from "@/config/navigation";
import { authConfig } from "@/config/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { LogOut, ChevronDown, User } from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";
import { m, motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { HeaderNavConfig } from "./HeaderNav";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { UserMenu } from "./UserMenu";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface MobileMenuProps {
  isOpen: boolean;
  user?: SupabaseUser | null;
  onClose: () => void;
  config: HeaderNavConfig;
}

export function MobileMenu({ isOpen, user, onClose, config }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Disable body scroll when menu is open and focus the menu
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the menu container for keyboard navigation
      if (menuRef.current) {
        menuRef.current.focus();
      }
    } else {
      // Re-enable body scroll
      document.body.style.overflow = '';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOutAction();
    onClose();
  };

  const handleNavClick = () => {
    onClose();
  };

  const handleBackdropClick = () => {
    onClose();
  };

  const toggleExpanded = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const getGradientClass = (gradient?: string) => {
    switch (gradient) {
      case "muted":
        return "from-muted/50 to-muted bg-gradient-to-b";
      case "primary":
        return "from-primary/50 to-primary bg-gradient-to-b";
      case "secondary":
        return "from-secondary/50 to-secondary bg-gradient-to-b";
      default:
        return "from-muted/50 to-muted bg-gradient-to-b";
    }
  };

  const renderNavItem = (item: any, index: number) => {
    if (item.type === "link") {
      return (
        <Link
          key={index}
          href={item.href || "#"}
          onClick={handleNavClick}
          className="group block text-lg font-medium hover:text-primary transition-colors py-2 px-2 -mx-2 rounded-md hover:bg-muted/50"
        >
          <span className="group-hover:text-primary transition-colors">{item.label}</span>
        </Link>
      );
    }

    if (item.type === "dropdown" || item.type === "mega") {
      const isExpanded = expandedSection === index;

      return (
        <div key={index} className="space-y-2">
          <button
            onClick={() => toggleExpanded(index)}
            className="group flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors py-2 px-2 -mx-2 rounded-md hover:bg-muted/50"
          >
            <span className="group-hover:text-primary transition-colors">{item.label}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 duration-200 group-hover:text-primary transition-all",
                isExpanded && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.2, ease: "easeInOut" }
                }}
                className="overflow-hidden"
              >
              <div className="ml-4 space-y-3 border-l border-border pl-4">
                {item.content?.sections?.map(
                  (section: any, sectionIndex: number) => (
                    <div key={sectionIndex} className="space-y-2">
                      {section.title && (
                        <div className="text-sm font-medium text-muted-foreground">
                          {section.title}
                        </div>
                      )}

                      {section.type === "featured" && section.featured && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={section.featured.href}
                              onClick={handleNavClick}
                              className={cn(
                                "group block p-4 rounded-md border transition-colors no-underline outline-none select-none hover:bg-muted/50 focus:bg-muted/50 focus:shadow-sm hover:shadow-sm",
                                getGradientClass(section.featured.gradient)
                              )}
                            >
                              <div className="font-medium text-sm mb-2 group-hover:text-primary transition-colors">
                                {section.featured.title}
                              </div>
                              <p className="text-xs text-muted-foreground leading-tight group-hover:text-muted-foreground/80 transition-colors">
                                {section.featured.description}
                              </p>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            {section.featured.description}
                          </TooltipContent>
                        </Tooltip>
                      )}

                      {section.items?.map((subItem: any, subIndex: number) => (
                        <Tooltip key={subIndex}>
                          <TooltipTrigger asChild>
                            <Link
                              href={subItem.href}
                              onClick={handleNavClick}
                              className="group block px-3 py-1.5 text-sm hover:text-primary transition-colors rounded-md hover:bg-muted/50 -mx-2"
                            >
                              <div className="flex items-center gap-2">
                                {subItem.icon && (
                                  <subItem.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                                )}
                                <span className="group-hover:text-primary transition-colors">{subItem.label}</span>
                              </div>
                              {subItem.description && (
                                <p className="text-xs text-muted-foreground mt-1 ml-3 line-clamp-1 group-hover:text-muted-foreground/80 transition-colors">
                                  {subItem.description}
                                </p>
                              )}
                            </Link>
                          </TooltipTrigger>
                          {subItem.description && (
                            <TooltipContent side="right" className="max-w-xs">
                              {subItem.description}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      ))}
                    </div>
                  )
                )}
              </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return null;
  };

  // Calculate the account section index (comes after all config items)
  const accountSectionIndex = config.items.length;

  return (
    <>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed h-[calc(100dvh-4rem)] w-full inset-0 top-16 z-30",
          "lg:hidden",
          "bg-background/80"
        )}
        onClick={handleBackdropClick}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* Sliding sidebar */}
      <motion.div
        ref={menuRef}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        className={cn(
          "fixed top-16 left-0 h-[calc(100dvh-4rem)] w-full max-w-sm",
          "z-40 lg:hidden",
          "bg-background shadow-2xl border-r",
          "focus:outline-none"
        )}
        tabIndex={-1}
      >
        <div className="flex flex-col h-full">
          {/* Scrollable Navigation Links */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-6 pb-0">
              <div className="space-y-4">
                {config.items.map((item, index) => renderNavItem(item, index))}
              </div>
            </nav>
          </div>

          {/* Fixed Bottom Section - User Account or Auth Buttons */}
          <div className="border-t p-6 bg-background relative">
            {user && headerConfig.userMenu ? (
              <div className="space-y-2">
                <AnimatePresence mode="wait">
                  {expandedSection === accountSectionIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: 10 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: 10 }}
                      transition={{ 
                        height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                        opacity: { duration: 0.2, ease: "easeInOut" },
                        y: { duration: 0.2, ease: "easeInOut" }
                      }}
                      className={cn(
                        "absolute bottom-full left-0 right-0 bg-background border border-border shadow-lg",
                        "rounded-lg overflow-hidden"
                      )}
                    >
                    <div className="p-4 space-y-3">
                      <h2 className="text-lg font-semibold">Account</h2>
                      <Separator className="my-2 bg-border/40 w-full h-px" />

                      {/* User Menu Items */}
                      <div className="space-y-1">
                        {headerConfig.userMenu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNavClick}
                            className="flex items-center gap-3 px-2 py-2 text-sm rounded-lg hover:bg-muted/50 transition-colors group"
                          >
                            <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="group-hover:text-primary transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                        <Separator className="my-2 bg-border/40 w-full h-px" />
                        {/* Sign Out Button */}
                        <Button
                          onClick={handleSignOut}
                          variant="ghost"
                          className="text-destructive flex items-center justify-start gap-3 px-2 py-2 text-sm rounded-lg hover:bg-destructive/10 transition-colors group w-full text-left"
                        >
                          <LogOut className="h-4 w-4 text-destructive group-hover:text-destructive transition-colors" />
                          <span className="group-hover:text-destructive transition-colors">
                            Sign out
                          </span>
                        </Button>
                      </div>
                    </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  onClick={() => toggleExpanded(accountSectionIndex)}
                  className={cn(
                    "group flex items-center justify-between w-full text-lg font-medium hover:text-primary py-2 cursor-pointer",
                    "border-border border p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 group-hover:ring-2 group-hover:ring-primary/20 transition-all">
                      <AvatarImage
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm group-hover:bg-primary/90 transition-colors">
                        {user.user_metadata.name?.[0] ||
                          user.user_metadata.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {user.user_metadata.name || "Account"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate group-hover:text-muted-foreground/80 transition-colors">
                        {user.user_metadata.email}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 duration-200 group-hover:text-primary transition-all",
                      expandedSection === accountSectionIndex && "rotate-180"
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Button variant="outline" asChild className="w-full">
                  <Link href={authConfig.loginUrl} onClick={handleNavClick}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href={authConfig.signupUrl} onClick={handleNavClick}>
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
