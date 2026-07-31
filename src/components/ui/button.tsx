import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  base: "inline-flex items-center justify-center gap-2 rounded-full font-[family-name:var(--font-head)] font-semibold text-[0.95rem] px-6 py-3 transition-all duration-150 cursor-pointer",
  primary:
    "bg-brand-500 text-white shadow-[0_8px_20px_-8px_rgba(47,158,65,0.4)] hover:bg-brand-700 hover:-translate-y-0.5",
  ghost:
    "border-[1.5px] border-line text-ink hover:border-brand-500 hover:text-brand-600 hover:-translate-y-0.5",
} as const;

type Variant = keyof Omit<typeof styles, "base">;

function cls(variant: Variant, block?: boolean, extra?: string) {
  return `${styles.base} ${styles[variant]} ${block ? "w-full" : ""} ${extra ?? ""}`;
}

export function ButtonLink({
  variant = "primary",
  block,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  block?: boolean;
  children: ReactNode;
}) {
  return (
    <a className={cls(variant, block, className)} {...props}>
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  block,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  block?: boolean;
  children: ReactNode;
}) {
  return (
    <button className={cls(variant, block, className)} {...props}>
      {children}
    </button>
  );
}
