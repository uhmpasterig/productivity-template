import { Metadata } from "next";
import { siteConfig } from "@/config/site";

type CustomMetadata = {
  /** The main title for the page or resource. */
  title: string;

  /** A short description of the page for SEO and social sharing. */
  description: string;

  /** Optional keywords to help with SEO. */
  keywords?: string[];

  /** List of authors for the page. */
  authors?: { name: string; url?: string }[];

  /** Open Graph metadata for social sharing. */
  openGraph?: {
    /** The Open Graph title. */
    title?: string;
    /** The Open Graph description. */
    description?: string;
    /** The canonical URL for the Open Graph object. */
    url?: string;
    /** Images for Open Graph previews. */
    images?: { url: string; width: number; height: number; alt: string }[];
    /** The Open Graph object type. */
    type?: "website" | "article" | "profile";
  };

  /** Twitter card metadata. */
  twitter?: {
    /** The type of Twitter card to use. */
    card?: "summary" | "summary_large_image";
    /** The Twitter card title. */
    title?: string;
    /** The Twitter card description. */
    description?: string;
    /** Images for the Twitter card. */
    images?: string[];
  };

  /** Robots meta tag options for search engines. */
  robots?: {
    /** Should search engines index this page? */
    index?: boolean;
    /** Should search engines follow links on this page? */
    follow?: boolean;
    /** Googlebot-specific options. */
    googleBot?: {
      /** Should Googlebot index this page? */
      index?: boolean;
      /** Should Googlebot follow links on this page? */
      follow?: boolean;
    };
  };
};

/**
 * Creates a Next.js Metadata object from custom metadata.
 * @param metadata - The custom metadata to use for the page.
 * @returns A Metadata object suitable for Next.js pages.
 */
export const createMetadata = (metadata: CustomMetadata): Metadata => {
  const fullTitle = `${metadata.title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description: metadata.description,
    applicationName: siteConfig.name,
    metadataBase: siteConfig.metadataBase,
    keywords: [...siteConfig.baseKeywords, ...(metadata.keywords || [])],
    authors: [...siteConfig.authors, ...(metadata.authors || [])],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    robots: {
      index: metadata.robots?.index ?? true,
      follow: metadata.robots?.follow ?? true,
      googleBot: {
        index: metadata.robots?.googleBot?.index ?? true,
        follow: metadata.robots?.googleBot?.follow ?? true,
      },
    },
    openGraph: {
      ...siteConfig.openGraph,
      title: metadata.openGraph?.title || fullTitle,
      description: metadata.openGraph?.description || metadata.description,
      url: metadata.openGraph?.url || siteConfig.url,
      images: [...(metadata.openGraph?.images || siteConfig.openGraph.images)],
      type: metadata.openGraph?.type || "website",
    },
    twitter: {
      ...siteConfig.twitter,
      title: metadata.twitter?.title || fullTitle,
      description: metadata.twitter?.description || metadata.description,
      images: [...(metadata.twitter?.images || siteConfig.twitter.images)],
      card: metadata.twitter?.card || "summary_large_image",
    },
    icons: siteConfig.icons,
  };
};
