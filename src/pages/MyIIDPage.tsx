import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Bookmark, BookOpen, CalendarPlus, Compass, Crown, IdCard, MapPin, Sparkles, Trash2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import BackToTop from "@/components/BackToTop";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import IjebuIgboNow from "@/components/IjebuIgboNow";
import { useYourIID } from "@/context/YourIIDContext";
import { useSanityTowns } from "@/hooks/useSanityTowns";
import { useSanityBusinesses } from "@/hooks/useSanityBusinesses";
import { useSanityBlogPosts } from "@/hooks/useSanityBlogPosts";
import { useSanityEvents } from "@/hooks/useSanityEvents";
import { countdownTo, downloadIcs, findNextEvent, parseEventDate } from "@/lib/eventUtils";

const ease = [0.16, 1, 0.3, 1] as const;

function SectionCard({
  title, icon: Icon, children, action,
}: {
  title: string;
  icon: typeof Bookmark;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, ease }}
      className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-display font-bold text-foreground text-lg flex items-center gap-2">
          <Icon size={18} className="text-accent" /> {title}
        </h2>
        {action}
      </div>
      {children}
    </motion.div>
  );
}

function EmptyHint({ text, to, cta }: { text: string; to: string; cta: string }) {
  return (
    <div className="text-center py-7 border border-dashed border-border rounded-xl">
      <p className="text-muted-foreground text-sm mb-3">{text}</p>
      <Link to={to} className="text-sm font-bold text-primary hover:underline">
        {cta} →
      </Link>
    </div>
  );
}

