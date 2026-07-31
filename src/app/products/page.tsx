import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products | Growing Chem India",
  description:
    "Pigments & dyes, additives, minerals & fillers, ready-to-use compounds and custom sourcing for the plastics, PVC, rubber, paint and printing-ink industries.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader eyebrow="What we supply" title="Our categories">
        A curated range of raw materials across our categories, imported and locally sourced,
        stocked and ready to ship across India.
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-[92%] max-w-[1160px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Reveal key={p.slug} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
