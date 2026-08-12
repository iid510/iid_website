import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";

const ease = [0.16, 1, 0.3, 1] as const;

const LAST_UPDATED = "1 August 2026";

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, ease }} className="mb-10">
      <h2 className="font-display font-bold text-foreground text-xl mb-3">{heading}</h2>
      <div className="space-y-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/privacy" />

      {/* Hero */}
      <section className="relative min-h-[32vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="label-accent mb-2 flex items-center gap-2">
            <ShieldCheck size={14} /> Legal
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground leading-tight">
            Privacy Policy
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Last updated: {LAST_UPDATED}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-main max-w-3xl">

          <Section heading="Who we are">
            <p>
              Ijebu Igbo Descendants in Diaspora — Omo Orimolusi ("IID", "we", "us", "our") is a community
              organisation registered as a charity in the United Kingdom (registration number 06408579) and in
              Nigeria (registration number 9684235). This policy explains what personal data we collect through
              this website (ijebuigbodescendants.org), why we collect it, how we use and protect it, and the
              rights you have over it.
            </p>
          </Section>

          <Section heading="What information we collect">
            <p>We collect personal data when you interact with the site, specifically when you:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Apply for membership through our application form — name, address, email, phone/WhatsApp number, and the part of Ijebu-Igbo you're from.</li>
              <li>Contact us by phone, WhatsApp, or email — whatever details you choose to share in that conversation.</li>
              <li>Submit a business for the community directory — business name, contact details, description, and any images or documents supplied.</li>
              <li>Sign up for community updates — your name and, where provided, contact details.</li>
              <li>Make a donation by bank transfer — we only ever see what your bank shares with us (name/reference on the transfer); we do not collect or store card numbers or online payment credentials anywhere on this site.</li>
            </ul>
            <p>
              We do not knowingly collect any special category data (e.g. health, religion, ethnicity) beyond
              what you might volunteer in free-text fields, and we do not use this site to target advertising.
            </p>
          </Section>

          <Section heading="How we use your information">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To process and respond to membership applications and enquiries.</li>
              <li>To keep our membership and community directory records up to date.</li>
              <li>To publish business directory listings you've asked us to publish.</li>
              <li>To send community updates, event notices, and announcements to those who've asked to receive them.</li>
              <li>To administer donations and acknowledge contributions.</li>
              <li>To maintain the security and proper functioning of the website.</li>
            </ul>
          </Section>

          <Section heading="Our legal basis for processing">
            <p>
              We process your data on the basis of your consent (for example, when you submit the membership or
              business listing forms), to take steps at your request before entering into an arrangement with
              you (e.g. membership), and our legitimate interest as a charity in keeping in touch with our
              community and members — an interest we balance against your right to privacy.
            </p>
          </Section>

          <Section heading="Who we share it with">
            <p>
              We don't sell or rent your personal data. It may be shared with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Service providers who help us run the site and process applications — currently Google (membership application form) and Sanity (our content management system, used to store business directory and community content).</li>
              <li>IID committee members and officers, on a need-to-know basis, to carry out membership administration, event planning, and community communications.</li>
              <li>Where we're required to by law, or to protect the rights, safety, or property of IID, our members, or the public.</li>
            </ul>
          </Section>

          <Section heading="Where your data is stored">
            <p>
              Data submitted through our membership form is stored with Google. Business directory and community
              content is stored with Sanity, a cloud content platform. Both providers may process data outside
              your home country; where that happens, they do so under their own published data protection and
              security commitments. If you have any questions about this, contact us using the details below.
            </p>
          </Section>

          <Section heading="How long we keep it">
            <p>
              We keep membership and directory records for as long as you remain a member or your listing stays
              published, and for a reasonable period afterwards to maintain accurate historical community
              records (for example, our Honour Roll and past-executive records). You can ask us to delete your
              data at any time, as set out below — we'll action that unless we have a legitimate reason (such as
              a legal or accounting obligation) to keep it.
            </p>
          </Section>

          <Section heading="Cookies">
            <p>
              This site does not currently use tracking or advertising cookies. Some pages embed third-party
              content (such as our Google membership form), which may set its own cookies under Google's privacy
              policy once you interact with it — that's outside our control. If we add analytics or other cookies
              in future, we'll update this policy accordingly.
            </p>
          </Section>

          <Section heading="Your rights">
            <p>Under UK GDPR (and equivalent protections under Nigeria's Data Protection Act), you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Ask what personal data we hold about you and get a copy of it.</li>
              <li>Ask us to correct inaccurate or incomplete data.</li>
              <li>Ask us to delete your data, or restrict how we use it.</li>
              <li>Object to us processing your data, or withdraw consent you previously gave.</li>
              <li>Ask for your data to be provided to you or another organisation in a portable format.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us using the details below. If you're not satisfied with
              our response, you have the right to complain to the UK Information Commissioner's Office (ico.org.uk)
              or the Nigeria Data Protection Commission.
            </p>
          </Section>

          <Section heading="Children's privacy">
            <p>
              This site is intended for adults joining or supporting the IID community. We do not knowingly
              collect personal data from children.
            </p>
          </Section>

          <Section heading="Changes to this policy">
            <p>
              We may update this policy from time to time as the site or our data practices change. The "last
              updated" date at the top of this page will always reflect the latest version.
            </p>
          </Section>

          <Section heading="Contact us">
            <p>
              If you have any questions about this policy, or want to exercise any of your data protection
              rights, contact us at{" "}
              <a href="mailto:info@ijebuigbodescendants.org" className="inline-flex items-center min-h-[44px] text-primary font-semibold hover:text-accent transition-colors touch-manipulation">
                info@ijebuigbodescendants.org
              </a>{" "}
              or{" "}
              <a href="mailto:support@ijebuigbodescendants.org" className="inline-flex items-center min-h-[44px] text-primary font-semibold hover:text-accent transition-colors touch-manipulation">
                support@ijebuigbodescendants.org
              </a>.
            </p>
          </Section>

        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
