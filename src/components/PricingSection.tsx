"use client";

import React, { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mondyLayout, mondyType } from "@/styles/mondy";
import { PricingEnterpriseCard } from "@/components/pricing/PricingEnterpriseCard";
import { PricingFreeCard } from "@/components/pricing/PricingFreeCard";
import { PricingProCard } from "@/components/pricing/PricingProCard";

const cardEase = [0.16, 1, 0.3, 1] as const;
const MOBILE_MAX = 767;

function useNarrowViewport() {
  const query = `(max-width: ${MOBILE_MAX}px)`;
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default function PricingSection() {
  const reduceMotion = useReducedMotion();
  const narrow = useNarrowViewport();

  const travelY = narrow ? 14 : 28;
  const duration = reduceMotion ? 0 : narrow ? 0.48 : 0.78;
  const stagger = reduceMotion ? 0 : narrow ? 0 : 0.14;
  /** Start slightly before cards enter view so motion finishes during scroll settle (mobile). */
  const viewportMargin = narrow ? "0px 0px 20% 0px" : "0px 0px -12% 0px";

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
       
      </div>

      <div
        className={cn(
          mondyLayout.contentMax,
          "relative z-10 mx-auto w-[90%] overflow-visible",
        )}
      >
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-16 lg:mb-20">
          <h2
            className={cn(
              mondyType.sectionHeading,
              "text-balance text-4xl sm:text-5xl md:text-6xl",
            )}
          >
            Simple, transparent pricing.
          </h2>
          <p className={cn(mondyType.sectionLead, "mx-auto mt-5 max-w-2xl text-balance")}>
          It now costs less than your monthly coffee
          budget to be active on social media.
          </p>
        </header>

        <div className="mx-auto grid grid-cols-1 items-stretch gap-6 overflow-visible sm:gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {(
            [
              { id: "free", node: <PricingFreeCard /> },
              { id: "pro", node: <PricingProCard /> },
              { id: "enterprise", node: <PricingEnterpriseCard /> },
            ] as const
          ).map(({ id, node }, idx) => (
            <motion.div
              key={id}
              className="h-full min-h-0"
              initial={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: travelY }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: viewportMargin }}
              transition={{
                delay: reduceMotion ? 0 : idx * stagger,
                duration,
                ease: cardEase,
              }}
            >
              {node}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
