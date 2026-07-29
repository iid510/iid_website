import { motion } from "framer-motion";
import aboutImg from "@/assets/about-culture.jpg";
import ClanNetwork from "@/components/ClanNetwork";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";
import { resolveIcon } from "@/lib/iconMap";

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const { data: siteSettings } = useSanitySiteSettings();
  const clans = siteSettings?.clans ?? [];
  const culturalPillars = siteSettings?.culturalPillars ?? [];

  return (
    <section id="about" className="section-padding bg-background overflow-hidden">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-accent font-semibold text-xs sm:text-base tracking-wider uppercase mb-1 sm:mb-2">
            Ẹ̀yin Ọmọ Orímólúsí
          </p>
          <h2 className="heading-section mb-2 sm:mb-3">
            Our Heritage, Our Identity
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            From the ancient kingdom of Ijebu to communities across the globe, we are the proud descendants 
            of Orímólúsí — carriers of a legacy built on enterprise, honour, and unwavering unity.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-start mb-10 sm:mb-14">
          {/* Left: Image with cultural overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-elevated">
              <img
                src={aboutImg}
                alt="Ijebu Igbo community cultural gathering"
                className="w-full h-[280px] sm:h-[360px] lg:h-[450px] object-cover"
              />
              {/* Cultural badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="bg-primary/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-accent/20">
                  <p className="text-accent font-display font-bold text-lg sm:text-xl mb-1">
                    Ọmọ Orímólúsí
                  </p>
                  <p className="text-primary-foreground/80 text-sm sm:text-base">
                    Children of Orímólúsí, founder of Ijebu Igbo
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-accent/10 rounded-2xl -z-10 hidden sm:block" />
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl -z-10 hidden sm:block" />
          </motion.div>

          {/* Right: Heritage Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="space-y-5 sm:space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-foreground mb-2 sm:mb-3">
                Proudly Ọmọ Alárè
              </h3>
              <p className="text-body leading-relaxed">
                Being an Ọmọ Alárè is more than a title — it is a heritage of resilience, enterprise, 
                and community. From the markets of Ijebu Igbo to cities around the world, our sons 
                and daughters carry the pride, culture, and values of our homeland wherever they go.
              </p>
            </div>

            {/* Yoruba Proverb */}
            <div className="bg-accent/10 border-l-4 border-accent rounded-r-xl p-3 sm:p-4">
              <p className="text-foreground font-display text-sm sm:text-base md:text-lg italic mb-1 sm:mb-2">
                "Ọmọ tí a kò kọ́, ni yóò ta ilé tí a kọ́"
              </p>
              <p className="text-foreground/70 text-sm">
                The child we do not teach will sell the house we built — we invest in our future.
              </p>
            </div>

            {/* Who We Are */}
            <div>
              <h4 className="font-display font-bold text-lg text-foreground mb-2">Who We Are</h4>
              <p className="text-body text-sm sm:text-base leading-relaxed">
                IID (Ijebu Igbo Descendants Omo Orimolusi in Diaspora) is a non-profit organisation that comes together to raise awareness about what is happening in Ijebu Igbo. This organisation is open to all Ijebu Igbo Descendants in Diaspora — wherever in the world they may be.
              </p>
            </div>

            {/* What We Do */}
            <div>
              <h4 className="font-display font-bold text-lg text-foreground mb-2">What We Do</h4>
              <p className="text-body text-sm sm:text-base leading-relaxed">
                We see to the welfare of our community and our people, both in Ijebu Igbo and in the Diaspora. We do this by complementing the efforts of the Government with whatever resources we have.
              </p>
            </div>
          </motion.div>
        </div>

        {/* The 7 Clans - Mobile Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 sm:mb-16 lg:hidden"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-2">
              The Seven Clans of Ijebu Igbo
            </h3>
            <p className="text-body">
              United under Orímólúsí, our town stands on seven foundational quarters
            </p>
          </div>

          {/* Mobile: Show ClanNetwork animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="max-w-md mx-auto aspect-square"
          >
            <ClanNetwork />
          </motion.div>
        </motion.div>

        {/* Cultural Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-2">
              What We Stand For
            </h3>
            <p className="text-body text-sm sm:text-base">
              The four pillars that guide everything IID does for our community
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {culturalPillars.map((pillar, index) => {
              const Icon = resolveIcon(pillar.icon);
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease }}
                  className="bg-primary/5 border border-primary/10 rounded-xl p-5 sm:p-6 text-center hover:bg-primary/10 transition-colors"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                  </div>
                  <h4 className="font-display font-bold text-foreground text-sm sm:text-base mb-1 sm:mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Cultural Call-out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mt-12 sm:mt-16 bg-primary rounded-2xl p-6 sm:p-8 text-center"
        >
          <p className="text-accent font-display font-bold text-xl sm:text-2xl mb-2">
            Ijebu Igbo kì í ṣofo
          </p>
          <p className="text-primary-foreground/80 text-sm sm:text-base max-w-2xl mx-auto">
            "Ijebu Igbo never runs dry" — Wherever we are in the world, the spirit of our homeland lives on.
            Together, we uplift our town. Together, we preserve our legacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
