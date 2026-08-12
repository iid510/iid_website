import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Crown } from "lucide-react";
import { TOWNS } from "@/data/towns";

const ease = [0.16, 1, 0.3, 1] as const;

/** One accent per town, matching the cards on /heritage. */
const TOWN_ACCENT: Record<string, string> = {
  "oke-sopen": "from-amber-600 to-amber-400",
  "oke-agbo": "from-emerald-600 to-emerald-400",
  "ojowo": "from-blue-600 to-blue-400",
  "atikori": "from-purple-600 to-purple-400",
  "japara": "from-rose-600 to-rose-400",
  "imope-ijebu": "from-cyan-600 to-cyan-400",
  "aparaki": "from-orange-600 to-orange-400",
};

/**
 * Homepage entry point to the seven town pages.
 *
 * The band above this one asks "which of the seven towns is your family from?"
 * but offered no way to go and look at them — the town pages could only be
 * reached from a card partway down /heritage. Deliberately text-only: this sits
 * high on the homepage, and seven more photographs would undo the page-weight
 * work for a section people mostly scan for a name.
 */
export default function SevenTowns({ current }: { current?: string } = {}) {
  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-6 sm:mb-8"
        >
          <p className="label-accent">One kingdom, seven towns</p>
          <h2 className="heading-section">The Seven Towns of Ijebu-Igbo</h2>
          <p className="text-body mt-3 max-w-2xl">
            Each town has its own Oba, its own quarters and its own history under the
            Orimolusi. Open any of them for its rulers, chiefs, oriki and photographs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TOWNS.map((town, i) => (
            <motion.div
              key={town.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3), ease }}
            >
              <Link
                to={`/${town.slug}`}
                aria-current={town.slug === current ? "page" : undefined}
                className={`group relative flex flex-col justify-between h-full min-h-[112px] p-4 rounded-2xl border overflow-hidden
                           active:scale-[0.98] transition-all duration-200 touch-manipulation ${
                             town.slug === current
                               ? "border-accent bg-accent/10"
                               : "border-border bg-card hover:border-accent/60 hover:shadow-ceramic"
                           }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${TOWN_ACCENT[town.slug] ?? "from-primary to-primary/60"}`}
                />
                <div>
                  <h3 className="font-display font-bold text-foreground text-base sm:text-lg leading-tight">
                    {town.name}
                  </h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Crown size={11} className="text-accent shrink-0" />
                    {town.ruler}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-primary mt-3 group-hover:gap-2 transition-all">
                  {town.slug === current ? "You are here" : <>Open <ArrowRight size={12} /></>}
                </span>
              </Link>
            </motion.div>
          ))}

          {/* Eighth cell keeps the 4-column grid square and points at the whole story. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35, ease }}
          >
            <Link
              to="/heritage"
              className="group flex flex-col justify-between h-full min-h-[112px] p-4 rounded-2xl bg-primary text-primary-foreground
                         hover:brightness-110 active:scale-[0.98] transition-all duration-200 touch-manipulation"
            >
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg leading-tight text-accent">
                  The whole kingdom
                </h3>
                <p className="text-xs text-primary-foreground/70 mt-1">
                  Orimolusi, Obas and Baales
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-accent mt-3 group-hover:gap-2 transition-all">
                Heritage <ArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
