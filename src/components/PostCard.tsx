"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { RotateCcw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_BODY = (
  <>
    <p className="mb-0 leading-[26px]">
      Just hosted our 14th Annual Dundie Awards. HR said it was &apos;unnecessary&apos; and &apos;a
      liability.&apos;
    </p>
    <p className="mb-0 leading-[26px]">&nbsp;</p>
    <p className="mb-0 leading-[26px]">11 employees cried. 3 walked out. 1 came back.</p>
    <p className="mb-0 leading-[26px]">&nbsp;</p>
    <p className="leading-[26px]">Engagement is up 40%. That&apos;s what she said.</p>
  </>
);

export type PostCardProps = {
  className?: string;
  name?: string;
  subtitle?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  children?: ReactNode;
};

export default function PostCard({
  className,
  name = "Michael Scott",
  subtitle = "Regional Manager, Dunder Mifflin |14x DundieWinner",
  avatarSrc = "/micprf.jpg",
  avatarAlt = "",
  children = DEFAULT_BODY,
}: PostCardProps) {
  return (
    <div className={cn("relative w-full max-w-[283px] font-sans antialiased", className)}>
      <div
        className={cn(
          "flex w-full flex-col items-start overflow-hidden rounded-[40px] bg-white pb-4",
          "border border-black/[0.06] shadow-[0_20px_40px_-12px_rgba(28,26,23,0.12)]",
        )}
      >
        <header className="relative flex h-[76px] w-full shrink-0 items-start overflow-hidden px-4 pt-4">
          <div className="flex min-h-0 min-w-0 flex-1 items-end gap-4">
            <div className="relative size-[52px] shrink-0 overflow-hidden rounded-full border border-neutral-70 bg-neutral-50">
              <Image
                src={avatarSrc}
                alt={avatarAlt}
                width={104}
                height={104}
                className="size-full object-cover object-top"
                sizes="52px"
              />
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col items-start justify-end text-neutral-80">
              <p className="w-full shrink-0 text-base font-semibold leading-[26px] tracking-tight">
                {name}
              </p>
              <p className="w-full shrink-0 overflow-hidden text-ellipsis text-[10px] font-medium leading-3 tracking-[0.3px] text-neutral-80/95">
                {subtitle}
              </p>
            </div>
          </div>
        </header>

        <div className="flex w-full shrink-0 flex-col items-start gap-3 overflow-hidden px-4 pt-2.5">
          <div className="relative h-[234px] w-full shrink-0 overflow-hidden text-lg font-normal leading-none tracking-[-0.2px] text-mondy-ink whitespace-pre-wrap">
            {children}
          </div>

          <div className="flex w-full shrink-0 items-end justify-between gap-2">
            <button
              type="button"
              tabIndex={-1}
              className="relative flex size-7 shrink-0 cursor-default items-center justify-center rounded-full bg-secondary-50 text-mondy-accent transition-colors hover:bg-secondary-60"
              aria-label="Undo"
            >
              <RotateCcw className="size-[15px]" strokeWidth={2.25} aria-hidden />
            </button>
            <div className="flex min-w-0 shrink-0 flex-wrap items-end justify-end gap-2 sm:flex-nowrap">
              <button
                type="button"
                tabIndex={-1}
                className="relative flex size-7 shrink-0 cursor-default items-center justify-center rounded-full bg-secondary-50 text-mondy-accent hover:bg-secondary-60"
                aria-label="Delete"
              >
                <Trash2 className="size-[15px]" strokeWidth={2.25} aria-hidden />
              </button>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  tabIndex={-1}
                  className="cursor-default rounded-full bg-secondary-50 px-3 py-1 text-sm font-semibold leading-6 text-mondy-accent whitespace-nowrap hover:bg-secondary-60"
                >
                  Post
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  className="cursor-default rounded-full bg-secondary-50 px-3 py-1 text-sm font-semibold leading-6 text-mondy-accent whitespace-nowrap hover:bg-secondary-60"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
