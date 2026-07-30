import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings" },
  { id: "kingdomOverview", type: "kingdomOverview", title: "Kingdom Overview" },
  { id: "scholarshipPage", type: "scholarshipPage", title: "Scholarship Page" },
  { id: "travelGuidePage", type: "travelGuidePage", title: "Travel Guide Page" },
  { id: "donatePage", type: "donatePage", title: "Donate Page" },
  { id: "contactPage", type: "contactPage", title: "Contact Page" },
];

const PAGE_ENTRIES: { key: string; title: string }[] = [
  { key: "home", title: "Home" },
  { key: "about", title: "About" },
  { key: "impact", title: "Impact" },
  { key: "team", title: "Team" },
  { key: "heritage", title: "Heritage" },
  { key: "events", title: "Events" },
  { key: "gallery", title: "Gallery" },
  { key: "news", title: "News" },
  { key: "businesses", title: "Business Directory" },
  { key: "join", title: "Join" },
  { key: "videos", title: "Video Archive" },
  { key: "announcements", title: "Announcements" },
  { key: "members", title: "Members" },
  { key: "tourism", title: "Tourism" },
  { key: "honourRoll", title: "Honour Roll" },
];

const SINGLETON_TYPES = new Set([...SINGLETONS.map((s) => s.type), "page"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Pages")
        .child(
          S.list()
            .title("Site Pages")
            .items([
              ...SINGLETONS.map((s) =>
                S.listItem()
                  .id(s.id)
                  .title(s.title)
                  .child(S.document().schemaType(s.type).documentId(s.id))
              ),
              ...PAGE_ENTRIES.map((p) =>
                S.listItem()
                  .id(`page-${p.key}`)
                  .title(p.title)
                  .child(S.document().schemaType("page").documentId(`page-${p.key}`))
              ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string)
      ),
    ]);
