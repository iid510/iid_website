import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Clock, Users, Globe, Mic2,
  BookOpen, Filter, X, ArrowRight, Mail, ExternalLink,
  LayoutList, CalendarDays, ChevronLeft, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import EventVideos from "@/components/EventVideos";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { EVENTS_PAGE } from "@/data/pageContent";

// ── Event data ──────────────────────────────────────────────────────────────

type EventType = "Cultural" | "Meeting" | "Networking" | "Education" | "Virtual";

interface Event {
  id: number;
  title: string;
  type: EventType;
  date: string;
  rawDate: string; // ISO for sorting / calendar links
  time: string;
  location: string;
  isVirtual: boolean;
  isPast?: boolean;
  description: string;
  details?: string;
  registrationLink?: string;
  gradient: string;
}

const EVENTS: Event[] = [
  {
    id: 1,
    title: "Annual General Meeting 2026",
    type: "Meeting",
    date: "April 15, 2026",
    rawDate: "20260415",
    time: "10:00 AM GMT",
    location: "Virtual (Zoom)",
    isVirtual: true,
    isPast: true,
    description:
      "Join us for the annual review of achievements, financial reporting, and strategic plans for the coming year. All members are strongly encouraged to attend.",
    details:
      "This is the highest decision-making assembly of the association. The agenda includes committee reports, elections for vacant positions, and a vote on the 2026–2027 development budget.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Ojude Oba Cultural Festival",
    type: "Cultural",
    date: "June 20, 2026",
    rawDate: "20260620",
    time: "All Day",
    location: "Ijebu Igbo, Nigeria",
    isVirtual: false,
    isPast: true,
    description:
      "Experience the grandeur of Ojude Oba — a celebration of Yoruba royalty, culture, equestrian displays, and the living heritage of Ijebu Igbo.",
    details:
      "One of Nigeria's most colourful festivals, Ojude Oba brings together chiefs, age groups, and families in an explosion of music, fashion, and tradition before the Awujale of Ijebuland.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 3,
    title: "Diaspora Networking Gala",
    type: "Networking",
    date: "August 10, 2026",
    rawDate: "20260810",
    time: "6:00 PM BST",
    location: "London, United Kingdom",
    isVirtual: false,
    description:
      "An evening of professional networking, cultural performances, live music, and fundraising for community development projects back home.",
    details:
      "Connect with Ijebu Igbo professionals across finance, tech, healthcare, law, and more. The evening includes a charity auction supporting the scholarship fund and a keynote from a distinguished community leader.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    title: "Education Scholarship Drive",
    type: "Education",
    date: "October 5, 2026",
    rawDate: "20261005",
    time: "2:00 PM WAT",
    location: "Lagos, Nigeria",
    isVirtual: false,
    description:
      "Supporting the next generation of Ijebu Igbo scholars through merit-based scholarships, mentorship pairing, and a digital literacy workshop.",
    details:
      "This year's drive targets 20 scholarships for secondary and tertiary students. Applicants are assessed on academic performance, community involvement, and a personal essay on their vision for Ijebu Igbo.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 5,
    title: "Heritage Webinar: Oral History Project",
    type: "Virtual",
    date: "November 22, 2026",
    rawDate: "20261122",
    time: "3:00 PM GMT",
    location: "Virtual (Zoom)",
    isVirtual: true,
    description:
      "A live recording session gathering elders and descendants to document oral histories, proverbs, and cultural narratives for preservation.",
    details:
      "Recordings will be archived and made available on the Connect Ijebu Roots platform. Community members worldwide are invited to share their family histories in Yoruba, Ijebu dialect, or English.",
    gradient: "from-rose-500 to-red-600",
  },
];

const EVENTS_JSONLD = EVENTS.filter((e) => !e.isPast).map((e) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: e.title,
  startDate: `${e.rawDate.slice(0, 4)}-${e.rawDate.slice(4, 6)}-${e.rawDate.slice(6, 8)}`,
  eventAttendanceMode: e.isVirtual
    ? "https://schema.org/OnlineEventAttendanceMode"
    : "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: e.isVirtual
    ? { "@type": "VirtualLocation", url: "https://ijebuigbodescendants.org/events" }
    : { "@type": "Place", name: e.location, address: e.location },
  description: e.description,
  organizer: {
    "@type": "NGO",
    name: "Ijebu Igbo Descendants in Diaspora",
    url: "https://ijebuigbodescendants.org",
  },
}));

const TYPE_FILTERS: EventType[] = ["Cultural", "Meeting", "Networking", "Education", "Virtual"];

const TYPE_ICONS: Record<EventType, React.ReactNode> = {
  Cultural:    <Mic2 size={14} />,
  Meeting:     <Users size={14} />,
  Networking:  <Globe size={14} />,
  Education:   <BookOpen size={14} />,
  Virtual:     <Globe size={14} />,
};

