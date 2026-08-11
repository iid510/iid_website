import imageDimensions from "@/data/imageDimensions.json";

/** Kept in step with VARIANT_WIDTHS in scripts/image-pipeline.mjs. */
const VARIANT_WIDTHS = [400, 800, 1200];

const DIMENSIONS = imageDimensions as unknown as Record<string, [number, number]>;

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

function isSanityCdn(src: string) {
  return src.startsWith("https://cdn.sanity.io/");
}

/**
 * Sanity serves any width straight off its CDN, so a srcset costs us nothing
 * but the query string.
 */
function sanitySrcSet(src: string) {
  const base = src.split("?")[0];
  return VARIANT_WIDTHS.map((w) => `${base}?w=${w}&auto=format&fit=max ${w}w`).join(", ");
}

/**
 * Sanity encodes the asset's pixel size in the filename
 * (`…-1536x2048.webp`), so we can reserve layout space for a CDN image without
 * shipping a manifest for it.
 */
function sanityDimensions(src: string) {
  const match = /-(\d+)x(\d+)\.[a-z0-9]+(?:\?|$)/i.exec(src);
  if (!match) return {};
  return { width: Number(match[1]), height: Number(match[2]) };
}

/**
 * Local variants are emitted into the bundle by scripts/vite-plugin-images.mjs,
 * which skips any width at or above the original. We mirror that rule using the
 * dimensions manifest so we never advertise a file that was not written.
 */
function localSrcSet(src: string, intrinsicWidth?: number) {
  const widths = VARIANT_WIDTHS.filter((w) => !intrinsicWidth || w < intrinsicWidth);
  if (!widths.length) return undefined;

  const candidates = widths.map((w) => `${src.replace(/\.webp$/i, `-${w}w.webp`)} ${w}w`);
  // The original closes out the set at its true width, so large screens still
  // get full quality.
  if (intrinsicWidth) candidates.push(`${src} ${intrinsicWidth}w`);
  return candidates.join(", ");
}

/**
 * Resolve an image URL into the src/srcSet/width/height an <img> needs.
 *
 * `srcSet` is omitted during `vite dev`, where the generated variants do not
 * exist on disk — a dev page loads the original and looks identical, just
 * heavier.
 */
export function responsiveImage(src: string | null | undefined): ResponsiveImage | null {
  if (!src) return null;

  if (isSanityCdn(src)) {
    return { src, srcSet: sanitySrcSet(src), ...sanityDimensions(src) };
  }

  const [width, height] = DIMENSIONS[src] ?? [];

  // Only .webp files get variants generated, and only in a real build.
  const srcSet =
    import.meta.env.PROD && /\.webp$/i.test(src) ? localSrcSet(src, width) : undefined;

  return { src, srcSet, width, height };
}

/**
 * Intrinsic dimensions for a local image, when all you need is the aspect ratio
 * to reserve layout space.
 */
export function imageDimensionsFor(src: string | null | undefined) {
  if (!src) return undefined;
  const dims = DIMENSIONS[src];
  return dims ? { width: dims[0], height: dims[1] } : undefined;
}
