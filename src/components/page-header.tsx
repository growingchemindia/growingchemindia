import Link from "next/link";
import type { ReactNode } from "react";

/** Navy hero band shown at the top of interior pages. */
export function PageHeader({
  eyebrow,
  title,
  children,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <section className="bg-dark text-white">
      <div className="mx-auto w-[92%] max-w-[1160px] py-[clamp(2.75rem,5vw,4.5rem)]">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-[0.82rem] text-[#a6b0da]">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          {breadcrumb?.map((b) => (
            <span key={b.href} className="flex items-center gap-2">
              <span className="text-white/30">/</span>
              <Link href={b.href} className="hover:text-white">
                {b.label}
              </Link>
            </span>
          ))}
        </nav>
        <span className="mb-3 inline-block font-[family-name:var(--font-head)] text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-brand-200">
          {eyebrow}
        </span>
        <h1 className="max-w-[20ch] text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-[1.12]">
          {title}
        </h1>
        {children ? (
          <p className="mt-4 max-w-[60ch] text-[1.05rem] text-[#c7cdea]">{children}</p>
        ) : null}
      </div>
    </section>
  );
}
