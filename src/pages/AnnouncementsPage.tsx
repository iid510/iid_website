import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Baby, Heart, Star, Bell, Trophy, Calendar, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import { CATEGORY_STYLES, type AnnouncementCategory, type Announcement } from "@/data/announcements";
import { useSanityAnnouncements } from "@/hooks/useSanityAnnouncements";

const ease = [0.16, 1, 0.3, 1] as const;

const CATEGORIES: { label: string; value: AnnouncementCategory | "All" }[] = [
  { label: "All",             value: "All" },
  { label: "Births",          value: "Birth" },
  { label: "Obituaries",      value: "Obituary" },
  { label: "Congratulations", value: "Congratulations" },
  { label: "Achievements",    value: "Achievement" },
  { label: "Notices",         value: "Notice" },
];

const CATEGORY_ICONS: Record<AnnouncementCategory, React.ReactNode> = {
  Birth:           <Baby size={16} />,
  Obituary:        <Heart size={16} />,
  Congratulations: <Star size={16} />,
  Achievement:     <Trophy size={16} />,
  Notice:          <Bell size={16} />,
};

function AnnouncementCard({ item, index }: { item: Announcement; index: number }) {
  const style = CATEGORY_STYLES[item.category];
  const date = new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style.color} ${style.bg} ${style.border}`}>
          {CATEGORY_ICONS[item.category]}
          {item.category}
        </span>
        <div className="ml-auto flex items-center gap-1 text-muted-foreground text-xs shrink-0">
          <Calendar size={11} />
          {date}
        </div>
      </div>

      <h3 className="font-display font-bold text-foreground text-base sm:text-lg leading-snug mb-2">
        {item.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>

      {item.postedBy && (
        <p className="mt-4 text-xs text-muted-foreground/70 border-t border-border pt-3">
          Posted by: <span className="font-semibold text-muted-foreground">{item.postedBy}</span>
        </p>
      )}
    </motion.div>
  );
}

export default function AnnouncementsPage() {
  const { data: ANNOUNCEMENTS = [] } = useSanityAnnouncements();
  const [active, setActive] = useState<AnnouncementCategory | "All">("All");

  const filtered = active === "All"
    ? ANNOUNCEMENTS
    : ANNOUNCEMENTS.filter((a) => a.category === active);

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/announcements" />

      {/* Hero */}
      <section className="relative min-h-[38vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            Community Board
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            Announcements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Births, obituaries, congratulations, achievements and community notices from across the IID family.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  active === cat.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sorted.map((item, i) => (
                <AnnouncementCard key={item.id} item={item} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl">
              <Bell size={40} className="text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No announcements in this category yet.</p>
            </div>
          )}

          {/* Submit announcement CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-display font-bold text-foreground text-lg">Have an announcement?</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Send your birth announcement, congratulations, or community notice to the secretary.
              </p>
            </div>
            <a
              href="https://wa.me/447496933887"
              target="_blank" rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors"
            >
              Submit via WhatsApp <ChevronRight size={15} />
            </a>
          </motion.div>

        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
