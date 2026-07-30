import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2, Tag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import { useSanityBlogPosts } from "@/hooks/useSanityBlogPosts";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: BLOG_POSTS = [] } = useSanityBlogPosts();
  const post = slug ? BLOG_POSTS.find((p) => p.slug === slug) ?? null : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-main py-20 text-center pt-32">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-accent hover:underline">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${post.title} | Ijebu Igbo Descendants in Diaspora`}
        description={post.excerpt}
        image={post.image}
        type="article"
        canonicalPath={`/blog/${post.slug}`}
      />
      <Navbar />

      <article className="pt-20 lg:pt-24">
        <div className="container-main py-4 sm:py-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Blog</span>
          </Link>
        </div>

        <div className="relative h-[280px] sm:h-[380px] lg:h-[460px] mb-8 sm:mb-12">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container-main max-w-4xl pb-12 sm:pb-16 lg:pb-20">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-accent text-white text-xs sm:text-sm font-semibold rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
              <Calendar className="w-4 h-4" />
              <time>{post.date}</time>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href });
                }
              }}
              className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm sm:text-base"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6"
          >
            {post.title}
          </motion.h1>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8 sm:mb-10">
            <Tag className="w-3.5 h-3.5" />
            <span>Keyword focus: {post.keyword}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
          >
            {post.content.map((para, index) => (
              <p key={index} className="text-foreground/80 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
                {para}
              </p>
            ))}
          </motion.div>

          {related.length > 0 && (
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">More on {post.category}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="block rounded-xl border border-border overflow-hidden bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="h-28 overflow-hidden">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{r.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
}
