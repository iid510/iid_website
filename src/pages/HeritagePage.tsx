import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import Story from "@/components/Story";
import Timeline from "@/components/Timeline";
import RulingHierarchy from "@/components/RulingHierarchy";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, MapPin } from "lucide-react";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { useSanityTowns, type Town } from "@/hooks/useSanityTowns";
import { HERITAGE_PAGE } from "@/data/pageContent";

const DISPLAY_ORDER = ["ojowo", "japara", "atikori", "oke-sopen", "oke-agbo", "imope-ijebu", "aparaki"];

const TOWN_CARD_STYLE: Record<string, { color: string; location: string; descriptor: string }> = {
  "ojowo": { color: "from-blue-700 to-blue-500", location: "Ojowo Quarter, Ijebu-Igbo", descriptor: "History · Chiefs · Anthem · Calendar" },
  "japara": { color: "from-rose-700 to-rose-500", location: "Japara Quarter, Ijebu-Igbo", descriptor: "History · Chiefs · Oriki · Past Rulers" },
  "atikori": { color: "from-purple-700 to-purple-500", location: "Atikori Quarter, Ijebu-Igbo", descriptor: "Oloritun · Heritage Places · Anthem" },
  "oke-sopen": { color: "from-amber-700 to-amber-500", location: "Oke-Sopen Quarter, Ijebu-Igbo", descriptor: "Past Rulers Since 1886" },
  "oke-agbo": { color: "from-emerald-700 to-emerald-500", location: "Oke-Agbo Quarter, Ijebu-Igbo", descriptor: "Baales of Oke-Agbo" },
  "imope-ijebu": { color: "from-cyan-700 to-cyan-500", location: "Imope-Ijebu Town, Ijebu-Igbo", descriptor: "Royal Profile" },
  "aparaki": { color: "from-orange-700 to-orange-500", location: "Aparaki Town, Ijebu-Igbo", descriptor: "Royal Profile" },
};

function TownCard({ town, index }: { town: Town; index: number }) {
  const style = TOWN_CARD_STYLE[town.slug] ?? TOWN_CARD_STYLE["oke-sopen"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/${town.slug}`}
        className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
      >
        <div className={`relative h-36 bg-gradient-to-br ${style.color} flex items-center justify-center overflow-hidden`}>
          {town.rulerPhoto && (
            <img
              src={town.rulerPhoto}
              alt={town.rulerTitle ?? town.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
            />
          )}
          <div className="relative z-10 text-center px-4">
            <Crown size={28} className="text-white mx-auto mb-1" />
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Town Oba</p>
            <h4 className="text-white font-display font-black text-xl">{town.name}</h4>
            <p className="text-white/70 text-xs mt-1">{town.rulerTitle} of {town.name}</p>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin size={11} /> {style.location}
            </p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              {style.descriptor}
            </p>
          </div>
          <ArrowRight size={18} className="text-accent shrink-0 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function HeritagePage() {
  const { data: page } = useSanityPage("heritage", HERITAGE_PAGE);
  const hero = page?.hero ?? HERITAGE_PAGE.hero!;
  const townProfilesHeader = findSection(page?.sections, "townProfiles-header") ?? findSection(HERITAGE_PAGE.sections, "townProfiles-header");
  const { data: towns = [] } = useSanityTowns();
  const orderedTowns = DISPLAY_ORDER
    .map((slug) => towns.find((t) => t.slug === slug))
    .filter((t): t is Town => Boolean(t));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/heritage" />

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

      <RulingHierarchy />

      {/* Town Profiles */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="label-accent mb-2">{townProfilesHeader?.eyebrow}</h2>
            <h3 className="heading-section">{townProfilesHeader?.heading}</h3>
            <p className="text-body mt-2">{townProfilesHeader?.body?.[0]}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {orderedTowns.map((town, index) => (
              <TownCard key={town.slug} town={town} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Story />
      <Timeline />
      <Footer />
    </div>
  );
}
