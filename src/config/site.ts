const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const siteConfig = {
  name: "My App",
  description: "Description of your application",
  url: APP_URL,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "My App",
    description: "Description of your application",
    url: APP_URL,
    siteName: "My App",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "My App" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My App",
    description: "Description of your application",
    images: ["/og.png"],
  },
  authors: [{ name: "John Doe", url: "https://john-doe.com" }],
  creator: "Your Name",
  publisher: "Your Name",
  baseKeywords: ["Next.js", "TypeScript", "React", "SaaS"],
  metadataBase: new URL(APP_URL),
} as const;
