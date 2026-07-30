import { defineField, defineType } from "sanity";

const CLANS = [
  "Oke-Agbo", "Oke-Sopen", "Itamarun", "Irolu", "Oke-Odode", "Parakoyi", "Oke-Lowo",
  "Ita-Ntebo", "Oke-Eri", "Ijasi", "Imope", "Ago", "Ogbe", "Ojowo", "Atikori", "Other",
];

export default defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "clan", title: "Clan (optional)", type: "string", options: { list: CLANS } }),
    defineField({ name: "location", title: "Location (optional)", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "joinedYear", title: "Joined Year", type: "number" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "location", media: "photo" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
