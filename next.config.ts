import type { NextConfig } from "next";

// Fully static site: `pnpm build` writes plain HTML/CSS/JS to ./out, no server needed.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export cannot use the on-demand optimizer. Screenshots are
    // pre-optimised to WebP by scripts/capture-screenshots.mjs instead.
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
