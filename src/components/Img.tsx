import { responsiveImage } from "@/lib/imageSrc";

type NativeImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

interface Props extends Omit<NativeImgProps, "src"> {
  src: string | null | undefined;
  /**
   * Rendered width, for the browser's srcset maths. Defaults to full viewport
   * width — correct for the phone layouts where the bytes actually hurt.
   */
  sizes?: string;
  /** Marks the page's LCP image: loads eagerly, at high priority. */
  priority?: boolean;
}

/**
 * Drop-in replacement for `<img>`.
 *
 * Renders exactly the same element, but fills in the three things every raw
 * `<img>` in this codebase was missing: a `srcset` so phones stop downloading
 * desktop-sized files, intrinsic `width`/`height` so the page reserves space
 * instead of shifting as photos arrive, and `loading="lazy"` by default.
 *
 * Remote URLs it has no variants for (YouTube thumbnails, bundled assets) pass
 * straight through untouched.
 */
export default function Img({ src, sizes = "100vw", priority = false, ...rest }: Props) {
  const resolved = responsiveImage(src);
  if (!resolved) return null;

  return (
    <img
      {...rest}
      src={resolved.src}
      srcSet={resolved.srcSet}
      sizes={resolved.srcSet ? sizes : undefined}
      width={rest.width ?? resolved.width}
      height={rest.height ?? resolved.height}
      loading={priority ? "eager" : (rest.loading ?? "lazy")}
      fetchPriority={priority ? "high" : rest.fetchPriority}
      decoding={rest.decoding ?? "async"}
    />
  );
}
