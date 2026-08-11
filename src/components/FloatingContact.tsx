import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, UserPlus, X } from "lucide-react";

const contactInfo = {
  phone: "+44 7723 953174",
  email: "info@ijebuigbodescendants.org",
};

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // The button is fixed over the content, so on a narrow screen it inevitably
  // covers something. Retract it while the reader is scrolling down and bring
  // it back the moment they scroll up or stop.
  useEffect(() => {
    if (isOpen) return;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      // Ignore the rubber-band region at the very top.
      setHidden(goingDown && y > 220);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  // Every enquiry funnels through /join (the membership form) rather than
  // scattering people into WhatsApp DMs. Phone and email stay as direct channels.
  const contactOptions = [
    {
      icon: Phone,
      label: "Call Us",
      href: `tel:+447723953174`,
      internal: false,
      color: "bg-primary hover:bg-primary/90 active:bg-primary/95 border border-accent/30",
      delay: 0.1,
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${contactInfo.email}`,
      internal: false,
      color: "bg-primary hover:bg-primary/90 active:bg-primary/95 border border-accent/30",
      delay: 0.15,
    },
    {
      icon: UserPlus,
      label: "Join IID",
      href: "/join",
      internal: true,
      color: "bg-accent text-charcoal hover:brightness-110 active:brightness-95 border border-accent/30",
      delay: 0.2,
    },
  ];

  return (
    <motion.div
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 88 : 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: hidden ? "none" : "auto" }}
      className="fixed bottom-6 right-4 sm:bottom-24 sm:right-6 z-50 flex flex-col items-end gap-3 safe-area-bottom"
    >
      {/* Contact options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 sm:gap-3 mb-2"
          >
            {contactOptions.map((option) => {
              const inner = (
                <>
                  <option.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base font-medium whitespace-nowrap">
                    {option.label}
                  </span>
                </>
              );
              const className = `flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full ${
                option.internal ? "" : "text-white"
              } shadow-lg ${option.color} transition-all duration-200 touch-manipulation active:scale-95`;

              return (
                <motion.div
                  key={option.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: option.delay }}
                >
                  {option.internal ? (
                    <Link to={option.href} onClick={() => setIsOpen(false)} className={className}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={option.href} className={className}>
                      {inner}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 touch-manipulation ${
          isOpen
            ? "bg-charcoal text-white rotate-0"
            : "bg-accent text-charcoal hover:bg-accent/90"
        }`}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
              {/* Pulse ring */}
              <span className="absolute -inset-1 rounded-full bg-accent/30 animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
