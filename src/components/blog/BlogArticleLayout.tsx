import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleAuthor } from "./ArticleAuthor";
import { ArticleBreadcrumb, type BreadcrumbItem } from "./ArticleBreadcrumb";
import { ArticleFAQ } from "./ArticleFAQ";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleHeroImage } from "./ArticleHeroImage";
import { ArticleRelated, type RelatedPost } from "./ArticleRelated";
import { ArticleShareRow } from "./ArticleShareRow";
import { ArticleShell } from "./ArticleShell";
import { ArticleTOC, ArticleTOCInline, ArticleTOCScrollProvider } from "./ArticleTOC";
import { ArticleTwoColumn } from "./ArticleTwoColumn";
import { ArticleWaitlistAside } from "./ArticleWaitlistAside";
import { ArticleMarkdown } from "./ArticleMarkdown";
import type { BlogArticlePageData } from "@/lib/strapi/types";
import { getSiteOrigin } from "@/lib/siteUrl";

type BlogArticleLayoutProps = {
  path: string;
  data: BlogArticlePageData;
  /** Main article column: body + end CTA, inside `#article-main`. FAQ / author / related follow in layout. */
  articleColumnChildren: ReactNode;
};

const DEFAULT_BREADCRUMB: BreadcrumbItem[] = [
  { label: "Mondy", href: "/" },
  { label: "Blog", href: "/blog" },
];

export function BlogArticleLayout({ path, data, articleColumnChildren }: BlogArticleLayoutProps) {
  const absoluteShareUrl = `${getSiteOrigin()}${path}`;
  const shareBelowToc = <ArticleShareRow absoluteShareUrl={absoluteShareUrl} mailSubject={data.title} />;
  const breadcrumbs: BreadcrumbItem[] =
    data.breadcrumbItems.length > 0
      ? data.breadcrumbItems.map((b) => ({ label: b.label, href: b.href ?? undefined }))
      : DEFAULT_BREADCRUMB;

  const authorAvatar = data.author.avatarUrl ?? undefined;
  const authorAvatarAlt = data.author.avatarAlt ?? data.author.name;

  const related: RelatedPost[] =
    data.relatedPosts.length > 0
      ? data.relatedPosts
      : [
          {
            href: "/",
            title: "Mondy — turn your voice into a week of social content",
            meta: "Product overview · Reading time 5 min",
            tags: ["Mondy", "Product"],
          },
        ];

  return (
    <ArticleShell>
      <div className="flex w-full max-w-7xl flex-col gap-8">
        <ArticleBreadcrumb items={breadcrumbs} />
        <ArticleHeader
          title={data.title}
          author={data.author.name}
          authorAvatarSrc={authorAvatar}
          authorAvatarAlt={authorAvatarAlt}
          publishedOn={data.publishedOnLabel}
          readingTimeMinutes={data.readingTimeMinutes}
          hero={
            <ArticleHeroImage src={data.heroImageUrl} alt={data.heroImageAlt} caption={data.heroCaption ?? undefined} />
          }
        />
        <ArticleTOCScrollProvider tocFromSelector="#article-main">
          <ArticleTwoColumn
            sidebar={<ArticleTOC className="hidden lg:block" afterToc={shareBelowToc} />}
            rightAside={<ArticleWaitlistAside />}
          >
            <div id="article-main" className="flex flex-col gap-8">
              <ArticleTOCInline afterToc={shareBelowToc} />
              {articleColumnChildren}
              {data.faqItems.length > 0 ? (
                <ArticleFAQ id={data.faqSectionId} title={data.faqTitle} items={data.faqItems} />
              ) : null}
              {data.categories.length > 0 ? (
                <div className="flex max-w-prose flex-wrap gap-2 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-80">Categories</span>
                  {data.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-black/[0.08] bg-white/80 px-3 py-1 text-xs font-medium text-mondy-ink"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              ) : null}
              <ArticleAuthor
                name={data.author.name}
                avatarSrc={authorAvatar}
                avatarAlt={authorAvatarAlt}
                bio={<ArticleMarkdown markdown={data.author.bioMarkdown} />}
              />
              <ArticleRelated posts={related} />
              {data.disclaimerMarkdown ? (
                <div className="max-w-prose text-sm text-neutral-80 [&_a]:text-mondy-accent-deep [&_a]:underline [&_a]:underline-offset-2">
                  <ArticleMarkdown markdown={data.disclaimerMarkdown} />
                </div>
              ) : null}
              <p className="text-sm text-neutral-80">
                <Link
                  href="/"
                  className="font-medium text-mondy-accent-deep underline underline-offset-2 hover:text-mondy-accent"
                >
                  Back to home
                </Link>
              </p>
            </div>
          </ArticleTwoColumn>
        </ArticleTOCScrollProvider>
      </div>
    </ArticleShell>
  );
}
