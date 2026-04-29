import Image from "next/image";
import type { ReactNode } from "react";

type ArticleHeaderProps = {
  title: string;
  /** Display name; with `authorAvatarSrc`, shown beside the photo. */
  author: string;
  publishedOn: string;
  readingTimeMinutes: number;
  /** Circular author photo; when omitted, `author` renders as plain text only. */
  authorAvatarSrc?: string;
  authorAvatarAlt?: string;
  /** Shown under byline (e.g. hero image). */
  hero?: ReactNode;
  children?: ReactNode;
};

export function ArticleHeader({
  title,
  author,
  publishedOn,
  readingTimeMinutes,
  authorAvatarSrc,
  authorAvatarAlt,
  hero,
  children,
}: ArticleHeaderProps) {
  const hasAvatar = Boolean(authorAvatarSrc);

  return (
    <header className="flex w-full flex-col gap-6 border-b border-black/[0.06] pb-10">
      <h1 className="text-3xl font-bold tracking-tight text-mondy-ink leading-tight md:text-4xl md:leading-tight lg:text-6xl lg:leading-[1.08]">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm leading-tight text-neutral-80">
        {hasAvatar ? (
          <>
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-black/[0.08] bg-neutral-50 shadow-sm">
                <Image
                  src={authorAvatarSrc!}
                  alt={authorAvatarAlt ?? author}
                  width={88}
                  height={88}
                  className="size-full object-cover"
                  sizes="20px"
                />
              </div>
              <span className="truncate text-base font-semibold leading-tight tracking-tight text-mondy-ink">{author}</span>
            </div>
            <span className="hidden text-neutral-70 sm:inline" aria-hidden>
              •
            </span>
          </>
        ) : (
          <>
            <span className="text-mondy-ink font-medium">{author}</span>
            <span className="hidden text-neutral-70 md:inline" aria-hidden>
              •
            </span>
          </>
        )}
        <span>Published on {publishedOn}</span>
        <span className="hidden text-neutral-70 sm:inline" aria-hidden>
          •
        </span>
        <span>Reading time {readingTimeMinutes} min</span>
      </div>
      {hero}
      {children}
    </header>
  );
}
