"use client";

import { forwardRef } from "react";
import {
  IconBookmark,
  IconDots,
  IconHeart,
  IconHeartFilled,
  IconInfoCircle,
  IconMessageCircle,
  IconRepeat,
  IconRosetteDiscountCheckFilled,
  IconUpload,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type TweetTheme = "light" | "dim" | "dark";
export type TweetFrame = "mobile" | "desktop";

export type TweetPreviewProps = {
  name: string;
  username: string;
  body: string;
  frame: TweetFrame;
  photoUrl?: string | null;
  tweetImageUrl?: string | null;
  theme?: TweetTheme;
  verified?: boolean;
  replies?: number;
  reposts?: number;
  likes?: number;
  views?: number;
  liked?: boolean;
  reposted?: boolean;
  time?: string;
  date?: string;
  device?: string;
  factCheck?: string | null;
  emptyPlaceholder?: string;
};

const THEMES: Record<
  TweetTheme,
  {
    bg: string;
    border: string;
    text: string;
    muted: string;
    divider: string;
    noteBg: string;
    noteBorder: string;
    blue: string;
  }
> = {
  light: {
    bg: "#ffffff",
    border: "#eff3f4",
    text: "#0f1419",
    muted: "#536471",
    divider: "#eff3f4",
    noteBg: "#f7f9f9",
    noteBorder: "#cfd9de",
    blue: "#1d9bf0",
  },
  dim: {
    bg: "#15202b",
    border: "#38444d",
    text: "#f7f9f9",
    muted: "#8b98a5",
    divider: "#38444d",
    noteBg: "#1e2732",
    noteBorder: "#38444d",
    blue: "#1d9bf0",
  },
  dark: {
    bg: "#000000",
    border: "#2f3336",
    text: "#e7e9ea",
    muted: "#71767b",
    divider: "#2f3336",
    noteBg: "#16181c",
    noteBorder: "#2f3336",
    blue: "#1d9bf0",
  },
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "M";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function handleFromUsername(username: string): string {
  const trimmed = username.trim().replace(/^@+/, "");
  return trimmed || "username";
}

export function formatTweetCount(value: number): string {
  const n = Math.max(0, Math.floor(value));
  if (n < 1_000) return String(n);
  if (n < 10_000) return n.toLocaleString("en-US");
  if (n < 1_000_000) {
    const k = n / 1_000;
    const rounded = k >= 100 ? k.toFixed(0) : k.toFixed(1).replace(/\.0$/, "");
    return `${rounded}K`;
  }
  const m = n / 1_000_000;
  const rounded = m >= 100 ? m.toFixed(0) : m.toFixed(1).replace(/\.0$/, "");
  return `${rounded}M`;
}

const TOKEN_SPLIT_RE = /((?:https?:\/\/|www\.)[^\s]+|@[A-Za-z0-9_]+|#[A-Za-z0-9_]+)/g;
const TOKEN_TEST_RE = /^(?:https?:\/\/|www\.)[^\s]+$|^@[A-Za-z0-9_]+$|^#[A-Za-z0-9_]+$/;

function TweetBodyText({ text, accent }: { text: string; accent: string }) {
  const parts = text.split(TOKEN_SPLIT_RE);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (TOKEN_TEST_RE.test(part)) {
          return (
            <span key={i} style={{ color: accent }}>
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const ACTION_ICON = { size: 22, stroke: 2 } as const;

const TweetPreview = forwardRef<HTMLElement, TweetPreviewProps>(function TweetPreview(
  {
    name,
    username,
    body,
    frame,
    photoUrl,
    tweetImageUrl,
    theme = "light",
    verified = true,
    replies = 0,
    reposts = 0,
    likes = 0,
    views = 0,
    liked = false,
    reposted = false,
    time = "4:17 PM",
    date = "Sep 4, 2026",
    device = "Twitter for iPhone",
    factCheck = null,
    emptyPlaceholder = "What’s happening?",
  },
  ref,
) {
  const colors = THEMES[theme];
  const initials = initialsFromName(name);
  const handle = handleFromUsername(username);
  const empty = body.trim() === "";
  const displayBody = empty ? emptyPlaceholder : body;
  const showStats = replies > 0 || reposts > 0 || likes > 0 || views > 0;
  const likeColor = liked ? "#f91880" : colors.muted;
  const repostColor = reposted ? "#00ba7c" : colors.muted;

  const stats = (
    [
      { value: replies, label: replies === 1 ? "Reply" : "Replies" },
      { value: reposts, label: reposts === 1 ? "Repost" : "Reposts" },
      { value: likes, label: likes === 1 ? "Like" : "Likes" },
      { value: views, label: views === 1 ? "View" : "Views" },
    ] as const
  ).filter((item) => item.value > 0);

  return (
    <article
      ref={ref}
      className={cn(
        "tweet-preview-type w-full overflow-hidden rounded-2xl border text-left tracking-normal antialiased",
        frame === "mobile" ? "max-w-[390px]" : "max-w-[566px]",
      )}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
        fontFamily:
          'TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
      aria-label="Tweet preview"
    >
      <header className="flex items-start gap-3 px-4 pt-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-[15px] font-bold leading-none text-white"
          style={{ backgroundColor: "#536471" }}
          aria-hidden
        >
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- preview may be a remote or blob URL
            <img src={photoUrl} alt="" className="size-full object-cover object-top" />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-0.5">
            <span className="truncate text-[15px] font-bold leading-5">{name || "Your name"}</span>
            {verified ? (
              <IconRosetteDiscountCheckFilled
                size={18}
                className="shrink-0"
                style={{ color: colors.blue }}
                aria-label="Verified"
              />
            ) : null}
          </div>
          <p className="truncate text-[15px] leading-5" style={{ color: colors.muted }}>
            @{handle}
          </p>
        </div>
        <span className="mt-0.5 p-1" style={{ color: colors.muted }} aria-hidden>
          <IconDots size={20} stroke={1.75} />
        </span>
      </header>

      <div className="px-4 pb-3 pt-3">
        <p
          className={cn(
            "whitespace-pre-wrap break-words text-[17px] font-normal leading-6",
            empty && "min-h-[4.5rem]",
          )}
          style={{ color: empty ? colors.muted : colors.text }}
        >
          {empty ? displayBody : <TweetBodyText text={displayBody} accent={colors.blue} />}
        </p>
      </div>

      {tweetImageUrl ? (
        <div className="px-4 pb-3">
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: colors.border }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- preview may be a remote or blob URL */}
            <img src={tweetImageUrl} alt="" className="max-h-[420px] w-full object-cover" />
          </div>
        </div>
      ) : null}

      {factCheck?.trim() ? (
        <div className="px-4 pb-3">
          <div
            className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
            style={{ backgroundColor: colors.noteBg, borderColor: colors.noteBorder }}
          >
            <IconInfoCircle size={18} stroke={1.75} className="shrink-0" />
            <p className="min-w-0 flex-1 truncate text-[15px] leading-5" style={{ color: colors.blue }}>
              {factCheck.trim()}
            </p>
          </div>
        </div>
      ) : null}

      <p className="px-4 pb-4 text-[15px] leading-5" style={{ color: colors.muted }}>
        <span>{time}</span>
        <span> · </span>
        <span>{date}</span>
        {device.trim() ? (
          <>
            <span> · </span>
            <span style={{ color: colors.blue }}>{device.trim()}</span>
          </>
        ) : null}
      </p>

      {showStats ? (
        <>
          <div className="mx-4 border-t" style={{ borderColor: colors.divider }} />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-4">
            {stats.map((item) => (
              <p key={item.label} className="text-[15px] leading-5">
                <span className="font-bold">{formatTweetCount(item.value)}</span>{" "}
                <span style={{ color: colors.muted }}>{item.label}</span>
              </p>
            ))}
          </div>
        </>
      ) : null}

      <div className="mx-4 border-t" style={{ borderColor: colors.divider }} />

      <div className="flex items-center justify-between px-6 py-2.5" style={{ color: colors.muted }}>
        <span aria-hidden>
          <IconMessageCircle {...ACTION_ICON} />
        </span>
        <span aria-hidden style={{ color: repostColor }}>
          <IconRepeat {...ACTION_ICON} />
        </span>
        <span aria-hidden style={{ color: likeColor }}>
          {liked ? (
            <IconHeartFilled size={22} />
          ) : (
            <IconHeart {...ACTION_ICON} />
          )}
        </span>
        <span aria-hidden>
          <IconBookmark {...ACTION_ICON} />
        </span>
        <span aria-hidden>
          <IconUpload {...ACTION_ICON} />
        </span>
      </div>
    </article>
  );
});

export default TweetPreview;
export { THEMES as TWEET_THEMES };
