import Link from "next/link";
import { nav, products, site } from "@/lib/content";
import { Brand } from "./brand";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-[#b8c0e2]">
      <div className="mx-auto grid w-[92%] max-w-[1160px] gap-8 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Brand light />
          <p className="mt-4 max-w-[34ch] text-[0.92rem]">
            Importer and distributor of specialty chemicals and raw materials for the plastics,
            PVC, rubber, paint and printing-ink industries.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-[0.95rem] text-white">Products</h4>
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="block py-[0.3rem] text-[0.92rem] transition-colors hover:text-white"
            >
              {p.title}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="mb-4 text-[0.95rem] text-white">Company</h4>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-[0.3rem] text-[0.92rem] transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="mb-4 text-[0.95rem] text-white">Reach us</h4>
          <a href={`mailto:${site.email}`} className="block py-[0.3rem] text-[0.92rem] hover:text-white">
            {site.email}
          </a>
          <a href={`tel:${site.phoneHref}`} className="block py-[0.3rem] text-[0.92rem] hover:text-white">
            {site.phone}
          </a>
          <p className="mt-2.5 text-[0.9rem]">New Delhi · Patna, India</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-[92%] max-w-[1160px] flex-col items-center gap-1 py-[1.1rem] text-center text-[0.85rem] text-[#97a2cc] sm:flex-row sm:justify-between sm:text-left">
          <span>
            © {year} {site.legalName} All rights reserved.
          </span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  );
}
