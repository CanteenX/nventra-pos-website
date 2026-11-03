import { SITE } from "@/lib/site";

export const CLONE_URL = `${SITE.sourceRepo}.git`;

export interface InstallOption {
  id: string;
  label: string;
  intro: string;
  steps: { text: string; code?: string }[];
  note?: string;
}

export const INSTALL_OPTIONS: InstallOption[] = [
  {
    id: "one-command",
    label: "One command",
    intro:
      "The installer creates a settings file with random secrets, builds the app, starts it and waits until it is healthy. It is safe to run again.",
    steps: [
      { text: "Get the source, then run the installer.", code: `git clone ${CLONE_URL} nventra-pos\ncd nventra-pos\n./install.sh` },
      { text: "Or try it with a sample restaurant first.", code: "./install.sh --demo" },
    ],
    note: `Open http://localhost:${SITE.appPort} and create your restaurant at /signup.`,
  },
  {
    id: "compose",
    label: "Docker Compose",
    intro: "Prefer to set your own secrets? Run each step yourself.",
    steps: [
      {
        text: "Copy the example settings and edit POSTGRES_PASSWORD and JWT_SECRET.",
        code: `git clone ${CLONE_URL} nventra-pos\ncd nventra-pos\ncp .env.example .env`,
      },
      { text: "Build and start the stack.", code: "docker compose up -d --build" },
      {
        text: "Optional: load demo data.",
        code: "docker exec nventra-pos-backend npx ts-node prisma/seed.ts",
      },
    ],
  },
  {
    id: "windows",
    label: "Windows",
    intro: "Windows 10 and 11 run the same stack through Docker Desktop.",
    steps: [
      { text: "Install Docker Desktop, reboot if asked, and start it once.", code: "winget install Docker.DockerDesktop" },
      {
        text: "Open Git Bash (or WSL2) and run the installer. Plain PowerShell cannot run a .sh file.",
        code: `git clone ${CLONE_URL} nventra-pos\ncd nventra-pos\n./install.sh`,
      },
    ],
    note: `Other tills on your network connect to http://<this PC's IP>:${SITE.appPort}.`,
  },
];

export const COMING_SOON = "Linux .deb package, Windows desktop app and mobile apps: coming soon.";

export interface EnvVar {
  name: string;
  example: string;
  required: boolean;
  description: string;
}

/** Values mirror .env.example in the product repo. */
export const ENV_VARS: EnvVar[] = [
  {
    name: "POSTGRES_PASSWORD",
    example: "change-me",
    required: true,
    description: "Database password. The installer generates a random one.",
  },
  {
    name: "JWT_SECRET",
    example: "change-me-to-a-long-random-string",
    required: true,
    description: "Signs login sessions. The stack refuses to start without it; the installer generates one.",
  },
  {
    name: "FRONTEND_ORIGIN",
    example: "http://localhost:1995",
    required: false,
    description: "The address staff use to open the app. Comma-separate several exact origins.",
  },
  {
    name: "HOST_PORT",
    example: "1995",
    required: false,
    description: "Port the web app listens on, on the host.",
  },
  {
    name: "COOKIE_SECURE",
    example: "false",
    required: false,
    description:
      "Set to true only when the app is served over HTTPS (tunnel or reverse proxy). Leave false for plain http:// on a LAN, or logins will fail with \"Unauthorized\".",
  },
  {
    name: "SMTP_URL",
    example: "smtps://you%40gmail.com:APP_PASSWORD@smtp.gmail.com:465",
    required: false,
    description: "Outgoing mail server for receipts, reports and alerts. Leave unset to keep email off. URL-encode the @ in a username.",
  },
  {
    name: "SMTP_FROM",
    example: "\"My Cafe <you@gmail.com>\"",
    required: false,
    description: "Sender name and address for outgoing email.",
  },
];

export interface DeployOption {
  title: string;
  badge?: string;
  body: string;
  points: string[];
}

export const DEPLOY_OPTIONS: DeployOption[] = [
  {
    title: "A server in your restaurant",
    badge: "Recommended",
    body: "One machine on the restaurant LAN runs everything. Every till, tablet and kitchen screen opens it in a browser.",
    points: ["Keeps working with the internet down", "No monthly hosting bill", "Fastest response on the floor"],
  },
  {
    title: "A VPS or cloud machine",
    body: "The identical stack runs on any VPS if you would rather manage one or several branches remotely.",
    points: ["Point FRONTEND_ORIGIN and HOST_PORT at the VPS", "Reach it from anywhere", "Needs a reliable internet link at each site"],
  },
  {
    title: "Behind a tunnel",
    body: "Keep the server on site and reach it from outside with HTTPS through a tunnel or reverse proxy, without port-forwarding.",
    points: ["Point the tunnel at port 1995", "Set COOKIE_SECURE=true once served over HTTPS", "Same data, same logins"],
  },
];
