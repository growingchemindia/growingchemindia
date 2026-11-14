import Link from "next/link";
import { industries } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Industries() {
  return (
    <section id="industries" className="py-[clamp(3.5rem,7vw,6rem)]">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          eyebrow="Where our materials go"
          title="Trusted across the industries that build everyday products"
        />
        <ul className="grid grid-cols-1 gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-2">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} as="li" className="border-b border-line">
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex items-center gap-5 py-5 transition-colors hover:bg-tint"
              >
              <span className="font-[family-name:var(--font-head)] text-[0.9rem] font-semibold tabular-nums text-muted transition-colors group-hover:text-brand-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-none w-8 bg-line transition-all group-hover:w-12 group-hover:bg-brand-500" />
              <span className="font-[family-name:var(--font-head)] text-[1.05rem] font-medium text-ink">
                {industry.title}
              </span>
              <svg
                className="ml-auto h-4 w-4 flex-none text-line transition-all group-hover:translate-x-1 group-hover:text-brand-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
