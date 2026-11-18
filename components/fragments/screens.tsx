import { Download, Plus, Printer, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  CUSTOMERS,
  KPIS,
  MENU_ROWS,
  RESERVATIONS,
  RESTAURANT,
  REVENUE_14D,
  STOCK,
  TICKETS,
  rupees,
} from "@/lib/sample-data";
import { GstSummary } from "./payments";
import { AppScreen, Btn, Chip, MiniTable, Panel, VegDot } from "./primitives";

/** Revenue line for the last 14 days, as an inline SVG. */
export function Sparkline({ className }: { className?: string }) {
  const w = 280;
  const h = 80;
  const max = Math.max(...REVENUE_14D);
  const min = Math.min(...REVENUE_14D) - 6;
  const pts = REVENUE_14D.map((v, i) => [
    (i / (REVENUE_14D.length - 1)) * w,
    h - ((v - min) / (max - min)) * (h - 8) - 4,
  ]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--ok)" stopOpacity="0.3" />
          <stop offset="1" stopColor="var(--ok)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w} ${h} L0 ${h}Z`} fill="url(#spark-fill)" />
      <path d={line} fill="none" stroke="var(--ok)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      <circle cx={lx} cy={ly} r="4" fill="var(--ok)" />
    </svg>
  );
}

/** (f) KPI tiles. */
export function KpiTiles({ className, count = 4 }: { className?: string; count?: number }) {
  return (
    <div className={cn("grid grid-cols-4 gap-[0.8em]", className)}>
      {KPIS.slice(0, count).map((k) => (
        <Panel key={k.label} className="p-[0.9em]">
          <span className="block text-[0.85em] text-fg-muted">{k.label}</span>
          <span className="mt-[0.2em] block text-[1.5em] font-semibold tracking-tight tabular-nums">{k.value}</span>
          <span className="block text-[0.8em] font-medium text-ok">{k.delta}</span>
        </Panel>
      ))}
    </div>
  );
}

export function RevenueCard({ className }: { className?: string }) {
  return (
    <Panel className={cn("flex flex-col p-[1em]", className)}>
      <div className="flex items-baseline justify-between">
        <span className="font-semibold">Revenue, last 14 days</span>
        <span className="text-[0.85em] text-fg-muted">₹ thousands</span>
      </div>
      <Sparkline className="mt-[0.6em] h-[7em] w-full flex-1" />
    </Panel>
  );
}

