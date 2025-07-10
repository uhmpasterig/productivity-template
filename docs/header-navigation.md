# Header Navigation Configuration

The header navigation system supports flexible dropdown menus and simple links with TypeScript configuration.

## Basic Structure

```typescript
import { HeaderNavConfig } from "@/components/navigation/header/HeaderNav";
import { Icon1, Icon2 } from "lucide-react";

export const headerNavConfig: HeaderNavConfig = {
  viewport: false, // Enable/disable navigation viewport
  items: [
    // Navigation items here
  ]
};
```

## Navigation Item Types

### Simple Link
```typescript
{
  type: "link",
  label: "Docs",
  href: "/docs",
  style: {
    transition: false // Optional: disable hover transitions
  }
}
```

### Dropdown Menu
```typescript
{
  type: "dropdown",
  label: "Components",
  content: {
    layout: "grid", // "grid" | "list" | "featured"
    width: "lg",    // "sm" | "md" | "lg" | "xl"
    columns: 2,     // 1-4 (for grid layout)
    sections: [
      // Section configurations
    ]
  }
}
```

## Section Types

### Featured Section
Large promotional card with gradient background:
```typescript
{
  type: "featured",
  featured: {
    title: "shadcn/ui",
    description: "Beautifully designed components built with Tailwind CSS.",
    href: "/",
    gradient: "muted" // "muted" | "primary" | "secondary"
  }
}
```

### Description List
Items with titles and descriptions:
```typescript
{
  type: "description-list",
  items: [
    {
      label: "Alert Dialog",
      href: "/components/alert-dialog",
      description: "A modal dialog that interrupts the user with important content."
    }
  ]
}
```

### Icon List
Items with Lucide React icons:
```typescript
{
  type: "icon-list",
  items: [
    {
      label: "To Do",
      href: "/todo",
      icon: Circle // Import from lucide-react
    }
  ]
}
```

### Simple List
Basic links without descriptions:
```typescript
{
  type: "list",
  items: [
    {
      label: "Components",
      href: "/components"
    }
  ]
}
```

## Layout Options

- **Grid**: Multi-column layout with specified columns (1-4)
- **List**: Single column, stacked vertically
- **Featured**: Special layout for featured + description-list combination

## Width Options

- `sm`: 200px
- `md`: 300px (400px on md+ screens)
- `lg`: 400px (500px on md+, 600px on lg+)
- `xl`: 400px (500px on md+, 700px on lg+)

## Icons Best Practice

Always import specific icons instead of using wildcards:

```typescript
// ✅ Good
import { Circle, CircleCheck, CircleHelp } from "lucide-react";

// ❌ Bad
import * as Icons from "lucide-react";
```

This ensures better tree shaking, type safety, and smaller bundle sizes. 