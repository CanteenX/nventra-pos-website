import type { MetadataRoute } from "next";
import { SOLUTIONS } from "@/lib/content/solutions";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

const PAGES = ["/", "/features/", "/how-to-use/", "/install/", "/contact/", "/privacy/", "/terms/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...PAGES, ...SOLUTIONS.map((s) => `/solutions/${s.slug}/`)];
  return paths.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
