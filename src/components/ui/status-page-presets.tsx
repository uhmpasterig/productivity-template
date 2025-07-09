import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  ArrowRight, 
  Settings, 
  Home, 
  ArrowLeft, 
  RefreshCw,
  LogOut, 
  Mail
} from "lucide-react";
import StatusPage, { StatusPageProps } from "./status-page";
import { authConfig } from "@/config/auth";

// Preset configurations for common status page types
export const statusPagePresets = {
  success: {
    icon: CheckCircle,
    iconColor: "bg-green-100 text-green-600",
  },
  error: {
    icon: AlertTriangle,
    iconColor: "bg-red-100 text-red-600",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "bg-yellow-100 text-yellow-600",
  },
  info: {
    icon: Info,
    iconColor: "bg-blue-100 text-blue-600",
  },
  critical: {
    icon: XCircle,
    iconColor: "bg-red-100 text-red-600",
  },
} as const;

// Common action presets
export const commonActions = {
  exploreDashboard: {
    label: "Explore the app",
    href: "/dashboard",
    icon: ArrowRight,
  },
  completeOnboarding: {
    label: "Complete onboarding",
    href: "/onboarding",
    variant: "outline" as const,
    icon: Settings,
  },
  goHome: {
    label: "Go home",
    href: "/",
    variant: "outline" as const,
    icon: Home,
  },
  goBack: {
    label: "Go back",
    onClick: () => window.history.back(),
    variant: "outline" as const,
    icon: ArrowLeft,
  },
  tryAgain: {
    label: "Try again",
    onClick: () => window.location.reload(),
    icon: RefreshCw,
  },
  signOut: {
    label: "Sign out",
    href: authConfig.redirectAfterSignout,
    variant: "destructive" as const,
    icon: LogOut,
  },
  support: {
    label: "Contact support",
    href: "/support",
    icon: Mail,
  },
} as const;

// Preset component factories
export const SuccessPage = (props: Omit<StatusPageProps, "icon" | "iconColor">) => (
  <StatusPage {...statusPagePresets.success} {...props} />
);

export const ErrorPage = (props: Omit<StatusPageProps, "icon" | "iconColor">) => (
  <StatusPage {...statusPagePresets.error} {...props} />
);

export const WarningPage = (props: Omit<StatusPageProps, "icon" | "iconColor">) => (
  <StatusPage {...statusPagePresets.warning} {...props} />
);

export const InfoPage = (props: Omit<StatusPageProps, "icon" | "iconColor">) => (
  <StatusPage {...statusPagePresets.info} {...props} />
);

export const CriticalPage = (props: Omit<StatusPageProps, "icon" | "iconColor">) => (
  <StatusPage {...statusPagePresets.critical} {...props} />
); 