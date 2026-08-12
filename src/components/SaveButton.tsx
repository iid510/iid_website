import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useYourIID } from "@/context/YourIIDContext";

interface Props {
  slug: string;
  kind: "business" | "article";
  /** "icon" for a compact circle on cards, "full" for a labelled button */
  variant?: "icon" | "full";
  className?: string;
}

/**
 * Bookmark toggle backed by the login-free "Your IID" profile.
 * Saved items surface on /my-iid.
 */
export default function SaveButton({ slug, kind, variant = "icon", className = "" }: Props) {
  const { toggleBusiness, toggleArticle, isBusinessSaved, isArticleSaved } = useYourIID();

  const saved = kind === "business" ? isBusinessSaved(slug) : isArticleSaved(slug);
  const label = saved ? "Saved" : "Save";

  const toggle = (e: React.MouseEvent) => {
    // These sit inside link cards — don't navigate when the bookmark is tapped.
    e.preventDefault();
    e.stopPropagation();
    if (kind === "business") toggleBusiness(slug);
    else toggleArticle(slug);
  };

  if (variant === "full") {
    return (
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.95 }}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${kind} from saved` : `Save ${kind}`}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-colors touch-manipulation ${
          saved
            ? "bg-accent/15 border-accent/40 text-accent"
            : "bg-card border-border text-foreground hover:border-accent/50"
        } ${className}`}
      >
        <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
        {label}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${kind} from saved` : `Save ${kind}`}
      title={label}
      className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors touch-manipulation ${
        saved
          ? "bg-accent text-charcoal"
          : "bg-black/35 text-white hover:bg-black/55"
      } ${className}`}
    >
      <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
    </motion.button>
  );
}
