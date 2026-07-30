import { useState, useMemo, useRef, useEffect } from "react";
import ListBusinessModal from "@/components/ListBusinessModal";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from "framer-motion";
import {
  Search, Store, X, ArrowUpDown, ArrowRight, Building2,
  CheckCircle2, Globe, MessageCircle, MapPin, SlidersHorizontal,
  ChevronDown, Sparkles, TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import {
  CATEGORY_GRADIENTS,
  CATEGORY_COLORS,
  type Business,
} from "@/data/businesses";
import { useSanityBusinesses } from "@/hooks/useSanityBusinesses";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { BUSINESSES_PAGE } from "@/data/pageContent";

const CATEGORY_PILLS = [
  "Food & Catering",
  "Fashion & Beauty",
  "Real Estate",
  "Professional Services",
  "Technology",
  "Health & Wellness",
  "Retail & Trade",
  "Education",
] as const;

const REGIONS = ["All", "UK", "Nigeria", "Diaspora"] as const;
type Region = typeof REGIONS[number];

const SORT_OPTIONS = [
  { value: "default",  label: "Default" },
  { value: "featured", label: "Featured First" },
  { value: "newest",   label: "Newest" },
  { value: "az",       label: "A → Z" },
  { value: "za",       label: "Z → A" },
] as const;
type Sort = typeof SORT_OPTIONS[number]["value"];

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/* ── Counting stat ──────────────────────────────────────────────── */
function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(start);
      if (start >= target) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [target]);
  return <>{val}{suffix}</>;
}

