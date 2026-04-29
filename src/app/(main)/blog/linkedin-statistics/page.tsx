import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArticleAuthor } from "@/components/blog/ArticleAuthor";
import { ArticleBreadcrumb } from "@/components/blog/ArticleBreadcrumb";
import { ArticleDownloadMondy } from "@/components/blog/ArticleDownloadMondy";
import { ArticleFAQ } from "@/components/blog/ArticleFAQ";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleHeroImage } from "@/components/blog/ArticleHeroImage";
import { ArticleRelated, type RelatedPost } from "@/components/blog/ArticleRelated";
import { ArticleShell } from "@/components/blog/ArticleShell";
import { ArticleTOC, ArticleTOCInline, ArticleTOCScrollProvider } from "@/components/blog/ArticleTOC";
import { ArticleTwoColumn } from "@/components/blog/ArticleTwoColumn";
import { LinkedInStatisticsArticleBody } from "@/components/blog/linkedinStatisticsArticle";
import { getSiteOrigin } from "@/lib/siteUrl";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";

const PATH = "/blog/linkedin-statistics";

const description =
  "Thirty LinkedIn statistics on demographics, usage, ads, engagement, video, hiring, and company facts—editorial reference for your 2026 B2B strategy.";

export const metadata: Metadata = {
  title: "30 LinkedIn statistics for marketers in 2026",
  description,
  openGraph: {
    url: PATH,
    title: "30 LinkedIn statistics for marketers in 2026 | Mondy",
    description,
    type: "article",
    images: [
      {
        url: SOCIAL_PREVIEW_PATH,
        width: SOCIAL_PREVIEW_WIDTH,
        height: SOCIAL_PREVIEW_HEIGHT,
        alt: "Mondy preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "30 LinkedIn statistics for marketers in 2026 | Mondy",
    description,
    images: {
      url: SOCIAL_PREVIEW_PATH,
      alt: "Mondy preview image",
    },
  },
};

const TOC_ITEMS = [
  { id: "top-linkedin-statistics", label: "Top LinkedIn statistics you should know" },
  { id: "linkedin-demographics", label: "LinkedIn demographics" },
  { id: "linkedin-usage-statistics", label: "LinkedIn usage statistics" },
  { id: "linkedin-advertising-marketing", label: "LinkedIn advertising and marketing statistics" },
  { id: "linkedin-engagement-statistics", label: "LinkedIn engagement statistics" },
  { id: "linkedin-video-statistics", label: "LinkedIn video statistics" },
  { id: "linkedin-recruiting-job", label: "LinkedIn recruiting and job statistics" },
  { id: "linkedin-company-statistics", label: "LinkedIn company statistics" },
  { id: "linkedin-stats-guide-strategy", label: "Letting LinkedIn stats guide your 2026 strategy" },
  { id: "linkedin-statistics-faqs", label: "LinkedIn statistics FAQs" },
] as const;

const FAQ_ITEMS = [
  { question: "How many users does LinkedIn have?", answer: "LinkedIn has 1.3 billion members." },
  { question: "How many people use LinkedIn?", answer: "There are 1.3 billion registered members using LinkedIn." },
  {
    question: "What types of content perform best on LinkedIn?",
    answer: "Text-based posts, user-generated content, and short-form video are the top-performing content types on LinkedIn.",
  },
  {
    question: "How effective is LinkedIn for B2B lead generation?",
    answer: "40% of B2B marketers say LinkedIn is the most effective platform for B2B lead generation.",
  },
  {
    question: "How much does LinkedIn advertising cost and is it worth it?",
    answer:
      "LinkedIn ads often cost around $2 to $3 per click or $0.26 to $0.50 per send—typically higher than some consumer platforms. Many teams still find the cost worthwhile because you reach B2B audiences and higher-value purchase cycles.",
  },
  {
    question: "How does LinkedIn compare to other social platforms for marketing?",
    answer:
      "LinkedIn is one of the most effective social media platforms for marketing to a B2B audience. Companies often pair it with lead nurturing because B2B marketing involves longer buying cycles.",
  },
];

const RELATED: RelatedPost[] = [
  {
    href: "/",
    title: "Mondy — turn your voice into a week of social content",
    meta: "Product overview · Reading time 5 min",
    tags: ["Mondy", "Product"],
  },
  {
    href: "/privacy",
    title: "Privacy Policy",
    meta: "Legal · Last updated April 2, 2026",
    tags: ["Legal"],
  },
  {
    href: "/infopage",
    title: "Join the Mondy waitlist",
    meta: "Early access · Quick signup",
    tags: ["Waitlist"],
  },
];

export default function LinkedInStatisticsBlogPage() {
  const absoluteShareUrl = `${getSiteOrigin()}${PATH}`;

  return (
    <>
      <ArticleShell>
        <div className="flex w-full max-w-7xl flex-col gap-8">
          <ArticleBreadcrumb
            items={[
              { label: "Mondy", href: "/" },
              { label: "Blog", href: PATH },
              { label: "Social media marketing" },
            ]}
          />
          <ArticleHeader
            title="30 LinkedIn statistics that marketers should know in 2026"
            author="Mondy Editorial"
            publishedOn="March 31, 2026"
            readingTimeMinutes={9}
            absoluteShareUrl={absoluteShareUrl}
            shareMailSubject="30 LinkedIn statistics for marketers in 2026"
            hero={
              <ArticleHeroImage
                src={SOCIAL_PREVIEW_PATH}
                alt="B2B creators planning content with voice and social workflows"
                caption="Voice-first workflows help teams ship consistent LinkedIn presence without the blank-page grind."
              />
            }
          />
          <ArticleTOCScrollProvider items={[...TOC_ITEMS]}>
            <ArticleTwoColumn
              sidebar={<ArticleTOC className="hidden lg:block" />}
              rightAside={<ArticleDownloadMondy />}
            >
              <div id="article-main" className="flex flex-col gap-8">
                <ArticleTOCInline />
              <LinkedInStatisticsArticleBody />
              <ArticleFAQ id="linkedin-statistics-faqs" title="LinkedIn statistics FAQs" items={FAQ_ITEMS} />
              <div className="flex max-w-prose flex-wrap gap-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-80">Categories</span>
                {["LinkedIn", "Social media marketing", "Social media trends"].map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-black/[0.08] bg-white/80 px-3 py-1 text-xs font-medium text-mondy-ink"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <ArticleAuthor
                name="Mondy Editorial"
                bio={
                  <>
                    We write practical guides on social content, voice-first workflows, and B2B distribution. This article
                    aggregates public statistics and analyst reporting for educational purposes; always verify numbers
                    against primary sources for business decisions.
                  </>
                }
              />
              <ArticleRelated posts={RELATED} />
              <p className="max-w-prose text-sm text-neutral-80">
                Statistics and third-party links are compiled for informational purposes. Mondy is not affiliated with
                LinkedIn or the sources cited; see each publisher for the latest figures.
              </p>
              <p className="text-sm text-neutral-80">
                <Link href="/" className="font-medium text-mondy-accent-deep underline underline-offset-2 hover:text-mondy-accent">
                  Back to home
                </Link>
              </p>
            </div>
          </ArticleTwoColumn>
          </ArticleTOCScrollProvider>
        </div>
      </ArticleShell>
      <Footer />
    </>
  );
}
