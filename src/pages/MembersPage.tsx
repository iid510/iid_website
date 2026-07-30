import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Search, MapPin, ChevronRight, ChevronLeft, LayoutGrid, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { useSanityMembers } from "@/hooks/useSanityMembers";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { MEMBERS_PAGE } from "@/data/pageContent";

const ease = [0.16, 1, 0.3, 1] as const;

function countryOf(location?: string): string | null {
  if (!location) return null;
  const parts = location.split(",").map((p) => p.trim());
  const last = parts[parts.length - 1] ?? location;
  if (/^uk$/i.test(last) || /united kingdom/i.test(location)) return "United Kingdom";
  return last;
}

// City/branch portion of a location, excluding the country itself (e.g. "Northampton" from "Northampton, UK").
function cityOf(location?: string): string {
  if (!location) return "";
  const parts = location.split(",").map((p) => p.trim());
  return parts.length > 1 ? parts.slice(0, -1).join(", ") : "";
}

const COUNTRY_FLAGS: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  "USA": "🇺🇸",
  "Nigeria": "🇳🇬",
  "Ghana": "🇬🇭",
  "Canada": "🇨🇦",
};

function flagOf(country: string): string {
  return COUNTRY_FLAGS[country] ?? "🌍";
}

const COUNTRY_LABELS: Record<string, string> = {
  "United Kingdom": "U.K",
  "USA": "U.S",
};

function labelFor(country: string): string {
  return COUNTRY_LABELS[country] ?? country;
}

const PAGE_SIZE = 24;

export default function MembersPage() {
  const { data: MEMBERS = [] } = useSanityMembers();
  const { data: page } = useSanityPage("members", MEMBERS_PAGE);
  const hero = page?.hero ?? MEMBERS_PAGE.hero!;
  const emptyState = findSection(page?.sections, "members-empty") ?? findSection(MEMBERS_PAGE.sections, "members-empty");
  const joinCta = findSection(page?.sections, "members-cta") ?? findSection(MEMBERS_PAGE.sections, "members-cta");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [pageNum, setPageNum] = useState(1);

  const countries = useMemo(() => {
    const known = MEMBERS.map((m) => countryOf(m.location)).filter((c): c is string => !!c);
    return ["All", ...Array.from(new Set(known)).sort()];
  }, [MEMBERS]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MEMBERS.filter((m) => {
      const matchesCountry = country === "All" || countryOf(m.location) === country;
      const matchesQuery = !q || m.name.toLowerCase().includes(q) || (m.location ?? "").toLowerCase().includes(q);
      return matchesCountry && matchesQuery;
    });
  }, [query, country, MEMBERS]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Reset to page 1 whenever the result set changes (new search/filter)
  useEffect(() => {
    setPageNum(1);
  }, [query, country]);

  const paginated = useMemo(() => {
    const start = (pageNum - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageNum]);

  const goToPage = (p: number) => {
    setPageNum(Math.min(Math.max(1, p), pageCount));
    document.getElementById("members-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-muted/50 to-background">
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All Countries" : `${flagOf(c)} ${labelFor(c)}`}</option>
              ))}
            </select>
            {/* Grid / List view toggle */}
            <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                className={`p-2 rounded-lg transition-colors ${
                  view === "grid" ? "bg-accent text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
                className={`p-2 rounded-lg transition-colors ${
                  view === "list" ? "bg-accent text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Members grid or empty state */}
          <div id="members-results" />
          {MEMBERS.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-center py-24 border border-dashed border-border rounded-2xl"
            >
              <Users size={48} className="text-muted-foreground/25 mx-auto mb-4" />
              <h3 className="font-display font-bold text-foreground text-xl mb-2">{emptyState?.heading}</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                {emptyState?.body?.[0]}
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
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {paginated.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease }}
                  className="relative bg-card border border-border rounded-2xl overflow-hidden text-center hover:shadow-lg hover:border-accent/40 transition-all duration-300"
                >
                  {/* Country flag badge — only shown when the list explicitly states a location */}
                  {countryOf(member.location) && (
                    <span
                      className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full bg-card/90 shadow-md flex items-center justify-center text-2xl leading-none"
                      title={labelFor(countryOf(member.location)!)}
                    >
                      {flagOf(countryOf(member.location)!)}
                    </span>
                  )}

                  <ImageWithSkeleton
                    src={member.photo ?? null}
                    alt={member.name}
                    className="w-full aspect-square"
                    imgClassName="object-cover"
                    fallback={
                      <div
                        className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0), linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)) 60%, hsl(var(--accent)/0.35))",
                          backgroundSize: "16px 16px, 100% 100%",
                        }}
                      >
                        <div className="relative w-16 h-16 rounded-full bg-primary/90 border-2 border-accent flex items-center justify-center shadow-lg ring-4 ring-primary-foreground/10">
                          <span className="font-display font-black text-primary-foreground text-lg">
                            {member.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                          </span>
                        </div>
                      </div>
                    }
                  />
                  <div className="p-3">
                    <p className="font-semibold text-foreground text-base leading-snug">{member.name}</p>
                    {member.role && (
                      <p className="text-accent text-sm font-semibold mt-1">{member.role}</p>
                    )}
                    {cityOf(member.location) && (
                      <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mt-1.5">
                        <MapPin size={12} />
                        <span>{cityOf(member.location)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {paginated.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.5), ease }}
                  className="flex items-center gap-4 px-4 py-3 bg-card border border-border rounded-xl hover:bg-muted/50 hover:border-accent/40 transition-colors"
                >
                  <ImageWithSkeleton
                    src={member.photo ?? null}
                    alt={member.name}
                    className="w-12 h-12 rounded-full shrink-0"
                    imgClassName="object-cover rounded-full"
                    fallback={
                      <div className="w-12 h-12 rounded-full bg-primary/90 border-2 border-accent flex items-center justify-center shrink-0">
                        <span className="font-display font-black text-primary-foreground text-sm">
                          {member.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                        </span>
                      </div>
                    }
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-semibold text-foreground text-base leading-snug truncate">{member.name}</p>
                    {member.role && (
                      <p className="text-accent text-sm font-semibold">{member.role}</p>
                    )}
                  </div>
                  {cityOf(member.location) && (
                    <div className="hidden sm:flex items-center gap-1 text-muted-foreground text-sm shrink-0">
                      <MapPin size={12} />
                      <span>{cityOf(member.location)}</span>
                    </div>
                  )}
                  {countryOf(member.location) && (
                    <span className="text-xl leading-none shrink-0" title={labelFor(countryOf(member.location)!)}>
                      {flagOf(countryOf(member.location)!)}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                type="button"
                onClick={() => goToPage(pageNum - 1)}
                disabled={pageNum === 1}
                aria-label="Previous page"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: pageCount }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === pageCount || Math.abs(p - pageNum) <= 1)
                .map((p, i, arr) => (
                  <span key={p} className="flex items-center gap-2">
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span className="text-muted-foreground text-sm px-1">…</span>
                    )}
                    <button
                      type="button"
                      onClick={() => goToPage(p)}
                      aria-current={p === pageNum ? "page" : undefined}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                        p === pageNum
                          ? "bg-accent text-white"
                          : "border border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                ))}

              <button
                type="button"
                onClick={() => goToPage(pageNum + 1)}
                disabled={pageNum === pageCount}
                aria-label="Next page"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
              >
                <ChevronRight size={16} />
              </button>
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
                <h3 className="font-display font-bold text-foreground text-lg">{joinCta?.heading}</h3>
                <p className="text-muted-foreground text-sm mt-1">{joinCta?.body?.[0]}</p>
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
