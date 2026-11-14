import type { MetadataRoute } from "next";
import { gradeId, industries, products, site, toGrade } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/products", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "yearly", priority: 0.7 },
    { path: "/purpose", changeFrequency: "yearly", priority: 0.6 },
    { path: "/awards", changeFrequency: "yearly", priority: 0.5 },
    { path: "/gallery", changeFrequency: "monthly", priority: 0.5 },
    { path: "/industries", changeFrequency: "yearly", priority: 0.6 },
    { path: "/brochure", changeFrequency: "yearly", priority: 0.6 },
    { path: "/upcoming-products", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const gradePages: MetadataRoute.Sitemap = products.flatMap((p) =>
    p.grades.map(toGrade).map((g) => ({
      url: `${site.url}/products/${p.slug}/${gradeId(g.name)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${site.url}/industries/${i.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...gradePages, ...industryPages];
}
