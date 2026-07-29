import { defineField, defineType } from "sanity";

export default defineType({
  name: "foundationMember",
  title: "Foundation Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "position", title: "Position", type: "string" }),
    defineField({
      name: "group", title: "Group", type: "string",
      options: { list: [{ title: "Executive", value: "Executive" }, { title: "General", value: "General" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "position" },
  },
  orderings: [
    { title: "Group, then Order", name: "groupOrder", by: [{ field: "group", direction: "asc" }, { field: "order", direction: "asc" }] },
  ],
});
