"use client";

import { forwardRef, useLayoutEffect, useRef, type Ref } from "react";
import { Globe, MessageCircle, Repeat2, Send, ThumbsUp, type LucideIcon } from "lucide-react";
import { linkedInSans } from "@/fonts/linkedin";
import { cn } from "@/lib/utils";

export type PreviewFrame = "mobile" | "desktop";
export type PreviewTheme = "light" | "dark";

export type LinkedInPostPreviewProps = {
  name: string;
  headline: string;
  body: string;
  frame: PreviewFrame;
  photoUrl?: string | null;
  theme?: PreviewTheme;
  likes?: number;
  comments?: number;
  reposts?: number;
  timestamp?: string;
  audience?: string;
  showYou?: boolean;
  emptyPlaceholder?: string;
  bodyTextareaRef?: Ref<HTMLTextAreaElement>;
  onBodyChange?: (value: string) => void;
  onBodySelect?: () => void;
};

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) return;
  if (typeof ref === "function") ref(value);
  else ref.current = value;
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "M";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatCount(value: number): string {
  return Math.max(0, Math.floor(value)).toLocaleString("en-US");
}

const LinkedInPostPreview = forwardRef<HTMLElement, LinkedInPostPreviewProps>(
  function LinkedInPostPreview(
    {
      name,
      headline,
      body,
      frame,
      photoUrl,
      theme = "light",
      likes = 57,
      comments = 24,
      reposts = 6,
      timestamp = "12h",
      audience = "public",
      showYou = false,
      emptyPlaceholder = "Type here...",
      bodyTextareaRef,
      onBodyChange,
      onBodySelect,
    },
    ref,
  ) {
    const innerBodyRef = useRef<HTMLTextAreaElement>(null);
    const editable = Boolean(onBodyChange);
    const initials = initialsFromName(name);
    const empty = body.trim() === "";
    const displayBody = empty ? emptyPlaceholder : body;
    const dark = theme === "dark";
    const showCounts = likes > 0 || comments > 0 || reposts > 0;

    useLayoutEffect(() => {
      const el = innerBodyRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.max(el.scrollHeight, 72)}px`;
    }, [body, frame, editable]);

    return (
      <article
        ref={ref}
        className={cn(
          linkedInSans.variable,
          linkedInSans.className,
          "linkedin-preview-type w-full overflow-hidden rounded-2xl border text-left tracking-normal antialiased [font-feature-settings:'kern']",
          frame === "mobile" ? "max-w-[360px]" : "max-w-[555px]",
          dark ? "border-[#ffffff14] bg-[#1b1f23]" : "border-[#e0dfdc] bg-white",
        )}
        style={{ fontFamily: linkedInSans.style.fontFamily }}
        aria-label="LinkedIn post preview"
      >
        <header className="flex items-start gap-2 px-4 pt-3">
          <div
            className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#7a8b98] text-[16px] font-semibold leading-none text-white"
            aria-hidden
          >
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- preview may be a remote or blob URL
              <img src={photoUrl} alt="" className="size-full object-cover object-top" />
            ) : (
              initials
            )}
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p
              className={cn(
                "flex min-w-0 items-baseline gap-1 text-[14px] font-semibold leading-[1.333]",
                dark ? "text-[#ffffffe6]" : "text-[#000000e6]",
              )}
            >
              <span className="truncate">{name || "Your name"}</span>
              {showYou ? (
                <span
                  className={cn(
                    "shrink-0 text-[12px] font-normal",
                    dark ? "text-[#ffffff99]" : "text-[#00000099]",
                  )}
                >
                  (You)
                </span>
              ) : null}
            </p>
            <p
              className={cn(
                "mt-px line-clamp-3 text-[12px] font-normal leading-[1.333]",
                dark ? "text-[#ffffff99]" : "text-[#00000099]",
              )}
            >
              {headline || "Your headline"}
            </p>
            <p
              className={cn(
                "mt-px inline-flex items-center gap-0.5 text-[12px] font-normal leading-[1.333]",
                dark ? "text-[#ffffff99]" : "text-[#00000099]",
              )}
            >
              {timestamp} • <Globe className="size-3" strokeWidth={2} aria-hidden />
              {audience ? ` ${audience}` : null}
            </p>
          </div>
        </header>

        <div className="px-4 pb-3 pt-2">
          {editable ? (
            <textarea
              ref={(node) => {
                innerBodyRef.current = node;
                assignRef(bodyTextareaRef, node);
              }}
              value={body}
              onChange={(e) => onBodyChange?.(e.target.value)}
              onSelect={onBodySelect}
              onKeyUp={onBodySelect}
              onClick={onBodySelect}
              placeholder={emptyPlaceholder}
              rows={3}
              aria-label="LinkedIn post text"
              className={cn(
                "w-full cursor-text resize-none overflow-hidden bg-transparent p-0 text-[14px] font-normal leading-[1.42857] outline-none",
                dark
                  ? "text-[#ffffffe6] placeholder:text-[#ffffff66]"
                  : "text-[#000000e6] placeholder:text-[#00000066]",
              )}
            />
          ) : (
            <p
              className={cn(
                "whitespace-pre-wrap break-words text-[14px] font-normal leading-[1.42857]",
                empty && "min-h-[4.5rem]",
                empty
                  ? dark
                    ? "text-[#ffffff66]"
                    : "text-[#00000066]"
                  : dark
                    ? "text-[#ffffffe6]"
                    : "text-[#000000e6]",
              )}
            >
              {displayBody}
            </p>
          )}
        </div>

        {showCounts ? (
          <div className="flex items-center justify-between px-4 pb-2">
            <p
              className={cn(
                "text-[12px] font-normal leading-none",
                dark ? "text-[#ffffff99]" : "text-[#00000099]",
              )}
            >
              {likes > 0 ? `${formatCount(likes)} likes` : ""}
            </p>
            <p
              className={cn(
                "text-[12px] font-normal leading-none",
                dark ? "text-[#ffffff99]" : "text-[#00000099]",
              )}
            >
              {[
                comments > 0 ? `${formatCount(comments)} comments` : null,
                reposts > 0 ? `${formatCount(reposts)} reposts` : null,
              ]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>
        ) : null}

        <div className={cn("mx-4 border-t", dark ? "border-[#ffffff14]" : "border-black/[0.08]")} />

        <div className="grid grid-cols-4 px-0.5">
          {(
            [
              { label: "Like", icon: ThumbsUp },
              { label: "Comment", icon: MessageCircle },
              { label: "Repost", icon: Repeat2 },
              { label: "Send", icon: Send },
            ] as const satisfies { label: string; icon: LucideIcon }[]
          ).map(({ label, icon: Icon }) => (
            <span
              key={label}
              className={cn(
                "flex items-center justify-center py-3 font-semibold",
                dark ? "text-[#ffffff99]" : "text-[#00000099]",
                frame === "mobile" ? "gap-1 text-[12px]" : "gap-1.5 text-[14px]",
              )}
            >
              <Icon className="size-[22px] shrink-0" strokeWidth={1.75} aria-hidden />
              <span>{label}</span>
            </span>
          ))}
        </div>
      </article>
    );
  },
);

export default LinkedInPostPreview;
