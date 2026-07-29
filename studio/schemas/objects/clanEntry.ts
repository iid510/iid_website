import { defineField, defineType } from "sanity";

export default defineType({
  name: "clanEntry",
  title: "Clan Entry",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "meaning", title: "Meaning", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "meaning" },
  },
});
