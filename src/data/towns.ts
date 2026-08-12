/**
 * The seven towns, in the order the kingdom recognises them.
 *
 * Each town has its own page with its history, Oba, Baales, oriki and gallery —
 * but for a long time the only link to any of them anywhere on the site was a
 * single card partway down /heritage. This list is the shared source for every
 * place that now offers a way in: the navigation menu and the switcher on the
 * town pages themselves.
 *
 * `ruler` is the short form of the Oba's title, for use as a subtitle. The full
 * ceremonial titles live in src/data/townContent/.
 */
export interface TownLink {
  slug: string;
  name: string;
  ruler: string;
}

export const TOWNS: TownLink[] = [
  { slug: "oke-sopen",   name: "Oke-Sopen",   ruler: "Sopenlukale" },
  { slug: "oke-agbo",    name: "Oke-Agbo",    ruler: "Bejeroku" },
  { slug: "ojowo",       name: "Ojowo",       ruler: "Olokine" },
  { slug: "atikori",     name: "Atikori",     ruler: "Keegbo" },
  { slug: "japara",      name: "Japara",      ruler: "Abijaparako" },
  { slug: "imope-ijebu", name: "Imope-Ijebu", ruler: "Onimope" },
  { slug: "aparaki",     name: "Aparaki",     ruler: "Alaparaki" },
];

export const TOWN_SLUGS = TOWNS.map((t) => t.slug);

export function townBySlug(slug: string) {
  return TOWNS.find((t) => t.slug === slug);
}
