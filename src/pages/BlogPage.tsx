import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen, Search, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { useSanityBlogPosts } from "@/hooks/useSanityBlogPosts";
import { useSanityNews } from "@/hooks/useSanityNews";
import { useYourIID } from "@/context/YourIIDContext";
import { BLOG_STARTER_PATH } from "@/data/blogStarterPath";
import Img from "@/components/Img";

interface UnifiedPost {
  key: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  href: string;
  keyword: string;
}

const NEWS_CATEGORY = "Community News";

export default function BlogPage() {
  const { data: RAW_BLOG_POSTS = [] } = useSanityBlogPosts();
  const { data: NEWS_ARTICLES = [] } = useSanityNews();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { profile } = useYourIID();

  const ALL_POSTS = useMemo<UnifiedPost[]>(() => {
    const news: UnifiedPost[] = NEWS_ARTICLES.map((a) => ({
      key: `news-${a.id}`,
      title: a.title,
      category: NEWS_CATEGORY,
      excerpt: a.excerpt,
      image: a.featuredImage,
      date: a.date,
      href: `/news/${a.id}`,
      keyword: a.title,
    }));
    const blog: UnifiedPost[] = RAW_BLOG_POSTS.map((p) => ({
      key: `blog-${p.slug}`,
      title: p.title,
      category: p.category,
      excerpt: p.excerpt,
      image: p.image,
      date: p.date,
      href: `/blog/${p.slug}`,
      keyword: p.keyword,
    }));
    return [...news, ...blog];
  }, [NEWS_ARTICLES, RAW_BLOG_POSTS]);

  const CATEGORIES = useMemo(() => ["All", ...Array.from(new Set(ALL_POSTS.map((p) => p.category)))], [ALL_POSTS]);

  // Curated onboarding path. Any slug that no longer resolves is dropped rather
  // than rendered as a dead link.
  const starterPath = useMemo(
    () =>
      BLOG_STARTER_PATH.map((step) => ({
        reason: step.reason,
        post: RAW_BLOG_POSTS.find((p) => p.slug === step.slug),
      })).filter((s): s is { reason: string; post: (typeof RAW_BLOG_POSTS)[number] } => Boolean(s.post)),
    [RAW_BLOG_POSTS],
  );

  const continueReading = useMemo(
    () =>
      Object.entries(profile.reading)
        .filter(([, mark]) => mark.percent > 5 && mark.percent < 95)
        .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
        .slice(0, 3)
        .map(([slug, mark]) => ({ slug, ...mark })),
    [profile.reading],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_POSTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.keyword.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, ALL_POSTS]);

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
            {ALL_POSTS.length} articles on Ijebu-Igbo's history, kingship, culture, travel and diaspora community news.
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
            {/* One swipeable row on phones. Wrapping these 12 categories cost
                five rows of vertical space and put the last chip of each row
                under the floating contact button. */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 sm:flex-wrap sm:mx-0 sm:px-0 sm:overflow-visible">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 flex items-center px-4 min-h-[44px] rounded-full text-xs font-semibold whitespace-nowrap transition-colors touch-manipulation ${
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

      {/* Continue reading — only for visitors with something in progress */}
      {continueReading.length > 0 && (
        <section className="pt-8 md:pt-12">
          <div className="container-main">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="font-display font-bold text-foreground text-lg flex items-center gap-2">
                  <BookOpen size={18} className="text-accent" /> Continue reading
                </h2>
                <Link to="/my-iid" className="text-xs font-bold text-primary hover:underline shrink-0">
                  Your IID →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {continueReading.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/${item.slug}`}
                    className="p-4 rounded-xl border border-border hover:border-accent/50 transition-colors group"
                  >
                    <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2.5 mt-2.5">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${item.percent}%` }} />
                      </div>
                      <span className="text-[11px] font-bold text-muted-foreground shrink-0">{item.percent}%</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Start Here — a curated path through 100 posts */}
      {starterPath.length > 0 && category === "All" && !query && (
        <section className="pt-8 md:pt-12">
          <div className="container-main">
            <div className="rounded-2xl border border-accent/30 bg-accent/8 p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="label-accent !mb-1 flex items-center gap-2">
                    <Sparkles size={13} /> Start here
                  </p>
                  <h2 className="font-display font-black text-foreground text-xl sm:text-2xl leading-tight">
                    New to Ijebu-Igbo? Read these {starterPath.length}, in this order.
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1.5 max-w-xl leading-relaxed">
                    A guided path from "where is this place" to "how do I take part" — each article
                    setting up the next.
                  </p>
                </div>
              </div>

              <ol className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {starterPath.map((step, i) => (
                  <li key={step.post.slug}>
                    <Link
                      to={`/blog/${step.post.slug}`}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors group h-full"
                    >
                      <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-display font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                          {step.post.title}
                        </p>
                        <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{step.reason}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-main">
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} of {ALL_POSTS.length} articles
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No articles match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, index) => (
                <motion.article
                  key={post.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-400 border border-border"
                >
                  <Link to={post.href} className="block">
                    <div className="relative h-44 overflow-hidden">
                      <Img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
