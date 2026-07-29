import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../iconOptions";

export default defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
