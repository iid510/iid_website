import { defineField, defineType } from "sanity";

export default defineType({
  name: "bioProfile",
  title: "Bio Profile",
  type: "object",
  fields: [
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "bio", title: "Bio Paragraphs", type: "array", of: [{ type: "text" }] }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
