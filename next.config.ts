import type { NextConfig } from "next";

// Baseline security headers applied to every route.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // "Pigments & Dyes" was split into two categories; keep old links working.
  async redirects() {
    return [
      { source: "/products/pigments-dyes/solvent-dyes", destination: "/products/dyes/solvent-dyes", permanent: true },
      { source: "/products/pigments-dyes/:grade", destination: "/products/pigments/:grade", permanent: true },
      { source: "/products/pigments-dyes", destination: "/products/pigments", permanent: true },
      // Pigments regrouped into families.
      { source: "/products/pigments/pigment-red-yellows", destination: "/products/pigments/azo-pigments", permanent: true },
      { source: "/products/pigments/alpha-:rest", destination: "/products/pigments/phthalocyanine-pigments", permanent: true },
      { source: "/products/pigments/carbon-black", destination: "/products/pigments/black-metallic-pigments", permanent: true },
      { source: "/products/pigments/pearlescent-silver-gold", destination: "/products/pigments/pearl-pigments", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
