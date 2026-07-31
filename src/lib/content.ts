/**
 * Central content model for the site.
 * Editing copy, adding products or industries happens here, not in JSX.
 */

export const site = {
  name: "Growing Chem India",
  legalName: "Growing Chem India Pvt. Ltd.",
  tagline: "Specialty Chemical Distribution",
  since: 2016,
  // Canonical production URL — used for metadata, sitemap and structured data.
  url: "https://growingchemindia.com",
  description:
    "Growing Chem India is a trusted importer and distributor of pigments, additives, minerals and ready-to-use compounds for the plastics, PVC, rubber, paint and printing-ink industries.",
  email: "info@growingchemindia.com",
  phone: "+91 91555 54439",
  phoneHref: "+919155554439",
  phone2: "+91 91555 53242",
  phone2Href: "+919155553242",
  branches: "New Delhi · Patna, India",
  metaBar: "Consistent, batch-tested quality · Serving 11+ states across India",
} as const;

/* Primary navigation. "Categories" scrolls to the categories section on home. */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Categories", href: "/#categories" },
  { label: "Brochure", href: "/brochure" },
  { label: "Upcoming Products", href: "/upcoming-products" },
  { label: "Contact", href: "/contact" },
] as const;

export type Stat = { value: number; suffix?: string; label: string };
export const stats: Stat[] = [
  { value: 10, label: "Years in the trade" },
  { value: 80, suffix: "+", label: "Products & grades" },
  { value: 250, suffix: "+", label: "Clients served" },
  { value: 11, suffix: "+", label: "States covered" },
];

export type Product = {
  slug: string;
  title: string;
  /** Short line used on cards and previews. */
  description: string;
  tags: string;
  icon:
    | "pigment"
    | "polymer"
    | "additive"
    | "plasticizer"
    | "mineral"
    | "specialty";
  /** Detail-page fields. */
  overview: string;
  grades: string[];
  applications: string[];
};

export const products: Product[] = [
  {
    slug: "pigments-dyes",
    title: "Pigments & Dyes",
    description:
      "Organic & inorganic pigments, solvent dyes, pearlescent, fluorescent and carbon black for vivid, stable colour.",
    tags: "Alpha Blue · Red · Green · Solvent Dyes",
    icon: "pigment",
    overview:
      "Colour systems for plastics, inks and coatings. We stock organic and inorganic pigments, solvent and fluorescent dyes, pearlescent effects and carbon black, matched to your shade, dispersion and heat-stability needs.",
    grades: [
      "Alpha Blue 15:1 / 15:3",
      "Alpha Green 7",
      "Alpha Red & Orange",
      "Solvent Dyes",
      "Pearlescent (silver / gold)",
      "Fluorescent pigments",
      "Carbon Black",
    ],
    applications: ["Masterbatch", "PVC pipes & profiles", "Printing inks", "Paints & coatings"],
  },
  {
    slug: "additives",
    title: "Additives",
    description:
      "UV stabilizers (HALS), antioxidants, optical brighteners, processing aids, flame retardants and CPE.",
    tags: "UV · AO · HALS · Brighteners",
    icon: "additive",
    overview:
      "Performance additives that protect and process your polymer. From UV and thermal protection to surface and processing aids, we supply consistent, well-documented grades.",
    grades: [
      "UV Stabilizers (HALS)",
      "Antioxidants (AO series)",
      "Optical Brighteners",
      "Processing Aids",
      "Flame Retardants",
      "CPE",
    ],
    applications: ["Masterbatch", "PVC compounding", "Films & sheets", "Wires & cables"],
  },
  {
    slug: "minerals-fillers",
    title: "Minerals & Fillers",
    description:
      "Coated and uncoated calcium carbonate, titanium dioxide grades, stearates and functional fillers.",
    tags: "CaCO₃ · TiO₂ · Stearates",
    icon: "mineral",
    overview:
      "Functional fillers that improve economics and properties. Coated and uncoated calcium carbonate, titanium dioxide grades and stearates, ready to ship at volume.",
    grades: [
      "CaCO₃ (coated / uncoated)",
      "TiO₂ (rutile grades)",
      "Zinc Stearate",
      "Calcium Stearate",
      "Talc",
    ],
    applications: ["PVC pipes & fittings", "Masterbatch", "Paints", "Rubber"],
  },
  {
    slug: "ready-to-use",
    title: "Ready to Use",
    description:
      "Pre-dispersed masterbatch and ready-mixed compounds that drop straight into your process, with no in-house blending needed.",
    tags: "Colour Masterbatch · Compounds · Blends",
    icon: "specialty",
    overview:
      "Ready-to-use colour masterbatch, additive masterbatch and pre-mixed compounds that simplify dosing and improve batch consistency. Ideal when you want repeatable results straight from the bag.",
    grades: [
      "Colour Masterbatch",
      "White & Black Masterbatch",
      "Additive Masterbatch",
      "Filler Masterbatch",
      "Custom compounds",
    ],
    applications: ["Injection moulding", "Extrusion", "Blow moulding", "Film & sheet"],
  },
  {
    slug: "other-segments",
    title: "Other Segments",
    description:
      "Custom sourcing and additional raw materials beyond our core categories. Tell us what you need and we source it.",
    tags: "Custom sourcing · Specialty imports",
    icon: "specialty",
    overview:
      "Beyond our core categories, we help customers source specialty and hard-to-find raw materials. If you need a product we don't stock, share the specification and we work our supplier network to find the right grade at the right price.",
    grades: [
      "Hard-to-find raw materials",
      "Custom imports",
      "Bulk sourcing",
      "New material trials",
    ],
    applications: ["Across all the industries we serve"],
  },
];

