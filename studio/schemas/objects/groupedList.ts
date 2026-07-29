import { defineField, defineType } from "sanity";

export default defineType({
  name: "groupedList",
  title: "Grouped List",
  type: "object",
  fields: [
    defineField({ name: "groupLabel", title: "Group Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "groupLabel" },
  },
});
