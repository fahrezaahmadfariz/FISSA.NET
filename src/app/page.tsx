import About from "@/components/About";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import Installation from "@/components/Installation";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import Promo from "@/components/Promo";
import RegistrationForm from "@/components/RegistrationForm";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <div className="site-stage">
        <main>
          <HeroSlider />
          <Marquee />
          <About />
          <Promo />
          <Packages />
          <RegistrationForm />
          <Installation />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
      <WhatsAppFloat />
    </>
  );
}
