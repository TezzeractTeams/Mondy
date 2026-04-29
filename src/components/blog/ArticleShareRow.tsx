"use client";

import { IconBrandFacebook, IconBrandLinkedin, IconBrandX, IconLink, IconMail } from "@tabler/icons-react";
import { useCallback, useState } from "react";

type ArticleShareRowProps = {
  /** Full absolute URL for social share endpoints and copy */
  absoluteShareUrl: string;
  mailSubject: string;
};

function shareButtonClass(active?: boolean) {
  return [
    "inline-flex size-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/80",
    "text-mondy-ink shadow-sm transition-colors hover:bg-white hover:border-black/12",
    active ? "ring-2 ring-mondy-accent/40" : "",
  ].join(" ");
}

export function ArticleShareRow({ absoluteShareUrl, mailSubject }: ArticleShareRowProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(absoluteShareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [absoluteShareUrl]);

  const encoded = encodeURIComponent(absoluteShareUrl);
  const subject = encodeURIComponent(mailSubject);
  const body = encodeURIComponent(absoluteShareUrl);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-80">Share this article</p>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className={shareButtonClass()}
          aria-label="Share on X"
        >
          <IconBrandX size={18} stroke={1.5} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className={shareButtonClass()}
          aria-label="Share on Facebook"
        >
          <IconBrandFacebook size={18} stroke={1.5} />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className={shareButtonClass()}
          aria-label="Share on LinkedIn"
        >
          <IconBrandLinkedin size={18} stroke={1.5} />
        </a>
        <a href={`mailto:?subject=${subject}&body=${body}`} className={shareButtonClass()} aria-label="Share by email">
          <IconMail size={18} stroke={1.5} />
        </a>
        <button type="button" onClick={copy} className={shareButtonClass(copied)} aria-label="Copy link">
          <IconLink size={18} stroke={1.5} />
        </button>
      </div>
      {copied ? <p className="text-xs text-mondy-accent-deep">Link copied</p> : null}
    </div>
  );
}
