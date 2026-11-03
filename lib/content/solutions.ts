import type { LucideIcon } from "lucide-react";
import { Building2, Cake, ChefHat, Soup, Store, Wine } from "lucide-react";
import type { ShotId } from "@/lib/screenshots";

/** Restaurant-type pages under /solutions/[type]. Only real features are cited. */
export interface Solution {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  headline: string;
  intro: string;
  highlights: { title: string; body: string }[];
  shots: [ShotId, ShotId];
  honestNote?: string;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "quick-service",
    name: "Quick service (QSR)",
    short: "Fast counters, high volume, short queues.",
    icon: Store,
    headline: "Keep the queue moving at the counter",
    intro:
      "Ring up takeaway orders in a few taps, send them straight to the kitchen and take UPI without a card machine.",
    highlights: [
      { title: "Tap-to-order POS", body: "Modifiers and combos open a picker, so a burger with extra cheese stays a two-tap order." },
      { title: "UPI QR at the till", body: "A QR for the exact amount shows on the till and on a customer-facing screen." },
      { title: "Self-service kiosk", body: "A touchscreen kiosk page lets guests order themselves and sends tickets to the kitchen." },
      { title: "Peak-hour reports", body: "See which hours and items drive sales, and staff accordingly." },
    ],
    shots: ["pos", "kds"],
  },
  {
    slug: "fine-dining",
    name: "Fine dining",
    short: "Reservations, courses and attentive service.",
    icon: Wine,
    headline: "Give every table the attention it expects",
    intro:
      "Plan the evening from reservations and the floor view, remember guests' preferences and settle bills without hurry.",
    highlights: [
      { title: "Reservations and waitlist", body: "Know who is coming and when, and seat walk-ins from the waitlist." },
      { title: "Floor view", body: "Table status at a glance, with table transfer and merge for larger parties." },
      { title: "Guest profiles", body: "Allergies, birthdays and visit history help staff greet regulars properly." },
      { title: "Tips and split bills", body: "Tips are recorded at checkout and pooled by hours worked at payroll." },
    ],
    shots: ["reservations", "tables"],
  },
  {
    slug: "cafes-bakeries",
    name: "Cafés & bakeries",
    short: "Counter service, regulars and fresh stock.",
    icon: Cake,
    headline: "Know your regulars and your stock",
    intro:
      "Quick counter billing, loyalty that brings people back, and recipe costing that shows what each pastry really costs.",
    highlights: [
      { title: "Loyalty and referrals", body: "Points, memberships, gift vouchers and referral rewards redeemed at checkout." },
      { title: "Recipe costing", body: "Link items to ingredients; stock deducts automatically at checkout." },
      { title: "Batch and expiry", body: "Goods receipts track batch and expiry; waste is logged at the real batch cost." },
      { title: "Happy hour", body: "Time-based pricing and coupons for quiet afternoons." },
    ],
    shots: ["customers", "inventory"],
  },
  {
    slug: "cloud-kitchens",
    name: "Cloud kitchens",
    short: "Delivery-first kitchens and multiple brands.",
    icon: ChefHat,
    headline: "Run delivery from your own system",
    intro:
      "Define delivery zones, assign drivers and track every order from kitchen to door, with your own website connected through the API.",
    highlights: [
      { title: "Delivery zones", body: "Fee, minimum order and ETA by pincode." },
      { title: "Driver flow", body: "Assign drivers and move orders from pickup to delivered." },
      { title: "Kitchen stations", body: "KOTs route to the right station with priority and reprint." },
      { title: "Website ordering", body: "The integration API lets your own website take orders and reservations." },
    ],
    shots: ["kds", "reports"],
    honestNote: "Swiggy and Zomato order sync and live GPS tracking are on the roadmap, not available yet.",
  },
  {
    slug: "food-courts",
    name: "Food courts",
    short: "Self-service ordering and busy kitchens.",
    icon: Soup,
    headline: "Let guests order without waiting in line",
    intro:
      "Guests order from a kiosk or a QR code; tickets appear on the kitchen display and staff call the order when it is ready.",
    highlights: [
      { title: "Kiosk ordering", body: "A full-screen kiosk page for a touchscreen, with eat-in and take-away choices." },
      { title: "QR ordering", body: "Guests scan, browse the menu with modifiers and place the order from their phone." },
      { title: "Live kitchen display", body: "Ticket timers warn after 15 minutes so nothing is forgotten." },
      { title: "Three languages", body: "Guest pages in English, Spanish and French." },
    ],
    shots: ["guestQr", "kds"],
  },
  {
    slug: "multi-outlet",
    name: "Multi-outlet chains",
    short: "Several branches, one view of the business.",
    icon: Building2,
    headline: "See every branch from one place",
    intro:
      "Each branch keeps its own tax regime, UPI payee and staff, while owners compare sales, stock and margins across all of them.",
    highlights: [
      { title: "Branch switcher", body: "Move between branches without signing out." },
      { title: "Cross-branch overview", body: "Sales, open orders, low stock and inventory value by location." },
      { title: "Stock transfers", body: "Move stock between branches first-in-first-out, at the same cost." },
      { title: "Roles per person", body: "Give each manager only the permissions their branch needs." },
    ],
    shots: ["dashboard", "settings"],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
