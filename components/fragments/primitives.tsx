import type { ReactNode } from "react";
import {
  BookOpen,
  ChefHat,
  LayoutDashboard,
  LayoutGrid,
  Package,
  ReceiptText,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { RESTAURANT, type TableState } from "@/lib/sample-data";

/*
 * Building blocks for the UI illustrations. All sizes are in em so a whole
 * mock scales with the font size its container sets (see .ui-canvas).
 */

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-[0.9em] border border-line bg-card shadow-[0_0.2em_0.8em_-0.3em_rgb(0_0_0/0.12)]", className)}>
      {children}
    </div>
  );
}

export function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-[0.95em] shrink-0 items-center justify-center rounded-[0.15em] border",
        veg ? "border-ok" : "border-busy",
      )}
    >
      <span className={cn("size-[0.45em] rounded-full", veg ? "bg-ok" : "bg-busy")} />
    </span>
  );
}

export const STATE_STYLES: Record<TableState, string> = {
  available: "border-ok/40 bg-ok/10 text-ok",
  occupied: "border-busy/40 bg-busy/10 text-busy",
  reserved: "border-held/45 bg-held/10 text-held",
};

export function Btn({
  children,
  tone = "primary",
  className,
}: {
  children: ReactNode;
  tone?: "primary" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-[0.4em] rounded-[0.6em] px-[0.9em] py-[0.5em] font-semibold",
        tone === "primary" ? "bg-brand text-brand-fg" : "border border-line-strong text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}

const NAV = [LayoutDashboard, ShoppingCart, LayoutGrid, ChefHat, BookOpen, Package, Users, ReceiptText, Settings];

/** The product's app shell in miniature: icon rail, top bar, content area. */
export function AppScreen({
  title,
  active = 0,
  actions,
  children,
}: {
  title: string;
  active?: number;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full bg-bg-subtle text-fg">
      <div className="flex w-[3.4em] shrink-0 flex-col items-center gap-[0.9em] border-r border-line bg-card py-[0.9em]">
        <span className="flex size-[2em] items-center justify-center rounded-[0.5em] bg-brand text-[0.95em] font-bold text-brand-fg">
          N
        </span>
        {NAV.map((Icon, i) => (
          <span
            key={i}
            className={cn(
              "flex size-[2.1em] items-center justify-center rounded-[0.55em] text-fg-muted",
              i === active && "bg-brand/20 text-brand-text",
            )}
          >
            <Icon className="size-[1.15em]" strokeWidth={2} />
          </span>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-[1em] border-b border-line bg-card px-[1.2em] py-[0.75em]">
          <div className="flex min-w-0 items-baseline gap-[0.7em]">
            <span className="truncate text-[1.25em] font-semibold tracking-tight">{title}</span>
            <span className="truncate text-[0.85em] text-fg-muted">
              {RESTAURANT.name} · {RESTAURANT.branch}
            </span>
          </div>
          <div className="flex items-center gap-[0.6em]">
            {actions}
            <span className="flex size-[2em] items-center justify-center rounded-full bg-primary/15 text-[0.85em] font-semibold text-primary">
              AK
            </span>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden p-[1.1em]">{children}</div>
      </div>
    </div>
  );
}

/** A small table used by list-style screens. */
export function MiniTable({
  head,
  rows,
  align,
}: {
  head: string[];
  rows: ReactNode[][];
  align?: ("left" | "right")[];
}) {
  return (
    <Panel className="overflow-hidden">
      <table className="w-full border-collapse text-left text-[0.92em]">
        <thead>
          <tr className="border-b border-line bg-bg-subtle text-fg-muted">
            {head.map((h, i) => (
              <th
                key={h}
                className={cn("px-[1em] py-[0.65em] font-medium", align?.[i] === "right" && "text-right")}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-b border-line last:border-0">
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className={cn("px-[1em] py-[0.7em] tabular-nums", align?.[ci] === "right" && "text-right")}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-[0.7em] py-[0.2em] text-[0.82em] font-semibold", className)}>
      {children}
    </span>
  );
}
