import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, ArrowRight } from "lucide-react";
import { useSanityKings } from "@/hooks/useSanityKings";

const ease = [0.16, 1, 0.3, 1] as const;

export default function OrimolusiSection() {
  const { data: kings = [] } = useSanityKings();

  return (
    <section className="section-padding bg-[#f8f6f1]">
      <div className="container-main">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="label-accent">Royal Heritage</h2>
          <h3 className="heading-section">The Orimolusi of Ijebu-Igbo</h3>
          <p className="text-body mt-3">
            The paramount throne of Ijebu-Igbo — past and present. Generations of kings whose legacies define the identity and progress of our great town.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {kings.map((king, i) => (
            <motion.div
              key={king.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
            >
              <Link
                to={`/heritage/orimolusi/${king.slug}`}
                className="group block bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300"
              >
                {/* Portrait */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={king.photos?.[0] ?? king.photo}
                    alt={king.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                      king.status === "Present"
                        ? "bg-accent text-charcoal"
                        : "bg-white/20 text-white backdrop-blur-sm"
                    }`}>
                      <Crown size={10} />
                      {king.status}
                    </span>
                  </div>

                  {/* Bottom name overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">
                      The Orimolusi of Ijebu-Igbo
                    </p>
                    <h3 className="font-display font-black text-white text-lg sm:text-xl leading-snug">
                      {king.name}
                    </h3>
                    {king.subtitle && (
                      <p className="text-white/60 text-xs mt-1 line-clamp-1 italic">{king.subtitle}</p>
                    )}
                    <div className="flex items-center gap-1 mt-3 text-accent text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read Full Profile <ArrowRight size={12} />
                    </div>
                  </div>
                </div>

                {/* Footer strip */}
                <div className="px-5 py-4 flex items-center justify-between border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">{king.reign}</p>
                    {king.born && (
                      <p className="text-xs text-muted-foreground/60">b. {king.born.split("—")[0].trim()}</p>
                    )}
                  </div>
                  <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                    View Profile <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Link to full Heritage */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/heritage"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            Explore the full Ijebu-Igbo Ruling Hierarchy <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
