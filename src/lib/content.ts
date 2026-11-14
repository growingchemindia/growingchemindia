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
    "Growing Chem India is a trusted importer and distributor of pigment, additive, mineral and ready-to-use compound for the plastics, PVC, rubber, paint and printing-ink industries.",
  email: "info@growingchemindia.com",
  phone: "+91 91555 54439",
  phoneHref: "+919155554439",
  phone2: "+91 91555 53242",
  phone2Href: "+919155553242",
  // WhatsApp number for the floating chat button: country code + number, digits only.
  whatsapp: "919155554439",
  whatsappMessage: "Hi, I'd like to enquire about your products.",
  branches: "New Delhi · Patna, India",
  metaBar: "Consistent, batch-tested quality · Serving 11+ states across India",
} as const;


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
/**
 * One colour in a shade range. `masstone` and `tint` are any CSS background
 * (a hex colour, or a gradient for pearl and metallic effects). Colours are
 * indicative screen approximations, not colour standards.
 */
export type Shade = { name: string; masstone: string; tint?: string; ci?: string };

/** Builds shades from [name, masstone, tint?] rows to keep the lists compact. */
const shades = (rows: [string, string, string?][]): Shade[] =>
  rows.map(([name, masstone, tint]) => ({ name, masstone, tint }));

const sheen = (light: string, dark: string) =>
  `linear-gradient(135deg, ${light} 0%, ${dark} 50%, ${light} 100%)`;

export type Grade =
  | string
  | {
      name: string;
      image?: string;
      /** Shown on the product's own page; falls back to the category overview. */
      description?: string;
      /** Colour range shown as swatches on the product's page. */
      shades?: Shade[];
      /** Brand or trade name shown on the product's page. */
      brand?: string;
      /** Link to an existing page instead of giving this item its own product page. */
      href?: string;
      /** Datasheet or shade card offered for download on the product page. */
      file?: string;
      fileType?: "pdf" | "image";
    };

type NormalisedGrade = {
  name: string;
  image?: string;
  description?: string;
  shades?: Shade[];
  brand?: string;
  href?: string;
  file?: string;
  fileType?: "pdf" | "image";
};

/** URL of a product's page: its own page, or the shared page it points to. */
export function gradeHref(slug: string, g: NormalisedGrade) {
  return g.href ?? `/products/${slug}/${gradeId(g.name)}`;
}

/** Grades that get their own page under /products/<slug>/<grade>. */
export function ownPageGrades(product: Product) {
  return product.grades.map(toGrade).filter((g) => !g.href);
}

/** URL slug for a product (grade), e.g. "Alpha Green 7" -> "alpha-green-7". */
export function gradeId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Normalises a grade to an object for rendering. */
export function toGrade(g: Grade): NormalisedGrade {
  return typeof g === "string" ? { name: g } : g;
}

