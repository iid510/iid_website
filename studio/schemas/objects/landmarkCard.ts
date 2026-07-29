import { defineField, defineType } from "sanity";

export default defineType({
  name: "landmarkCard",
  title: "Landmark Card",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
