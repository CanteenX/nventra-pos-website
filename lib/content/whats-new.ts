import type { LucideIcon } from "lucide-react";
import {
  Braces,
  GitMerge,
  Languages,
  Mail,
  PackageSearch,
  ShieldCheck,
  Stamp,
  Store,
  Wallet,
} from "lucide-react";

/**
 * Shipped in v1.0. Every entry maps to a merged change in the product repo
 * (see docs/AGGREGATORS.md, MULTI-BRANCH-SYNC.md, GRAPHQL.md, email.md, I18N.md).
 */
export interface WhatsNewItem {
  title: string;
  body: string;
  icon: LucideIcon;
  href: string;
}

export const WHATS_NEW: WhatsNewItem[] = [
  {
    title: "Online channels",
    body: "Zomato, Swiggy and channel-manager orders land in one queue to accept or decline.",
    icon: Store,
    href: "/features/#online-channels",
  },
  {
    title: "Smart reorder suggestions",
    body: "How much to order, worked out from recent usage, lead time and pack size.",
    icon: PackageSearch,
    href: "/features/#inventory",
  },
  {
    title: "Petty cash",
    body: "Top-ups and payouts per branch, with a running balance and receipts.",
    icon: Wallet,
    href: "/features/#accounting",
  },
  {
    title: "Expense approvals",
    body: "Spends above your threshold wait for a manager before they count.",
    icon: Stamp,
    href: "/features/#accounting",
  },
  {
    title: "Multi-branch sync",
    body: "Branches keep selling offline and catch up with head office later.",
    icon: GitMerge,
    href: "/features/#reports",
  },
  {
    title: "GraphQL API",
    body: "Read the menu, orders and customers, place orders and mark dishes sold out.",
    icon: Braces,
    href: "/features/#integrations",
  },
  {
    title: "Branded emails",
    body: "Reports, campaigns and alerts in your colour and wording. Preview and send a test.",
    icon: Mail,
    href: "/features/#integrations",
  },
  {
    title: "Hindi interface",
    body: "The staff app now speaks Hindi, alongside English, Spanish and French.",
    icon: Languages,
    href: "/features/#staff",
  },
  {
    title: "Tighter security",
    body: "Staff can't give themselves more access, and webhooks can't reach your internal network.",
    icon: ShieldCheck,
    href: "/features/#security",
  },
];
