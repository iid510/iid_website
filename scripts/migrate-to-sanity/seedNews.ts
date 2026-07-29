import { client } from "./client";
import { imageRef } from "./uploadImages";
import { NEWS_ARTICLES } from "../../src/data/news";

export async function seedNews(assetMap: Record<string, string>) {
  let count = 0;
  for (const article of NEWS_ARTICLES) {
    const _id = `newsArticle-${article.id}`;
    await client.createOrReplace({
      _id,
      _type: "newsArticle",
      id: { _type: "slug", current: article.id },
      title: article.title,
      excerpt: article.excerpt,
      featuredImage: imageRef(assetMap, article.featuredImage),
      date: article.date,
      category: article.category,
      content: article.content,
      gallery: article.gallery?.map((g) => {
        const asset = imageRef(assetMap, g.src);
        return asset ? { asset, alt: g.alt } : undefined;
      }).filter(Boolean),
    });
    count++;
  }
  console.log(`Seeded ${count} newsArticle documents.`);
}
