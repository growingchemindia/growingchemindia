import { heroHighlights, site } from "@/lib/content";
import { ButtonLink } from "./ui/button";

const badges = ["Pan-India warehousing", "Batch-consistent grades", "Lab & technical support"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tint to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[30%] -right-[10%] h-[60vw] max-h-[700px] w-[60vw] max-w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(47,158,65,0.14), rgba(47,158,65,0) 65%)",
        }}
      />
      <div className="relative mx-auto grid w-[92%] max-w-[1160px] items-center gap-12 py-[clamp(3rem,6vw,5.5rem)] lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="mb-3.5 inline-block font-[family-name:var(--font-head)] text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-brand-600">
            {site.tagline} · Since {site.since}
          </span>
          <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)] font-extrabold leading-[1.12] tracking-[-0.02em]">
            Reliable raw materials that help Indian manufacturing{" "}
            <span className="text-brand-500">grow</span>.
          </h1>
          <p className="my-6 max-w-[42ch] text-[1.1rem] text-slatemuted">
            We import, stock and supply pigments, dyes, additives, minerals and ready-to-use
            compounds for the plastics, PVC, rubber, paint and printing-ink industries,
            backed by lab support and consistent quality.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <ButtonLink href="/products">Explore Products</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Talk to Our Team
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-5">
            {badges.map((b) => (
              <li
                key={b}
                className="relative pl-6 text-[0.92rem] font-medium text-slatemuted before:absolute before:left-0 before:top-[0.45rem] before:h-2 before:w-2 before:rounded-full before:bg-brand-500 before:shadow-[0_0_0_4px_rgba(47,158,65,0.15)]"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden className="w-full max-w-[460px] justify-self-center lg:justify-self-end">
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-lg)]">
            {heroHighlights.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 py-3.5 text-[0.95rem] ${
                  i < heroHighlights.length - 1 ? "border-b border-dashed border-line" : ""
                }`}
              >
                <span className="text-slatemuted">{row.label}</span>
                <b className="font-[family-name:var(--font-head)] text-[0.9rem] font-semibold text-ink">
                  {row.value}
                </b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
