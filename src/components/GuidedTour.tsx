import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass, Crown, Store, UserPlus, X } from "lucide-react";
import { useYourIID } from "@/context/YourIIDContext";

/**
 * First-visit orientation.
 *
 * Deliberately not a spotlight-over-the-DOM tour: those break the moment the
 * layout shifts or an element is missing on mobile. This is a small, centred
 * card walking through the four things a newcomer actually needs — which
 * survives every breakpoint and never traps focus over content it can't find.
 *
 * Shown once. Dismissing it, finishing it, or following any step marks it done.
 */

const STEPS = [
  {
    icon: Crown,
    eyebrow: "Where you've landed",
    title: "Ijebu-Igbo, in one place",
    body:
      "A Yoruba town in Ogun State, Nigeria — one kingdom under the Orimolusi, made up of seven towns each with its own Oba. This site is its record, kept by descendants abroad.",
    to: "/heritage",
    cta: "See the heritage",
  },
  {
    icon: Compass,
    eyebrow: "Start with yourself",
    title: "Find the town your family is from",
    body:
      "Four questions — your compound, your surname, where you live now — and we'll trace you to one of the seven towns, your Oba and your chiefs.",
    to: "/roots",
    cta: "Find your roots",
  },
  {
    icon: Store,
    eyebrow: "The community at work",
    title: "Businesses run by descendants",
    body:
      "A directory of businesses with Ijebu-Igbo ties, at home and in the diaspora. Save the ones you want to come back to.",
    to: "/businesses",
    cta: "Open the directory",
  },
  {
    icon: UserPlus,
    eyebrow: "Take part",
    title: "Join IID",
    body:
      "Membership connects you to the scholarship programme, community projects back home, events, and descendants near you — wherever you are.",
    to: "/join",
    cta: "Join the community",
  },
] as const;

export default function GuidedTour() {
  const { profile, ready, completeTour } = useYourIID();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!ready || profile.tourCompleted) return;
    // Homepage only. Someone who deep-links to /roots or an article arrived with
    // intent — interrupting that with an orientation overlay is worse than not
    // showing it at all.
    if (pathname !== "/") return;
    // Let the page settle first — an overlay that beats the hero in feels broken.
    const id = window.setTimeout(() => setOpen(true), 1800);
    return () => window.clearTimeout(id);
  }, [ready, profile.tourCompleted, pathname]);

  // Escape closes, and the page shouldn't scroll behind the overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
      if (e.key === "ArrowRight" && step < STEPS.length - 1) setStep((s) => s + 1);
      if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step]);

  const dismiss = () => {
    setOpen(false);
    completeTour();
  };

  if (typeof document === "undefined") return null;

  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6 bg-charcoal/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome tour"
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-card rounded-3xl shadow-elevated overflow-hidden safe-area-bottom"
          >
            <button
              onClick={dismiss}
              aria-label="Close welcome tour"
              className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors touch-manipulation"
            >
              <X size={17} />
            </button>

            {/* Header band */}
            <div className="bg-primary px-6 sm:px-8 pt-7 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mb-3.5">
                <Icon size={24} className="text-accent" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent mb-1.5">
                {current.eyebrow}
              </p>
              <h2 className="font-display font-black text-white text-xl sm:text-2xl leading-tight">
                {current.title}
              </h2>
            </div>

            <div className="px-6 sm:px-8 py-6">
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-6">
                {current.body}
              </p>

              <Link
                to={current.to}
                onClick={dismiss}
                className="inline-flex items-center gap-2 w-full justify-center bg-accent text-charcoal font-bold px-6 py-3.5 rounded-xl hover:brightness-110 transition-all text-sm touch-manipulation"
              >
                {current.cta} <ArrowRight size={15} />
              </Link>

              {/* Footer controls */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-border">
                <div className="flex items-center gap-1.5">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      aria-label={`Go to step ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === step ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground/40"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  {step > 0 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                    >
                      Back
                    </button>
                  )}
                  {isLast ? (
                    <button
                      onClick={dismiss}
                      className="text-sm font-bold text-primary hover:text-accent transition-colors px-3 py-2"
                    >
                      Explore on my own
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      className="text-sm font-bold text-primary hover:text-accent transition-colors px-3 py-2"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
