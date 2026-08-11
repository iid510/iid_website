import { motion } from "framer-motion";
import Img from "@/components/Img";

const ease = [0.16, 1, 0.3, 1] as const;

export default function OrgChart() {
  return (
    <section className="section-padding bg-[#f8f6f1]">
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="label-accent">Structure</h2>
          <h3 className="heading-section">Organisational Chart</h3>
          <p className="text-body mt-3">
            The governance hierarchy of IID Omo Orimolusi in Diaspora — from our overseeing
            traditional council through to every member of the community.
          </p>
        </motion.div>

        {/* Chart image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="rounded-2xl overflow-hidden border border-border shadow-elevated bg-white"
        >
          <Img
            src="/images/org-chart.webp"
            alt="IID Omo Orimolusi in Diaspora — Organisational Chart"
            className="w-full h-auto"
          />
        </motion.div>

      </div>
    </section>
  );
}