export const products: Product[] = [
  {
    slug: "pigments",
    title: "Pigment",
    description:
      "Azo, inorganic, fluorescent, pearl, phthalocyanine and black & metallic pigment for vivid, stable colour.",
    tags: "Azo · Inorganic · Fluorescent · Pearl · Metallic",
    icon: "pigment",
    overview:
      "Colour systems for plastics, inks and coatings. We stock organic and inorganic pigment, fluorescent and pearlescent effects and carbon black, matched to your shade, dispersion and heat-stability needs.",
    grades: [
      {
        name: "Azo Pigment",
        image: "/grades/pigment-red.jpg",
        description:
          "Organic azo pigment in bright yellows, oranges, reds and violets. A cost-effective choice for masterbatch, plastics, printing inks and coatings where strong, clean shades matter.",
        shades: shades([
          ["Pigment Red 53:1", "#d7262b", "#e8736d"],
          ["Pigment Red 48:2", "#c8233a", "#e07a99"],
          ["Pigment Red 57:1", "#b5174a", "#dd7fa0"],
          ["Pigment Red 48:3", "#d32f2f", "#e88a8f"],
          ["Pigment Red 254", "#e0251b", "#ec7468"],
          ["Pigment Red 242", "#d9361f", "#ee8270"],
          ["Pigment Red 122", "#c2185b", "#e48fb5"],
          ["Pigment Red 112", "#d42a2a", "#ea8484"],
          ["Pigment Violet 19", "#b0275f", "#d98aab"],
          ["Pigment Violet 23", "#3f2a73", "#8a7ab8"],
          ["Pigment Violet 27", "#4b3a91", "#9688c4"],
          ["Pigment Yellow 12", "#f6c500", "#f7e08a"],
          ["Pigment Yellow 13", "#f5bf00", "#f6dc85"],
          ["Pigment Yellow 14", "#f8c90a", "#f8e397"],
          ["Pigment Yellow 17", "#f9d71c", "#faeaa8"],
          ["Pigment Yellow 83", "#e9a613", "#f2d38a"],
          ["Pigment Yellow 151", "#f6cf12", "#f7e6a0"],
          ["Pigment Yellow 180", "#f4c400", "#f6df8c"],
          ["Pigment Yellow 191", "#f2b705", "#f5d98a"],
          ["Pigment Orange 13", "#ec6a1f", "#f2a072"],
          ["Pigment Orange HGR", "#e85f24", "#f09a74"],
          ["Pigment Orange 34", "#ee6b1d", "#f3a46f"],
          ["Pigment Orange 64", "#e4552a", "#ef916f"],
        ]),
      },
      {
        name: "Inorganic Pigment",
        image: "/categories/pigments.jpg",
        description:
          "Inorganic pigment for opacity, heat stability and weather resistance: iron oxide, ultramarines, bismuth vanadate, chrome yellows and titanium dioxide.",
        shades: shades([
          ["Pigment Yellow 34 (Middle)", "#f2a91e", "#f4cd7c"],
          ["Pigment Yellow 34 (Lemon)", "#f5dc1b", "#f6eaa0"],
          ["Pigment Red 104 (Scarlet)", "#e2492a", "#ec8a70"],
          ["Pigment Red Oxide 110", "#a8392a", "#cf8a7e"],
          ["Pigment Red Oxide 120", "#9e3426", "#c98378"],
          ["Pigment Red Oxide 130", "#8f2f24", "#c27c72"],
          ["Pigment Yellow Oxide 313", "#d9a033", "#ebcf8e"],
          ["Pigment Ultramarine Blue", "#1f3fa8", "#7e95d6"],
          ["Ultramarine Violet", "#6a4a9c", "#ad97cf"],
          ["Bismuth Yellow Vanadate", "#f3dc1e", "#f6eba1"],
          ["Titanium Dioxide (Rutile)", "#fbfbf8", "#ffffff"],
          ["Titanium Dioxide (Anatase)", "#ffffff", "#ffffff"],
        ]),
      },
      {
        name: "Fluorescent Pigment",
        image: "/grades/fluorescent.jpg",
        description:
          "High-visibility fluorescent pigment for plastics, inks and coatings that need vivid, eye-catching colour.",
        shades: shades([
          ["Fluorescent Yellow", "#e9ff1f"],
          ["Fluorescent Orange", "#ff6a13"],
          ["Fluorescent Chrome", "#ff9a1a"],
          ["Fluorescent Magenta", "#ff1f8e"],
          ["Fluorescent Red", "#ff2a2a"],
          ["Fluorescent Pink", "#ff4fa3"],
          ["Fluorescent Green", "#3cff3c"],
        ]),
      },
      {
        name: "Black & Metallic Pigment",
        image: "/grades/carbon-black.jpg",
        description:
          "Speciality carbon blacks for deep jetness, and metallic pigment for silver, gold, copper and bronze effects.",
        shades: shades([
          ["Speciality Black Marvel 1000", "#111113"],
          ["Speciality Black Nexa Black", "#0b0b0d"],
          ["Silver Pigment", sheen("#f2f3f4", "#9da3a8")],
          ["Gold Pigment", sheen("#f9e39a", "#b8862b")],
          ["Copper Pigment", sheen("#eab08b", "#9c4f26")],
          ["Bronze Pigment", sheen("#dbb47d", "#7a5426")],
        ]),
      },
      {
        name: "Pearl Pigment",
        image: "/grades/pearlescent.jpg",
        description:
          "Pearlescent pigment that adds a soft lustre and colour-shifting sheen to plastics, coatings and inks.",
        shades: shades([
          ["Silver Pearl 100", sheen("#fafafa", "#cfd3d6")],
          ["Silver Pearl 120", sheen("#f6f6f6", "#c4c8cc")],
          ["Silver Pearl 163", sheen("#f2f2f2", "#babfc4")],
          ["Gold Pearl 300", sheen("#f6e9c4", "#d4b26a")],
          ["Gold Pearl", sheen("#f3e3b5", "#c9a258")],
          ["Bronze Pearl 500", sheen("#efc79b", "#a8703a")],
          ["Copper Pearl 502", sheen("#f4c6a6", "#b5653b")],
          ["Wine Red Pearl 540", sheen("#d99aa5", "#7d2337")],
        ]),
      },
      {
        name: "Phthalocyanine Pigment",
        image: "/grades/alpha-blue.webp",
        description:
          "Phthalocyanine blues and greens with excellent colour strength, light fastness and heat stability.",
        shades: shades([
          ["Alpha Blue 15:1", "#1a4fa0", "#7f9fd2"],
          ["Alpha Blue 15:3", "#0f5ca8", "#78a8d8"],
          ["Alpha Green 7", "#00745c", "#6fb7a4"],
        ]),
      },
    ],
    applications: ["Masterbatch", "PVC pipes & profiles", "Printing inks", "Paints & coatings"],
  },
  {
    slug: "dyes",
    title: "Dye",
    description:
      "Solvent, acid and basic dye for bright colour in plastics, inks, textiles, leather and paper.",
    tags: "Solvent · Acid · Basic",
    icon: "pigment",
    overview:
      "Solvent dye for transparent and bright shades in plastics, masterbatch and printing inks, selected for solubility, heat stability and colour strength.",
    grades: [
      {
        name: "Solvent Dye",
        image: "/grades/dyes.jpg",
        description:
          "Polymer-soluble solvent dye for transparent, brilliant shades in plastics, masterbatch and inks. Available across yellows, oranges, reds, violets, blues, greens and browns.",
        shades: shades([
          ["Solvent Yellow 93", "#f4b120", "#f7d78a"],
          ["Solvent Yellow 98", "#f0a924", "#f3cf8e"],
          ["Solvent Yellow 114", "#f6d81c", "#f7e9a2"],
          ["Solvent Yellow 133", "#f2ad2a", "#f9c628"],
          ["Solvent Yellow 147", "#f2ae28", "#f8c52a"],
          ["Solvent Yellow 192", "#ef9e2e", "#f6c22c"],
          ["Solvent Orange 60", "#e1583a", "#ea8a5c"],
          ["Solvent Red 41", "#e45b3c", "#ed7a4a"],
          ["Solvent Red 63", "#e0292e", "#e8323a"],
          ["Solvent Red 135", "#d6302f", "#e8706b"],
          ["Solvent Red 111", "#e05436", "#e47a5a"],
          ["Solvent Red 195", "#e2583b", "#ea8a5a"],
          ["Solvent Red 212", "#d9302e", "#e8706a"],
          ["Solvent Violet 49", "#3e5fa6", "#6a6db0"],
          ["Solvent Violet 59", "#3d5aa3", "#6b6aae"],
          ["Solvent Blue 45", "#1a7fc0", "#4fa3d4"],
          ["Solvent Blue 104", "#1676ba", "#109bd6"],
          ["Solvent Blue 122", "#0f68b0", "#3c88c4"],
          ["Solvent Green 3", "#36a660", "#5fbb86"],
          ["Solvent Green 28", "#2f9a58", "#62bb88"],
          ["Solvent Brown 53", "#e0583a", "#da7040"],
          ["Solvent Brown 70", "#c45f45", "#d67644"],
        ]),
      },
      {
        name: "Acid Dye",
        description:
          "Water-soluble anionic dye for bright, level shades on nylon, wool, silk and leather, and in paper and water-based inks.",
        shades: [
          { name: "Acid Orange II", ci: "Acid Orange 7", masstone: "#f26b1d" },
          { name: "Acid Scarlet 3R", ci: "Acid Red 18", masstone: "#e0262f" },
          { name: "Acid Fast Red A", ci: "Acid Red 88", masstone: "#c8202f" },
          { name: "Acid Scarlet G", ci: "Acid Red 97", masstone: "#d7312b" },
          { name: "Acid Red 2B", ci: "Acid Red 249", masstone: "#c3203c" },
          { name: "Acid Red 3BN", ci: "Acid Red 131", masstone: "#b81e4a" },
          { name: "Acid Metanil Yellow", ci: "Acid Yellow 36", masstone: "#f3b81f" },
          { name: "Acid Yellow 5GN", ci: "Acid Yellow 110", masstone: "#f2dc2a" },
          { name: "Acid Yellow 42", ci: "Acid Yellow 42", masstone: "#f0c02a" },
          { name: "Acid Blue S5R", ci: "Acid Red 113", masstone: "#a8264a" },
          { name: "Acid Violet 4BS", ci: "Acid Violet 17", masstone: "#6b3fa0" },
          { name: "Acid Red 10B", ci: "Acid Violet 54", masstone: "#8e2d6a" },
          { name: "Acid Red Scarlet MOO", ci: "Acid Red 73", masstone: "#e2302a" },
        ],
      },
      {
        name: "Basic Dye",
        description:
          "Cationic dye with very high colour strength and brilliance, used for acrylic fibres, paper, leather and printing inks. Available as powder and liquid.",
        shades: [
          { name: "Methylene Blue 2B", ci: "Basic Blue 9", masstone: "#1f5fa8" },
          { name: "Victoria Blue B", ci: "Basic Blue 26", masstone: "#2a4fa0" },
          { name: "Methyl Violet 2B", ci: "Basic Violet 1", masstone: "#5b2a8c" },
          { name: "Magenta", ci: "Basic Violet 14", masstone: "#c01a72" },
          { name: "Rhodamine B", ci: "Basic Violet 10", masstone: "#e0297a" },
          { name: "Rhodamine 6G", ci: "Basic Red 1", masstone: "#f0446a" },
          { name: "Auramine O", ci: "Basic Yellow 2", masstone: "#f5d21c" },
          { name: "Chrysoidine Y", ci: "Basic Orange 2", masstone: "#e8701f" },
          { name: "Malachite Green", ci: "Basic Green 4", masstone: "#138a5c" },
          { name: "Brilliant Green", ci: "Basic Green 1", masstone: "#19a86a" },
          { name: "Bismarck Brown", ci: "Basic Brown 1", masstone: "#8a4a24" },
          { name: "Bismarck Black", masstone: "#1b1b1d" },
        ],
      },
    ],
    applications: ["Masterbatch", "Transparent plastics", "Printing inks"],
  },
  {
    slug: "additives",
    title: "Additive",
    description:
      "Optical brightener, clarifying agent, UV stabilizer, antioxidant, processing aid, slip additive, wax and anti-moisture powder.",
    tags: "OB-1 · UV · Antioxidant · Slip · Wax",
    icon: "additive",
    overview:
      "Performance additive that protects and processes your polymer. From optical brightener and clarifying agent to UV and thermal protection and processing aid, we supply consistent, well-documented grades.",
    grades: [
      { name: "Optical Brightener (GC - L1)", image: "/grades/optical-brightener.jpg" },
      {
        name: "Optical Brightener 1 (GC L7)",
        image: "/grades/optical-brightener-ob1.jpg",
        file: "/downloads/optical-brightener-gc-l7.pdf",
        fileType: "pdf",
      },
      {
        name: "OB for Detergent",
        brand: "CB SX",
        description:
          "Optical brightener for detergent powders, cakes and bars, giving washed fabrics a brighter, whiter look.",
      },
      {
        name: "PVC Garden Pipe",
        image: "/downloads/garden-pipe-shade-card.jpg",
        href: "/industries/garden-pipe",
      },
      { name: "Clarifying Agent (Polyclear)", image: "/grades/clarifying-agents.webp" },
      { name: "UV Stabilizer (HALS)", image: "/grades/white-powder.jpg" },
      { name: "Anti-oxidant (AO series)", image: "/grades/lab.jpg" },
      { name: "Processing Aid", image: "/grades/white-powder.jpg" },
      {
        name: "Slip Additive",
        description:
          "Lower surface friction on films and moulded parts for easier handling, winding and de-moulding. Erucamide and oleamide types available.",
      },
      {
        name: "Zinc & Calcium Stearate",
        description:
          "Lubricants, release agent and acid scavengers for polyolefins, PVC and rubber processing.",
      },
      {
        name: "PE & PP Wax",
        description:
          "Polyethylene and polypropylene wax that improves flow, dispersion and surface finish in plastics, masterbatch, rubber and printing inks.",
      },
      {
        name: "Anti-Moisture Powder (Anti-Damp)",
        description:
          "Moisture-absorbing additive that removes trapped moisture during processing, preventing bubbles, voids and silver streaks. Especially useful with recycled and filled plastics.",
      },
    ],
    applications: ["Masterbatch", "PVC compounding", "Films & sheets", "Wires & cables"],
  },
  {
    slug: "minerals-fillers",
    title: "Mineral & Filler",
    description:
      "Coated and uncoated calcium carbonate, titanium dioxide grades, stearate and functional fillers.",
    tags: "CaCO₃ · TiO₂ · Stearate",
    icon: "mineral",
    overview:
      "Functional filler that improves economics and properties. Coated and uncoated calcium carbonate, titanium dioxide grades and stearate, ready to ship at volume.",
    grades: [
      { name: "CaCO₃ (coated / uncoated)", image: "/categories/minerals-fillers.jpg" },
      { name: "TiO₂ (rutile grade)", image: "/grades/white-powder.jpg" },
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
      "Pre-dispersed masterbatch and ready-mixed compound that drops straight into your process, with no in-house blending needed.",
    tags: "Colour Masterbatch · Compound · Blends",
    icon: "specialty",
    overview:
      "Ready-to-use colour masterbatch, additive masterbatch and pre-mixed compound that simplifies dosing and improve batch consistency. Ideal when you want repeatable results straight from the bag.",
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
      { name: "Custom compound", image: "/grades/pellets-colored.jpg" },
    ],
    applications: ["Injection moulding", "Extrusion", "Blow moulding", "Film & sheet"],
  },
  {
    slug: "other-segments",
    title: "Other Segment",
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
      { name: "Hard-to-find raw material", image: "/categories/other-segments.jpg" },
      { name: "Custom import", image: "/categories/other-segments.jpg" },
      { name: "Bulk sourcing", image: "/categories/other-segments.jpg" },
      { name: "New material trial", image: "/grades/lab.jpg" },
    ],
    applications: ["Across all the industries we serve"],
  },
];

