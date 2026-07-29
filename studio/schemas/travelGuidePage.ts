import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "./iconOptions";

export default defineType({
  name: "travelGuidePage",
  title: "Travel Guide Page",
  type: "document",
  fields: [
    defineField({
      name: "flights", title: "Flights", type: "array",
      of: [{
        type: "object",
        name: "flight",
        fields: [
          defineField({ name: "airline", title: "Airline", type: "string" }),
          defineField({ name: "route", title: "Route", type: "string" }),
          defineField({ name: "notes", title: "Notes", type: "string" }),
        ],
        preview: { select: { title: "airline", subtitle: "route" } },
      }],
    }),
    defineField({
      name: "roadOptions", title: "Road Options", type: "array",
      of: [{
        type: "object",
        name: "roadOption",
        fields: [
          defineField({ name: "mode", title: "Mode", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
        ],
        preview: { select: { title: "mode" } },
      }],
    }),
    defineField({
      name: "whatToBring", title: "What To Bring", type: "array",
      of: [{
        type: "object",
        name: "bringItem",
        fields: [
          defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
          defineField({ name: "tip", title: "Tip", type: "string" }),
        ],
        preview: { select: { title: "tip" } },
      }],
    }),
    defineField({
      name: "contacts", title: "Contacts", type: "array",
      of: [{
        type: "object",
        name: "travelContact",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "value", title: "Value", type: "string" }),
        ],
        preview: { select: { title: "label", subtitle: "value" } },
      }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Travel Guide Page" }),
  },
});
