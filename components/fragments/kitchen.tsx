import { Check, Timer } from "lucide-react";
import { cn } from "@/lib/cn";
import { TICKETS, type Ticket } from "@/lib/sample-data";
import { AppScreen, Btn, Chip, Panel } from "./primitives";

const STATUS: Record<Ticket["status"], { label: string; cls: string; action: string }> = {
  new: { label: "New", cls: "bg-held/15 text-held", action: "Accept" },
  preparing: { label: "Preparing", cls: "bg-busy/15 text-busy", action: "Mark ready" },
  ready: { label: "Ready", cls: "bg-ok/15 text-ok", action: "Served" },
};

/** (c) Kitchen order ticket: station, table, items, running timer and the next action. */
export function KotTicket({ ticket = TICKETS[0], className }: { ticket?: Ticket; className?: string }) {
  const s = STATUS[ticket.status];
  return (
    <Panel className={cn("flex flex-col overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-[0.6em] border-b border-line px-[1em] py-[0.7em]">
        <div className="min-w-0">
          <span className="block font-mono text-[0.8em] uppercase tracking-[0.12em] text-fg-muted">
            KOT #{ticket.kot} · {ticket.station}
          </span>
          <span className="block text-[1.15em] font-semibold">Table {ticket.table}</span>
        </div>
        <span
          className={cn(
            "flex items-center gap-[0.3em] rounded-full px-[0.6em] py-[0.25em] font-mono text-[0.85em] font-semibold tabular-nums",
            ticket.late ? "bg-busy/15 text-busy" : "bg-bg-subtle text-fg",
          )}
        >
          <Timer className="size-[1em]" />
          {ticket.elapsed}
        </span>
      </div>
      <ul className="flex-1 space-y-[0.5em] px-[1em] py-[0.8em]">
        {ticket.items.map((it) => (
          <li key={it.name}>
            <span className="font-medium">
              <span className="mr-[0.4em] font-semibold tabular-nums">{it.qty}×</span>
              {it.name}
            </span>
            {it.note ? <span className="block pl-[1.6em] text-[0.85em] text-busy">{it.note}</span> : null}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-[0.6em] border-t border-line px-[1em] py-[0.7em]">
        <Chip className={s.cls}>{s.label}</Chip>
        <Btn tone={ticket.status === "new" ? "primary" : "outline"} className="py-[0.4em]">
          {ticket.status === "new" ? <Check className="size-[1em]" /> : null}
          {s.action}
        </Btn>
      </div>
    </Panel>
  );
}

export function KdsScreen() {
  return (
    <AppScreen
      title="Kitchen display"
      active={3}
      actions={
        <span className="flex gap-[0.4em] text-[0.85em]">
          {["All stations", "Tandoor", "Pizza", "Bar"].map((st, i) => (
            <span
              key={st}
              className={cn(
                "rounded-full border px-[0.7em] py-[0.2em]",
                i === 0 ? "border-fg bg-fg text-bg" : "border-line text-fg-muted",
              )}
            >
              {st}
            </span>
          ))}
        </span>
      }
    >
      <div className="grid h-full grid-cols-3 items-start gap-[1em]">
        {TICKETS.map((t) => (
          <KotTicket key={t.kot} ticket={t} />
        ))}
      </div>
    </AppScreen>
  );
}
