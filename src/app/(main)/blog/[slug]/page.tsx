import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { ArticleEndCta } from "@/components/blog/ArticleEndCta";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { StrapiArticleBody } from "@/components/blog/StrapiArticleBody";
import { getBlogArticleBySlug } from "@/lib/strapi/articles";
import type { BlogArticlePageData } from "@/lib/strapi/types";
import { getSiteOrigin } from "@/lib/siteUrl";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> };

function ogImageUrl(data: BlogArticlePageData): string {
  const u = data.heroImageUrl;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return `${getSiteOrigin()}${u.startsWith("/") ? u : `/${u}`}`;
}

function buildMetadata(path: string, data: BlogArticlePageData): Metadata {
  const description = data.description || "Article on Mondy.";
  const title = `${data.title} | Mondy`;
  const imageUrl = ogImageUrl(data);
  return {
    title: data.title,
    description,
    openGraph: {
      url: path,
      title,
      description,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: SOCIAL_PREVIEW_WIDTH,
          height: SOCIAL_PREVIEW_HEIGHT,
          alt: data.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: { url: imageUrl, alt: data.heroImageAlt },
    },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogArticleBySlug(slug);
  if (!data) {
    return { title: "Article | Mondy", robots: { index: false, follow: false } };
  }
  return buildMetadata(`/blog/${slug}`, data);
}

export default async function StrapiBlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogArticleBySlug(slug);
  if (!data) notFound();

  const path = `/blog/${slug}`;
  const articleColumnChildren = (
    <>
      <StrapiArticleBody introMarkdown={data.introMarkdown} sections={data.sections} />
      <ArticleEndCta />
    </>
  );

  return (
    <>
      <BlogArticleLayout path={path} data={data} articleColumnChildren={articleColumnChildren} />
      <Footer />
    </>
  );
}
