"use client";

import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";

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
        className="w-full appearance-none rounded-none border-0 bg-transparent px-2 py-3 text-center text-[15px] font-medium tracking-[-0.02em] text-mondy-ink placeholder:text-center placeholder:text-mondy-ink/35 outline-none "
      />
      <button
        type="submit"
        className={cn(
          "w-full cursor-pointer border-0 text-center text-[15px] outline-none",
          mondyBtn.primaryHeroSubmit,
        )}
      >
        Join the waitlist
      </button>
    </form>
  );
}
