"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Brand } from "./brand";
import { ButtonLink } from "./ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // A nav item is active on its own route and any nested route (e.g. /products/*).
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Lock scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-dark text-[#ccd4ef] text-[0.82rem]">
        <div className="mx-auto w-[92%] max-w-[1160px] flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-3">
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
            <span className="h-3.5 w-px bg-white/20" />
            <a href={`tel:${site.phoneHref}`} className="hover:text-white">
              {site.phone}
            </a>
            <a href={`tel:${site.phone2Href}`} className="hidden sm:inline hover:text-white">
              {site.phone2}
            </a>
          </div>
          <p className="hidden md:block text-[#97a2cc]">{site.metaBar}</p>
        </div>
      </div>

      {/* Header */}
      <header
        id="top"
        className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md backdrop-saturate-150"
      >
        <div className="mx-auto w-[92%] max-w-[1160px] flex items-center gap-6 py-3.5">
          <Brand />

          <nav className="ml-auto hidden lg:flex items-center gap-x-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative py-1 whitespace-nowrap font-[family-name:var(--font-head)] font-medium text-[0.92rem] ${
                  isActive(item.href) ? "text-ink" : "text-slatemuted hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 bg-brand-500 transition-all ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <button
            className="ml-auto lg:hidden flex flex-col gap-[5px] p-1.5"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-0.5 w-6 rounded bg-ink transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 rounded bg-ink transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 rounded bg-ink transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <nav
          className={`lg:hidden overflow-hidden border-t border-line bg-white transition-[max-height] duration-300 ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="mx-auto w-[92%] max-w-[1160px] flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line py-3.5 font-[family-name:var(--font-head)] font-medium last:border-0 ${
                  isActive(item.href) ? "text-brand-600" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/contact" block className="my-3" onClick={() => setOpen(false)}>
              Request a Quote
            </ButtonLink>
          </div>
        </nav>
      </header>
    </>
  );
}
