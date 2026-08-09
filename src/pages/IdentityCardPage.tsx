import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import BackToTop from "@/components/BackToTop";
import IdentityCard from "@/components/IdentityCard";

export default function IdentityCardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/identity-card" />

      {/* Hero */}
      <section className="relative min-h-[34vh] flex items-end pb-9 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="label-accent mb-2"
          >
            Wear it proudly
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            Your Ọmọ Orimolusi Card
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Put your name to your town and share it. A small way to say where you're from — and to
            point others home.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-5xl mx-auto">
          <IdentityCard />

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Link
              to="/roots"
              className="flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-accent/50 transition-colors group bg-card"
            >
              <Compass size={22} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  Don't know your town?
                </p>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                  Answer four questions and we'll trace your family to one of the seven towns.
                </p>
              </div>
            </Link>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card">
              <Share2 size={22} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-bold text-foreground">Share it anywhere</p>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                  The card downloads as an image sized for WhatsApp status, Instagram and X.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
