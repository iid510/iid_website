import { motion } from "framer-motion";
import { ExternalLink, FileText, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FAQ from "@/components/FAQ";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { JOIN_PAGE } from "@/data/pageContent";

const MEMBERSHIP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSejhZ_ZdpF96hIxB-543SGzxij5Hzspq9dJQ_XgdFAA6hv3ww/viewform?usp=dialog";
const MEMBERSHIP_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSejhZ_ZdpF96hIxB-543SGzxij5Hzspq9dJQ_XgdFAA6hv3ww/viewform?embedded=true";

export default function JoinPage() {
  const { data: siteSettings } = useSanitySiteSettings();
  const { data: page } = useSanityPage("join", JOIN_PAGE);
  const hero = page?.hero ?? JOIN_PAGE.hero!;
  const beforeApply = findSection(page?.sections, "join-beforeApply") ?? findSection(JOIN_PAGE.sections, "join-beforeApply");
  const formHeader = findSection(page?.sections, "join-formHeader") ?? findSection(JOIN_PAGE.sections, "join-formHeader");
  const joinFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (siteSettings?.faqs ?? []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: (faq.answer ?? []).join(" ") },
    })),
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Navbar />
      <Seo path="/join" jsonLd={joinFaqJsonLd} />

      {/* Hero */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative min-h-[320px] md:min-h-[380px] flex flex-col items-center justify-center px-4 py-14">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary/90 to-primary/75" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4f6f8] to-transparent z-10" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Users size={14} />
              {hero.eyebrow}
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
              {hero.title}
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-20">

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-6 mb-8 shadow-sm"
        >
          <h2 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
            <FileText size={18} className="text-accent" />
            {beforeApply?.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              "IID Code of Conduct",
              "IID Constitution Index",
              "IID Constitution",
            ].map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-2.5 bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm font-semibold text-foreground"
              >
                <FileText size={15} className="text-accent shrink-0" />
                {doc}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {beforeApply?.body?.[0]}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
        >
          <div className="p-6 sm:p-8 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="font-display font-bold text-foreground text-lg">{formHeader?.heading ?? "Membership Application Form"}</h2>
            <a
              href={MEMBERSHIP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors shrink-0"
            >
              Open in a new tab <ExternalLink size={14} />
            </a>
          </div>
          <iframe
            src={MEMBERSHIP_FORM_EMBED_URL}
            title="IID Membership Application Form"
            className="w-full border-0"
            style={{ height: "1400px" }}
          >
            Loading application form…
          </iframe>
        </motion.div>
      </div>

      <FAQ />
      <Footer />
    </div>
  );
}
