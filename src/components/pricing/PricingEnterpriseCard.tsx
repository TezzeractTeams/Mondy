import React from "react";
import { Briefcase, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CARD_RADIUS,
  INNER_RADIUS_TB_CLASS,
  SIDE_OUTER_LAYOUT,
  SIDE_OUTER_STROKE,
  SIDE_OUTER_SURFACE,
} from "./pricing-styles";

export function PricingEnterpriseCard() {
  const topPanelClass = cn(
    "w-full shrink-0 border-b border-mondy-ink/[0.07] bg-white px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7",
    INNER_RADIUS_TB_CLASS,
  );

  return (
    <div
      className={cn(
        SIDE_OUTER_LAYOUT,
        SIDE_OUTER_SURFACE,
        SIDE_OUTER_STROKE,
        CARD_RADIUS,
      )}
    >
      <div className="flex h-full min-h-0 flex-col bg-[#F6F8FF]">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className={topPanelClass}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-tight text-mondy-ink/70">
                <Briefcase className="size-4 text-mondy-ink/50" strokeWidth={1.75} />
                <span>For your whole team</span>
              </div>
            </div>

            <h3 className="mt-5 font-waffle text-3xl font-medium tracking-tight text-mondy-ink sm:mt-6 sm:text-4xl">
              Enterprise
            </h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-mondy-ink/50 sm:text-[15px]">
            Everything in Pro, for everyone on your team who needs to show up online.
            </p>

            <div className="mt-8 flex flex-col gap-5 sm:mt-10  sm:flex-row sm:items-end sm:justify-between">
              <button
                type="button"
                className={cn(
                  "shrink-0 rounded-full border border-mondy-ink/20 bg-white px-6 py-3 text-sm font-bold text-mondy-ink",
                  "transition-all hover:border-mondy-ink/35 hover:bg-neutral-50 active:scale-[0.98]",
                )}
              >
                Contact us
              </button>
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-mondy-ink/40">
                  Pricing
                </p>
                <p className="text-2xl font-extrabold tracking-tight text-mondy-ink sm:text-3xl">
                  Custom
                </p>
                <p className="mt-1 max-w-[220px] text-[11px] font-medium  text-mondy-ink/45 sm:ml-auto sm:text-right">
                Reach out and we'll sort it
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm font-medium leading-snug text-mondy-ink/55">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>Multiple Pro seats
                </span>
              </li>
              <li className="flex gap-3 text-sm font-medium leading-snug text-mondy-ink/55">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>Each person gets their own voice
                </span>
              </li>
              
              <li className="flex gap-3 text-sm font-medium leading-snug text-mondy-ink/55">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>One place to manage everyone
                </span>
              </li>
              <li className="flex gap-3 text-sm font-medium leading-snug text-mondy-ink/55">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>Immediate start after checkout</span>
              </li>
            </ul>
          </div>
          <div className="min-h-0 flex-1" aria-hidden />
        </div>
      </div>
    </div>
  );
}
