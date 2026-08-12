import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown, BookOpen, ScrollText, Landmark } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import Lightbox, { useLightbox, ZoomableImage } from "@/components/Lightbox";
import { resolveIcon } from "@/lib/iconMap";
import { useSanityTownBySlug } from "@/hooks/useSanityTowns";
import TownSwitcher from "@/components/kingdom/TownSwitcher";

const ease = [0.16, 1, 0.3, 1] as const;

function AccordionList({
  title, subtitle, children,
}: { title: string; subtitle?: string; children: React.ReactNode }) {
  const [openState, setOpenState] = useState(false);
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <button onClick={() => setOpenState((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-primary hover:brightness-110 transition-all text-left">
        <div>
          <h4 className="font-display font-black text-accent text-base sm:text-lg">{title}</h4>
          {subtitle && <p className="text-white/60 text-xs mt-0.5">{subtitle}</p>}
        </div>
        <ChevronDown size={20} className={`text-accent shrink-0 transition-transform duration-300 ${openState ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {openState && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }} className="overflow-hidden">
            <div className="p-5 bg-muted/30">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PersonGrid({
  members, photoStartIdx, onOpenPhoto,
}: {
  members: { name: string; title?: string; note?: string; quarter?: string; photo?: string }[];
  photoStartIdx?: number;
  onOpenPhoto?: (idx: number) => void;
}) {
  let photoCursor = photoStartIdx ?? -1;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {members.map((m, i) => {
        const idx = m.photo && photoCursor >= 0 ? photoCursor++ : -1;
        return (
          <div key={i} className={`flex gap-3 p-3 bg-background rounded-xl border border-border ${m.photo ? "items-center" : "items-start"}`}>
            {m.photo ? (
              <ZoomableImage
                src={m.photo}
                alt={m.name}
                className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-border"
                imgClassName="w-full h-full object-cover"
                onClick={() => idx >= 0 && onOpenPhoto?.(idx)}
              />
            ) : (
              <span className="text-xs font-black text-accent/60 w-5 shrink-0 mt-0.5">{i + 1}.</span>
            )}
            <div className="min-w-0">
              <p className={`text-sm font-semibold leading-tight ${m.name === "Vacant" ? "text-muted-foreground italic" : "text-foreground"}`}>
                {m.name}{m.note && <span className="text-accent font-normal"> ({m.note})</span>}
              </p>
              {(m.title || m.quarter) && <p className="text-xs text-accent font-medium mt-0.5">{m.title || m.quarter}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PortraitGrid({
  members, photoStartIdx, onOpenPhoto,
}: {
  members: { name: string; title?: string; photo?: string }[];
  photoStartIdx: number;
  onOpenPhoto: (idx: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
      {members.map((m, i) => (
        <div key={i} className="text-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-[3/4] mb-3">
            <ZoomableImage src={m.photo!} alt={m.name} onClick={() => onOpenPhoto(photoStartIdx + i)} />
          </div>
          <h4 className="font-display font-bold text-foreground text-sm leading-tight">{m.name}</h4>
          {m.title && <p className="text-accent font-semibold text-xs mt-1">{m.title}</p>}
        </div>
      ))}
    </div>
  );
}

function BioCard({
  photo, name, title, bio, onOpenImage,
}: { photo?: string; name: string; title?: string; bio?: string[]; onOpenImage?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="p-5 sm:p-6 flex gap-4 items-start">
        {photo && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-border">
            <ZoomableImage src={photo} alt={name} onClick={onOpenImage} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-foreground text-base sm:text-lg leading-tight">{name}</h4>
          {title && <p className="text-accent font-semibold text-sm mt-1">{title}</p>}
          {bio && bio.length > 0 && (
            <button onClick={() => setOpen((v) => !v)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors">
              {open ? "Hide full biography" : "Read full biography"}
              <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && bio && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }} className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-6 pt-1 space-y-3 text-sm text-muted-foreground leading-relaxed border-t border-border">
              {bio.map((para, i) => <p key={i} className="pt-3 first:pt-3">{para}</p>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function KingdomPageTemplate({ slug }: { slug: string }) {
  const { data: town } = useSanityTownBySlug(slug);
  const [rulerBioOpen, setRulerBioOpen] = useState(false);

  const galleryImages = [
    town?.rulerPhoto && { src: town.rulerPhoto, alt: `${town.rulerName || town.rulerTitle}` },
    town?.consortPhoto && { src: town.consortPhoto, alt: town.consortName || "Consort" },
    ...(town?.chiefGroups ?? []).flatMap((g) => g.members ?? []).filter((m) => m.photo).map((m) => ({ src: m.photo!, alt: m.name })),
    ...(town?.notableProfiles ?? []).filter((p) => p.photo).map((p) => ({ src: p.photo!, alt: p.name })),
    ...(town?.heritagePlaces ?? []).filter((p) => p.image).map((p) => ({ src: p.image!, alt: p.name })),
    ...(town?.aroundTown ?? []).filter((p) => p.image).map((p) => ({ src: p.image!, alt: p.name })),
    ...(town?.galleryCaptions ?? []).map((g) => ({ src: g.image, alt: g.caption || town!.name })),
    ...(town?.extraGalleryImages ?? []).map((src) => ({ src, alt: town!.name })),
  ].filter(Boolean) as { src: string; alt: string }[];

  const { index, direction, open, close, prev, next } = useLightbox(galleryImages);

  if (!town) return null;

  let imgCursor = 0;
  const rulerPhotoIdx = town.rulerPhoto ? imgCursor++ : -1;
  const consortPhotoIdx = town.consortPhoto ? imgCursor++ : -1;
  const chiefPhotoStartIdx = imgCursor;
  imgCursor += (town.chiefGroups ?? []).flatMap((g) => g.members ?? []).filter((m) => m.photo).length;
  const notableStartIdx = imgCursor;
  imgCursor += (town.notableProfiles ?? []).filter((p) => p.photo).length;
  const heritageStartIdx = imgCursor;
  imgCursor += (town.heritagePlaces ?? []).filter((p) => p.image).length;
  const aroundStartIdx = imgCursor;
  imgCursor += (town.aroundTown ?? []).filter((p) => p.image).length;
  const captionsStartIdx = imgCursor;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path={`/${slug}`} />

      {/* Hero */}
      <section className="relative min-h-[48vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          {town.eyebrow && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
              {town.eyebrow}
            </motion.p>
          )}
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight">
            {town.name}
          </motion.h1>
          {town.tagline && (
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
              {town.tagline}
            </motion.p>
          )}
        </div>
      </section>

      {/* Move straight to any of the other six towns */}
      <TownSwitcher current={slug} />

      {/* Royal Portrait */}
      {town.rulerPhoto && (
        <section className="bg-[#fff8ec] py-10 sm:py-14">
          <div className="container-main">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease }} className="text-center max-w-[280px] mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] mb-4">
                <ZoomableImage src={town.rulerPhoto} alt={town.rulerName || town.name} onClick={() => open(rulerPhotoIdx)} />
              </div>
              <h3 className="font-display font-black text-foreground text-lg leading-tight">{town.rulerName}</h3>
              {town.rulerTitle && <p className="text-accent font-semibold text-sm mt-1">{town.rulerTitle}</p>}
              {town.consortPhoto && town.consortName && (
                <div className="mt-6">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[3/4] mb-3 max-w-[200px] mx-auto">
                    <ZoomableImage src={town.consortPhoto} alt={town.consortName} onClick={() => open(consortPhotoIdx)} />
                  </div>
                  <p className="text-foreground/80 text-sm font-medium">{town.consortName}</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Chief Groups */}
      {town.chiefGroups && town.chiefGroups.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-main max-w-4xl space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-6">
              <h2 className="label-accent mb-2">Leadership</h2>
              <h3 className="heading-section">Chiefs &amp; Councils of {town.name}</h3>
            </motion.div>
            {town.chiefGroups.map((g, i) => {
              const priorPhotoCount = town.chiefGroups!.slice(0, i).flatMap((pg) => pg.members ?? []).filter((m) => m.photo).length;
              const groupPhotoStart = chiefPhotoStartIdx + priorPhotoCount;
              const allHavePhotos = (g.members?.length ?? 0) > 0 && g.members!.every((m) => m.photo);
              if (allHavePhotos) {
                return (
                  <div key={i}>
                    <h4 className="font-display font-bold text-foreground text-base mb-4">{g.groupLabel}</h4>
                    <PortraitGrid members={g.members!} photoStartIdx={groupPhotoStart} onOpenPhoto={open} />
                  </div>
                );
              }
              return (g.members?.length ?? 0) <= 10 ? (
                <div key={i}>
                  <h4 className="font-display font-bold text-foreground text-base mb-3">{g.groupLabel}</h4>
                  <PersonGrid members={g.members ?? []} photoStartIdx={groupPhotoStart} onOpenPhoto={open} />
                </div>
              ) : (
                <AccordionList key={i} title={g.groupLabel} subtitle={`${g.members?.length ?? 0} listed`}>
                  <PersonGrid members={g.members ?? []} photoStartIdx={groupPhotoStart} onOpenPhoto={open} />
                </AccordionList>
              );
            })}
          </div>
        </section>
      )}

      {/* About */}
      {((town.quickFacts?.length ?? 0) > 0 || (town.history?.length ?? 0) > 0) && (
        <section className="section-padding bg-background">
          <div className="container-main max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
              <h2 className="label-accent mb-2">About</h2>
              <h3 className="heading-section mb-6">About {town.name}</h3>
            </motion.div>

            {town.quickFacts && town.quickFacts.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {town.quickFacts.map((fact, i) => {
                  const Icon = resolveIcon(fact.icon);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease }}
                      className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
                      <Icon size={20} className="text-accent mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{fact.label}</p>
                      <p className="font-bold text-foreground text-sm">{fact.value}</p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {town.history && (
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {town.history.map((para, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease }}>
                    {para}
                  </motion.p>
                ))}
              </div>
            )}

            {town.governanceNotes && town.governanceNotes.length > 0 && (
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                {town.governanceNotes.map((para, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease }}>
                    {para}
                  </motion.p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Placeholder note (thin pages) */}
      {town.placeholderNote && (
        <section className="section-padding bg-background pt-0">
          <div className="container-main max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="bg-accent/10 border border-accent/30 rounded-2xl p-5 text-center">
              <p className="text-sm text-foreground/80 leading-relaxed">{town.placeholderNote}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Ruler's full biography */}
      {town.rulerBio && town.rulerBio.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-main max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-10">
              <h2 className="label-accent mb-2">Leadership</h2>
              <h3 className="heading-section">Profile of the {town.rulerTitle}</h3>
            </motion.div>
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="p-5 sm:p-6">
                <h4 className="font-display font-bold text-foreground text-base sm:text-lg leading-tight">{town.rulerName}</h4>
                {town.rulerTitle && <p className="text-accent font-semibold text-sm mt-1">{town.rulerTitle}</p>}
                <button onClick={() => setRulerBioOpen((v) => !v)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors">
                  {rulerBioOpen ? "Hide full biography" : "Read full biography"}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${rulerBioOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              <AnimatePresence initial={false}>
                {rulerBioOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }} className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pt-1 space-y-3 text-sm text-muted-foreground leading-relaxed border-t border-border">
                      {town.rulerBio.map((para, i) => <p key={i} className="pt-3 first:pt-3">{para}</p>)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* Oriki of the ruler */}
      {town.rulerOriki && town.rulerOriki.length > 0 && (
        <section className="section-padding bg-primary relative overflow-hidden">
          <AnimatedHeroBg />
          <div className="container-main relative z-10 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <BookOpen size={22} className="text-accent" />
                <h3 className="font-display font-black text-accent text-2xl sm:text-3xl">Oriki {town.rulerTitle || town.name}</h3>
                <BookOpen size={22} className="text-accent" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm space-y-6">
              {town.rulerOriki.map((verse, i) => (
                <p key={i} className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center italic">{verse}</p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Past & Present Rulers */}
      {town.pastRulers && town.pastRulers.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-main max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-10">
              <h2 className="label-accent mb-2">History</h2>
              <h3 className="heading-section">Past &amp; Present Rulers of {town.name}</h3>
            </motion.div>
            <div className="space-y-2">
              {town.pastRulers.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease }}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${r.current ? "bg-accent/10 border-accent/40 shadow-md" : "bg-card border-border"}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${r.current ? "bg-accent text-white" : "bg-primary/10 text-primary"}`}>
                    {r.order ?? i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm leading-tight ${r.current ? "text-accent" : "text-foreground"}`}>
                      {r.title} {r.name}
                      {r.current && <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded-full font-semibold">Current</span>}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{[r.house, r.years].filter(Boolean).join(" · ")}</p>
                    {r.note && <p className="text-xs text-muted-foreground mt-0.5">{r.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Notable Profiles */}
      {town.notableProfiles && town.notableProfiles.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-main max-w-3xl space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-10">
              <h2 className="label-accent mb-2">Leadership</h2>
              <h3 className="heading-section">Notable Profiles of {town.name}</h3>
            </motion.div>
            {town.notableProfiles.map((p, i) => {
              const photoIdx = p.photo
                ? notableStartIdx + (town.notableProfiles ?? []).slice(0, i).filter((x) => x.photo).length
                : -1;
              return (
                <BioCard key={i} photo={p.photo} name={p.name} title={p.title} bio={p.bio} onOpenImage={photoIdx >= 0 ? () => open(photoIdx) : undefined} />
              );
            })}
          </div>
        </section>
      )}

      {/* Subdivisions */}
      {town.subdivisionGroups && town.subdivisionGroups.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-main max-w-4xl space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-6">
              <h2 className="label-accent mb-2">Governance</h2>
              <h3 className="heading-section">Quarters &amp; Subdivisions of {town.name}</h3>
            </motion.div>
            {town.subdivisionGroups.map((g, i) => (
              <AccordionList key={i} title={g.groupLabel} subtitle={`${g.items?.length ?? 0} listed`}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {g.items?.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />{item}
                    </div>
                  ))}
                </div>
              </AccordionList>
            ))}
          </div>
        </section>
      )}

      {/* Baales */}
      {town.baales && town.baales.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-main max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-6">
              <h2 className="label-accent mb-2">Governance</h2>
              <h3 className="heading-section">Baales of {town.name}</h3>
            </motion.div>
            <AccordionList title="Council of Baales" subtitle={`${town.baales.length} Baales across ${town.name}'s villages and hamlets`}>
              <PersonGrid members={town.baales} />
            </AccordionList>
          </div>
        </section>
      )}

      {/* Oriki of the town */}
      {town.townOriki && town.townOriki.length > 0 && (
        <section className="section-padding bg-primary relative overflow-hidden">
          <AnimatedHeroBg />
          <div className="container-main relative z-10 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <ScrollText size={22} className="text-accent" />
                <h3 className="font-display font-black text-accent text-2xl sm:text-3xl">Oriki {town.name}</h3>
                <ScrollText size={22} className="text-accent" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm space-y-6">
              {town.townOriki.map((verse, i) => (
                <p key={i} className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center italic">{verse}</p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Anthem */}
      {town.anthem && town.anthem.length > 0 && (
        <section className="section-padding bg-primary relative overflow-hidden">
          <AnimatedHeroBg />
          <div className="container-main relative z-10 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-8">
              <h2 className="font-display text-3xl sm:text-4xl font-black text-primary-foreground">{town.name} Anthem</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm">
              <p className="font-display text-base sm:text-lg text-primary-foreground/90 leading-loose text-center whitespace-pre-line italic">
                {town.anthem.join("\n")}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Heritage Places */}
      {town.heritagePlaces && town.heritagePlaces.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-main max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-10">
              <h2 className="label-accent mb-2">Heritage</h2>
              <h3 className="heading-section flex items-center justify-center gap-2">
                <Landmark size={26} className="text-accent" /> Places of {town.name}
              </h3>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {town.heritagePlaces.map((p, i) => {
                const photoIdx = p.image
                  ? heritageStartIdx + (town.heritagePlaces ?? []).slice(0, i).filter((x) => x.image).length
                  : -1;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease }}
                    className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                    {p.image && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <ZoomableImage src={p.image} alt={p.name} onClick={photoIdx >= 0 ? () => open(photoIdx) : undefined} />
                      </div>
                    )}
                    <div className="p-3">
                      <h4 className="font-display font-bold text-foreground text-xs sm:text-sm leading-tight">{p.name}</h4>
                      {p.description && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Around Town */}
      {town.aroundTown && town.aroundTown.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-main max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-10">
              <h2 className="label-accent mb-2">Heritage</h2>
              <h3 className="heading-section flex items-center justify-center gap-2">
                <Landmark size={26} className="text-accent" /> Around {town.name}
              </h3>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {town.aroundTown.map((p, i) => {
                const photoIdx = p.image
                  ? aroundStartIdx + (town.aroundTown ?? []).slice(0, i).filter((x) => x.image).length
                  : -1;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease }}
                    className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                    {p.image && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <ZoomableImage src={p.image} alt={p.name} onClick={photoIdx >= 0 ? () => open(photoIdx) : undefined} />
                      </div>
                    )}
                    <div className="p-3">
                      <h4 className="font-display font-bold text-foreground text-xs sm:text-sm leading-tight">{p.name}</h4>
                      {p.description && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Captioned Gallery */}
      {town.galleryCaptions && town.galleryCaptions.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-main max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-10">
              <h2 className="label-accent mb-2">Gallery</h2>
              <h3 className="heading-section">Gallery</h3>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {town.galleryCaptions.map((g, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease }}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ZoomableImage src={g.image} alt={g.caption || town.name} onClick={() => open(captionsStartIdx + i)} />
                  </div>
                  {g.caption && (
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">{g.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Achievements */}
      {town.projectAchievements && town.projectAchievements.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-main max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="text-center mb-8">
              <h2 className="label-accent mb-2">Community</h2>
              <h3 className="heading-section">Projects &amp; Achievements</h3>
            </motion.div>
            <ul className="space-y-2">
              {town.projectAchievements.map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease }}
                  className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0 mt-1.5" />{item}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Source note */}
      {town.sourceNote && (
        <div className="container-main max-w-3xl pb-8">
          <p className="text-xs text-muted-foreground text-center italic">{town.sourceNote}</p>
        </div>
      )}

      {galleryImages.length > 0 && (
        <Lightbox images={galleryImages} index={index} direction={direction} onClose={close} onPrev={prev} onNext={next} />
      )}

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
