import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Globe, MessageCircle, ArrowRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";
import { resolveIcon } from "@/lib/iconMap";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Heritage", href: "/heritage" },
  { label: "Members", href: "/members" },
  { label: "Gallery", href: "/gallery" },
  { label: "Join Us", href: "/join" },
  { label: "Contact", href: "/contact" },
];

const communityLinks = [
  { label: "Our Team", href: "/team" },
  { label: "Impact", href: "/impact" },
  { label: "Blog", href: "/blog" },
  { label: "Honour Roll", href: "/honour-roll" },
  { label: "Business Directory", href: "/businesses" },
  { label: "Submit an Event", href: "mailto:softlineazeez123@gmail.com?subject=Event%20Submission" },
  { label: "List Your Business", href: "/businesses" },
];

function NewsletterSignup() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const msg = `👋 *Community Updates Signup*\n\nName: ${name}\n\nPlease add me to the IID community updates list.`;
    window.open(`https://wa.me/447496933887?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setName(""); }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
      {submitted ? (
        <span className="text-accent font-semibold text-sm">Opening WhatsApp…</span>
      ) : (
        <>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name…"
            aria-label="Your name for community updates"
            className="px-4 py-2.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-white placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 w-44"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-accent text-charcoal font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-accent/90 transition-colors shrink-0"
          >
            <Send size={14} /> Sign Up
          </button>
        </>
      )}
    </form>
  );
}

export default function Footer() {
  const { data: siteSettings } = useSanitySiteSettings();
  const stats = siteSettings?.footerStats ?? [];

  return (
    <footer id="footer" className="bg-primary text-primary-foreground safe-area-bottom">
      <div className="container-main py-8 md:py-16 lg:py-20">
        {/* Mobile: native app-style footer */}
        <div className="lg:hidden">
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-6">
            <motion.img
              src="/logo-tp.webp"
              alt="IID Logo"
              className="w-24 h-24"
              initial={{ scale: 1.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <div>
              <h3 className="font-display font-bold text-sm leading-tight">
                Ijebu Igbo Descendants
              </h3>
              <p className="text-primary-foreground/50 text-xs">in Diaspora</p>
            </div>
          </div>

          {/* Action buttons — large tap targets */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <a
              href="tel:+447723953174"
              className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-green-600/15 active:bg-green-600/30 transition-colors touch-manipulation"
            >
              <Phone size={22} className="text-green-400" />
              <span className="text-[11px] font-semibold text-primary-foreground/80">Call</span>
            </a>
            <a
              href="https://wa.me/447723953174"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-[#25D366]/15 active:bg-[#25D366]/30 transition-colors touch-manipulation"
            >
              <MessageCircle size={22} className="text-[#25D366]" />
              <span className="text-[11px] font-semibold text-primary-foreground/80">WhatsApp</span>
            </a>
            <a
              href="mailto:info@ijebuigbodescendants.org"
              className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-blue-600/15 active:bg-blue-600/30 transition-colors touch-manipulation"
            >
              <Mail size={22} className="text-blue-400" />
              <span className="text-[11px] font-semibold text-primary-foreground/80">Email</span>
            </a>
          </div>

          {/* Nav grid */}
          <div className="grid grid-cols-4 gap-1.5 mb-6">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="py-3 px-1 rounded-xl bg-primary-foreground/5 active:bg-primary-foreground/10
                           text-[11px] font-medium text-primary-foreground/70 active:text-accent
                           text-center transition-colors touch-manipulation"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Website link */}
          <a
            href="https://www.ijebuigbodescendants.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent/10 border border-accent/20 touch-manipulation active:bg-accent/20 transition-colors"
          >
            <Globe size={15} className="text-accent" />
            <span className="text-sm font-medium text-accent">ijebuigbodescendants.org</span>
          </a>
        </div>

        {/* Desktop: Premium grid layout */}
        <div className="hidden lg:block">

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-4 gap-4 mb-14 border border-primary-foreground/10 rounded-2xl p-6 bg-primary-foreground/5"
          >
            {stats.map((s) => {
              const Icon = resolveIcon(s.icon);
              return (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-display font-black text-2xl text-white leading-none">{s.value}</p>
                    <p className="text-primary-foreground/50 text-xs mt-0.5">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Newsletter signup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-12 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center gap-5"
          >
            <div className="sm:flex-1">
              <h4 className="font-display font-bold text-white text-base mb-1">Stay Connected</h4>
              <p className="text-primary-foreground/55 text-sm">
                Sign up to receive community updates, event announcements, and news via WhatsApp.
              </p>
            </div>
            <NewsletterSignup />
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-12 gap-10 mb-14">

            {/* Brand — 4 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="col-span-4"
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.img
                  src="/logo-tp.webp"
                  alt="IID Logo"
                  className="w-16 h-16"
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                />
                <div>
                  <h3 className="font-display font-bold text-base leading-tight">
                    Ijebu Igbo Descendants
                  </h3>
                  <p className="text-primary-foreground/50 text-xs">Ijebu Igbo Descendants in Diaspora</p>
                </div>
              </div>
              <p className="text-primary-foreground/55 leading-relaxed text-sm mb-6">
                Uniting Ijebu Igbo descendants across the diaspora through culture,
                development, and community pride. Proudly rooted in Ijebu Igbo, Nigeria.
              </p>

              {/* Join CTA */}
              <Link
                to="/join"
                className="inline-flex items-center gap-2 bg-accent text-charcoal text-sm font-bold
                           px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-colors duration-300 group"
              >
                Join the Community
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Quick Links — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-2"
            >
              <h4 className="font-display font-bold text-sm text-white mb-5 uppercase tracking-widest">
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/55 hover:text-accent transition-colors duration-200
                                 text-sm flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200 rounded" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Community — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="col-span-2"
            >
              <h4 className="font-display font-bold text-sm text-white mb-5 uppercase tracking-widest">
                Community
              </h4>
              <ul className="space-y-2.5">
                {communityLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("mailto") ? (
                      <a
                        href={link.href}
                        className="text-primary-foreground/55 hover:text-accent transition-colors duration-200
                                   text-sm flex items-center gap-1.5 group"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200 rounded" />
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-primary-foreground/55 hover:text-accent transition-colors duration-200
                                   text-sm flex items-center gap-1.5 group"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200 rounded" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact — 4 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-4"
            >
              <h4 className="font-display font-bold text-sm text-white mb-5 uppercase tracking-widest">
                Get In Touch
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+447723953174"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0 group-hover:bg-green-500/30 transition-colors">
                      <Phone size={15} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">Phone</p>
                      <p className="text-sm text-primary-foreground/75 group-hover:text-accent transition-colors">+44 7723 953174</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@ijebuigbodescendants.org"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 transition-colors">
                      <Mail size={15} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">Email</p>
                      <p className="text-sm text-primary-foreground/75 group-hover:text-accent transition-colors break-all">
                        info@ijebuigbodescendants.org
                      </p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin size={15} className="text-primary-foreground/50" />
                  </div>
                  <div>
                    <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">Location</p>
                    <p className="text-sm text-primary-foreground/75">Worldwide — In Diaspora</p>
                  </div>
                </li>
                <li>
                  <a
                    href="https://ijebuigbodescendants.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 group-hover:bg-accent/30 transition-colors">
                      <Globe size={15} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-foreground/40 uppercase tracking-widest">Website</p>
                      <p className="text-sm text-accent group-hover:underline">ijebuigbodescendants.org</p>
                    </div>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cultural Signature */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-main py-6 sm:py-8 text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-display font-bold text-accent italic mb-2">
            Ọmọ Alárè, ká gbé Ijebu Igbo ga
          </p>
          <p className="text-sm sm:text-base text-primary-foreground/70">
            Together, we lift Ijebu Igbo higher
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-main py-5 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm text-primary-foreground/40 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Ijebu Igbo Descendants in Diaspora. All rights reserved.</p>
          <motion.a
            href="https://azeezagbona.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-white transition-colors duration-300 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            Designed and Developed by the son of the soil,{" "}
            <span className="font-bold text-white underline underline-offset-2 decoration-accent/60">
              Azeez Agbona
            </span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
