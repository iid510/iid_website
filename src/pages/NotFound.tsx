import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";

const QUICK_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Events",    href: "/events" },
  { label: "Blog",      href: "/blog" },
  { label: "Gallery",   href: "/gallery" },
  { label: "Directory", href: "/businesses" },
  { label: "Contact",   href: "/contact" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Connect Ijebu Roots";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo title="Page Not Found | Connect Ijebu Roots" description="The page you are looking for does not exist." canonicalPath={location.pathname} />
      <Navbar />

      <main className="flex-1 flex items-center justify-center section-padding pt-32 pb-20">
        <div className="container-main max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Big 404 */}
            <div className="relative mb-6">
              <span className="font-display font-black text-[120px] sm:text-[160px] leading-none text-primary/8 select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
                  <span className="text-4xl">🔍</span>
                </div>
              </div>
            </div>

            <h1 className="heading-section mb-4">Page Not Found</h1>
            <p className="text-muted-foreground text-lg mb-3 max-w-md mx-auto">
              The page <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded text-foreground">{location.pathname}</span> doesn't exist.
            </p>
            <p className="text-muted-foreground mb-10">
              It may have been moved, renamed, or never existed.
            </p>

            {/* Primary actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Home size={16} /> Go to Homepage
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border text-foreground font-semibold hover:bg-muted transition-colors"
              >
                <ArrowLeft size={16} /> Go Back
              </button>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-4">
                Quick Links
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-card border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
