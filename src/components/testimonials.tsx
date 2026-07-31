import { testimonials } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-tint py-[clamp(3.5rem,7vw,6rem)]">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead eyebrow="In their words" title="What our clients say" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal
              key={t.name + t.role}
              as="article"
              className="rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-soft)]"
            >
              <blockquote className="relative pt-6 text-[1rem] text-ink before:absolute before:-left-1 before:-top-2 before:font-serif before:text-[3rem] before:leading-none before:text-brand-500/35 before:content-['\201C']">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 grid gap-0.5">
                <b className="font-[family-name:var(--font-head)] text-[0.95rem]">{t.name}</b>
                <span className="text-[0.85rem] text-muted">{t.role}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
