import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Terms for using the Nventra POS website and the self-hosted Nventra POS software.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="3 November 2026">
      <section>
        <h2>The software licence</h2>
        <p>
          Nventra POS is free software licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). You may
          run, study, modify and share it under that licence. If you modify it and let others use the modified version
          over a network, you must offer them its source code under the same licence. The licence text is the
          authority; this summary is not.
        </p>
        <p>
          Nventra POS is built on an existing open-source project that is also licensed under the AGPL-3.0; the
          attribution is in the footer of every page.
        </p>
      </section>
      <section>
        <h2>No warranty</h2>
        <p>
          As the AGPL-3.0 states, the software is provided &quot;as is&quot;, without warranty of any kind. You are
          responsible for your installation, backups, tax settings and for checking that invoices meet the rules
          where you operate.
        </p>
        {/* TODO(lawyer): limitation of liability, governing law and jurisdiction (India). */}
      </section>
      <section>
        <h2>Names and marks</h2>
        <p>
          The Nventra name and logo identify our version of the software. The AGPL-3.0 covers the code, not the
          name or logo.
        </p>
        {/* TODO(lawyer): trademark wording once the mark is registered. */}
      </section>
      <section>
        <h2>Paid help</h2>
        <p>
          If you buy installation or support services from us, separate written terms will apply to those services.
        </p>
        {/* TODO(lawyer): service terms, refunds, GST invoicing for services. */}
      </section>
      <section>
        <h2>This website</h2>
        <p>
          We try to keep this site accurate, but features and plans can change. Contact {SITE.email} with any
          questions.
        </p>
      </section>
    </LegalPage>
  );
}
