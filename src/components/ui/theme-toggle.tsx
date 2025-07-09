import { useState } from "react";
import { Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <Button
      onClick={toggleTheme}
      className="flex items-center justify-center size-8"
      aria-label="Toggle theme"
      variant="ghost"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-500" />
      )}
    </Button>
  );
}
