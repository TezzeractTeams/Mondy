import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { ArticleShell } from "@/components/blog/ArticleShell";
import { getBlogArticleSummaries } from "@/lib/strapi/articles";

const description =
  "Insights on voice-first content, B2B social strategy, and building consistent presence—articles from Mondy.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  openGraph: {
    title: "Blog | Mondy",
    description,
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Mondy",
    description,
  },
};

export default async function BlogPage() {
  const posts = await getBlogArticleSummaries();
  return (
    <>
      <ArticleShell>
        <BlogIndex posts={posts} />
      </ArticleShell>
      <Footer />
    </>
  );
}
