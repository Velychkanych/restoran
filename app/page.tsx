import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollRuler from "@/components/effects/ScrollRuler";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Water from "@/components/sections/Water";
import UseCases from "@/components/sections/UseCases";
import Facts from "@/components/sections/Facts";
import Plans from "@/components/sections/Plans";
import Build from "@/components/sections/Build";
import Location from "@/components/sections/Location";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollRuler />
      <Hero />
      <Marquee />
      <About />
      <Water />
      <UseCases />
      <Facts />
      <Plans />
      <Build />
      <Location />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}
