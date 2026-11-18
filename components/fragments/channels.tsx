import { Bike, Globe, QrCode, Store } from "lucide-react";
import { cn } from "@/lib/cn";
import { RESTAURANT, rupees } from "@/lib/sample-data";
import { AppScreen, Btn, Chip, Panel } from "./primitives";

/*
 * Illustrations for v1.0 screens, drawn with clearly sample data.
 * Channel names are generic ("Delivery app A") so no partner is implied.
 */

type Channel = "delivery-a" | "delivery-b" | "website" | "qr";

const CHANNEL: Record<Channel, { label: string; icon: typeof Bike; cls: string }> = {
  "delivery-a": { label: "Delivery app A", icon: Bike, cls: "bg-busy/15 text-busy" },
  "delivery-b": { label: "Delivery app B", icon: Bike, cls: "bg-held/15 text-held" },
  website: { label: "Website", icon: Globe, cls: "bg-ok/15 text-ok" },
  qr: { label: "Table QR", icon: QrCode, cls: "bg-primary/15 text-primary" },
};

interface OnlineOrder {
  id: string;
  channel: Channel;
  customer: string;
  items: string;
  total: number;
  age: string;
  state: "waiting" | "accepted";
}

const ORDERS: readonly OnlineOrder[] = [
  { id: "A-4821", channel: "delivery-a", customer: "Sample guest", items: "2× Paneer Tikka, 1× Garlic Naan", total: 640, age: "1 min", state: "waiting" },
  { id: "B-1093", channel: "delivery-b", customer: "Sample guest", items: "1× Margherita Pizza", total: 420, age: "3 min", state: "waiting" },
  { id: "W-0217", channel: "website", customer: "Sample guest", items: "1× Chicken 65, 2× Masala Chai", total: 440, age: "6 min", state: "accepted" },
  { id: "Q-0088", channel: "qr", customer: "Table T7", items: "3× Hara Bhara Kebab", total: 720, age: "9 min", state: "accepted" },
];

function OrderRow({ order }: { order: OnlineOrder }) {
  const ch = CHANNEL[order.channel];
  const Icon = ch.icon;
  return (
    <Panel className="flex items-center gap-[1em] px-[1em] py-[0.8em]">
      <span className={cn("flex size-[2.3em] shrink-0 items-center justify-center rounded-[0.6em]", ch.cls)}>
        <Icon className="size-[1.2em]" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[0.6em]">
          <span className="font-mono text-[0.85em] font-semibold">#{order.id}</span>
          <Chip className={ch.cls}>{ch.label}</Chip>
          <span className="text-[0.82em] text-fg-muted">{order.age} ago</span>
        </div>
        <p className="mt-[0.25em] truncate text-[0.92em] text-fg-muted">
          {order.customer} · {order.items}
        </p>
      </div>
      <span className="w-[5em] text-right font-semibold tabular-nums">{rupees(order.total)}</span>
      {order.state === "waiting" ? (
        <div className="flex gap-[0.4em]">
          <Btn tone="outline" className="text-[0.85em]">
            Decline
          </Btn>
          <Btn className="text-[0.85em]">Accept</Btn>
        </div>
      ) : (
        <Chip className="w-[8.6em] justify-center bg-ok/15 text-ok">Sent to kitchen</Chip>
      )}
    </Panel>
  );
}

/** One queue for delivery-platform, website and QR orders. */
export function OnlineOrdersScreen() {
  const counts = [
    { label: "Waiting", value: 2 },
    { label: "Accepted today", value: 37 },
    { label: "Channels connected", value: 3 },
  ];
  return (
    <AppScreen title="Online orders" active={1} actions={<Chip className="bg-held/15 text-held">2 waiting</Chip>}>
      <div className="flex h-full flex-col gap-[0.8em]">
        <div className="grid grid-cols-3 gap-[0.8em]">
          {counts.map((c) => (
            <Panel key={c.label} className="px-[1em] py-[0.7em]">
              <span className="block text-[0.82em] text-fg-muted">{c.label}</span>
              <span className="text-[1.4em] font-semibold tabular-nums">{c.value}</span>
            </Panel>
          ))}
        </div>
        <div className="flex flex-col gap-[0.6em]">
          {ORDERS.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      </div>
    </AppScreen>
  );
}

/** A branded report email as it arrives, beside its branding settings. */
export function BrandedEmailScene() {
  const brand = "#9F1239";
  return (
    <div className="flex h-full items-center justify-center gap-[2em] bg-bg-subtle px-[2.5em]">
      <Panel className="w-[15em] shrink-0 space-y-[0.9em] px-[1.1em] py-[1em]">
        <span className="block text-[1.05em] font-semibold">Email branding</span>
        {[
          ["Logo", "spice-route.png"],
          ["Brand colour", brand],
          ["Footer", "Thank you for dining with us"],
          ["Reply-to", "hello@example.com"],
        ].map(([k, v]) => (
          <div key={k}>
            <span className="block text-[0.78em] text-fg-muted">{k}</span>
            <span className="mt-[0.2em] flex items-center gap-[0.5em] rounded-[0.5em] border border-line px-[0.6em] py-[0.35em] text-[0.85em]">
              {k === "Brand colour" ? <span className="size-[0.9em] rounded-full" style={{ background: brand }} /> : null}
              <span className="truncate">{v}</span>
            </span>
          </div>
        ))}
        <div className="flex gap-[0.4em] pt-[0.2em]">
          <Btn tone="outline" className="text-[0.8em]">
            Preview
          </Btn>
          <Btn className="text-[0.8em]">Send test</Btn>
        </div>
      </Panel>

      <div className="w-[25em] overflow-hidden rounded-[0.9em] border border-line bg-white text-neutral-900 shadow-[0_0.6em_2em_-0.8em_rgb(0_0_0/0.35)]">
        <div className="flex items-center gap-[0.6em] px-[1.4em] py-[1em] text-white" style={{ background: brand }}>
          <Store className="size-[1.3em]" />
          <span className="font-semibold">{RESTAURANT.name}</span>
        </div>
        <div className="space-y-[0.8em] px-[1.4em] py-[1.2em]">
          <span className="block text-[1.35em] font-semibold leading-tight">Your weekly sales report</span>
          <p className="text-[0.9em] leading-relaxed text-neutral-600">
            Hi Sample owner, here is how <b>{RESTAURANT.branch}</b> did this week. The full report is attached as a PDF.
          </p>
          <div className="space-y-[0.35em] rounded-[0.6em] bg-neutral-100 px-[1em] py-[0.7em] text-[0.88em]">
            {[
              ["Net sales", 312450],
              ["Orders", null],
              ["Average bill", 642],
            ].map(([k, v]) => (
              <div key={k as string} className="flex justify-between">
                <span>{k}</span>
                <span className="font-semibold tabular-nums">{v === null ? "487" : rupees(v as number)}</span>
              </div>
            ))}
          </div>
          <span
            className="inline-block rounded-[0.5em] px-[1.1em] py-[0.55em] text-[0.88em] font-semibold text-white"
            style={{ background: brand }}
          >
            Open reports
          </span>
        </div>
        <div className="border-t border-neutral-200 px-[1.4em] py-[0.8em] text-[0.75em] text-neutral-500">
          Thank you for dining with us · {RESTAURANT.name}, {RESTAURANT.branch}
        </div>
      </div>
    </div>
  );
}
