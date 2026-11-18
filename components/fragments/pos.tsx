import { Clock, Minus, Plus, Search, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  CART,
  CART_LINES,
  DISCOUNT_PCT,
  GST_RATE,
  MENU_CATEGORIES,
  MENU_TILES,
  TABLES,
  TABLE_STATE_LABEL,
  rupees,
  type TableState,
} from "@/lib/sample-data";
import { AppScreen, Btn, Panel, STATE_STYLES, VegDot } from "./primitives";

/** (b) POS cart: 2× Paneer Tikka + Margherita with extra cheese, 10% off, GST split. */
export function PosCart({ className }: { className?: string }) {
  return (
    <Panel className={cn("flex flex-col p-[1.1em]", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[1.1em] font-semibold">Table T4 · Dine-in</span>
        <span className="text-[0.85em] text-fg-muted">{CART.items} items</span>
      </div>
      <ul className="mt-[0.9em] space-y-[0.75em]">
        {CART_LINES.map((l) => (
          <li key={l.name} className="flex items-start gap-[0.6em]">
            <span className="mt-[0.2em]">
              <VegDot veg={l.veg} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{l.name}</span>
              {l.modifier ? <span className="block text-[0.85em] text-fg-muted">+ {l.modifier}</span> : null}
            </span>
            <span className="flex items-center gap-[0.4em] rounded-full border border-line px-[0.4em] py-[0.1em]">
              <Minus className="size-[0.85em] text-fg-muted" />
              <span className="w-[1em] text-center text-[0.9em] font-semibold">{l.qty}</span>
              <Plus className="size-[0.85em] text-fg-muted" />
            </span>
            <span className="w-[4.2em] text-right font-semibold tabular-nums">{rupees(l.qty * l.unit)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-[1em] space-y-[0.35em] border-t border-dashed border-line pt-[0.8em] text-[0.92em] tabular-nums">
        <Row label="Subtotal" value={rupees(CART.subtotal)} />
        <Row label={`Discount (${DISCOUNT_PCT}%)`} value={`−${rupees(CART.discount)}`} accent />
        <Row label="Taxable value" value={rupees(CART.taxable)} />
        <Row label={`CGST ${GST_RATE / 2}%`} value={rupees(CART.cgst)} muted />
        <Row label={`SGST ${GST_RATE / 2}%`} value={rupees(CART.sgst)} muted />
      </dl>
      <div className="mt-[0.7em] flex items-baseline justify-between border-t border-line pt-[0.7em]">
        <span className="font-semibold">Total</span>
        <span className="text-[1.4em] font-semibold tabular-nums">{rupees(CART.total)}</span>
      </div>
      <div className="mt-[0.9em] grid grid-cols-2 gap-[0.6em]">
        <Btn tone="outline">Send KOT</Btn>
        <Btn>Pay {rupees(CART.total)}</Btn>
      </div>
    </Panel>
  );
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className={cn("flex justify-between", muted && "text-fg-muted", accent && "text-ok")}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

/** POS screen: category chips and dish tiles on the left, the cart on the right. */
export function PosScreen() {
  return (
    <AppScreen
      title="Point of Sale"
      active={1}
      actions={
        <span className="items-center gap-[0.4em] rounded-full border border-line px-[0.8em] py-[0.3em] text-[0.85em] text-fg-muted flex">
          <Search className="size-[1em]" /> Search dishes
        </span>
      }
    >
      <div className="grid h-full grid-cols-[1fr_19em] gap-[1em]">
        <div className="flex min-w-0 flex-col gap-[0.9em]">
          <div className="flex gap-[0.5em] overflow-hidden">
            {MENU_CATEGORIES.map((c, i) => (
              <span
                key={c}
                className={cn(
                  "shrink-0 rounded-full border px-[0.9em] py-[0.3em] text-[0.88em] font-medium",
                  i === 0 ? "border-brand bg-brand text-brand-fg" : "border-line bg-card text-fg-muted",
                )}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-[0.8em]">
            {MENU_TILES.map((d) => (
              <Panel key={d.name} className="flex min-h-[6.2em] flex-col justify-between p-[0.8em]">
                <VegDot veg={d.veg} />
                <span className="text-[0.95em] font-medium leading-tight">{d.name}</span>
                <span className="text-[0.95em] font-semibold tabular-nums">{rupees(d.price)}</span>
              </Panel>
            ))}
          </div>
        </div>
        <PosCart />
      </div>
    </AppScreen>
  );
}

const LEGEND: TableState[] = ["available", "occupied", "reserved"];

/** (a) Floor plan: tables coloured by state. */
export function FloorPlan({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col gap-[0.9em]">
      <div className="flex flex-wrap items-center justify-between gap-[0.6em]">
        <div className="flex gap-[0.5em]">
          {["Ground floor", "Terrace"].map((f, i) => (
            <span
              key={f}
              className={cn(
                "rounded-full border px-[0.9em] py-[0.3em] text-[0.88em] font-medium",
                i === 0 ? "border-fg bg-fg text-bg" : "border-line bg-card text-fg-muted",
              )}
            >
              {f}
            </span>
          ))}
        </div>
        <div className="flex gap-[0.9em] text-[0.85em] text-fg-muted">
          {LEGEND.map((s) => (
            <span key={s} className="flex items-center gap-[0.35em]">
              <span className={cn("size-[0.7em] rounded-full border", STATE_STYLES[s])} />
              {TABLE_STATE_LABEL[s]}
            </span>
          ))}
        </div>
      </div>
      <div className={cn("grid auto-rows-[7.4em] content-start gap-[0.8em]", compact ? "grid-cols-4" : "grid-cols-6")}>
        {(compact ? TABLES.slice(0, 8) : TABLES).map((t) => (
          <div
            key={t.name}
            className={cn(
              "flex flex-col items-center justify-center gap-[0.25em] rounded-[0.9em] border-2 p-[0.5em]",
              STATE_STYLES[t.state],
            )}
          >
            <span className="text-[1.3em] font-semibold">{t.name}</span>
            <span className="flex items-center gap-[0.25em] text-[0.82em] opacity-80">
              <Users className="size-[0.95em]" />
              {t.seats}
            </span>
            {t.note ? (
              <span className="flex items-center gap-[0.25em] text-[0.78em] opacity-80">
                {t.state === "occupied" ? <Clock className="size-[0.9em]" /> : null}
                {t.note}
              </span>
            ) : (
              <span className="text-[0.78em] opacity-70">{TABLE_STATE_LABEL[t.state]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TablesScreen() {
  return (
    <AppScreen title="Tables" active={2}>
      <FloorPlan />
    </AppScreen>
  );
}

/** Floor plan with the open table's cart beside it. */
export function FloorAndCartScreen() {
  return (
    <AppScreen title="Point of Sale" active={1}>
      <div className="grid h-full grid-cols-[1fr_19em] gap-[1em]">
        <FloorPlan compact />
        <PosCart />
      </div>
    </AppScreen>
  );
}
