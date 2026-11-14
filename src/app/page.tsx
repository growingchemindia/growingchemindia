import { About } from "@/components/about";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Products />
      <CtaBand />
    </>
  );
}