/** Lookup helper for detail pages. */

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Looks up a single product (grade) inside a category by its URL slug. */
export function getGrade(slug: string, grade: string) {
  const product = getProduct(slug);
  const g = product && ownPageGrades(product).find((x) => gradeId(x.name) === grade);
  return product && g ? { product, grade: g } : undefined;
}

/** Product page copy: the grade's own description, or a placeholder from its category. */
export function gradeDescription(product: Product, g: NormalisedGrade) {
  return (
    g.description ??
    `${g.name} is part of our ${product.title} range. ${product.overview}`
  );
}

/* Industries we serve. Each gets its own page at /industries/<slug>.
 * `products` lists the category slugs we supply to that industry. */
export type Industry = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  image: string;
  uses: string[];
  products: string[];
};
export const industries: Industry[] = [
  {
    slug: "plastic",
    title: "Plastic Polymer Additive",
    summary: "Colour, additive and filler for masterbatch, moulding, film and packaging.",
    overview:
      "Plastics processors and masterbatch producers rely on us for pigment, additive, mineral and ready-to-use compounds. We help match the right grade to your polymer and process, so colour and performance stay consistent batch after batch.",
    image: "/grades/pellets-colored.jpg",
    uses: ["Masterbatch", "Injection moulding", "Film & packaging", "Footwear", "Artificial leather"],
    products: ["pigments", "dyes", "additives", "minerals-fillers", "ready-to-use"],
  },
  {
    slug: "paint",
    title: "Paint",
    summary: "Pigment, TiO₂ and filler for decorative and industrial paints and coatings.",
    overview:
      "For paints and coatings we supply organic and inorganic pigment, rutile TiO₂ grades and mineral filler, chosen for opacity, colour strength and weatherability.",
    image: "/categories/pigments.jpg",
    uses: ["Decorative paints", "Industrial coatings", "Primers", "Distempers"],
    products: ["pigments", "minerals-fillers", "additives"],
  },
  {
    slug: "ink",
    title: "Ink",
    summary: "Pigment and dye with the strength and dispersion printing inks need.",
    overview:
      "Printing-ink makers use our pigment, solvent dye and fluorescent colours for vivid, stable shades with good dispersion and print performance.",
    image: "/grades/dyes.jpg",
    uses: ["Printing inks", "Packaging inks", "Solvent-based inks"],
    products: ["pigments", "dyes", "additives"],
  },
  {
    slug: "detergent",
    title: "Detergent",
    summary: "Optical brightener and raw materials for detergent powders and cakes.",
    overview:
      "We support detergent manufacturers with optical brightener and other raw materials for powders, cakes and bars. See our detergent segment brochure for the full range.",
    image: "/grades/detergent.jpg",
    uses: ["Detergent powder", "Detergent cake & bar", "Washing products"],
    products: ["additives", "other-segments"],
  },
  {
    slug: "garden-pipe",
    title: "PVC Garden Pipe",
    summary: "Colours, stabilizer and filler for PVC garden pipes and profiles.",
    overview:
      "PVC pipe and profile extruders use our pigment, additive, filler and ready-to-use compounds. Our garden pipe shade card shows the colours we supply.",
    image: "/downloads/garden-pipe-shade-card.jpg",
    uses: ["Garden pipes", "Flexible hoses", "Braided pipes"],
    products: ["pigments", "additives", "minerals-fillers", "ready-to-use"],
  },
  {
    slug: "other-applications",
    title: "Other Application",
    summary: "Rubber, footwear, artificial leather and custom sourcing for other industries.",
    overview:
      "Beyond our core industries, we serve rubber, footwear and artificial leather makers, and source hard-to-find raw materials and custom imports on request.",
    image: "/categories/other-segments.jpg",
    uses: ["Rubber", "Footwear", "Artificial leather", "Custom sourcing"],
    products: ["other-segments", "additives", "minerals-fillers"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

/* Primary navigation. Defined after `products` and `industries` so the Products dropdown can list them.
 * Items with `children` render as a dropdown in the header, nested up to two levels. */
export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavItem[];
};
export const nav: readonly NavItem[] = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Overview", href: "/" },
      { label: "Purpose, Mission & Values", href: "/purpose" },
      { label: "Awards & Achievements", href: "/awards" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      // Category, then its individual products (linked to their card on the category page).
      ...products.map((p) => ({
        label: p.title,
        href: `/products/${p.slug}`,
        children: p.grades.map(toGrade).map((g) => ({
          label: g.name,
          href: gradeHref(p.slug, g),
        })),
      })),
      { label: "Upcoming Products", href: "/upcoming-products" },
    ],
  },
  {
    label: "Industries We Serve",
    href: "/industries",
    children: [
      { label: "All Industries", href: "/industries" },
      ...industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })),
    ],
  },
  { label: "Contact", href: "/contact" },
];

