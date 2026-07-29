import { defineField, defineType } from "sanity";

export default defineType({
  name: "rulerEntry",
  title: "Past Ruler Entry",
  type: "object",
  fields: [
    defineField({ name: "order", title: "Order (No.)", type: "number" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "house", title: "House / Ruling Family", type: "string" }),
    defineField({ name: "years", title: "Years", type: "string" }),
    defineField({ name: "current", title: "Current Ruler?", type: "boolean" }),
    defineField({ name: "note", title: "Note", type: "text" }),
  ],
  preview: {
    select: { title: "name", subtitle: "years" },
  },
});
