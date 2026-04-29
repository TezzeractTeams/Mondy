"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; label: string };

type TocContextValue = {
  items: TocItem[];
  activeId: string;
  progress: number;
};

const TocScrollContext = createContext<TocContextValue | null>(null);

const NAV_READ_OFFSET = 128;

function computeActiveId(items: TocItem[]): string {
  const first = items[0];
  if (!first) return "";
  let active = first.id;
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= NAV_READ_OFFSET) active = item.id;
  }
  return active;
}

function computeReadProgress(scrollRootId: string): number {
  const root = document.getElementById(scrollRootId);
  if (!root) return 0;
  const y = window.scrollY;
  const start = root.offsetTop - NAV_READ_OFFSET;
  const end = root.offsetTop + root.offsetHeight - window.innerHeight * 0.55;
  const range = Math.max(1, end - start);
  return Math.min(100, Math.max(0, ((y - start) / range) * 100));
}

function useTocScroll(items: TocItem[], scrollRootId: string) {
  const [activeId, setActiveId] = useState(() => items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  const tick = useCallback(() => {
    setActiveId(computeActiveId(items));
    setProgress(computeReadProgress(scrollRootId));
  }, [items, scrollRootId]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      tick();
    });
    const onScroll = () => {
      window.requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [tick]);

  return { activeId, progress };
}

type ArticleTOCScrollProviderProps = {
  items: TocItem[];
  scrollRootId?: string;
  children: ReactNode;
};

export function ArticleTOCScrollProvider({
  items,
  scrollRootId = "article-main",
  children,
}: ArticleTOCScrollProviderProps) {
  const { activeId, progress } = useTocScroll(items, scrollRootId);
  const value: TocContextValue = { items, activeId, progress };
  return <TocScrollContext.Provider value={value}>{children}</TocScrollContext.Provider>;
}

function useTocScrollContext(): TocContextValue {
  const ctx = useContext(TocScrollContext);
  if (!ctx) {
    throw new Error("ArticleTOC and ArticleTOCInline must be used inside ArticleTOCScrollProvider");
  }
  return ctx;
}

function TocNavList({ headingId }: { headingId: string }) {
  const { items, activeId, progress } = useTocScrollContext();

  return (
    <div className="flex gap-3.5 items-stretch">
      <div
        className="relative w-2 shrink-0 overflow-hidden rounded-full bg-neutral-60/40"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress through this article"
      >
        <div
          className="pointer-events-none absolute left-0 top-0 w-full rounded-full bg-mondy-accent transition-[height] duration-200 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
      <nav aria-labelledby={headingId} className="min-w-0 flex-1">
        <ul className="flex flex-col gap-2.5">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "block text-[15px] leading-snug transition-colors sm:text-base",
                    active
                      ? "font-semibold text-mondy-accent-deep"
                      : "font-normal text-neutral-80 hover:text-mondy-accent-deep hover:underline underline-offset-4",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

type ArticleTOCProps = {
  className?: string;
  /** Rendered below the TOC list (e.g. share buttons). */
  afterToc?: ReactNode;
  /** Main heading above the list (default: "On this page"). */
  tocTitle?: string;
  /** Small label under the title (default: "Table of contents"). */
  tocSubtitle?: string;
};

type ArticleTOCInlineProps = {
  afterToc?: ReactNode;
  tocTitle?: string;
  tocSubtitle?: string;
};

function TocSectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return (
    <div className="mb-1">
      <h2 id={id} className="text-lg font-bold tracking-tight text-mondy-ink md:text-xl">
        {title}
      </h2>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-80">{subtitle}</p>
    </div>
  );
}

export function ArticleTOC({ className, afterToc, tocTitle = "On this page", tocSubtitle = "Table of contents" }: ArticleTOCProps) {
  const headingId = "article-toc-sidebar-title";
  return (
    <aside className={className}>
      <div className="flex flex-col gap-8 lg:sticky lg:top-28">
        <div>
          <TocSectionHeading id={headingId} title={tocTitle} subtitle={tocSubtitle} />
          <div className="mt-4">
            <TocNavList headingId={headingId} />
          </div>
        </div>
        {afterToc}
      </div>
    </aside>
  );
}

export function ArticleTOCInline({
  afterToc,
  tocTitle = "On this page",
  tocSubtitle = "Table of contents",
}: ArticleTOCInlineProps) {
  const headingId = "article-toc-inline-title";
  return (
    <div className="flex flex-col gap-6 lg:hidden">
      <div className="rounded-2xl border border-black/[0.06] bg-white/60 p-5">
        <TocSectionHeading id={headingId} title={tocTitle} subtitle={tocSubtitle} />
        <div className="mt-4">
          <TocNavList headingId={headingId} />
        </div>
      </div>
      {afterToc}
    </div>
  );
}
