/**
 * Sample data for the UI illustrations. Every figure here is made up and every
 * illustration that uses it is labelled "Sample data". Totals are computed,
 * not typed, so the cart, UPI card and GST split always agree.
 */

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const inr2 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** ₹1,040 for whole rupees, ₹982.80 when there are paise. */
export function rupees(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? inr.format(rounded) : inr2.format(rounded);
}

const round2 = (n: number): number => Math.round(n * 100) / 100;

export const RESTAURANT = { name: "Spice Route", branch: "Indiranagar" } as const;

// ---- POS cart -------------------------------------------------------------

export interface CartLine {
  name: string;
  modifier?: string;
  qty: number;
  unit: number;
  veg: boolean;
}

export const CART_LINES: readonly CartLine[] = [
  { name: "Paneer Tikka", qty: 2, unit: 280, veg: true },
  { name: "Margherita Pizza", modifier: "Extra cheese", qty: 1, unit: 480, veg: true },
];

export const DISCOUNT_PCT = 10;
export const GST_RATE = 5;

function cartTotals(lines: readonly CartLine[]) {
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.unit, 0);
  const discount = round2((subtotal * DISCOUNT_PCT) / 100);
  const taxable = round2(subtotal - discount);
  const cgst = round2((taxable * GST_RATE) / 2 / 100);
  const sgst = cgst;
  const total = round2(taxable + cgst + sgst);
  return { subtotal, discount, taxable, cgst, sgst, total, items: lines.reduce((n, l) => n + l.qty, 0) };
}

/** subtotal 1040, discount 104, taxable 936, CGST 23.40, SGST 23.40, total 982.80 */
export const CART = cartTotals(CART_LINES);

export const MENU_TILES = [
  { name: "Paneer Tikka", price: 280, veg: true },
  { name: "Hara Bhara Kebab", price: 240, veg: true },
  { name: "Chicken 65", price: 320, veg: false },
  { name: "Margherita Pizza", price: 420, veg: true },
  { name: "Dal Makhani", price: 260, veg: true },
  { name: "Butter Chicken", price: 360, veg: false },
  { name: "Butter Naan", price: 60, veg: true },
  { name: "Masala Chai", price: 50, veg: true },
] as const;

export const MENU_CATEGORIES = ["All", "Starters", "Mains", "Pizza", "Breads", "Drinks"] as const;

// ---- Floor plan -------------------------------------------------------------

export type TableState = "available" | "occupied" | "reserved";

export interface SampleTable {
  name: string;
  seats: number;
  state: TableState;
  note?: string;
}

export const TABLES: readonly SampleTable[] = [
  { name: "T1", seats: 2, state: "available" },
  { name: "T2", seats: 4, state: "occupied", note: "32 min" },
  { name: "T3", seats: 4, state: "available" },
  { name: "T4", seats: 6, state: "occupied", note: "12 min" },
  { name: "T5", seats: 2, state: "reserved", note: "8:00 pm" },
  { name: "T6", seats: 4, state: "available" },
  { name: "T7", seats: 4, state: "occupied", note: "5 min" },
  { name: "T8", seats: 8, state: "reserved", note: "8:30 pm" },
  { name: "T9", seats: 2, state: "available" },
  { name: "T10", seats: 4, state: "occupied", note: "47 min" },
  { name: "T11", seats: 4, state: "available" },
  { name: "T12", seats: 6, state: "available" },
];

export const TABLE_STATE_LABEL: Record<TableState, string> = {
  available: "Available",
  occupied: "Occupied",
  reserved: "Reserved",
};

// ---- Kitchen ----------------------------------------------------------------

export interface Ticket {
  kot: number;
  table: string;
  station: string;
  elapsed: string;
  late?: boolean;
  items: { qty: number; name: string; note?: string }[];
  status: "new" | "preparing" | "ready";
}

