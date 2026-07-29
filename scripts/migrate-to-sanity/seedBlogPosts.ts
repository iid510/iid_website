import { client } from "./client";
import { imageRef } from "./uploadImages";
import { BLOG_POSTS } from "../../src/data/blogPosts";

export async function seedBlogPosts(assetMap: Record<string, string>) {
  let count = 0;
  const total = BLOG_POSTS.length;
  for (let i = 0; i < total; i++) {
    const post = BLOG_POSTS[i];
    const order = i + 1;
    const _id = `blogPost-${post.slug}`;
    const publishedAt = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString();
    await client.createOrReplace({
      _id,
      _type: "blogPost",
      slug: { _type: "slug", current: post.slug },
      title: post.title,
      keyword: post.keyword,
      category: post.category,
      excerpt: post.excerpt,
      image: imageRef(assetMap, post.image),
      dateLabel: post.date,
      publishedAt,
      content: post.content,
      order,
    });
    count++;
    if (count % 25 === 0) console.log(`  seeded ${count}/${total} blog posts...`);
  }
  console.log(`Seeded ${count} blogPost documents.`);
}
