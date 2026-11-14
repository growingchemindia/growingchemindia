import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { mission, purpose, values } from "@/lib/content";

const description =
  "The purpose, mission and values that guide how Growing Chem India supplies specialty chemicals to Indian manufacturers.";

export const metadata: Metadata = {
  title: "Purpose, Mission & Values",
  description,
  alternates: { canonical: "/purpose" },
  openGraph: {
    title: "Purpose, Mission & Values | Growing Chem India",
    description,
    url: "/purpose",
  },
};

export default function PurposePage() {
  return (
    <>
      <PageHeader
        eyebrow="What drives us"
        title="Purpose, mission & values"
        breadcrumb={[{ label: "Purpose, Mission & Values", href: "/purpose" }]}
      >
        Why we exist, what we set out to do every day, and the principles behind every order we
        ship.
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-[92%] max-w-[1160px] gap-6 md:grid-cols-2">
          {[
            { eyebrow: "Our purpose", body: purpose },
            { eyebrow: "Our mission", body: mission },
          ].map((item) => (
            <Reveal
              key={item.eyebrow}
              as="article"
              className="rounded-[var(--radius-card)] border border-line bg-white p-8"
            >
              <span className="mb-3.5 inline-block font-[family-name:var(--font-head)] text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-brand-600">
                {item.eyebrow}
              </span>
              <p className="text-[1.15rem] font-medium leading-relaxed text-ink">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-tint py-[clamp(3.5rem,7vw,6rem)]">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <SectionHead eyebrow="Our values" title="The principles behind every order" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Reveal
                key={v.title}
                as="article"
                className="rounded-[var(--radius-card)] border border-line bg-white p-7"
              >
                <h3 className="text-[1.15rem] font-semibold">{v.title}</h3>
                <p className="mt-2 text-[0.96rem] text-slatemuted">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
