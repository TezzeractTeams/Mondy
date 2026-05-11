/**
 * Blog listing data. `href` is null for entries that do not have a published page yet.
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

const LINKEDIN_POST: BlogPostSummary = {
  slug: "linkedin-statistics",
  title: "30 LinkedIn statistics that marketers should know in 2026 for modern teams",
  dateIso: "2026-03-31",
  dateLabel: "March 31, 2026",
  excerpt:
    "Demographics, usage, ads, engagement, video, hiring, and company facts—an editorial reference for your 2026 B2B strategy.",
  imageSrc: "/preview.jpeg",
  imageAlt: "B2B creators planning content with voice and social workflows",
  href: "/blog/linkedin-statistics",
};

/** Placeholder entries — swap for real posts as you publish. */
const PLACEHOLDER_POSTS: BlogPostSummary[] = [
  {
    slug: "ideas-to-impact",
    title: "From ideas to impact in a startup's journey",
    dateIso: "2026-02-14",
    dateLabel: "February 14, 2026",
    excerpt: "How early teams turn clarity of vision into repeatable outcomes—without losing momentum.",
    imageSrc: "/MondyWaitlistImage.png",
    imageAlt: "Team collaboration",
    href: null,
  },
  {
    slug: "renewable-energy-innovations",
    title: "Exploring future renewable energy innovations",
    dateIso: "2026-01-22",
    dateLabel: "January 22, 2026",
    excerpt: "Trends shaping clean tech and what operators watch when scaling infrastructure.",
    imageSrc: "/v3.png",
    imageAlt: "Innovation and technology",
    href: null,
  },
  {
    slug: "empowering-entrepreneurs",
    title: "Empowering entrepreneurs: success unveiled",
    dateIso: "2025-11-21",
    dateLabel: "November 21, 2025",
    excerpt: "Frameworks founders use to stay consistent while shipping across channels.",
    imageSrc: "/micprf.jpg",
    imageAlt: "Entrepreneur at work",
    href: null,
  },
  {
    slug: "voice-first-content",
    title: "Voice-first content workflows for modern marketing teams",
    dateIso: "2025-11-08",
    dateLabel: "November 8, 2025",
    excerpt: "Why capturing ideas in the moment beats waiting for a blank document.",
    imageSrc: "/handphonemock.png",
    imageAlt: "Mobile recording workflow",
    href: null,
  },
  {
    slug: "b2b-social-consistency",
    title: "Building B2B social presence without burning out",
    dateIso: "2025-10-30",
    dateLabel: "October 30, 2025",
    excerpt: "Pacing, batching, and the minimum viable cadence that still compounds.",
    imageSrc: "/Step-3.png",
    imageAlt: "Workflow steps",
    href: null,
  },
  {
    slug: "content-repurposing",
    title: "Repurposing one insight into a week of posts",
    dateIso: "2025-10-15",
    dateLabel: "October 15, 2025",
    excerpt: "A practical split from long-form to threads, carousels, and short video hooks.",
    imageSrc: "/Step-2.png",
    imageAlt: "Content repurposing",
    href: null,
  },
  {
    slug: "measurement-that-matters",
    title: "Measurement that matters for pipeline-aware social teams",
    dateIso: "2025-09-28",
    dateLabel: "September 28, 2025",
    excerpt: "Signals beyond vanity metrics when your audience is buyers, not browsers.",
    imageSrc: "/mobile.png",
    imageAlt: "Analytics and mobile",
    href: null,
  },
  {
    slug: "async-collaboration",
    title: "Async collaboration for distributed GTM teams",
    dateIso: "2025-09-12",
    dateLabel: "September 12, 2025",
    excerpt: "Review loops, approvals, and keeping brand voice aligned across time zones.",
    imageSrc: "/Handmock.webp",
    imageAlt: "Team collaboration",
    href: null,
  },
  {
    slug: "brand-voice-at-scale",
    title: "Brand voice at scale when everyone publishes",
    dateIso: "2025-08-20",
    dateLabel: "August 20, 2025",
    excerpt: "Guardrails and templates that scale without sounding robotic.",
    imageSrc: "/handmockphone.png",
    imageAlt: "Brand and publishing",
    href: null,
  },
];

/** Newest first */
export const ALL_BLOG_POSTS: BlogPostSummary[] = [LINKEDIN_POST, ...PLACEHOLDER_POSTS].sort(
  (a, b) => b.dateIso.localeCompare(a.dateIso),
);

export function getFeaturedPosts(): {
  main: BlogPostSummary;
  side: BlogPostSummary[];
} {
  const [main, ...rest] = ALL_BLOG_POSTS;
  return {
    main,
    side: rest.slice(0, 3),
  };
}

/** Six cards for the “latest” grid (design); skips the hero row when possible */
export function getLatestGridPosts(): BlogPostSummary[] {
  const { main, side } = getFeaturedPosts();
  const usedSlugs = new Set([main.slug, ...side.map((p) => p.slug)]);
  const remaining = ALL_BLOG_POSTS.filter((p) => !usedSlugs.has(p.slug));
  return remaining.slice(0, 6);
}
