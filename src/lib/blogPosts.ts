/**
 * Blog index cards — populated from Strapi via `getBlogArticleSummaries`.
 * `href` is null when the post has no public page yet (unused for Strapi-backed lists).
 */
export type BlogPostSummary = {
  slug: string;
  title: string;
  /** ISO date for sorting */
  dateIso: string;
  /** Human-readable date on cards */
  dateLabel: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  href: string | null;
};