/**
 * Products in the pipeline. Placeholder entries. Edit titles, descriptions
 * and `eta` to match what's actually coming, or add/remove items freely.
 */
export type Upcoming = { title: string; description: string; eta: string };
export const upcomingProducts: Upcoming[] = [
  {
    title: "Lead-free PVC Stabilizer (Ca-Zn)",
    description:
      "A fully non-toxic calcium-zinc stabilizer range to help processors move away from lead-based systems.",
    eta: "Coming 2026",
  },
  {
    title: "Ready-to-use Colour Masterbatch",
    description:
      "Pre-dispersed colour and additive masterbatch to simplify dosing and improve batch consistency.",
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
      "Flexible order sizes and reliable delivery made them our default supplier for additive.",
    name: "Director",
    role: "Footwear Compounder, Delhi NCR",
  },
];

export const heroHighlights = [
  { label: "Pigment", value: "60+ shades" },
  { label: "Additive", value: "UV · AO · Stabilizer" },
  { label: "Mineral & Filler", value: "CaCO₃ · TiO₂" },
];

/* Purpose, mission and values. Drafted from the About copy; refine as needed. */
export const purpose =
  "To keep Indian manufacturing lines running smoothly by supplying the right chemistry, consistently, batch after batch.";
export const mission =
  "To connect global chemical producers with Indian processors and manufacturers, and to do the basics right: dependable stock, honest grades and responsive service, from a single trial order to regular scheduled supply.";
