import { Reveal } from "./reveal";

const checklist = [
  "Imported and locally sourced raw materials under one roof",
  "Technical guidance and lab-supported product selection",
  "Transparent pricing and flexible order quantities",
];

const tiles = [
  { label: "Quality", pos: "top-6 left-6" },
  { label: "Reliability", pos: "top-[5.2rem] right-6" },
  { label: "Partnership", pos: "top-[9rem] left-10" },
];

export function About() {
  return (
    <section id="about" className="py-[clamp(3.5rem,7vw,6rem)]">
      <div className="mx-auto grid w-[92%] max-w-[1160px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Visual */}
        <Reveal className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-navy-700 to-brand-500 shadow-[var(--shadow-lg)]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.14) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />
          {tiles.map((t) => (
            <span
              key={t.label}
              className={`absolute z-[2] rounded-full border border-white/30 bg-white/15 px-4 py-2 font-[family-name:var(--font-head)] text-[0.9rem] font-semibold text-white backdrop-blur-sm ${t.pos}`}
            >
              {t.label}
            </span>
          ))}
          <div className="absolute bottom-6 left-6 z-[2] flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 shadow-[var(--shadow-soft)]">
            <b className="font-[family-name:var(--font-head)] text-[2rem] leading-none text-brand-500">
              2
            </b>
            <span className="text-[0.82rem] leading-tight text-slatemuted">
              Warehouses
              <br />
              New Delhi &amp; Patna
            </span>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <span className="mb-3.5 inline-block font-[family-name:var(--font-head)] text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-brand-600">
            Who we are
          </span>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.35rem)] font-bold leading-[1.15]">
            A distribution partner built around consistency and trust.
          </h2>
          <p className="mt-4 text-slatemuted">
            Growing Chem India connects global chemical producers with Indian processors and
            manufacturers. From a single trial order to regular scheduled supply, we focus on
            doing the basics right: dependable stock, honest grades and responsive service.
          </p>
          <p className="mt-4 text-slatemuted">
            Our team helps you match the correct grade to your application, so your production
            stays stable batch after batch.
          </p>
          <ul className="mt-6 grid gap-3">
            {checklist.map((item) => (
              <li key={item} className="relative pl-8 font-medium text-ink">
                <span className="absolute left-0 top-0 grid h-[1.3rem] w-[1.3rem] place-items-center rounded-full bg-brand-500/10 text-[0.8rem] font-bold text-brand-600">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
