"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mondyBtn, mondyLayout, mondyType } from "@/styles/mondy";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  // Pricing Data
  const prices = {
    free: { monthly: 0, yearly: 0 },
    pro: { monthly: 49, yearly: 39 }, // Example: $39/mo if billed yearly
    enterprise: { monthly: 260, yearly: 210 },
  };

  return (
    <section id="pricing" className="relative w-full bg-mondy-surface py-32 px-6 md:px-12 overflow-hidden font-noah">

      {/* Background Ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: index * 2.5,
              ease: "easeInOut",
            }}
            style={{ width: `${index * 800}px`, height: `${index * 800}px` }}
            className="absolute border-[0.5px] border-mondy-coral rounded-full"
          />
        ))}
      </div>

      <div className={cn(mondyLayout.contentMax, "relative z-10")}>

        {/* Header */}
        <div className="text-center mb-24 space-y-4">
          <h2 className={cn(mondyType.sectionHeading, "px-4")}>
            Simple, Transparent <span className="text-mondy-coral">Pricing</span>
          </h2>

          {/* Toggle Switch */}
          <div className="flex flex-col items-center justify-center pt-8 gap-4">
            <div className="bg-white rounded-full p-1.5 flex gap-1 shadow-sm border border-mondy-ink/5 relative">
              {/* One segment width = 50% − 8px (half of horizontal padding 12px + gap 4px) */}
              <motion.div
                className="pointer-events-none absolute top-1.5 bottom-1.5 z-0 rounded-full bg-mondy-coral"
                style={{ width: "calc(50% - 8px)" }}
                initial={false}
                animate={{
                  left: billingCycle === "yearly" ? 6 : "calc(50% + 2px)",
                }}
                transition={{ type: "tween", duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`relative z-10 flex min-h-[42px] min-w-0 flex-1 items-center justify-center rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${billingCycle === "yearly" ? "text-white" : "text-mondy-ink/30"}`}
              >
                Yearly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`relative z-10 flex min-h-[42px] min-w-0 flex-1 items-center justify-center rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${billingCycle === "monthly" ? "text-white" : "text-mondy-ink/30"}`}
              >
                Monthly
              </button>
            </div>
            {billingCycle === "yearly" && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-mondy-coral text-[10px] font-bold uppercase tracking-widest"
              >

              </motion.span>
            )}
          </div>
        </div>

        {/* Pricing Grid Container */}
        <div className="relative max-w-[1100px] mx-auto group/container">
          <div className="absolute inset-0 bg-white rounded-mondy-card shadow-sm border border-black/5 z-0 hidden md:block" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-0 items-stretch">

            {/* Tier 1 */}
            <div className="relative p-8 md:p-12 flex flex-col h-full md:bg-transparent bg-white rounded-mondy-inner md:rounded-none z-10 md:border-r border-black/[0.03]">
              <div className="space-y-8 flex-grow">
                <div className="space-y-2">
                  <div className="overflow-hidden h-14">
                    <motion.p
                      key={billingCycle}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-mondy-ink text-5xl font-extrabold tracking-[-0.05em]"
                    >
                      ${prices.free[billingCycle]}
                    </motion.p>
                  </div>
                  <h4 className="text-mondy-ink text-3xl font-extrabold tracking-[-0.05em]">Free Trial</h4>
                </div>
                <p className="text-mondy-ink/50 text-base font-medium tracking-[-0.05em]">No credit card required. One platform. One week of content.</p>
              </div>
              <button type="button" className={cn(mondyBtn.primaryPricing, "mt-12")}>Try Mondy</button>
            </div>

            {/* Tier 2: Pro */}
            <motion.div
              whileHover={{ y: -35, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative bg-mondy-coral rounded-mondy-inner md:rounded-mondy-card p-8 md:p-12 flex flex-col py-12 md:py-16 z-20 shadow-2xl shadow-mondy-coral/40 border border-mondy-coral md:-mx-px col-span-1 md:col-span-2 lg:col-span-1"
            >
              <div className="absolute top-6 right-8">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/80">MOST POPULAR</span>
              </div>
              <div className="space-y-8 flex-grow text-white">
                <div className="space-y-3">
                  <div className="overflow-hidden h-16">
                    <motion.p
                      key={billingCycle}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-6xl font-extrabold tracking-[-0.05em]"
                    >
                      ${prices.pro[billingCycle]}
                    </motion.p>
                  </div>
                  <h4 className="text-4xl font-extrabold tracking-[-0.05em]">Pro</h4>
                </div>
                <p className="text-white/80 text-lg font-medium tracking-[-0.05em]">Everything. All platforms. Full weekly Run. Your voice, consistently.</p>
              </div>
              <button type="button" className="mt-12 w-full py-5 bg-white text-mondy-coral rounded-full text-lg font-bold shadow-xl transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95">Select Pro</button>
            </motion.div>

            {/* Tier 3: Enterprise */}
            <div className="relative p-8 md:p-12 flex flex-col h-full md:bg-transparent bg-white rounded-mondy-inner md:rounded-none z-10 md:border-l border-black/[0.03] col-span-1 md:col-span-2 lg:col-span-1">
              <div className="space-y-8 flex-grow">
                <div className="space-y-2">
                  <div className="overflow-hidden h-14">
                    <motion.p
                      key={billingCycle}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-mondy-ink text-5xl font-extrabold tracking-[-0.05em]"
                    >
                      ${prices.enterprise[billingCycle]}
                    </motion.p>
                  </div>
                  <h4 className="text-mondy-ink text-3xl font-extrabold tracking-[-0.05em]">Enterprise</h4>
                </div>
                <p className="text-mondy-ink/50 text-base font-medium tracking-[-0.05em]">For teams, agencies, or operators running content for more than one founder.</p>
              </div>
              <button type="button" className={cn(mondyBtn.primaryPricing, "mt-12")}>Contact Us</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}