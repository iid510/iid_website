import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { useSanityBlogPosts } from "@/hooks/useSanityBlogPosts";

export default function BlogPage() {
  const { data: BLOG_POSTS = [] } = useSanityBlogPosts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const CATEGORIES = useMemo(() => ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))], [BLOG_POSTS]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.keyword.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, BLOG_POSTS]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo path="/blog" />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end pb-10 pt-24 bg-primary overflow-hidden">
        <AnimatedHeroBg />
        <div className="container-main relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label-accent mb-2">
            The Ijebu-Igbo Journal
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Blog &amp; Guides
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-primary-foreground/70 max-w-xl">
            {BLOG_POSTS.length} articles on Ijebu-Igbo's history, kingship, culture, travel and diaspora community.
          </motion.p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="border-b border-border bg-card/50 sticky top-16 z-30 backdrop-blur-md">
        <div className="container-main py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-9 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    category === c ? "bg-accent text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-main">
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} of {BLOG_POSTS.length} articles
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No articles match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-400 border border-border"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <time>{post.date}</time>
                      </div>
                      <h2 className="font-bold text-foreground text-base leading-snug line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-accent text-sm font-semibold">
                        Read Article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
