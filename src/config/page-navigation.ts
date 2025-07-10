import { HeaderNavConfig } from "@/components/navigation/header/HeaderNav";
import { 
  BarChart3, 
  Users, 
  Shield, 
  Zap, 
  CreditCard, 
  Settings, 
  BookOpen, 
  MessageSquare, 
  Award, 
  Globe, 
  Smartphone, 
  Database,
  Code,
  Palette,
  Layout,
  Package,
  Cloud,
  Target,
  Briefcase,
  GraduationCap
} from "lucide-react";

// Comprehensive Sample Configuration for Modern SaaS Application
export const pageNavigationConfig: HeaderNavConfig = {
  viewport: true,
  items: [
    // Featured layout with primary gradient
    {
      type: "dropdown",
      label: "Platform",
      content: {
        layout: "featured",
        width: "xl",
        sections: [
          {
            type: "featured",
            featured: {
              title: "Analytics Dashboard",
              description: "Get comprehensive insights into your business performance with real-time data visualization and advanced reporting tools.",
              href: "/dashboard",
            },
          },
          {
            type: "description-list",
            items: [
              {
                label: "Real-time Analytics",
                href: "/analytics",
                description: "Monitor your KPIs and metrics with live data updates and customizable dashboards.",
              },
              {
                label: "User Management",
                href: "/users",
                description: "Manage team members, roles, and permissions with enterprise-grade security.",
              },
              {
                label: "API Integration",
                href: "/integrations",
                description: "Connect with 200+ third-party services and tools your team already uses.",
              },
              {
                label: "Automation Hub",
                href: "/automation",
                description: "Streamline workflows with powerful automation tools and custom triggers.",
              },
            ],
          },
        ],
      },
    },
    
    // Grid layout with 3 columns showing product features
    {
      type: "dropdown",
      label: "Products",
      content: {
        layout: "grid",
        width: "xl",
        columns: 3,
        sections: [
          {
            type: "description-list",
            items: [
              {
                label: "Business Intelligence",
                href: "/products/bi",
                description: "Advanced analytics and reporting platform for data-driven decisions.",
              },
              {
                label: "Customer Portal",
                href: "/products/portal",
                description: "Self-service portal for customers with ticket management and knowledge base.",
              },
              {
                label: "Marketing Suite",
                href: "/products/marketing",
                description: "Complete marketing automation with email campaigns and lead tracking.",
              },
            ],
          },
          {
            type: "description-list",
            items: [
              {
                label: "E-commerce Platform",
                href: "/products/ecommerce",
                description: "Full-featured online store with inventory management and payment processing.",
              },
              {
                label: "Project Management",
                href: "/products/projects",
                description: "Collaborative workspace for teams with task tracking and time management.",
              },
              {
                label: "CRM System",
                href: "/products/crm",
                description: "Customer relationship management with sales pipeline and contact management.",
              },
            ],
          },
          {
            type: "description-list",
            items: [
              {
                label: "Mobile App Builder",
                href: "/products/mobile",
                description: "No-code platform for creating native mobile applications.",
              },
              {
                label: "API Gateway",
                href: "/products/api",
                description: "Secure API management with rate limiting and authentication.",
              },
              {
                label: "Cloud Storage",
                href: "/products/storage",
                description: "Scalable file storage with CDN and backup solutions.",
              },
            ],
          },
        ],
      },
    },

    // List layout for solutions
    {
      type: "dropdown",
      label: "Solutions",
      content: {
        layout: "list",
        width: "md",
        sections: [
          {
            type: "description-list",
            items: [
              {
                label: "Enterprise",
                href: "/solutions/enterprise",
                description: "Scalable solutions for large organizations with dedicated support.",
              },
              {
                label: "Startups",
                href: "/solutions/startups",
                description: "Affordable packages designed for growing businesses and startups.",
              },
              {
                label: "Education",
                href: "/solutions/education",
                description: "Special pricing and features for educational institutions.",
              },
              {
                label: "Healthcare",
                href: "/solutions/healthcare",
                description: "HIPAA-compliant tools for healthcare providers and organizations.",
              },
              {
                label: "Non-Profit",
                href: "/solutions/nonprofit",
                description: "Discounted rates and specialized features for non-profit organizations.",
              },
            ],
          },
        ],
      },
    },

    // Simple list for resources
    {
      type: "dropdown",
      label: "Resources",
      content: {
        layout: "list",
        width: "sm",
        sections: [
          {
            type: "list",
            items: [
              {
                label: "Documentation",
                href: "/docs",
              },
              {
                label: "Blog",
                href: "/blog",
              },
              {
                label: "Case Studies",
                href: "/case-studies",
              },
              {
                label: "Webinars",
                href: "/webinars",
              },
              {
                label: "Community",
                href: "/community",
              },
              {
                label: "Help Center",
                href: "/help",
              },
            ],
          },
        ],
      },
    },

    // Regular link with no transition
    {
      type: "link",
      label: "Pricing",
      href: "/pricing",
      style: {
        transition: false,
      },
    },

    // Complex mega menu with multiple sections
    {
      type: "dropdown",
      label: "Company",
      content: {
        layout: "grid",
        width: "xl",
        columns: 4,
        sections: [
          {
            type: "description-list",
            items: [
              {
                label: "About Us",
                href: "/about",
                description: "Learn about our mission, values, and the team behind our platform.",
              },
              {
                label: "Careers",
                href: "/careers",
                description: "Join our growing team and help shape the future of technology.",
              },
            ],
          },
          {
            type: "description-list",
            items: [
              {
                label: "Press Kit",
                href: "/press",
                description: "Media resources, logos, and brand guidelines for press coverage.",
              },
              {
                label: "Investors",
                href: "/investors",
                description: "Financial information and updates for our investors and stakeholders.",
              },
            ],
          },
          {
            type: "description-list",
            items: [
              {
                label: "Partners",
                href: "/partners",
                description: "Explore partnership opportunities and our ecosystem of integrations.",
              },
              {
                label: "Security",
                href: "/security",
                description: "Learn about our security practices and compliance certifications.",
              },
            ],
          },
          {
            type: "description-list",
            items: [
              {
                label: "Contact",
                href: "/contact",
                description: "Get in touch with our team for support, sales, or general inquiries.",
              },
              {
                label: "Legal",
                href: "/legal",
                description: "Terms of service, privacy policy, and other legal documentation.",
              },
            ],
          },
        ],
      },
    },
  ],
};
