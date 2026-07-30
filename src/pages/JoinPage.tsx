import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import FAQ from "@/components/FAQ";
import { useSanitySiteSettings } from "@/hooks/useSanitySiteSettings";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { JOIN_PAGE } from "@/data/pageContent";

const IJEBU_AREAS = [
  "Oke-Sopen",
  "Japara",
  "Oke-Agbo",
  "Atikori",
  "Ojowo",
  "Other / Not Sure",
];

const HOW_HEARD = [
  "WhatsApp",
  "Facebook",
  "Instagram",
  "Friend or Family",
  "Community Event",
  "Google",
  "Other",
];

const WHATSAPP_NUMBER = "447496933887";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  ijebuArea: string;
  contact: string;
  howHeard: string;
  hasConstitution: string;
  agreesToConstitution: string;
};

const empty: FormData = {
  firstName: "", lastName: "", email: "",
  address1: "", address2: "", city: "",
  state: "", postcode: "", country: "",
  ijebuArea: "", contact: "", howHeard: "",
  hasConstitution: "", agreesToConstitution: "",
};

export default function JoinPage() {
  const { data: siteSettings } = useSanitySiteSettings();
  const { data: page } = useSanityPage("join", JOIN_PAGE);
  const hero = page?.hero ?? JOIN_PAGE.hero!;
  const beforeApply = findSection(page?.sections, "join-beforeApply") ?? findSection(JOIN_PAGE.sections, "join-beforeApply");
  const formHeader = findSection(page?.sections, "join-formHeader") ?? findSection(JOIN_PAGE.sections, "join-formHeader");
  const joinFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (siteSettings?.faqs ?? []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: (faq.answer ?? []).join(" ") },
    })),
  };
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = [
      `*New IID Membership Application*`,
      ``,
      `*Name:* ${form.firstName} ${form.lastName}`,
      `*Email:* ${form.email}`,
      `*Address:* ${form.address1}${form.address2 ? ", " + form.address2 : ""}, ${form.city}, ${form.state}, ${form.postcode}, ${form.country}`,
      `*Part of Ijebu Igbo:* ${form.ijebuArea}`,
      `*Contact / WhatsApp:* ${form.contact}`,
      `*How they heard about us:* ${form.howHeard}`,
      `*Received Constitution & Code of Conduct:* ${form.hasConstitution}`,
      `*Agrees to abide by Constitution:* ${form.agreesToConstitution}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  const inputClass =
    "w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors placeholder:text-muted-foreground/50";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";
  const requiredStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Navbar />
      <Seo path="/join" jsonLd={joinFaqJsonLd} />

      {/* Hero */}
      <section className="relative pt-14 md:pt-20 overflow-hidden">
        <div className="relative min-h-[320px] md:min-h-[380px] flex flex-col items-center justify-center px-4 py-14">
          <AnimatedHeroBg gradientClass="bg-gradient-to-br from-primary via-primary/90 to-primary/75" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4f6f8] to-transparent z-10" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Users size={14} />
              {hero.eyebrow}
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
              {hero.title}
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-20">

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-6 mb-8 shadow-sm"
        >
          <h2 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
            <FileText size={18} className="text-accent" />
            {beforeApply?.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              "IID Code of Conduct",
              "IID Constitution Index",
              "IID Constitution",
            ].map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-2.5 bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm font-semibold text-foreground"
              >
                <FileText size={15} className="text-accent shrink-0" />
                {doc}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {beforeApply?.body?.[0]}
          </p>
        </motion.div>

        {/* Form */}
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-6"
          >
            <h2 className="font-display font-bold text-foreground text-lg">{formHeader?.heading ?? "Membership Application Form"}</h2>

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name {requiredStar}</label>
                <input required placeholder="Enter your first name" value={form.firstName} onChange={set("firstName")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name {requiredStar}</label>
                <input required placeholder="Enter your last name" value={form.lastName} onChange={set("lastName")} className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email Address {requiredStar}</label>
              <input required type="email" placeholder="Enter your email" value={form.email} onChange={set("email")} className={inputClass} />
            </div>

            {/* Address */}
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Address Line 1 {requiredStar}</label>
                <input required placeholder="Enter your address" value={form.address1} onChange={set("address1")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Address Line 2</label>
                <input placeholder="Apartment, suite, etc. (optional)" value={form.address2} onChange={set("address2")} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City {requiredStar}</label>
                  <input required placeholder="Enter your city" value={form.city} onChange={set("city")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>State / Province / Region {requiredStar}</label>
                  <input required placeholder="Enter your region" value={form.state} onChange={set("state")} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Postal / Zip Code {requiredStar}</label>
                  <input required placeholder="Enter your postcode" value={form.postcode} onChange={set("postcode")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Country {requiredStar}</label>
                  <input required placeholder="Enter your country" value={form.country} onChange={set("country")} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Part of Ijebu Igbo */}
            <div>
              <label className={labelClass}>What Part of Ijebu Igbo do you come from? {requiredStar}</label>
              <select required value={form.ijebuArea} onChange={set("ijebuArea")} className={inputClass}>
                <option value="">— Please select —</option>
                {IJEBU_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            {/* WhatsApp Contact */}
            <div>
              <label className={labelClass}>Contact (including WhatsApp number) {requiredStar}</label>
              <input required placeholder="+44 XXXX XXXXXX" value={form.contact} onChange={set("contact")} className={inputClass} />
            </div>

            {/* How did you hear */}
            <div>
              <label className={labelClass}>How did you hear about us? {requiredStar}</label>
              <select required value={form.howHeard} onChange={set("howHeard")} className={inputClass}>
                <option value="">— Please select —</option>
                {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            {/* Constitution questions */}
            <div className="space-y-4 border-t border-border pt-6">
              <div>
                <label className={labelClass}>Have you received our Constitution and Code of Conduct? {requiredStar}</label>
                <div className="flex gap-6 mt-2">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground">
                      <input
                        type="radio"
                        required
                        name="hasConstitution"
                        value={v}
                        checked={form.hasConstitution === v}
                        onChange={set("hasConstitution")}
                        className="accent-accent w-4 h-4"
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Having read our Constitution and Code of Conduct, are you ready to abide by the contents therein? {requiredStar}
                </label>
                <div className="flex gap-6 mt-2">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground">
                      <input
                        type="radio"
                        required
                        name="agreesToConstitution"
                        value={v}
                        checked={form.agreesToConstitution === v}
                        onChange={set("agreesToConstitution")}
                        className="accent-accent w-4 h-4"
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-charcoal font-bold py-4 rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Submit Application via WhatsApp
            </button>
            <p className="text-xs text-center text-muted-foreground">
              Your application will be sent directly to IID via WhatsApp for review.
            </p>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-border p-10 shadow-sm text-center"
          >
            <CheckCircle size={56} className="text-accent mx-auto mb-4" />
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">Application Sent!</h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Your membership application has been submitted via WhatsApp. The IID team will be in touch with you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-primary underline"
            >
              Submit another application
            </button>
          </motion.div>
        )}
      </div>

      <FAQ />
      <Footer />
    </div>
  );
}
