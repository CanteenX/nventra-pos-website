/**
 * Single source of truth for brand, contact and URL constants.
 * Change the domain here (or set NEXT_PUBLIC_SITE_URL at build time) before launch.
 */
export const SITE = {
  name: "Nventra POS",
  company: "Nventra",
  tagline: "Self-hosted, offline-first restaurant POS",
  description:
    "Nventra POS is a self-hosted, offline-first restaurant POS and management system: billing with UPI QR, tables, kitchen display, inventory, staff, accounting and reports on your own server, with no per-terminal subscription.",
  // TODO(launch): replace with the real domain once it is registered.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pos.nventra.example").replace(/\/$/, ""),
  email: "nventra01@gmail.com",
  sourceRepo: "https://github.com/CanteenX/restaurant-pos",
  sourceNote: "Source code available to customers on request",
  upstream: {
    label: "Based on Nodedr OrderRestro, AGPL-3.0",
    href: "https://github.com/Raktim94/nodedr-restaurant-pos",
  },
  license: "AGPL-3.0",
  appPort: 1995,
  demoLogin: { email: "owner@demo.local", password: "Password123!" },
} as const;

export const ogImage = "/screenshots/dashboard-light.webp";
