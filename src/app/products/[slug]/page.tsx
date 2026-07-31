import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { getProduct, products, toGrade } from "@/lib/content";

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
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.overview,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${product.title} | Growing Chem India`,
      description: product.overview,
      url: `/products/${slug}`,
      images: [{ url: `/categories/${slug}.jpg`, alt: product.title }],
    },
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
      <ProductJsonLd
        name={product.title}
        description={product.overview}
        slug={product.slug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.title, path: `/products/${product.slug}` },
        ]}
      />
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
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {product.grades.map(toGrade).map((g) => {
                const cardClass =
                  "group block h-full overflow-hidden rounded-[14px] border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]";

                const thumb = g.image ? (
                  <Image
                    src={g.image}
                    alt={g.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 220px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : g.fileType === "pdf" ? (
                  // Datasheet / brochure tile.
                  <div className="flex h-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-brand-50 to-brand-100">
                    <svg
                      className="h-8 w-8 text-brand-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M8 3h6l4 4v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                      <path d="M14 3v4h4M9.5 13h5M9.5 16.5h5" />
                    </svg>
                    <span className="font-[family-name:var(--font-head)] text-[0.6rem] font-bold uppercase tracking-wider text-brand-700">
                      Datasheet
                    </span>
                  </div>
                ) : (
                  // Branded placeholder until a real photo is added.
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
                    <svg
                      className="h-8 w-8 text-brand-500/80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9 3h6M10 3v6l-5 8a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-5-8V3" />
                      <path d="M7.5 15h9" />
                    </svg>
                  </div>
                );

                const body = (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {thumb}
                      {g.file ? (
                        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.66rem] font-semibold text-navy-700 shadow-sm">
                          {g.fileType === "pdf" ? "PDF" : "View"}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between gap-2 px-3.5 py-3">
                      <p className="font-[family-name:var(--font-head)] text-[0.9rem] font-medium leading-snug">
                        {g.name}
                      </p>
                      {g.file ? (
                        <svg
                          className="h-3.5 w-3.5 flex-none text-brand-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M14 5h5v5M19 5l-8 8M12 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
                        </svg>
                      ) : null}
                    </div>
                  </>
                );

                return (
                  <li key={g.name}>
                    {g.file ? (
                      <a
                        href={g.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cardClass}
                        title={`Open ${g.name}`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={cardClass}>{body}</div>
                    )}
                  </li>
                );
              })}
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
