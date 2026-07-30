import { motion } from "framer-motion";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { HOME_PAGE } from "@/data/pageContent";
import { resolveIcon } from "@/lib/iconMap";

export default function Impact() {
  const { data: siteSettings } = useSanitySiteSettings();
  const impacts = siteSettings?.impactCards ?? [];
  const { data: page } = useSanityPage("home", HOME_PAGE);
  const intro = findSection(page?.sections, "impact-intro") ?? findSection(HOME_PAGE.sections, "impact-intro");

  return (
    <section id="impact" className="section-padding bg-background">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 sm:mb-16 lg:mb-20 gap-4 sm:gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <h2 className="label-accent">{intro?.eyebrow}</h2>
            <h3 className="heading-section">
              {intro?.heading}
            </h3>
          </div>
          <p className="text-body max-w-sm text-sm sm:text-base lg:pb-2">
            {intro?.body?.[0]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-px sm:bg-border sm:border sm:border-border rounded-xl sm:rounded-sm overflow-hidden">
          {impacts.map((item, idx) => {
            const Icon = resolveIcon(item.icon);
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card p-6 sm:p-8 lg:p-10 flex flex-col h-full rounded-xl sm:rounded-none border border-border sm:border-0 touch-manipulation"
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-4 sm:mb-6 lg:mb-8" strokeWidth={1.5} />
                <h4 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-4 font-display">
                  {item.title}
                </h4>
                <p className="text-body text-sm sm:text-base">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
