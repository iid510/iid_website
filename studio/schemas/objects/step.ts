import { defineField, defineType } from "sanity";

export default defineType({
  name: "step",
  title: "Step",
  type: "object",
  fields: [
    defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
  preview: {
    select: { title: "title", subtitle: "stepNumber" },
  },
});
