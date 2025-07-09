/* 
  This file contains the navigation configuration for the app.
  It's not used for routing, but for the navigation menu's included in the template.
*/

export const navigationConfig = {
  pages: [
    { title: "Features", href: "/features" },
    { title: "Pricing", href: "/pricing" },
    { title: "About", href: "/about" },
  ],
  dashboard: [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { title: "Settings", href: "/settings", icon: "Settings" },
  ],
};

import { Settings, HelpCircle, User, CreditCard, Shield } from "lucide-react";

export const headerConfig = {
  navigation: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
      badge: "New",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Analytics",
      href: "/analytics",
    },
    {
      label: "Help",
      href: "/help",
    },
  ],
  userMenu: [
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      label: "Billing",
      href: "/billing",
      icon: CreditCard,
    },
    {
      label: "Security",
      href: "/security",
      icon: Shield,
    },
    {
      label: "Support",
      href: "/support",
      icon: HelpCircle,
    },
  ],
  features: {
    search: true,
    notifications: true,
  },
};