/* ── Floating shape for gradient cards ─────────────────────────── */
function FloatingShapes({ gradient }: { gradient: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} overflow-hidden`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: [80, 56, 100][i],
            height: [80, 56, 100][i],
            left: [`${[15, 65, 40][i]}%`],
            top: [`${[10, 50, 65][i]}%`],
          }}
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.08, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: [4, 5.5, 3.5][i],
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
        <span className="text-white/90 font-display font-black text-3xl sm:text-4xl tracking-tight select-none drop-shadow">
          {/* initials injected by parent */}
        </span>
      </div>
    </div>
  );
}

/* ── Business card with 3D tilt ─────────────────────────────────── */
function BusinessCard({ business, index }: { business: Business; index: number }) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const gradient = CATEGORY_GRADIENTS[business.category] ?? "from-primary to-primary/70";
  const waNumber = (business.whatsapp ?? business.phone ?? "").replace(/\D/g, "");

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [6, -6]), spring);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-6, 6]), spring);
  const glareOpacity = useSpring(useTransform(rawX, [-1, 1], [0, 0.12]), spring);
  const glareBackground = useTransform(
    glareOpacity,
    (v) => `linear-gradient(135deg, rgba(255,255,255,${v}) 0%, transparent 55%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    rawY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  const col = index % 4;
  const row = Math.floor(index / 4);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: 10 }}
      transition={{
        duration: 0.5,
        delay: Math.min(col * 0.06 + row * 0.04, 0.5),
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl border border-border overflow-hidden
                 shadow-sm hover:shadow-2xl transition-shadow duration-300
                 flex flex-col cursor-pointer active:scale-[0.98] touch-manipulation"
      onClick={() => navigate(`/businesses/${business.slug}`)}
    >
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
        style={{ background: glareBackground }}
      />

      {/* Visual header */}
      <div className="relative h-32 sm:h-44 overflow-hidden shrink-0">
        {business.flyer ? (
          <img
            src={business.flyer}
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`relative w-full h-full bg-gradient-to-br ${gradient} overflow-hidden`}>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: [90, 60, 110][i],
                  height: [90, 60, 110][i],
                  left: `${[12, 62, 38][i]}%`,
                  top: `${[8, 48, 60][i]}%`,
                }}
                animate={{ y: [0, -10, 0], opacity: [0.12, 0.22, 0.12] }}
                transition={{ duration: [4, 5.5, 3.5][i], repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
              />
            ))}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="text-3xl sm:text-5xl font-display font-black text-white/90 tracking-tight select-none drop-shadow-md">
                {getInitials(business.name)}
              </span>
              <span className="text-white/55 text-[9px] sm:text-[11px] font-semibold tracking-widest uppercase">
                {business.category}
              </span>
            </div>
          </div>
        )}

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 bg-accent text-primary font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            View Profile <ArrowRight size={13} />
          </motion.div>
        </div>

        {/* Badges */}
        {business.featured && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-accent text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow z-10 text-primary">
            ★ Featured
          </div>
        )}
        <div className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10
                         text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1
                         rounded-full border backdrop-blur-sm bg-white/85 hidden sm:block
                         ${CATEGORY_COLORS[business.category] ?? "text-gray-700 border-gray-200"}`}>
          {business.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 relative z-10">
        <h3 className="font-display font-bold text-foreground text-sm sm:text-base leading-tight
                       group-hover:text-primary transition-colors line-clamp-1">
          {business.name}
        </h3>
        {business.tagline && (
          <p className="text-[10px] sm:text-xs text-accent font-semibold mt-0.5 line-clamp-1">{business.tagline}</p>
        )}
        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 line-clamp-2 flex-1">
          {business.description}
        </p>

        {/* Footer row */}
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-border flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 min-w-0">
            {business.location && (
              <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-0.5 truncate">
                <MapPin size={10} className="shrink-0" />
                <span className="truncate max-w-[72px] sm:max-w-none">
                  {business.location.split(",").slice(-1)[0].trim()}
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-[#25D366] hover:bg-[#1fba58] rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            )}
            {business.website && (
              <a
                href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-primary/10 hover:bg-primary/20 rounded-lg items-center justify-center transition-colors hidden sm:flex"
                aria-label="Website"
              >
                <Globe size={13} className="text-primary" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function Businesses() {
  const { data: BUSINESSES = [] } = useSanityBusinesses();
  const { data: page } = useSanityPage("businesses", BUSINESSES_PAGE);
  const hero = page?.hero ?? BUSINESSES_PAGE.hero!;
  const cta = findSection(page?.sections, "businesses-cta") ?? findSection(BUSINESSES_PAGE.sections, "businesses-cta");

  useEffect(() => {
    const title = "Business Directory | Ijebu Igbo Descendants — Connect Ijebu Roots";
    const desc  = "Browse businesses owned by Ijebu Igbo descendants in Nigeria and across the diaspora.";
    document.title = title;
    const setMeta = (sel: string, val: string) => {
      const el = document.querySelector<HTMLMetaElement>(sel);
      if (el) el.setAttribute("content", val);
    };
    setMeta('meta[name="description"]',        desc);
    setMeta('meta[property="og:title"]',        title);
    setMeta('meta[property="og:description"]',  desc);
    setMeta('meta[name="twitter:title"]',       title);
    setMeta('meta[name="twitter:description"]', desc);
    return () => { document.title = "Connect Ijebu Roots"; };
  }, []);

  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [region, setRegion] = useState<Region>("All");
  const [hasWhatsApp, setHasWhatsApp] = useState(false);
  const [hasWebsite, setHasWebsite] = useState(false);
  const [sort, setSort] = useState<Sort>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return [];
    return BUSINESSES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.tagline ?? "").toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [search]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const clearAll = () => {
    setSearch("");
    setSelectedCategories(new Set());
    setRegion("All");
    setHasWhatsApp(false);
    setHasWebsite(false);
    setSort("default");
  };

  const activeFilterCount =
    selectedCategories.size +
    (region !== "All" ? 1 : 0) +
    (hasWhatsApp ? 1 : 0) +
    (hasWebsite ? 1 : 0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = BUSINESSES.filter((b) => {
      const matchesCat    = selectedCategories.size === 0 || selectedCategories.has(b.category);
      const matchesSearch = !q || b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) ||
        (b.location ?? "").toLowerCase().includes(q) || (b.tagline ?? "").toLowerCase().includes(q) ||
        (b.ownerName ?? "").toLowerCase().includes(q);
      const matchesRegion = region === "All" || b.region === region;
      const matchesWA     = !hasWhatsApp || !!(b.whatsapp ?? b.phone);
      const matchesWeb    = !hasWebsite || !!b.website;
      return matchesCat && matchesSearch && matchesRegion && matchesWA && matchesWeb;
    });
    if (sort === "default")  list = [...list].sort((a, b) => (b.flyer ? 1 : 0) - (a.flyer ? 1 : 0));
    if (sort === "featured") list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (sort === "newest")   list = [...list].sort((a, b) => b.id - a.id);
    if (sort === "az")       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za")       list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [search, selectedCategories, region, hasWhatsApp, hasWebsite, sort]);

  const totalBusinesses = BUSINESSES.length;
  const totalCategories = CATEGORY_PILLS.length;

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <Navbar />
      <Seo path="/businesses" />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative min-h-[420px] md:min-h-[480px] flex flex-col items-center justify-center px-4 py-16">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary to-[#0b2a6e]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f8f6f1] to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center max-w-3xl mx-auto w-full"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30
                         text-accent text-sm font-bold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
            >
              <Store size={14} />
              {hero.eyebrow}
            </motion.div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
              {hero.title}
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
              {hero.subtitle}
            </p>

            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center justify-center gap-6 mb-8"
            >
              {[
                { icon: Store, label: "Businesses", value: totalBusinesses, suffix: "+" },
                { icon: Sparkles, label: "Categories", value: totalCategories, suffix: "" },
                { icon: TrendingUp, label: "Reach", value: 3, suffix: " Regions" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-display font-black text-white leading-none">
                    <AnimatedCount target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/50 text-[11px] font-semibold uppercase tracking-widest mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="relative max-w-lg mx-auto"
            >
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by name, service, location…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={(e) => e.key === "Escape" && setShowSuggestions(false)}
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white text-foreground
                           placeholder-muted-foreground text-sm focus:outline-none
                           focus:ring-2 focus:ring-accent/60 shadow-xl transition-shadow"
              />
              {search && (
                <button
                  onClick={() => { setSearch(""); setShowSuggestions(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}

              {/* Autocomplete */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl
                               border border-border shadow-xl z-20 overflow-hidden"
                  >
                    {suggestions.map((b) => {
                      const grad = CATEGORY_GRADIENTS[b.category] ?? "from-primary to-primary/70";
                      return (
                        <li key={b.id}>
                          <button
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                            onMouseDown={() => { setSearch(b.name); setShowSuggestions(false); }}
                          >
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center shrink-0`}>
                              <span className="text-white text-[10px] font-bold">{getInitials(b.name)}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{b.name}</p>
                              <p className="text-xs text-muted-foreground">{b.category}</p>
                            </div>
                            <CheckCircle2 size={14} className="text-accent ml-auto shrink-0" />
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ────────────────────────────────────────── */}
      <div className="sticky top-14 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {/* All */}
            <motion.button
              onClick={() => setSelectedCategories(new Set())}
              whileTap={{ scale: 0.95 }}
              className={`relative shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 border ${
                selectedCategories.size === 0
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              All
            </motion.button>

            {CATEGORY_PILLS.map((cat) => {
              const active = selectedCategories.has(cat);
              return (
                <motion.button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm
                              font-semibold transition-colors duration-200 border ${
                                active
                                  ? "bg-primary text-white border-primary shadow-sm"
                                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                              }`}
                >
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <CheckCircle2 size={12} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ADVANCED FILTERS ──────────────────────────────────────── */}
      <div className="bg-white border-b border-border">
        {/* Mobile toggle */}
        <div className="md:hidden max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
          <motion.button
            onClick={() => setShowFilters((v) => !v)}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full
                        border transition-colors min-h-[40px] ${
                          showFilters || activeFilterCount > 0
                            ? "bg-primary text-white border-primary"
                            : "bg-transparent text-muted-foreground border-border"
                        }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-accent text-primary text-xs font-black w-5 h-5 rounded-full flex items-center justify-center ml-0.5">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown size={14} className={`transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
          </motion.button>
          {activeFilterCount > 0 && (
            <button onClick={clearAll} className="text-xs font-semibold text-destructive flex items-center gap-1">
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="px-4 py-3 space-y-3">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Region</p>
                  <div className="flex flex-wrap gap-2">
                    {REGIONS.map((r) => (
                      <button key={r} onClick={() => setRegion(r)}
                        className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors min-h-[40px] ${
                          region === r ? "bg-accent text-primary border-accent" : "bg-transparent text-muted-foreground border-border"
                        }`}
                      >{r}</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setHasWhatsApp((v) => !v)}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-full border transition-colors min-h-[44px] ${
                      hasWhatsApp ? "bg-[#25D366] text-white border-[#25D366]" : "bg-transparent text-muted-foreground border-border"
                    }`}
                  ><MessageCircle size={14} /> WhatsApp</button>
                  <button onClick={() => setHasWebsite((v) => !v)}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-full border transition-colors min-h-[44px] ${
                      hasWebsite ? "bg-primary text-white border-primary" : "bg-transparent text-muted-foreground border-border"
                    }`}
                  ><Globe size={14} /> Has Website</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop filters */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 py-2.5 flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <MapPin size={13} className="text-muted-foreground shrink-0" />
            {REGIONS.map((r) => (
              <button key={r} onClick={() => setRegion(r)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  region === r ? "bg-accent text-primary border-accent" : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent"
                }`}
              >{r}</button>
            ))}
          </div>
          <div className="w-px h-5 bg-border mx-1" />
          <button onClick={() => setHasWhatsApp((v) => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              hasWhatsApp ? "bg-[#25D366] text-white border-[#25D366]" : "bg-transparent text-muted-foreground border-border hover:border-[#25D366] hover:text-[#25D366]"
            }`}
          ><MessageCircle size={12} /> Has WhatsApp</button>
          <button onClick={() => setHasWebsite((v) => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              hasWebsite ? "bg-primary text-white border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          ><Globe size={12} /> Has Website</button>
          {activeFilterCount > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1.5 text-xs font-semibold text-destructive hover:underline ml-auto">
              <X size={12} /> Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
            </button>
          )}
        </div>
      </div>

      {/* ── GRID ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-8" style={{ perspective: "1400px" }}>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={filtered.length + [...selectedCategories].join(",")}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              <span className="font-bold text-foreground">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "business" : "businesses"}
              {selectedCategories.size > 0 && ` in ${[...selectedCategories].join(", ")}`}
              {region !== "All" && ` · ${region}`}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 border border-border rounded-xl px-3 py-2 text-sm text-muted-foreground flex-1 sm:flex-none bg-white">
              <ArrowUpDown size={13} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-transparent text-sm text-foreground focus:outline-none cursor-pointer w-full"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <motion.button
              onClick={() => setShowListModal(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-sm !py-2 !px-3 sm:!px-4 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Building2 size={14} />
              <span className="hidden sm:inline">List Your Business</span>
              <span className="sm:hidden">List</span>
            </motion.button>
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-24"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <SlidersHorizontal size={52} className="mx-auto mb-4 text-muted-foreground/25" />
              </motion.div>
              <p className="text-lg font-bold text-foreground mb-1">No businesses match these filters</p>
              <p className="text-sm text-muted-foreground mb-5">Try adjusting your search or clearing some filters</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={clearAll}
                className="text-sm font-bold text-primary border border-primary/30 px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"
              >
                Clear all filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
            >
              {filtered.map((business, i) => (
                <BusinessCard key={business.id} business={business} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center bg-primary rounded-3xl px-8 py-12 shadow-elevated relative overflow-hidden"
        >
          {/* Background decorative circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-accent/10" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-accent/80 text-xs font-bold tracking-[0.15em] uppercase mb-3">
              <Sparkles size={12} />
              {cta?.eyebrow}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
              {cta?.heading}
            </h2>
            <p className="text-white/65 mb-7 text-sm sm:text-base max-w-md mx-auto">
              {cta?.body?.[0]}
            </p>
            <motion.button
              onClick={() => setShowListModal(true)}
              whileHover={{ scale: 1.04, brightness: 1.1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-7 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all text-sm sm:text-base"
            >
              <Building2 size={16} />
              Submit Your Business
              <ArrowRight size={15} />
            </motion.button>
            <p className="text-white/40 text-xs mt-4">
              {cta?.body?.[1]}
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />

      <ListBusinessModal open={showListModal} onOpenChange={setShowListModal} />
    </div>
  );
}
