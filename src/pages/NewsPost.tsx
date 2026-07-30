import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";
import { useSanityNews } from "@/hooks/useSanityNews";

export default function NewsPost() {
  const { id } = useParams();
  const { data: newsArticles = [] } = useSanityNews();
  const article = id ? newsArticles.find((a) => a.id === id) ?? null : null;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-main py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to Homepage
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${article.title} | Ijebu Igbo News — IID`}
        description={(article.excerpt ?? "").slice(0, 155) || "Latest news from the Ijebu Igbo Descendants in Diaspora (Omo Orimolusi) community."}
        image={article.featuredImage}
        type="article"
        canonicalPath={`/news/${article.id}`}
      />
      <Navbar />

      {/* Article Header */}
      <article className="pt-20 lg:pt-24">
        {/* Back Button */}
        <div className="container-main py-4 sm:py-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Featured Image */}
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] mb-8 sm:mb-12">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="container-main max-w-4xl pb-12 sm:pb-16 lg:pb-20">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-accent text-white text-xs sm:text-sm font-semibold rounded-full">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
              <Calendar className="w-4 h-4" />
              <time>{article.date}</time>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: article.title,
                    url: window.location.href,
                  });
                }
              }}
              className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm sm:text-base"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 sm:mb-8"
          >
            {article.title}
          </motion.h1>

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
          >
            {article.content.map((block, index) => (
              <p key={index} className="text-foreground/80 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
                {block.text}
              </p>
            ))}
          </motion.div>

          {/* Photo Gallery Section */}
          {article.gallery && article.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 sm:mt-16 lg:mt-20"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">
                Photo Gallery
              </h2>
              
              {/* Masonry Grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
                {article.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="break-inside-avoid relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={image.src}
                      alt={image.alt || `${article.title} photo ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back to News */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to News</span>
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
