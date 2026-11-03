/**
 * Manifest of real product screenshots in /public/screenshots, produced by
 * scripts/capture-screenshots.mjs (1440x900, WebP). Keep ids in sync with
 * the SHOTS list in that script.
 */
export type Shot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

const W = 1440;
const H = 900;

function shot(id: string, alt: string, caption: string): Shot {
  return { src: `/screenshots/${id}.webp`, alt, caption, width: W, height: H };
}

export const SHOTS = {
  dashboard: shot(
    "dashboard-light",
    "Nventra POS dashboard showing today's revenue, orders, occupied tables, kitchen queue and a 14-day revenue chart",
    "Dashboard",
  ),
  dashboardDark: shot(
    "dashboard-dark",
    "Nventra POS dashboard in dark mode with revenue and order widgets",
    "Dashboard, dark mode",
  ),
  pos: shot(
    "pos-cart-light",
    "Point of Sale screen with a dine-in table open, menu items on the left and a cart with several dishes on the right",
    "Point of Sale with an open cart",
  ),
  posDark: shot(
    "pos-cart-dark",
    "Point of Sale screen in dark mode with a cart of dishes for a table",
    "Point of Sale, dark mode",
  ),
  kds: shot(
    "kds-light",
    "Kitchen display with order tickets arranged in columns, each with items and a running timer",
    "Kitchen display",
  ),
  tables: shot(
    "tables-light",
    "Floor view listing tables by status with seat counts, plus a waitlist panel",
    "Tables and floor view",
  ),
  reservations: shot(
    "reservations-light",
    "Reservations list with guest names, party sizes, times and statuses",
    "Reservations",
  ),
  menu: shot(
    "menu-light",
    "Menu management screen with categories, dishes, prices and availability toggles",
    "Menu management",
  ),
  customers: shot(
    "customers-light",
    "Customer list with contact details, visit counts and loyalty points",
    "Customers and loyalty",
  ),
  inventory: shot(
    "inventory-light",
    "Inventory screen listing ingredients with stock levels, reorder levels and weighted-average cost",
    "Inventory",
  ),
  reports: shot(
    "reports-light",
    "Reports screen with a chosen report, date range, chart and export buttons",
    "Reports and exports",
  ),
  settings: shot(
    "settings-light",
    "Settings screen with restaurant details, branch, tax regime and UPI payee fields",
    "Settings",
  ),
  guestQr: shot(
    "guest-qr-light",
    "Guest-facing QR table ordering page showing the menu as a customer sees it on their phone",
    "Guest QR ordering page",
  ),
} as const satisfies Record<string, Shot>;

export type ShotId = keyof typeof SHOTS;

export const GALLERY: ShotId[] = [
  "pos",
  "kds",
  "tables",
  "reservations",
  "menu",
  "customers",
  "inventory",
  "reports",
  "settings",
  "dashboardDark",
];
