import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSanityNews } from "@/hooks/useSanityNews";
import { useSanityPage, findSection } from "@/hooks/useSanityPage";
import { HOME_PAGE } from "@/data/pageContent";

export default function News() {
  const { data: newsArticles = [] } = useSanityNews();
  const { data: page } = useSanityPage("home", HOME_PAGE);
  const header = findSection(page?.sections, "news-header");

  return (
    <section id="news" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="label-accent">{header?.eyebrow}</h2>
          <h3 className="heading-section">{header?.heading}</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {newsArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 touch-card"
            >
              <Link to={`/news/${article.id}`} className="block">
                {/* Featured Image */}
                <div className="relative h-[250px] sm:h-[300px] lg:h-[350px] overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-accent text-white text-xs sm:text-sm font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm mb-2 sm:mb-3">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <time>{article.date}</time>
                    </div>
                    
                    <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-white/90 text-sm sm:text-base line-clamp-2 mb-3 sm:mb-4">
                      {article.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm sm:text-base">
                      <span>Read Full Story</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All News Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            View All News &amp; Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
