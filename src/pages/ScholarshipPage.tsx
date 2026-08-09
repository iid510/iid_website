import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, Clock, FileText, Users, ChevronRight, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import { useSanityScholarshipPage } from "@/hooks/useSanityScholarshipPage";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ScholarshipPage() {
  const { data } = useSanityScholarshipPage();
  const ELIGIBILITY = data?.eligibility ?? [];
  const HOW_TO_APPLY = data?.howToApply ?? [];
  const PAST_RECIPIENTS = data?.pastRecipients ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/scholarship" />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-accent mb-2"
          >
            Education & Development
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight"
          >
            IID Scholarship & Bursary
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Investing in the next generation of Ijebu-Igbo leaders through education support for deserving students.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl mx-auto space-y-10">

          {/* About the scholarship */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center shrink-0">
                <GraduationCap size={24} className="text-accent" />
              </div>
              <div>
                <h2 className="font-display font-black text-xl text-foreground">About the Programme</h2>
                <p className="text-muted-foreground text-sm mt-1">Supporting education in Ijebu-Igbo and the diaspora</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                The IID Omo Orimolusi in Diaspora Scholarship and Bursary Programme was established to support outstanding and deserving students of Ijebu-Igbo heritage in accessing and completing quality education.
              </p>
              <p>
                We believe that education is the most powerful investment a community can make in its future. Through this programme, IID members collectively fund scholarships that open doors for young people who might otherwise struggle to afford their education.
              </p>
              <p>
                Awards are granted annually and may cover school fees, university tuition, books and materials, or other educational costs as determined by the scholarship committee.
              </p>
            </div>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-5 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-accent" /> Eligibility Criteria
            </h2>
            <ul className="space-y-3">
              {ELIGIBILITY.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-accent/15 text-accent text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* How to apply */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <h2 className="font-display font-black text-xl text-foreground mb-5 flex items-center gap-2">
              <FileText size={20} className="text-accent" /> How to Apply
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOW_TO_APPLY.map((item) => (
                <div key={item.stepNumber} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground font-display font-black text-sm flex items-center justify-center shrink-0">
                    {item.stepNumber}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Deadline notice */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3"
          >
            <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 text-sm">Application Deadline</h3>
              <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                Applications for the current cycle are accepted on a rolling basis. Contact the General Secretary to confirm current deadlines and award amounts.
              </p>
            </div>
          </motion.div>

          {/* Past recipients */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-display font-black text-xl text-foreground mb-4 flex items-center gap-2">
              <Users size={20} className="text-accent" /> Past Recipients
            </h2>
            {PAST_RECIPIENTS.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-border rounded-xl space-y-3">
                <p className="text-muted-foreground text-sm">Past recipients will be listed here as the programme grows.</p>
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary/30 px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  Ready to apply? Get in touch →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {PAST_RECIPIENTS.map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="font-semibold text-foreground text-sm">{r.name}</span>
                    <span className="text-muted-foreground text-xs">{r.institution} · {r.year}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Apply CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.25 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 text-center"
          >
            <BookOpen size={32} className="text-accent mx-auto mb-3" />
            <h2 className="font-display font-black text-xl text-foreground mb-2">Ready to Apply?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto mb-5">
              Register your details with us to request an application form or to ask any questions about the programme.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 bg-accent text-charcoal font-bold px-6 py-3 rounded-xl text-sm hover:brightness-110 transition-all"
            >
              Get in Touch <ChevronRight size={15} />
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
