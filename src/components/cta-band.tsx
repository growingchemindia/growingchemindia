import { ButtonLink } from "./ui/button";

/** Reusable "get a quote" call-to-action band for the home and interior pages. */
export function CtaBand() {
  return (
    <section className="py-[clamp(3rem,6vw,5rem)]">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-navy-700 to-brand-600 px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.5rem,5vw,3.5rem)] text-center shadow-[var(--shadow-lg)]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.6) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-[22ch] text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white">
              Ready to source your next batch?
            </h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-[1.02rem] text-white/85">
              Tell us the grade, quantity and application. We&apos;ll come back with
              availability and pricing.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <ButtonLink
                href="/contact"
                className="!bg-white !text-navy-700 hover:!bg-brand-50"
              >
                Request a Quote
              </ButtonLink>
              <ButtonLink
                href="/products"
                variant="ghost"
                className="!border-white/40 !text-white hover:!border-white hover:!text-white"
              >
                Browse Products
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
