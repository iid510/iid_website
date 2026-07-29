import { defineField, defineType } from "sanity";

export default defineType({
  name: "scholarshipPage",
  title: "Scholarship Page",
  type: "document",
  fields: [
    defineField({ name: "eligibility", title: "Eligibility", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "howToApply", title: "How To Apply", type: "array", of: [{ type: "step" }] }),
    defineField({
      name: "pastRecipients", title: "Past Recipients", type: "array",
      of: [{
        type: "object",
        name: "recipient",
        fields: [
          defineField({ name: "name", title: "Name", type: "string" }),
          defineField({ name: "year", title: "Year", type: "number" }),
          defineField({ name: "institution", title: "Institution", type: "string" }),
        ],
        preview: { select: { title: "name", subtitle: "institution" } },
      }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Scholarship Page" }),
  },
});
