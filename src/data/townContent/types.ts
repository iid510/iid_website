export interface QuickFact {
  icon?: string;
  label: string;
  value: string;
}

export interface PersonEntry {
  name: string;
  title?: string;
  note?: string;
  quarter?: string;
  occupation?: string;
  phone?: string;
  photo?: string;
}

export interface ChiefGroup {
  groupLabel: string;
  members: PersonEntry[];
}

export interface GroupedList {
  groupLabel: string;
  items: string[];
}

export interface RulerEntry {
  order?: number;
  title?: string;
  name: string;
  house?: string;
  years?: string;
  current?: boolean;
  note?: string;
}

export interface BioProfile {
  photo?: string;
  name: string;
  title?: string;
  bio?: string[];
}

export interface LandmarkCard {
  image?: string;
  name: string;
  description?: string;
}

export interface GalleryCaptioned {
  image: string;
  caption?: string;
}

export interface TownSeed {
  slug: string;
  name: string;
  eyebrow?: string;
  tagline?: string;
  rulerTitle?: string;
  rulerName?: string;
  rulerPhoto?: string;
  consortName?: string;
  consortPhoto?: string;
  quickFacts?: QuickFact[];
  history?: string[];
  governanceNotes?: string[];
  rulerBio?: string[];
  rulerOriki?: string[];
  townOriki?: string[];
  anthem?: string[];
  subdivisionGroups?: GroupedList[];
  chiefGroups?: ChiefGroup[];
  baales?: PersonEntry[];
  pastRulers?: RulerEntry[];
  notableProfiles?: BioProfile[];
  heritagePlaces?: LandmarkCard[];
  aroundTown?: LandmarkCard[];
  projectAchievements?: string[];
  galleryCaptions?: GalleryCaptioned[];
  extraGalleryImages?: string[];
  sourceNote?: string;
  placeholderNote?: string;
  order?: number;
}
