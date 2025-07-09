const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const siteConfig = {
  name: "My App",
  description: "Description of your application",
  url: APP_URL,
  ogImage: `${APP_URL}/og.jpg`,
  creator: "Your Name",
  keywords: ["Next.js", "TypeScript"],
};
