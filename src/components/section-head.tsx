import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  children,
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-11 max-w-[640px] ${className}`}>
      <span className="mb-3.5 inline-block font-[family-name:var(--font-head)] text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-brand-600">
        {eyebrow}
      </span>
      <h2
        className={`text-[clamp(1.6rem,3.2vw,2.35rem)] font-bold leading-[1.15] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <p className={`mt-2.5 text-[1.05rem] ${light ? "text-[#a6b0da]" : "text-slatemuted"}`}>
          {children}
        </p>
      ) : null}
    </div>
  );
}
