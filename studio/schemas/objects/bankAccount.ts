import { defineField, defineType } from "sanity";

export default defineType({
  name: "bankAccount",
  title: "Bank Account",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "accountName", title: "Account Name", type: "string" }),
    defineField({ name: "bankName", title: "Bank Name", type: "string" }),
    defineField({ name: "accountNumber", title: "Account Number", type: "string" }),
    defineField({ name: "sortCode", title: "Sort Code", type: "string" }),
    defineField({ name: "reference", title: "Payment Reference Note", type: "string" }),
  ],
  preview: {
    select: { title: "label", subtitle: "bankName" },
  },
});
