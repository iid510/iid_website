import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "footerStats", title: "Footer Stats", type: "array", of: [{ type: "stat" }] }),
    defineField({ name: "heroPhrases", title: "Hero Cultural Phrases", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "clans", title: "Clans", type: "array", of: [{ type: "clanEntry" }] }),
    defineField({ name: "culturalPillars", title: "Cultural Pillars", type: "array", of: [{ type: "card" }] }),
    defineField({ name: "impactCards", title: "Impact Cards", type: "array", of: [{ type: "card" }] }),
    defineField({ name: "testimonials", title: "Testimonials", type: "array", of: [{ type: "testimonial" }] }),
    defineField({ name: "faqs", title: "FAQs", type: "array", of: [{ type: "faqEntry" }] }),
    defineField({
      name: "honourRoll", title: "Honour Roll Attribution", type: "object",
      fields: [
        defineField({ name: "source", title: "Source", type: "string" }),
        defineField({ name: "period", title: "Period", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
