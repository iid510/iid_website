import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, ChevronDown, MapPin, User } from "lucide-react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { useSanityTowns, type Town } from "@/hooks/useSanityTowns";
import { useSanityKingdomOverview } from "@/hooks/useSanityKingdomOverview";

const ease = [0.16, 1, 0.3, 1] as const;

const DISPLAY_ORDER = ["oke-sopen", "oke-agbo", "ojowo", "atikori", "japara", "imope-ijebu", "aparaki"];

const TOWN_STYLES: Record<string, { color: string; accent: string; badge: string }> = {
  "oke-sopen": { color: "from-amber-700 to-amber-500", accent: "border-amber-500/40 bg-amber-50", badge: "bg-amber-100 text-amber-800" },
  "oke-agbo": { color: "from-emerald-700 to-emerald-500", accent: "border-emerald-500/40 bg-emerald-50", badge: "bg-emerald-100 text-emerald-800" },
  "ojowo": { color: "from-blue-700 to-blue-500", accent: "border-blue-500/40 bg-blue-50", badge: "bg-blue-100 text-blue-800" },
  "atikori": { color: "from-purple-700 to-purple-500", accent: "border-purple-500/40 bg-purple-50", badge: "bg-purple-100 text-purple-800" },
  "japara": { color: "from-rose-700 to-rose-500", accent: "border-rose-500/40 bg-rose-50", badge: "bg-rose-100 text-rose-800" },
  "imope-ijebu": { color: "from-cyan-700 to-cyan-500", accent: "border-cyan-500/40 bg-cyan-50", badge: "bg-cyan-100 text-cyan-800" },
  "aparaki": { color: "from-orange-700 to-orange-500", accent: "border-orange-500/40 bg-orange-50", badge: "bg-orange-100 text-orange-800" },
};

