"use client";

import { cn } from "@/lib/utils";

type HeroWaitlistCardProps = {
  className?: string;
};

/**
 * Compact waitlist card: white elevated shell, centered email field, inset pill CTA.
 */
export default function HeroWaitlistCard({ className }: HeroWaitlistCardProps) {
  return (
    <form
      action="/infopage"
      method="get"
      className={cn(
        "flex w-[130%] flex-col rounded-3xl border border-black/[0.06] bg-white  ",
        className,
      )}
    >
      <label htmlFor="hero-waitlist-email" className="sr-only">
        Your email address
      </label>
      <input
        id="hero-waitlist-email"
        type="email"
        name="email"
        placeholder="Your email address"
        autoComplete="email"
        className="w-full appearance-none rounded-none border-0 bg-transparent px-2 py-3 text-center text-[15px] font-medium tracking-[-0.02em] text-[#1C1A17] placeholder:text-center placeholder:text-[#1C1A17]/35 outline-none "
      />
      <button
        type="submit"
        className="w-full cursor-pointer rounded-2xl border-0 bg-[#708FDB] py-3.5 text-center text-[15px] font-bold  text-white shadow-[0_3px_10px_rgba(112,143,219,0.45),0_6px_20px_-4px_rgba(112,143,219,0.28)]  outline-none transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-[#708FDB] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Join the waitlist
      </button>
    </form>
  );
}
