import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";

type LogoVariant = "icon" | "full";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const sizeConfig = {
  sm: {
    icon: "w-6 h-6",
    text: "h-6",
  },
  md: {
    icon: "w-8 h-8",
    text: "h-8",
  },
  lg: {
    icon: "w-10 h-10",
    text: "h-10",
  },
  xl: {
    icon: "w-12 h-12",
    text: "h-12",
  },
};

export function Logo({
  variant = "full",
  size = "md",
  href = "/",
  className,
  onClick,
}: LogoProps) {
  const config = sizeConfig[size];

  const LogoContent = () => {
    // Icon only variant - shows just the logo icon
    if (variant === "icon") {
      return (
        <div className={cn("flex items-center", className)}>
          <div className="relative group">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className={cn("object-contain", config.icon)}
              priority
            />
          </div>
        </div>
      );
    }

    // Text or full variant - shows logo-text.svg which already includes the icon
    return (
      <div className={cn("flex items-center", className)}>
        <div className="relative group">
          <Image
            src="/logo-text.svg"
            alt="Logo"
            width={120}
            height={32}
            className={cn("object-contain", config.text)}
            priority
          />
        </div>
      </div>
    );
  };

  if (href && !onClick) {
    return (
      <Link href={href} className="group transition-transform ease-initial hover:scale-[1.04]">
        <LogoContent />
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="group transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <LogoContent />
      </button>
    );
  }

  return <LogoContent />;
}