function ObaCard({ town, index }: { town: Town; index: number }) {
  const [open, setOpen] = useState(false);
  const style = TOWN_STYLES[town.slug] ?? TOWN_STYLES["oke-sopen"];
  const baales = town.baales ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className={`rounded-2xl border-2 ${style.accent} overflow-hidden`}
    >
      <button onClick={() => setOpen((v) => !v)} className="w-full text-left">
        <div className={`bg-gradient-to-r ${style.color} px-5 py-4 flex items-center justify-between gap-4`}>
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center shrink-0">
              <ImageWithSkeleton
                src={town.rulerPhoto ?? null}
                alt={town.rulerName ?? town.rulerTitle ?? town.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-md"
                imgClassName="object-cover rounded-full"
                fallback={<User className="w-6 h-6 text-white/50" />}
              />
              {town.consortPhoto && (
                <ImageWithSkeleton
                  src={town.consortPhoto}
                  alt={town.consortName ?? "Olori"}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-md -ml-4"
                  imgClassName="object-cover rounded-full"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-0.5">Town Oba</p>
              <h3 className="text-white font-display font-black text-lg sm:text-xl leading-tight">
                {town.rulerTitle} of {town.name}
              </h3>
              {town.rulerName && <p className="text-white/80 text-xs sm:text-sm mt-1 leading-snug">{town.rulerName}</p>}
              {town.consortName && <p className="text-white/60 text-xs mt-0.5 leading-snug">{town.consortName}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {baales.length > 0 && (
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge} hidden sm:inline-flex`}>
                {baales.length} Baales
              </span>
            )}
            <ChevronDown size={20} className={`text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="p-5 space-y-6">
              {baales.length > 0 ? (
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Baales under {town.rulerTitle}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {baales.map((bale, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-foreground/80 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
                        {bale.name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-2">
                  Bale list for {town.rulerTitle} not yet documented.
                </p>
              )}
              <Link
                to={`/${town.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors"
              >
                View full {town.name} page →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RulingHierarchy() {
  const { data: towns = [] } = useSanityTowns();
  const { data: overview } = useSanityKingdomOverview();

  const orderedTowns = DISPLAY_ORDER
    .map((slug) => towns.find((t) => t.slug === slug))
    .filter((t): t is Town => Boolean(t));

  const totalBaales = orderedTowns.reduce((sum, t) => sum + (t.baales?.length ?? 0), 0);

  return (
    <section className="section-padding bg-[#f8f6f1]">
      <div className="container-main">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="label-accent">Royal Structure</h2>
          <h3 className="heading-section">The Ijebu-Igbo Ruling Hierarchy</h3>
          <p className="text-body mt-3">
            The traditional governance of Ijebu-Igbo is structured under one paramount Oba (the Orimolusi),
            seven Town Obas presiding over their individual towns, and their respective Baales across all communities.
          </p>
        </motion.div>

        {/* Org Chart */}
        {overview?.orgChartImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mb-12"
          >
            <h3 className="font-display font-bold text-foreground text-xl sm:text-2xl mb-4 text-center">
              Ijebu-Igbo Traditional Council — Organisational Chart
            </h3>
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
              <ImageWithSkeleton
                src={overview.orgChartImage}
                alt="Ijebu-Igbo Traditional Council Organisational Chart"
                className="w-full"
                imgClassName="h-auto"
              />
            </div>
          </motion.div>
        )}

        {/* Royal Portraits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[
            { label: "Previous Orimolusi", src: "/images/oba-adeboye.webp", name: "Late Oba Joel Adeboye", slug: "adeboye" },
            { label: "Previous Orimolusi", src: "/images/oba-adetayo.webp", name: "Late Oba Sami Adetayo", slug: "adetayo" },
            { label: "Present Orimolusi", src: "/images/oba-jaiyeoba.webp", name: "Oba Lawrence Jaiyeoba Adebajo", slug: "jaiyeoba-adebajo" },
          ].map((king, i) => (
            <Link
              key={i}
              to={`/heritage/orimolusi/${king.slug}`}
              className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <ImageWithSkeleton
                  src={king.src}
                  alt={king.label}
                  className="w-full h-full"
                  imgClassName="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center pointer-events-none">
                  <span className="text-xs font-bold bg-accent text-charcoal px-3 py-1.5 rounded-full">
                    View Profile →
                  </span>
                </div>
              </div>
              <div className="p-4 text-center border-t border-border">
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{king.label}</p>
                <h4 className="font-display font-bold text-foreground text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
                  {king.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">The Orimolusi of Ijebu-Igbo</p>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Grade One Oba */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="relative mb-10"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 sm:p-10 text-center shadow-elevated relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
            />
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center mx-auto mb-4">
                <Crown className="text-accent w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <p className="text-accent font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">Grade One Oba — Paramount Ruler</p>
              <h3 className="font-display font-black text-white text-2xl sm:text-4xl md:text-5xl leading-tight">
                The Orimolusi of Ijebu-Igbo
              </h3>
              {overview?.grade1Description && (
                <p className="text-white/60 text-sm mt-3 max-w-md mx-auto">{overview.grade1Description}</p>
              )}
            </div>
          </div>

          {overview?.councilOfObasImage && (
            <div className="mt-6 max-w-md mx-auto rounded-2xl overflow-hidden border border-border shadow-sm bg-white">
              <ImageWithSkeleton
                src={overview.councilOfObasImage}
                alt="Ijebu-Igbo Council of Obas, chaired by the Orimolusi"
                className="w-full"
                imgClassName="h-auto"
              />
              <p className="text-xs text-muted-foreground text-center p-3">Ijebu-Igbo Council of Obas, chaired by the Orimolusi</p>
            </div>
          )}

          <div className="flex justify-center mt-0">
            <div className="w-0.5 h-8 bg-primary/30" />
          </div>
        </motion.div>

        {/* Grade Two Obas label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
            Town Obas — Click to expand Baales
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Grade Two Oba cards */}
        <div className="grid grid-cols-1 gap-4 mb-14">
          {orderedTowns.map((town, i) => (
            <ObaCard key={town.slug} town={town} index={i} />
          ))}
        </div>

        {/* Satellite Towns */}
        {overview?.satelliteTowns && overview.satelliteTowns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-14"
          >
            <h4 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-accent" />
              Towns under Olori-Ilu
            </h4>
            <div className="flex flex-wrap gap-3">
              {overview.satelliteTowns.map((town) => (
                <span key={town} className="bg-white border border-border rounded-full px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
                  {town}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Two of these three towns currently have an Oba-designate awaiting traditional rites and coronation. Two other towns — Imope-Ijebu (Onimope) and Aparaki (Alaparaki) — have already been elevated to Obaship and now have their own Town Oba profiles above.
            </p>
          </motion.div>
        )}

        {/* Summary table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
        >
          <div className="bg-primary px-6 py-4">
            <h4 className="font-display font-bold text-white text-lg">Summary</h4>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between px-6 py-3.5 bg-white">
              <span className="text-sm font-medium text-foreground">Grade One Oba (Orimolusi)</span>
              <span className="text-sm font-bold text-accent">1</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3.5 bg-muted/30">
              <span className="text-sm font-medium text-foreground">Town Obas under the Orimolusi</span>
              <span className="text-sm font-bold text-accent">{orderedTowns.length}</span>
            </div>
            {orderedTowns.map((t, i) => (
              <div key={t.slug} className={`flex items-center justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-muted/30"}`}>
                <span className="text-sm font-medium text-foreground">Baales under {t.rulerTitle}</span>
                <span className="text-sm font-bold text-accent">{t.baales?.length ?? 0}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-6 py-4 bg-primary/5 border-t-2 border-primary/20">
              <span className="font-display font-bold text-foreground">Total Baales Listed</span>
              <span className="font-display font-black text-primary text-xl">{totalBaales}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
