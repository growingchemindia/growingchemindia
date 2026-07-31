import type { Metadata } from "next";
import { About } from "@/components/about";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Process } from "@/components/process";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = {
  title: "About | Growing Chem India",
  description:
    "Growing Chem India is a distribution partner for specialty chemicals, built around consistency, honest grades and responsive service.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Who we are" title="A partner built around consistency and trust">
        We connect global chemical producers with Indian processors and manufacturers, from a
        single trial order to regular scheduled supply.
      </PageHeader>
      <About />
      <Stats />
      <Process />
      <Testimonials />
      <CtaBand />
    </>
  );
}
