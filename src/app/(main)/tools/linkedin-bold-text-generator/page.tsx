import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArticleEndCta } from "@/components/blog/ArticleEndCta";
import { ArticleFAQ } from "@/components/blog/ArticleFAQ";
import LinkedInBoldGenerator from "@/components/tools/LinkedInBoldGenerator";
import { mondyType } from "@/styles/mondy";
import { cn } from "@/lib/utils";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";

const title = "LinkedIn Bold Text Generator";
const description =
  "Bold, italic, and 13 Unicode styles for LinkedIn posts. Type once, copy the style you want, and paste it straight into LinkedIn.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    url: "/tools/linkedin-bold-text-generator",
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
    question: "How do I bold text on LinkedIn?",
    answer:
      "LinkedIn has no built-in bold button. Type or paste your post into this generator, select the words you want to emphasize, and apply a Unicode style. Copy the result and paste it into a LinkedIn post, comment, headline, or About section. The styling carries over because it is real Unicode, not formatting LinkedIn would strip.",
  },
  {
    question: "Is this LinkedIn bold text generator free?",
    answer:
      "Yes. No signup, no email, no limits. Style as much text as you want. When you are ready to go beyond formatting, Mondy turns a ten-minute voice note into a week of posts.",
  },
  {
    question: "Is bold Unicode text safe and accessible?",
    answer:
      "It will not get your account flagged, but use it sparingly. Screen readers often read Unicode bold letter by letter or skip it. Keep your hook and core message in normal text, and reserve styled characters for a few key words. Never set an entire post in bold.",
  },
  {
    question: "Where does the styled text work?",
    answer:
      "Anywhere you can type on LinkedIn: feed posts, comments, your headline, About, articles, and messages. Because the output is plain Unicode, it also pastes into X, Instagram, Facebook, WhatsApp, and most other platforms.",
  },
  {
    question: "Why doesn't bold from ChatGPT or Word stick on LinkedIn?",
    answer:
      "Word and ChatGPT use rich text or markdown. LinkedIn's composer only accepts plain text, so that formatting disappears on paste. This generator converts letters into dedicated Unicode characters that survive the copy and paste.",
  },
  {
    question: "Can I preview the post on mobile and desktop?",
    answer:
      "Yes. Switch between the mobile and desktop frames to see how line breaks and styled words will read in a feed-style card before you publish.",
  },
];

export default function LinkedInBoldTextGeneratorPage() {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center bg-mondy-surface px-4 pb-24 pt-28 sm:px-6 md:px-8 md:pt-32">
        <div className="flex w-full max-w-6xl flex-col gap-16">
          <header className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <div className="inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mondy-ink">
              Free tool
            </div>
            <h1 className={cn(mondyType.sectionHero, "text-balance")}>
              LinkedIn <span className="text-mondy-accent">Bold Text</span> Generator
            </h1>
            <p className={cn(mondyType.sectionLead, "max-w-2xl")}>
              Bold, italic, and 13 more Unicode styles for your LinkedIn posts. Type once, copy the
              style you want, paste it straight into LinkedIn.
            </p>
          </header>

          <LinkedInBoldGenerator />

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 text-mondy-ink">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.05em] md:text-3xl">
                Why Unicode bold exists
              </h2>
              <p className="text-lg font-medium leading-relaxed text-mondy-ink/70">
                LinkedIn&apos;s composer only accepts plain text. Bold from Word, Google Docs, or
                ChatGPT gets stripped the moment you paste. A LinkedIn bold text generator converts
                letters into dedicated Unicode characters that{" "}
                <em>look</em> bold to every reader, but are still just characters — which is why they
                survive the copy and paste into the feed.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.05em] md:text-3xl">
                How to bold text on LinkedIn
              </h2>
              <ol className="flex list-decimal flex-col gap-3 pl-5 text-lg font-medium leading-relaxed text-mondy-ink/70">
                <li>Type or paste your post into the editor. The live preview updates as you go.</li>
                <li>
                  Highlight only the phrase you want to emphasize, then pick a style. Click the same
                  style again to remove it.
                </li>
                <li>Copy the finished post, or copy a single style from the cards below the editor.</li>
                <li>Paste into LinkedIn and publish. The Unicode characters carry over intact.</li>
              </ol>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.05em] md:text-3xl">
                Why a little bold goes a long way
              </h2>
              <p className="text-lg font-medium leading-relaxed text-mondy-ink/70">
                The first one or two lines are all readers see before &quot;see more.&quot; A single
                bold phrase in that opening can stop the scroll. Use it to strengthen a hook, mark a
                section title in a longer post, or highlight the one sentence you want people to
                remember.
              </p>
              <p className="text-lg font-medium leading-relaxed text-mondy-ink/70">
                The caveat: do not over-format. Unicode styled characters are read poorly by screen
                readers, so keep the core message in normal text and reserve bold for a few key
                words.
              </p>
            </section>

            <ArticleFAQ title="Frequently asked questions" items={faqItems} />

            <p className="text-lg font-medium leading-relaxed text-mondy-ink/70">
              Want a PNG of the feed card for a deck or portfolio? Use the{" "}
              <Link
                href="/tools/linkedin-post-mockup-generator"
                className="font-semibold text-mondy-accent-deep underline decoration-mondy-accent/30 underline-offset-4 hover:decoration-mondy-accent"
              >
                LinkedIn Post Mockup Generator
              </Link>
              .
            </p>

            <ArticleEndCta />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
