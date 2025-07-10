import { HeaderNavConfig } from "@/components/navigation/header/HeaderNav";
import { CircleHelp, Circle, CircleCheck } from "lucide-react";

// Sample Configuration
export const headerNavConfig: HeaderNavConfig = {
  viewport: false,
  items: [
    {
      type: "dropdown",
      label: "Home",
      content: {
        layout: "grid",
        width: "lg",
        columns: 2,
        sections: [
          {
            type: "featured",
            featured: {
              title: "shadcn/ui",
              description:
                "Beautifully designed components built with Tailwind CSS.",
              href: "/",
              gradient: "muted",
            },
          },
          {
            type: "description-list",
            items: [
              {
                label: "Introduction",
                href: "/",
                description:
                  "Re-usable components built using Radix UI and Tailwind CSS.",
              },
              {
                label: "Installation",
                href: "/",
                description:
                  "How to install dependencies and structure your app.",
              },
              {
                label: "Typography",
                href: "/",
                description: "Styles for headings, paragraphs, lists...etc",
              },
            ],
          },
        ],
      },
    },
    {
      type: "dropdown",
      label: "Components",
      content: {
        layout: "grid",
        width: "xl",
        columns: 2,
        sections: [
          {
            type: "description-list",
            items: [
              {
                label: "Alert Dialog",
                href: "/",
                description:
                  "A modal dialog that interrupts the user with important content and expects a response.",
              },
              {
                label: "Hover Card",
                href: "/",
                description:
                  "For sighted users to preview content available behind a link.",
              },
              {
                label: "Progress",
                href: "/",
                description:
                  "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
              },
              {
                label: "Scroll-area",
                href: "/",
                description: "Visually or semantically separates content.",
              },
              {
                label: "Tabs",
                href: "/",
                description:
                  "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
              },
              {
                label: "Tooltip",
                href: "/",
                description:
                  "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
              },
            ],
          },
        ],
      },
    },
    {
      type: "link",
      label: "Docs",
      href: "/",
      style: {
        transition: false,
      },
    },
    {
      type: "dropdown",
      label: "List",
      content: {
        layout: "list",
        width: "sm",
        sections: [
          {
            type: "description-list",
            items: [
              {
                label: "Components",
                href: "#",
                description: "Browse all components in the library.",
              },
              {
                label: "Documentation",
                href: "#",
                description: "Learn how to use the library.",
              },
              {
                label: "Blog",
                href: "#",
                description: "Read our latest blog posts.",
              },
            ],
          },
        ],
      },
    },
    {
      type: "dropdown",
      label: "Simple",
      content: {
        layout: "list",
        width: "sm",
        sections: [
          {
            type: "list",
            items: [
              {
                label: "Components",
                href: "#",
              },
              {
                label: "Documentation",
                href: "#",
              },
              {
                label: "Blocks",
                href: "#",
              },
            ],
          },
        ],
      },
    },
    {
      type: "dropdown",
      label: "With Icon",
      content: {
        layout: "list",
        width: "sm",
        sections: [
          {
            type: "icon-list",
            items: [
              {
                label: "Backlog",
                href: "#",
                icon: CircleHelp,
              },
              {
                label: "To Do",
                href: "#",
                icon: Circle,
              },
              {
                label: "Done",
                href: "#",
                icon: CircleCheck,
              },
            ],
          },
        ],
      },
    },
  ],
};
