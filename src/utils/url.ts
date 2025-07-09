import { siteConfig } from "@/config/site";

export function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean>
) {
  const url = new URL(path, siteConfig.url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}
