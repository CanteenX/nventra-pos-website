import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { CART, GST_ROWS, GST_TOTAL, RESTAURANT, rupees } from "@/lib/sample-data";
import { Panel } from "./primitives";

/**
 * A QR-looking pattern (finder squares + seeded noise). It is NOT a real or
 * scannable code: illustrations must never point at a real payee.
 */
function SampleQr({ className }: { className?: string }) {
  const n = 25;
  let seed = 7;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
  let d = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!inFinder(x, y) && rand() > 0.52) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  const finder = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z M${x + 2} ${y + 2}h3v3h-3z`;
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className={className} aria-hidden shapeRendering="crispEdges">
      <rect x={-1} y={-1} width={n + 2} height={n + 2} fill="white" />
      <path d={d} fill="#111" />
      <path d={`${finder(0, 0)} ${finder(n - 7, 0)} ${finder(0, n - 7)}`} fill="#111" fillRule="evenodd" />
    </svg>
  );
}

/** (d) UPI QR for the exact bill amount. `paid` shows the confirmed state. */
export function UpiCard({ paid = false, className }: { paid?: boolean; className?: string }) {
  if (paid) {
    return (
      <Panel className={cn("flex items-center gap-[0.8em] p-[0.9em]", className)}>
        <CheckCircle2 className="size-[2.2em] shrink-0 text-ok" />
        <div>
          <span className="block font-semibold">UPI payment received</span>
          <span className="block text-[0.88em] text-fg-muted tabular-nums">
            {rupees(CART.total)} · Table T4 · Bill closed
          </span>
        </div>
      </Panel>
    );
  }
  return (
    <Panel className={cn("flex flex-col items-center p-[1.1em] text-center", className)}>
      <span className="text-[0.85em] font-medium text-fg-muted">Scan to pay {RESTAURANT.name}</span>
      <span className="mt-[0.2em] text-[1.6em] font-semibold tabular-nums">{rupees(CART.total)}</span>
      <div className="mt-[0.7em] rounded-[0.6em] border border-line bg-white p-[0.5em]">
        <SampleQr className="size-[9em]" />
      </div>
      <span className="mt-[0.7em] text-[0.82em] text-fg-muted">Exact amount · any UPI app</span>
    </Panel>
  );
}

/** (e) GST summary by rate. */
export function GstSummary({ className, compact = false }: { className?: string; compact?: boolean }) {
  const cols = compact ? ["Rate", "Taxable", "CGST", "SGST"] : ["Rate", "Invoices", "Taxable", "CGST", "SGST", "Total"];
  return (
    <Panel className={cn("overflow-hidden", className)}>
      <div className="flex items-baseline justify-between border-b border-line px-[1em] py-[0.7em]">
        <span className="font-semibold">GST summary</span>
        <span className="text-[0.82em] text-fg-muted">1–31 Oct</span>
      </div>
      <table className="w-full border-collapse text-right text-[0.9em] tabular-nums">
        <thead>
          <tr className="text-fg-muted">
            {cols.map((c, i) => (
              <th key={c} className={cn("px-[0.9em] py-[0.5em] font-medium", i === 0 && "text-left")}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {GST_ROWS.map((r) => (
            <tr key={r.rate} className="border-t border-line">
              <td className="px-[0.9em] py-[0.55em] text-left font-semibold">{r.rate}%</td>
              {compact ? null : <td className="px-[0.9em]">{r.invoices}</td>}
              <td className="px-[0.9em]">{rupees(r.taxable)}</td>
              <td className="px-[0.9em]">{rupees(r.cgst)}</td>
              <td className="px-[0.9em]">{rupees(r.sgst)}</td>
              {compact ? null : <td className="px-[0.9em] font-medium">{rupees(r.total)}</td>}
            </tr>
          ))}
          {compact ? null : (
            <tr className="border-t border-line bg-bg-subtle font-semibold">
              <td className="px-[0.9em] py-[0.55em] text-left">Total</td>
              <td className="px-[0.9em]">{GST_TOTAL.invoices}</td>
              <td className="px-[0.9em]">{rupees(GST_TOTAL.taxable)}</td>
              <td className="px-[0.9em]">{rupees(GST_TOTAL.cgst)}</td>
              <td className="px-[0.9em]">{rupees(GST_TOTAL.sgst)}</td>
              <td className="px-[0.9em]">{rupees(GST_TOTAL.total)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Panel>
  );
}
