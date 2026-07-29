import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Search, MapPin, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { type Clan } from "@/data/members";
import { useSanityMembers } from "@/hooks/useSanityMembers";

const ease = [0.16, 1, 0.3, 1] as const;

const ALL_CLANS: (Clan | "All")[] = [
  "All", "Oke-Agbo", "Oke-Sopen", "Itamarun", "Irolu", "Ojowo",
  "Atikori", "Parakoyi", "Oke-Lowo", "Oke-Eri", "Ijasi", "Other",
];

export default function MembersPage() {
  const { data: MEMBERS = [] } = useSanityMembers();
  const [query, setQuery] = useState("");
  const [clan, setClan] = useState<Clan | "All">("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MEMBERS.filter((m) => {
      const matchesClan = clan === "All" || m.clan === clan;
      const matchesQuery = !q || m.name.toLowerCase().includes(q) || m.location.toLowerCase().includes(q);
      return matchesClan && matchesQuery;
    });
  }, [query, clan, MEMBERS]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/members" />

      {/* Hero */}
      <section className="relative min-h-[38vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            Our Community
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            Community Members
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            IID Omo Orimolusi in Diaspora members — united across the diaspora worldwide, rooted in Ijebu-Igbo.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">

          {/* Search & filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or location…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <select
              value={clan}
              onChange={(e) => setClan(e.target.value as Clan | "All")}
              className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {ALL_CLANS.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All Clans / Quarters" : c}</option>
              ))}
            </select>
          </div>

          {/* Members grid or empty state */}
          {MEMBERS.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-center py-24 border border-dashed border-border rounded-2xl"
            >
              <Users size={48} className="text-muted-foreground/25 mx-auto mb-4" />
              <h3 className="font-display font-bold text-foreground text-xl mb-2">Member Directory Coming Soon</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                The member directory is being set up. IID members will be listed here shortly.
                Want to be included? Join us today.
              </p>
              <a
                href="/join"
                className="inline-flex items-center gap-2 mt-5 btn-primary"
              >
                Become a Member <ChevronRight size={15} />
              </a>
            </motion.div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground text-sm">No members match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease }}
                  className="bg-card border border-border rounded-2xl overflow-hidden text-center hover:shadow-md transition-shadow duration-300"
                >
                  <ImageWithSkeleton
                    src={member.photo ?? null}
                    alt={member.name}
                    className="w-full aspect-square"
                    imgClassName="object-cover"
                    fallback={
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <span className="font-display font-black text-primary/30 text-3xl">
                          {member.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                        </span>
                      </div>
                    }
                  />
                  <div className="p-3">
                    <p className="font-semibold text-foreground text-sm leading-snug">{member.name}</p>
                    {member.role && (
                      <p className="text-accent text-[11px] font-semibold mt-0.5">{member.role}</p>
                    )}
                    <div className="flex items-center justify-center gap-1 text-muted-foreground text-[11px] mt-1">
                      <MapPin size={9} />
                      <span>{member.location}</span>
                    </div>
                    <span className="inline-block mt-1.5 text-[10px] font-bold text-primary/70 bg-primary/8 px-2 py-0.5 rounded-full">
                      {member.clan}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Join CTA */}
          {MEMBERS.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-display font-bold text-foreground text-lg">Not yet a member?</h3>
                <p className="text-muted-foreground text-sm mt-1">Join IID Omo Orimolusi in Diaspora and be part of this growing community.</p>
              </div>
              <a href="/join" className="shrink-0 btn-primary inline-flex items-center gap-2">
                Join Now <ChevronRight size={15} />
              </a>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
