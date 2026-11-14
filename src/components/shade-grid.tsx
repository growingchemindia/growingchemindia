import type { Shade } from "@/lib/content";
import { Reveal } from "./reveal";

/**
 * Colour range as swatch cards: the masstone fills the card, with the 1:5 tint
 * as a band along the bottom when the shade has one.
 */
export function ShadeGrid({ shades }: { shades: Shade[] }) {
  const hasTints = shades.some((s) => s.tint);

  return (
    <div>
      {hasTints ? (
        <div className="mb-5 flex items-center gap-5 text-[0.82rem] text-slatemuted">
          <span className="flex items-center gap-2">
            <span className="h-3 w-5 rounded-sm bg-ink" /> Masstone
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-5 rounded-sm bg-ink/35" /> 1:5 Tint
          </span>
        </div>
      ) : null}

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shades.map((s) => (
          <Reveal
            key={s.name}
            as="li"
            className="overflow-hidden rounded-[14px] border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="flex aspect-[4/3] flex-col border-b border-line">
              <div className="flex-1" style={{ background: s.masstone }} />
              {s.tint ? (
                <div className="h-[28%] border-t border-white/60" style={{ background: s.tint }} />
              ) : null}
            </div>
            <div className="px-3.5 py-3">
              <p className="font-[family-name:var(--font-head)] text-[0.88rem] font-medium leading-snug">
                {s.name}
              </p>
              {s.ci ? <p className="mt-0.5 text-[0.78rem] text-muted">C.I. {s.ci}</p> : null}
            </div>
          </Reveal>
        ))}
      </ul>

      <p className="mt-6 text-[0.85rem] text-muted">
        Swatches are indicative screen colours. Actual shade depends on the polymer, loading and
        process. Ask us for a shade card or sample.
      </p>
    </div>
  );
}