export type Value = { title: string; body: string };
export const values: Value[] = [
  {
    title: "Quality",
    body: "Batch-tested grades that match their datasheets, so your production stays stable.",
  },
  {
    title: "Reliability",
    body: "Stock held in New Delhi and Patna and aligned to your schedule, so your line never waits on material.",
  },
  {
    title: "Transparency",
    body: "Clear pricing, honest technical advice and flexible order quantities.",
  },
  {
    title: "Partnership",
    body: "Lab-supported product selection and long-term relationships over one-off sales.",
  },
];

/* Awards and achievements. Built from milestones already on the site; add formal awards here. */
export type Award = { title: string; body: string; year: string };
export const awards: Award[] = [
  {
    title: "Founded in New Delhi",
    body: "Growing Chem India starts as an importer and distributor of specialty chemicals.",
    year: String(site.since),
  },
  {
    title: "Second warehouse in Patna",
    body: "Stock held in New Delhi and Patna to serve customers across North and East India faster.",
    year: "Milestone",
  },
  {
    title: "250+ clients served",
    body: "Processors and manufacturers in plastics, PVC, rubber, paint and printing ink rely on our supply.",
    year: "Milestone",
  },
  {
    title: "80+ products and grades",
    body: "A range spanning pigment and dye, additive, mineral and filler, and ready-to-use compounds.",
    year: "Milestone",
  },
  {
    title: "Serving 11+ states",
    body: "Regular scheduled supply to customers across more than eleven Indian states.",
    year: "Milestone",
  },
  {
    title: "A decade in the trade",
    body: "Ten years of consistent, batch-tested quality and long-term customer relationships.",
    year: String(site.since + 10),
  },
];

/* Gallery photos. Currently product imagery from the site; swap in warehouse, team and event photos. */
export type GalleryItem = { caption: string; src: string };
export const gallery: GalleryItem[] = [
  { caption: "Pigment", src: "/categories/pigments.jpg" },
  { caption: "Dye", src: "/categories/dyes.jpg" },
  { caption: "Additive", src: "/categories/additives.jpg" },
  { caption: "Mineral & Filler", src: "/categories/minerals-fillers.jpg" },
  { caption: "Ready-to-use compound", src: "/categories/ready-to-use.jpg" },
  { caption: "Quality lab", src: "/grades/lab.jpg" },
  { caption: "Colour masterbatch", src: "/grades/pellets-colored.jpg" },
  { caption: "Pearlescent pigment", src: "/grades/pearlescent.jpg" },
  { caption: "Fluorescent pigment", src: "/grades/fluorescent.jpg" },
  { caption: "Other segment", src: "/categories/other-segments.jpg" },
];
