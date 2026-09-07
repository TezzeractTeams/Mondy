import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArticleEndCta } from "@/components/blog/ArticleEndCta";
import { ArticleFAQ } from "@/components/blog/ArticleFAQ";
import LinkedInHeadlineGenerator from "@/components/tools/LinkedInHeadlineGenerator";
import { mondyType } from "@/styles/mondy";
import { cn } from "@/lib/utils";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";

const title = "LinkedIn Headline Generator";
const description =
  "Answer three questions about your work. Get a LinkedIn headline ready to paste, and see the part of it that survives outside your profile.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    url: "/tools/linkedin-headline-generator",
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
    question: "What is a LinkedIn headline?",
    answer:
      "It is the line under your name on your profile, and the one that follows you into search results, comments, and invitations. LinkedIn allows 220 characters. You edit it from your profile, with the pencil icon next to your name.",
  },
  {
    question: "How long should a LinkedIn headline be?",
    answer:
      "Up to 220 characters, but length is the wrong question. Outside your own profile, LinkedIn shows about the first line — roughly 70 characters — and drops the rest. Write the part that has to be read first, and treat the tail as a bonus for people who open your profile.",
  },
  {
    question: "Does it write in my language?",
    answer:
      "Yes. The generator keeps the language you type in, so French answers stay French. Nothing is picked from a menu, and nothing is translated after the fact.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. The generator is free and asks for nothing. A Mondy waitlist spot is for the step after: turning a ten-minute voice note into a week of posts that put this headline in front of people.",
  },
  {
    question: "Why does my headline get cut?",
    answer:
      "Your profile shows the whole line. Search, comments, and invitations stop after the first line. Lead with the outcome or niche, then put titles and extras after the cut.",
  },
  {
    question: "Is this LinkedIn headline generator free?",
    answer:
      "Yes. No signup, no email, no limits. Write as many headlines as you want. When you are ready to go beyond one line, Mondy turns a ten-minute voice note into a week of posts.",
  },
];

const profileRows = [
  {
    profile: "Founder",
    lead: "The problem you take off their desk",
    search: "Your category, and who it is for",
    skip: "Visionary, serial entrepreneur, passionate about",
  },
  {
    profile: "Freelance or consultant",
    lead: "Who you take on, and what changes",
    search: "The service, named the way clients say it",
    skip: "Available for new opportunities",
  },
  {
    profile: "Looking for a job",
    lead: "The role you want next, not the one you left",
    search: "The exact job title you are applying for",
    skip: "Open to work — the badge already says it",
  },
  {
    profile: "Employed expert",
    lead: "The niche you actually know",
    search: "Your field, plus the tools you work in",
    skip: "Internal job codes and company slogans",
  },
];

export default function LinkedInHeadlineGeneratorPage() {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center bg-mondy-surface px-4 pb-24 pt-28 sm:px-6 md:px-8 md:pt-32">
        <div className="flex w-full max-w-6xl flex-col gap-16">
          <header className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <div className="inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mondy-ink">
              Free tool
            </div>
            <h1 className={cn(mondyType.sectionHero, "text-balance")}>
              What should your{" "}
              <span className="text-mondy-accent">LinkedIn headline</span> say?
            </h1>
            <p className={cn(mondyType.sectionLead, "max-w-2xl")}>
              Answer three questions about your work. You get a headline ready to paste, and you
              see the part of it that survives outside your profile.
            </p>
          </header>

          <LinkedInHeadlineGenerator />

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 text-mondy-ink">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.05em] md:text-3xl">
                What a LinkedIn headline has to do in one line
              </h2>
              <p className="text-lg font-medium leading-relaxed text-mondy-ink/70">
                A LinkedIn headline is the line under your name. LinkedIn allows 220 characters,
                but search results, comments, and invitations only show the first line — roughly 70
                characters. What you put first is what survives the cut.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white/70">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-black/[0.06] text-[11px] font-bold uppercase tracking-wider text-mondy-ink/45">
                      <th className="px-4 py-3 font-bold">Profile</th>
                      <th className="px-4 py-3 font-bold">Lead with</th>
                      <th className="px-4 py-3 font-bold">Words people search you by</th>
                      <th className="px-4 py-3 font-bold">What to leave out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileRows.map((row) => (
                      <tr key={row.profile} className="border-b border-black/[0.05] last:border-b-0">
                        <td className="px-4 py-3 font-semibold text-mondy-ink">{row.profile}</td>
                        <td className="px-4 py-3 font-medium text-mondy-ink/70">{row.lead}</td>
                        <td className="px-4 py-3 font-medium text-mondy-ink/70">{row.search}</td>
                        <td className="px-4 py-3 font-medium text-mondy-ink/70">{row.skip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-[-0.05em] md:text-3xl">
                How the generator writes the line
              </h2>
              <ol className="flex list-decimal flex-col gap-3 pl-5 text-lg font-medium leading-relaxed text-mondy-ink/70">
                <li>
                  Three questions, not a blank field. You say what you do, who you help, and what
                  you want out of LinkedIn. Those answers become one line, written to be read at a
                  glance.
                </li>
                <li>
                  It answers in the language you type in. Write the answers in Dutch and the
                  headline comes back in Dutch.
                </li>
                <li>
                  You see where it gets cut. Your profile shows the whole line. Search, comments,
                  and invitations stop after the first one. The preview draws that mark on all
                  three at once.
                </li>
              </ol>
            </section>

            <p className="text-lg font-medium leading-relaxed text-mondy-ink/70">
              A headline answers the people who already found you. Posts put your name in front of
              the ones who have not. Need Unicode bold in the line? Use the{" "}
              <Link
                href="/tools/linkedin-bold-text-generator"
                className="font-semibold text-mondy-accent-deep underline decoration-mondy-accent/30 underline-offset-4 hover:decoration-mondy-accent"
              >
                LinkedIn Bold Text Generator
              </Link>
              .
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
