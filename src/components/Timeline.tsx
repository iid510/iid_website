import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Crown, Globe, Ship, Users, Heart } from "lucide-react";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { HOME_PAGE } from "@/data/pageContent";

const TIMELINE_STYLE = [
  { icon: Crown, color: "from-yellow-600 to-amber-700" },
  { icon: Users, color: "from-blue-600 to-indigo-700" },
  { icon: Heart, color: "from-red-600 to-rose-700" },
  { icon: Calendar, color: "from-green-600 to-emerald-700" },
  { icon: Ship, color: "from-purple-600 to-violet-700" },
  { icon: Globe, color: "from-accent to-primary" },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const { data: page } = useSanityPage("home", HOME_PAGE);
  const timelineEvents = (page?.timeline ?? HOME_PAGE.timeline ?? []).map((milestone, i) => ({
    ...milestone,
    ...TIMELINE_STYLE[i % TIMELINE_STYLE.length],
  }));
  const intro = findSection(page?.sections, "timeline-intro");
  const cta = findSection(page?.sections, "timeline-cta");

  return (
    <section id="timeline" className="section-padding bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-main relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="label-accent">{intro?.eyebrow}</span>
          <h2 className="heading-section mt-3">
            {intro?.heading}
          </h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            {intro?.body?.[0]}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line with progress indicator */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute inset-0 bg-gradient-to-b from-primary to-accent"
            />
          </div>

          {/* Mobile/Tablet line */}
          <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-0.5 lg:hidden">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute inset-0 bg-gradient-to-b from-primary to-accent"
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative flex items-center ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Content Card */}
                  <div
                    className={`flex-1 ${
                      isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"
                    } pl-16 sm:pl-20 lg:pl-0 text-left`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className={`relative bg-card border-2 border-border hover:border-accent/50 rounded-xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                    >
                      {/* Gradient overlay */}
                      <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b ${event.color} opacity-80`} />
                      
                      <div className="space-y-2 sm:space-y-3">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {event.era}
                        </span>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-accent font-medium">
                          {event.year}
                        </p>
                        <p className="text-body leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Decorative corner accent */}
                      <div className={`absolute ${isLeft ? 'bottom-0 right-0' : 'bottom-0 left-0'} w-20 h-20 bg-gradient-to-br ${event.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                    </motion.div>
                  </div>

                  {/* Center Icon - Desktop */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg items-center justify-center z-10 border-4 border-background"
                  >
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </motion.div>

                  {/* Left Icon - Mobile/Tablet */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="lg:hidden absolute left-8 sm:left-12 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center z-10 border-4 border-background"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mt-12 sm:mt-16 lg:mt-24"
          >
            <div className="absolute left-8 sm:left-12 lg:left-1/2 lg:-translate-x-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent border-4 border-background shadow-lg" />
            <motion.p
              className="pl-16 sm:pl-20 lg:pl-0 lg:text-center text-body font-medium italic"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              The journey continues... 🌍
            </motion.p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-lg sm:text-xl text-foreground/80 mb-6 font-display">
            {cta?.body?.[0]}
          </p>
          <Link
            to="/join"
            className="btn-primary inline-flex items-center gap-2"
          >
            Join the Community
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
