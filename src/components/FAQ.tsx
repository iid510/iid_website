import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";
import type { FaqEntry } from "@/hooks/useSanitySiteSettings";

const ease = [0.16, 1, 0.3, 1] as const;

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FaqEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07, ease }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? "border-accent/50 shadow-md" : "border-border bg-white hover:border-primary/30"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-3 sm:gap-4"
      >
        <div className={`mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isOpen ? "bg-accent text-charcoal" : "bg-primary/10 text-primary"
        }`}>
          <HelpCircle size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{faq.category}</p>
          <h4 className="font-display font-bold text-foreground text-sm sm:text-base leading-snug pr-6">
            {faq.question}
          </h4>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 mt-1 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-14 sm:pl-[4.25rem] space-y-3 border-t border-border pt-4">
              {faq.answer?.map((para, i) => (
                <p key={i} className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({ limit }: { limit?: number }) {
  const { data: siteSettings } = useSanitySiteSettings();
  const faqs = siteSettings?.faqs ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="section-padding bg-background">
      <div className="container-main max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="label-accent">Got Questions?</h2>
          <h3 className="heading-section">Frequently Asked Questions</h3>
          <p className="text-body mt-3">
            Answers to the most common questions about IID Omo Orimolusi in Diaspora — our initiatives, culture, and how you can get involved.
          </p>
        </motion.div>

        <div className="space-y-3">
          {visible.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
