"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface StatusPageAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  icon?: LucideIcon;
  disabled?: boolean;
}

export interface StatusPageProps {
  /** The main icon to display */
  icon: LucideIcon;
  /** Icon background color classes (e.g., "bg-green-100 text-green-600") */
  iconColor: string;
  /** Page title */
  title: string;
  /** Page description/message */
  message: string;
  /** Array of action buttons */
  actions?: StatusPageAction[];
  /** Custom className for the container */
  className?: string;
}

const StatusPage: React.FC<StatusPageProps> = ({
  icon: Icon,
  iconColor,
  title,
  message,
  actions = [],
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn("max-w-full w-sm mx-auto", className)}
    >
      <div className="flex flex-col gap-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-full",
              iconColor
            )}
          >
            <Icon className="size-6" />
          </div>

          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>

        {actions.length > 0 && (
          <div className="flex flex-col gap-3">
            {actions.map((action, index) => {
              const ButtonIcon = action.icon;

              if (action.href) {
                return (
                  <Button
                    key={index}
                    asChild
                    variant={action.variant || "default"}
                    className="w-full"
                    disabled={action.disabled}
                  >
                    <a href={action.href}>
                      {ButtonIcon && <ButtonIcon className="mr-2 size-4" />}
                      {action.label}
                    </a>
                  </Button>
                );
              }

              return (
                <Button
                  key={index}
                  onClick={action.onClick}
                  variant={action.variant || "default"}
                  className="w-full"
                  disabled={action.disabled}
                >
                  {ButtonIcon && <ButtonIcon className="mr-2 size-4" />}
                  {action.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatusPage;
