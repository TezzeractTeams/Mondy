"use client";
import React from "react";
import Image from "next/image";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import { cn } from "@/lib/utils";
import { mondyLayout, mondyType } from "@/styles/mondy";

const founderPainLines = [
  "have no time to write.",
  "don't have the capacity for social media.",
  "can't show up consistently.",
  "are invisible online.",
] as const;

export default function ProblemStatement() {
  return (
    <div className="relative w-full min-h-[calc(100dvh/3)] bg-mondy-surface font-noah">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-[10%] top-[8%] h-[min(260px,36vw)] w-[min(260px,36vw)] rounded-full bg-secondary-70/40 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute right-[-5%] top-[15%] h-[min(240px,32vw)] w-[min(240px,32vw)] rounded-full bg-primary-70/40 blur-3xl"
          aria-hidden
        />
       
      </div>
      <section
        id="solution"
        className="relative z-10 flex min-h-[50vh] flex-col justify-center px-6 py-10 md:py-14"
      >
        <div className={cn(mondyLayout.contentMax, "text-center")}>
          <h2 className={cn(mondyType.sectionHeading, "leading-[1.05]")}>
            <span className="block text-mondy-ink">Most Founders</span>
            <TypingAnimation
              className="block text-[#7D8FE8] leading-[1.05] tracking-[-0.05em] mt-1"
              words={[...founderPainLines]}
              loop
            />
          </h2>
          <div className="mt-8 flex items-center justify-center gap-3 text-mondy-ink/35">
            <Image
              src="/logo.svg"
              alt="Mondy"
              width={142}
              height={31}
              className="h-8 w-auto"
              priority
            />
            <span className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#9A9A9A]">
              solves this
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}