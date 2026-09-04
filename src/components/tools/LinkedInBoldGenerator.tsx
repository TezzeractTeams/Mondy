"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, List, ListOrdered, Loader2, Monitor, Search, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";
import {
  TEXT_STYLE_LABELS,
  applyListToRange,
  applyStyleToRange,
  insertPointBreaker,
  listIsApplied,
  styleIsApplied,
  textStats,
  type ListKind,
  type PointBreakerKind,
  type TextStyle,
} from "@/lib/unicodeTextStyles";
import LinkedInPostPreview, { type PreviewFrame } from "./LinkedInPostPreview";
import StylePreviewGrid from "./StylePreviewGrid";

const PRIMARY_STYLES: { style: TextStyle; mark: string; markClass?: string }[] = [
  { style: "bold", mark: "B", markClass: "font-bold" },
  { style: "italic", mark: "I", markClass: "italic font-semibold" },
  { style: "underline", mark: "U", markClass: "underline" },
  { style: "strikethrough", mark: "S", markClass: "line-through" },
];

const MORE_STYLES: { style: TextStyle; sample: string }[] = [
  { style: "boldItalic", sample: "𝑩𝒊" },
  { style: "sans", sample: "𝖠𝖺" },
  { style: "boldSans", sample: "𝗔𝗮" },
  { style: "italicSans", sample: "𝘈𝘢" },
  { style: "boldItalicSans", sample: "𝘼𝙖" },
  { style: "script", sample: "𝒜𝒶" },
  { style: "doublestruck", sample: "𝔸𝕒" },
  { style: "fullwidth", sample: "Ａａ" },
];

const POINT_BREAKERS: {
  label: string;
  display: string;
  marker: string;
  kind: PointBreakerKind;
}[] = [
  { label: "Line break", display: "⤵", marker: "", kind: "line" },
  { label: "Bullet", display: "•", marker: "•", kind: "point" },
  { label: "Arrow", display: "→", marker: "→", kind: "point" },
  { label: "Nested", display: "↳", marker: "↳", kind: "point" },
  { label: "Check", display: "☑", marker: "☑", kind: "point" },
  { label: "Check mark", display: "✓", marker: "✓", kind: "point" },
  { label: "Dash", display: "–", marker: "–", kind: "point" },
  { label: "Play", display: "▸", marker: "▸", kind: "point" },
  { label: "Dots", display: "···", marker: "· · ·", kind: "divider" },
  { label: "Rule", display: "─", marker: "────────", kind: "divider" },
];

