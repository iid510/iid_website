import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import { TOWNS } from "@/data/towns";

/**
 * Lateral navigation between the seven towns.
 *
 * Without this, reading about Japara and then wanting Atikori meant going back
 * to /heritage and scrolling to find the card again — the town pages had no
 * links to one another at all. Sits directly under the hero on every town page.
 */
export default function TownSwitcher({ current }: { current: string }) {
  return (
    <nav
      aria-label="The seven towns"
      className="sticky top-14 md:top-20 z-30 bg-card/95 backdrop-blur-md border-b border-border"
    >
      <div className="container-main py-2.5">
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground shrink-0 pr-1">
            <Crown size={13} className="text-accent" />
            Seven Towns
          </span>

          {/* Swipeable on phones; the active town is scrolled into view below. */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {TOWNS.map((town) => {
              const active = town.slug === current;
              return (
                <Link
                  key={town.slug}
                  to={`/${town.slug}`}
                  aria-current={active ? "page" : undefined}
                  ref={
                    active
                      ? (el) =>
                          el?.scrollIntoView({ block: "nearest", inline: "center" })
                      : undefined
                  }
                  className={`shrink-0 flex flex-col justify-center px-4 min-h-[44px] rounded-full border text-xs font-bold whitespace-nowrap transition-colors touch-manipulation ${
                    active
                      ? "bg-accent text-charcoal border-accent"
                      : "bg-transparent text-foreground/70 border-border hover:border-accent/60 hover:text-foreground"
                  }`}
                >
                  <span>{town.name}</span>
                  <span
                    className={`text-[10px] font-medium leading-tight ${
                      active ? "text-charcoal/70" : "text-muted-foreground"
                    }`}
                  >
                    {town.ruler}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
