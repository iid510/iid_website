import { useEffect, useRef, useState } from "react";
import { useYourIID } from "@/context/YourIIDContext";

interface Props {
  /** Blog slug — progress is stored against this. */
  slug: string;
  title: string;
}

/**
 * Slim progress bar pinned under the navbar, plus the bookkeeping that lets
 * "Continue reading" work on /my-iid.
 *
 * Progress is measured against the whole document rather than the article
 * element: it's what the reader actually perceives, and it avoids a second
 * layout read on every scroll frame.
 */
export default function ReadingProgress({ slug, title }: Props) {
  const [percent, setPercent] = useState(0);
  const { recordReading } = useYourIID();
  const frame = useRef<number | null>(null);
  const latest = useRef(0);

  useEffect(() => {
    setPercent(0);
    latest.current = 0;
  }, [slug]);

  useEffect(() => {
    const measure = () => {
      frame.current = null;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);
      const clamped = Math.min(100, Math.max(0, next));
      latest.current = clamped;
      setPercent(clamped);
    };

    const onScroll = () => {
      // Coalesce to one measurement per frame — this fires on a hot path.
      if (frame.current === null) frame.current = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [slug]);

  // Persist periodically and on unmount rather than on every scroll tick.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (latest.current > 0) recordReading(slug, title, latest.current);
    }, 4000);
    return () => {
      window.clearInterval(id);
      if (latest.current > 0) recordReading(slug, title, latest.current);
    };
  }, [slug, title, recordReading]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[60] pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
