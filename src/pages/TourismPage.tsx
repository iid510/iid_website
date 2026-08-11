import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { useSanityPlaces } from "@/hooks/useSanityPlaces";
import type { Place } from "@/data/places";
import { useSanityTownBySlug } from "@/hooks/useSanityTowns";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { TOURISM_PAGE } from "@/data/pageContent";

const ease = [0.16, 1, 0.3, 1] as const;

function PlaceCard({ place, index }: { place: Place; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={place.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* Image */}
        <div className="relative md:w-1/2 h-56 sm:h-72 md:h-auto md:min-h-[300px] overflow-hidden">
          <ImageWithSkeleton
            src={place.image}
            alt={place.name}
            className="w-full h-full"
            imgClassName="object-cover"
            fallback={<MapPin className="w-16 h-16 text-primary/20" />}
          />
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent to-card/20 pointer-events-none`}
          />
          {/* Badge */}
          {place.badge && (
            <span
              className={`absolute top-4 ${isEven ? "left-4" : "right-4"} px-3 py-1 text-xs font-bold rounded-full shadow ${place.badgeColor}`}
            >
              {place.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-5 sm:p-7 lg:p-10 flex flex-col justify-center">
          {place.subtitle && (
            <p className="label-accent mb-2">{place.subtitle}</p>
          )}
          <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground mb-1">
            {place.name}
          </h2>

          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
            <MapPin size={13} className="shrink-0" />
            <span>{place.location}</span>
          </div>

          <div className="space-y-3">
            {place.description.map((para, i) => (
              <p key={i} className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {place.quote && (
            <blockquote className="mt-5 border-l-4 border-accent pl-4 text-foreground font-semibold italic text-sm sm:text-base">
              "{place.quote}"
            </blockquote>
          )}

          {place.mapLink && (
            <a
              href={place.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 min-h-[44px] text-accent hover:text-accent/80 font-semibold text-sm transition-colors touch-manipulation"
            >
              <MapPin size={15} />
              View on Google Maps
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TourismPage() {
  const { data: places = [] } = useSanityPlaces();
  const { data: atikori } = useSanityTownBySlug("atikori");
  const { data: page } = useSanityPage("tourism", TOURISM_PAGE);
  const hero = page?.hero ?? TOURISM_PAGE.hero!;
  const anthemHeader = findSection(page?.sections, "anthem-header") ?? findSection(TOURISM_PAGE.sections, "anthem-header");
  const anthemVerses = atikori?.anthem ?? [];
  const quarters = atikori?.subdivisionGroups?.[0]?.items ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/tourism" />

      {/* Hero */}
      <section className="relative min-h-[42vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Places */}
      <section className="section-padding">
        <div className="container-main space-y-8 sm:space-y-12">
          {places.map((place, index) => (
            <PlaceCard key={place.id} place={place} index={index} />
          ))}
        </div>
      </section>

      {/* Atikori Anthem */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-8"
          >
            <p className="label-accent mb-2">{anthemHeader?.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-primary-foreground">
              {anthemHeader?.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm"
          >
            {anthemVerses[0] && (
              <p className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center whitespace-pre-line italic">
                {anthemVerses[0]}
              </p>
            )}

            {quarters.length > 0 && (
              <>
                <div className="my-7 flex items-center justify-center gap-3">
                  <span className="h-px w-12 bg-accent/50" />
                  <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">The Quarters</span>
                  <span className="h-px w-12 bg-accent/50" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                  {quarters.map((q) => (
                    <div
                      key={q}
                      className="bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl py-2.5 px-2 text-center"
                    >
                      <span className="font-display font-bold text-primary-foreground text-sm uppercase tracking-wide">{q}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {anthemVerses[1] && (
              <p className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center whitespace-pre-line italic">
                {anthemVerses[1]}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
