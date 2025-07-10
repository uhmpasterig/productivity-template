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
    <div className="items-center space-x-4 flex-row flex">
      <ThemeToggle />
      {/* Search */}
      {headerConfig.features.search && (
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
} 