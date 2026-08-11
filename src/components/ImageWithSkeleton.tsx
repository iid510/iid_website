import { useState } from "react";
import { cn } from "@/lib/utils";
import { responsiveImage } from "@/lib/imageSrc";

interface Props {
  src: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallback?: React.ReactNode;
  loading?: "lazy" | "eager";
  /**
   * How wide this image renders, for the browser's srcset maths. Defaults to
   * full viewport width, which is right for the phone layouts where bandwidth
   * actually matters. Pass something tighter for grids and thumbnails.
   */
  sizes?: string;
  /** Set on the one image that is the LCP candidate on a page. */
  priority?: boolean;
}

export default function ImageWithSkeleton({
  src,
  alt,
  className,
  imgClassName,
  fallback,
  loading = "lazy",
  sizes = "100vw",
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const resolved = responsiveImage(src);

  if (!resolved || errored) {
    return (
      <div className={cn("flex items-center justify-center bg-muted", className)}>
        {fallback ?? (
          <span className="text-muted-foreground text-xs text-center px-2">{alt}</span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Skeleton shimmer shown until image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={resolved.src}
        srcSet={resolved.srcSet}
        sizes={resolved.srcSet ? sizes : undefined}
        // Intrinsic size lets the browser reserve the right box before the
        // bytes arrive, which is what stops the page shifting under a reader.
        width={resolved.width}
        height={resolved.height}
        alt={alt}
        loading={priority ? "eager" : loading}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={cn(
          "w-full h-full transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />
    </div>
  );
}
