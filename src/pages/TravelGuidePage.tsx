import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plane, Car, MapPin, Phone, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import { useSanityTravelGuidePage } from "@/hooks/useSanityTravelGuidePage";
import { resolveIcon } from "@/lib/iconMap";

const ease = [0.16, 1, 0.3, 1] as const;

export default function TravelGuidePage() {
  const { data } = useSanityTravelGuidePage();
  const FLIGHTS = data?.flights ?? [];
  const ROAD_OPTIONS = data?.roadOptions ?? [];
  const WHAT_TO_BRING = data?.whatToBring ?? [];
  const CONTACTS = data?.contacts ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/travel" />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            Plan Your Visit
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            Travel Guide to Ijebu-Igbo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Everything you need to plan your trip home — from UK to Ijebu-Igbo.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl mx-auto space-y-10">

          {/* Flights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-1 flex items-center gap-2">
              <Plane size={20} className="text-accent" /> Step 1 — Fly to Lagos
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              All flights from the UK arrive at <strong>Murtala Muhammed International Airport (LOS)</strong>, Lagos.
            </p>
            <div className="space-y-3">
              {FLIGHTS.map((f) => (
                <div key={f.airline} className="bg-muted/40 rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <span className="font-semibold text-foreground text-sm">{f.airline}</span>
                    <span className="text-xs text-muted-foreground font-mono">{f.route}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{f.notes}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              💡 <strong>Tip:</strong> Book at least 8–10 weeks in advance, especially for peak periods (Christmas, Easter, summer). Prices from around £400–£900 return depending on season.
            </p>
          </motion.div>

          {/* Road to Ijebu-Igbo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-1 flex items-center gap-2">
              <Car size={20} className="text-accent" /> Step 2 — Lagos to Ijebu-Igbo
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              From Lagos Airport, Ijebu-Igbo is roughly <strong>90–120km</strong> — about 2 to 3 hours depending on traffic.
            </p>
            <div className="space-y-4">
              {ROAD_OPTIONS.map((opt) => (
                <div key={opt.mode} className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold text-foreground text-sm">{opt.mode}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{opt.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Where to stay */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-1 flex items-center gap-2">
              <MapPin size={20} className="text-accent" /> Where to Stay
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Many diaspora members stay with family when visiting. If you need a hotel, there are several options in Ijebu-Igbo town and along the Sagamu–Benin road.
            </p>
            <div className="bg-muted/40 rounded-xl p-4">
              <p className="text-sm text-foreground font-semibold mb-1">Recommended approach</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Contact an IID member in advance — the community is welcoming and many members can recommend trusted accommodation or host you themselves. Reach out via WhatsApp before your trip.
              </p>
            </div>
          </motion.div>

          {/* What to bring */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-5">What to Pack</h2>
            <ul className="space-y-3">
              {WHAT_TO_BRING.map((item, i) => {
                const Icon = resolveIcon(item.icon);
                return (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-accent" />
                    </span>
                    {item.tip}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Key contacts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-4 flex items-center gap-2">
              <Phone size={20} className="text-accent" /> Key Contacts
            </h2>
            <div className="space-y-3">
              {CONTACTS.map((c) => (
                <div key={c.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{c.label}</span>
                  <span className="font-mono font-semibold text-foreground text-sm">{c.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.25 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 text-center"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-2">Planning a Visit?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto mb-5">
              Let us know you're coming — we can connect you with members in Ijebu-Igbo, recommend places to visit, and ensure your homecoming is a memorable one.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 bg-accent text-charcoal font-bold px-6 py-3 rounded-xl text-sm hover:brightness-110 transition-all"
            >
              Get in Touch <ChevronRight size={15} />
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
