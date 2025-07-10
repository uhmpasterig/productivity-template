"use client"

import * as React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/utils/cn"

// Header Navigation Configuration Types
export interface HeaderNavConfig {
  items: HeaderNavItem[]
  viewport?: boolean
}

export interface HeaderNavItem {
  type: 'dropdown' | 'link' | 'mega'
  label: string
  href?: string
  content?: HeaderNavDropdownContent
  style?: HeaderNavItemStyle
}

export interface HeaderNavDropdownContent {
  layout: 'grid' | 'list' | 'featured'
  width: 'sm' | 'md' | 'lg' | 'xl'
  columns?: 1 | 2 | 3 | 4
  sections?: HeaderNavSection[]
}

export interface HeaderNavSection {
  type: 'featured' | 'list' | 'icon-list' | 'description-list'
  title?: string
  description?: string
  href?: string
  items?: HeaderNavSectionItem[]
  featured?: HeaderNavFeaturedSection
}

export interface HeaderNavSectionItem {
  label: string
  href: string
  description?: string
  icon?: LucideIcon
}

export interface HeaderNavFeaturedSection {
  title: string
  description: string
  href: string
  gradient?: 'muted' | 'primary' | 'secondary'
}

export interface HeaderNavItemStyle {
  transition?: boolean
}

// Helper functions
const getWidthClass = (width: string) => {
  switch (width) {
    case 'sm': return 'w-[200px]'
    case 'md': return 'w-[300px] md:w-[400px]'
    case 'lg': return 'w-[400px] md:w-[500px] lg:w-[600px]'
    case 'xl': return 'w-[400px] md:w-[500px] lg:w-[700px]'
    default: return 'w-[300px]'
  }
}

const getGridClass = (columns: number, layout: string) => {
  if (layout === 'grid') {
    switch (columns) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-2'
      case 3: return 'grid-cols-3'
      case 4: return 'grid-cols-4'
      default: return 'grid-cols-2'
    }
  }
  return ''
}

const getGradientClass = (gradient: string) => {
  switch (gradient) {
    case 'muted': return 'from-muted/50 to-muted bg-gradient-to-b'
    case 'primary': return 'from-primary/50 to-primary bg-gradient-to-b'
    case 'secondary': return 'from-secondary/50 to-secondary bg-gradient-to-b'
    default: return 'from-muted/50 to-muted bg-gradient-to-b'
  }
}

// Header Navigation Component
function HeaderNavigation({ config }: { config: HeaderNavConfig }) {
  return (
    <NavigationMenu viewport={config.viewport}>
      <NavigationMenuList>
        {config.items.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.type === 'link' ? (
              <NavigationMenuLink 
                asChild 
                className={cn(
                  navigationMenuTriggerStyle(), 
                  item.style?.transition === false && "transition-none"
                )}
              >
                <Link href={item.href || '#'}>{item.label}</Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <HeaderNavDropdownContent content={item.content!} />
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function HeaderNavDropdownContent({ content }: { content: HeaderNavDropdownContent }) {
  const widthClass = getWidthClass(content.width)
  const gridClass = content.layout === 'grid' && content.columns 
    ? getGridClass(content.columns, content.layout)
    : ''
  
  // Handle featured layout (like the Home dropdown)
  if (content.layout === 'featured') {
    return (
      <ul className={cn("grid gap-2", widthClass, "lg:grid-cols-[.75fr_1fr]")}>
        {content.sections?.map((section, index) => (
          <HeaderNavSectionRenderer key={index} section={section} isFeatured={true} />
        ))}
      </ul>
    )
  }
  
  // Handle grid layout
  if (content.layout === 'grid') {
    return (
      <ul className={cn("grid gap-2", widthClass, `md:${gridClass}`)}>
        {content.sections?.map((section, index) => (
          <HeaderNavSectionRenderer key={index} section={section} />
        ))}
      </ul>
    )
  }
  
  // Handle list layout
  return (
    <ul className={cn("grid gap-4", widthClass)}>
      {content.sections?.map((section, index) => (
        <HeaderNavSectionRenderer key={index} section={section} />
      ))}
    </ul>
  )
}

function HeaderNavSectionRenderer({ section, isFeatured = false }: { section: HeaderNavSection, isFeatured?: boolean }) {
  // Featured section (like the shadcn/ui card)
  if (section.type === 'featured' && section.featured) {
    return (
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            className={cn(
              "flex h-full w-full flex-col justify-end rounded-md p-6 no-underline outline-hidden select-none focus:shadow-md",
              getGradientClass(section.featured.gradient || 'muted')
            )}
            href={section.featured.href}
          >
            <div className="mt-4 mb-2 text-lg font-medium">
              {section.featured.title}
            </div>
            <p className="text-muted-foreground text-sm leading-tight">
              {section.featured.description}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
  
  // Description list (like Components dropdown)
  if (section.type === 'description-list') {
    return (
      <>
        {section.items?.map((item, index) => (
          <HeaderNavListItem
            key={index}
            title={item.label}
            href={item.href}
          >
            {item.description}
          </HeaderNavListItem>
        ))}
      </>
    )
  }
  
  // Icon list (like With Icon dropdown)
  if (section.type === 'icon-list') {
    return (
      <li>
        {section.items?.map((item, index) => {
          const IconComponent = item.icon
          return (
            <NavigationMenuLink key={index} asChild>
              <Link href={item.href} className="flex items-center gap-2">
                {IconComponent && <IconComponent className="h-4 w-4" />}
                {item.label}
              </Link>
            </NavigationMenuLink>
          )
        })}
      </li>
    )
  }
  
  // Simple list (like Simple dropdown)
  if (section.type === 'list') {
    return (
      <li>
        {section.items?.map((item, index) => (
          <NavigationMenuLink key={index} asChild>
            <Link href={item.href}>{item.label}</Link>
          </NavigationMenuLink>
        ))}
      </li>
    )
  }
  
  return null
}

function HeaderNavListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default HeaderNavigation