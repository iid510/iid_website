import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryCaptioned",
  title: "Captioned Gallery Image",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
  },
});
