"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, type NavItem } from "@/lib/content";
import { Brand } from "./brand";
import { ButtonLink } from "./ui/button";

const menuLinkClass =
  "block rounded-lg px-3.5 py-2.5 whitespace-nowrap font-[family-name:var(--font-head)] text-[0.9rem] font-medium hover:bg-tint";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // A nav item is active on its own route and any nested route (e.g. /products/*).
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // A dropdown is active when any of its child pages is the current route.
  const isGroupActive = (item: NavItem) =>
    isActive(item.href) || !!item.children?.some((c) => pathname === c.href);

  // Dropdowns open on hover/focus, so drop focus after a click to close them.
  const closeMenus = () => (document.activeElement as HTMLElement | null)?.blur();

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

          <nav className="ml-auto hidden lg:flex items-center gap-x-4 xl:gap-x-6">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href} className="group/dd relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    className={`group relative flex items-center gap-1 py-1 whitespace-nowrap font-[family-name:var(--font-head)] font-medium text-[0.92rem] ${
                      isGroupActive(item) ? "text-ink" : "text-slatemuted hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <svg
                      aria-hidden
                      viewBox="0 0 12 12"
                      className="h-3 w-3 transition-transform group-hover/dd:rotate-180 group-focus-within/dd:rotate-180"
                    >
                      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      className={`absolute left-0 -bottom-0.5 h-0.5 bg-brand-500 transition-all ${
                        isGroupActive(item) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>

                  {/* Dropdown panel: opens on hover or keyboard focus */}
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover/dd:visible group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:opacity-100">
                    <div className="min-w-[15rem] rounded-xl border border-line bg-white p-2 shadow-[var(--shadow-soft)]">
                      {item.children.map((child) =>
                        child.children ? (
                          // Second level: hovering a category opens its products to the right.
                          <div key={child.href} className="group/sub relative">
                            <Link
                              href={child.href}
                              onClick={closeMenus}
                              className={`${menuLinkClass} flex items-center justify-between gap-4 ${
                                pathname === child.href ? "text-brand-600" : "text-ink"
                              }`}
                            >
                              {child.label}
                              <span aria-hidden className="text-muted">›</span>
                            </Link>
                            <div className="invisible absolute left-full top-0 pl-2 opacity-0 transition-all duration-150 group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100">
                              <div className="min-w-[15rem] rounded-xl border border-line bg-white p-2 shadow-[var(--shadow-soft)]">
                                {child.children.map((leaf) => (
                                  <Link
                                    key={leaf.href}
                                    href={leaf.href}
                                    onClick={closeMenus}
                                    className={`${menuLinkClass} text-ink`}
                                  >
                                    {leaf.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMenus}
                            className={`${menuLinkClass} ${
                              pathname === child.href ? "text-brand-600" : "text-ink"
                            }`}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
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
              )
            )}
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
          className={`lg:hidden border-t border-line bg-white transition-[max-height] duration-300 ${
            open ? "max-h-[calc(100vh-5rem)] overflow-y-auto" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="mx-auto w-[92%] max-w-[1160px] flex flex-col py-2">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href} className="border-b border-line py-2">
                  <p className="py-1.5 font-[family-name:var(--font-head)] font-medium text-ink">
                    {item.label}
                  </p>
                  {item.children.map((child) =>
                    child.children ? (
                      // Categories expand in place to show their products.
                      <details key={child.href} className="group/m">
                        <summary className="flex cursor-pointer list-none items-center justify-between py-2 pl-4 font-[family-name:var(--font-head)] text-[0.95rem] text-slatemuted [&::-webkit-details-marker]:hidden">
                          {child.label}
                          <span aria-hidden className="pr-1 transition-transform group-open/m:rotate-90">›</span>
                        </summary>
                        <div className="pb-1 pl-8">
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 text-[0.9rem] font-medium text-brand-600"
                          >
                            View all {child.label}
                          </Link>
                          {child.children.map((leaf) => (
                            <Link
                              key={leaf.href}
                              href={leaf.href}
                              onClick={() => setOpen(false)}
                              className="block py-1.5 text-[0.9rem] text-slatemuted"
                            >
                              {leaf.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={`block py-2 pl-4 font-[family-name:var(--font-head)] text-[0.95rem] ${
                          pathname === child.href ? "text-brand-600" : "text-slatemuted"
                        }`}
                      >
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              ) : (
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
              )
            )}
            <ButtonLink href="/contact" block className="my-3" onClick={() => setOpen(false)}>
              Request a Quote
            </ButtonLink>
          </div>
        </nav>
      </header>
    </>
  );
}
