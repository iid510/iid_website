import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

// Clan data with positions for the network visualization
const clans = [
  { name: "Oke-Sopen", angle: 0 },
  { name: "Oke-Agbo", angle: 51.43 },
  { name: "Ojowo", angle: 102.86 },
  { name: "Atikori", angle: 154.29 },
  { name: "Japara", angle: 205.71 },
  { name: "Imope-Ijebu", angle: 257.14 },
  { name: "Aparaki", angle: 308.57 },
];

// SVG clan network component — calm entrance animation, minimal ambient motion
export default function ClanNetwork() {
  const centerX = 200;
  const centerY = 200;
  const radius = 130;

  // Calculate clan positions
  const clanPositions = clans.map((clan) => {
    const angleRad = (clan.angle - 90) * (Math.PI / 180);
    return {
      ...clan,
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[500px] max-h-[500px]"
      >
        <defs>
          {/* Radial glow for center */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>

          {/* Strong glow filter */}
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feFlood floodColor="#FFD700" floodOpacity="0.5" result="glowColor" />
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense pulse glow */}
          <filter id="intenseGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="4" result="blur2" />
            <feFlood floodColor="#FFD700" floodOpacity="0.8" />
            <feComposite in2="blur1" operator="in" result="glow1" />
            <feMerge>
              <feMergeNode in="glow1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rotating ring — single, slow ambient motion */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="185"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="10 20"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />

        {/* Background glow — soft, slow breathing */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="100"
          fill="url(#centerGlow)"
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: [0.3, 0.45, 0.3], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Connection lines from center to each clan */}
        {clanPositions.map((clan, index) => (
          <g key={`connection-group-${clan.name}`}>
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={clan.x}
              y2={clan.y}
              stroke="#D4AF37"
              strokeWidth="2"
              strokeOpacity="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
            />
            {/* Glowing overlay line — static once drawn, no flicker */}
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={clan.x}
              y2={clan.y}
              stroke="#FFD700"
              strokeWidth="3"
              strokeOpacity="0.5"
              filter="url(#strongGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
            />
          </g>
        ))}

        {/* Pentagon connection lines between clans */}
        {clanPositions.map((clan, index) => {
          const nextClan = clanPositions[(index + 1) % clanPositions.length];
          return (
            <motion.line
              key={`pentagon-${clan.name}`}
              x1={clan.x}
              y1={clan.y}
              x2={nextClan.x}
              y2={nextClan.y}
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 1 + index * 0.08,
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* Center node - Omo Orimolusi */}
        <motion.g>
          {/* Single soft pulse ring */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="52"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 1.35],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 3,
              delay: 0.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Main center circle */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="40"
            fill="#1A3A2F"
            stroke="#FFD700"
            strokeWidth="4"
            filter="url(#intenseGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease }}
          />

          {/* Inner decorative ring — slow rotation */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="32"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />

          <motion.text
            x={centerX}
            y={centerY - 6}
            textAnchor="middle"
            fill="#FFD700"
            fontSize="10"
            fontWeight="bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            OMO
          </motion.text>
          <motion.text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            fill="#FFD700"
            fontSize="8"
            fontWeight="bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            ORIMOLUSI
          </motion.text>
        </motion.g>

        {/* Clan nodes */}
        {clanPositions.map((clan, index) => (
          <motion.g key={clan.name}>
            {/* Single subtle pulsing glow ring */}
            <motion.circle
              cx={clan.x}
              cy={clan.y}
              r="33"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.3],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 3,
                delay: 1 + index * 0.15,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Main node circle */}
            <motion.circle
              cx={clan.x}
              cy={clan.y}
              r="28"
              fill="#1A3A2F"
              stroke="#FFD700"
              strokeWidth="3"
              filter="url(#strongGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + index * 0.08,
                ease,
              }}
            />

            {/* Clan name */}
            <motion.text
              x={clan.x}
              y={clan.y + 4}
              textAnchor="middle"
              fill="#FFFAF0"
              fontSize="9"
              fontWeight="700"
              filter="url(#strongGlow)"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
            >
              {clan.name}
            </motion.text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
