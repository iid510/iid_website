/**
 * "Start here" — a curated reading path through the blog.
 *
 * 100 posts is a lot to land on cold. These seven, in this order, take a first-time
 * visitor from "where even is this place" to "here's how I take part" — each one
 * setting up the next. Slugs must exist in `blogPosts.ts`; the build-time check in
 * `scripts/check-content.mjs` fails the build if one drifts.
 */
export interface StarterStep {
  slug: string;
  /** Why this post, at this point in the path. */
  reason: string;
}

export const BLOG_STARTER_PATH: StarterStep[] = [
  {
    slug: "is-ijebu-igbo-yoruba-or-igbo",
    reason: "Clears up the single most common misunderstanding before anything else.",
  },
  {
    slug: "ijebu-igbo-location-ogun-state",
    reason: "Places the town on the map — and works out how far it is from Lagos.",
  },
  {
    slug: "history-of-ijebu-igbo",
    reason: "The founding story: hunting camps that grew into a kingdom of seven towns.",
  },
  {
    slug: "who-is-the-orimolusi-of-ijebu-igbo",
    reason: "Meet the paramount Oba at the head of it all.",
  },
  {
    slug: "seven-town-obas-of-ijebu-igbo",
    reason: "The seven Town Obas beneath the Orimolusi, and how the structure fits together.",
  },
  {
    slug: "what-is-oriki-yoruba-praise-poetry",
    reason: "The praise poetry that carries Ijebu-Igbo's history in spoken form.",
  },
  {
    slug: "who-are-ijebu-igbo-descendants-in-diaspora",
    reason: "How descendants abroad stay connected — and how you can join them.",
  },
];