const toolBtn =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-lg border text-[13px] font-semibold tracking-tight transition-colors";

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function LinkedInBoldGenerator() {
  const previewEditorRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [name, setName] = useState("Jordan Hale");
  const [headline, setHeadline] = useState("Founder · sharing what actually works");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [frame, setFrame] = useState<PreviewFrame>("desktop");
  const [copied, setCopied] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => textStats(text), [text]);
  const selectedSlice = text.slice(
    Math.min(selection.start, selection.end),
    Math.max(selection.start, selection.end),
  );
  const moreActive = MORE_STYLES.some(({ style }) => selectedSlice.length > 0 && styleIsApplied(selectedSlice, style));

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [moreOpen]);

  const getActiveEditor = useCallback(() => previewEditorRef.current, []);

  const syncSelection = useCallback(() => {
    const el = getActiveEditor();
    if (!el) return;
    setSelection({ start: el.selectionStart, end: el.selectionEnd });
  }, [getActiveEditor]);

  const restoreSelection = useCallback(
    (start: number, end: number, value: string, target?: HTMLTextAreaElement | null) => {
      setText(value);
      requestAnimationFrame(() => {
        const el = target ?? getActiveEditor();
        if (!el) return;
        el.focus();
        el.setSelectionRange(start, end);
        setSelection({ start, end });
      });
    },
    [getActiveEditor],
  );

  const loadProfile = async () => {
    setProfileError(null);
    setProfileMessage(null);
    setProfileLoading(true);
    try {
      const response = await fetch("/api/linkedin-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: profileUrl }),
      });
      const payload = (await response.json()) as {
        name?: string;
        headline?: string;
        photoUrl?: string | null;
        error?: string;
      };
      if (!response.ok) {
        setProfileError(payload.error ?? "Couldn’t load that profile.");
        return;
      }
      if (payload.name) setName(payload.name);
      if (payload.headline) setHeadline(payload.headline);
      if (payload.photoUrl) setPhotoUrl(payload.photoUrl);
      setProfileMessage(
        payload.photoUrl
          ? "Loaded name, headline, and photo into the preview."
          : "Loaded name and headline into the preview.",
      );
    } catch {
      setProfileError("Couldn’t load that profile. Check the URL and try again.");
    } finally {
      setProfileLoading(false);
    }
  };

  const applyToolbarStyle = (style: TextStyle) => {
    const el = getActiveEditor();
    const start = el?.selectionStart ?? 0;
    const end = el?.selectionEnd ?? 0;
    const next = applyStyleToRange(text, start, end, style);
    restoreSelection(next.start, next.end, next.text, el);
  };

  const insertBreaker = (marker: string, kind: PointBreakerKind) => {
    const el = getActiveEditor();
    const start = el?.selectionStart ?? 0;
    const end = el?.selectionEnd ?? 0;
    const next = insertPointBreaker(text, start, end, marker, kind);
    restoreSelection(next.start, next.end, next.text, el);
  };

  const applyList = (kind: ListKind) => {
    const el = getActiveEditor();
    const start = el?.selectionStart ?? 0;
    const end = el?.selectionEnd ?? 0;
    const next = applyListToRange(text, start, end, kind);
    restoreSelection(next.start, next.end, next.text, el);
  };

  const onCopyPost = async () => {
    if (!text) return;
    const ok = await copyText(text);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <section className="mx-auto flex w-full max-w-xl flex-col items-center gap-5">
        <p className="text-sm font-semibold tracking-tight text-mondy-ink/45">
          {stats.chars} chars · {stats.words} words · {stats.readingLabel} reading time
        </p>

        <div className="flex w-full flex-col gap-3 rounded-[1.25rem] border border-black/[0.08] bg-white p-3 sm:p-3.5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 rounded-2xl border border-black/[0.06] bg-mondy-surface/70 p-1 pl-3.5">
              <input
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="Paste your LinkedIn profile URL"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void loadProfile();
                  }
                }}
                className="min-w-0 flex-1 bg-transparent py-2 text-sm font-medium tracking-tight text-mondy-ink outline-none placeholder:text-mondy-ink/30"
              />
              <button
                type="button"
                onClick={() => void loadProfile()}
                disabled={profileLoading || !profileUrl.trim()}
                className={cn(
                  mondyBtn.primaryLg,
                  "inline-flex shrink-0 items-center justify-center gap-1.5 !px-3.5 !py-2 !text-xs sm:!px-4 sm:!text-sm",
                  (profileLoading || !profileUrl.trim()) && "pointer-events-none opacity-40",
                )}
              >
                {profileLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Search className="size-3.5" strokeWidth={2.25} />
                )}
                {profileLoading ? "Loading" : "Load profile"}
              </button>
            </div>
            <p className="px-1 text-xs font-medium tracking-tight text-mondy-ink/40">
              Optional. Loads your name, headline, and photo into the preview.
            </p>
            {profileError ? (
              <p className="px-1 text-xs font-medium tracking-tight text-mondy-coral">{profileError}</p>
            ) : null}
            {profileMessage ? (
              <p className="px-1 text-xs font-medium tracking-tight text-mondy-accent-deep">{profileMessage}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {PRIMARY_STYLES.map(({ style, mark, markClass }) => {
              const active = selectedSlice.length > 0 && styleIsApplied(selectedSlice, style);
              return (
                <button
                  key={style}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyToolbarStyle(style)}
                  title={`${TEXT_STYLE_LABELS[style]} — select text, then click. Click again to remove.`}
                  aria-label={TEXT_STYLE_LABELS[style]}
                  aria-pressed={active}
                  className={cn(
                    toolBtn,
                    active
                      ? "border-mondy-accent bg-mondy-accent text-white"
                      : "border-black/[0.06] bg-mondy-surface text-mondy-ink hover:border-mondy-accent/40 hover:bg-secondary-50",
                  )}
                >
                  <span className={markClass}>{mark}</span>
                </button>
              );
            })}

            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setMoreOpen((open) => !open)}
                title="More Unicode styles"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={cn(
                  toolBtn,
                  moreOpen || moreActive
                    ? "border-mondy-accent bg-mondy-accent text-white"
                    : "border-black/[0.06] bg-mondy-surface text-mondy-ink hover:border-mondy-accent/40 hover:bg-secondary-50",
                )}
              >
                Aa
              </button>
              {moreOpen ? (
                <div
                  role="menu"
                  className="absolute left-0 top-[calc(100%+6px)] z-20 w-52 rounded-2xl border border-black/[0.06] bg-white p-1.5 shadow-[0_16px_40px_-18px_rgba(28,26,23,0.28)]"
                >
                  {MORE_STYLES.map(({ style, sample }) => {
                    const active = selectedSlice.length > 0 && styleIsApplied(selectedSlice, style);
                    return (
                      <button
                        key={style}
                        type="button"
                        role="menuitem"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          applyToolbarStyle(style);
                          setMoreOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-[13px] font-bold tracking-tight transition-colors",
                          active
                            ? "bg-mondy-accent text-white"
                            : "text-mondy-ink hover:bg-secondary-50",
                        )}
                      >
                        <span>{TEXT_STYLE_LABELS[style]}</span>
                        <span className="font-normal">{sample}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <span className="mx-0.5 hidden h-5 w-px bg-black/10 sm:block" aria-hidden />

            {(
              [
                { kind: "bullet" as const, label: "Bulleted list", icon: List },
                { kind: "number" as const, label: "Numbered list", icon: ListOrdered },
              ] as const
            ).map(({ kind, label, icon: Icon }) => {
              const target = selectedSlice.length > 0 ? selectedSlice : text;
              const active = listIsApplied(target, kind);
              return (
                <button
                  key={kind}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyList(kind)}
                  title={`${label} — select lines, then click. Click again to remove.`}
                  aria-label={label}
                  aria-pressed={active}
                  className={cn(
                    toolBtn,
                    active
                      ? "border-mondy-accent bg-mondy-accent text-white"
                      : "border-black/[0.06] bg-mondy-surface text-mondy-ink hover:border-mondy-coral/40 hover:bg-primary-50",
                  )}
                >
                  <Icon className="size-4" strokeWidth={2.25} aria-hidden />
                </button>
              );
            })}

            {POINT_BREAKERS.map((item) => (
              <button
                key={item.label}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => insertBreaker(item.marker, item.kind)}
                title={item.label}
                className={cn(
                  toolBtn,
                  "border-black/[0.06] bg-mondy-surface text-mondy-ink hover:border-mondy-coral/40 hover:bg-primary-50",
                )}
              >
                {item.display}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <div className="inline-flex rounded-full bg-white p-1 shadow-[0_1px_0_rgba(28,26,23,0.04)]">
            {(
              [
                { id: "mobile" as const, label: "Mobile", icon: Smartphone },
                { id: "desktop" as const, label: "Desktop", icon: Monitor },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFrame(id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-tight transition-colors",
                  frame === id ? "bg-mondy-accent text-white" : "text-mondy-ink/55 hover:text-mondy-ink",
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onCopyPost}
            disabled={!text}
            className={cn(
              mondyBtn.primaryLg,
              "inline-flex items-center gap-2 !px-4 !py-2 !text-xs sm:!text-sm",
              !text && "pointer-events-none opacity-40",
            )}
          >
            {copied ? <Check className="size-3.5" strokeWidth={2.5} /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy post"}
          </button>
        </div>

        <p className="text-center text-xs font-medium tracking-tight text-mondy-ink/40">
          Select text in the post below, then pick a style. Click the same style again to remove it.
        </p>

        <div className="flex w-full justify-center">
          <LinkedInPostPreview
            name={name}
            headline={headline}
            body={text}
            frame={frame}
            photoUrl={photoUrl}
            emptyPlaceholder="Type your LinkedIn post here..."
            bodyTextareaRef={previewEditorRef}
            onBodyChange={setText}
            onBodySelect={syncSelection}
          />
        </div>
      </section>

      <StylePreviewGrid text={text} />
    </div>
  );
}
