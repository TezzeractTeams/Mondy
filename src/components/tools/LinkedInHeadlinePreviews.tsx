"use client";

import type { ReactNode } from "react";
import { linkedInSans } from "@/fonts/linkedin";
import { cn } from "@/lib/utils";
import {
  HEADLINE_CUT,
  headlineOutsideProfile,
  splitHeadlineAtCut,
} from "@/lib/linkedinHeadline";

const LINKEDIN_BLUE = "#0a66c2";

type LinkedInHeadlinePreviewsProps = {
  headline: string;
  name?: string;
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "YN";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ name, size }: { name: string; size: "sm" | "md" }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-[#7a8b98] font-semibold leading-none text-white",
        size === "md" ? "size-12 text-[16px]" : "size-10 text-[13px]",
      )}
      aria-hidden
    >
      {initialsFromName(name)}
    </div>
  );
}

function PreviewFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">{label}</p>
      <div
        className={cn(
          linkedInSans.variable,
          linkedInSans.className,
          "overflow-hidden rounded-2xl border border-[#e0dfdc] bg-white text-left tracking-normal antialiased [font-feature-settings:'kern']",
        )}
        style={{ fontFamily: linkedInSans.style.fontFamily }}
      >
        {children}
      </div>
    </div>
  );
}

export default function LinkedInHeadlinePreviews({
  headline,
  name = "Your name",
}: LinkedInHeadlinePreviewsProps) {
  const displayName = name.trim() || "Your name";
  const line = headline.trim();
  const { visible, clipped } = splitHeadlineAtCut(line);
  const truncated = headlineOutsideProfile(line);
  const empty = line.length === 0;

  return (
    <div className="flex flex-col gap-5">
      <PreviewFrame label="On your profile">
        <div className="flex items-start gap-2 px-4 py-3">
          <Avatar name={displayName} size="md" />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[16px] font-semibold leading-[1.25] text-[#000000e6]">
              {displayName}
            </p>
            <p
              className={cn(
                "mt-0.5 rounded-md px-1 py-0.5 text-[14px] font-normal leading-[1.333]",
                empty ? "bg-mondy-accent/10 text-[#00000066]" : "bg-mondy-accent/18 text-[#000000e6]",
              )}
            >
              {empty ? (
                "Your headline"
              ) : (
                <>
                  <span>{visible}</span>
                  {clipped ? (
                    <>
                      <span
                        className="relative mx-[3px] inline-block h-[1.05em] w-px align-[-0.12em] bg-mondy-coral"
                        title={`LinkedIn cuts here, around ${HEADLINE_CUT} characters`}
                        aria-hidden
                      />
                      <span className="text-[#0000004d]">{clipped}</span>
                    </>
                  ) : null}
                </>
              )}
            </p>
          </div>
        </div>
        <p className="border-t border-[#e0dfdc] px-4 py-2 text-[12px] font-medium leading-snug text-[#00000099]">
          Past the mark, nothing is read outside your own profile.
        </p>
      </PreviewFrame>

      <PreviewFrame label="In search results">
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar name={displayName} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] font-semibold leading-[1.25]" style={{ color: LINKEDIN_BLUE }}>
              {displayName}
            </p>
            <p
              className={cn(
                "mt-px truncate rounded-md px-1 py-0.5 text-[13px] leading-[1.333]",
                empty ? "bg-mondy-accent/10 text-[#00000066]" : "bg-mondy-accent/18 text-[#00000099]",
              )}
            >
              {empty ? "Your headline" : truncated}
            </p>
            <p className="mt-px text-[12px] leading-[1.333] text-[#00000099]">2nd degree connection</p>
          </div>
          <span
            className="shrink-0 rounded-full border px-3.5 py-1 text-[14px] font-semibold leading-none"
            style={{ borderColor: LINKEDIN_BLUE, color: LINKEDIN_BLUE }}
            aria-hidden
          >
            Connect
          </span>
        </div>
      </PreviewFrame>

      <PreviewFrame label="Under a comment">
        <div className="flex items-start gap-2 px-4 py-3">
          <Avatar name={displayName} size="sm" />
          <div className="min-w-0 flex-1 rounded-2xl bg-[#f3f2ef] px-3 py-2">
            <p className="text-[14px] font-semibold leading-[1.333] text-[#000000e6]">{displayName}</p>
            <p
              className={cn(
                "truncate rounded-md px-1 py-0.5 text-[12px] leading-[1.333]",
                empty ? "bg-mondy-accent/10 text-[#00000066]" : "bg-mondy-accent/18 text-[#00000099]",
              )}
            >
              {empty ? "Your headline" : truncated}
            </p>
            <p className="mt-1.5 text-[14px] leading-[1.42857] text-[#000000e6]">
              We have been trying to name this exact problem on our team.
            </p>
          </div>
        </div>
      </PreviewFrame>
    </div>
  );
}
