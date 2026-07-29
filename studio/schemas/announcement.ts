import { defineField, defineType } from "sanity";

const CATEGORIES = ["Birth", "Obituary", "Congratulations", "Notice", "Achievement"];

export default defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({ name: "category", title: "Category", type: "string", options: { list: CATEGORIES }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "postedBy", title: "Posted By", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
  orderings: [
    { title: "Date, Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
