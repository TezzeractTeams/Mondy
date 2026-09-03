import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArticleEndCta } from "@/components/blog/ArticleEndCta";
import { ArticleFAQ } from "@/components/blog/ArticleFAQ";
import LinkedInPostMockupGenerator from "@/components/tools/LinkedInPostMockupGenerator";
import { mondyType } from "@/styles/mondy";
import { cn } from "@/lib/utils";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";

const title = "LinkedIn Post Mockup Generator";
const description =
  "Create a realistic LinkedIn post preview for portfolios, decks, and content planning. Switch light or dark, mobile or desktop, and download a PNG.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    url: "/tools/linkedin-post-mockup-generator",
    title: `${title} | Mondy`,
    description,
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
    title: `${title} | Mondy`,
    description,
    images: {
      url: SOCIAL_PREVIEW_PATH,
      alt: "Mondy preview image",
    },
  },
};

const faqItems = [
  {
    question: "What is a LinkedIn post mockup?",
    answer:
      "A LinkedIn post mockup is a feed-style preview of how a post will look — name, headline, photo, body, and engagement — so you can review layout before you publish or drop a PNG into a deck.",
  },
  {
    question: "Can I use the mockups in a portfolio or pitch deck?",
    answer:
      "Yes. Download the card as a 2× PNG and use it in case studies, client presentations, or content calendars. Set likes, comments, and reposts to a realistic projection, or zero them out for a cleaner card.",
  },
  {
    question: "Is this LinkedIn post mockup generator free?",
    answer:
      "Yes. No signup, no email, no limits. Make as many mockups as you need. When you are ready to go beyond previews, Mondy turns a ten-minute voice note into a week of posts.",
  },
  {
    question: "Does the mockup show LinkedIn's see more cutoff?",
    answer:
      "No. The generator shows your full post so you can check wording and line breaks. LinkedIn's see more point changes by device and character width. Write the first two or three lines as a standalone hook — that is roughly what people see before expanding.",
  },
  {
    question: "Why upload a photo instead of pasting a URL?",
    answer:
      "A photo URL is fine in the live preview. PNG export runs in the browser, and many remote images (including LinkedIn CDN photos) block that capture. Uploading the file keeps the picture in the download.",
  },
  {
    question: "What's the difference between mobile and desktop?",
    answer:
      "Desktop mirrors the wider LinkedIn feed column. Mobile mirrors the narrower app column. Text wraps differently at each width, so switch between them before you export.",
  },
];

export default function LinkedInPostMockupGeneratorPage() {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center bg-mondy-surface px-4 pb-24 pt-28 sm:px-6 md:px-8 md:pt-32">
        <div className="flex w-full max-w-6xl flex-col gap-16">
          <header className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <div className="inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mondy-ink">
              Free tool
            </div>
            <h1 className={cn(mondyType.sectionHero, "text-balance")}>
              LinkedIn <span className="text-mondy-accent">Post Mockup</span> Generator
            </h1>
            <p className={cn(mondyType.sectionLead, "max-w-2xl")}>
              Create realistic LinkedIn post previews for your portfolio, presentations, or social
              planning. Download as PNG in one click.
            </p>
          </header>

          <LinkedInPostMockupGenerator />

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 text-mondy-ink">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.05em] md:text-3xl">
                Why mock the post first
              </h2>
              <p className="text-lg font-medium leading-relaxed text-mondy-ink/70">
                A plain text draft hides line breaks, headline length, and how dense the card feels
                in the feed. A mockup lets you catch that before it goes live — and gives clients or
                teammates something they can actually react to.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.05em] md:text-3xl">
                How to make a LinkedIn post mockup
              </h2>
              <ol className="flex list-decimal flex-col gap-3 pl-5 text-lg font-medium leading-relaxed text-mondy-ink/70">
                <li>Add a name, headline, and optional photo (URL or upload).</li>
                <li>Paste the post. Switch light/dark and mobile/desktop to check wrapping.</li>
                <li>Set likes, comments, and reposts — or leave them at zero.</li>
                <li>Download the PNG and drop it into a slide, portfolio, or approval thread.</li>
              </ol>
            </section>

            <p className="text-lg font-medium leading-relaxed text-mondy-ink/70">
              Need Unicode bold or italics in the post body? Use the{" "}
              <Link
                href="/tools/linkedin-bold-text-generator"
                className="font-semibold text-mondy-accent-deep underline decoration-mondy-accent/30 underline-offset-4 hover:decoration-mondy-accent"
              >
                LinkedIn Bold Text Generator
              </Link>
              , then paste the styled text here.
            </p>

            <ArticleFAQ title="Frequently asked questions" items={faqItems} />

            <ArticleEndCta />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
