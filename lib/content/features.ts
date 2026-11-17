import type { LucideIcon } from "lucide-react";
import {
  BadgeIndianRupee,
  Boxes,
  Calculator,
  ChefHat,
  Gauge,
  HeartHandshake,
  LayoutGrid,
  Plug,
  QrCode,
  ShieldCheck,
  Store,
  Truck,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";
import type { ShotId } from "@/lib/screenshots";

/**
 * Feature groups. Every bullet maps to something listed as built in the
 * product README / ROADMAP. Items still on the roadmap live in `soon`.
 */
export interface FeatureGroup {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  items: string[];
  soon?: string[];
  shot?: ShotId;
}

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "pos-billing",
    title: "POS & billing",
    summary: "Fast dine-in, takeaway and delivery billing with tax worked out on the server.",
    icon: BadgeIndianRupee,
    shot: "pos",
    items: [
      "Dine-in, takeaway and delivery orders with modifiers and combos",
      "UPI QR for the exact bill amount, at the till and on a customer display",
      "Cash, card and UPI; discounts, coupons, tips, gift cards and loyalty points",
      "India GST, US sales tax, EU VAT and Spain IVA, tax-inclusive or exclusive",
      "Bill merge, refunds and a split-bill calculator",
      "Printable receipts, plus direct ESC/POS thermal printing over USB or network",
    ],
    soon: ["Split tender across several payment methods", "Payment-gateway checkout"],
  },
  {
    id: "tables-reservations",
    title: "Tables & reservations",
    summary: "See the whole floor, seat walk-ins from the waitlist and keep bookings in one place.",
    icon: LayoutGrid,
    shot: "tables",
    items: [
      "Visual floor and table view by status",
      "Reservations and a waitlist",
      "Table transfer and table merge",
      "A printable QR code per table",
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen display (KDS)",
    summary: "Tickets reach the right station the moment an order is sent.",
    icon: ChefHat,
    shot: "kds",
    items: [
      "Live kitchen display with ticket timers that warn after 15 minutes",
      "KOTs routed to kitchen stations, with priority and reprint",
      "Accept, preparing and bump flow",
      "Kitchen performance reporting",
    ],
  },
  {
    id: "menu",
    title: "Menu management",
    summary: "Build the menu once; the POS, QR menu and kiosk all read from it.",
    icon: UtensilsCrossed,
    shot: "menu",
    items: [
      "Categories, items and photos",
      "Modifier groups for size, spice and add-ons",
      "Combo meals",
      "Seasonal menus and availability scheduling",
      "Bulk import of menu and ingredients from CSV",
    ],
  },
  {
    id: "inventory",
    title: "Inventory & procurement",
    summary: "Know what is in the store room and what each plate costs.",
    icon: Boxes,
    shot: "inventory",
    items: [
      "Ingredients with stock, reorder level and weighted-average cost",
      "Recipes that deduct stock automatically at checkout",
      "Suppliers, purchase orders and goods receipts with batch and expiry",
      "Waste logging drawn first-in-first-out at the real batch cost",
      "Vendor quotations, purchase requests, supplier invoices and payments",
      "Branch-to-branch stock transfers",
      "Purchase returns to suppliers",
      "Smart reorder suggestions from recent usage, supplier lead time and pack size",
    ],
  },
  {
    id: "crm",
    title: "CRM & loyalty",
    summary: "Remember regulars and give them a reason to come back.",
    icon: HeartHandshake,
    shot: "customers",
    items: [
      "Customer profiles with allergies, birthdays and visit history",
      "Loyalty points, memberships and gift vouchers",
      "Referral rewards redeemable at checkout",
      "Coupons, happy-hour pricing and email, SMS or WhatsApp campaigns with opt-out",
      "Guest feedback",
    ],
  },
  {
    id: "staff",
    title: "Staff, attendance & payroll",
    summary: "From clock-in to payslip without a separate HR tool.",
    icon: UsersRound,
    items: [
      "Staff accounts with granular roles and permissions",
      "Staff app in English, Hindi, Spanish and French",
      "Clock in and out, with manager corrections",
      "Weekly shift schedule with clash warnings",
      "Leave requests and approvals",
      "Payroll from clocked hours, less approved unpaid leave",
      "Tip pool split by hours worked, and sales per staff member",
    ],
  },
  {
    id: "accounting",
    title: "Accounting",
    summary: "A management view of the money, close to where it is earned.",
    icon: Calculator,
    items: [
      "Expenses, including 'paid from till'",
      "Nightly cash close with expected cash and variance",
      "Profit & loss and a management balance sheet",
      "Monthly budgets against actual spend",
      "Bank statement CSV import and matching",
      "Tax summary by rate",
      "Petty cash payouts and top-ups with a running balance",
      "Expense approvals: spends above your threshold wait for a manager",
    ],
    soon: ["Accounting-software connectors"],
  },
  {
    id: "delivery",
    title: "Delivery",
    summary: "Run your own delivery without a third-party dashboard.",
    icon: Truck,
    items: [
      "Delivery zones by pincode with fee, minimum order and ETA",
      "Driver assignment and a pickup-to-delivered status flow",
      "Delivery quotes through the integration API",
    ],
    soon: ["Live GPS driver tracking"],
  },
  {
    id: "online-channels",
    title: "Online channels",
    summary: "Delivery-platform orders land in the same queue as everything else.",
    icon: Store,
    shot: "onlineOrders",
    items: [
      "Orders from Zomato, Swiggy or your channel manager arrive through a signed connection",
      "Accept or decline in the POS; accepted orders go straight to the kitchen",
      "Status sent back to a channel-manager partner: accepted, ready, dispatched, delivered",
      "Mark a dish sold out once and it is pushed to the connected platforms",
      "Prices and tax are recalculated from your own menu, never taken from the platform",
    ],
  },
  {
    id: "online-ordering",
    title: "QR & online ordering",
    summary: "Let guests order from their phone or a self-service kiosk.",
    icon: QrCode,
    shot: "guestQr",
    items: [
      "QR table ordering with modifiers",
      "Call waiter and request bill from the table",
      "Click and collect, and scheduled orders",
      "Self-service kiosk page for a touchscreen",
      "Guest pages in English, Spanish and French",
    ],
  },
  {
    id: "reports",
    title: "Reports & exports",
    summary: "Answers about sales, food cost and staff, ready to share.",
    icon: Gauge,
    shot: "reports",
    items: [
      "Live dashboard",
      "18 reports, including peak hours, food cost and margins, and retention",
      "Print, or export to Excel, PDF and CSV",
      "Scheduled report emails, daily, weekly or monthly, through your own SMTP",
      "Cross-branch overview for multi-outlet owners",
      "Multi-branch sync: each branch keeps selling offline and catches up with head office when the link returns",
    ],
  },
  {
    id: "security",
    title: "Security & backups",
    summary: "Every action gated by a permission, every change on record.",
    icon: ShieldCheck,
    shot: "settings",
    items: [
      "Role-based access control with individually toggleable permissions",
      "Permission ceiling: staff can't give themselves, or anyone else, more access than they have",
      "Webhooks and partner calls can't be pointed at your internal network",
      "Two-factor sign-in with recovery codes",
      "PIN quick-switch login for shared tills",
      "Audit log of who did what, and when",
      "Scheduled backups and restore from the app, including S3-compatible storage",
      "Session expiry",
    ],
  },
  {
    id: "integrations",
    title: "Integrations, API & email",
    summary: "Connect your website, tools and AI assistants to your own data, and send email in your own colours.",
    icon: Plug,
    shot: "emailTemplates",
    items: [
      "REST API with Swagger docs",
      "GraphQL API for integrations: read the menu, orders and customers, place orders, mark dishes sold out",
      "API keys and signed webhooks",
      "Integration API for a restaurant website's backend: menu, orders, reservations",
      "MCP server so AI clients can work with your data",
      "Customer-facing second screen and USB cash drawer",
      "SMTP email for receipts, reports and alerts",
      "Email template editor with live preview in Settings",
      "Branded HTML emails with your logo, colour and wording; preview and send yourself a test",
    ],
    soon: ["Weighing-scale and label printers"],
  },
];
