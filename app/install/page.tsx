import { CtaBand } from "@/components/home/cta-band";
import { DeployOptions } from "@/components/home/deploy-options";
import { InstallTabs } from "@/components/home/install-tabs";
import { PageHero } from "@/components/layout/page-hero";
import { CodeBlock } from "@/components/ui/code-block";
import { Section, SectionHeading } from "@/components/ui/section";
import { ENV_VARS } from "@/lib/content/install";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Install",
  description:
    "Install Nventra POS with Docker on Linux, Windows or macOS: one-command installer, manual Docker Compose, every .env setting explained, HTTPS tunnels, updates and backups.",
  path: "/install/",
});

const DOCKER = [
  { os: "Linux", code: "curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER" },
  { os: "macOS", code: "brew install --cask docker" },
  { os: "Windows 10/11", code: "winget install Docker.DockerDesktop" },
];

export default function InstallPage() {
  return (
    <>
      <PageHero
        eyebrow="Install"
        title="Install Nventra POS on your own machine."
        lead={`You need one always-on computer with Docker. The app is then reachable from every device on your network at http://<that machine's IP>:${SITE.appPort}.`}
      />

      <Section labelledBy="docker-title">
        <SectionHeading
          id="docker-title"
          eyebrow="Step 1"
          title="Install Docker"
          lead="Skip this if docker --version already works. All three include Docker Compose v2, which is all Nventra POS needs."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {DOCKER.map((d) => (
            <div key={d.os}>
              <h3 className="mb-3 text-base font-semibold">{d.os}</h3>
              <CodeBlock code={d.code} />
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-sm text-fg-muted">
          On Linux, log out and back in so your user can run Docker without sudo. On macOS and Windows, open Docker
          Desktop once so the engine is running.
        </p>
      </Section>

      <Section tone="subtle" labelledBy="method-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            id="method-title"
            eyebrow="Step 2"
            title="Install the app"
            lead="Get the source, then run the installer. It never overwrites an existing .env or your data, so it is safe to run again."
          />
          <InstallTabs />
        </div>
      </Section>

      <Section labelledBy="env-title">
        <SectionHeading
          id="env-title"
          eyebrow="Step 3"
          title="Settings in .env"
          lead="The installer writes these for you. Edit .env and re-run the installer (or docker compose up -d) to change them. Never commit the real .env."
        />
        <div className="overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">Environment variables</caption>
            <thead>
              <tr className="border-b border-line bg-bg-subtle">
                <th scope="col" className="px-5 py-3.5 font-semibold">Variable</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Example</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Required</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">What it does</th>
              </tr>
            </thead>
            <tbody>
              {ENV_VARS.map((v) => (
                <tr key={v.name} className="border-b border-line align-top last:border-0">
                  <th scope="row" className="px-5 py-3.5 font-mono text-[13px] font-semibold">
                    {v.name}
                  </th>
                  <td className="px-5 py-3.5 font-mono text-[12.5px] break-all text-fg-muted">{v.example}</td>
                  <td className="px-5 py-3.5">{v.required ? "Yes" : "Optional"}</td>
                  <td className="px-5 py-3.5 leading-relaxed text-fg-muted">{v.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="subtle" labelledBy="where-title">
        <SectionHeading
          id="where-title"
          eyebrow="Step 4"
          title="Decide where it runs"
          lead="Whichever you choose, it is the same three containers, the same data and the same logins."
        />
        <DeployOptions />
      </Section>

      <Section labelledBy="update-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="update-title"
              eyebrow="Updates"
              title="Updating"
              lead="Pull the latest code and run the installer again. Database migrations apply automatically when the backend starts."
            />
            <CodeBlock code={"git pull\n./install.sh"} />
          </div>
          <div>
            <SectionHeading
              id="backup-title"
              eyebrow="Backups"
              title="Backups"
              lead="Everything lives in the PostgreSQL volume on your machine. Schedule backups in Settings → Backup, including to S3-compatible storage, and test a restore before you need one."
            />
            <h3 className="mb-3 text-base font-semibold">Troubleshooting</h3>
            <ul className="space-y-3 text-[15px] leading-relaxed text-fg-muted">
              <li>
                <strong className="text-fg">Login works, then &quot;Unauthorized&quot;:</strong> on HTTPS set
                COOKIE_SECURE=true; on plain HTTP keep it false.
              </li>
              <li>
                <strong className="text-fg">No UPI QR at checkout:</strong> add a UPI id in Settings → Restaurant.
              </li>
              <li>
                <strong className="text-fg">&quot;Email is not set up&quot;:</strong> set SMTP_URL and SMTP_FROM, then
                restart the backend.
              </li>
              <li>
                <strong className="text-fg">The app did not come up:</strong> run <code className="font-mono text-sm">docker compose logs</code>.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand title="Stuck on a step?" body={`Email ${SITE.email} with what you tried and what you saw, and we will help.`} />
    </>
  );
}
