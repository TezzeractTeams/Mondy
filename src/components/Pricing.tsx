"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // Pricing Data
  const prices = {
    free: { monthly: 0, yearly: 0 },
    pro: { monthly: 49, yearly: 39 }, // Example: $39/mo if billed yearly
    enterprise: { monthly: 260, yearly: 210 },
  };

  return (
    <section id="pricing" className="relative w-full bg-[#F5F3F0] py-32 px-6 md:px-12 overflow-hidden font-noah">

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
            className="absolute border-[0.5px] border-[#E17054] rounded-full"
          />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-[#1C1A17] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.05em] leading-[0.9] px-4">
            Simple, Transparent <span className="text-[#E17054]">Pricing</span>
          </h2>

          {/* Toggle Switch — equal-width segments; pill animates x only (fixed width) */}
          <div className="flex flex-col items-center justify-center pt-8 gap-4">
            <div className="relative inline-block rounded-full bg-white p-1.5 shadow-sm border border-[#1C1A17]/5">
              <motion.div
                className="absolute top-1.5 bottom-1.5 left-1.5 z-0 w-[calc(50%-8px)] rounded-full bg-[#E17054]"
                initial={false}
                animate={{
                  x: billingCycle === "monthly" ? 0 : "calc(100% + 0.25rem)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <div className="relative z-10 grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-8 py-2.5 rounded-full text-center text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${billingCycle === "monthly" ? "text-white" : "text-[#1C1A17]/30"}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-8 py-2.5 rounded-full text-center text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${billingCycle === "yearly" ? "text-white" : "text-[#1C1A17]/30"}`}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="flex min-h-[1.125rem] items-center justify-center">
              <motion.span
                initial={false}
                animate={{
                  opacity: billingCycle === "yearly" ? 1 : 0,
                  y: billingCycle === "yearly" ? 0 : -4,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="text-[#E17054] text-[10px] font-bold uppercase tracking-widest"
                aria-hidden={billingCycle === "monthly"}
              >
                ✨ Save up to 20% with yearly billing
              </motion.span>
            </div>
          </div>
        </div>

        {/* Pricing Grid Container */}
        <div className="relative max-w-[1100px] mx-auto group/container">
          <div className="absolute inset-0 bg-white rounded-[3rem] shadow-sm border border-black/5 z-0 hidden md:block" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-0 items-stretch">

            {/* Tier 1 */}
            <div className="relative p-8 md:p-12 flex flex-col h-full md:bg-transparent bg-white rounded-[2.5rem] md:rounded-none z-10 md:border-r border-black/[0.03]">
              <div className="space-y-8 flex-grow">
                <div className="space-y-2">
                  <div className="overflow-hidden h-14">
                    <motion.p
                      key={billingCycle}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-[#1C1A17] text-5xl font-extrabold tracking-[-0.05em]"
                    >
                      ${prices.free[billingCycle]}
                    </motion.p>
                  </div>
                  <h4 className="text-[#1C1A17] text-3xl font-extrabold tracking-[-0.05em]">Free Trial</h4>
                </div>
                <p className="text-[#1C1A17]/50 text-base font-medium tracking-[-0.05em]">No credit card required. One platform. One week of content.</p>
              </div>
              <button className="mt-12 w-full py-5 bg-[#708FDB] text-white rounded-full text-lg font-bold tracking-[-0.05em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#708FDB]/20">Try Mondy</button>
            </div>

            {/* Tier 2: Pro */}
            <motion.div
              whileHover={{ y: -35, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative bg-[#E17054] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col py-12 md:py-16 z-20 shadow-2xl shadow-[#E17054]/40 border border-[#E17054] md:-mx-px col-span-1 md:col-span-2 lg:col-span-1"
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
              <button className="mt-12 w-full py-5 bg-white text-[#E17054] rounded-full text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">Select Pro</button>
            </motion.div>

            {/* Tier 3: Enterprise */}
            <div className="relative p-8 md:p-12 flex flex-col h-full md:bg-transparent bg-white rounded-[2.5rem] md:rounded-none z-10 md:border-l border-black/[0.03] col-span-1 md:col-span-2 lg:col-span-1">
              <div className="space-y-8 flex-grow">
                <div className="space-y-2">
                  <div className="overflow-hidden h-14">
                    <motion.p
                      key={billingCycle}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-[#1C1A17] text-5xl font-extrabold tracking-[-0.05em]"
                    >
                      ${prices.enterprise[billingCycle]}
                    </motion.p>
                  </div>
                  <h4 className="text-[#1C1A17] text-3xl font-extrabold tracking-[-0.05em]">Enterprise</h4>
                </div>
                <p className="text-[#1C1A17]/50 text-base font-medium tracking-[-0.05em]">For teams, agencies, or operators running content for more than one founder.</p>
              </div>
              <button className="mt-12 w-full py-5 bg-[#708FDB] text-white rounded-full text-lg font-bold tracking-[-0.05em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#708FDB]/20">Contact Us</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}