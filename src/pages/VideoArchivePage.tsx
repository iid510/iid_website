import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import EventVideos from "@/components/EventVideos";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import BackToTop from "@/components/BackToTop";
import FloatingContact from "@/components/FloatingContact";
import { motion } from "framer-motion";
import { useSanityPage } from "@/hooks/useSanityPage";
import { VIDEOS_PAGE } from "@/data/pageContent";

export default function VideoArchivePage() {
  const { data: page } = useSanityPage("videos", VIDEOS_PAGE);
  const hero = page?.hero ?? VIDEOS_PAGE.hero!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/videos" />

      {/* Hero */}
      <section className="relative min-h-[38vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Video archive component */}
      <EventVideos />

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
