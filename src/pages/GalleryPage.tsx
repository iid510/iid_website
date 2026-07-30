import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { motion } from "framer-motion";
import { useSanityPage } from "@/hooks/useSanityPage";
import { GALLERY_PAGE } from "@/data/pageContent";

export default function GalleryPage() {
  const { data: page } = useSanityPage("gallery", GALLERY_PAGE);
  const hero = page?.hero ?? GALLERY_PAGE.hero!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/gallery" />

      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative h-52 md:h-64 flex flex-col items-center justify-center">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center px-4"
          >
            <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase block mb-2">
              {hero.eyebrow}
            </span>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl">
              {hero.title}
            </h1>
            <p className="text-white/70 text-sm sm:text-base mt-2 max-w-lg mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <Gallery />
      <Footer />
    </div>
  );
}
