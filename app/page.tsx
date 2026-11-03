import { ArchitectureDiagram } from "@/components/home/architecture-diagram";
import { ComparisonTable } from "@/components/home/comparison-table";
import { CtaBand } from "@/components/home/cta-band";
import { DeployOptions } from "@/components/home/deploy-options";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { InstallTabs } from "@/components/home/install-tabs";
import { ModuleBento } from "@/components/home/module-bento";
import { SolutionCards } from "@/components/home/solution-cards";
import { StatsBand } from "@/components/home/stats-band";
import { TrustBadges } from "@/components/home/trust-badges";
import { WorksWithStrip } from "@/components/home/works-with";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { FAQ } from "@/lib/content/faq";
import { HOW_IT_WORKS } from "@/lib/content/home";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

function faqJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />

      <Section id="install" labelledBy="install-title">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start [&>*]:min-w-0">
          <SectionHeading
            id="install-title"
            eyebrow="Install"
            title="Up and running in one command."
            lead="Nventra POS ships as a Docker Compose stack. Pick the way that suits your machine; every option ends with the same app on port 1995."
          />
          <InstallTabs />
        </div>
      </Section>

      <Section id="modules" tone="subtle" labelledBy="modules-title">
        <SectionHeading
          id="modules-title"
          eyebrow="Product"
          title="One app for the whole restaurant."
          lead="Front of house, kitchen, store room and back office share one database, so a sale updates stock, reports and payroll without exports or re-typing."
        />
        <ModuleBento />
        <div className="mt-10">
          <ButtonLink href="/features/" variant="secondary">
            See every feature
          </ButtonLink>
        </div>
      </Section>

      <Section id="solutions" labelledBy="solutions-title">
        <SectionHeading
          id="solutions-title"
          eyebrow="Solutions"
          title="Built for the way you serve."
          lead="The same system, set up for the kind of restaurant you run."
        />
        <SolutionCards />
      </Section>

      <section aria-labelledby="works-title" className="pb-16 sm:pb-24">
        <div className="container-x">
          <p id="works-title" className="text-mono-tag mb-6 text-center font-semibold text-fg-muted">
            Works with what you already use
          </p>
        </div>
        <WorksWithStrip />
      </section>

      <StatsBand />

      <Section id="gallery" labelledBy="gallery-title">
        <SectionHeading
          id="gallery-title"
          eyebrow="Screenshots"
          title="See it before you install it."
          lead="Real screens from the app running with demo data."
        />
        <Gallery />
      </Section>

      <Section id="deploy" tone="subtle" labelledBy="deploy-title">
        <SectionHeading
          id="deploy-title"
          eyebrow="Deployment"
          title="Host it where it suits you."
          lead="The same three containers run anywhere Docker does. Nothing changes but the address."
        />
        <DeployOptions />
      </Section>

      <Section id="architecture" labelledBy="arch-heading">
        <SectionHeading
          id="arch-heading"
          eyebrow="Architecture"
          title="Simple enough to trust."
          lead="A web app, an API and a PostgreSQL database on one machine. Every device on the floor is just a browser."
        />
        <ArchitectureDiagram />
      </Section>

      <Section id="compare" tone="subtle" labelledBy="compare-title">
        <SectionHeading
          id="compare-title"
          eyebrow="Compare"
          title="An honest comparison."
          lead="Self-hosting is not right for everyone. Here is where it wins, and where a subscription service may suit you better."
        />
        <ComparisonTable />
      </Section>

      <Section id="how-it-works" labelledBy="how-title">
        <SectionHeading id="how-title" eyebrow="How it works" title="Four steps to your first order." />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step.title} className="h-full rounded-2xl border border-line bg-card p-6">
              <Reveal>
                <span className="font-mono text-sm font-semibold text-mint-text">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <ButtonLink href="/how-to-use/" variant="secondary">
            Read the full walkthrough
          </ButtonLink>
        </div>
      </Section>

      <Section id="faq" tone="subtle" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] [&>*]:min-w-0">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions, answered plainly."
            lead={`Something not covered here? Email ${SITE.email}.`}
          />
          <Accordion items={FAQ} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
      </Section>

      <CtaBand />
    </>
  );
}
