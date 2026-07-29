import { defineField, defineType } from "sanity";

const CATEGORIES = [
  "Food & Catering", "Fashion & Beauty", "Real Estate",
  "Professional Services", "Technology", "Health & Wellness",
  "Retail & Trade", "Education",
];

export default defineType({
  name: "business",
  title: "Business",
  type: "document",
  fields: [
    defineField({ name: "id", title: "ID", type: "number", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Business Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: CATEGORIES }, validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "website", title: "Website", type: "string" }),
    defineField({ name: "flyer", title: "Flyer Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "banner", title: "Banner Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "promoVideo", title: "Promo Video (uploaded to Sanity)", type: "file", options: { accept: "video/*" } }),
    defineField({ name: "promoVideoUrl", title: "Promo Video URL (local /videos path)", type: "string", description: "Used when the video is hosted locally instead of uploaded above" }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "services", title: "Services (simple list)", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "serviceCategories", title: "Service Categories", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Category Name", type: "string" }),
          defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
        ],
      }],
    }),
    defineField({
      name: "whatWeDo", title: "What We Do", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
          defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
        ],
      }],
    }),
    defineField({
      name: "values", title: "Values", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
          defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
        ],
      }],
    }),
    defineField({ name: "focusAreas", title: "Focus Areas", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "partners", title: "Partners", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "hours", title: "Business Hours", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "day", title: "Day(s)", type: "string" }),
          defineField({ name: "time", title: "Time", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "social", title: "Social Media", type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter/X URL", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
      ],
    }),
    defineField({ name: "ownerName", title: "Owner Name", type: "string" }),
    defineField({ name: "established", title: "Established Year", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "benefits", title: "Benefits / Key Points", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "testimonials", title: "Testimonials", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "id", title: "ID", type: "number" }),
          defineField({ name: "author", title: "Author", type: "string" }),
          defineField({ name: "role", title: "Role", type: "string" }),
          defineField({ name: "company", title: "Company", type: "string" }),
          defineField({ name: "text", title: "Testimonial", type: "text" }),
          defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (r) => r.min(1).max(5) }),
        ],
      }],
    }),
    defineField({ name: "region", title: "Region", type: "string", options: { list: ["UK", "Nigeria", "Diaspora"] } }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "flyer" },
  },
});