export function DashboardScreen() {
  return (
    <AppScreen title="Dashboard" active={0}>
      <div className="flex h-full flex-col gap-[1em]">
        <KpiTiles />
        <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-[1em]">
          <RevenueCard />
          <Panel className="p-[1em]">
            <span className="font-semibold">Kitchen queue</span>
            <ul className="mt-[0.7em] space-y-[0.55em] text-[0.9em]">
              {TICKETS.map((t) => (
                <li key={t.kot} className="flex justify-between gap-[0.5em]">
                  <span className="truncate">
                    #{t.kot} · {t.table} · {t.station}
                  </span>
                  <span className="font-mono tabular-nums text-fg-muted">{t.elapsed}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppScreen>
  );
}

const RES_TONE: Record<string, string> = {
  Confirmed: "bg-ok/15 text-ok",
  Pending: "bg-held/15 text-held",
  Waitlist: "bg-busy/15 text-busy",
};

export function ReservationsScreen() {
  return (
    <AppScreen title="Reservations" active={2} actions={<Btn className="py-[0.35em]"><Plus className="size-[1em]" />New</Btn>}>
      <MiniTable
        head={["Guest", "Party", "Time", "Table", "Status"]}
        rows={RESERVATIONS.map((r) => [
          <span key="n" className="font-medium">{r.name}</span>,
          `${r.guests} guests`,
          r.time,
          r.table,
          <Chip key="s" className={RES_TONE[r.status]}>{r.status}</Chip>,
        ])}
      />
    </AppScreen>
  );
}

export function MenuScreen() {
  return (
    <AppScreen title="Menu" active={4} actions={<Btn className="py-[0.35em]"><Plus className="size-[1em]" />Add dish</Btn>}>
      <MiniTable
        head={["Dish", "Category", "Price", "Available"]}
        align={["left", "left", "right", "right"]}
        rows={MENU_ROWS.map((m) => [
          <span key="n" className="flex items-center gap-[0.5em] font-medium"><VegDot veg={m.veg} />{m.name}</span>,
          <span key="c" className="text-fg-muted">{m.cat}</span>,
          rupees(m.price),
          <span key="t" className={cn("ml-auto flex h-[1.2em] w-[2.2em] items-center rounded-full p-[0.15em]", m.on ? "justify-end bg-ok" : "bg-line-strong")}>
            <span className="size-[0.9em] rounded-full bg-white" />
          </span>,
        ])}
      />
    </AppScreen>
  );
}

export function CustomersScreen() {
  return (
    <AppScreen title="Customers" active={6} actions={<span className="flex items-center gap-[0.4em] rounded-full border border-line px-[0.8em] py-[0.3em] text-[0.85em] text-fg-muted"><Search className="size-[1em]" />Name or phone</span>}>
      <MiniTable
        head={["Customer", "Phone", "Visits", "Points"]}
        align={["left", "left", "right", "right"]}
        rows={CUSTOMERS.map((c) => [
          <span key="n" className="font-medium">{c.name}</span>,
          <span key="p" className="text-fg-muted">{c.phone}</span>,
          c.visits,
          c.points.toLocaleString("en-IN"),
        ])}
      />
    </AppScreen>
  );
}

export function InventoryScreen() {
  return (
    <AppScreen title="Inventory" active={5} actions={<Btn tone="outline" className="py-[0.35em]">Purchase order</Btn>}>
      <MiniTable
        head={["Ingredient", "In stock", "Reorder at", "Avg cost"]}
        align={["left", "right", "right", "right"]}
        rows={STOCK.map((s) => [
          <span key="n" className="flex items-center gap-[0.5em] font-medium">
            {s.item}
            {s.low ? <Chip className="bg-busy/15 text-busy">Low</Chip> : null}
          </span>,
          s.qty,
          <span key="r" className="text-fg-muted">{s.reorder}</span>,
          s.cost,
        ])}
      />
    </AppScreen>
  );
}

export function ReportsScreen() {
  return (
    <AppScreen
      title="Reports"
      active={7}
      actions={
        <>
          <Btn tone="outline" className="py-[0.35em]"><Printer className="size-[1em]" />Print</Btn>
          <Btn tone="outline" className="py-[0.35em]"><Download className="size-[1em]" />Export</Btn>
        </>
      }
    >
      <div className="grid h-full grid-cols-[1fr_1.35fr] items-start gap-[1em]">
        <RevenueCard className="h-full" />
        <GstSummary compact />
      </div>
    </AppScreen>
  );
}

export function SettingsScreen() {
  const fields = [
    ["Restaurant name", RESTAURANT.name],
    ["GSTIN", "29ABCDE1234F1Z5 (sample)"],
    ["Tax regime", "India GST · 5% (CGST + SGST)"],
    ["UPI payee id", "your-upi-id@bank"],
    ["Currency", "INR (₹)"],
  ];
  return (
    <AppScreen title="Settings" active={8}>
      <Panel className="max-w-[40em] p-[1.1em]">
        <span className="font-semibold">Restaurant</span>
        <div className="mt-[0.8em] grid grid-cols-2 gap-[0.8em]">
          {fields.map(([label, value]) => (
            <label key={label} className="block">
              <span className="block text-[0.82em] text-fg-muted">{label}</span>
              <span className="mt-[0.25em] block truncate rounded-[0.5em] border border-line bg-bg px-[0.7em] py-[0.45em]">
                {value}
              </span>
            </label>
          ))}
        </div>
        <Btn className="mt-[1em]">Save changes</Btn>
      </Panel>
    </AppScreen>
  );
}

/** (g) Guest QR ordering on a phone: the menu a guest sees after scanning the table code. */
export function GuestQrScreen() {
  const items = [
    { name: "Paneer Tikka", price: 280, veg: true, qty: 2 },
    { name: "Hara Bhara Kebab", price: 240, veg: true, qty: 0 },
    { name: "Chicken 65", price: 320, veg: false, qty: 0 },
    { name: "Veg Manchurian", price: 260, veg: true, qty: 0 },
  ];
  return (
    <div className="flex h-full flex-col bg-bg text-fg">
      <div className="bg-brand px-[1.1em] pb-[1em] pt-[1.6em] text-brand-fg">
        <span className="block text-[0.8em] font-medium opacity-70">Table T7 · Ordering</span>
        <span className="block text-[1.35em] font-semibold tracking-tight">{RESTAURANT.name}</span>
      </div>
      <div className="flex gap-[0.4em] overflow-hidden px-[1em] py-[0.8em]">
        {["Starters", "Mains", "Breads", "Drinks"].map((c, i) => (
          <span
            key={c}
            className={cn(
              "shrink-0 rounded-full border px-[0.75em] py-[0.25em] text-[0.82em] font-medium",
              i === 0 ? "border-fg bg-fg text-bg" : "border-line text-fg-muted",
            )}
          >
            {c}
          </span>
        ))}
      </div>
      <ul className="flex-1 space-y-[0.6em] px-[1em]">
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-[0.6em] rounded-[0.8em] border border-line bg-card p-[0.7em]">
            <VegDot veg={it.veg} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.95em] font-medium">{it.name}</span>
              <span className="block text-[0.85em] text-fg-muted tabular-nums">{rupees(it.price)}</span>
            </span>
            {it.qty ? (
              <span className="rounded-[0.5em] bg-brand px-[0.6em] py-[0.2em] text-[0.85em] font-semibold text-brand-fg">
                − {it.qty} +
              </span>
            ) : (
              <span className="rounded-[0.5em] border border-brand-text px-[0.7em] py-[0.2em] text-[0.85em] font-semibold text-brand-text">
                Add
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="m-[0.9em] flex items-center justify-between rounded-[0.8em] bg-fg px-[0.9em] py-[0.7em] text-bg">
        <span className="flex items-center gap-[0.4em] text-[0.9em] font-semibold">
          <ShoppingBag className="size-[1.1em]" />2 items · {rupees(560)}
        </span>
        <span className="text-[0.9em] font-semibold">Place order →</span>
      </div>
    </div>
  );
}