/** Lookup helper for detail pages. */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const industries: string[] = [
  "Plastics & Masterbatch",
  "PVC Pipes & Profiles",
  "Rubber",
  "Paints & Coatings",
  "Printing Inks",
  "Packaging",
  "Footwear",
  "Artificial Leather",
];

/**
 * Products in the pipeline. Placeholder entries. Edit titles, descriptions
 * and `eta` to match what's actually coming, or add/remove items freely.
 */
export type Upcoming = { title: string; description: string; eta: string };
export const upcomingProducts: Upcoming[] = [
  {
    title: "Lead-free PVC Stabilizers (Ca-Zn)",
    description:
      "A fully non-toxic calcium-zinc stabilizer range to help processors move away from lead-based systems.",
    eta: "Coming 2026",
  },
  {
    title: "Ready-to-use Colour Masterbatch",
    description:
      "Pre-dispersed colour and additive masterbatches to simplify dosing and improve batch consistency.",
    eta: "In development",
  },
  {
    title: "Speciality Titanium Dioxide Grades",
    description:
      "Additional rutile TiO₂ grades tuned for opacity and weatherability in demanding outdoor applications.",
    eta: "In development",
  },
];

export type Step = { num: string; title: string; body: string };
export const process: Step[] = [
  {
    num: "01",
    title: "Understand the requirement",
    body: "Share your application, target specs and volumes. We recommend the right grade and share technical data.",
  },
  {
    num: "02",
    title: "Lab trial & trial order",
    body: "Validate performance with samples and a trial batch before you commit to regular quantities.",
  },
  {
    num: "03",
    title: "Regular scheduled supply",
    body: "Once approved, we keep stock aligned to your schedule so your line never waits on material.",
  },
];

export type Testimonial = { quote: string; name: string; role: string };
export const testimonials: Testimonial[] = [
  {
    quote:
      "Grades arrive consistent every single time. That consistency is what keeps our extrusion line stable.",
    name: "Production Head",
    role: "PVC Pipe Manufacturer, Gujarat",
  },
  {
    quote:
      "Responsive team and honest technical advice. They helped us fix a colour drift issue in two days.",
    name: "Purchase Manager",
    role: "Masterbatch Producer, Maharashtra",
  },
  {
    quote:
      "Flexible order sizes and reliable delivery made them our default supplier for additives.",
    name: "Director",
    role: "Footwear Compounder, Delhi NCR",
  },
];

export const heroHighlights = [
  { label: "Pigments & Dyes", value: "60+ shades" },
  { label: "Additives", value: "UV · AO · Stabilizers" },
  { label: "Minerals & Fillers", value: "CaCO₃ · TiO₂" },
];
