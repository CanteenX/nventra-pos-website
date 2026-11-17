import { Check, Minus, X } from "lucide-react";
import { COMPARISON, type Cell } from "@/lib/content/home";

function CellValue({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="inline-flex items-center gap-1.5">
        <Check className="size-4 text-brand-text" aria-hidden />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex items-center gap-1.5 text-fg-muted">
        <X className="size-4" aria-hidden />
        <span className="sr-only">No</span>
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex items-center gap-1.5 text-fg-muted">
        <Minus className="size-4" aria-hidden />
        <span>Depends on the product</span>
      </span>
    );
  return <span>{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="relative overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Nventra POS compared with a typical subscription POS and with pen and paper
        </caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="w-[30%] px-5 py-4 font-medium text-fg-muted">
              &nbsp;
            </th>
            <th scope="col" className="bg-bg-subtle px-5 py-4 font-semibold">
              Nventra POS
            </th>
            <th scope="col" className="px-5 py-4 font-semibold">
              Typical subscription POS
            </th>
            <th scope="col" className="px-5 py-4 font-semibold">
              Pen &amp; paper
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.label} className="border-b border-line last:border-0">
              <th scope="row" className="px-5 py-3.5 font-medium">
                {row.label}
              </th>
              <td className="bg-bg-subtle px-5 py-3.5">
                <CellValue value={row.nventra} />
              </td>
              <td className="px-5 py-3.5">
                <CellValue value={row.subscription} />
              </td>
              <td className="px-5 py-3.5">
                <CellValue value={row.paper} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
