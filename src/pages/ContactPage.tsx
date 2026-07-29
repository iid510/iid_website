import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MessageCircle, Send,
  Clock, CheckCircle, MapPin, ArrowRight, Users,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useSanityContactPage } from "@/hooks/useSanityContactPage";
import { resolveIcon } from "@/lib/iconMap";

/* ── Contact card presentation styles (kept in code, content comes from CMS) ── */
const CARD_STYLES = [
  { accent: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", ring: "ring-emerald-200" },
  { accent: "from-blue-500 to-indigo-600", bg: "bg-blue-50", ring: "ring-blue-200" },
  { accent: "from-violet-500 to-purple-600", bg: "bg-violet-50", ring: "ring-violet-200" },
  { accent: "from-amber-500 to-orange-500", bg: "bg-amber-50", ring: "ring-amber-200" },
  { accent: "from-rose-500 to-pink-600", bg: "bg-rose-50", ring: "ring-rose-200" },
];

/* ── Inline message form ─────────────────────────────────────── */
function MessageForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll be in touch soon.",
      });
    }, 1500);
  };

  const inputClass =
    "w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground " +
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 text-sm";

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-full py-16 text-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle size={32} className="text-emerald-600" />
          </div>
          <h3 className="font-display font-bold text-xl text-foreground">Message Received!</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Thanks for getting in touch. A member of our team will respond within 2 business days.
          </p>
          <button
            onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
            className="text-sm font-semibold text-primary hover:underline mt-2"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">
                Full Name <span className="text-accent">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
                required
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">
                Email Address <span className="text-accent">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClass}
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">
              Subject
            </label>
            <select name="subject" value={form.subject} onChange={handleChange} className={inputClass} disabled={submitting}>
              <option value="">Select a topic…</option>
              <option value="membership">Membership Enquiry</option>
              <option value="events">Events & Programmes</option>
              <option value="partnership">Partnership & Sponsorship</option>
              <option value="heritage">Heritage & Culture</option>
              <option value="media">Media & Press</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={5}
              className={inputClass + " resize-none"}
              required
              disabled={submitting}
            />
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Sending…
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function ContactPage() {
  const { data } = useSanityContactPage();
  const contacts = data?.contacts ?? [];

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <Navbar />
      <Seo path="/contact" />

      {/* Hero */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative min-h-[300px] md:min-h-[340px] flex flex-col items-center justify-center">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary/90 to-[#0b2a6e]" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f8f6f1] to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center px-4 py-12"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
              <MessageCircle size={12} />
              Connect With Us
            </span>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight">
              Get In Touch
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Whether you want to join our community, ask a question, or partner with us — we'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:info@ijebuigbodescendants.org"
                className="inline-flex items-center gap-2 bg-accent text-primary font-bold text-sm px-5 py-3 rounded-xl hover:brightness-110 transition-all shadow-lg"
              >
                <Mail size={15} />
                Email Us
              </a>
              <a
                href="https://wa.me/447723953174"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/25 transition-all backdrop-blur-sm"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Response time ribbon */}
      <div className="bg-primary/5 border-y border-primary/10">
        <div className="container-main py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5"><Clock size={13} className="text-primary" /> Replies within 2 business days</span>
            <span className="hidden sm:block w-px h-4 bg-border" />
            <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-emerald-600" /> WhatsApp support available</span>
            <span className="hidden sm:block w-px h-4 bg-border" />
            <span className="flex items-center gap-1.5"><MapPin size={13} className="text-accent" /> Serving the global Ijebu Igbo diaspora</span>
          </div>
        </div>
      </div>

      {/* Main two-column section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">

            {/* Left — contact detail cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="label-accent">Contact Details</h2>
                <h3 className="heading-section text-2xl sm:text-3xl mb-1">Reach Us Directly</h3>
                <p className="text-body text-sm">Choose whichever channel works best for you.</p>
              </motion.div>

              <div className="space-y-3 mt-6">
                {contacts.map((c, i) => {
                  const Icon = resolveIcon(c.icon);
                  const style = CARD_STYLES[i % CARD_STYLES.length];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className={`${style.bg} ring-1 ${style.ring} rounded-2xl p-4 flex items-start gap-4 group`}
                    >
                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${style.accent} flex items-center justify-center shrink-0 shadow-sm`}>
                        <Icon size={18} className="text-white" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{c.label}</p>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="text-sm sm:text-base font-bold text-foreground hover:text-primary transition-colors break-all leading-snug block"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="text-sm sm:text-base font-bold text-foreground leading-snug">{c.value}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>

                        {c.ctaLabel && c.ctaHref && (
                          <a
                            href={c.ctaHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                          >
                            <MessageCircle size={12} />
                            {c.ctaLabel}
                            <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right — message form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl border border-border shadow-elevated p-6 sm:p-8"
            >
              <div className="mb-6">
                <h3 className="font-display font-black text-xl sm:text-2xl text-primary mb-1">Send Us a Message</h3>
                <p className="text-sm text-muted-foreground">Fill in the form and we'll get back to you as soon as possible.</p>
              </div>
              <MessageForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="section-padding bg-primary">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="label-accent text-accent/80">Join the Community</span>
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl mb-4 mt-2">
              Become a Member of IID Omo Orimolusi
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-7 max-w-lg mx-auto">
              Connect with Ijebu Igbo descendants in Diaspora worldwide. Join our growing family and help preserve our heritage.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-7 py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg text-sm sm:text-base"
            >
              <Users size={17} />
              Register as a Member
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
