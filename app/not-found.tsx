import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="container-x py-24 text-center">
      <p className="text-mono-tag font-semibold text-mint-text">404 //</p>
      <h1 id="nf-title" className="mt-4 text-4xl sm:text-6xl">
        This page is not on the menu.
      </h1>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </section>
  );
}
