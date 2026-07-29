import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings" },
  { id: "kingdomOverview", type: "kingdomOverview", title: "Kingdom Overview" },
  { id: "scholarshipPage", type: "scholarshipPage", title: "Scholarship Page" },
  { id: "travelGuidePage", type: "travelGuidePage", title: "Travel Guide Page" },
  { id: "donatePage", type: "donatePage", title: "Donate Page" },
  { id: "contactPage", type: "contactPage", title: "Contact Page" },
];

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Pages")
        .child(
          S.list()
            .title("Site Pages")
            .items(
              SINGLETONS.map((s) =>
                S.listItem()
                  .id(s.id)
                  .title(s.title)
                  .child(S.document().schemaType(s.type).documentId(s.id))
              )
            )
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string)
      ),
    ]);
