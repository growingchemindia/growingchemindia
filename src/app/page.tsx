import { About } from "@/components/about";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { Industries } from "@/components/industries";
import { Process } from "@/components/process";
import { Products } from "@/components/products";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Products />
      <Industries />
      <Process />
      <Testimonials />
      <CtaBand />
    </>
  );
}
