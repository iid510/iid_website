import { defineField, defineType } from "sanity";

export default defineType({
  name: "personEntry",
  title: "Person Entry",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "note", title: "Note", type: "string" }),
    defineField({ name: "quarter", title: "Quarter / Village", type: "string" }),
    defineField({ name: "occupation", title: "Occupation", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
