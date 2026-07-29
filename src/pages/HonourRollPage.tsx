import { motion } from "framer-motion";
import { Crown, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { useSanityFoundationMembers } from "@/hooks/useSanityFoundationMembers";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HonourRollPage() {
  const { data: members = [] } = useSanityFoundationMembers();
  const { data: siteSettings } = useSanitySiteSettings();

  const executives = members.filter((m) => m.group === "Executive");
  const general = members.filter((m) => m.group === "General");
  const honourRoll = siteSettings?.honourRoll;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/honour-roll" />

      {/* Hero */}
      <section className="relative min-h-[38vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            Our Foundation
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight">
            Honour Roll
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Honouring the pioneer members who founded IID Omo Orimolusi in Diaspora{honourRoll?.period ? ` (${honourRoll.period})` : ""}.
          </motion.p>
        </div>
      </section>

      {/* Pioneer Executive Committee */}
      {executives.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-main max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-10">
              <h2 className="label-accent mb-2">Leadership</h2>
              <h3 className="heading-section flex items-center justify-center gap-2">
                <Crown size={26} className="text-accent" /> Pioneer Executive Committee
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {executives.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease }}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                  <span className="font-semibold text-foreground text-sm">{m.name}</span>
                  <span className="text-accent text-xs font-bold uppercase tracking-wide">{m.position}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pioneer Members */}
      {general.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-main max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-10">
              <h2 className="label-accent mb-2">Community</h2>
              <h3 className="heading-section flex items-center justify-center gap-2">
                <Users size={26} className="text-accent" /> Pioneer Members
              </h3>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {general.map((m, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-background rounded-xl border border-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                  <span className="text-sm text-foreground/80 font-medium">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {honourRoll?.source && (
        <div className="container-main max-w-3xl pb-8">
          <p className="text-xs text-muted-foreground text-center italic">Source: {honourRoll.source}</p>
        </div>
      )}

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
