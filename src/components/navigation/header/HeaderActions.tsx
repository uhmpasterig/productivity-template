import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { headerConfig } from "@/config/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface HeaderActionsProps {
  user?: SupabaseUser | null;
}

export function HeaderActions({ user }: HeaderActionsProps) {
  return (
    <div className="flex items-center space-x-4">
      <ThemeToggle />
      
      {/* Search */}
      {headerConfig.features.search && (
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Search className="h-4 w-4" />
        </Button>
      )}

      {/* Notifications */}
      {user && headerConfig.features.notifications && (
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </Button>
      )}
    </div>
  );
} 