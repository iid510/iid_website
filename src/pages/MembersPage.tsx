import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Search, MapPin, ChevronRight, ChevronLeft, LayoutGrid, List, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useSanityMembers } from "@/hooks/useSanityMembers";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { MEMBERS_PAGE } from "@/data/pageContent";
import { CURRENT_EXEC_ORDER, type Member } from "@/data/members";

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

// Always offered in the country filter, even before a member from that country is added.
const SUPPORTED_COUNTRIES = ["United Kingdom", "USA", "Canada", "Nigeria", "Ghana"];

// Ground truth: only the sitting executive committee counts as "Current Executive".
// Former officers, President Emeritus, Legal Officer, etc. are all "Other Members".
const CURRENT_EXECUTIVE_IDS = new Set(CURRENT_EXEC_ORDER);

function isCurrentExecutive(id: string): boolean {
  return CURRENT_EXECUTIVE_IDS.has(id);
}

const PAGE_SIZE = 24;

function initialsOf(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("");
}

/* ── Grid card ────────────────────────────────────────────────── */
function GridCard({ member, index, onPhotoClick }: { member: Member; index: number; onPhotoClick: (m: Member) => void }) {
  const country = countryOf(member.location);
  const city = cityOf(member.location);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.6), ease }}
      className="relative bg-card border border-border rounded-2xl overflow-hidden text-center hover:shadow-lg hover:border-accent/40 transition-all duration-300"
    >
      {/* Country flag badge — only shown when the list explicitly states a location */}
      {country && (
        <span
          className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full bg-card/90 shadow-md flex items-center justify-center text-2xl leading-none"
          title={labelFor(country)}
        >
          {flagOf(country)}
        </span>
      )}

      <div
        className={member.photo ? "cursor-zoom-in group/photo relative" : undefined}
        onClick={() => member.photo && onPhotoClick(member)}
      >
        {member.photo && (
          <div className="absolute inset-0 z-[5] bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full">
              View Photo
            </span>
          </div>
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
                {initialsOf(member.name)}
              </span>
            </div>
          </div>
          }
        />
      </div>
      <div className="p-3">
        <p className="font-semibold text-foreground text-base leading-snug">{member.name}</p>
        {member.role && (
          <p className="text-accent text-sm font-semibold mt-1">{member.role}</p>
        )}
        {city && (
          <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mt-1.5">
            <MapPin size={12} />
            <span>{city}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── List row ─────────────────────────────────────────────────── */
function ListRow({ member, index, onPhotoClick }: { member: Member; index: number; onPhotoClick: (m: Member) => void }) {
  const country = countryOf(member.location);
  const city = cityOf(member.location);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5), ease }}
      className="flex items-center gap-4 px-4 py-3 bg-card border border-border rounded-xl hover:bg-muted/50 hover:border-accent/40 transition-colors"
    >
      <div
        className={member.photo ? "cursor-zoom-in shrink-0" : "shrink-0"}
        onClick={() => member.photo && onPhotoClick(member)}
      >
        <ImageWithSkeleton
          src={member.photo ?? null}
          alt={member.name}
          className="w-12 h-12 rounded-full shrink-0"
          imgClassName="object-cover rounded-full"
          fallback={
            <div className="w-12 h-12 rounded-full bg-primary/90 border-2 border-accent flex items-center justify-center shrink-0">
              <span className="font-display font-black text-primary-foreground text-sm">
                {initialsOf(member.name)}
              </span>
            </div>
          }
        />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="font-semibold text-foreground text-base leading-snug truncate">{member.name}</p>
        {member.role && (
          <p className="text-accent text-sm font-semibold">{member.role}</p>
        )}
      </div>
      {city && (
        <div className="hidden sm:flex items-center gap-1 text-muted-foreground text-sm shrink-0">
          <MapPin size={12} />
          <span>{city}</span>
        </div>
      )}
      {country && (
        <span className="text-xl leading-none shrink-0" title={labelFor(country)}>
          {flagOf(country)}
        </span>
      )}
    </motion.div>
  );
}

/* ── Section (grid or list of members, with a heading) ──────────── */
function MemberSection({
  title, members, view, totalCount, onPhotoClick,
}: {
  title: string; members: Member[]; view: "grid" | "list"; totalCount?: number; onPhotoClick: (m: Member) => void;
}) {
  if (members.length === 0) return null;
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-display font-bold text-foreground text-lg sm:text-xl">{title}</h3>
        <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          {totalCount ?? members.length}
        </span>
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {members.map((m, i) => <GridCard key={m.id} member={m} index={i} onPhotoClick={onPhotoClick} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {members.map((m, i) => <ListRow key={m.id} member={m} index={i} onPhotoClick={onPhotoClick} />)}
        </div>
      )}
    </div>
  );
}

