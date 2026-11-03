import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Landmark,
  MonitorSmartphone,
  QrCode,
  Receipt,
  WifiOff,
} from "lucide-react";

export interface Badge {
  label: string;
  body: string;
  icon: LucideIcon;
}

export const TRUST_BADGES: Badge[] = [
  { label: "Offline on your LAN", body: "Billing, kitchen and printing keep going with the internet down.", icon: WifiOff },
  { label: "Your data, your server", body: "PostgreSQL on hardware you control. Nothing is sent to us.", icon: Database },
  { label: "UPI QR checkout", body: "A QR for the exact amount, with no gateway fee.", icon: QrCode },
  { label: "GST & VAT ready", body: "India GST, US sales tax, EU VAT and Spain IVA per branch.", icon: Landmark },
  { label: "Kitchen display", body: "Live tickets routed to the right station.", icon: MonitorSmartphone },
  { label: "Open source, AGPL-3.0", body: "Self-host, use and modify it.", icon: Code2 },
];

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: string;
}

/** Only numbers that can be checked against the product itself. */
export const STATS: Stat[] = [
  { value: 20, label: "product modules", source: "Module list in the product README" },
  { value: 18, label: "built-in reports", source: "Reports screen" },
  { value: 3, label: "languages", source: "English, Spanish and French" },
  { value: 0, prefix: "₹", label: "subscription", source: "Free to self-host under AGPL-3.0" },
  { value: 1, label: "command to install", source: "./install.sh" },
];

export interface WorksWith {
  label: string;
  soon?: boolean;
}

export const WORKS_WITH: WorksWith[] = [
  { label: "UPI QR" },
  { label: "GST invoicing" },
  { label: "ESC/POS thermal printers" },
  { label: "USB cash drawer" },
  { label: "Customer display" },
  { label: "Any browser or tablet" },
  { label: "Your SMTP email" },
  { label: "S3-compatible backups" },
  { label: "REST API & webhooks" },
  { label: "MCP for AI clients" },
  { label: "Docker" },
  { label: "Swiggy", soon: true },
  { label: "Zomato", soon: true },
  { label: "Payment gateways", soon: true },
];

export type Cell = "yes" | "no" | "partial" | string;

export interface ComparisonRow {
  label: string;
  nventra: Cell;
  subscription: Cell;
  paper: Cell;
}

export const COMPARISON: ComparisonRow[] = [
  { label: "Upfront software cost", nventra: "Free to self-host", subscription: "Often low", paper: "Almost none" },
  { label: "Ongoing fees", nventra: "Your hardware and power", subscription: "Monthly, often per terminal", paper: "Bill books" },
  { label: "Works with the internet down", nventra: "yes", subscription: "partial", paper: "yes" },
  { label: "Who holds the data", nventra: "You, on your server", subscription: "The vendor's cloud", paper: "You, on paper" },
  { label: "UPI QR and GST billing", nventra: "yes", subscription: "yes", paper: "no" },
  { label: "Kitchen display and tickets", nventra: "yes", subscription: "Often an add-on", paper: "Handwritten KOTs" },
  { label: "Inventory, payroll, accounting", nventra: "yes", subscription: "Often add-ons", paper: "no" },
  { label: "Who handles setup and updates", nventra: "You, or us on request", subscription: "The vendor", paper: "Nobody needed" },
  { label: "Delivery-app sync", nventra: "Coming soon", subscription: "Commonly included", paper: "no" },
  { label: "Phone support with an SLA", nventra: "no", subscription: "Usually", paper: "Not applicable" },
];

export interface Step {
  title: string;
  body: string;
  icon?: LucideIcon;
}

export const HOW_IT_WORKS: Step[] = [
  { title: "Install", body: "Run one command on an always-on machine in your restaurant." },
  { title: "Set up", body: "Create the restaurant, add tax, UPI id, staff, menu and tables." },
  { title: "Serve", body: "Take orders on any device; the kitchen sees them instantly." },
  { title: "Get paid", body: "Cash, card or UPI QR, then close the day with reports.", icon: Receipt },
];
