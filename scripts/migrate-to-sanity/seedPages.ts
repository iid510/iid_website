import { client } from "./client";
import { imageRef } from "./uploadImages";
import type { PageContent, PageSection, TimelineMilestone } from "../../src/hooks/useSanityPage";
import {
  HOME_PAGE, ABOUT_PAGE, IMPACT_PAGE, TEAM_PAGE, HERITAGE_PAGE, EVENTS_PAGE,
  GALLERY_PAGE, NEWS_PAGE, BUSINESSES_PAGE, JOIN_PAGE, VIDEOS_PAGE,
  ANNOUNCEMENTS_PAGE, MEMBERS_PAGE, TOURISM_PAGE, HONOUR_ROLL_PAGE,
} from "../../src/data/pageContent";

const ALL_PAGES: PageContent[] = [
  HOME_PAGE, ABOUT_PAGE, IMPACT_PAGE, TEAM_PAGE, HERITAGE_PAGE, EVENTS_PAGE,
  GALLERY_PAGE, NEWS_PAGE, BUSINESSES_PAGE, JOIN_PAGE, VIDEOS_PAGE,
  ANNOUNCEMENTS_PAGE, MEMBERS_PAGE, TOURISM_PAGE, HONOUR_ROLL_PAGE,
];

const LABELS: Record<string, string> = {
  home: "Home", about: "About", impact: "Impact", team: "Team", heritage: "Heritage",
  events: "Events", gallery: "Gallery", news: "News", businesses: "Business Directory",
  join: "Join", videos: "Video Archive", announcements: "Announcements", members: "Members",
  tourism: "Tourism", honourRoll: "Honour Roll",
};

function seedSection(assetMap: Record<string, string>, s: PageSection) {
  return {
    sectionId: s.sectionId,
    eyebrow: s.eyebrow,
    heading: s.heading,
    body: s.body,
    image: imageRef(assetMap, s.image),
  };
}

function seedMilestone(m: TimelineMilestone) {
  return { era: m.era, year: m.year, title: m.title, description: m.description };
}

export async function seedPages(assetMap: Record<string, string>) {
  let count = 0;
  for (const page of ALL_PAGES) {
    const _id = `page-${page.key}`;
    await client.createOrReplace({
      _id,
      _type: "page",
      key: page.key,
      label: LABELS[page.key] ?? page.key,
      hero: page.hero,
      sections: page.sections?.map((s) => seedSection(assetMap, s)),
      timeline: page.timeline?.map(seedMilestone),
    });
    count++;
  }
  console.log(`Seeded ${count} page documents.`);
}
