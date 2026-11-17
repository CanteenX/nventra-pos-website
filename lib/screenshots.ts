/**
 * Manifest of real product screenshots in /public/screenshots.
 *
 * Drop a PNG with the exact filename below into public/screenshots/ and the
 * site uses it on the next build; until then a labelled sample-data
 * illustration (or a placeholder) is shown instead. Viewports:
 *   desktop  1440 x 900  (browser frame)
 *   phone     390 x 844  (phone frame)
 * scripts/capture-screenshots.mjs writes the desktop files with these names.
 */
export type Device = "desktop" | "phone";

export const VIEWPORTS: Record<Device, { width: number; height: number }> = {
  desktop: { width: 1440, height: 900 },
  phone: { width: 390, height: 844 },
};

export type Shot = {
  /** Filename inside public/screenshots/. */
  file: string;
  src: string;
  alt: string;
  caption: string;
  device: Device;
  width: number;
  height: number;
};

function shot(file: string, alt: string, caption: string, device: Device = "desktop"): Shot {
  const { width, height } = VIEWPORTS[device];
  return { file, src: `/screenshots/${file}`, alt, caption, device, width, height };
}

export const SHOTS = {
  dashboard: shot(
    "dashboard.png",
    "Nventra POS dashboard showing today's revenue, orders, occupied tables, kitchen queue and a 14-day revenue chart",
    "Dashboard",
  ),
  dashboardDark: shot(
    "dashboard-dark.png",
    "Nventra POS dashboard in dark mode with revenue and order widgets",
    "Dashboard, dark mode",
  ),
  pos: shot(
    "pos.png",
    "Point of Sale screen with a dine-in table open, menu items on the left and a cart with several dishes on the right",
    "Point of Sale with an open cart",
  ),
  posDark: shot(
    "pos-dark.png",
    "Point of Sale screen in dark mode with a cart of dishes for a table",
    "Point of Sale, dark mode",
  ),
  kds: shot(
    "kds.png",
    "Kitchen display with order tickets arranged in columns, each with items and a running timer",
    "Kitchen display",
  ),
  onlineOrders: shot(
    "online-orders.png",
    "Online orders queue with delivery-platform and website orders waiting to be accepted or declined",
    "Online orders from every channel in one queue",
  ),
  emailTemplates: shot(
    "email-templates.png",
    "Settings email preview showing the scheduled-report subject and upper portion of the branded email",
    "Settings email preview",
  ),
  tables: shot(
    "tables.png",
    "Floor view listing tables by status with seat counts, plus a waitlist panel",
    "Tables and floor view",
  ),
  reservations: shot(
    "reservations.png",
    "Reservations list with guest names, party sizes, times and statuses",
    "Reservations",
  ),
  menu: shot(
    "menu.png",
    "Menu management screen with categories, dishes, prices and availability toggles",
    "Menu management",
  ),
  customers: shot(
    "customers.png",
    "Customer list with contact details, visit counts and loyalty points",
    "Customers and loyalty",
  ),
  inventory: shot(
    "inventory.png",
    "Inventory screen listing ingredients with stock levels, reorder levels and weighted-average cost",
    "Inventory",
  ),
  reports: shot(
    "reports.png",
    "Reports screen with a chosen report, date range, chart and export buttons",
    "Reports and exports",
  ),
  settings: shot(
    "settings.png",
    "Settings screen with restaurant details, branch, tax regime and UPI payee fields",
    "Settings",
  ),
  guestQr: shot(
    "guest-qr-phone.png",
    "Guest-facing QR table ordering page showing the menu as a customer sees it on their phone",
    "Guest QR ordering page",
    "phone",
  ),
} as const satisfies Record<string, Shot>;

export type ShotId = keyof typeof SHOTS;

export const GALLERY: ShotId[] = [
  "pos",
  "kds",
  "onlineOrders",
  "tables",
  "reservations",
  "menu",
  "customers",
  "inventory",
  "reports",
  "emailTemplates",
  "settings",
  "dashboardDark",
];
