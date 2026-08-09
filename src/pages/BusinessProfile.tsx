import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Phone, Mail, Globe, Clock,
  Instagram, Facebook, Twitter, Store, CheckCircle2,
  Share2, CalendarDays, User, Layers, Sparkles, Zap,
  Target, RefreshCw, Server, Cloud, Code2, Building2,
  Star, Quote, ExternalLink, ArrowRight, Shield, X as XIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import SaveButton from "@/components/SaveButton";
import {
  CATEGORY_GRADIENTS,
  type ServiceCategory,
  type Testimonial,
} from "@/data/businesses";
import { useSanityBusinesses } from "@/hooks/useSanityBusinesses";

// ── Inline SVG icons ────────────────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.18 8.18 0 004.77 1.52V6.95a4.85 4.85 0 01-1-.26z" />
  </svg>
);

// ── Reusable tiny components ────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          className={n <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );
}

// ── Icon / colour mappings ──────────────────────────────────────────────────

const SERVICE_CAT_ICONS: Record<string, React.ReactNode> = {
  "Managed IT Support & Outsourcing": <Server size={15} className="text-blue-500" />,
  "Domains, Hosting & Email Solutions": <Globe size={15} className="text-emerald-500" />,
  "Cloud, DevOps & Automation": <Cloud size={15} className="text-purple-500" />,
  "Software & Application Development": <Code2 size={15} className="text-orange-500" />,
};

const VALUE_ICONS: React.ReactNode[] = [
  <Sparkles size={17} className="text-accent" />,
  <RefreshCw size={17} className="text-accent" />,
  <Zap size={17} className="text-accent" />,
  <Target size={17} className="text-accent" />,
  <Shield size={17} className="text-accent" />,
  <Star size={17} className="text-accent" />,
];

// ── Main page ───────────────────────────────────────────────────────────────

