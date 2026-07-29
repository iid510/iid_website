import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../iconOptions";

export default defineType({
  name: "card",
  title: "Card",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
