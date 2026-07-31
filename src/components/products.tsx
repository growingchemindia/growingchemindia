import Link from "next/link";
import { products } from "@/lib/content";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

/** Home-page products preview. The full listing lives at /products. */
export function Products() {
  return (
    <section id="categories" className="bg-tint py-[clamp(3.5rem,7vw,6rem)]">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow="What we supply"
            title="Categories for every stage of your process"
            className="mb-0"
          >
            A curated range of raw materials for plastics, PVC, rubber, coatings and inks,
            stocked and ready to ship.
          </SectionHead>
          <Link
            href="/products"
            className="mb-1 inline-flex items-center gap-1.5 font-[family-name:var(--font-head)] text-[0.9rem] font-semibold text-brand-600 hover:text-brand-700"
          >
            View all categories
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Reveal key={p.slug} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
