import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSanityEventVideos, type EventVideo, type VideoTag } from "@/hooks/useSanityEventVideos";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { VIDEOS_PAGE } from "@/data/pageContent";
import {
  Play, Pause, Volume2, VolumeX, Maximize,
  Film, ChevronRight, Mic2, Users, Globe,
  BookOpen, Sparkles, Radio,
} from "lucide-react";

/* ── Tag config ───────────────────────────────────────────────── */
const TAG_CONFIG: Record<VideoTag, {
  pill: string; gradient: string; glow: string; icon: React.ReactNode;
}> = {
  "Royal Visit":  {
    pill:     "bg-amber-500/20 text-amber-300 border-amber-500/30",
    gradient: "from-amber-900/80 via-amber-700/40 to-black/90",
    glow:     "rgba(245,158,11,0.5)",
    icon:     <Sparkles size={12} />,
  },
  "Ojude Oba":   {
    pill:     "bg-orange-500/20 text-orange-300 border-orange-500/30",
    gradient: "from-orange-900/80 via-orange-700/40 to-black/90",
    glow:     "rgba(234,88,12,0.5)",
    icon:     <Mic2 size={12} />,
  },
  "Carnival":    {
    pill:     "bg-pink-500/20 text-pink-300 border-pink-500/30",
    gradient: "from-pink-900/80 via-pink-700/40 to-black/90",
    glow:     "rgba(236,72,153,0.5)",
    icon:     <Sparkles size={12} />,
  },
  "Community":   {
    pill:     "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradient: "from-blue-900/80 via-blue-700/40 to-black/90",
    glow:     "rgba(59,130,246,0.5)",
    icon:     <Users size={12} />,
  },
  "Live Stream": {
    pill:     "bg-red-500/20 text-red-300 border-red-500/30",
    gradient: "from-red-900/80 via-red-700/40 to-black/90",
    glow:     "rgba(239,68,68,0.5)",
    icon:     <Radio size={12} />,
  },
  "Performance": {
    pill:     "bg-purple-500/20 text-purple-300 border-purple-500/30",
    gradient: "from-purple-900/80 via-purple-700/40 to-black/90",
    glow:     "rgba(168,85,247,0.5)",
    icon:     <Mic2 size={12} />,
  },
};

const TAG_FILTER_ICONS: Record<VideoTag, React.ReactNode> = {
  "Royal Visit":  <Sparkles size={11} />,
  "Ojude Oba":    <Mic2 size={11} />,
  "Carnival":     <Sparkles size={11} />,
  "Community":    <Users size={11} />,
  "Live Stream":  <Radio size={11} />,
  "Performance":  <Mic2 size={11} />,
};

const ALL_TAGS: VideoTag[] = ["Royal Visit", "Ojude Oba", "Carnival", "Community", "Live Stream", "Performance"];


/* ── Pulsing play button ─────────────────────────────────────── */
function PlayBtn({ size = 28, glow }: { size?: number; glow: string }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse rings */}
      {[1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/20"
          style={{ width: size * 2.6 + i * 22, height: size * 2.6 + i * 22 }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }}
        />
      ))}
      <motion.div
        whileHover={{ scale: 1.12 }}
        className="relative z-10 rounded-full bg-accent flex items-center justify-center shadow-lg"
        style={{
          width: size * 2.2,
          height: size * 2.2,
          boxShadow: `0 0 28px ${glow}`,
        }}
      >
        <Play className="text-black ml-0.5" size={size} fill="currentColor" />
      </motion.div>
    </div>
  );
}

