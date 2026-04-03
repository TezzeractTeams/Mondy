import React from "react";
import { cn } from "@/lib/utils";
import { mondyLayout, mondyType } from "@/styles/mondy";
import { PricingEnterpriseCard } from "@/components/pricing/PricingEnterpriseCard";
import { PricingFreeCard } from "@/components/pricing/PricingFreeCard";
import { PricingProCard } from "@/components/pricing/PricingProCard";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative min-h-screen w-full overflow-visible bg-mondy-surface px-4 font-noah sm:px-6  md:px-12 "
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-[10%] top-[8%] h-[min(420px,55vw)] w-[min(420px,55vw)] rounded-full bg-primary-70/45 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute right-[-5%] top-[35%] h-[min(380px,50vw)] w-[min(380px,50vw)] rounded-full bg-secondary-70/40 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute top-[30%] left-[30%] h-[min(360px,45vw)] w-[min(360px,45vw)] rounded-full bg-mondy-coral/20 blur-3xl"
          aria-hidden
        />
      </div>

      <div
        className={cn(
          mondyLayout.contentMax,
          "relative z-10 mx-auto w-[80%] overflow-visible",
        )}
      >
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-16 lg:mb-20">
          <h2
            className={cn(
              mondyType.sectionHeading,
              "text-balance text-4xl sm:text-5xl md:text-6xl",
            )}
          >
            Transparent pricing, with a top-tier content partner
          </h2>
          <p className={cn(mondyType.sectionLead, "mx-auto mt-5 max-w-2xl text-balance")}>
            Simple plans tailored to how you publish—so you get consistency
            without the grind.
          </p>
        </header>

        <div className="mx-auto grid grid-cols-1 items-stretch gap-6 overflow-visible sm:gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          <PricingFreeCard />
          <PricingProCard />
          <PricingEnterpriseCard />
        </div>
      </div>
    </section>
  );
}
