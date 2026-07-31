import type { Product } from "@/lib/content";

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ProductIcon({
  name,
  size = 26,
}: {
  name: Product["icon"];
  size?: number;
}) {
  const base = { ...iconBase, width: size, height: size };
  switch (name) {
    case "pigment":
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18M3 12h18" />
        </svg>
      );
    case "polymer":
      return (
        <svg {...base}>
          <path d="M4 7l8-4 8 4v10l-8 4-8-4z" />
          <path d="M12 3v18M4 7l8 4 8-4" />
        </svg>
      );
    case "additive":
      return (
        <svg {...base}>
          <path d="M9 3h6M10 3v6l-5 8a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-5-8V3" />
          <path d="M7.5 15h9" />
        </svg>
      );
    case "plasticizer":
      return (
        <svg {...base}>
          <path d="M3 12h4l2 5 4-14 2 9h6" />
        </svg>
      );
    case "mineral":
      return (
        <svg {...base}>
          <path d="M3 20l6-14 4 8 3-5 5 11z" />
          <path d="M3 20h18" />
        </svg>
      );
    case "specialty":
      return (
        <svg {...base}>
          <path d="M10 2v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V2" />
          <circle cx="12" cy="16" r="1.3" />
        </svg>
      );
  }
}

/**
 * Brand mark echoing the company card: a navy -> green gradient badge
 * with a rising "growth" arrow (the card's swoosh) and molecule dots.
 */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="url(#gci-logo)" />
      {/* rising chart arrow = "growing" */}
      <path
        d="M8 21.5 14 15.5 18 18.5 24 11"
        stroke="#fff"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 11 24 11 24 15.5"
        stroke="#fff"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* molecule dots */}
      <circle cx="9" cy="9.5" r="1.5" fill="#7bc043" />
      <circle cx="13.2" cy="10.6" r="1" fill="#a6e07a" />
      <defs>
        {/* green (bottom-left) into navy (top-right), like the swoosh */}
        <linearGradient id="gci-logo" x1="0" y1="32" x2="32" y2="0">
          <stop stopColor="#2f9e46" />
          <stop offset="1" stopColor="#142257" />
        </linearGradient>
      </defs>
    </svg>
  );
}
