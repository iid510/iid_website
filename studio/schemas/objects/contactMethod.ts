import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../iconOptions";

export default defineType({
  name: "contactMethod",
  title: "Contact Method",
  type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sub", title: "Sub-text", type: "string" }),
    defineField({ name: "href", title: "Link (href)", type: "string" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
