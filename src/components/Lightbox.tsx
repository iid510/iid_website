import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
}

export function useLightbox(images: LightboxImage[]) {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const open = useCallback((i: number) => { setDirection(0); setIndex(i); }, []);
  const close = useCallback(() => setIndex(null), []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  return { images, index, direction, open, close, prev, next };
}

function LightboxView({
  images, index, direction, onClose, onPrev, onNext,
}: {
  images: LightboxImage[]; index: number; direction: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const img = images[index];
  const multiple = images.length > 1;

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (multiple && e.key === "ArrowLeft") onPrev();
      if (multiple && e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, onPrev, onNext, multiple]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir >= 0 ? 260 : -260, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir >= 0 ? -260 : 260, opacity: 0, scale: 0.97 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X size={18} />
      </button>

      {multiple && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white/60 text-sm font-semibold bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
          {index + 1} / {images.length}
        </div>
      )}

      {multiple && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-accent hover:text-primary border border-white/20 flex items-center justify-center text-white transition-all duration-200"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <div className="relative max-w-5xl w-full flex items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full flex items-center justify-center"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            {img.alt && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl px-6 py-5">
                <p className="text-white text-sm sm:text-base font-medium text-center">{img.alt}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {multiple && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-accent hover:text-primary border border-white/20 flex items-center justify-center text-white transition-all duration-200"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {multiple && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[200px] overflow-hidden">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${i === index ? "bg-accent w-5" : "bg-white/30 w-1.5"}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function ZoomableImage({
  src, alt, className = "w-full h-full", imgClassName = "w-full h-full object-cover", onClick,
}: {
  src: string; alt: string; className?: string; imgClassName?: string; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block text-left cursor-zoom-in focus:outline-none ${className}`}
    >
      <img src={src} alt={alt} className={imgClassName} loading="lazy" decoding="async" />
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
        <Expand size={20} className="text-white drop-shadow-lg" />
      </span>
    </button>
  );
}

export default function Lightbox({
  images, index, direction, onClose, onPrev, onNext,
}: {
  images: LightboxImage[]; index: number | null; direction: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <AnimatePresence>
      {index !== null && (
        <LightboxView
          images={images}
          index={index}
          direction={direction}
          onClose={onClose}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </AnimatePresence>
  );
}
