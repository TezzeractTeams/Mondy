import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArticleShellProps = {
  children: ReactNode;
  className?: string;
};

export function ArticleShell({ children, className }: ArticleShellProps) {
  return (
    <main
      className={cn(
        "min-h-screen w-full bg-mondy-surface flex flex-col items-center pt-28 md:pt-32 pb-24 px-4 sm:px-6 md:px-8",
        className,
      )}
    >
      {children}
    </main>
  );
}
