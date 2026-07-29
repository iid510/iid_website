import { useQuery } from "@tanstack/react-query";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { BLOG_POSTS_QUERY } from "@/lib/sanityQueries";
import { BLOG_POSTS, type BlogPost } from "@/data/blogPosts";

export function useSanityBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!isSanityConfigured) return BLOG_POSTS;
      try {
        const results = await sanityClient.fetch<BlogPost[]>(BLOG_POSTS_QUERY);
        return results?.length ? results : BLOG_POSTS;
      } catch {
        return BLOG_POSTS;
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: BLOG_POSTS,
  });
}