/* ── Photo lightbox ───────────────────────────────────────────── */
function PhotoLightbox({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.25, ease }}
        className="relative max-w-sm w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <X size={16} />
        </button>
        <ImageWithSkeleton
          src={member.photo ?? null}
          alt={member.name}
          className="w-full max-h-[70vh]"
          imgClassName="object-cover"
          loading="eager"
        />
        <div className="p-4">
          <h4 className="font-display font-bold text-foreground text-base">{member.name}</h4>
          {member.role && <p className="text-accent font-semibold text-sm mt-1">{member.role}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MembersPage() {
  const { data: MEMBERS = [] } = useSanityMembers();
  const { data: page } = useSanityPage("members", MEMBERS_PAGE);
  const hero = page?.hero ?? MEMBERS_PAGE.hero!;
  const joinCta = findSection(page?.sections, "members-cta") ?? findSection(MEMBERS_PAGE.sections, "members-cta");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState<"All" | "Current Executive" | "Non-Executive">("All");
  const [view, setView] = useState<"grid" | "list">("list");
  const [pageNum, setPageNum] = useState(1);
  const [lightboxMember, setLightboxMember] = useState<Member | null>(null);

  const countries = useMemo(() => {
    const known = MEMBERS.map((m) => countryOf(m.location)).filter((c): c is string => !!c);
    return ["All", ...Array.from(new Set([...SUPPORTED_COUNTRIES, ...known])).sort()];
  }, [MEMBERS]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MEMBERS.filter((m) => {
      const matchesCountry = country === "All" || countryOf(m.location) === country;
      const matchesCategory =
        category === "All" ||
        (category === "Current Executive" ? isCurrentExecutive(m.id) : !isCurrentExecutive(m.id));
      const matchesQuery = !q || m.name.toLowerCase().includes(q) || (m.location ?? "").toLowerCase().includes(q);
      return matchesCountry && matchesCategory && matchesQuery;
    });
  }, [query, country, category, MEMBERS]);

  // Total counts (for section badges) — current executives always sort first within `filtered`.
  const execCount = useMemo(() => filtered.filter((m) => isCurrentExecutive(m.id)).length, [filtered]);
  const nonExecCount = filtered.length - execCount;

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Reset to page 1 whenever the result set changes (new search/filter)
  useEffect(() => {
    setPageNum(1);
  }, [query, country, category]);

  // Pagination runs across ALL matching members together (executives first, then everyone
  // else, since that's already the sort order) — "Next" always advances the full list.
  const paginated = useMemo(() => {
    const start = (pageNum - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageNum]);

  const paginatedExec = useMemo(() => paginated.filter((m) => isCurrentExecutive(m.id)), [paginated]);
  const paginatedNonExec = useMemo(() => paginated.filter((m) => !isCurrentExecutive(m.id)), [paginated]);

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
        <div className="container-main relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
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

          {MEMBERS.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 bg-primary-foreground/10 border border-accent/30 rounded-2xl px-6 py-4 self-start lg:self-end"
            >
              <Users className="text-accent" size={28} />
              <div>
                <AnimatedCounter
                  value={MEMBERS.length}
                  className="font-display font-black text-3xl sm:text-4xl text-white leading-none"
                />
                <p className="text-primary-foreground/60 text-xs sm:text-sm font-semibold uppercase tracking-wide mt-1">
                  Members Strong
                </p>
              </div>
            </motion.div>
          )}
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
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="All">All Members</option>
              <option value="Current Executive">Current Executive</option>
              <option value="Non-Executive">Non-Executive</option>
            </select>
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

          {/* Members sections or empty state */}
          <div id="members-results" />
          {filtered.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground text-sm">No members match your search.</p>
            </div>
          ) : (
            <>
              <MemberSection title="Current Executives" members={paginatedExec} view={view} totalCount={execCount} onPhotoClick={setLightboxMember} />
              <MemberSection title="Other Members" members={paginatedNonExec} view={view} totalCount={nonExecCount} onPhotoClick={setLightboxMember} />
            </>
          )}

          {/* Pagination — runs across all matching members */}
          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-center gap-2 mt-2">
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
              <Link to="/join" className="shrink-0 btn-primary inline-flex items-center gap-2">
                Join Now <ChevronRight size={15} />
              </Link>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />

      <AnimatePresence>
        {lightboxMember && <PhotoLightbox member={lightboxMember} onClose={() => setLightboxMember(null)} />}
      </AnimatePresence>
    </div>
  );
}