const TYPE_COLORS: Record<EventType, string> = {
  Cultural:    "bg-amber-100 text-amber-800 border-amber-200",
  Meeting:     "bg-blue-100 text-blue-800 border-blue-200",
  Networking:  "bg-purple-100 text-purple-800 border-purple-200",
  Education:   "bg-emerald-100 text-emerald-800 border-emerald-200",
  Virtual:     "bg-rose-100 text-rose-800 border-rose-200",
};

// ── Google Calendar URL ─────────────────────────────────────────────────────
function calendarUrl(event: Event) {
  const start = `${event.rawDate}T090000Z`;
  const end   = `${event.rawDate}T110000Z`;
  const params = new URLSearchParams({
    action:   "TEMPLATE",
    text:     event.title,
    dates:    `${start}/${end}`,
    details:  event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ── Event card ──────────────────────────────────────────────────────────────
function EventCard({ event, index }: { event: Event; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm
                 hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Gradient header */}
      <div className={`h-3 bg-gradient-to-r ${event.gradient}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1
                            rounded-full border ${TYPE_COLORS[event.type]}`}>
            {TYPE_ICONS[event.type]}
            {event.type}
          </span>
          {event.isVirtual && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary
                             bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
              <Globe size={11} /> Virtual
            </span>
          )}
          {event.isPast ? (
            <span className="ml-auto text-xs font-bold text-muted-foreground bg-muted border
                             border-border px-2.5 py-1 rounded-full">
              Past
            </span>
          ) : (
            <span className="ml-auto text-xs font-bold text-accent bg-accent/10 border
                             border-accent/20 px-2.5 py-1 rounded-full">
              Upcoming
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-display font-bold text-foreground text-lg sm:text-xl leading-snug mb-3">
          {event.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {event.description}
        </p>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && event.details && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-foreground/70 leading-relaxed mb-4 pt-3 border-t border-border"
            >
              {event.details}
            </motion.p>
          )}
        </AnimatePresence>

        {event.details && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-semibold text-primary mb-4 flex items-center gap-1 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
            <ArrowRight size={11} className={`transition-transform ${expanded ? "rotate-90" : ""}`} />
          </button>
        )}

        {/* Meta grid */}
        <div className="grid grid-cols-1 gap-2 pt-4 border-t border-border mb-5">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Calendar size={14} className="text-accent shrink-0" />
            <span className="font-medium text-foreground">{event.date}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Clock size={14} className="text-accent shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <MapPin size={14} className="text-accent shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={calendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Calendar size={13} /> Add to Calendar
          </a>
          <a
            href={`mailto:softlineazeez123@gmail.com?subject=Event%20RSVP%3A%20${encodeURIComponent(event.title)}&body=I%20would%20like%20to%20register%20interest%20for%3A%20${encodeURIComponent(event.title)}%0ADate%3A%20${encodeURIComponent(event.date)}`}
            className="flex items-center gap-1.5 text-xs font-bold border border-border
                       text-foreground px-4 py-2.5 rounded-xl hover:border-primary hover:text-primary
                       transition-colors"
          >
            <Mail size={13} /> Register Interest
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ── Calendar view ───────────────────────────────────────────────────────────
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function CalendarView({ events }: { events: Event[] }) {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const eventsByDate = useMemo(() => {
    const map: Record<string, Event[]> = {};
    events.forEach((e) => {
      const key = `${e.rawDate.slice(0,4)}-${e.rawDate.slice(4,6)}-${e.rawDate.slice(6,8)}`;
      if (!map[key]) map[key] = [];
      map[key].push(e);
    });
    return map;
  }, [events]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const selectedEvents = selected ? (eventsByDate[selected] ?? []) : [];

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Month header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <button onClick={prev} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
          <ChevronLeft size={16} />
        </button>
        <h3 className="font-display font-bold text-foreground text-base">
          {MONTH_NAMES[month]} {year}
        </h3>
        <button onClick={next} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-border">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[11px] font-bold text-muted-foreground py-2">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="aspect-square border-r border-b border-border/40 last:border-r-0" />;
          const dateKey = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const dayEvents = eventsByDate[dateKey] ?? [];
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isSelected = selected === dateKey;

          const monthName = new Date(year, month).toLocaleString("en-GB", { month: "long" });
          return (
            <button
              key={dateKey}
              onClick={() => setSelected(isSelected ? null : dateKey)}
              aria-label={`${day} ${monthName} ${year}${dayEvents.length > 0 ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}` : ""}`}
              aria-pressed={isSelected}
              className={`relative aspect-square border-r border-b border-border/40 flex flex-col items-center justify-start pt-1.5 transition-colors group
                ${isSelected ? "bg-primary/10" : "hover:bg-muted/50"}`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold leading-none
                ${isToday ? "bg-accent text-white" : isSelected ? "text-primary font-bold" : "text-foreground"}`}>
                {day}
              </span>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                  {dayEvents.slice(0, 3).map((ev, di) => (
                    <span key={di} className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${ev.gradient}`} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day events */}
      <AnimatePresence>
        {selected && selectedEvents.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-4 space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {new Date(selected + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              {selectedEvents.map((ev) => (
                <div key={ev.id} className={`rounded-xl p-3 bg-gradient-to-r ${ev.gradient} text-white`}>
                  <p className="font-bold text-sm">{ev.title}</p>
                  <p className="text-white/80 text-xs mt-0.5">{ev.time} · {ev.location}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {selected && selectedEvents.length === 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border"
          >
            <p className="text-center text-muted-foreground text-xs py-4">No events on this day.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function EventsPage() {
  const { data: page } = useSanityPage("events", EVENTS_PAGE);
  const hero = page?.hero ?? EVENTS_PAGE.hero!;
  const cta = findSection(page?.sections, "events-cta") ?? findSection(EVENTS_PAGE.sections, "events-cta");
  const [activeType, setActiveType] = useState<EventType | "All">("All");
  const [showVirtualOnly, setShowVirtualOnly] = useState(false);
  const [view, setView] = useState<"list" | "calendar">("list");

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      const matchesType = activeType === "All" || e.type === activeType;
      const matchesVirtual = !showVirtualOnly || e.isVirtual;
      return matchesType && matchesVirtual;
    });
  }, [activeType, showVirtualOnly]);

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Navbar />
      <Seo path="/events" jsonLd={EVENTS_JSONLD} />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative min-h-[380px] md:min-h-[440px] flex flex-col items-center justify-center px-4 py-14">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary/90 to-primary/75" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4f6f8] to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30
                            text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Calendar size={14} />
              {hero.eyebrow}
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white
                           mb-4 leading-tight">
              {hero.title}
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center
                        gap-x-8 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-accent" />
            <strong className="text-foreground">{EVENTS.length}</strong> events in 2026
          </span>
          <span className="flex items-center gap-1.5">
            <Globe size={13} className="text-accent" />
            <strong className="text-foreground">
              {EVENTS.filter((e) => e.isVirtual).length}
            </strong> virtual
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-accent" />
            3 countries
          </span>
        </div>
      </div>

      {/* ── EVENT VIDEOS ────────────────────────────────────────────────── */}
      <EventVideos />

      {/* ── FILTER BAR ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-wrap items-center gap-2">
        {/* View toggle */}
        <div className="flex items-center bg-white border border-border rounded-xl p-1 mr-2">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <LayoutList size={13} /> List
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${view === "calendar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <CalendarDays size={13} /> Calendar
          </button>
        </div>
        <Filter size={14} className="text-muted-foreground shrink-0" />

        {/* Type filters */}
        <button
          onClick={() => setActiveType("All")}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
            activeType === "All"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
          }`}
        >
          All Events
        </button>

        {TYPE_FILTERS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t === activeType ? "All" : t)}
            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full
                        border transition-colors ${
                          activeType === t
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                        }`}
          >
            {TYPE_ICONS[t]}
            {t}
          </button>
        ))}

        {/* Virtual toggle */}
        <button
          onClick={() => setShowVirtualOnly((v) => !v)}
          className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full
                      border transition-colors ml-auto ${
                        showVirtualOnly
                          ? "bg-accent text-accent-foreground border-accent"
                          : "bg-white text-muted-foreground border-border hover:border-accent hover:text-accent"
                      }`}
        >
          <Globe size={12} />
          Virtual Only
        </button>
      </div>

      {/* ── CALENDAR OR LIST ────────────────────────────────────────────── */}
      {view === "calendar" && (
        <div className="max-w-5xl mx-auto px-4 pb-10">
          <CalendarView events={EVENTS} />
        </div>
      )}

      {/* ── EVENT GRID ──────────────────────────────────────────────────── */}
      {view === "list" && (
      <div className="max-w-5xl mx-auto px-4 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Calendar size={44} className="mx-auto mb-4 opacity-20" />
            <p className="font-semibold text-foreground">No events match this filter</p>
            <button
              onClick={() => { setActiveType("All"); setShowVirtualOnly(false); }}
              className="mt-3 text-sm text-primary underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      )}

      {/* ── SUBMIT EVENT CTA ────────────────────────────────────────────── */}
      <section className="bg-primary/5 border-t border-border py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
            {cta?.heading}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6">
            {cta?.body?.[0]}
          </p>
          <a
            href="mailto:softlineazeez123@gmail.com?subject=Event%20Submission&body=Event%20Title%3A%0ADate%20%26%20Time%3A%0ALocation%3A%0AType%20(Cultural%2FMeeting%2FNetworking%2FEducation%2FVirtual)%3A%0ADescription%3A%0ARegistration%20Link%20(if%20any)%3A%0AOrganiser%20Name%3A%0AContact%20Email%3A"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Mail size={16} />
            Submit an Event
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
