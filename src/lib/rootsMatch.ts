import type { Town } from "@/hooks/useSanityTowns";
import type { PersonEntry } from "@/data/townContent/types";

/**
 * Matching engine behind "Find Your Roots".
 *
 * Every signal is drawn from the town data the site already publishes — the
 * Itun/Odo subdivision lists, the chieftaincy rolls, the Baale lists and the
 * ruling houses. Nothing is invented: if a compound or surname isn't in the
 * published records, the finder says so rather than guessing.
 */

export interface RootsAnswers {
  /** Town slug when the visitor already knows it, "" when they don't */
  town: string;
  /** Family compound / Itun / Odo / area name */
  compound: string;
  /** Family surname */
  surname: string;
  /** Where they live now — shapes the closing call to action */
  location: string;
}

export interface RootsEvidence {
  kind: "compound" | "surname";
  label: string;
  detail: string;
}

export interface RootsMatch {
  town: Town;
  score: number;
  evidence: RootsEvidence[];
}

const STOPWORDS = new Set([
  "itun", "odo", "agbole", "oke", "ile", "compound", "quarter", "street", "the", "of", "family",
]);

function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    // strip Yoruba tone marks and under-dots so "Ọjọ̀wọ̀" matches "ojowo"
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value: string): string[] {
  return normalise(value)
    .split(/[\s-]+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

function personNames(people: PersonEntry[] | undefined): string[] {
  return (people ?? []).map((p) => p.name).filter(Boolean);
}

/** Every place-like string a town publishes: subdivisions, quarters, landmarks. */
function placeStrings(town: Town): string[] {
  const out: string[] = [town.name];
  town.subdivisionGroups?.forEach((group) => out.push(...group.items));
  town.baales?.forEach((b) => b.quarter && out.push(b.quarter));
  town.chiefGroups?.forEach((group) => group.members.forEach((m) => m.quarter && out.push(m.quarter)));
  town.heritagePlaces?.forEach((p) => out.push(p.name));
  town.aroundTown?.forEach((p) => out.push(p.name));
  return out.filter(Boolean);
}

/** Every person the town publishes, for surname matching. */
function peopleStrings(town: Town): { name: string; role: string }[] {
  const out: { name: string; role: string }[] = [];
  if (town.rulerName) out.push({ name: town.rulerName, role: town.rulerTitle ?? "Ruling house" });
  town.chiefGroups?.forEach((group) =>
    group.members.forEach((m) => out.push({ name: m.name, role: m.title ?? group.groupLabel })),
  );
  personNames(town.baales).forEach((name) => out.push({ name, role: "Baale" }));
  town.notableProfiles?.forEach((p) => out.push({ name: p.name, role: p.title ?? "Notable son/daughter" }));
  town.pastRulers?.forEach((r) => out.push({ name: r.name, role: r.title ?? "Past ruler" }));
  return out.filter((p) => Boolean(p.name));
}

export function matchRoots(towns: Town[], answers: RootsAnswers): RootsMatch[] {
  const compoundTokens = tokens(answers.compound);
  const surnameTokens = tokens(answers.surname);

  const results = towns.map<RootsMatch>((town) => {
    const evidence: RootsEvidence[] = [];
    let score = 0;

    // A town the visitor picked outright outweighs everything else.
    if (answers.town && town.slug === answers.town) score += 100;

    if (compoundTokens.length) {
      const places = placeStrings(town);
      for (const place of places) {
        const placeNorm = normalise(place);
        const hit = compoundTokens.find(
          (t) => placeNorm === t || placeNorm.split(/[\s-]+/).includes(t),
        );
        if (hit) {
          score += 40;
          evidence.push({
            kind: "compound",
            label: place,
            detail: `"${place}" is recorded among ${town.name}'s quarters and compounds.`,
          });
          break;
        }
      }
    }

    if (surnameTokens.length) {
      const people = peopleStrings(town);
      const hits = people.filter((person) => {
        const parts = normalise(person.name).split(/[\s-]+/);
        return surnameTokens.some((t) => parts.includes(t));
      });
      if (hits.length) {
        // More bearers of the name in one town is a stronger signal, but cap it
        // so a single large chieftaincy roll can't dominate the result.
        score += Math.min(15 + hits.length * 8, 45);
        const sample = hits.slice(0, 3);
        evidence.push({
          kind: "surname",
          label: sample.map((h) => h.name).join(", "),
          detail:
            hits.length === 1
              ? `${sample[0].name} (${sample[0].role}) appears in ${town.name}'s records.`
              : `${hits.length} people bearing this name appear in ${town.name}'s records, including ${sample
                  .map((h) => h.name)
                  .join(", ")}.`,
        });
      }
    }

    return { town, score, evidence };
  });

  return results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.town.name.localeCompare(b.town.name));
}

export const LOCATION_OPTIONS = [
  { value: "uk", label: "United Kingdom" },
  { value: "nigeria", label: "Nigeria" },
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "europe", label: "Elsewhere in Europe" },
  { value: "other", label: "Somewhere else" },
] as const;

export function locationMessage(location: string): string {
  switch (location) {
    case "uk":
      return "IID's UK branch is the heart of the diaspora community — regular meetings, the annual gala, and the closest network to you.";
    case "nigeria":
      return "You're close to home. IID's projects run in Ijebu-Igbo itself — Unity House, the scholarship programme and community development work.";
    case "usa":
    case "canada":
      return "Descendants across North America stay connected through IID's events and updates from home.";
    case "europe":
      return "Descendants across Europe join IID's gatherings and keep in step with what's happening back home.";
    default:
      return "Wherever you are in the world, IID connects you to Ijebu-Igbo and to descendants near you.";
  }
}
