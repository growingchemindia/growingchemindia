import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { awards } from "@/lib/content";

const description =
  "Awards, achievements and milestones from Growing Chem India's journey in specialty chemical distribution.";

export const metadata: Metadata = {
  title: "Awards & Achievements",
  description,
  alternates: { canonical: "/awards" },
  openGraph: { title: "Awards & Achievements | Growing Chem India", description, url: "/awards" },
};

export default function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our journey"
        title="Awards & achievements"
        breadcrumb={[{ label: "Awards & Achievements", href: "/awards" }]}
      >
        Milestones we&apos;re proud of, earned by keeping our customers&apos; production lines
        running.
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-[92%] max-w-[1160px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((item) => (
            <Reveal
              key={item.title}
              as="article"
              className="flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-7"
            >
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 font-[family-name:var(--font-head)] text-[0.75rem] font-semibold uppercase tracking-wide text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {item.year}
              </span>
              <h2 className="text-[1.2rem] font-semibold">{item.title}</h2>
              <p className="mt-2 text-[0.96rem] text-slatemuted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
