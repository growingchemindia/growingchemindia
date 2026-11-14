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
      { source: "/products/pigments-dyes/solvent-dyes", destination: "/products/dyes/solvent-dye", permanent: true },
      { source: "/products/pigments-dyes/:grade", destination: "/products/pigments/:grade", permanent: true },
      { source: "/products/pigments-dyes", destination: "/products/pigments", permanent: true },
      { source: "/products/additives/optical-brighteners", destination: "/products/additives/optical-brightener-gc-l1", permanent: true },
      { source: "/products/additives/optical-brightener-ob-1-gc-l7", destination: "/products/additives/optical-brightener-1-gc-l7", permanent: true },
      { source: "/products/additives/antioxidant-ao-series", destination: "/products/additives/anti-oxidant-ao-series", permanent: true },
      { source: "/products/additives/antioxidants-ao-series", destination: "/products/additives/anti-oxidant-ao-series", permanent: true },
      { source: "/products/additives/uv-stabilizers-hals", destination: "/products/additives/uv-stabilizer-hals", permanent: true },
      { source: "/products/additives/processing-aids", destination: "/products/additives/processing-aid", permanent: true },
      { source: "/products/additives/slip-additives", destination: "/products/additives/slip-additive", permanent: true },
      { source: "/products/additives/pe-pp-waxes", destination: "/products/additives/pe-pp-wax", permanent: true },
      { source: "/products/pigments/azo-pigments", destination: "/products/pigments/azo-pigment", permanent: true },
      { source: "/products/pigments/inorganic-pigments", destination: "/products/pigments/inorganic-pigment", permanent: true },
      { source: "/products/pigments/fluorescent-pigments", destination: "/products/pigments/fluorescent-pigment", permanent: true },
      { source: "/products/pigments/black-metallic-pigments", destination: "/products/pigments/black-metallic-pigment", permanent: true },
      { source: "/products/pigments/pearl-pigments", destination: "/products/pigments/pearl-pigment", permanent: true },
      { source: "/products/pigments/phthalocyanine-pigments", destination: "/products/pigments/phthalocyanine-pigment", permanent: true },
      { source: "/products/dyes/solvent-dyes", destination: "/products/dyes/solvent-dye", permanent: true },
      { source: "/products/dyes/acid-dyes", destination: "/products/dyes/acid-dye", permanent: true },
      { source: "/products/dyes/basic-dyes", destination: "/products/dyes/basic-dye", permanent: true },
      { source: "/products/minerals-fillers/tio-rutile-grades", destination: "/products/minerals-fillers/tio-rutile-grade", permanent: true },
      { source: "/products/ready-to-use/custom-compounds", destination: "/products/ready-to-use/custom-compound", permanent: true },
      { source: "/products/other-segments/hard-to-find-raw-materials", destination: "/products/other-segments/hard-to-find-raw-material", permanent: true },
      { source: "/products/other-segments/custom-imports", destination: "/products/other-segments/custom-import", permanent: true },
      { source: "/products/other-segments/new-material-trials", destination: "/products/other-segments/new-material-trial", permanent: true },
      { source: "/products/additives/clarifying-agents", destination: "/products/additives/clarifying-agent-polyclear", permanent: true },
      // Pigments regrouped into families.
      { source: "/products/pigments/pigment-red-yellows", destination: "/products/pigments/azo-pigment", permanent: true },
      { source: "/products/pigments/alpha-:rest", destination: "/products/pigments/phthalocyanine-pigment", permanent: true },
      { source: "/products/pigments/carbon-black", destination: "/products/pigments/black-metallic-pigment", permanent: true },
      { source: "/products/pigments/pearlescent-silver-gold", destination: "/products/pigments/pearl-pigment", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
