"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";

type HeroWaitlistCardProps = {
  className?: string;
};

/**
 * Compact waitlist row matching the main Waitlist section form shell.
 */
export default function HeroWaitlistCard({ className }: HeroWaitlistCardProps) {
  const [email, setEmail] = useState("");
  const emailStr = email.trim();
  const infopageHref =
    emailStr.length > 0 ? `/infopage?email=${encodeURIComponent(emailStr)}` : "/infopage";

  return (
    <div className={cn("w-full  px-4 md:px-0", className)}>
      <div className="flex flex-col items-center sm:gap-4 rounded-3xl border border-white/60 bg-white p-2 shadow-mondy-form md:flex-row md:rounded-full md:pl-8">
        <label htmlFor="hero-waitlist-email" className="sr-only">
          Your email address
        </label>
        <div className="flex w-full flex-1 items-center">
          <input
            id="hero-waitlist-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full border-none bg-transparent px-4 py-4 text-lg font-medium tracking-tight text-mondy-ink leading-[0] outline-none placeholder:text-mondy-ink/30 md:px-0 md:py-0"
          />
        </div>
        <Link
          href={infopageHref}
          className={cn(mondyBtn.primaryLg, "block w-full text-center md:w-auto")}
        >
          Join the waitlist
        </Link>
      </div>
    </div>
  );
}
