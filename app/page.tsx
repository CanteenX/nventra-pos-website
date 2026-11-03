import { ArchitectureDiagram } from "@/components/home/architecture-diagram";
import { ComparisonTable } from "@/components/home/comparison-table";
import { CtaBand } from "@/components/home/cta-band";
import { DeployOptions } from "@/components/home/deploy-options";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { InstallTabs } from "@/components/home/install-tabs";
import { ModuleBento } from "@/components/home/module-bento";
import { ProductTabs, type ProductTab } from "@/components/home/product-tabs";
import { SolutionCards } from "@/components/home/solution-cards";
import { StatsBand } from "@/components/home/stats-band";
import { TrustBadges } from "@/components/home/trust-badges";
import { ValueBento } from "@/components/home/value-bento";
import { WorksWithStrip } from "@/components/home/works-with";
import { FloorAndCartScreen } from "@/components/fragments/pos";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { ScaledCanvas } from "@/components/ui/scaled-canvas";
import { BrowserFrame, Screenshot } from "@/components/ui/screenshot";
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

const TAB_SIZES = "(min-width: 1024px) 760px, 100vw";

const PRODUCT_TABS: ProductTab[] = [
  {
    id: "pos",
    label: "POS",
    title: "Bill a table in a few taps.",
    body: "Open a table from the floor plan, add dishes and modifiers, apply a discount. Tax is worked out on the server and the UPI QR shows the exact amount.",
    href: "/features/#pos-billing",
    visual: (
      <BrowserFrame sample>
        <ScaledCanvas label="Point of sale with the floor plan of tables by status and the cart for table T4. Illustration with sample data.">
          <FloorAndCartScreen />
        </ScaledCanvas>
      </BrowserFrame>
    ),
  },
  {
    id: "kitchen",
    label: "Kitchen",
    title: "Tickets reach the right station.",
    body: "KOTs go to the tandoor, pizza or bar screen the moment an order is sent, with timers that warn after 15 minutes.",
    href: "/features/#kitchen",
    visual: <Screenshot id="kds" sizes={TAB_SIZES} />,
  },
  {
    id: "inventory",
    label: "Inventory",
    title: "Know what is in the store room.",
    body: "Recipes deduct stock at checkout, low items are flagged at their reorder level, and every plate has a real cost.",
    href: "/features/#inventory",
    visual: <Screenshot id="inventory" sizes={TAB_SIZES} />,
  },
  {
    id: "reports",
    label: "Reports",
    title: "Close the day with answers.",
    body: "Eighteen reports, from GST by rate to food cost and peak hours. Print them or export to Excel, PDF and CSV.",
    href: "/features/#reports",
    visual: <Screenshot id="reports" sizes={TAB_SIZES} />,
  },
  {
    id: "qr",
    label: "QR ordering",
    title: "Let guests order from the table.",
    body: "Guests scan the table code, order with modifiers and the ticket lands in the kitchen. Call-waiter and request-bill come built in.",
    href: "/features/#online-ordering",
    visual: <Screenshot id="guestQr" sizes={TAB_SIZES} />,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="tour" labelledBy="tour-title">
        <SectionHeading
          id="tour-title"
          eyebrow="Product tour"
          title="One system from the door to the kitchen."
          align="center"
        />
        <ProductTabs tabs={PRODUCT_TABS} />
      </Section>

      <TrustBadges />

      <Section id="modules" tone="dark" labelledBy="modules-title">
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

      <section aria-labelledby="works-title" className="pb-20 sm:pb-28">
        <div className="container-x">
          <h2 id="works-title" className="mb-8 text-center text-2xl sm:text-3xl">
            Works with what you already use
          </h2>
        </div>
        <WorksWithStrip />
      </section>

      <Section id="numbers" tone="dark" labelledBy="numbers-title">
        <SectionHeading id="numbers-title" eyebrow="By the numbers" title="Small install. Whole restaurant." />
        <StatsBand />
      </Section>

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

      <Section id="deploy" tone="subtle" labelledBy="deploy-title">
        <SectionHeading
          id="deploy-title"
          eyebrow="Deployment"
          title="Host it where it suits you."
          lead="The same three containers run anywhere Docker does. Nothing changes but the address."
        />
        <DeployOptions />
      </Section>

      <Section id="architecture" tone="dark" labelledBy="arch-heading">
        <SectionHeading
          id="arch-heading"
          eyebrow="Architecture"
          title="Simple enough to trust."
          lead="A web app, an API and a PostgreSQL database on one machine. Every device on the floor is just a browser."
        />
        <ValueBento />
        <div className="mt-6">
          <ArchitectureDiagram />
        </div>
      </Section>

      <Section id="gallery" labelledBy="gallery-title">
        <SectionHeading
          id="gallery-title"
          eyebrow="Screens"
          title="See it before you install it."
          lead="Illustrations of the main screens, drawn with sample data. Real screenshots will replace them once they are captured."
        />
        <Gallery />
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
            <li key={step.title} className="reveal h-full rounded-3xl border border-line bg-card p-6 sm:p-7">
              <span className="font-mono text-sm font-semibold text-mint-text">0{i + 1}</span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
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
