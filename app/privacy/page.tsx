import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How the Nventra POS website and the self-hosted Nventra POS software handle personal data.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="3 November 2026">
      <section>
        <h2>This website</h2>
        <p>
          This is a static website. It has no contact form, no accounts, no analytics and no advertising cookies. If
          you switch between light and dark mode, that choice is stored in your own browser only.
        </p>
        {/* TODO(lawyer): add hosting-provider server logs and any analytics added later. */}
      </section>
      <section>
        <h2>When you email us</h2>
        <p>
          If you write to {SITE.email}, we receive your email address and whatever you include in the message. We use
          it only to reply and to help you, and we do not sell or share it.
        </p>
        {/* TODO(lawyer): retention period, lawful basis, DPDP Act 2023 notice and grievance officer details. */}
      </section>
      <section>
        <h2>The Nventra POS software</h2>
        <p>
          Nventra POS is self-hosted. Your menu, orders, customers, staff and payments data are stored in a PostgreSQL
          database on a machine you control. We do not receive a copy. As the operator, you are responsible for how
          you collect and keep your guests&apos; and staff&apos;s data, including backups and access control.
        </p>
        <ul>
          <li>Optional features such as email, webhooks or remote access send data only where you configure them.</li>
          <li>Software updates are fetched only when an administrator asks for them.</li>
        </ul>
      </section>
      <section>
        <h2>Questions</h2>
        <p>Email {SITE.email}.</p>
      </section>
    </LegalPage>
  );
}
