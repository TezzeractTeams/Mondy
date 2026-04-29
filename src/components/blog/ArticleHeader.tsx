import type { ReactNode } from "react";
import { ArticleShareRow } from "./ArticleShareRow";

type ArticleHeaderProps = {
  title: string;
  author: string;
  publishedOn: string;
  readingTimeMinutes: number;
  absoluteShareUrl: string;
  shareMailSubject: string;
  /** Shown directly under the title (e.g. hero image). */
  hero?: ReactNode;
  children?: ReactNode;
};

export function ArticleHeader({
  title,
  author,
  publishedOn,
  readingTimeMinutes,
  absoluteShareUrl,
  shareMailSubject,
  hero,
  children,
}: ArticleHeaderProps) {
  return (
    <header className="flex w-full flex-col gap-6 border-b border-black/[0.06] pb-10">
      <h1 className="text-3xl font-bold tracking-tight text-mondy-ink md:text-4xl lg:text-[2.5rem] lg:leading-tight">
        {title}
      </h1>
      {hero}
      <div className="flex flex-col gap-1 text-sm text-neutral-80 md:flex-row md:flex-wrap md:items-center md:gap-x-2">
        <span className="text-mondy-ink font-medium">{author}</span>
        <span className="hidden md:inline text-neutral-70">•</span>
        <span>Published on {publishedOn}</span>
        <span className="hidden md:inline text-neutral-70">•</span>
        <span>Reading time {readingTimeMinutes} min</span>
      </div>
      <ArticleShareRow absoluteShareUrl={absoluteShareUrl} mailSubject={shareMailSubject} />
      {children}
    </header>
  );
}
