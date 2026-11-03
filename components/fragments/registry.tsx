import type { ReactNode } from "react";
import type { ShotId } from "@/lib/screenshots";
import { KdsScreen, KotTicket } from "./kitchen";
import { PhoneFrame } from "./devices";
import { UpiCard } from "./payments";
import { PosScreen, TablesScreen } from "./pos";
import {
  CustomersScreen,
  DashboardScreen,
  GuestQrScreen,
  InventoryScreen,
  MenuScreen,
  ReportsScreen,
  ReservationsScreen,
  SettingsScreen,
} from "./screens";

function Dark({ children }: { children: ReactNode }) {
  return <div className="scheme-dark h-full">{children}</div>;
}

/** Guest phone beside the ticket it creates and the UPI QR it ends with. */
function GuestQrScene() {
  return (
    <div className="flex h-full items-center justify-center gap-[2.5em] bg-bg-subtle px-[3em]">
      <PhoneFrame className="w-[17em] shrink-0">
        <GuestQrScreen />
      </PhoneFrame>
      <div className="flex w-[20em] flex-col gap-[1.2em]">
        <KotTicket />
        <UpiCard paid />
      </div>
    </div>
  );
}

/** One illustration per screenshot id, drawn with sample data. */
export const FRAGMENTS: Record<ShotId, () => ReactNode> = {
  dashboard: () => <DashboardScreen />,
  dashboardDark: () => (
    <Dark>
      <DashboardScreen />
    </Dark>
  ),
  pos: () => <PosScreen />,
  posDark: () => (
    <Dark>
      <PosScreen />
    </Dark>
  ),
  kds: () => <KdsScreen />,
  tables: () => <TablesScreen />,
  reservations: () => <ReservationsScreen />,
  menu: () => <MenuScreen />,
  customers: () => <CustomersScreen />,
  inventory: () => <InventoryScreen />,
  reports: () => <ReportsScreen />,
  settings: () => <SettingsScreen />,
  guestQr: () => <GuestQrScene />,
};

