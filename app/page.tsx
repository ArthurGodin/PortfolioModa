import { ThemeToggle } from "@/components/ThemeToggle";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Manifesto from "@/components/Manifesto";
import Featured from "@/components/Featured";
import Reels from "@/components/Reels";
import Services from "@/components/Services";
import Lookbook from "@/components/Lookbook";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <ThemeToggle
        variant="appbar"
        appBarProps={{
          appName: "Angélica Dantas",
          links: [
            { label: "Sobre", href: "#about" },
            { label: "Reels", href: "#reels" },
            { label: "Serviços", href: "#services" },
            { label: "Cases", href: "#portfolio" },
            { label: "Contato", href: "#contact" },
          ],
        }}
      >
        <main className="relative flex w-full flex-col pt-[68px]">
          <Hero />
          <About />
          <Manifesto />
          <Featured />
          <Reels />
          <Services />
          <Lookbook />
          <Process />
          <Portfolio />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </ThemeToggle>
    </>
  );
}
