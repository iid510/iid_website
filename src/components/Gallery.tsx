import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Images, ZoomIn, Expand } from "lucide-react";
import { useSanityGallery } from "@/hooks/useSanityGallery";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Lightbox, { useLightbox } from "@/components/Lightbox";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { HOME_PAGE } from "@/data/pageContent";

const PAGE_SIZE = 8;

/* ── 3D tilt card ─────────────────────────────────────────────── */
function GalleryCard({
  img, index, isNew, onClick,
}: {
  img: { src: string; alt: string };
  index: number;
  isNew: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-8, 8]), springConfig);
  const glareOpacity = useSpring(useTransform(rawX, [-1, 1], [0, 0.15]), springConfig);
  const glareBackground = useTransform(
    glareOpacity,
    (v) => `linear-gradient(135deg, rgba(255,255,255,${v}) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    rawY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const col = index % 4;
  const row = Math.floor(index / 4);

  return (
    <motion.button
      ref={cardRef}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={isNew ? { opacity: 0, y: 48, scale: 0.92 } : { opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: isNew ? (index % PAGE_SIZE) * 0.06 : col * 0.07 + row * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl group shadow-md aspect-square w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <ImageWithSkeleton
        src={img.src}
        alt={img.alt}
        className="w-full h-full"
        imgClassName="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Glare layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: glareBackground }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Expand icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <motion.div
          initial={{ scale: 0.6 }}
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center shadow-lg"
        >
          <Expand size={20} className="text-primary" />
        </motion.div>
      </div>

      {/* Caption */}
      <p className="absolute bottom-0 inset-x-0 px-3 pb-3 text-white text-xs sm:text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
        {img.alt}
      </p>
    </motion.button>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export default function Gallery() {
  const { data: images = [] } = useSanityGallery();
  const { data: page } = useSanityPage("home", HOME_PAGE);
  const header = findSection(page?.sections, "gallery-header");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [prevVisible, setPrevVisible] = useState(0);
  const { index: lightboxIndex, direction, open, close, prev, next } = useLightbox(images);

  const shown = images.slice(0, visible);
  const hasMore = visible < images.length;

  const handleShowMore = () => {
    setPrevVisible(visible);
    setVisible((v) => v + PAGE_SIZE);
  };

  const handleShowLess = () => {
    setPrevVisible(0);
    setVisible(PAGE_SIZE);
  };

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="label-accent">{header?.eyebrow}</h2>
          <h3 className="heading-section">{header?.heading}</h3>
          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            {header?.body?.[0]}
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
            {shown.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => open(i)}
                className="relative overflow-hidden rounded-2xl flex-shrink-0 w-[260px] h-[190px] snap-center shadow-lg group focus:outline-none"
              >
                <ImageWithSkeleton src={img.src} alt={img.alt} className="w-full h-full" imgClassName="object-cover transition-transform duration-500 group-active:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center">
                  <ZoomIn size={14} className="text-primary" />
                </div>
                <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium line-clamp-2">{img.alt}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Desktop: grid with 3D tilt cards */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4" style={{ perspective: "1200px" }}>
            {shown.map((img, i) => (
              <GalleryCard
                key={img.src + i}
                img={img}
                index={i}
                isNew={i >= prevVisible}
                onClick={() => open(i)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8 sm:mt-10 space-y-4"
        >
          <p className="text-gray-500 text-sm">
            Showing <span className="font-semibold text-foreground">{shown.length}</span> of{" "}
            <span className="font-semibold text-foreground">{images.length}</span> photos
          </p>

          {hasMore && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShowMore}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
            >
              <Images size={16} />
              Show More Photos
            </motion.button>
          )}

          {!hasMore && images.length > PAGE_SIZE && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShowLess}
              className="inline-flex items-center gap-2 border border-border text-muted-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-all"
            >
              Show Less
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        index={lightboxIndex}
        direction={direction}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
