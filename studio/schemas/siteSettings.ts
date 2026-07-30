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
    defineField({ name: "impactEyebrow", title: "Impact Section — Eyebrow", type: "string", description: "Small label above the Impact heading on the Home page, e.g. 'Global Community'" }),
    defineField({ name: "impactHeading", title: "Impact Section — Heading", type: "string", description: "Main heading of the Impact section on the Home page, e.g. 'Ọmọ Alárè Across the World'" }),
    defineField({ name: "impactIntro", title: "Impact Section — Intro Paragraph", type: "text", description: "Short paragraph next to the Impact heading on the Home page" }),
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
