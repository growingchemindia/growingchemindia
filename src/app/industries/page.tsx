import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Industries } from "@/components/industries";
import { PageHeader } from "@/components/page-header";

const description =
  "Our materials serve plastic, paint, ink, detergent and garden pipe manufacturers, plus rubber, footwear and other applications.";

export const metadata: Metadata = {
  title: "Industries",
  description,
  alternates: { canonical: "/industries" },
  openGraph: { title: "Industries | Growing Chem India", description, url: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader eyebrow="Where our materials go" title="Industries we supply">
        From PVC pipes to printing inks, our raw materials go into the products that Indian
        manufacturers make every day.
      </PageHeader>
      <Industries />
      <CtaBand />
    </>
  );
}
