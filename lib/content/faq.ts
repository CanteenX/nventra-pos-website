import { SITE } from "@/lib/site";

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: "How much does Nventra POS cost?",
    a: "Self-hosting is free. There is no per-terminal or per-month licence fee: connect as many tills, tablets and kitchen screens as your network can handle. You pay only for the machine it runs on, and for any optional services you choose such as an SMTP provider or a VPS.",
  },
  {
    q: "Does it really work without the internet?",
    a: "Yes. The database, API and web app all run on one machine in your restaurant. Order-taking, billing, the kitchen display and printing keep working over your local Wi-Fi or Ethernet with the internet cable unplugged. Only optional features such as email, webhooks and remote access need a connection.",
  },
  {
    q: "Where is my data stored, and how do I back it up?",
    a: "On your own server, in a PostgreSQL database. Nothing is sent to us. Settings → Backup lets you schedule backups, including to S3-compatible storage, and restore them. Test a restore before you need one.",
  },
  {
    q: "Does it handle GST billing and UPI payments for India?",
    a: "Yes. Set GST per branch, with menu prices either inclusive or exclusive of tax, and add your UPI id in Settings. At checkout the till shows a UPI QR for the exact amount, which guests scan with any UPI app. Money goes straight to your account with no gateway fee.",
  },
  {
    q: "Does it confirm UPI payments automatically?",
    a: "Not yet. The cashier checks the UPI app or soundbox and then completes the payment. Automatic confirmation needs a payment gateway, which is on the roadmap.",
  },
  {
    q: "What hardware do I need?",
    a: "One always-on machine that can run Docker, such as a mini PC, an old laptop or a NAS, plus whatever tills, tablets or phones you already have, since every screen is a web browser. Pre-built images exist for both amd64 and arm64 machines.",
  },
  {
    q: "Which printers work?",
    a: "Any printer through the browser's print dialog, and ESC/POS thermal printers directly, connected by USB to the server or over the network on port 9100. Kitchen tickets (KOTs) print the same way. Weighing scales and label printers are not supported yet.",
  },
  {
    q: "Can I use it for more than one outlet?",
    a: "Yes. Branches have their own address, tax regime and UPI payee. You get a branch switcher, a cross-branch overview and branch-to-branch stock transfers. Run a single server on a VPS for all branches, or one server per site with multi-branch sync: each branch keeps working offline and exchanges menu, customer and stock changes with head office when the link is back.",
  },
  {
    q: "Is it open source?",
    a: `Nventra POS is licensed under the ${SITE.license}. You may self-host, use and modify it. If you run a modified version as a network service for others, you must share your changes under the same licence. ${SITE.sourceNote}.`,
  },
  {
    q: "Is there a Windows app, a Linux package or a mobile app?",
    a: "Today Nventra POS runs as a Docker stack on Linux, Windows (Docker Desktop) or macOS, and every device uses it in the browser. A Linux .deb package, a Windows desktop app and mobile apps are coming soon.",
  },
  {
    q: "How do updates work?",
    a: "Pull the latest code and re-run the installer. It never overwrites your settings file or your data, and database migrations run automatically on start-up. Settings → Updates can also check for a new version.",
  },
  {
    q: "What support do you offer?",
    a: `Email ${SITE.email} with your question and we will reply by email. Help with installation and first-time set-up is available on request. There is no phone line or guaranteed response time yet.`,
  },
];
