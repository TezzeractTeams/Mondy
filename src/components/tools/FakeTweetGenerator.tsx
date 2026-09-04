"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  IconAlertCircle,
  IconCheck,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDownload,
  IconHeart,
  IconLoader2,
  IconMoon,
  IconMoonStars,
  IconRepeat,
  IconRosetteDiscountCheck,
  IconSun,
  type TablerIcon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";
import TweetPreview, {
  TWEET_THEMES,
  type TweetFrame,
  type TweetTheme,
} from "./TweetPreview";

const DEFAULT_BODY = `Here’s a thought worth sitting with.

Write the post the way you’d say it out loud. Line breaks do more work than extra words.

What would you add? #writing`;

const inputClass =
  "w-full rounded-2xl border border-black/[0.06] bg-mondy-surface px-4 py-2.5 text-sm font-medium tracking-tight text-mondy-ink outline-none placeholder:text-mondy-ink/30 focus:border-mondy-accent/50 focus:ring-2 focus:ring-mondy-accent/20";

function parseCount(value: string): number {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, 999_999_999);
}

function isSafePhotoUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" || url.protocol === "blob:";
  } catch {
    return false;
  }
}

function formatTweetTime(hhmm: string): string {
  const [hourStr, minuteStr] = hhmm.split(":");
  const hour = Number.parseInt(hourStr ?? "0", 10);
  const minute = Number.parseInt(minuteStr ?? "0", 10);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return "4:17 PM";
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

function formatTweetDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return "Sep 4, 2026";
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Toggle({
  label,
  checked,
  onChange,
  icon: Icon,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  icon?: TablerIcon;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-left transition-all duration-200",
        checked
          ? "bg-mondy-accent/10 ring-1 ring-mondy-accent/25"
          : "bg-mondy-surface ring-1 ring-black/[0.05] hover:bg-black/[0.03]",
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
            checked ? "bg-mondy-accent text-white" : "bg-black/[0.06] text-mondy-ink/40",
          )}
        >
          <Icon size={14} stroke={2} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-mondy-ink">
        {label}
      </span>
      <SwitchTrack checked={checked} />
    </button>
  );
}

function SwitchTrack({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors duration-200",
        checked ? "bg-mondy-accent" : "bg-black/[0.12]",
      )}
    >
      <span
        className={cn(
          "block size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(28,26,23,0.2)] transition-transform duration-200 ease-out",
          checked ? "translate-x-4" : "translate-x-0",
        )}
      />
    </span>
  );
}

