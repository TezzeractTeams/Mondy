"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; label: string };

const INLINE_TOC_HEADING_ID = "article-toc-inline-title";

function slugifyHeading(text: string): string {
  const s = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "section";
}

function resolveHeadingAnchorId(h2: HTMLElement, root: HTMLElement): string {
  const direct = h2.id.trim();
  if (direct) return direct;
  let el: Element | null = h2.parentElement;
  while (el && el !== root) {
    if (el.id) return el.id;
    el = el.parentElement;
  }
  return "";
}

function collectTocItemsFromArticleRoot(root: HTMLElement): TocItem[] {
  const headings = root.querySelectorAll("h2");
  const items: TocItem[] = [];
  const usedIds = new Set<string>();

  headings.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.id === INLINE_TOC_HEADING_ID) return;

    const label = node.textContent?.trim() ?? "";
    if (!label) return;

    let anchorId = node.id.trim();
    if (!anchorId) {
      anchorId = resolveHeadingAnchorId(node, root);
    }
    if (!anchorId || usedIds.has(anchorId)) {
      let base = slugifyHeading(label);
      let candidate = base;
      let n = 2;
      while (usedIds.has(candidate)) {
        candidate = `${base}-${n++}`;
      }
      anchorId = candidate;
      node.id = anchorId;
    }
    usedIds.add(anchorId);
    items.push({ id: anchorId, label });
  });

  return items;
}

type TocContextValue = {
  items: TocItem[];
  activeId: string;
  progress: number;
  onTocNavigate: (id: string) => void;
};

const TocScrollContext = createContext<TocContextValue | null>(null);

/** Fallback when we cannot read CSS (SSR, missing nodes). */
const NAV_READ_OFFSET_FALLBACK = 128;

function measureReadLineY(scrollRootId: string, items: TocItem[]): number {
  const root = document.getElementById(scrollRootId);
  const probe =
    (root?.querySelector(`h2:not(#${INLINE_TOC_HEADING_ID})`) as HTMLElement | null) ??
    (items[0] ? document.getElementById(items[0].id) : null);
  if (!probe) return NAV_READ_OFFSET_FALLBACK;
  const margin = parseFloat(getComputedStyle(probe).scrollMarginTop) || 0;
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  // Headings land near max(margin, padding) after hash scroll; use that as the “past the line” threshold.
  return Math.max(NAV_READ_OFFSET_FALLBACK, Math.ceil(margin), Math.ceil(pad)) + 8;
}

/** Extra slack so a heading just below the read line still counts as “current” (hash scroll + font scaling). */
const ACTIVE_HEADING_BUFFER_PX = 96;

function computeActiveId(items: TocItem[], readLineY: number): string {
  const first = items[0];
  if (!first) return "";
  let active = first.id;
  const line = readLineY + ACTIVE_HEADING_BUFFER_PX;
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= line) active = item.id;
  }
  return active;
}

function computeReadProgress(scrollRootId: string, readLineY: number): number {
  const root = document.getElementById(scrollRootId);
  if (!root) return 0;
  const y = window.scrollY;
  const start = root.offsetTop - readLineY;
  const end = root.offsetTop + root.offsetHeight - window.innerHeight * 0.55;
  const range = Math.max(1, end - start);
  return Math.min(100, Math.max(0, ((y - start) / range) * 100));
}

function useTocScroll(items: TocItem[], scrollRootId: string) {
  const readLineYRef = useRef(NAV_READ_OFFSET_FALLBACK);
  /** TOC link click: keep this id highlighted until scroll-spy agrees or the user scrolls manually. */
  const clickedIdRef = useRef<string | null>(null);
  const ignoreUserScrollUntilRef = useRef(0);
  const wheelClearHandlerRef = useRef<(() => void) | null>(null);

  const [activeId, setActiveId] = useState(() => items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    readLineYRef.current = measureReadLineY(scrollRootId, items);
  }, [scrollRootId, items]);

  useEffect(() => {
    setActiveId((prev) => {
      if (items.length === 0) return "";
      if (items.some((i) => i.id === prev)) return prev;
      return items[0]!.id;
    });
  }, [items]);

  const tick = useCallback(() => {
    readLineYRef.current = measureReadLineY(scrollRootId, items);
    const readLineY = readLineYRef.current;
    const computed = computeActiveId(items, readLineY);
    const clicked = clickedIdRef.current;
    if (clicked && items.some((i) => i.id === clicked) && computed === clicked) {
      clickedIdRef.current = null;
    }
    const show =
      clicked && items.some((i) => i.id === clicked) ? clicked : computed;
    setActiveId(show);
    setProgress(computeReadProgress(scrollRootId, readLineY));
  }, [items, scrollRootId]);

  const detachUserScrollClear = useCallback(() => {
    const h = wheelClearHandlerRef.current;
    if (!h) return;
    window.removeEventListener("wheel", h, { capture: true });
    window.removeEventListener("touchmove", h, { capture: true });
    wheelClearHandlerRef.current = null;
  }, []);

  const onTocNavigate = useCallback(
    (id: string) => {
      detachUserScrollClear();
      clickedIdRef.current = id;
      setActiveId(id);
      // Ignore wheel/touch for a bit so smooth in-page scroll from the link does not drop the highlight.
      ignoreUserScrollUntilRef.current = Date.now() + 900;

      const onUserScrollIntent = () => {
        if (Date.now() < ignoreUserScrollUntilRef.current) return;
        clickedIdRef.current = null;
        detachUserScrollClear();
        window.requestAnimationFrame(() => tick());
      };
      wheelClearHandlerRef.current = onUserScrollIntent;
      window.addEventListener("wheel", onUserScrollIntent, { passive: true, capture: true });
      window.addEventListener("touchmove", onUserScrollIntent, { passive: true, capture: true });
    },
    [detachUserScrollClear, tick],
  );

  useEffect(() => {
    return () => {
      detachUserScrollClear();
    };
  }, [detachUserScrollClear]);

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

  return { activeId, progress, onTocNavigate };
}

type ArticleTOCScrollProviderProps = {
  /** Static TOC entries. Ignored when `tocFromSelector` is set. */
  items?: TocItem[];
  /**
   * When set, TOC labels and anchor ids are taken from `h2` elements under this root (e.g. `#article-main`).
   * The mobile inline TOC heading (`#article-toc-inline-title`) is excluded. Headings without an id use the
   * nearest ancestor id inside the root, or a generated slug on the `h2`.
   */
  tocFromSelector?: string;
  scrollRootId?: string;
  children: ReactNode;
};

export function ArticleTOCScrollProvider({
  items: itemsProp,
  tocFromSelector,
  scrollRootId = "article-main",
  children,
}: ArticleTOCScrollProviderProps) {
  if (!tocFromSelector && itemsProp === undefined) {
    throw new Error("ArticleTOCScrollProvider: pass `tocFromSelector` or `items`.");
  }

  const [derivedItems, setDerivedItems] = useState<TocItem[]>([]);

  useLayoutEffect(() => {
    if (!tocFromSelector) return;
    const root = document.querySelector(tocFromSelector);
    if (!(root instanceof HTMLElement)) return;
    setDerivedItems(collectTocItemsFromArticleRoot(root));
  }, [tocFromSelector]);

  const items = tocFromSelector ? derivedItems : (itemsProp ?? []);

  const { activeId, progress, onTocNavigate } = useTocScroll(items, scrollRootId);
  const value: TocContextValue = { items, activeId, progress, onTocNavigate };
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
  const { items, activeId, progress, onTocNavigate } = useTocScrollContext();

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
                  onClick={() => onTocNavigate(item.id)}
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
