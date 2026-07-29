import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Impact from "@/components/Impact";
import Team from "@/components/Team";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import OrimolusiSection from "@/components/OrimolusiSection";
import FAQ, { faqs } from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Ijebu Igbo Descendants in Diaspora",
  alternateName: [
    "IID Omo Orimolusi in Diaspora",
    "Ijebu Igbo Descendants Omo Orimolusi",
    "Awa Omo Orimolusi Worldwide",
  ],
  url: "https://ijebuigbodescendants.org",
  logo: "https://ijebuigbodescendants.org/logo.png",
  description:
    "A leading Ijebu Igbo NGO uniting diaspora and Nigeria-based descendants of Ijebu-Igbo, a Yoruba town in Ogun State, Nigeria — promoting culture, welfare and hometown development.",
  foundingDate: "2007",
  areaServed: ["United Kingdom", "Nigeria", "Worldwide"],
  sameAs: ["https://www.ijebuigbodescendants.org/"],
};

const HOME_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.slice(0, 2).map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
  })),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/" jsonLd={[ORG_JSONLD, HOME_FAQ_JSONLD]} />
      <Hero />
      <About />
      <VideoSection />
      <Impact />
      <OrimolusiSection />
      <Team />
      <Story />
      <Testimonials />
      <News />
      <Gallery />
      <FAQ limit={2} />
      <CTA />
      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
};

export default Index;
