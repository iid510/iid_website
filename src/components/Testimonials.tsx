import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  const { data: siteSettings } = useSanitySiteSettings();
  const testimonials = siteSettings?.testimonials ?? [];

  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <h2 className="label-accent">Voices</h2>
          <h3 className="heading-section">Voices of Ọmọ Alárè</h3>
        </div>

        {/* Mobile: horizontal swipe */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-background rounded-xl p-6 shadow-md border border-primary/10
                           flex-shrink-0 w-[80vw] max-w-[320px] snap-center"
              >
                <div className="absolute -top-4 left-6 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
                <blockquote className="mt-6 mb-6">
                  <p className="text-base text-primary font-medium leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </blockquote>
                <div className="border-t border-primary/10 pt-4">
                  <p className="text-sm font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-xs text-body/60 mt-1">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease }}
              className="relative bg-background rounded-xl sm:rounded-lg p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary/10"
            >
              <div className="absolute -top-4 left-6 w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <blockquote className="mt-6 sm:mt-8 mb-6">
                <p className="text-base sm:text-lg text-primary font-medium leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>
              <div className="border-t border-primary/10 pt-4">
                <p className="text-sm font-semibold text-primary">{testimonial.author}</p>
                <p className="text-xs sm:text-sm text-body/60 mt-1">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cultural Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <div className="inline-block bg-accent/10 border border-accent/20 rounded-full px-6 py-3 sm:px-8 sm:py-4">
            <p className="text-sm sm:text-base font-medium text-primary">
              United by heritage, driven by purpose, connected across continents
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
