# Navigation System Documentation

## Overview

The navigation system provides two distinct layouts for different user contexts:
- **Dashboard Layout**: Sidebar navigation for authenticated users
- **Page Layout**: Header navigation for public/marketing pages

## Architecture

### Route Groups
Next.js route groups organize pages by layout type:

```
app/
├── (dashboard)/          # Protected routes with sidebar
│   ├── layout.tsx
│   ├── dashboard/
│   ├── settings/
│   └── profile/
├── (pages)/             # Public routes with header
│   ├── layout.tsx
│   ├── page.tsx        # Landing page
│   ├── about/
│   └── pricing/
└── layout.tsx          # Root layout
```

### Component Structure

```
components/
├── navigation/
│   ├── Sidebar.tsx         # Dashboard sidebar
│   ├── Header.tsx          # Public page header
│   ├── MobileNav.tsx       # Mobile navigation drawer
│   ├── NavItem.tsx         # Reusable navigation item
│   └── UserMenu.tsx        # User dropdown menu
└── layout/
    ├── DashboardLayout.tsx # Dashboard wrapper
    └── PageLayout.tsx      # Public page wrapper
```

## Dashboard Layout

### Features
- **Collapsible sidebar** with expand/collapse toggle
- **Active state indicators** for current page
- **User menu** at bottom with avatar and actions
- **Mobile responsive** with drawer overlay
- **Route protection** via middleware

### Navigation Items
```typescript
type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
  roles?: string[];
};
```

### Sidebar Structure
- Logo/brand at top
- Main navigation items
- User menu at bottom
- Collapse toggle button

## Page Layout

### Features
- **Header navigation** with logo and main links
- **Mobile hamburger menu** with full-screen overlay
- **Authentication buttons** or user menu
- **Responsive design** with mobile-first approach

### Header Components
- Logo/brand link
- Navigation menu items
- Auth buttons (login/signup) or user menu
- Mobile menu toggle

## Implementation Details

### Layout Hierarchy
```
Root Layout (app/layout.tsx)
├── Dashboard Layout (app/(dashboard)/layout.tsx)
│   └── Sidebar + Main Content Area
└── Page Layout (app/(pages)/layout.tsx)
    └── Header + Main Content Area
```

### Route Protection
- Middleware checks authentication status
- Redirects unauthenticated users from dashboard routes
- Allows public access to page routes

### State Management
- Sidebar collapse state (localStorage)
- Mobile menu open/close state
- Active navigation item tracking

## Mobile Behavior

### Dashboard (Mobile)
- Sidebar becomes overlay drawer
- Toggle button in header
- Swipe gesture support
- Backdrop click to close

### Pages (Mobile)
- Header collapses to hamburger menu
- Full-screen navigation overlay
- Smooth animations
- Touch-friendly targets

## Customization

### Navigation Items
Configure in `lib/navigation.ts`:
```typescript
export const dashboardNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const pageNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];
```

### Styling
- Uses Tailwind CSS utilities
- Consistent spacing and colors
- Dark/light mode support
- Hover and focus states

### Icons
- Lucide React icon library
- Consistent 20px size
- Proper accessibility labels
- Support for badges/indicators

## Usage Examples

### Dashboard Navigation
```typescript
// app/(dashboard)/layout.tsx
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
```

### Page Navigation
```typescript
// app/(pages)/layout.tsx
import { PageLayout } from "@/components/layout/PageLayout";

export default function Layout({ children }) {
  return <PageLayout>{children}</PageLayout>;
}
```

### Adding New Navigation Items
```typescript
// lib/navigation.ts
{
  label: "Analytics",
  href: "/dashboard/analytics",
  icon: BarChart,
  badge: "New",
  roles: ["admin", "user"]
}
```

## Accessibility Features

- **Keyboard navigation** with tab order
- **Screen reader support** with proper ARIA labels
- **Focus management** for mobile menus
- **High contrast** mode support
- **Reduced motion** preferences

## Performance Optimizations

- **Lazy loading** of navigation components
- **Memoized** navigation items
- **Optimized re-renders** with React.memo
- **Efficient** state updates

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design from 320px to 1920px+
- Progressive enhancement approach