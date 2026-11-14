import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { gallery } from "@/lib/content";

const description =
  "A look inside Growing Chem India: our products, lab and operations.";

export const metadata: Metadata = {
  title: "Gallery",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery | Growing Chem India", description, url: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A look inside Growing Chem India"
        breadcrumb={[{ label: "Gallery", href: "/gallery" }]}
      >
        Our products, lab and operations.
      </PageHeader>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-[92%] max-w-[1160px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <Reveal
              key={item.src}
              as="article"
              className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover"
                />
              </div>
              <p className="px-5 py-4 font-[family-name:var(--font-head)] text-[0.95rem] font-medium">
                {item.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
