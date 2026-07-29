import { defineField, defineType } from "sanity";

export default defineType({
  name: "donatePage",
  title: "Donate Page",
  type: "document",
  fields: [
    defineField({ name: "bankAccounts", title: "Bank Accounts", type: "array", of: [{ type: "bankAccount" }] }),
    defineField({ name: "target", title: "Fundraising Target", type: "number" }),
    defineField({ name: "raised", title: "Amount Raised", type: "number" }),
    defineField({ name: "impactItems", title: "Impact Items", type: "array", of: [{ type: "card" }] }),
  ],
  preview: {
    prepare: () => ({ title: "Donate Page" }),
  },
});
