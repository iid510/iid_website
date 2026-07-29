import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "contacts", title: "Contact Methods", type: "array", of: [{ type: "contactMethod" }] }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
