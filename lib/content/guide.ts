import type { ShotId } from "@/lib/screenshots";

/** The /how-to-use walkthrough, condensed from the product tutorial. */
export interface GuideStep {
  id: string;
  title: string;
  intro: string;
  tasks: string[];
  shots: [ShotId, ShotId];
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    id: "create-restaurant",
    title: "Create your restaurant",
    intro: "The first visit to the app opens sign-up, which creates your restaurant and the owner account.",
    tasks: [
      "Open http://<server IP>:1995 from any device on your network",
      "Choose Sign up and enter the restaurant and first branch name, your name, email and a password",
      "Sign in; you land on the dashboard with today's revenue, orders and kitchen queue",
      "Switch between light and dark mode whenever you like",
    ],
    shots: ["dashboard", "dashboardDark"],
  },
  {
    id: "branch-tax-upi-staff",
    title: "Set up branch, tax, UPI and staff",
    intro: "Open Settings once and fill in the basics. Everything else reads from here.",
    tasks: [
      "Restaurant: name, currency, timezone, logo, UPI id and payee name",
      "Branch: address, phone, GSTIN and tax regime (India GST, US sales tax, EU VAT or Spain IVA)",
      "Decide whether menu prices include tax",
      "Staff and Roles: one account per person, each with only the permissions they need",
      "Turn on two-factor sign-in for owner and manager accounts",
    ],
    shots: ["settings", "customers"],
  },
  {
    id: "menu-floor",
    title: "Add your menu and floor",
    intro: "Build the menu and the floor plan the POS, QR menu and kiosk will all use.",
    tasks: [
      "Create categories and dishes, with photos and prices",
      "Add modifier groups for size, spice and add-ons, and build combos",
      "Add floors and tables, then print a QR code for each table",
      "Optionally add ingredients and recipes to track stock and food cost",
      "Or bulk-import the menu and ingredients from CSV",
    ],
    shots: ["menu", "tables"],
  },
  {
    id: "take-order",
    title: "Take an order",
    intro: "Point of Sale handles dine-in, takeaway and delivery from the same screen.",
    tasks: [
      "Pick a table, or choose Takeaway or Delivery",
      "Tap dishes; items with options open a picker",
      "Check the cart, then Send to kitchen to print or display a KOT",
      "Tap Back to serve another table and settle this bill later",
    ],
    shots: ["pos", "posDark"],
  },
  {
    id: "kitchen-payment",
    title: "Cook it, then get paid",
    intro: "Tickets appear on the kitchen display in real time; the till takes payment when the guest is ready.",
    tasks: [
      "Open Kitchen Display on a screen in the kitchen; accept, prepare and bump tickets",
      "Use priority and reprint for rush orders and lost tickets",
      "At checkout apply discounts, coupons, loyalty points, gift cards or tips",
      "Choose UPI to show a QR for the exact amount on the till and the customer display",
      "Check your UPI app or soundbox for the credit, then complete the payment",
    ],
    shots: ["kds", "guestQr"],
  },
  {
    id: "stock-reports-backups",
    title: "Stock, reports and backups",
    intro: "Close the day knowing what sold, what it cost and that your data is safe.",
    tasks: [
      "Receive purchase orders with batch and expiry; log waste",
      "Count the drawer in Accounting → Cash close and review the variance",
      "Open Reports for sales, peak hours, food cost and more; export to Excel, PDF or CSV",
      "Schedule a daily report email through your SMTP server",
      "Schedule backups in Settings → Backup, and test a restore",
    ],
    shots: ["inventory", "reports"],
  },
];

export const MORE_TOOLS: { title: string; body: string }[] = [
  { title: "Attendance", body: "Staff clock in and out; managers correct missed punches." },
  { title: "Team & payroll", body: "Shifts with clash warnings, leave, payroll from clocked hours and tip pools." },
  { title: "Accounting", body: "Expenses, profit & loss, budgets, bank import and a tax summary." },
  { title: "Marketing", body: "Coupons, happy-hour pricing and email campaigns." },
  { title: "Delivery", body: "Zones by pincode, drivers and delivery status." },
  { title: "Operations", body: "SOPs, contracts and recipes with attachments, plus equipment maintenance." },
  { title: "Customer display", body: "A second screen that follows the till and shows the UPI QR." },
  { title: "Kiosk", body: "A self-service ordering page for a touchscreen." },
  { title: "Audit log", body: "Who did what, and when." },
  { title: "API keys & webhooks", body: "Connect your website and other systems." },
  { title: "Updates", body: "Check for and apply a new version from Settings." },
  { title: "Languages", body: "English, Spanish and French on guest pages and the staff sidebar." },
];