export default function FakeTweetGenerator() {
  const cardRef = useRef<HTMLElement>(null);
  const photoObjectUrlRef = useRef<string | null>(null);
  const imageObjectUrlRef = useRef<string | null>(null);
  const [name, setName] = useState("Your Name");
  const [username, setUsername] = useState("yourhandle");
  const [body, setBody] = useState(DEFAULT_BODY);
  const [photoInput, setPhotoInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [imageInput, setImageInput] = useState("");
  const [tweetImageUrl, setTweetImageUrl] = useState<string | null>(null);
  const [verified, setVerified] = useState(true);
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showFactCheck, setShowFactCheck] = useState(false);
  const [factCheck, setFactCheck] = useState("Get the facts about this topic");
  const [time, setTime] = useState("16:17");
  const [date, setDate] = useState("2026-09-04");
  const [device, setDevice] = useState("Twitter for iPhone");
  const [replies, setReplies] = useState("11");
  const [reposts, setReposts] = useState("24");
  const [likes, setLikes] = useState("128");
  const [views, setViews] = useState("12400");
  const [theme, setTheme] = useState<TweetTheme>("light");
  const [frame, setFrame] = useState<TweetFrame>("mobile");
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);
  const [photoFileError, setPhotoFileError] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [imageFileError, setImageFileError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photoObjectUrlRef.current) URL.revokeObjectURL(photoObjectUrlRef.current);
      if (imageObjectUrlRef.current) URL.revokeObjectURL(imageObjectUrlRef.current);
    };
  }, []);

  const applyUrl = (
    value: string,
    setInput: (v: string) => void,
    setUrl: (v: string | null) => void,
    objectUrlRef: { current: string | null },
    setFileName: (v: string | null) => void,
    setFileError: (v: string | null) => void,
  ) => {
    setInput(value);
    setFileName(null);
    setFileError(null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    const trimmed = value.trim();
    if (!trimmed) {
      setUrl(null);
      return;
    }
    setUrl(isSafePhotoUrl(trimmed) ? trimmed : null);
  };

  const onFile = (
    file: File | undefined,
    setInput: (v: string) => void,
    setUrl: (v: string | null) => void,
    objectUrlRef: { current: string | null },
    setFileName: (v: string | null) => void,
    setFileError: (v: string | null) => void,
  ) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFileError("That file isn’t an image. Try a JPG, PNG, WebP, or GIF.");
      return;
    }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setInput("");
    setUrl(objectUrl);
    setFileName(file.name);
    setFileError(null);
  };

  const onDownload = async () => {
    const node = cardRef.current;
    if (!node || downloading) return;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setDownloading(true);
    setDownloadError(null);
    setDownloaded(false);
    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: TWEET_THEMES[theme].bg,
      });
      const link = document.createElement("a");
      link.download = "tweet-mockup.png";
      link.href = dataUrl;
      link.click();
      setDownloaded(true);
      window.setTimeout(() => setDownloaded(false), 1800);
    } catch {
      setDownloadError("Couldn’t export that mockup. Try again, or use photos uploaded from your computer.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="flex flex-col gap-5 rounded-[2rem] border border-black/[0.05] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.14)] md:p-7">
        <h2 className="text-lg font-extrabold tracking-[-0.04em] text-mondy-ink">Tweet details</h2>

        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Profile photo
          </span>
          <p className="text-xs font-medium tracking-tight text-mondy-ink/45">
            Leave empty to show initials. Upload a file if you want the photo in the PNG.
          </p>
          <input
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://example.com/photo.jpg"
            value={photoInput}
            onChange={(e) =>
              applyUrl(
                e.target.value,
                setPhotoInput,
                setPhotoUrl,
                photoObjectUrlRef,
                setPhotoFileName,
                setPhotoFileError,
              )
            }
            className={inputClass}
          />
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="inline-flex cursor-pointer items-center">
              <span className="rounded-full bg-mondy-accent/10 px-3 py-1.5 text-xs font-bold tracking-tight text-mondy-accent-deep transition-colors hover:bg-mondy-accent/15">
                Choose file
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => {
                  onFile(
                    e.target.files?.[0],
                    setPhotoInput,
                    setPhotoUrl,
                    photoObjectUrlRef,
                    setPhotoFileName,
                    setPhotoFileError,
                  );
                  e.currentTarget.value = "";
                }}
                className="sr-only"
              />
            </label>
            {photoFileError ? (
              <p className="text-xs font-medium tracking-tight text-mondy-coral">{photoFileError}</p>
            ) : photoFileName ? (
              <p className="inline-flex min-w-0 items-center gap-1.5 text-xs font-semibold tracking-tight text-mondy-ink">
                <IconCheck size={14} stroke={2.5} className="shrink-0 text-mondy-accent" />
                <span className="truncate">{photoFileName} selected</span>
              </p>
            ) : (
              <p className="text-xs font-medium tracking-tight text-mondy-ink/45">No file chosen</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Hale"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
              Username
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ""))}
              placeholder="yourhandle"
              className={inputClass}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Tweet text
          </span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            placeholder="What’s happening?"
            className={cn(inputClass, "min-h-[8.5rem] resize-y")}
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Tweet image
          </span>
          <p className="text-xs font-medium tracking-tight text-mondy-ink/45">
            Optional. Upload a file if you want the image in the PNG.
          </p>
          <input
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://example.com/image.jpg"
            value={imageInput}
            onChange={(e) =>
              applyUrl(
                e.target.value,
                setImageInput,
                setTweetImageUrl,
                imageObjectUrlRef,
                setImageFileName,
                setImageFileError,
              )
            }
            className={inputClass}
          />
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="inline-flex cursor-pointer items-center">
              <span className="rounded-full bg-mondy-accent/10 px-3 py-1.5 text-xs font-bold tracking-tight text-mondy-accent-deep transition-colors hover:bg-mondy-accent/15">
                Choose file
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => {
                  onFile(
                    e.target.files?.[0],
                    setImageInput,
                    setTweetImageUrl,
                    imageObjectUrlRef,
                    setImageFileName,
                    setImageFileError,
                  );
                  e.currentTarget.value = "";
                }}
                className="sr-only"
              />
            </label>
            {imageFileError ? (
              <p className="text-xs font-medium tracking-tight text-mondy-coral">{imageFileError}</p>
            ) : imageFileName ? (
              <p className="inline-flex min-w-0 items-center gap-1.5 text-xs font-semibold tracking-tight text-mondy-ink">
                <IconCheck size={14} stroke={2.5} className="shrink-0 text-mondy-accent" />
                <span className="truncate">{imageFileName} selected</span>
              </p>
            ) : (
              <p className="text-xs font-medium tracking-tight text-mondy-ink/45">No file chosen</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Status
          </span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Toggle
              label="Verified"
              icon={IconRosetteDiscountCheck}
              checked={verified}
              onChange={setVerified}
            />
            <Toggle label="Liked" icon={IconHeart} checked={liked} onChange={setLiked} />
            <Toggle label="Reposted" icon={IconRepeat} checked={reposted} onChange={setReposted} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">Time</span>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
              Device
            </span>
            <input
              type="text"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              placeholder="Twitter for iPhone"
              className={inputClass}
            />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Engagement
          </span>
          <p className="text-xs font-medium tracking-tight text-mondy-ink/45">
            Optional. Set to 0 to hide a count.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(
              [
                { id: "replies", label: "Replies", value: replies, set: setReplies },
                { id: "reposts", label: "Reposts", value: reposts, set: setReposts },
                { id: "likes", label: "Likes", value: likes, set: setLikes },
                { id: "views", label: "Views", value: views, set: setViews },
              ] as const
            ).map((field) => (
              <label key={field.id} className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-tight text-mondy-ink/55">
                  {field.label}
                </span>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className={inputClass}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Toggle
            label="Fact-check warning"
            icon={IconAlertCircle}
            checked={showFactCheck}
            onChange={setShowFactCheck}
          />
          {showFactCheck ? (
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
                Warning text
              </span>
              <input
                type="text"
                value={factCheck}
                onChange={(e) => setFactCheck(e.target.value)}
                placeholder="Get the facts about this topic"
                className={inputClass}
              />
            </label>
          ) : null}
        </div>
      </section>

      <aside className="flex flex-col gap-4 rounded-[2rem] border border-black/[0.05] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.14)] md:p-7 lg:sticky lg:top-24">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold tracking-[-0.04em] text-mondy-ink">Live preview</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full bg-mondy-surface p-1">
              {(
                [
                  { id: "light" as const, label: "Light", icon: IconSun },
                  { id: "dim" as const, label: "Dim", icon: IconMoonStars },
                  { id: "dark" as const, label: "Dark", icon: IconMoon },
                ] as const
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-tight transition-colors",
                    theme === id ? "bg-mondy-accent text-white" : "text-mondy-ink/55 hover:text-mondy-ink",
                  )}
                >
                  <Icon className="size-3.5" stroke={2} />
                  {label}
                </button>
              ))}
            </div>
            <div className="inline-flex rounded-full bg-mondy-surface p-1">
              {(
                [
                  { id: "mobile" as const, label: "Mobile", icon: IconDeviceMobile },
                  { id: "desktop" as const, label: "Desktop", icon: IconDeviceDesktop },
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
                  <Icon className="size-3.5" stroke={2} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex w-full rounded-[1.5rem] p-4",
            frame === "mobile" ? "justify-center" : "justify-stretch",
            theme === "light" ? "bg-[#e7e9ea]" : theme === "dim" ? "bg-[#0f1923]" : "bg-[#000000]",
          )}
        >
          <TweetPreview
            ref={cardRef}
            name={name}
            username={username}
            body={body}
            frame={frame}
            photoUrl={photoUrl}
            tweetImageUrl={tweetImageUrl}
            theme={theme}
            verified={verified}
            replies={parseCount(replies)}
            reposts={parseCount(reposts)}
            likes={parseCount(likes)}
            views={parseCount(views)}
            liked={liked}
            reposted={reposted}
            time={formatTweetTime(time)}
            date={formatTweetDate(date)}
            device={device}
            factCheck={showFactCheck ? factCheck : null}
          />
        </div>

        <button
          type="button"
          onClick={() => void onDownload()}
          disabled={downloading}
          className={cn(
            mondyBtn.primaryLg,
            "inline-flex w-full items-center justify-center gap-2 !px-5 !py-3 !text-sm sm:w-auto",
            downloading && "pointer-events-none opacity-40",
          )}
        >
          {downloading ? (
            <IconLoader2 className="size-4 animate-spin" />
          ) : downloaded ? (
            <IconCheck className="size-4" stroke={2.5} />
          ) : (
            <IconDownload className="size-4" stroke={2} />
          )}
          {downloading ? "Downloading" : downloaded ? "Downloaded" : "Download as PNG"}
        </button>
        {downloadError ? (
          <p className="text-xs font-medium tracking-tight text-mondy-coral">{downloadError}</p>
        ) : (
          <p className="text-xs font-medium tracking-tight text-mondy-ink/45">
            Exports at 2× for slides and portfolios. Remote photos may be missing in the PNG unless
            you upload the file.
          </p>
        )}
      </aside>
    </div>
  );
}
