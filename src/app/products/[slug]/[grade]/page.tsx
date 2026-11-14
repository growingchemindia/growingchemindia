import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { ShadeGrid } from "@/components/shade-grid";
import { getGrade, gradeDescription, gradeId, products, toGrade } from "@/lib/content";

type Params = Promise<{ slug: string; grade: string }>;

/** Pre-render a static page for every product in every category. */
export function generateStaticParams() {
  return products.flatMap((p) =>
    p.grades.map(toGrade).map((g) => ({ slug: p.slug, grade: gradeId(g.name) }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, grade } = await params;
  const found = getGrade(slug, grade);
  if (!found) return { title: "Product not found" };
  const { product, grade: g } = found;
  const description = gradeDescription(product, g);
  const path = `/products/${slug}/${grade}`;
  return {
    title: `${g.name} | ${product.title}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${g.name} | Growing Chem India`,
      description,
      url: path,
      images: [{ url: g.image ?? `/categories/${slug}.jpg`, alt: g.name }],
    },
  };
}

export default async function GradePage({ params }: { params: Params }) {
  const { slug, grade } = await params;
  const found = getGrade(slug, grade);
  if (!found) notFound();
  const { product, grade: g } = found;

  const path = `/products/${slug}/${grade}`;
  const image = g.image ?? `/categories/${slug}.jpg`;
  const siblings = product.grades.map(toGrade).filter((x) => x.name !== g.name);

  return (
    <>
      <ProductJsonLd
        name={g.name}
        description={gradeDescription(product, g)}
        slug={slug}
        path={path}
        image={image}
        category={product.title}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.title, path: `/products/${slug}` },
          { name: g.name, path },
        ]}
      />
      <PageHeader
        eyebrow={product.title}
        title={g.name}
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: product.title, href: `/products/${slug}` },
        ]}
      >
        {product.description}
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-[92%] max-w-[1160px] items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-line">
            <Image
              src={image}
              alt={g.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-[1.5rem] font-bold">Overview</h2>
            <p className="mt-3 text-[1.05rem] text-slatemuted">{gradeDescription(product, g)}</p>

            <h3 className="mt-8 font-[family-name:var(--font-head)] text-[0.82rem] font-semibold uppercase tracking-wide text-muted">
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

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 font-[family-name:var(--font-head)] text-[0.9rem] font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Enquire about this product
              </Link>
              {g.file ? (
                <a
                  href={g.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-2.5 font-[family-name:var(--font-head)] text-[0.9rem] font-semibold text-ink transition-colors hover:border-brand-500"
                >
                  {g.fileType === "pdf" ? "Download datasheet (PDF)" : "View shade card"}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {g.shades?.length ? (
        <section className="pb-[clamp(3rem,6vw,5rem)]">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <h2 className="mb-2 text-[1.5rem] font-bold">Shade range</h2>
            <p className="mb-6 text-slatemuted">
              {g.shades.length} shades available in {g.name.toLowerCase()}.
            </p>
            <ShadeGrid shades={g.shades} />
          </div>
        </section>
      ) : null}

      {siblings.length ? (
        <section className="bg-tint py-[clamp(2.5rem,5vw,4rem)]">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <h2 className="mb-6 text-[1.3rem] font-bold">More in {product.title}</h2>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {siblings.map((s) => (
                <li key={s.name}>
                  <Link
                    href={`/products/${slug}/${gradeId(s.name)}`}
                    className="group block h-full overflow-hidden rounded-[14px] border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={s.image ?? `/categories/${slug}.jpg`}
                        alt={s.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 260px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="px-3.5 py-3 font-[family-name:var(--font-head)] text-[0.9rem] font-medium leading-snug">
                      {s.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
