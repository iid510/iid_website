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
    defineField({ name: "clan", title: "Clan", type: "string", options: { list: CLANS }, validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "joinedYear", title: "Joined Year", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "clan", media: "photo" },
  },
});
