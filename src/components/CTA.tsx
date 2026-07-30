import { motion } from "framer-motion";
import JoinModal from "@/components/JoinModal";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { HOME_PAGE } from "@/data/pageContent";

export default function CTA() {
  const { data: page } = useSanityPage("home", HOME_PAGE);
  const main = findSection(page?.sections, "cta-main");

  return (
    <section id="cta" className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              currentColor 40px,
              currentColor 41px
            )`,
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground leading-tight tracking-tight mb-4 sm:mb-6">
            {main?.heading}
          </h2>
          <p className="text-primary-foreground/70 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            {main?.body?.[0]}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <JoinModal>
              <button className="btn-primary text-center">
                Become a Member
              </button>
            </JoinModal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
