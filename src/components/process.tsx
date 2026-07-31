import { process } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function Process() {
  return (
    <section id="process" className="bg-dark py-[clamp(3.5rem,7vw,6rem)] text-[#d6dbf1]">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          light
          eyebrow="How we work"
          title="A simple, three-step supply relationship"
        >
          No guesswork. We move from understanding your requirement to steady, scheduled supply.
        </SectionHead>
        <div className="grid gap-6 md:grid-cols-3">
          {process.map((step) => (
            <Reveal
              key={step.num}
              className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-7"
            >
              <span className="mb-3 block font-[family-name:var(--font-head)] text-[2.2rem] font-extrabold text-[#7bc043]">
                {step.num}
              </span>
              <h3 className="mb-2 text-[1.16rem] font-semibold text-white">{step.title}</h3>
              <p className="text-[0.96rem] text-[#a6b0da]">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
