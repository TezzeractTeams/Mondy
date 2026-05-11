import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPostSummary } from "@/lib/blogPosts";
import { getFeaturedPosts, getLatestGridPosts } from "@/lib/blogPosts";
import { CARD_RADIUS, CARD_SHADOW } from "@/components/pricing/pricing-styles";
import { cn } from "@/lib/utils";
import { mondyBtn, mondyLayout, mondyType } from "@/styles/mondy";

function PostDate({
  dateLabel,
  dateIso,
  invert,
}: {
  dateLabel: string;
  dateIso?: string;
  /** Light text for image overlays */
  invert?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm",
        invert ? "text-white/90" : "text-mondy-ink/55",
      )}
    >
      <Clock
        className={cn("size-3.5 shrink-0", invert ? "text-white/70" : "text-mondy-ink/40")}
        aria-hidden
      />
      <time dateTime={dateIso ?? dateLabel}>{dateLabel}</time>
    </span>
  );
}

function ReadMoreLink({
  href,
  className,
}: {
  href: string | null;
  className?: string;
}) {
  if (!href) {
    return (
      <span className={cn("text-sm font-medium text-mondy-ink/45", className)}>Coming soon</span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold text-mondy-accent-deep transition-colors group-hover:text-mondy-accent",
        className,
      )}
    >
      Read more
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </span>
  );
}

function FeaturedMainCard({ post }: { post: BlogPostSummary }) {
  const inner = (
    <>
      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden bg-neutral-60 md:aspect-[5/3] lg:min-h-[380px]",
          CARD_RADIUS,
          CARD_SHADOW,
        )}
      >
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mondy-ink/90 via-mondy-ink/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-8 md:pb-7">
          <h2 className="font-noah text-xl font-extrabold leading-snug tracking-[-0.04em] text-white md:text-2xl lg:text-[1.65rem] lg:leading-tight">
            {post.title}
          </h2>
          <PostDate dateLabel={post.dateLabel} dateIso={post.dateIso} invert />
          <p className="max-w-2xl text-sm leading-relaxed text-white/85 line-clamp-2 md:text-base">{post.excerpt}</p>
        </div>
      </div>
    </>
  );

  if (!post.href) {
    return (
      <article className="group w-full opacity-95">{inner}</article>
    );
  }

  return (
    <Link
      href={post.href}
      className={cn(
        "group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mondy-accent focus-visible:ring-offset-2 focus-visible:ring-offset-mondy-surface",
        CARD_RADIUS,
      )}
    >
      {inner}
    </Link>
  );
}

function FeaturedSideCard({ post }: { post: BlogPostSummary }) {
  const body = (
    <div
      className={cn(
        "flex min-h-[92px] overflow-hidden border border-black/[0.06] bg-mondy-card/90 backdrop-blur-sm transition-shadow group-hover:shadow-md",
        CARD_RADIUS,
        CARD_SHADOW,
      )}
    >
      <div className="relative w-[120px] shrink-0 self-stretch min-h-[92px] bg-neutral-60">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          className="object-cover object-left"
          sizes="120px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-3 pr-3 pl-4">
        <h3 className="line-clamp-2 font-noah text-sm font-extrabold leading-snug tracking-[-0.03em] text-mondy-ink md:text-lg">
          {post.title}
        </h3>
        <PostDate dateLabel={post.dateLabel} dateIso={post.dateIso} />
        <ReadMoreLink href={post.href} />
      </div>
    </div>
  );

  if (!post.href) {
    return (
      <article className="group cursor-default" aria-label={`${post.title} (coming soon)`}>
        {body}
      </article>
    );
  }

  return (
    <Link
      href={post.href}
      className={cn(
        "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mondy-accent focus-visible:ring-offset-2 focus-visible:ring-offset-mondy-surface",
        CARD_RADIUS,
      )}
    >
      {body}
    </Link>
  );
}

