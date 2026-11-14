import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { getIndustry, getProduct, industries, type Product } from "@/lib/content";

type Params = Promise<{ slug: string }>;

/** Pre-render a static page per industry at build time. */
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry not found" };
  return {
    title: `${industry.title} Industry`,
    description: industry.overview,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: `${industry.title} Industry | Growing Chem India`,
      description: industry.overview,
      url: `/industries/${slug}`,
      images: [{ url: industry.image, alt: industry.title }],
    },
  };
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const supplied = industry.products
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));
  const others = industries.filter((i) => i.slug !== slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.title, path: `/industries/${slug}` },
        ]}
      />
      <PageHeader
        eyebrow="Industry we serve"
        title={industry.title}
        breadcrumb={[{ label: "Industries", href: "/industries" }]}
      >
        {industry.summary}
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-[92%] max-w-[1160px] items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-line">
            <Image
              src={industry.image}
              alt={industry.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-[1.5rem] font-bold">Overview</h2>
            <p className="mt-3 text-[1.05rem] text-slatemuted">{industry.overview}</p>

            <h3 className="mt-8 font-[family-name:var(--font-head)] text-[0.82rem] font-semibold uppercase tracking-wide text-muted">
              Typical applications
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {industry.uses.map((u) => (
                <li
                  key={u}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.88rem] font-medium text-ink"
                >
                  {u}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 font-[family-name:var(--font-head)] text-[0.9rem] font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Talk to us about your requirement
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-tint py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <h2 className="mb-8 text-[1.5rem] font-bold">What we supply for {industry.title.toLowerCase()}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supplied.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(2.5rem,5vw,4rem)]">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <h2 className="mb-6 text-[1.3rem] font-bold">Other industries</h2>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-[0.92rem] font-medium transition-colors hover:border-brand-500"
              >
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
