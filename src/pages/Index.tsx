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
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";

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

const Index = () => {
  const { data: siteSettings } = useSanitySiteSettings();
  const homeFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (siteSettings?.faqs ?? []).slice(0, 2).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: (faq.answer ?? []).join(" ") },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/" jsonLd={[ORG_JSONLD, homeFaqJsonLd]} />
      <Hero />
      <About />
      <VideoSection />
      <Impact />
      <OrimolusiSection />
      <Team startCollapsed />
      <Story />
      <Testimonials />
      <News />
      <Gallery />
      <FAQ limit={2} />
      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
};

export default Index;