function NextEventCountdown() {
  const { data: events = [] } = useSanityEvents();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const next = useMemo(() => findNextEvent(events, now), [events, now]);

  if (!next) {
    return (
      <EmptyHint
        text="No upcoming events are scheduled just yet."
        to="/events"
        cta="See past events"
      />
    );
  }

  const when = parseEventDate(next);
  const cd = when ? countdownTo(when, now) : null;

  return (
    <div>
      <p className="font-display font-bold text-foreground text-base leading-tight">{next.title}</p>
      <p className="text-xs text-muted-foreground mt-1 mb-4">
        {next.date} · {next.time} · {next.location}
      </p>

      {cd && !cd.past && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { value: cd.days, label: "days" },
            { value: cd.hours, label: "hours" },
            { value: cd.minutes, label: "mins" },
          ].map((unit) => (
            <div key={unit.label} className="bg-primary/5 border border-primary/15 rounded-xl py-3 text-center">
              <p className="font-display font-black text-2xl text-primary leading-none">{unit.value}</p>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">{unit.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => downloadIcs(next)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary border border-primary/30 px-4 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"
        >
          <CalendarPlus size={13} /> Add to calendar
        </button>
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground border border-border px-4 py-2.5 rounded-xl hover:bg-muted transition-colors"
        >
          All events <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function MyIIDPage() {
  const { profile, ready, hasProfile, toggleBusiness, toggleArticle, reset } = useYourIID();
  const { data: towns = [] } = useSanityTowns();
  const { data: businesses = [] } = useSanityBusinesses();
  const { data: posts = [] } = useSanityBlogPosts();

  const town = towns.find((t) => t.slug === profile.town);
  const savedBusinesses = businesses.filter((b) => profile.savedBusinesses.includes(b.slug));
  const savedArticles = posts.filter((p) => profile.savedArticles.includes(p.slug));

  const continueReading = useMemo(() => {
    return Object.entries(profile.reading)
      .filter(([, mark]) => mark.percent > 5 && mark.percent < 95)
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
      .slice(0, 3)
      .map(([slug, mark]) => ({ slug, ...mark }));
  }, [profile.reading]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/my-iid" />

      {/* Hero */}
      <section className="relative min-h-[34vh] flex items-end pb-9 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="label-accent mb-2"
          >
            Your Space
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            {profile.displayName ? `Ẹ káàbọ̀, ${profile.displayName}` : "Your IID"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Your town, your saved businesses and articles, and what's coming up — kept privately on
            this device. No account needed.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-5xl mx-auto">
          {/* Hydrating — avoid flashing the empty state at returning visitors */}
          {!ready ? (
            <div className="h-40 rounded-2xl bg-muted/50 animate-pulse" />
          ) : !hasProfile ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center"
            >
              <Sparkles size={36} className="text-accent mx-auto mb-4" />
              <h2 className="font-display font-black text-2xl text-foreground mb-3">
                Let's make this yours
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto mb-7">
                Find the town your family comes from, and this page fills up with your Oba, your
                chiefs, the businesses you save and the articles you're part-way through.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/roots" className="btn-primary !py-3 !px-6 gap-2">
                  <Compass size={16} /> Find your roots
                </Link>
                <Link
                  to="/heritage"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-bold text-foreground hover:bg-muted transition-colors text-sm"
                >
                  Browse the seven towns
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Your town */}
              <div className="lg:col-span-2 space-y-5">
                {town ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="bg-card border border-accent/30 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="bg-primary px-6 py-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="label-accent !mb-1">Your town</p>
                        <h2 className="font-display font-black text-white text-2xl sm:text-3xl">{town.name}</h2>
                      </div>
                      <Link
                        to="/roots"
                        className="text-[11px] font-bold text-white/60 hover:text-accent transition-colors shrink-0"
                      >
                        Change
                      </Link>
                    </div>
                    <div className="p-6 space-y-4">
                      {town.rulerName && (
                        <div className="flex items-center gap-4">
                          {town.rulerPhoto && (
                            <ImageWithSkeleton
                              src={town.rulerPhoto}
                              alt={town.rulerName}
                              className="w-16 h-16 rounded-xl shrink-0"
                              imgClassName="object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5 mb-1">
                              <Crown size={11} className="text-accent" /> Your Oba
                            </p>
                            <p className="font-display font-bold text-foreground text-sm leading-tight">
                              {town.rulerName}
                            </p>
                            {town.rulerTitle && (
                              <p className="text-xs text-muted-foreground mt-0.5">{town.rulerTitle}</p>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/${town.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary border border-primary/30 px-4 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"
                        >
                          <MapPin size={13} /> Explore {town.name}
                        </Link>
                        <Link
                          to="/identity-card"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground border border-border px-4 py-2.5 rounded-xl hover:bg-muted transition-colors"
                        >
                          <IdCard size={13} /> Your card
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <SectionCard title="Your town" icon={MapPin}>
                    <EmptyHint
                      text="You haven't set your town yet."
                      to="/roots"
                      cta="Find your roots"
                    />
                  </SectionCard>
                )}

                {/* Continue reading */}
                <SectionCard title="Continue reading" icon={BookOpen}>
                  {continueReading.length === 0 ? (
                    <EmptyHint
                      text="Nothing in progress. Start with the essentials."
                      to="/blog"
                      cta="Open the blog"
                    />
                  ) : (
                    <div className="space-y-2.5">
                      {continueReading.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/blog/${item.slug}`}
                          className="block p-3.5 rounded-xl border border-border hover:border-accent/50 transition-colors group"
                        >
                          <p className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2.5 mt-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full transition-all"
                                style={{ width: `${item.percent}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-bold text-muted-foreground shrink-0">
                              {item.percent}%
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </SectionCard>

                {/* Saved businesses */}
                <SectionCard
                  title={`Saved businesses${savedBusinesses.length ? ` (${savedBusinesses.length})` : ""}`}
                  icon={Bookmark}
                  action={
                    <Link to="/businesses" className="text-xs font-bold text-primary hover:underline shrink-0">
                      Directory →
                    </Link>
                  }
                >
                  {savedBusinesses.length === 0 ? (
                    <EmptyHint
                      text="Tap the bookmark on any business to keep it here."
                      to="/businesses"
                      cta="Browse the directory"
                    />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {savedBusinesses.map((b) => (
                        <div
                          key={b.slug}
                          className="flex items-center justify-between gap-2 p-3.5 rounded-xl border border-border hover:border-accent/50 transition-colors"
                        >
                          <Link to={`/businesses/${b.slug}`} className="min-w-0 group">
                            <p className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                              {b.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{b.category}</p>
                          </Link>
                          <button
                            onClick={() => toggleBusiness(b.slug)}
                            aria-label={`Remove ${b.name} from saved`}
                            className="text-muted-foreground hover:text-destructive transition-colors shrink-0 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </SectionCard>

                {/* Saved articles */}
                <SectionCard
                  title={`Saved articles${savedArticles.length ? ` (${savedArticles.length})` : ""}`}
                  icon={BookOpen}
                  action={
                    <Link to="/blog" className="text-xs font-bold text-primary hover:underline shrink-0">
                      Blog →
                    </Link>
                  }
                >
                  {savedArticles.length === 0 ? (
                    <EmptyHint
                      text="Save an article to read it later, even offline."
                      to="/blog"
                      cta="Open the blog"
                    />
                  ) : (
                    <div className="space-y-2.5">
                      {savedArticles.map((p) => (
                        <div
                          key={p.slug}
                          className="flex items-center justify-between gap-2 p-3.5 rounded-xl border border-border hover:border-accent/50 transition-colors"
                        >
                          <Link to={`/blog/${p.slug}`} className="min-w-0 group">
                            <p className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                              {p.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{p.category}</p>
                          </Link>
                          <button
                            onClick={() => toggleArticle(p.slug)}
                            aria-label={`Remove ${p.title} from saved`}
                            className="text-muted-foreground hover:text-destructive transition-colors shrink-0 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </SectionCard>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <IjebuIgboNow />

                <SectionCard title="Next event" icon={CalendarPlus}>
                  <NextEventCountdown />
                </SectionCard>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, ease }}
                  className="bg-primary rounded-2xl p-6 text-center"
                >
                  <IdCard size={26} className="text-accent mx-auto mb-3" />
                  <h3 className="font-display font-bold text-white text-lg mb-2">Your identity card</h3>
                  <p className="text-white/65 text-xs leading-relaxed mb-4">
                    A shareable Ọmọ Orimolusi card with your name and town.
                  </p>
                  <Link
                    to="/identity-card"
                    className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all text-xs"
                  >
                    Create it <ArrowRight size={13} />
                  </Link>
                </motion.div>

                <button
                  onClick={() => {
                    if (window.confirm("Clear your saved town, businesses, articles and reading progress on this device?")) {
                      reset();
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors py-3"
                >
                  <Trash2 size={13} /> Clear my data
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
