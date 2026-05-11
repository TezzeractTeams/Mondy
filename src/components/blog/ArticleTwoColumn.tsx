import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArticleTwoColumnProps = {
  sidebar: ReactNode;
  children: ReactNode;
  /** Optional right rail (e.g. download CTA); hidden on small screens by the child. */
  rightAside?: ReactNode;
  className?: string;
};

export function ArticleTwoColumn({ sidebar, children, rightAside, className }: ArticleTwoColumnProps) {
  return (
    <div
      className={cn(
        "grid w-full gap-10",
        rightAside
          ? "lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(0,200px)] lg:gap-6 xl:grid-cols-[220px_minmax(0,1fr)_220px] xl:gap-8"
          : "lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,1fr)]",
        className,
      )}
    >
      {sidebar}
      <div
        className={cn(
          "min-w-0",
          // Center the reading column so space is split evenly between the two side rails (uniform gutters).
          rightAside && "mx-auto w-full max-w-prose",
        )}
      >
        {children}
      </div>
      {rightAside ?? null}
    </div>
  );
}
