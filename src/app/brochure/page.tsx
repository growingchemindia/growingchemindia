import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/content";

const description =
  "Download the Growing Chem India product brochure, or request a copy by email.";

export const metadata: Metadata = {
  title: "Brochure",
  description,
  alternates: { canonical: "/brochure" },
  openGraph: { title: "Brochure | Growing Chem India", description, url: "/brochure" },
};

// Drop the PDF at public/brochure.pdf and this link works. Until then it 404s.
const BROCHURE_URL = "/brochure.pdf";

export default function BrochurePage() {
  return (
    <>
      <PageHeader eyebrow="Company brochure" title="Download our brochure">
        A single PDF with our product divisions, grades and applications, handy to share with
        your team.
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <div className="grid items-center gap-10 rounded-[var(--radius-card)] border border-line bg-tint p-[clamp(1.5rem,4vw,3rem)] md:grid-cols-[1fr_1.2fr]">
            {/* Document mock */}
            <div className="mx-auto w-full max-w-[280px]">
              <div className="relative aspect-[3/4] rounded-xl bg-gradient-to-br from-navy-700 to-brand-600 p-6 shadow-[var(--shadow-lg)]">
                <div className="font-[family-name:var(--font-head)] text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand-200">
                  Product Brochure
                </div>
                <div className="mt-3 font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold leading-tight text-white">
                  Growing Chem India
                </div>
                <div className="mt-auto space-y-2 pt-8">
                  <span className="block h-2 w-4/5 rounded bg-white/25" />
                  <span className="block h-2 w-3/5 rounded bg-white/20" />
                  <span className="block h-2 w-2/3 rounded bg-white/15" />
                </div>
              </div>
            </div>

            {/* Copy + actions */}
            <div>
              <h2 className="text-[1.5rem] font-bold">Growing Chem India Product Brochure</h2>
              <p className="mt-3 max-w-[52ch] text-slatemuted">
                Everything in one place: pigment &amp; dye, additive, mineral &amp; filler,
                ready-to-use compound and more, with typical applications for each.
              </p>

              <div className="mt-7 flex flex-wrap gap-3.5">
                <a
                  href={BROCHURE_URL}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-[family-name:var(--font-head)] text-[0.95rem] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                  </svg>
                  Download PDF
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-line px-6 py-3 font-[family-name:var(--font-head)] text-[0.95rem] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-600"
                >
                  Request by email
                </Link>
              </div>

              <p className="mt-5 text-[0.9rem] text-muted">
                Prefer a specific product sheet? Email{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
                  {site.email}
                </a>{" "}
                and we&apos;ll send it across.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
