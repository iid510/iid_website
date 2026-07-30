import { defineField, defineType } from "sanity";

const PAGE_KEYS = [
  "home", "about", "impact", "team", "heritage", "events", "gallery", "news",
  "businesses", "join", "videos", "announcements", "members", "tourism", "honourRoll",
];

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "key", title: "Page", type: "string",
      options: { list: PAGE_KEYS }, validation: (r) => r.required(),
      description: "Which page this content belongs to — must match the site route",
    }),
    defineField({ name: "label", title: "Internal Label", type: "string", description: "Studio-only, for finding this in lists" }),
    defineField({
      name: "hero", title: "Hero", type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "text" }),
      ],
    }),
    defineField({
      name: "sections", title: "Content Sections", type: "array",
      of: [{
        type: "object",
        name: "pageSection",
        fields: [
          defineField({
            name: "sectionId", title: "Section ID", type: "string", readOnly: true,
            description: "Identifies where this block appears on the page — do not change",
          }),
          defineField({ name: "eyebrow", title: "Eyebrow (small label above heading)", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "body", title: "Body Paragraphs", type: "array", of: [{ type: "text" }] }),
          defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { title: "heading", subtitle: "sectionId" } },
      }],
    }),
    defineField({
      name: "timeline", title: "Timeline (Heritage page only)", type: "array",
      of: [{
        type: "object",
        name: "timelineMilestone",
        fields: [
          defineField({ name: "era", title: "Era", type: "string" }),
          defineField({ name: "year", title: "Year", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
        ],
        preview: { select: { title: "title", subtitle: "year" } },
      }],
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "key" },
  },
});
