import { motion } from "framer-motion";
import storyImg from "@/assets/story-history.jpg";
import festivalImg from "@/assets/gallery-festival.jpg";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { HOME_PAGE } from "@/data/pageContent";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Story() {
  const { data: page } = useSanityPage("home", HOME_PAGE);
  const sections = page?.sections ?? HOME_PAGE.sections;
  const intro = findSection(sections, "story-intro");
  const block1 = findSection(sections, "story-block1");
  const block2 = findSection(sections, "story-block2");
  const quote = findSection(sections, "story-quote");

  return (
    <section id="story" className="section-padding bg-surface">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="label-accent">{intro?.eyebrow}</h2>
          <h3 className="heading-section">{intro?.heading}</h3>
          <p className="text-body mt-4 sm:mt-6">
            {intro?.body?.[0]}
          </p>
        </div>

        {/* Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden rounded-sm shadow-ceramic"
          >
            <img
              src={storyImg}
              alt="Historic Ijebu Igbo architecture"
              className="w-full h-[360px] lg:h-[440px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h4 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              {block1?.heading}
            </h4>
            <p className="text-body mb-4">
              {block1?.body?.[0]}
            </p>
            <p className="text-body">
              {block1?.body?.[1]}
            </p>
          </motion.div>
        </div>

        {/* Block 2 — reversed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="order-2 lg:order-1"
          >
            <h4 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              {block2?.heading}
            </h4>
            <p className="text-body mb-4">
              {block2?.body?.[0]}
            </p>
            <p className="text-body">
              {block2?.body?.[1]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden rounded-sm shadow-ceramic order-1 lg:order-2"
          >
            <img
              src={festivalImg}
              alt="Ojude Oba festival celebration"
              className="w-full h-[360px] lg:h-[440px] object-cover"
            />
          </motion.div>
        </div>

        {/* Cultural Saying */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mt-16 sm:mt-20 lg:mt-24 text-center max-w-3xl mx-auto"
        >
          <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-6 sm:p-8 lg:p-10">
            <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-primary italic mb-3 sm:mb-4">
              "{quote?.heading}"
            </p>
            <p className="text-base sm:text-lg text-body">
              {quote?.body?.[0]}
            </p>
            <p className="text-sm sm:text-base text-body/70 mt-3 sm:mt-4">
              {quote?.body?.[1]}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