export default function BusinessProfile() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: businesses = [] } = useSanityBusinesses();

  const [showBar, setShowBar] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const business = businesses.find((b) => b.slug === slug);

  // Reset tab when navigating between profiles
  useEffect(() => { setActiveTab(0); }, [slug]);

  // Sticky action bar — appears once hero has scrolled out of view
  useEffect(() => {
    const fn = () => setShowBar(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // SEO: document title + meta tags
  useEffect(() => {
    if (!business) return;
    const title = `${business.name} | Ijebu Igbo Descendants in Diaspora`;
    const desc  = business.tagline
      ? `${business.tagline} — ${business.description.slice(0, 140)}...`
      : business.description.slice(0, 160);
    const image = business.flyer ?? business.banner ?? "/logo.webp";
    const url   = window.location.href;

    document.title = title;

    const setMeta = (sel: string, attr: string, val: string) => {
      let el = document.querySelector<HTMLMetaElement>(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, val);
      el.setAttribute("data-biz-seo", "1");
    };

    setMeta('meta[name="description"]',           "content", desc);
    setMeta('meta[property="og:title"]',           "content", title);
    setMeta('meta[property="og:description"]',     "content", desc);
    setMeta('meta[property="og:image"]',           "content", image);
    setMeta('meta[property="og:url"]',             "content", url);
    setMeta('meta[property="og:type"]',            "content", "business.business");
    setMeta('meta[name="twitter:title"]',          "content", title);
    setMeta('meta[name="twitter:description"]',    "content", desc);
    setMeta('meta[name="twitter:image"]',          "content", image);

    return () => {
      document.title = "Ijebu Igbo Descendants in Diaspora";
      document.querySelectorAll("[data-biz-seo]").forEach((el) => {
        const orig = el.getAttribute("data-biz-original");
        if (orig !== null) el.setAttribute("content", orig);
      });
    };
  }, [business]);

  // SEO: Schema.org LocalBusiness JSON-LD
  useEffect(() => {
    if (!business) return;

    const sameAs: string[] = [
      business.social?.instagram,
      business.social?.facebook,
      business.social?.twitter,
      business.social?.tiktok,
    ].filter(Boolean) as string[];

    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: business.name,
      description: business.description,
      ...(business.tagline  && { slogan: business.tagline }),
      ...(business.phone    && { telephone: business.phone }),
      ...(business.email    && { email: business.email }),
      ...(business.website  && { url: business.website.startsWith("http") ? business.website : `https://${business.website}` }),
      ...(business.location && { address: { "@type": "PostalAddress", streetAddress: business.location } }),
      ...(business.flyer    && { image: business.flyer }),
      ...(business.established && { foundingDate: business.established }),
      ...(sameAs.length     && { sameAs }),
      ...(business.hours?.length && {
        openingHoursSpecification: business.hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day,
          opens: h.time.split("–")[0]?.trim(),
          closes: h.time.split("–")[1]?.trim(),
        })),
      }),
    };

    const el = Object.assign(document.createElement("script"), {
      type: "application/ld+json",
      id: "biz-schema",
      textContent: JSON.stringify(schema),
    });
    document.head.appendChild(el);
    return () => document.getElementById("biz-schema")?.remove();
  }, [business]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: business?.name ?? "", url });
    else await navigator.clipboard.writeText(url);
  };

  // ── 404 state ─────────────────────────────────────────────────────────────
  if (!business) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <Store size={56} className="text-muted-foreground/20" />
          <h1 className="font-display font-bold text-2xl">Business not found</h1>
          <p className="text-muted-foreground text-sm">This listing may have moved or been removed.</p>
          <button onClick={() => navigate("/businesses")} className="btn-primary mt-2">Back to Directory</button>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Derived values ─────────────────────────────────────────────────────────
  const gradient      = CATEGORY_GRADIENTS[business.category] ?? "from-primary to-primary/70";
  const waNumber      = (business.whatsapp ?? business.phone ?? "").replace(/\D/g, "");
  const initials      = business.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const websiteHref   = business.website
    ? (business.website.startsWith("http") ? business.website : `https://${business.website}`)
    : null;

  const related = businesses.filter(
    (b) => b.category === business.category && b.slug !== business.slug
  ).slice(0, 3);

  const has = {
    contact:          !!(business.phone || business.email || business.website || business.location),
    social:           !!(business.social && Object.values(business.social).some(Boolean)),
    hours:            (business.hours?.length ?? 0) > 0,
    gallery:          (business.gallery?.length ?? 0) > 0,
    whatWeDo:         (business.whatWeDo?.length ?? 0) > 0,
    services:         (business.services?.length ?? 0) > 0,
    serviceCategories:(business.serviceCategories?.length ?? 0) > 0,
    values:           (business.values?.length ?? 0) > 0,
    partners:         (business.partners?.length ?? 0) > 0,
    focusAreas:       (business.focusAreas?.length ?? 0) > 0,
    benefits:         (business.benefits?.length ?? 0) > 0,
    testimonials:     (business.testimonials?.length ?? 0) > 0,
    flyer:            !!business.flyer,
    promoVideo:       !!business.promoVideo,
    anyDetail:        false,
  };
  has.anyDetail = has.whatWeDo || has.services || has.serviceCategories
    || has.gallery || has.values || has.benefits || has.flyer;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Navbar />

      {/* ━━━━ STICKY ACTION BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: -52, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -52, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-14 md:top-[72px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-md"
          >
            <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
              {/* Identity */}
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => navigate("/businesses")}
                  className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                  aria-label="Back to directory"
                >
                  <ArrowLeft size={15} />
                </button>
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-[10px] font-bold leading-none">{initials}</span>
                </div>
                <span className="font-display font-bold text-foreground text-sm truncate">{business.name}</span>
              </div>
              {/* Quick actions */}
              <div className="flex items-center gap-2 shrink-0">
                <SaveButton slug={business.slug} kind="business" variant="full" className="!py-1.5 !px-3 !text-xs" />
                {waNumber && (
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    <WhatsAppIcon /> WhatsApp
                  </a>
                )}
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    <Phone size={12} /> Call
                  </a>
                )}
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="inline-flex items-center gap-1.5 border border-border hover:border-primary text-foreground hover:text-primary text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Mail size={12} /> Email
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━ LIGHTBOX ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <XIcon size={28} />
            </button>
            <ImageWithSkeleton
              src={lightbox}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
              imgClassName="object-contain"
              loading="eager"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-14 md:pt-[72px] overflow-hidden">
        <div className="relative min-h-[620px] md:min-h-[700px] flex flex-col">

          {/* Background layer */}
          {business.banner || business.flyer ? (
            <>
              <ImageWithSkeleton
                src={business.banner ?? business.flyer ?? null}
                alt={business.name}
                className="absolute inset-0 w-full h-full"
                imgClassName="object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
            </>
          ) : (
            <>
              <AnimatedHeroBg gradientClass={`bg-gradient-to-br ${gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
            </>
          )}

          {/* Bottom page-bg fade */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f4f6f8] to-transparent z-10" />

          {/* Giant initials watermark */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none
                       font-display font-black text-white/[0.035] leading-none overflow-hidden"
            style={{ fontSize: "clamp(220px, 32vw, 480px)" }}
          >
            {initials}
          </span>

          {/* Top bar: back + share */}
          <div className="relative z-30 flex items-center justify-between px-5 md:px-10 pt-6">
            <button
              onClick={() => navigate("/businesses")}
              className="flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-white text-sm
                         font-semibold px-4 py-2 rounded-full backdrop-blur-sm border border-white/15
                         transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Directory</span>
            </button>
            <div className="flex items-center gap-2">
              {business.featured && (
                <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  ★ Featured
                </span>
              )}
              <button
                onClick={handleShare}
                className="bg-black/30 hover:bg-black/50 text-white p-2.5 rounded-full backdrop-blur-sm
                           border border-white/15 transition-colors"
                aria-label="Share"
              >
                <Share2 size={15} />
              </button>
            </div>
          </div>

          {/* Hero centred content */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-5 pb-24 md:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Category chip */}
              <span className="inline-block bg-white/15 backdrop-blur-md text-white text-xs font-bold
                               tracking-widest uppercase px-5 py-2 rounded-full border border-white/25 mb-6">
                {business.category}
              </span>

              {/* Business name */}
              <h1
                className="font-display font-black text-white leading-[1.04] mb-5 drop-shadow-xl"
                style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)" }}
              >
                {business.name}
              </h1>

              {business.tagline && (
                <p className="text-white/80 text-lg sm:text-xl font-medium mb-10 max-w-2xl leading-relaxed">
                  {business.tagline}
                </p>
              )}

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {waNumber && (
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fba58] text-white
                               font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-black/25
                               transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <WhatsAppIcon /> WhatsApp Us
                  </a>
                )}
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="inline-flex items-center gap-2 bg-white text-foreground hover:bg-white/90
                               font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-black/25
                               transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Phone size={15} className="text-primary" /> Call Now
                  </a>
                )}
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm
                               text-white font-bold px-7 py-3.5 rounded-xl text-sm border border-white/25
                               transition-all hover:-translate-y-0.5"
                  >
                    <Mail size={15} /> Email
                  </a>
                )}
                {websiteHref && (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm
                               text-white font-bold px-7 py-3.5 rounded-xl text-sm border border-white/25
                               transition-all hover:-translate-y-0.5"
                  >
                    <Globe size={15} /> Website <ExternalLink size={12} className="opacity-70" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━ QUICK-FACTS STRIP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {(business.location || business.ownerName || business.established || business.featured) && (
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-sm text-muted-foreground
                            overflow-x-auto scrollbar-none">
              {business.location && (
                <span className="flex items-center gap-1.5 shrink-0">
                  <MapPin size={13} className="text-accent" /> {business.location}
                </span>
              )}
              {business.ownerName && (
                <span className="flex items-center gap-1.5 shrink-0">
                  <User size={13} className="text-accent" /> {business.ownerName}
                </span>
              )}
              {business.established && (
                <span className="flex items-center gap-1.5 shrink-0">
                  <CalendarDays size={13} className="text-accent" /> Est. {business.established}
                </span>
              )}
              {business.featured && (
                <span className="flex items-center gap-1.5 shrink-0 text-accent font-semibold">
                  <Star size={13} className="fill-accent" /> Featured Business
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ━━━━ MAIN LAYOUT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
          <aside className="md:col-span-1 md:order-last space-y-5">
            <div className="md:sticky md:top-28 space-y-5">

              {/* Flyer — desktop only; on mobile it shows in-flow with the main content */}
              {has.flyer && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 }}
                  className="hidden md:block bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                >
                  <div className="px-6 pt-6 pb-3">
                    <SectionHeader icon={<Layers size={16} className="text-accent" />} title="Flyer" />
                  </div>
                  <button className="block w-full" onClick={() => setLightbox(business.flyer!)}>
                    <ImageWithSkeleton
                      src={business.flyer ?? null}
                      alt="Business flyer"
                      className="w-full"
                      imgClassName="!h-auto object-contain hover:opacity-95 transition-opacity"
                    />
                  </button>
                </motion.section>
              )}

              {/* Contact card */}
              {has.contact && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                >
                  <div className={`bg-gradient-to-r ${gradient} px-5 py-4`}>
                    <h2 className="font-display font-bold text-white text-base">Get In Touch</h2>
                    <p className="text-white/65 text-xs mt-0.5">We'd love to hear from you</p>
                  </div>
                  <div className="p-4 space-y-2.5">
                    {waNumber && (
                      <a
                        href={`https://wa.me/${waNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full bg-[#25D366] hover:bg-[#1fba58]
                                   text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors"
                      >
                        <WhatsAppIcon />
                        <span>Send a WhatsApp Message</span>
                      </a>
                    )}
                    {business.phone && (
                      <a
                        href={`tel:${business.phone}`}
                        className="flex items-center gap-3 w-full border border-border hover:border-primary
                                   text-foreground hover:text-primary text-sm px-4 py-3 rounded-xl
                                   transition-colors group"
                      >
                        <Phone size={14} className="text-accent shrink-0" />
                        <span className="font-medium">{business.phone}</span>
                      </a>
                    )}
                    {business.email && (
                      <a
                        href={`mailto:${business.email}`}
                        className="flex items-center gap-3 w-full border border-border hover:border-primary
                                   text-foreground hover:text-primary text-sm px-4 py-3 rounded-xl
                                   transition-colors"
                      >
                        <Mail size={14} className="text-accent shrink-0 flex-none" />
                        <span className="font-medium break-all text-xs">{business.email}</span>
                      </a>
                    )}
                    {websiteHref && (
                      <a
                        href={websiteHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full border border-border hover:border-primary
                                   text-foreground hover:text-primary text-sm px-4 py-3 rounded-xl
                                   transition-colors"
                      >
                        <Globe size={14} className="text-accent shrink-0" />
                        <span className="font-medium truncate text-xs">{business.website}</span>
                        <ExternalLink size={11} className="ml-auto shrink-0 text-muted-foreground" />
                      </a>
                    )}
                    {business.location && (
                      <div className="flex items-start gap-3 text-sm px-4 py-3 rounded-xl bg-muted/40">
                        <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-xs leading-relaxed">
                          {business.location}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Opening hours */}
              {has.hours && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.13 }}
                  className="bg-white rounded-2xl border border-border p-5 shadow-sm"
                >
                  <h2 className="font-display font-bold text-sm text-foreground mb-3.5 flex items-center gap-2">
                    <Clock size={14} className="text-accent" /> Opening Hours
                  </h2>
                  <div className="space-y-2">
                    {business.hours!.map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span className="font-semibold text-foreground">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Social */}
              {has.social && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.17 }}
                  className="bg-white rounded-2xl border border-border p-5 shadow-sm"
                >
                  <h2 className="font-display font-bold text-sm text-foreground mb-3.5">Follow Us</h2>
                  <div className="flex flex-col gap-2.5">
                    {business.social?.instagram && (
                      <a
                        href={`https://instagram.com/${business.social.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground group"
                      >
                        <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500
                                         rounded-lg flex items-center justify-center shrink-0">
                          <Instagram size={14} className="text-white" />
                        </span>
                        <span className="text-xs">@{business.social.instagram.replace("@", "")}</span>
                        <ExternalLink size={11} className="ml-auto text-muted-foreground/50 group-hover:text-muted-foreground" />
                      </a>
                    )}
                    {business.social?.facebook && (
                      <a
                        href={`https://facebook.com/${business.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground group"
                      >
                        <span className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center shrink-0">
                          <Facebook size={14} className="text-white" />
                        </span>
                        <span className="text-xs">{business.social.facebook}</span>
                        <ExternalLink size={11} className="ml-auto text-muted-foreground/50 group-hover:text-muted-foreground" />
                      </a>
                    )}
                    {business.social?.twitter && (
                      <a
                        href={`https://twitter.com/${business.social.twitter.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground group"
                      >
                        <span className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                          <Twitter size={14} className="text-white" />
                        </span>
                        <span className="text-xs">@{business.social.twitter.replace("@", "")}</span>
                        <ExternalLink size={11} className="ml-auto text-muted-foreground/50 group-hover:text-muted-foreground" />
                      </a>
                    )}
                    {business.social?.tiktok && (
                      <a
                        href={`https://tiktok.com/@${business.social.tiktok.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground group"
                      >
                        <span className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                          <TikTokIcon />
                        </span>
                        <span className="text-xs">@{business.social.tiktok.replace("@", "")}</span>
                        <ExternalLink size={11} className="ml-auto text-muted-foreground/50 group-hover:text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Community trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary/5 border border-primary/15 rounded-2xl p-5 text-center"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield size={18} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">Ijebu Igbo Community</p>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Verified member of the Connect Ijebu Roots business network
                </p>
                <button
                  onClick={() => navigate("/businesses")}
                  className="text-xs text-primary font-semibold hover:underline
                             flex items-center gap-1 mx-auto"
                >
                  Browse All Businesses <ArrowRight size={11} />
                </button>
              </motion.div>

            </div>
          </aside>

          {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
          <main className="md:col-span-2 space-y-6">

            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl border border-border p-6 shadow-sm"
            >
              <SectionHeader icon={<Store size={16} className="text-accent" />}
                             title={`About ${business.name}`} />
              <p className="text-foreground/70 leading-relaxed text-sm sm:text-base mt-4">
                {business.description}
              </p>
            </motion.section>

            {/* What We Do */}
            {has.whatWeDo && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <SectionHeader icon={<Layers size={16} className="text-accent" />} title="What We Do" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                  {business.whatWeDo!.map((section, i) => (
                    <div key={i} className="bg-[#f4f6f8] rounded-xl p-4 border border-border/50">
                      <h3 className="font-semibold text-sm text-foreground mb-2">{section.title}</h3>
                      {section.description && (
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                          {section.description}
                        </p>
                      )}
                      <ul className="space-y-1.5">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-1.5 text-xs text-foreground/70">
                            <CheckCircle2 size={11} className="text-accent shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Services — tabbed categories */}
            {has.serviceCategories && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
              >
                <div className="px-6 pt-6">
                  <SectionHeader icon={<Building2 size={16} className="text-accent" />} title="Our Services" />
                </div>

                {/* Tab bar (only rendered if >1 category) */}
                {business.serviceCategories!.length > 1 && (
                  <div className="px-6 mt-4 overflow-x-auto scrollbar-none">
                    <div className="flex gap-0 border-b border-border">
                      {business.serviceCategories!.map((cat, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTab(i)}
                          className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold
                                      whitespace-nowrap border-b-2 -mb-px transition-colors
                                      ${activeTab === i
                                        ? "border-accent text-accent"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                      }`}
                        >
                          {SERVICE_CAT_ICONS[cat.name] ?? <Server size={13} />}
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.18 }}
                    >
                      <ServicePanel
                        cat={business.serviceCategories![
                          business.serviceCategories!.length === 1 ? 0 : activeTab
                        ]}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.section>
            )}

            {/* Flat services fallback */}
            {has.services && !has.serviceCategories && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <SectionHeader icon={<Building2 size={16} className="text-accent" />} title="Services" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                  {business.services!.map((s, i) => (
                    <li key={i}
                        className="flex items-start gap-2 text-sm text-foreground/75
                                   bg-[#f4f6f8] rounded-lg px-3 py-2.5 border border-border/50">
                      <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Why Choose — benefits checklist */}
            {has.benefits && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <SectionHeader icon={<CheckCircle2 size={16} className="text-accent" />}
                               title={`Why Choose ${business.name}?`} />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  {business.benefits!.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-accent/10 rounded-full flex items-center
                                       justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={11} className="text-accent" />
                      </span>
                      <span className="text-sm text-foreground/75 leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Company Values */}
            {has.values && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <SectionHeader icon={<Sparkles size={16} className="text-accent" />} title="Our Values" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  {business.values!.map((val, i) => (
                    <div key={i} className="rounded-xl border border-border bg-[#f4f6f8] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {VALUE_ICONS[i % VALUE_ICONS.length]}
                        <h3 className="font-semibold text-sm text-foreground">{val.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{val.description}</p>
                      {val.items && (
                        <ul className="mt-2.5 flex flex-wrap gap-1.5">
                          {val.items.map((item, j) => (
                            <span key={j}
                                  className="text-xs bg-accent/10 text-accent font-medium px-2 py-0.5 rounded-full">
                              {item}
                            </span>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Focus areas */}
            {has.focusAreas && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <SectionHeader icon={<Zap size={16} className="text-accent" />} title="Technology Focus" />
                <div className="flex flex-wrap gap-2 mt-4">
                  {business.focusAreas!.map((area, i) => (
                    <span key={i}
                          className="text-sm bg-primary/5 text-primary border border-primary/15
                                     font-medium px-3 py-1.5 rounded-full hover:bg-primary/10
                                     transition-colors">
                      {area}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Partners */}
            {has.partners && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <SectionHeader icon={<Target size={16} className="text-accent" />} title="Technology Partners" />
                <p className="text-xs text-muted-foreground mt-1 mb-4">
                  Strategic alliances powering our solutions
                </p>
                <div className="flex flex-wrap gap-2">
                  {business.partners!.map((p, i) => (
                    <span key={i}
                          className="text-sm bg-[#f4f6f8] text-foreground/75 border border-border
                                     font-semibold px-3 py-1.5 rounded-lg">
                      {p}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Gallery */}
            {has.gallery && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm"
              >
                <SectionHeader icon={<Layers size={16} className="text-accent" />} title="Gallery" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {business.gallery!.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(img)}
                      className="relative aspect-square rounded-xl overflow-hidden group
                                 focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <ImageWithSkeleton
                        src={img}
                        alt={`${business.name} ${i + 1}`}
                        className="w-full h-full"
                        imgClassName="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30
                                      transition-colors flex items-center justify-center">
                        <ExternalLink size={20}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Flyer — shown in-flow on mobile; on desktop it moves to the sidebar (see aside) */}
            {has.flyer && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="md:hidden bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
              >
                <div className="px-6 pt-6 pb-3">
                  <SectionHeader icon={<Layers size={16} className="text-accent" />} title="Flyer" />
                </div>
                <button className="block w-full max-w-md mx-auto" onClick={() => setLightbox(business.flyer!)}>
                  <ImageWithSkeleton
                    src={business.flyer ?? null}
                    alt="Business flyer"
                    className="w-full"
                    imgClassName="!h-auto object-contain hover:opacity-95 transition-opacity"
                  />
                </button>
              </motion.section>
            )}

            {/* Promotional Video */}
            {has.promoVideo && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
              >
                <div className="px-6 pt-6 pb-3">
                  <SectionHeader icon={<Layers size={16} className="text-accent" />} title="Promotional Video" />
                </div>
                <div className="px-6 pb-6">
                  {business.promoVideo!.includes("youtube.com") || business.promoVideo!.includes("youtu.be") ? (
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        src={business.promoVideo!
                          .replace("watch?v=", "embed/")
                          .replace("youtu.be/", "www.youtube.com/embed/")}
                        title="Promotional Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full rounded-xl"
                      />
                    </div>
                  ) : (
                    <video
                      src={business.promoVideo}
                      controls
                      className="w-full rounded-xl max-h-[520px]"
                    />
                  )}
                </div>
              </motion.section>
            )}

            {/* Empty state for stub profiles */}
            {!has.anyDetail && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-dashed border-primary/20 bg-primary/5
                           p-12 text-center"
              >
                <Store size={36} className="mx-auto mb-4 text-primary/30" />
                <p className="font-display font-bold text-foreground text-base mb-2">
                  Full Profile Coming Soon
                </p>
                <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto leading-relaxed">
                  This business is being set up. Check back soon for services, photos, and more.
                </p>
                {(business.phone || business.email || waNumber) && (
                  <p className="text-xs text-muted-foreground">
                    In the meantime, use the contact card to get in touch directly.
                  </p>
                )}
              </motion.div>
            )}

          </main>
        </div>

        {/* ━━━━ TESTIMONIALS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {has.testimonials && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <Quote size={20} className="text-accent" />
              <h2 className="font-display font-bold text-xl text-foreground">What Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {business.testimonials!.map((t: Testimonial, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.08 }}
                  className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col"
                >
                  <Quote size={18} className="text-accent/25 mb-3" />
                  <p className="text-sm text-foreground/70 leading-relaxed flex-1 mb-4 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-end justify-between pt-3 border-t border-border">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t.author}</p>
                      {(t.role || t.company) && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.role}{t.role && t.company ? " · " : ""}{t.company}
                        </p>
                      )}
                    </div>
                    <StarRating rating={t.rating} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ━━━━ RELATED BUSINESSES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-10"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-xl text-foreground">
                More in <span className="text-primary">{business.category}</span>
              </h2>
              <button
                onClick={() => navigate("/businesses")}
                className="text-sm text-primary font-semibold flex items-center gap-1
                           hover:gap-2 transition-all"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((b, i) => {
                const g = CATEGORY_GRADIENTS[b.category] ?? "from-primary to-primary/70";
                const bi = b.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
                return (
                  <motion.button
                    key={b.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.27 + i * 0.07 }}
                    onClick={() => navigate(`/businesses/${b.slug}`)}
                    className="group bg-white rounded-2xl border border-border overflow-hidden
                               shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all
                               duration-300 text-left w-full"
                  >
                    <div className={`h-28 bg-gradient-to-br ${g} flex items-center justify-center overflow-hidden`}>
                      {b.flyer ? (
                        <ImageWithSkeleton src={b.flyer} alt={b.name}
                             className="w-full h-full"
                             imgClassName="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <span className="text-3xl font-display font-black text-white/75">{bi}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-sm text-foreground
                                     group-hover:text-primary transition-colors mb-1 leading-tight">
                        {b.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {b.description}
                      </p>
                      <span className="text-xs font-semibold text-primary flex items-center gap-1
                                       group-hover:gap-2 transition-all">
                        View Profile <ArrowRight size={11} />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>

      {/* ━━━━ CONVERSION CTA BANNER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden mt-10">
        <AnimatedHeroBg gradientClass={`bg-gradient-to-br ${gradient}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-white/55 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Ready to Work Together?
            </p>
            <h2
              className="font-display font-black text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {business.name}
            </h2>
            <p className="text-white/70 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {business.tagline ??
                `Get in touch today and let's see how ${business.name} can help you.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {waNumber && (
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fba58] text-white
                             font-bold px-8 py-4 rounded-xl text-sm shadow-xl shadow-black/30
                             transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon /> WhatsApp Us
                </a>
              )}
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center gap-2 bg-white text-foreground hover:bg-white/90
                             font-bold px-8 py-4 rounded-xl text-sm shadow-xl shadow-black/30
                             transition-all hover:-translate-y-0.5"
                >
                  <Phone size={15} className="text-primary" />
                  {business.phone}
                </a>
              )}
              {!business.phone && business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 bg-white text-foreground hover:bg-white/90
                             font-bold px-8 py-4 rounded-xl text-sm shadow-xl shadow-black/30
                             transition-all hover:-translate-y-0.5"
                >
                  <Mail size={15} className="text-primary" /> Email Us
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Section helpers (function declarations are hoisted — safe to define below) ──

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="font-display font-bold text-lg text-foreground">{title}</h2>
    </div>
  );
}

function ServicePanel({ cat }: { cat: ServiceCategory }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {SERVICE_CAT_ICONS[cat.name] ?? <Server size={15} className="text-primary" />}
        <h3 className="font-semibold text-sm text-foreground">{cat.name}</h3>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {cat.items.map((item, j) => (
          <li key={j}
              className="flex items-start gap-2 text-sm text-foreground/70
                         bg-[#f4f6f8] rounded-lg px-3 py-2.5 border border-border/50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[7px]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
