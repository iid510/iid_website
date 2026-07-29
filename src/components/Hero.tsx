import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import JoinModal from "@/components/JoinModal";
import ClanNetwork from "@/components/ClanNetwork";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { data: siteSettings } = useSanitySiteSettings();
  const culturalPhrases = siteSettings?.heroPhrases ?? [];

  return (
    <section className="relative min-h-[100svh] lg:h-screen flex flex-col justify-between overflow-hidden bg-charcoal pt-14 md:pt-16">
      <div className="absolute inset-0 z-0">
        {/* Video Background - Add your Ojude Oba video to /public/videos/ojude-oba.mp4 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={heroBg}
        >
          <source src="/videos/ojude-oba.mp4" type="video/mp4" />
          <source src="/videos/ojude-oba.webm" type="video/webm" />
          {/* Fallback to image if video doesn't load */}
        </video>
        
        {/* Fallback image - shown if video doesn't load */}
        <img
          src={heroBg}
          alt="Ijebu Igbo aerial view at golden hour"
          className="w-full h-full object-cover absolute inset-0 -z-10"
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-primary/80 via-primary/70 to-primary/60 z-10" />
      </div>

      <div className="container-main relative z-20 py-6 sm:py-10 lg:py-16 flex-grow flex items-center">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center w-full">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Yoruba welcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mb-3 sm:mb-5"
            >
              <span className="text-accent text-base sm:text-xl md:text-2xl font-display italic">
                Ẹ̀ wẹ̀ sọ̀ọ́ Ọmọ Alárè
              </span>
              <p className="text-primary-foreground/70 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">
                Welcome, proud sons and daughters of Ijebu Igbo.
              </p>
            </motion.div>

            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary-foreground leading-[1.15] mb-3 sm:mb-5 tracking-tight">
              Connecting Ijebu Igbo{" "}
              <span className="text-accent">Descendants</span>{" "}
              Across the World
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/85 font-sans max-w-xl mx-auto lg:mx-0 mb-4 sm:mb-7 leading-relaxed">
              Uniting Ijebu Igbo descendants wherever they are in the world — from our ancestral homeland to every corner of the diaspora.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <JoinModal>
                <button
                  className="btn-primary text-center w-full sm:w-auto min-h-[48px] font-semibold"
                >
                  Join the Community
                </button>
              </JoinModal>
              <a
                href="#impact"
                className="btn-outline-light text-center min-h-[48px] flex items-center justify-center font-semibold"
              >
                Support Development
              </a>
            </div>
          </motion.div>

          {/* Right side - Clan Network Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end hidden lg:flex"
          >
            <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[500px] aspect-square">
              <ClanNetwork />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cultural Greetings Marquee - Part of Hero */}
      <div className="relative z-30 w-full">
        <div className="relative bg-primary py-2.5 sm:py-4 overflow-hidden border-t border-accent/20">
          {/* Label */}
          <div className="container-main text-center mb-2">
            <p className="text-accent/80 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Cultural Greetings from Ijebu Igbo
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative flex overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

            {/* Scrolling content */}
            <motion.div
              className="flex gap-6 sm:gap-8 md:gap-12 whitespace-nowrap"
              animate={{ x: [0, -1920] }}
              transition={{
                x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" },
              }}
              style={{ willChange: "transform" }}
            >
              {[...culturalPhrases, ...culturalPhrases, ...culturalPhrases].map((phrase, index) => (
                <div key={index} className="flex items-center gap-6 sm:gap-8 md:gap-12">
                  <span className="text-accent font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">
                    {phrase}
                  </span>
                  <span className="text-accent/60 text-xl sm:text-2xl">✦</span>
                </div>
              ))}
            </motion.div>

            {/* Duplicate for seamless loop */}
            <motion.div
              className="flex gap-6 sm:gap-8 md:gap-12 whitespace-nowrap"
              animate={{ x: [0, -1920] }}
              transition={{
                x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" },
              }}
              style={{ willChange: "transform" }}
            >
              {[...culturalPhrases, ...culturalPhrases, ...culturalPhrases].map((phrase, index) => (
                <div key={`dup-${index}`} className="flex items-center gap-6 sm:gap-8 md:gap-12">
                  <span className="text-accent font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">
                    {phrase}
                  </span>
                  <span className="text-accent/60 text-xl sm:text-2xl">✦</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Decorative top line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
