import { client } from "./client";
import { imageRef } from "./uploadImages";
import type {
  TownSeed, PersonEntry, ChiefGroup, GroupedList, RulerEntry, BioProfile, LandmarkCard, GalleryCaptioned,
} from "../../src/data/townContent/types";

import atikori from "../../src/data/townContent/atikori";
import japara from "../../src/data/townContent/japara";
import okeSopen from "../../src/data/townContent/okeSopen";
import okeAgbo from "../../src/data/townContent/okeAgbo";
import aparaki from "../../src/data/townContent/aparaki";
import ojowo from "../../src/data/townContent/ojowo";
import imopeIjebu from "../../src/data/townContent/imopeIjebu";

const TOWNS: TownSeed[] = [atikori, japara, okeSopen, okeAgbo, aparaki, ojowo, imopeIjebu];

type AssetMap = Record<string, string>;

function personEntry(assetMap: AssetMap, p: PersonEntry) {
  return {
    name: p.name,
    title: p.title,
    note: p.note,
    quarter: p.quarter,
    occupation: p.occupation,
    phone: p.phone,
    photo: imageRef(assetMap, p.photo),
  };
}

function chiefGroup(assetMap: AssetMap, g: ChiefGroup) {
  return { groupLabel: g.groupLabel, members: g.members?.map((m) => personEntry(assetMap, m)) };
}

function groupedList(g: GroupedList) {
  return { groupLabel: g.groupLabel, items: g.items };
}

function rulerEntry(r: RulerEntry) {
  return { order: r.order, title: r.title, name: r.name, house: r.house, years: r.years, current: r.current, note: r.note };
}

function bioProfile(assetMap: AssetMap, b: BioProfile) {
  return { photo: imageRef(assetMap, b.photo), name: b.name, title: b.title, bio: b.bio };
}

function landmarkCard(assetMap: AssetMap, l: LandmarkCard) {
  return { image: imageRef(assetMap, l.image), name: l.name, description: l.description };
}

function galleryCaptioned(assetMap: AssetMap, g: GalleryCaptioned) {
  const image = imageRef(assetMap, g.image);
  return image ? { image, caption: g.caption } : undefined;
}

export async function seedTowns(assetMap: AssetMap) {
  let count = 0;
  let order = 0;
  for (const town of TOWNS) {
    order++;
    const _id = `town-${town.slug}`;
    await client.createOrReplace({
      _id,
      _type: "town",
      slug: { _type: "slug", current: town.slug },
      name: town.name,
      eyebrow: town.eyebrow,
      tagline: town.tagline,
      rulerTitle: town.rulerTitle,
      rulerName: town.rulerName,
      rulerPhoto: imageRef(assetMap, town.rulerPhoto),
      consortName: town.consortName,
      consortPhoto: imageRef(assetMap, town.consortPhoto),
      quickFacts: town.quickFacts,
      history: town.history,
      governanceNotes: town.governanceNotes,
      rulerBio: town.rulerBio,
      rulerOriki: town.rulerOriki,
      townOriki: town.townOriki,
      anthem: town.anthem,
      subdivisionGroups: town.subdivisionGroups?.map(groupedList),
      chiefGroups: town.chiefGroups?.map((g) => chiefGroup(assetMap, g)),
      baales: town.baales?.map((p) => personEntry(assetMap, p)),
      pastRulers: town.pastRulers?.map(rulerEntry),
      notableProfiles: town.notableProfiles?.map((b) => bioProfile(assetMap, b)),
      heritagePlaces: town.heritagePlaces?.map((l) => landmarkCard(assetMap, l)),
      aroundTown: town.aroundTown?.map((l) => landmarkCard(assetMap, l)),
      projectAchievements: town.projectAchievements,
      galleryCaptions: town.galleryCaptions?.map((g) => galleryCaptioned(assetMap, g)).filter(Boolean),
      extraGalleryImages: town.extraGalleryImages?.map((p) => imageRef(assetMap, p)).filter(Boolean),
      sourceNote: town.sourceNote,
      placeholderNote: town.placeholderNote,
      order,
    });
    count++;
  }
  console.log(`Seeded ${count} town documents.`);
}
