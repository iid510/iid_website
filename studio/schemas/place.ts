import { defineField, defineType } from "sanity";

const BADGE_COLORS = ["accent", "blue", "emerald", "orange", "rose", "cyan"];

export default defineType({
  name: "place",
  title: "Tourism Place",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "badgeColorKey", title: "Badge Color", type: "string", options: { list: BADGE_COLORS } }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description Paragraphs", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "quote", title: "Quote", type: "string" }),
    defineField({ name: "mapLink", title: "Map Link", type: "url" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "subtitle", media: "image" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
