import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";

/**
 * Category card that leads with the category photo (public/categories/<slug>.jpg).
 * Used on the home categories section and the /products listing.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-soft)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={`/categories/${product.slug}.jpg`}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-[1.16rem] font-semibold">{product.title}</h3>
        <p className="text-[0.96rem] text-slatemuted">{product.description}</p>
        <span className="mt-4 block font-[family-name:var(--font-head)] text-[0.8rem] font-medium text-muted">
          {product.tags}
        </span>
        <span className="mt-5 inline-flex items-center gap-1.5 font-[family-name:var(--font-head)] text-[0.85rem] font-semibold text-brand-600">
          View details
          <svg
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
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
        </span>
      </div>
    </Link>
  );
}
