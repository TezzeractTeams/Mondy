"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Check, Download, Loader2, Monitor, Moon, Smartphone, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";
import LinkedInPostPreview, {
  type PreviewFrame,
  type PreviewTheme,
} from "./LinkedInPostPreview";

const DEFAULT_BODY = `Here’s a thought worth sitting with.

Write the post the way you’d say it out loud. Line breaks do more work than extra words.

What would you add?`;

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

export default function LinkedInPostMockupGenerator() {
  const cardRef = useRef<HTMLElement>(null);
  const photoObjectUrlRef = useRef<string | null>(null);
  const [name, setName] = useState("Your Name");
  const [headline, setHeadline] = useState("Your professional headline");
  const [body, setBody] = useState(DEFAULT_BODY);
  const [photoInput, setPhotoInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [likes, setLikes] = useState("42");
  const [comments, setComments] = useState("8");
  const [reposts, setReposts] = useState("3");
  const [theme, setTheme] = useState<PreviewTheme>("light");
  const [frame, setFrame] = useState<PreviewFrame>("mobile");
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    return () => {
      if (photoObjectUrlRef.current) URL.revokeObjectURL(photoObjectUrlRef.current);
    };
  }, []);

  const applyPhotoUrl = (value: string) => {
    setPhotoInput(value);
    if (photoObjectUrlRef.current) {
      URL.revokeObjectURL(photoObjectUrlRef.current);
      photoObjectUrlRef.current = null;
    }
    const trimmed = value.trim();
    if (!trimmed) {
      setPhotoUrl(null);
      return;
    }
    setPhotoUrl(isSafePhotoUrl(trimmed) ? trimmed : null);
  };

  const onPhotoFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (photoObjectUrlRef.current) URL.revokeObjectURL(photoObjectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    photoObjectUrlRef.current = objectUrl;
    setPhotoInput("");
    setPhotoUrl(objectUrl);
  };

  const onDownload = async () => {
    const node = cardRef.current;
    if (!node || downloading) return;
    setDownloading(true);
    setDownloadError(null);
    setDownloaded(false);
    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: theme === "dark" ? "#1b1f23" : "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "linkedin-post-mockup.png";
      link.href = dataUrl;
      link.click();
      setDownloaded(true);
      window.setTimeout(() => setDownloaded(false), 1800);
    } catch {
      setDownloadError("Couldn’t export that mockup. Try again, or use a photo uploaded from your computer.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="flex flex-col gap-5 rounded-[2rem] border border-black/[0.05] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.14)] md:p-7">
        <h2 className="text-lg font-extrabold tracking-[-0.04em] text-mondy-ink">Post details</h2>

        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Profile photo URL
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
            onChange={(e) => applyPhotoUrl(e.target.value)}
            className={inputClass}
          />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => {
              onPhotoFile(e.target.files?.[0]);
              e.currentTarget.value = "";
            }}
            className="text-xs font-medium tracking-tight text-mondy-ink/55 file:mr-3 file:rounded-full file:border-0 file:bg-mondy-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-mondy-accent-deep"
          />
        </label>

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
            Headline
          </span>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Founder · sharing what actually works"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Post content
          </span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            placeholder="Write your post here..."
            className={cn(inputClass, "resize-y leading-relaxed")}
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Engagement
          </span>
          <p className="text-xs font-medium tracking-tight text-mondy-ink/45">
            Optional. Set to 0 to hide a count.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: "likes", label: "Likes", value: likes, set: setLikes },
                { id: "comments", label: "Comments", value: comments, set: setComments },
                { id: "reposts", label: "Reposts", value: reposts, set: setReposts },
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
      </section>

      <aside className="flex flex-col gap-4 rounded-[2rem] border border-black/[0.05] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.14)] md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold tracking-[-0.04em] text-mondy-ink">Live preview</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full bg-mondy-surface p-1">
              {(
                [
                  { id: "light" as const, label: "Light", icon: Sun },
                  { id: "dark" as const, label: "Dark", icon: Moon },
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
                  <Icon className="size-3.5" />
                  {label}
                </button>
              ))}
            </div>
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
        </div>

        <div
          className={cn(
            "flex w-full rounded-[1.5rem] p-4",
            frame === "mobile" ? "justify-center" : "justify-stretch",
            theme === "dark" ? "bg-[#000000]" : "bg-[#f4f2ee]",
          )}
        >
          <LinkedInPostPreview
            ref={cardRef}
            name={name}
            headline={headline}
            body={body}
            frame={frame}
            photoUrl={photoUrl}
            theme={theme}
            likes={parseCount(likes)}
            comments={parseCount(comments)}
            reposts={parseCount(reposts)}
            timestamp="Just now"
            showYou
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
            <Loader2 className="size-4 animate-spin" />
          ) : downloaded ? (
            <Check className="size-4" strokeWidth={2.5} />
          ) : (
            <Download className="size-4" />
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
