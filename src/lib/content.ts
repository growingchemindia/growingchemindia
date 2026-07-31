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
  grades: Grade[];
  applications: string[];
};

/**
 * A grade shown on the category detail page. Use a plain string for a
 * name-only card, or an object to attach a thumbnail photo and/or an
 * openable file (a datasheet PDF or a shade-card image in public/downloads).
 */
export type Grade =
  | string
  | {
      name: string;
      image?: string;
      /** File opened in a new tab when the card is clicked. */
      file?: string;
      fileType?: "pdf" | "image";
    };

type NormalisedGrade = {
  name: string;
  image?: string;
  file?: string;
  fileType?: "pdf" | "image";
};

/** Normalises a grade to an object for rendering. */
export function toGrade(g: Grade): NormalisedGrade {
  return typeof g === "string" ? { name: g } : g;
}

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
      { name: "Alpha Blue 15:1 / 15:3", image: "/grades/alpha-blue.webp" },
      { name: "Alpha Green 7", image: "/grades/alpha-green.jpg" },
      { name: "Pigment Red & Yellows", image: "/grades/pigment-red.jpg" },
      { name: "Solvent Dyes", image: "/grades/dyes.jpg" },
      { name: "Pearlescent (silver / gold)", image: "/grades/pearlescent.jpg" },
      { name: "Fluorescent pigments", image: "/grades/fluorescent.jpg" },
      { name: "Carbon Black", image: "/grades/carbon-black.jpg" },
    ],
    applications: ["Masterbatch", "PVC pipes & profiles", "Printing inks", "Paints & coatings"],
  },
  {
    slug: "additives",
    title: "Additives",
    description:
      "Optical brighteners (OB-1), clarifying agents, UV stabilizers (HALS), antioxidants, processing aids and flame retardants.",
    tags: "OB-1 · Clarifiers · UV · HALS",
    icon: "additive",
    overview:
      "Performance additives that protect and process your polymer. From optical brighteners and clarifying agents to UV and thermal protection and processing aids, we supply consistent, well-documented grades.",
    grades: [
      { name: "Optical Brighteners", image: "/grades/optical-brightener.jpg" },
      {
        name: "Optical Brightener OB-1 (GC L7)",
        image: "/grades/optical-brightener-ob1.jpg",
        file: "/downloads/optical-brightener-gc-l7.pdf",
        fileType: "pdf",
      },
      { name: "Clarifying Agents", image: "/grades/clarifying-agents.webp" },
      { name: "UV Stabilizers (HALS)", image: "/grades/white-powder.jpg" },
      { name: "Antioxidants (AO series)", image: "/grades/lab.jpg" },
      { name: "Processing Aids", image: "/grades/white-powder.jpg" },
      { name: "Flame Retardants", image: "/grades/flame.jpg" },
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
      { name: "CaCO₃ (coated / uncoated)", image: "/categories/minerals-fillers.jpg" },
      { name: "TiO₂ (rutile grades)", image: "/grades/white-powder.jpg" },
      { name: "Zinc Stearate", image: "/grades/white-powder.jpg" },
      { name: "Calcium Stearate", image: "/categories/minerals-fillers.jpg" },
      { name: "Talc", image: "/grades/white-powder.jpg" },
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
      {
        name: "Garden Pipe Shade Card",
        image: "/downloads/garden-pipe-shade-card.jpg",
        file: "/downloads/garden-pipe-shade-card.jpg",
        fileType: "image",
      },
      { name: "Colour Masterbatch", image: "/grades/pellets-colored.jpg" },
      { name: "White & Black Masterbatch", image: "/grades/white-black-masterbatch.jpg" },
      { name: "Additive Masterbatch", image: "/grades/pellets-natural.jpg" },
      { name: "Filler Masterbatch", image: "/grades/filler-masterbatch.jpg" },
      { name: "Custom compounds", image: "/grades/pellets-colored.jpg" },
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
      {
        name: "Detergent Segment Brochure",
        image: "/grades/detergent.jpg",
        file: "/downloads/detergent-brochure.pdf",
        fileType: "pdf",
      },
      { name: "Hard-to-find raw materials", image: "/categories/other-segments.jpg" },
      { name: "Custom imports", image: "/categories/other-segments.jpg" },
      { name: "Bulk sourcing", image: "/categories/other-segments.jpg" },
      { name: "New material trials", image: "/grades/lab.jpg" },
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
    role: "Masterbatch Producer, Assam",
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
