import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { HOME_PAGE } from "@/data/pageContent";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const { data: page } = useSanityPage("home", HOME_PAGE);
  const intro = findSection(page?.sections, "video-intro");

  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="label-accent">{intro?.eyebrow}</h2>
          <h3 className="heading-section">{intro?.heading}</h3>
          <p className="text-body mt-4">
            {intro?.body?.[0]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto aspect-video rounded-sm overflow-hidden shadow-elevated bg-charcoal"
        >
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play video"
            >
              <img
                src="https://img.youtube.com/vi/KbInaslfyrk/maxresdefault.jpg"
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative z-10 w-20 h-20 rounded-full bg-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Play className="text-charcoal ml-1" size={32} fill="currentColor" />
              </div>
            </button>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/KbInaslfyrk?autoplay=1"
              title="Celebrating Our Heritage"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
