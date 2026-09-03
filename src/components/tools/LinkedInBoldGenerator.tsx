"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Check, Copy, List, ListOrdered, Loader2, Monitor, Smartphone } from "lucide-react";
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

const TOOLBAR_STYLES: { style: TextStyle; sample: string }[] = [
  { style: "bold", sample: "𝐀𝐚" },
  { style: "italic", sample: "𝐴𝑎" },
  { style: "boldItalic", sample: "𝑨𝒂" },
  { style: "sans", sample: "𝖠𝖺" },
  { style: "boldSans", sample: "𝗔𝗮" },
  { style: "italicSans", sample: "𝘈𝘢" },
  { style: "boldItalicSans", sample: "𝘼𝙖" },
  { style: "script", sample: "𝒜𝒶" },
  { style: "doublestruck", sample: "𝔸𝕒" },
  { style: "fullwidth", sample: "Ａａ" },
  { style: "underline", sample: "A̲" },
  { style: "strikethrough", sample: "A̶" },
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
  { label: "Dots", display: "· · ·", marker: "· · ·", kind: "divider" },
  { label: "Rule", display: "────────", marker: "────────", kind: "divider" },
];

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function LinkedInBoldGenerator() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewEditorRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [name, setName] = useState("Jordan Hale");
  const [headline, setHeadline] = useState("Founder · sharing what actually works");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [frame, setFrame] = useState<PreviewFrame>("mobile");
  const [copied, setCopied] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const stats = useMemo(() => textStats(text), [text]);
  const selectedSlice = text.slice(
    Math.min(selection.start, selection.end),
    Math.max(selection.start, selection.end),
  );

  const getActiveEditor = useCallback(() => {
    const preview = previewEditorRef.current;
    const main = textareaRef.current;
    if (preview && document.activeElement === preview) return preview;
    if (main && document.activeElement === main) return main;
    return main ?? preview;
  }, []);

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
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <section className="flex flex-col gap-4 rounded-[2rem] border border-black/[0.05] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.14)] md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold tracking-tight text-mondy-ink/50">
              {stats.chars} chars · {stats.words} words · {stats.readingLabel} reading time
            </p>
            <button
              type="button"
              onClick={onCopyPost}
              disabled={!text}
              className={cn(
                mondyBtn.primaryLg,
                "inline-flex items-center gap-2 !px-5 !py-2.5 !text-sm",
                !text && "pointer-events-none opacity-40",
              )}
            >
              {copied ? <Check className="size-4" strokeWidth={2.5} /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy post"}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {TOOLBAR_STYLES.map(({ style, sample }) => {
              const active = selectedSlice.length > 0 && styleIsApplied(selectedSlice, style);
              return (
                <button
                  key={style}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyToolbarStyle(style)}
                  title={`${TEXT_STYLE_LABELS[style]} — select text, then click. Click again to remove.`}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-bold tracking-tight transition-colors",
                    active
                      ? "border-mondy-accent bg-mondy-accent text-white"
                      : "border-black/[0.06] bg-mondy-surface text-mondy-ink hover:border-mondy-accent/40 hover:bg-secondary-50",
                  )}
                >
                  <span className="font-normal leading-none">{sample}</span>
                  <span className="hidden sm:inline">{TEXT_STYLE_LABELS[style]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
              Point breakers
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
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
                      "inline-flex size-9 items-center justify-center rounded-xl border transition-colors",
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
                  className="inline-flex min-w-9 items-center justify-center rounded-full border border-black/[0.06] bg-mondy-surface px-3 py-1.5 text-[13px] font-bold tracking-tight text-mondy-ink transition-colors hover:border-mondy-coral/40 hover:bg-primary-50"
                >
                  {item.display}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs font-medium tracking-tight text-mondy-ink/40">
            Type in the editor or directly in the preview. Select text, then use a list or style.
            Click again to remove. Point breakers start a new line.
          </p>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSelect={syncSelection}
            onKeyUp={syncSelection}
            onClick={syncSelection}
            placeholder="Type your LinkedIn post here..."
            rows={12}
            className="w-full resize-y rounded-[1.5rem] border border-black/[0.06] bg-mondy-surface px-5 py-4 text-[16px] leading-relaxed tracking-tight text-mondy-ink outline-none placeholder:text-mondy-ink/30 focus:border-mondy-accent/50 focus:ring-2 focus:ring-mondy-accent/20"
          />
        </section>

        <aside className="flex flex-col gap-4 rounded-[2rem] border border-black/[0.05] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.14)] md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold tracking-[-0.04em] text-mondy-ink">Live preview</h2>
            <div className="inline-flex rounded-full bg-mondy-surface p-1">
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
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
                LinkedIn profile URL
              </span>
              <p className="text-xs font-medium tracking-tight text-mondy-ink/45">
                Optional. Loads your name, headline, and photo into the preview.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://www.linkedin.com/in/your-name"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void loadProfile();
                    }
                  }}
                  className="min-w-0 flex-1 rounded-full border border-black/[0.06] bg-mondy-surface px-4 py-2 text-sm font-medium tracking-tight text-mondy-ink outline-none placeholder:text-mondy-ink/30 focus:border-mondy-accent/50 focus:ring-2 focus:ring-mondy-accent/20"
                />
                <button
                  type="button"
                  onClick={() => void loadProfile()}
                  disabled={profileLoading || !profileUrl.trim()}
                  className={cn(
                    mondyBtn.primaryLg,
                    "inline-flex shrink-0 items-center justify-center gap-2 !px-5 !py-2.5 !text-sm",
                    (profileLoading || !profileUrl.trim()) && "pointer-events-none opacity-40",
                  )}
                >
                  {profileLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                  {profileLoading ? "Loading" : "Load profile"}
                </button>
              </div>
            </div>
            {profileError ? (
              <p className="text-xs font-medium tracking-tight text-mondy-coral">{profileError}</p>
            ) : null}
            {profileMessage ? (
              <p className="text-xs font-medium tracking-tight text-mondy-accent-deep">{profileMessage}</p>
            ) : null}
          </div>

          <div className={cn("flex w-full", frame === "mobile" ? "justify-center" : "justify-stretch")}>
            <LinkedInPostPreview
              name={name}
              headline={headline}
              body={text}
              frame={frame}
              photoUrl={photoUrl}
              bodyTextareaRef={previewEditorRef}
              onBodyChange={setText}
              onBodySelect={syncSelection}
            />
          </div>
        </aside>
      </div>

      <StylePreviewGrid text={text} />
    </div>
  );
}
