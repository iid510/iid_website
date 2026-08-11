/**
 * Shared image logic for the build.
 *
 * Two jobs, both aimed at what a phone on Nigerian mobile data actually pays for:
 *
 *   1. Redundant masters — most photos were added as .png/.jpeg and later
 *      converted to .webp. The app only ever requests the .webp, but `public/`
 *      is copied verbatim into `dist/`, so ~92 MB of unused originals were being
 *      published. They stay in the repo as masters; they just don't ship.
 *
 *   2. Responsive variants — a 390px phone was downloading the same full-size
 *      file a desktop gets. We emit narrower copies alongside each large image
 *      so `srcset` can pick an appropriate one.
 *
 * Variants are written into `dist/` at build time only, so nothing generated is
 * committed. `src/lib/imageSrc.ts` must agree with VARIANT_WIDTHS and
 * variantPath() below.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, basename, relative, sep } from "node:path";

/** Widths we emit for any image wider than the smallest of them. */
export const VARIANT_WIDTHS = [400, 800, 1200];

/** Below this, a responsive variant saves less than it costs in requests. */
const MIN_BYTES_FOR_VARIANTS = 60 * 1024;

const SOURCE_FORMATS = new Set([".png", ".jpg", ".jpeg"]);

/** Written by scripts/generate-image-manifest.mjs; never a real reference. */
export const GENERATED_MANIFEST = "imageDimensions.json";

/** Referenced by icon/manifest/meta plumbing rather than by app code. */
const KEEP = new Set([
  "logo.png",
  "logo.webp",
  "logo-tp.webp",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "favicon.ico",
  "favicon.svg",
]);

export function walk(dir, out = [], skip = new Set(["node_modules", ".git", "dist"])) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out, skip);
    else out.push(full);
  }
  return out;
}

/**
 * Everything in the codebase that could name an image, as one string. Used to
 * prove a master really is unreferenced before we drop it from the build.
 */
function buildHaystack(root) {
  const files = [
    ...walk(join(root, "src")),
    ...walk(join(root, "scripts")),
    join(root, "index.html"),
  ].filter(
    (f) =>
      /\.(tsx?|jsx?|mjs|json|html|css)$/.test(f) &&
      // The generated dimensions manifest names every file on disk, masters
      // included. Counting it as a reference would mark nothing as redundant.
      basename(f) !== GENERATED_MANIFEST,
  );

  const publicManifests = readdirSync(join(root, "public"))
    .filter((f) => f.endsWith(".json") || f.endsWith(".js"))
    .map((f) => join(root, "public", f));

  return [...files, ...publicManifests].map((f) => readFileSync(f, "utf8")).join("\n");
}

/**
 * Source-format images that have a .webp twin and are named nowhere in the
 * codebase. Returns a Set of paths relative to `public/`, POSIX-separated.
 */
export function findRedundantMasters(root) {
  const haystack = buildHaystack(root);
  const publicDir = join(root, "public");
  const redundant = new Set();

  for (const file of walk(publicDir)) {
    const ext = extname(file).toLowerCase();
    if (!SOURCE_FORMATS.has(ext)) continue;

    const name = basename(file);
    if (KEEP.has(name)) continue;

    const twin = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    try {
      if (!statSync(twin).isFile()) continue;
    } catch {
      continue;
    }

    if (haystack.includes(name)) continue;

    redundant.add(relative(publicDir, file).split(sep).join("/"));
  }

  return redundant;
}

/** `/images/a/b.webp` + 800 -> `/images/a/b-800w.webp` */
export function variantPath(urlPath, width) {
  return urlPath.replace(/\.webp$/i, `-${width}w.webp`);
}

/** Images worth emitting variants for: .webp, and big enough to matter. */
export function shouldHaveVariants(absPath) {
  if (extname(absPath).toLowerCase() !== ".webp") return false;
  try {
    return statSync(absPath).size >= MIN_BYTES_FOR_VARIANTS;
  } catch {
    return false;
  }
}
