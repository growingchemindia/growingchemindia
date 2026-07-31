import { site } from "@/lib/content";

/** Renders a JSON-LD <script> block. Data is trusted (built from our content). */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide Organization schema (rendered once in the root layout). */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        logo: `${site.url}/logo.png`,
        image: `${site.url}/og.png`,
        description: site.description,
        email: site.email,
        telephone: [site.phone, site.phone2],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          addressCountry: "IN",
        },
        areaServed: "IN",
        foundingDate: String(site.since),
      }}
    />
  );
}

/** BreadcrumbList schema for interior pages. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.path}`,
        })),
      }}
    />
  );
}

/** Product schema for category detail pages. */
export function ProductJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image: `${site.url}/categories/${slug}.jpg`,
        category: name,
        brand: { "@type": "Brand", name: site.name },
        url: `${site.url}/products/${slug}`,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          seller: { "@type": "Organization", name: site.legalName },
        },
      }}
    />
  );
}
