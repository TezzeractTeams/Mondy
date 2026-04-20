"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_NAME,
  getClientCookie,
  parseConsentCookie,
  setConsentCookie,
  type CookieConsentLevel,
} from "@/lib/cookies";
import { mondyBtn } from "@/styles/mondy";
import { cn } from "@/lib/utils";

const secondaryBtn = cn(
  "rounded-full px-3.5 py-2 text-xs font-bold tracking-tight",
  "border border-mondy-ink/15 bg-white/80 text-mondy-ink",
  "hover:bg-white hover:border-mondy-ink/25 active:scale-95 transition",
);

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw = getClientCookie(COOKIE_CONSENT_NAME);
    setVisible(parseConsentCookie(raw) === null);
  }, []);

  function choose(level: CookieConsentLevel) {
    setConsentCookie(level);
    setVisible(false);
    document.dispatchEvent(new Event(COOKIE_CONSENT_CHANGED_EVENT));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-3 left-1/2 z-[100] w-[min(20rem,calc(100vw-1.5rem))] -translate-x-1/2 pointer-events-none sm:bottom-4 sm:left-auto sm:right-4 sm:translate-x-0 sm:w-[min(22rem,calc(100vw-2rem))]"
    >
      <div
        className={cn(
          "pointer-events-auto relative w-full overflow-hidden rounded-2xl",
          "border border-white/50 ring-1 ring-black/[0.06]",
          "bg-gradient-to-b from-white/80 via-white/50 to-white/35 backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_8px_40px_-8px_rgb(0_0_0/0.08),0_4px_24px_-4px_rgb(112_143_219/0.14),inset_0_1px_0_0_rgb(255_255_255/0.7)]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,transparent_40%)]",
        )}
      >
        <div
          className={cn(
            "relative z-10 flex flex-col gap-3 p-4",
          )}
        >
          <p className="text-mondy-ink/80 text-xs sm:text-sm font-medium leading-relaxed tracking-tight">
            We use cookies to remember your choices and to improve the site.
            Essential cookies are required; you can accept optional cookies for
            analytics and similar features. See our{" "}
            <Link
              href="/privacy"
              className="text-mondy-accent font-semibold underline decoration-mondy-accent/30 underline-offset-2 hover:decoration-mondy-accent"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex flex-shrink-0 flex-wrap items-center gap-2 justify-end">
            <button type="button" className={secondaryBtn} onClick={() => choose("essential")}>
              Essential only
            </button>
            <button
              type="button"
              className={cn(mondyBtn.navDesktop, "!py-2 !px-3.5 !text-xs")}
              onClick={() => choose("all")}
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
