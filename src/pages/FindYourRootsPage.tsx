import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Compass, Crown, MapPin, RotateCcw, Search, Sparkles, UserPlus, Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import BackToTop from "@/components/BackToTop";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { useSanityTowns } from "@/hooks/useSanityTowns";
import { useYourIID } from "@/context/YourIIDContext";
import { LOCATION_OPTIONS, locationMessage, matchRoots, type RootsAnswers } from "@/lib/rootsMatch";

const ease = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 4;

const inputClass =
  "w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-base";

export default function FindYourRootsPage() {
  const { data: towns = [] } = useSanityTowns();
  const { setTown, completeRoots } = useYourIID();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<RootsAnswers>({ town: "", compound: "", surname: "", location: "" });
  const [submitted, setSubmitted] = useState(false);

  const matches = useMemo(
    () => (submitted ? matchRoots(towns, answers).slice(0, 3) : []),
    [submitted, towns, answers],
  );
  const best = matches[0];

  const set = <K extends keyof RootsAnswers>(key: K, value: RootsAnswers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const finish = () => {
    const result = matchRoots(towns, answers)[0];
    if (result) setTown(result.town.slug);
    completeRoots();
    setSubmitted(true);
  };

  const restart = () => {
    setAnswers({ town: "", compound: "", surname: "", location: "" });
    setStep(0);
    setSubmitted(false);
  };

  // Step 1 is the only one that can't be skipped without an answer of some kind;
  // every other question is optional, because most diaspora visitors will only
  // know one or two of these details.
  const canAdvance = step === 0 ? answers.town !== "" || answers.compound.trim() !== "" : true;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/roots" />

      {/* Hero */}
      <section className="relative min-h-[38vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="label-accent mb-2"
          >
            Ẹ̀ wẹ̀ sọ̀ọ́ Ọmọ Alárè
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            Find Your Roots
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Four short questions, and we'll point you to your town within Ijebu-Igbo, the Oba who
            reigns there, and the chiefs of your family's quarter.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
              >
                {/* Progress */}
                <div className="flex items-center gap-2 mb-7">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        i <= step ? "bg-accent" : "bg-border"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-muted-foreground ml-2 shrink-0">
                    {step + 1}/{TOTAL_STEPS}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 0 && (
                      <div>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-foreground mb-2">
                          Which part of Ijebu-Igbo is your family from?
                        </h2>
                        <p className="text-muted-foreground text-sm mb-5">
                          Pick your town if you know it. If you don't, skip ahead — the next questions
                          will work it out.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {towns.map((t) => (
                            <button
                              key={t.slug}
                              onClick={() => set("town", answers.town === t.slug ? "" : t.slug)}
                              className={`px-3 py-3.5 rounded-xl border text-sm font-semibold transition-all touch-manipulation ${
                                answers.town === t.slug
                                  ? "bg-accent/15 border-accent text-accent"
                                  : "bg-background border-border text-foreground hover:border-accent/50"
                              }`}
                            >
                              {t.name}
                            </button>
                          ))}
                          <button
                            onClick={() => set("town", "")}
                            className={`px-3 py-3.5 rounded-xl border text-sm font-semibold transition-all touch-manipulation ${
                              answers.town === ""
                                ? "bg-primary/10 border-primary/40 text-primary"
                                : "bg-background border-border text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            I'm not sure
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-foreground mb-2">
                          What is your family compound or area called?
                        </h2>
                        <p className="text-muted-foreground text-sm mb-5">
                          The Itun, Odo, Agbole or quarter your people are known by — for example
                          Bogije, Oriwu, Itun Tapa or Oke Moje. We'll check it against the records of
                          all seven towns.
                        </p>
                        <input
                          autoFocus
                          value={answers.compound}
                          onChange={(e) => set("compound", e.target.value)}
                          placeholder="e.g. Bogije"
                          className={inputClass}
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-foreground mb-2">
                          What is your family surname?
                        </h2>
                        <p className="text-muted-foreground text-sm mb-5">
                          We'll look for it among the ruling houses, chieftaincy rolls and Baale lists
                          published on this site.
                        </p>
                        <input
                          autoFocus
                          value={answers.surname}
                          onChange={(e) => set("surname", e.target.value)}
                          placeholder="e.g. Solaja"
                          className={inputClass}
                        />
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-foreground mb-2">
                          Where do you live now?
                        </h2>
                        <p className="text-muted-foreground text-sm mb-5">
                          So we can point you to the part of the community closest to you.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {LOCATION_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => set("location", opt.value)}
                              className={`px-4 py-3.5 rounded-xl border text-sm font-semibold text-left transition-all touch-manipulation ${
                                answers.location === opt.value
                                  ? "bg-accent/15 border-accent text-accent"
                                  : "bg-background border-border text-foreground hover:border-accent/50"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground disabled:opacity-40 hover:text-foreground transition-colors px-2 py-2"
                  >
                    <ArrowLeft size={15} /> Back
                  </button>

                  {step < TOTAL_STEPS - 1 ? (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canAdvance}
                      className="btn-primary !py-3 !px-6 gap-2 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Continue <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button onClick={finish} className="btn-primary !py-3 !px-6 gap-2">
                      <Search size={15} /> Find my roots
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="space-y-6"
              >
                {best ? (
                  <>
                    {/* Primary match */}
                    <div className="bg-card border border-accent/30 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-primary px-6 sm:px-8 py-5">
                        <p className="label-accent !mb-1 flex items-center gap-2">
                          <Sparkles size={13} /> Your town
                        </p>
                        <h2 className="font-display font-black text-white text-3xl sm:text-4xl">
                          {best.town.name}
                        </h2>
                        {best.town.tagline && (
                          <p className="text-white/70 text-sm mt-2 max-w-lg">{best.town.tagline}</p>
                        )}
                      </div>

                      <div className="p-6 sm:p-8 space-y-6">
                        {/* Why */}
                        {best.evidence.length > 0 && (
                          <div className="bg-accent/8 border border-accent/25 rounded-xl p-4 space-y-2">
                            <p className="text-xs font-bold uppercase tracking-wide text-accent">
                              Why we matched you here
                            </p>
                            {best.evidence.map((e, i) => (
                              <p key={i} className="text-sm text-foreground/80 leading-relaxed">
                                {e.detail}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Oba */}
                        {best.town.rulerName && (
                          <div className="flex items-center gap-4">
                            {best.town.rulerPhoto && (
                              <ImageWithSkeleton
                                src={best.town.rulerPhoto}
                                alt={best.town.rulerName}
                                className="w-20 h-20 rounded-xl shrink-0"
                                imgClassName="object-cover"
                              />
                            )}
                            <div className="min-w-0">
                              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5 mb-1">
                                <Crown size={12} className="text-accent" /> Your Oba
                              </p>
                              <p className="font-display font-bold text-foreground leading-tight">
                                {best.town.rulerName}
                              </p>
                              {best.town.rulerTitle && (
                                <p className="text-xs text-muted-foreground mt-0.5">{best.town.rulerTitle}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Chiefs of the quarter */}
                        {best.town.chiefGroups?.[0] && (
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5 mb-2.5">
                              <Users size={12} className="text-accent" /> {best.town.chiefGroups[0].groupLabel}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {best.town.chiefGroups[0].members.slice(0, 6).map((m, i) => (
                                <div key={i} className="bg-muted/40 rounded-lg px-3 py-2.5">
                                  <p className="text-sm font-semibold text-foreground leading-tight">{m.name}</p>
                                  {m.title && <p className="text-xs text-muted-foreground mt-0.5">{m.title}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3 pt-1">
                          <Link to={`/${best.town.slug}`} className="btn-primary !py-3 !px-6 gap-2">
                            <MapPin size={15} /> Explore {best.town.name}
                          </Link>
                          <Link
                            to="/identity-card"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-bold text-foreground hover:bg-muted transition-colors text-sm"
                          >
                            Create your card
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Other possibilities */}
                    {matches.length > 1 && (
                      <div className="bg-card border border-border rounded-2xl p-6">
                        <h3 className="font-display font-bold text-foreground mb-1">Other possible matches</h3>
                        <p className="text-muted-foreground text-xs mb-4">
                          Families moved between towns over the centuries — these also carry traces of your details.
                        </p>
                        <div className="space-y-2">
                          {matches.slice(1).map((m) => (
                            <Link
                              key={m.town.slug}
                              to={`/${m.town.slug}`}
                              className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border hover:border-accent/50 transition-colors group"
                            >
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground text-sm">{m.town.name}</p>
                                {m.evidence[0] && (
                                  <p className="text-xs text-muted-foreground truncate">{m.evidence[0].detail}</p>
                                )}
                              </div>
                              <ArrowRight size={15} className="text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* No match — never guess, say so and offer the manual route */
                  <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center">
                    <Compass size={34} className="text-accent mx-auto mb-3" />
                    <h2 className="font-display font-black text-xl text-foreground mb-2">
                      We couldn't place your family from those details
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto mb-6">
                      Our records cover the compounds, chieftaincy rolls and Baale lists published so
                      far — they're extensive but not complete. Browse the seven towns yourself, or
                      join and ask the community directly. Elders often place a family in minutes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Link to="/heritage" className="btn-primary !py-3 !px-6">Browse the seven towns</Link>
                      <button
                        onClick={restart}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-bold text-foreground hover:bg-muted transition-colors text-sm"
                      >
                        <RotateCcw size={15} /> Try again
                      </button>
                    </div>
                  </div>
                )}

                {/* Join CTA */}
                <div className="bg-primary rounded-2xl p-6 sm:p-8 text-center">
                  <p className="label-accent text-accent/80">The next step</p>
                  <h3 className="font-display font-black text-white text-2xl sm:text-3xl mb-3 mt-1">
                    Take your place in the community
                  </h3>
                  <p className="text-white/70 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                    {locationMessage(answers.location)}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link
                      to="/join"
                      className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-7 py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg text-sm"
                    >
                      <UserPlus size={16} /> Join IID
                    </Link>
                    <Link
                      to="/my-iid"
                      className="inline-flex items-center gap-2 border border-white/25 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all text-sm"
                    >
                      Go to Your IID
                    </Link>
                  </div>
                </div>

                {best && (
                  <button
                    onClick={restart}
                    className="mx-auto flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RotateCcw size={14} /> Start over
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
