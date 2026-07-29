import { defineField, defineType } from "sanity";

export default defineType({
  name: "kingdomOverview",
  title: "Kingdom Overview (Ruling Hierarchy)",
  type: "document",
  fields: [
    defineField({ name: "orgChartImage", title: "Org Chart Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "councilOfObasImage", title: "Council of Obas Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "grade1Description", title: "Grade 1 Description", type: "text" }),
    defineField({ name: "satelliteTowns", title: "Satellite Towns", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    prepare: () => ({ title: "Kingdom Overview" }),
  },
});
