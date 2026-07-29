import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqEntry",
  title: "FAQ Entry",
  type: "object",
  fields: [
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer Paragraphs", type: "array", of: [{ type: "text" }] }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
});