/* ── Regular video card ──────────────────────────────────────── */
function VideoCard({
  video, index, wide = false,
}: {
  video: EventVideo; index: number; wide?: boolean;
}) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded]   = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted]     = useState(false);

  const cfg = TAG_CONFIG[video.tag];

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying((v) => !v);
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((v) => !v);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl overflow-hidden border border-border
                  bg-card hover:border-accent/50 transition-all duration-300
                  flex flex-col shadow-sm hover:shadow-[0_0_40px_rgba(180,140,60,0.15)]
                  ${wide ? "sm:col-span-2" : ""}`}
    >
      {/* Thumbnail / player */}
      <div className="relative aspect-video overflow-hidden">
        {/* Hover glow ring */}
        <div className="absolute inset-0 z-10 pointer-events-none rounded-t-2xl
                        ring-0 group-hover:ring-2 ring-accent/40 transition-all duration-300" />

        {/* ── YouTube ── */}
        {video.youtubeId && !loaded && (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full"
            aria-label="Play video"
          >
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayBtn size={22} glow={cfg.glow} />
            </div>
          </button>
        )}
        {video.youtubeId && loaded && (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}

        {/* ── Local MP4 ── */}
        {video.src && !loaded && (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full"
            aria-label="Play video"
          >
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <>
                {/* Tag-coloured gradient thumbnail (fallback when no frame is available) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient}`} />
                {/* Subtle grid texture */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayBtn size={22} glow={cfg.glow} />
            </div>
            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 inset-x-0 px-4 pb-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white/80 text-xs font-semibold line-clamp-1">{video.title}</p>
            </div>
          </button>
        )}
        {video.src && loaded && (
          <>
            <video
              ref={videoRef}
              src={video.src}
              className="w-full h-full object-cover"
              onEnded={() => setPlaying(false)}
              onCanPlay={() => { videoRef.current?.play(); setPlaying(true); }}
              preload="none"
              playsInline
            />
            <AnimatePresence>
              {!playing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/35"
                >
                  <PlayBtn size={22} glow={cfg.glow} />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Controls */}
            <div className="absolute bottom-0 inset-x-0 flex items-center gap-2 px-3 py-2.5
                            bg-gradient-to-t from-black/80 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button onClick={togglePlay} className="text-white hover:text-accent transition-colors">
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-accent transition-colors">
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <div className="flex-1" />
              <button onClick={() => videoRef.current?.requestFullscreen()} className="text-white hover:text-accent transition-colors">
                <Maximize size={14} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Card info */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.pill}`}>
            {TAG_FILTER_ICONS[video.tag]}
            {video.tag}
          </span>
          <span className="text-[10px] text-muted-foreground ml-auto">{video.date}</span>
        </div>
        <h3 className="font-display font-bold text-foreground text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-accent/90 transition-colors duration-200">
          {video.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">
          {video.description}
        </p>
        {video.credit && (
          <p className="text-[10px] text-muted-foreground/70 mt-1">Courtesy: {video.credit}</p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Featured cinematic card ────────────────────────────────── */
function FeaturedCard({ video }: { video: EventVideo }) {
  const [loaded, setLoaded] = useState(false);
  const cfg = TAG_CONFIG[video.tag];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl overflow-hidden border border-border bg-card shadow-sm
                 hover:border-accent/40 transition-all duration-300
                 hover:shadow-[0_0_60px_rgba(180,140,60,0.12)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left: info panel */}
        <div className="lg:col-span-2 p-7 sm:p-10 flex flex-col justify-center
                        bg-gradient-to-br from-muted/60 to-transparent">
          {/* Live badge */}
          <div className="flex items-center gap-2 mb-5">
            <span className="flex items-center gap-1.5 text-xs font-black text-red-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Featured
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.pill}`}>
              {TAG_FILTER_ICONS[video.tag]}
              {video.tag}
            </span>
          </div>

          <h2 className="font-display font-black text-foreground text-xl sm:text-2xl lg:text-3xl leading-tight mb-3">
            {video.title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {video.description}
          </p>

          <div className="flex flex-col gap-1.5 mb-6 text-xs text-muted-foreground font-medium">
            <span>📅 {video.date}</span>
            {video.credit && <span>🎥 Courtesy: {video.credit}</span>}
          </div>

          {!loaded && (
            <motion.button
              onClick={() => setLoaded(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="self-start inline-flex items-center gap-2 bg-accent text-black
                         font-bold text-sm px-6 py-3 rounded-xl hover:brightness-110
                         transition-all shadow-lg"
              style={{ boxShadow: `0 0 20px ${cfg.glow}` }}
            >
              <Play size={15} fill="currentColor" />
              Watch Now
            </motion.button>
          )}
        </div>

        {/* Right: video */}
        <div className="lg:col-span-3 relative aspect-video lg:aspect-auto min-h-[220px] bg-black">
          {video.youtubeId && !loaded && (
            <button
              onClick={() => setLoaded(true)}
              className="absolute inset-0 w-full h-full group/thumb"
              aria-label="Play featured video"
            >
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayBtn size={32} glow={cfg.glow} />
              </div>
            </button>
          )}
          {video.youtubeId && loaded && (
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
          {video.src && !loaded && (
            <button
              onClick={() => setLoaded(true)}
              className="absolute inset-0 w-full h-full group/thumb"
              aria-label="Play featured video"
            >
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayBtn size={32} glow={cfg.glow} />
              </div>
            </button>
          )}
          {video.src && loaded && (
            <video
              src={video.src}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────────── */
export default function EventVideos() {
  const { data: EVENT_VIDEOS = [] } = useSanityEventVideos();
  const { data: page } = useSanityPage("videos", VIDEOS_PAGE);
  const archiveHeader = findSection(page?.sections, "archive-header") ?? findSection(VIDEOS_PAGE.sections, "archive-header");
  const [activeTag, setActiveTag] = useState<VideoTag | "All">("All");

  const featured = EVENT_VIDEOS.find((v) => v.featured);
  const rest     = EVENT_VIDEOS.filter((v) => !v.featured);

  const filtered = activeTag === "All"
    ? rest
    : rest.filter((v) => v.tag === activeTag);

  const tagCounts = ALL_TAGS.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = rest.filter((v) => v.tag === tag).length;
    return acc;
  }, {});

  return (
    <section className="relative bg-background border-t border-border py-16 px-4 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25
                            text-accent text-xs font-black px-3 py-1.5 rounded-full mb-4
                            tracking-[0.15em] uppercase">
              <Film size={12} />
              {archiveHeader?.eyebrow}
            </div>
            <h2 className="font-display font-black text-foreground text-3xl sm:text-4xl md:text-5xl leading-tight">
              {archiveHeader?.heading}
            </h2>
            <p className="text-muted-foreground text-sm mt-2.5 max-w-lg leading-relaxed">
              {archiveHeader?.body?.[0]}
            </p>
          </div>

          {/* Video count pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="shrink-0 inline-flex items-center gap-2 border border-border
                       rounded-2xl px-4 py-2.5 bg-card backdrop-blur-sm"
          >
            <Film size={14} className="text-accent" />
            <span className="text-foreground font-black text-lg leading-none">{EVENT_VIDEOS.length}</span>
            <span className="text-muted-foreground text-xs font-semibold">videos</span>
          </motion.div>
        </motion.div>

        {/* ── Featured video ── */}
        {featured && (
          <div className="mb-10">
            <FeaturedCard video={featured} />
          </div>
        )}

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-7">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">More Videos</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-2 flex-wrap mb-7">
          <motion.button
            onClick={() => setActiveTag("All")}
            whileTap={{ scale: 0.94 }}
            className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all duration-200 ${
              activeTag === "All"
                ? "bg-accent text-black border-accent shadow-[0_0_12px_rgba(180,140,60,0.4)]"
                : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
            }`}
          >
            All ({rest.length})
          </motion.button>
          {ALL_TAGS.filter((t) => tagCounts[t] > 0).map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? "All" : tag)}
              whileTap={{ scale: 0.94 }}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5
                          rounded-full border transition-all duration-200 ${
                            activeTag === tag
                              ? "bg-accent text-black border-accent shadow-[0_0_12px_rgba(180,140,60,0.4)]"
                              : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                          }`}
            >
              {TAG_FILTER_ICONS[tag]}
              {tag}
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                activeTag === tag ? "bg-black/20" : "bg-muted"
              }`}>
                {tagCounts[tag]}
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── Video grid ── */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Film size={44} className="mx-auto mb-4 text-muted-foreground/40" />
              </motion.div>
              <p className="font-semibold text-muted-foreground mb-2">No videos in this category yet</p>
              <button
                onClick={() => setActiveTag("All")}
                className="text-sm text-accent hover:underline flex items-center gap-1 mx-auto"
              >
                View all videos <ChevronRight size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((video, i) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={i}
                  wide={i === 0 && filtered.length >= 3}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