const gridCardShell = cn(
  "flex h-full flex-col overflow-hidden border border-black/[0.06] bg-mondy-card/95 backdrop-blur-sm transition-shadow duration-300",
  "hover:border-black/[0.08] hover:shadow-md",
  CARD_RADIUS,
  CARD_SHADOW,
);

function GridCardReadButton({ href }: { href: string | null }) {
  if (!href) {
    return (
      <span className="mt-auto inline-flex w-fit items-center rounded-full border border-black/[0.08] bg-white/90 px-3 py-1.5 text-xs font-semibold text-mondy-ink/45">
        Coming soon
      </span>
    );
  }
  return (
    <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-mondy-accent px-3 py-1.5 text-xs font-bold text-white shadow-sm transition group-hover:brightness-110">
      Read
      <ArrowRight className="size-3.5 opacity-95" aria-hidden />
    </span>
  );
}

function GridCard({ post }: { post: BlogPostSummary }) {
  const figure = (
    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-neutral-60">
      <Image
        src={post.imageSrc}
        alt={post.imageAlt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col gap-3 p-5">
      <h3 className="line-clamp-2 min-h-[2.75rem] font-noah text-base font-extrabold leading-snug tracking-[-0.04em] text-mondy-ink md:min-h-[3rem] md:text-lg">
        {post.title}
      </h3>
      <PostDate dateLabel={post.dateLabel} dateIso={post.dateIso} />
      <GridCardReadButton href={post.href} />
    </div>
  );

  if (!post.href) {
    return (
      <article className={cn(gridCardShell, "group")}>
        {figure}
        {body}
      </article>
    );
  }

  return (
    <Link
      href={post.href}
      className={cn(
        gridCardShell,
        "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mondy-accent focus-visible:ring-offset-2 focus-visible:ring-offset-mondy-surface",
      )}
    >
      {figure}
      {body}
    </Link>
  );
}

export function BlogIndex() {
  const { main, side } = getFeaturedPosts();
  const gridPosts = getLatestGridPosts();

  return (
    <div className={cn(mondyLayout.contentMax, "flex w-full max-w-7xl flex-col gap-16 lg:gap-24")}>
      <header className="flex flex-col items-center gap-6 text-center">
        <h1
          className={cn(
            mondyType.sectionHeading,
            "max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl",
          )}
        >
          Our insightful <span className="text-mondy-accent">Blog</span>
        </h1>
        <p className={cn(mondyType.sectionLead, "mx-auto max-w-2xl text-balance")}>
          Ideas on voice-first content, B2B social strategy, and building a consistent presence without the blank-page
          grind—practical notes from the Mondy team and guests.
        </p>
      </header>

      <section
        aria-labelledby="featured-heading"
        className={cn(
          "flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10",
          "",
        )}
      >
        <h2 id="featured-heading" className="sr-only">
          Featured posts
        </h2>
        <div className="w-full lg:w-[58%] lg:min-w-0 lg:flex-shrink-0">
          <FeaturedMainCard post={main} />
        </div>
        <div className="flex w-full flex-col gap-10 lg:w-[42%] justify-center ">
          {side.map((post) => (
            <FeaturedSideCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section id="explore-articles" className="flex flex-col gap-10 scroll-mt-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <h2
            className={cn(
              "font-noah font-extrabold tracking-[-0.06em] text-mondy-ink",
              "max-w-xl text-balance text-left text-3xl sm:text-4xl md:text-5xl lg:max-w-lg lg:text-[2.65rem]",
            )}
          >
            Explore our latest <span className="text-mondy-accent">Articles</span>
          </h2>
          <p className={cn(mondyType.sectionLead, "max-w-xl text-left lg:text-right")}>
            Deep dives, reference lists, and playbooks you can put to work this quarter—whether you are a founder,
            marketer, or operator shipping social alongside everything else.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <GridCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <a href="#explore-articles" className={cn(mondyBtn.primaryMd, "text-[16px]")}>
            View all articles
          </a>
        </div>
      </section>
    </div>
  );
}
