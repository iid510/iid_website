import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props {
  gradientClass: string;
  children?: React.ReactNode;
}

const rings = [
  { cx: 80,  cy: 80,  r: 130, duration: 7,   delay: 0   },
  { cx: 540, cy: 360, r: 100, duration: 9,   delay: 2   },
  { cx: 490, cy: 55,  r: 55,  duration: 5.5, delay: 1   },
];

const floatingDots = [
  { cx: 60,  cy: 200, r: 4,   dy: -12, duration: 4,   delay: 0   },
  { cx: 300, cy: 35,  r: 3.5, dy: -15, duration: 5.5, delay: 1.2 },
  { cx: 520, cy: 210, r: 5,   dy:  10, duration: 6.5, delay: 0.7 },
  { cx: 355, cy: 355, r: 3,   dy: -18, duration: 7,   delay: 2.3 },
  { cx: 190, cy: 85,  r: 4,   dy:   8, duration: 5,   delay: 3.0 },
];

const nodes = [
  { cx: 60,  cy: 280, delay: 0   },
  { cx: 130, cy: 330, delay: 0.8 },
  { cx: 205, cy: 295, delay: 1.6 },
  { cx: 535, cy: 145, delay: 1.0 },
];

export default function AnimatedHeroBg({ gradientClass, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Only run the infinite keyframe loops while the hero is actually on screen —
  // otherwise these 14 motion elements keep ticking on every frame for the
  // whole time the user is scrolling the rest of the page.
  const isInView = useInView(containerRef, { margin: "200px 0px 200px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && !prefersReducedMotion;

  return (
    <div ref={containerRef} className={`absolute inset-0 ${gradientClass} overflow-hidden`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="ahb-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1" fill="white" fillOpacity="0.1" />
          </pattern>
        </defs>

        <rect width="600" height="400" fill="url(#ahb-dots)" />

        {shouldAnimate ? (
          <>
            {rings.map((ring, i) => (
              <motion.circle
                key={i}
                cx={ring.cx} cy={ring.cy} r={ring.r}
                fill="none" stroke="white" strokeWidth="1.5"
                animate={{ opacity: [0.1, 0.28, 0.1], scale: [1, 1.14, 1] }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: "easeInOut", delay: ring.delay }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            ))}

            <motion.polygon
              points="430,55 460,72 460,108 430,125 400,108 400,72"
              fill="none" stroke="white" strokeWidth="1.5" opacity={0.22}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <motion.polygon
              points="140,295 155,304 155,322 140,331 125,322 125,304"
              fill="none" stroke="white" strokeWidth="1" opacity={0.18}
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />

            <motion.path
              d="M 0 330 L 60 330 L 60 280 L 130 280 L 130 330 L 205 330 L 205 295 L 280 295"
              fill="none" stroke="white" strokeWidth="1" strokeOpacity={0.18}
              strokeDasharray="8 4"
              animate={{ strokeDashoffset: [0, -48] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 600 100 L 535 100 L 535 145 L 460 145"
              fill="none" stroke="white" strokeWidth="1" strokeOpacity={0.14}
              strokeDasharray="6 4"
              animate={{ strokeDashoffset: [0, 40] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {nodes.map((node, i) => (
              <motion.circle
                key={i} cx={node.cx} cy={node.cy} r="3" fill="white"
                animate={{ opacity: [0.25, 0.85, 0.25] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
              />
            ))}

            {floatingDots.map((dot, i) => (
              <motion.circle
                key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="white"
                animate={{ y: [0, dot.dy, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: dot.duration, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
              />
            ))}
          </>
        ) : (
          // Static fallback: same shapes, no JS-driven animation, painted once.
          <>
            {rings.map((ring, i) => (
              <circle key={i} cx={ring.cx} cy={ring.cy} r={ring.r} fill="none" stroke="white" strokeWidth="1.5" opacity={0.16} />
            ))}
            <polygon points="430,55 460,72 460,108 430,125 400,108 400,72" fill="none" stroke="white" strokeWidth="1.5" opacity={0.22} />
            <polygon points="140,295 155,304 155,322 140,331 125,322 125,304" fill="none" stroke="white" strokeWidth="1" opacity={0.18} />
            <path d="M 0 330 L 60 330 L 60 280 L 130 280 L 130 330 L 205 330 L 205 295 L 280 295" fill="none" stroke="white" strokeWidth="1" strokeOpacity={0.18} strokeDasharray="8 4" />
            <path d="M 600 100 L 535 100 L 535 145 L 460 145" fill="none" stroke="white" strokeWidth="1" strokeOpacity={0.14} strokeDasharray="6 4" />
            {nodes.map((node, i) => (
              <circle key={i} cx={node.cx} cy={node.cy} r="3" fill="white" opacity={0.5} />
            ))}
            {floatingDots.map((dot, i) => (
              <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="white" opacity={0.3} />
            ))}
          </>
        )}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/20" />

      {children}
    </div>
  );
}