export const TICKETS: readonly Ticket[] = [
  {
    kot: 1042,
    table: "T4",
    station: "Tandoor",
    elapsed: "04:12",
    status: "new",
    items: [
      { qty: 2, name: "Paneer Tikka" },
      { qty: 4, name: "Butter Naan", note: "1 without butter" },
    ],
  },
  {
    kot: 1041,
    table: "T7",
    station: "Pizza",
    elapsed: "09:40",
    status: "preparing",
    items: [{ qty: 1, name: "Margherita Pizza", note: "Extra cheese" }],
  },
  {
    kot: 1039,
    table: "T2",
    station: "Bar",
    elapsed: "16:05",
    late: true,
    status: "ready",
    items: [
      { qty: 2, name: "Masala Chai" },
      { qty: 1, name: "Fresh Lime Soda" },
    ],
  },
];

// ---- GST summary ------------------------------------------------------------

export const GST_ROWS = [
  { rate: 5, invoices: 412, taxable: 148_620 },
  { rate: 18, invoices: 37, taxable: 12_450 },
].map((r) => {
  const half = round2((r.taxable * r.rate) / 2 / 100);
  return { ...r, cgst: half, sgst: half, total: round2(r.taxable + half * 2) };
});

export const GST_TOTAL = GST_ROWS.reduce(
  (t, r) => ({
    invoices: t.invoices + r.invoices,
    taxable: t.taxable + r.taxable,
    cgst: round2(t.cgst + r.cgst),
    sgst: round2(t.sgst + r.sgst),
    total: round2(t.total + r.total),
  }),
  { invoices: 0, taxable: 0, cgst: 0, sgst: 0, total: 0 },
);

// ---- Dashboard --------------------------------------------------------------

export const KPIS = [
  { label: "Revenue today", value: rupees(52_070), delta: "+8% vs last Tue" },
  { label: "Orders", value: "131", delta: "+12" },
  { label: "Average order", value: rupees(397), delta: "−₹6" },
  { label: "Tables occupied", value: "9 / 14", delta: "64%" },
] as const;

/** Daily revenue, last 14 days (₹ thousands). */
export const REVENUE_14D = [38, 41, 36, 44, 52, 61, 58, 40, 43, 39, 47, 55, 64, 52] as const;

// ---- Lists ------------------------------------------------------------------

export const RESERVATIONS = [
  { name: "Ananya R.", guests: 4, time: "7:30 pm", table: "T6", status: "Confirmed" },
  { name: "Vikram S.", guests: 2, time: "8:00 pm", table: "T5", status: "Confirmed" },
  { name: "Meera & family", guests: 8, time: "8:30 pm", table: "T8", status: "Pending" },
  { name: "Rahul K.", guests: 3, time: "9:15 pm", table: "—", status: "Waitlist" },
] as const;

export const MENU_ROWS = [
  { name: "Paneer Tikka", cat: "Starters", price: 280, on: true, veg: true },
  { name: "Chicken 65", cat: "Starters", price: 320, on: true, veg: false },
  { name: "Margherita Pizza", cat: "Pizza", price: 420, on: true, veg: true },
  { name: "Dal Makhani", cat: "Mains", price: 260, on: true, veg: true },
  { name: "Mutton Rogan Josh", cat: "Mains", price: 420, on: false, veg: false },
] as const;

export const CUSTOMERS = [
  { name: "Priya N.", phone: "98••• ••210", visits: 23, points: 1_150 },
  { name: "Arjun M.", phone: "99••• ••784", visits: 11, points: 540 },
  { name: "Sneha P.", phone: "90••• ••031", visits: 7, points: 310 },
  { name: "Kabir D.", phone: "97••• ••562", visits: 4, points: 120 },
] as const;

export const STOCK = [
  { item: "Paneer", qty: "4.2 kg", reorder: "5 kg", cost: rupees(360) + "/kg", low: true },
  { item: "Mozzarella", qty: "1.8 kg", reorder: "3 kg", cost: rupees(520) + "/kg", low: true },
  { item: "Basmati rice", qty: "25 kg", reorder: "10 kg", cost: rupees(110) + "/kg", low: false },
  { item: "Tomatoes", qty: "12 kg", reorder: "6 kg", cost: rupees(38) + "/kg", low: false },
  { item: "Cooking oil", qty: "8 L", reorder: "5 L", cost: rupees(150) + "/L", low: false },
] as const;
