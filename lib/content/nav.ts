import { FEATURE_GROUPS } from "@/lib/content/features";
import { SOLUTIONS } from "@/lib/content/solutions";
import { SITE } from "@/lib/site";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const PRODUCT_LINKS: NavLink[] = FEATURE_GROUPS.map((g) => ({
  label: g.title,
  href: `/features/#${g.id}`,
  description: g.summary,
}));

export const SOLUTION_LINKS: NavLink[] = SOLUTIONS.map((s) => ({
  label: s.name,
  href: `/solutions/${s.slug}/`,
  description: s.short,
}));

export const RESOURCE_LINKS: NavLink[] = [
  { label: "How to use", href: "/how-to-use/", description: "Six steps from sign-up to your first paid order." },
  { label: "Install guide", href: "/install/", description: "Docker, Windows and every setting explained." },
  { label: "All features", href: "/features/", description: "The full list, including what is still on the way." },
  { label: "FAQ", href: "/#faq", description: "Pricing, offline use, backups, GST and UPI." },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features/" },
      { label: "How to use", href: "/how-to-use/" },
      { label: "Install", href: "/install/" },
      { label: "Screenshots", href: "/#gallery" },
      { label: "Compare", href: "/#compare" },
    ],
  },
  {
    title: "Solutions",
    links: SOLUTION_LINKS.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Project",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Architecture", href: "/#architecture" },
      { label: "Contact", href: "/contact/" },
      { label: `Email ${SITE.email}`, href: `mailto:${SITE.email}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
      { label: `Licence: ${SITE.license}`, href: "https://www.gnu.org/licenses/agpl-3.0.html" },
    ],
  },
];
