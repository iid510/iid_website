import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown, Users, Images } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import Lightbox, { useLightbox, ZoomableImage } from "@/components/Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

// ── Data ──────────────────────────────────────────────────────────────────

const galleryImages = [
  { src: "/images/oke-agbo/oba-bejeroku-stephen-adekoya.webp", alt: "HRH Oba Stephen Adekoya, The Bejeroku of Oke-Agbo" },
  { src: "/images/oke-agbo/oba-bejeroku-stephen-adekoya-2.webp", alt: "HRH Oba Stephen Adekoya, The Bejeroku of Oke-Agbo, in royal regalia" },
  { src: "/images/oke-agbo/oba-bejeroku-stephen-adekoya-3.webp", alt: "HRH Oba Stephen Adekoya, The Bejeroku of Oke-Agbo, in royal regalia" },
  { src: "/images/oke-agbo/oba-bejeroku-stephen-adekoya-4.webp", alt: "HRH Oba Stephen Adekoya, The Bejeroku of Oke-Agbo, in royal regalia" },
  { src: "/images/oke-agbo/oba-bejeroku-stephen-adekoya-5.webp", alt: "HRH Oba Stephen Adekoya, The Bejeroku of Oke-Agbo, in royal regalia" },
  { src: "/images/oke-agbo/oba-bejeroku-stephen-adekoya-6.webp", alt: "HRH Oba Stephen Adekoya, The Bejeroku of Oke-Agbo, in royal regalia" },
  { src: "/images/oke-agbo/oba-bejeroku-stephen-adekoya-7.webp", alt: "HRH Oba Stephen Adekoya, The Bejeroku of Oke-Agbo, in royal regalia" },
  { src: "/images/oke-agbo/oba-bejeroku-stephen-adekoya-8.webp", alt: "HRH Oba Stephen Adekoya, The Bejeroku of Oke-Agbo, in royal regalia" },
];

const Baales = [
  "Imoogbo", "Torimoguje", "Etemi", "Oshoko", "Etemi Jarad", "Dandola",
  "Fowoseje", "Iyaniwura", "Talaga Akinbambo", "Erilope", "Idagolu",
  "Tiyanbaki", "Talakila", "Titilodo", "Telubomi", "Bolorunduro", "Owolubo",
  "Liwo", "Abude", "Tiluba", "Umupegba Tijeje", "Eganmoro", "Erikekere",
  "Tisaba", "Basorun", "Oke-Owa Talaga", "Temidire", "Obalufon", "Ogunsegun",
  "Lewuodo", "Imepe", "Adekanbi Adeku", "Tabaoku", "Ajebo", "Talokolatan",
  "Ayegbami", "Korede Eseke", "Tamitami", "Temidire Adeku", "Odo Oshun",
  "Apata", "Tilemomu", "Etikeji Daso", "Akitiji Tatewo", "Olorunsogo", "Tilapeni",
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function OkeAgboKingdomPage() {
  const [BaalesOpen, setBaalesOpen] = useState(false);
  const { index, direction, open, close, prev, next } = useLightbox(galleryImages);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/oke-agbo" />

      {/* Hero */}
      <section className="relative min-h-[48vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            Ijebu-Igbo · Oke-Agbo Quarter
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight">
            Oke-Agbo
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Home of the Bejeroku, one of the five founding quarters of Ijebu-Igbo.
          </motion.p>
        </div>
      </section>

      {/* Royal Portrait */}
      <section className="bg-[#f0fbf6] py-10 sm:py-14">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease }} className="text-center max-w-[280px] mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] mb-4">
              <ZoomableImage src={galleryImages[0].src} alt={galleryImages[0].alt} onClick={() => open(0)} />
            </div>
            <h3 className="font-display font-black text-foreground text-lg leading-tight">
              His Royal Highness Oba Stephen Adekoya
            </h3>
            <p className="text-accent font-semibold text-sm mt-1">The Bejeroku of Oke-Agbo, Ijebu Igbo</p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="label-accent mb-2">About</h2>
            <h3 className="heading-section mb-6">About Oke-Agbo</h3>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
            {[
              { icon: Crown, label: "Ruler", value: "Bejeroku" },
              { icon: Users, label: "Baales", value: `${Baales.length} Baales` },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
                <Icon size={20} className="text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="font-bold text-foreground text-sm">{value}</p>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }} className="text-muted-foreground leading-relaxed mb-8">
            Oke-Agbo is one of the five quarters of Ijebu-Igbo, governed under the title Bejeroku, currently held by His Royal Highness Oba Stephen Adekoya. As with the other quarters, Oke-Agbo is home to a network of Baales who administer its constituent villages under the Bejeroku.
          </motion.p>

          {/* Baales */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <button onClick={() => setBaalesOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-4 bg-primary hover:brightness-110 transition-all text-left">
              <div>
                <h4 className="font-display font-black text-accent text-base sm:text-lg">Baales under Bejeroku</h4>
                <p className="text-white/60 text-xs mt-0.5">{Baales.length} villages and communities</p>
              </div>
              <ChevronDown size={20} className={`text-accent shrink-0 transition-transform duration-300 ${BaalesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {BaalesOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }} className="overflow-hidden">
                  <div className="p-5 bg-muted/30 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Baales.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />{b}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mt-8 bg-accent/10 border border-accent/30 rounded-2xl p-5 text-center">
            <p className="text-sm text-foreground/80 leading-relaxed">
              We're still gathering history, chiefs and heritage places for Oke-Agbo. If you have content to share, reach out via the Contact page.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Royal Gallery */}
      <section className="section-padding bg-[#f0fbf6]">
        <div className="container-main max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-10">
            <h2 className="label-accent mb-2">Gallery</h2>
            <h3 className="heading-section flex items-center justify-center gap-2">
              <Images size={26} className="text-accent" /> The Bejeroku in Regalia
            </h3>
            <p className="text-body mt-2">Photos of His Royal Highness Oba Stephen Adekoya, The Bejeroku of Oke-Agbo.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.slice(1).map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease }}
                className="rounded-2xl overflow-hidden border-2 border-white shadow-sm aspect-[3/4]">
                <ZoomableImage src={img.src} alt={img.alt} onClick={() => open(1 + i)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={galleryImages} index={index} direction={direction} onClose={close} onPrev={prev} onNext={next} />

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
