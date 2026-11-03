import {
  ChefHat,
  CloudUpload,
  Code2,
  Database,
  GitBranch,
  HardDrive,
  Lock,
  Monitor,
  Printer,
  Receipt,
  Server,
  ShieldCheck,
  Smartphone,
  Tablet,
  Users,
  WifiOff,
} from "lucide-react";
import type { ReactNode } from "react";
import { FlowScene, HubScene } from "@/components/ui/spot-scene";
import { cn } from "@/lib/cn";

interface Value {
  title: string;
  body: string;
  art: ReactNode;
  wide?: boolean;
}

const VALUES: Value[] = [
  {
    title: "Every device is just a browser",
    body: "Tills, tablets, kitchen screens and phones open the same address on your network. No app to install on each one.",
    art: <HubScene center={Server} around={[Monitor, Tablet, ChefHat, Smartphone, Printer]} className="aspect-[2/1]" />,
    wide: true,
  },
  {
    title: "Billing survives an outage",
    body: "Orders, KOTs and receipts run on the LAN, so a dropped internet line does not stop service.",
    art: <HubScene center={WifiOff} around={[Receipt, Printer, ChefHat]} />,
  },
  {
    title: "Your data stays in the building",
    body: "Everything lives in a PostgreSQL database on your machine. We never receive a copy.",
    art: <HubScene center={Database} around={[Lock, ShieldCheck, HardDrive]} />,
  },
  {
    title: "Backups on your schedule",
    body: "Schedule backups from Settings, including to S3-compatible storage you choose.",
    art: <FlowScene steps={[Database, HardDrive, CloudUpload]} />,
  },
  {
    title: "Open source, AGPL-3.0",
    body: "Read the code, change it and run it. Your setup does not depend on any one vendor.",
    art: <HubScene center={Code2} around={[GitBranch, Users, ShieldCheck]} />,
  },
];

/** "Simple enough to trust": mixed-size value cards with spot illustrations. */
export function ValueBento() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {VALUES.map((v) => (
        <li
          key={v.title}
          className={cn("reveal flex flex-col rounded-3xl border border-line bg-card p-4 sm:p-5", v.wide && "md:col-span-2")}
        >
          {v.art}
          <h3 className="mt-5 px-1 text-xl font-semibold tracking-tight sm:text-2xl">{v.title}</h3>
          <p className="mt-2 px-1 pb-1 text-[15px] leading-relaxed text-fg-muted">{v.body}</p>
        </li>
      ))}
    </ul>
  );
}
