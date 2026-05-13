import type { RelatedPost } from "@/components/blog/ArticleRelated";

/** Normalized subsection under an h2. */
export type StrapiArticleSubsection = {
  /** When empty, only `bodyMarkdown` renders under the h2 (no h3). */
  h3Title?: string | null;
  /** Markdown (links, lists, emphasis). */
  bodyMarkdown: string;
};

/** One major section (TOC entry = h2). */
export type StrapiArticleSection = {
  h2Title: string;
  /** Stable fragment id; generated from title when omitted in Strapi. */
  h2Id: string;
  /** Optional markdown between the h2 and the first h3 (e.g. intro list). */
  h2IntroMarkdown?: string | null;
  subsections: StrapiArticleSubsection[];
};

export type StrapiFaqItem = { question: string; answer: string };

export type StrapiBreadcrumbItem = { label: string; href?: string | null };

export type StrapiArticleAuthor = {
  name: string;
  bioMarkdown: string;
  avatarUrl: string | null;
  avatarAlt: string | null;
};

/** Fully normalized article for the blog article page. */
export type BlogArticlePageData = {
  slug: string;
  title: string;
  /** SEO / subheader (Strapi: `description` or `excerpt`). */
  description: string;
  readingTimeMinutes: number;
  publishedAtIso: string;
  /** e.g. "March 31, 2026" */
  publishedOnLabel: string;
  /** Lead paragraphs before the first h2 (markdown). */
  introMarkdown?: string | null;
  heroImageUrl: string;
  heroImageAlt: string;
  heroCaption: string | null;
  author: StrapiArticleAuthor;
  categories: string[];
  sections: StrapiArticleSection[];
  faqTitle: string;
  faqSectionId: string;
  faqItems: StrapiFaqItem[];
  breadcrumbItems: StrapiBreadcrumbItem[];
  relatedPosts: RelatedPost[];
  /** Optional disclaimer under related posts (markdown). */
  disclaimerMarkdown?: string | null;
};
