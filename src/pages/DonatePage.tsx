import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Building2, Copy, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import { useSanityDonatePage } from "@/hooks/useSanityDonatePage";
import { resolveIcon } from "@/lib/iconMap";

const ease = [0.16, 1, 0.3, 1] as const;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      className="ml-1 w-11 h-11 inline-flex items-center justify-center shrink-0 text-muted-foreground hover:text-accent transition-colors touch-manipulation"
      title="Copy"
      aria-label="Copy to clipboard"
    >
      {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </button>
  );
}

export default function DonatePage() {
  const { data } = useSanityDonatePage();
  const bankAccounts = data?.bankAccounts ?? [];
  const IMPACT_ITEMS = data?.impactItems ?? [];
  const TARGET = data?.target ?? 0;
  const RAISED = data?.raised ?? 0;
  const pct = TARGET > 0 ? Math.min(100, Math.round((RAISED / TARGET) * 100)) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/donate" />

      {/* Hero */}
      <section className="relative min-h-[42vh] flex items-end pb-12 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            Support the Mission
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            Donate to Connect Ijebu Roots
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Every contribution — large or small — goes directly toward building a lasting legacy for the people of Ijebu-Igbo, at home and in the diaspora.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl mx-auto space-y-10">

          {/* Unity House Progress */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center shrink-0">
                <Building2 size={24} className="text-accent" />
              </div>
              <div>
                <h2 className="font-display font-black text-xl text-foreground">Unity House Fund</h2>
                <p className="text-muted-foreground text-sm mt-1">Multipurpose Learning Resource Centre — Ijebu-Igbo</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold text-foreground">
                  £{RAISED.toLocaleString()} raised
                </span>
                <span className="text-muted-foreground">Goal: £{TARGET.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-accent rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{pct}% of target reached</p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Unity House will serve as a permanent home for community learning, skills training, cultural events, and diaspora gatherings — a physical legacy that will benefit generations of Ijebu-Igbo people.
            </p>
          </motion.div>

          {/* Bank transfer details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-1">Bank Transfer Details</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Please use the reference <strong className="text-foreground">UNITY HOUSE</strong> so we can track your donation.
            </p>

            {bankAccounts.map((account, idx) => (
              <div key={account.label} className={idx < bankAccounts.length - 1 ? "mb-6" : ""}>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">{account.label}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Account Name", value: account.accountName },
                    { label: "Bank", value: account.bankName },
                    { label: "Account No.", value: account.accountNumber },
                    { label: "Sort Code", value: account.sortCode },
                    { label: "Reference", value: account.reference },
                  ].filter((f) => f.value).map(({ label, value }) => (
                    <div key={label} className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-semibold text-foreground text-sm flex-1">{value}</p>
                        <CopyButton text={value!} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-amber-800 text-xs font-medium">
                After transferring, please send your name and amount to our WhatsApp{" "}
                <a
                  href="https://wa.me/447496933887"
                  target="_blank" rel="noopener noreferrer"
                  className="underline font-bold inline-flex items-center min-h-[44px] touch-manipulation"
                >
                  +44 7496 933887
                </a>{" "}
                so we can acknowledge your donation and update the fund total.
              </p>
            </div>
          </motion.div>

          {/* What your donation funds */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <h2 className="font-display font-black text-xl text-foreground mb-5">What Your Donation Funds</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {IMPACT_ITEMS.map((item) => {
                const Icon = resolveIcon(item.icon);
                return (
                  <div key={item.title} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                      <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Other ways to support */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 text-center"
          >
            <Heart size={32} className="text-accent mx-auto mb-3" />
            <h2 className="font-display font-black text-xl text-foreground mb-2">Other Ways to Support</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto mb-5">
              Can't donate financially? You can still make a difference by spreading the word, volunteering your time or skills, or encouraging others in your network to contribute.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 bg-accent text-charcoal font-bold px-6 py-3 rounded-xl text-sm hover:brightness-110 transition-all"
            >
              Get in Touch
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
