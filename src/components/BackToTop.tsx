import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const y = window.scrollY;
      // Only while reading back up the page. Someone scrolling down is moving
      // forward through content and does not want a button sitting on top of
      // whatever they are about to read.
      const goingUp = y < lastY.current;
      setIsVisible(y > 300 && goingUp);
      lastY.current = y;
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed left-4 bottom-6 sm:bottom-24 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-accent text-white rounded-full shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all duration-300 flex items-center justify-center group touch-manipulation active:scale-95 safe-area-bottom"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
