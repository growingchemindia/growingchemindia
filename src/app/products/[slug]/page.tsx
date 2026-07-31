import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { getProduct, products } from "@/lib/content";

/** Pre-render a static page per product at build time. */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found | Growing Chem India" };
  return {
    title: `${product.title} | Growing Chem India`,
    description: product.overview,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  // Sibling products for the "explore more" strip.
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={product.title}
        breadcrumb={[{ label: "Products", href: "/products" }]}
      >
        {product.description}
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-[92%] max-w-[1160px] gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Main */}
          <div>
            <div className="relative mb-8 aspect-[16/7] w-full overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={`/categories/${product.slug}.jpg`}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 680px"
                className="object-cover"
                priority
              />
            </div>
            <h2 className="text-[1.5rem] font-bold">Overview</h2>
            <p className="mt-3 max-w-[62ch] text-[1.05rem] text-slatemuted">{product.overview}</p>

            <h3 className="mt-10 text-[1.15rem] font-semibold">Grades &amp; products</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {product.grades.map((g) => (
                <li
                  key={g}
                  className="flex items-center gap-3 rounded-[10px] border border-line bg-white px-4 py-3 text-[0.95rem]"
                >
                  <span className="h-2 w-2 flex-none rounded-full bg-brand-500" />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Aside */}
          <aside className="lg:pl-2">
            <div className="rounded-[var(--radius-card)] border border-line bg-tint p-6">
              <h3 className="font-[family-name:var(--font-head)] text-[0.82rem] font-semibold uppercase tracking-wide text-muted">
                Typical applications
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.applications.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.88rem] font-medium text-ink"
                  >
                    {a}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-line pt-6">
                <p className="text-[0.95rem] text-slatemuted">
                  Need a specific grade or a spec sheet? Send your requirement and we&apos;ll
                  respond with availability and pricing.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 font-[family-name:var(--font-head)] text-[0.9rem] font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Enquire about {product.title}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Other divisions */}
      <section className="bg-tint py-[clamp(2.5rem,5vw,4rem)]">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <h2 className="mb-6 text-[1.3rem] font-bold">Other categories</h2>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/products/${o.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-[0.92rem] font-medium transition-colors hover:border-brand-500"
              >
                <span className="relative h-7 w-7 overflow-hidden rounded-full">
                  <Image
                    src={`/categories/${o.slug}.jpg`}
                    alt=""
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </span>
                {o.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
