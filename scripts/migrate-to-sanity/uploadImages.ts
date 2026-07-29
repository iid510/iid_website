import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { client } from "./client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../../public");
const CACHE_PATH = path.resolve(__dirname, ".asset-map.json");

const IMAGE_EXT = new Set([".webp", ".png", ".jpg", ".jpeg"]);
const EXCLUDED_DIR_NAMES = new Set(["ijebu-traditional-council-chart_files"]);
const EXT_PRIORITY: Record<string, number> = { ".webp": 0, ".png": 1, ".jpg": 2, ".jpeg": 2 };

type AssetMap = Record<string, string>;

function loadCache(): AssetMap {
  if (fs.existsSync(CACHE_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

function saveCache(map: AssetMap) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(map, null, 2));
}

function walkImages(dir: string, results: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDED_DIR_NAMES.has(entry.name)) continue;
      walkImages(full, results);
    } else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

/** Dedupe siblings that share a basename across extensions, preferring .webp. */
function dedupeByBasename(files: string[]): string[] {
  const byKey = new Map<string, string>();
  for (const file of files) {
    const dir = path.dirname(file);
    const base = path.basename(file, path.extname(file));
    const key = path.join(dir, base);
    const ext = path.extname(file).toLowerCase();
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, file);
      continue;
    }
    const existingExt = path.extname(existing).toLowerCase();
    if (EXT_PRIORITY[ext] < EXT_PRIORITY[existingExt]) {
      byKey.set(key, file);
    }
  }
  return [...byKey.values()];
}

/** Site-root-relative path, e.g. "/images/atikori/xyz.webp" or "/team/xyz.webp" */
function toSiteKey(absPath: string): string {
  return "/" + path.relative(PUBLIC_DIR, absPath).split(path.sep).join("/");
}

export async function uploadImages(opts: { force?: boolean } = {}): Promise<AssetMap> {
  const assetMap = opts.force ? {} : loadCache();

  const allFiles = [
    ...walkImages(path.join(PUBLIC_DIR, "images")),
    ...walkImages(path.join(PUBLIC_DIR, "team")),
  ];
  const files = dedupeByBasename(allFiles);

  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    const key = toSiteKey(file);
    if (assetMap[key]) {
      skipped++;
      continue;
    }
    const asset = await client.assets.upload("image", fs.createReadStream(file), {
      filename: path.basename(file),
    });
    assetMap[key] = asset._id;
    uploaded++;
    saveCache(assetMap);
    if (uploaded % 25 === 0) {
      console.log(`  uploaded ${uploaded} images so far...`);
    }
  }

  console.log(`Image upload complete: ${uploaded} uploaded, ${skipped} already cached, ${files.length} total.`);
  return assetMap;
}

export function imageRef(assetMap: AssetMap, sitePath: string | undefined | null) {
  if (!sitePath) return undefined;
  const assetId = assetMap[sitePath];
  if (!assetId) {
    throw new Error(`No uploaded asset found for image path "${sitePath}" — check the path is correct and exists under public/`);
  }
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: assetId } };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  uploadImages({ force: process.argv.includes("--reupload-images") }).then(() => {
    console.log("Done.");
  });
}
