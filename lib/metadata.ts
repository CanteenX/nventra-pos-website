import type { Metadata } from "next";
import { SITE, ogImage } from "@/lib/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/** Per-page SEO + OpenGraph + Twitter metadata with a canonical URL. */
export function pageMetadata({ title, description, path, image = ogImage }: PageMeta): Metadata {
  const fullTitle = path === "/" ? `${SITE.name}: ${SITE.tagline}` : `${title} | ${SITE.name}`;
  return {
    // `absolute` stops the layout's "%s | Nventra POS" template adding the brand twice.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE.name,
      type: "website",
      locale: "en_IN",
      images: [{ url: image, width: 1440, height: 900, alt: `${SITE.name} screenshot` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
