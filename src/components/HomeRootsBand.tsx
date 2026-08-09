import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, IdCard } from "lucide-react";
import IjebuIgboNow from "@/components/IjebuIgboNow";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Homepage band pairing the "back home right now" clock with the Find Your
 * Roots entry point — the emotional hook next to the action it should prompt.
 */
export default function HomeRootsBand() {
  return (
    <section className="section-padding bg-muted/40">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Roots CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-3 bg-primary rounded-2xl p-7 sm:p-9 flex flex-col justify-center"
          >
            <p className="label-accent">Ẹ̀ wẹ̀ sọ̀ọ́ Ọmọ Alárè</p>
            <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
              Which of the seven towns is your family from?
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg mb-7">
              Answer four questions about your compound and surname, and we'll trace you to your
              town within Ijebu-Igbo — your Oba, your chiefs, your quarter. Nothing to sign up for.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/roots"
                className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-6 py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg text-sm"
              >
                <Compass size={16} /> Find your roots
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/identity-card"
                className="inline-flex items-center gap-2 border border-white/25 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all text-sm"
              >
                <IdCard size={16} /> Create your card
              </Link>
            </div>
          </motion.div>

          {/* Time & weather back home */}
          <div className="lg:col-span-2 flex">
            <IjebuIgboNow className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
