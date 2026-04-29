import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArticleProseProps = {
  children: ReactNode;
  className?: string;
};

export function ArticleProse({ children, className }: ArticleProseProps) {
  return (
    <div
      className={cn(
        "article-prose w-full max-w-prose text-mondy-ink",
        "flex flex-col gap-6 text-base leading-relaxed md:text-lg md:leading-relaxed",
        "[&_a]:text-mondy-accent-deep [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-mondy-accent",
        "[&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28",
        "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:pt-4",
        "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:pt-2",
        "[&_p]:opacity-90",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:opacity-90",
        "[&_hr]:my-10 [&_hr]:border-black/[0.08]",
        className,
      )}
    >
      {children}
    </div>
  );
}
