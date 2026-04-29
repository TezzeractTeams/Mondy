import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArticleCalloutProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export function ArticleCallout({ children, title = "Note", className }: ArticleCalloutProps) {
  return (
    <aside
      className={cn(
        "my-6 rounded-xl border-l-4 border-mondy-accent bg-secondary-50/80 px-4 py-3 text-sm leading-relaxed text-mondy-ink md:text-base",
        className,
      )}
    >
      <p className="font-semibold text-mondy-ink">{title}</p>
      <div className="mt-1 opacity-90">{children}</div>
    </aside>
  );
}
