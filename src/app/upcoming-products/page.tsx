import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { upcomingProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Upcoming Products | Growing Chem India",
  description:
    "A look at what's next from Growing Chem India: new grades and product lines in our pipeline.",
};

export default function UpcomingProductsPage() {
  return (
    <>
      <PageHeader eyebrow="What's next" title="Upcoming products">
        New grades and product lines we&apos;re adding to the range. Register your interest and
        we&apos;ll let you know the moment they&apos;re available.
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-[92%] max-w-[1160px] gap-6 sm:grid-cols-2">
          {upcomingProducts.map((item) => (
            <Reveal
              key={item.title}
              as="article"
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-7"
            >
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 font-[family-name:var(--font-head)] text-[0.75rem] font-semibold uppercase tracking-wide text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {item.eta}
              </span>
              <h2 className="text-[1.2rem] font-semibold">{item.title}</h2>
              <p className="mt-2 text-[0.96rem] text-slatemuted">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 w-[92%] max-w-[1160px] text-[0.9rem] text-muted">
          Details and timelines are indicative and may change as products move through
          development.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
