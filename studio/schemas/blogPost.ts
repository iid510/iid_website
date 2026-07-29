import { defineField, defineType } from "sanity";

const CATEGORIES = [
  "Business & Entrepreneurship", "Community Development", "Culture", "Diaspora Community",
  "Education", "FAQ", "Festivals & Culture", "Heritage & Landmarks", "History",
  "Kingship & History", "Language & Culture", "Notable People", "The Seven Towns", "Travel Guide",
];

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "keyword", title: "SEO Keyword", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: CATEGORIES } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "dateLabel", title: "Date (display text)", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "content", title: "Content Paragraphs", type: "array", of: [{ type: "text" }], validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Published, Newest", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
