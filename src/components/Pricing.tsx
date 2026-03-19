"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section className="relative w-full bg-[#F5F3F0] py-32 px-6 md:px-12 overflow-hidden font-noah">

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
          <h2 className="text-[#1C1A17] text-4xl md:text-6xl font-extrabold tracking-[-0.05em] leading-[0.9] uppercase">
            Simple, transparent <span className="text-[#E17054]">pricing</span>
          </h2>
          <div className="flex items-center justify-center pt-8">
            <div className="bg-white rounded-full p-1.5 flex items-center gap-1 shadow-sm border border-[#1C1A17]/5">
              <button className="px-6 py-2 bg-[#E17054] text-white rounded-full text-xs font-bold tracking-widest uppercase">Monthly</button>
              <button className="px-6 py-2 bg-transparent text-[#1C1A17]/30 rounded-full text-xs font-bold tracking-widest uppercase">Yearly</button>
            </div>
          </div>
        </div>

        {/* Pricing Grid Container */}
        <div className="relative max-w-[1100px] mx-auto group/container">

          {/* Shared Base Rectangle */}
          <div className="absolute inset-0 bg-white rounded-[3rem] shadow-sm border border-black/5 z-0 hidden md:block" />

          {/* THE GRADIENT BELOW THE MIDDLE CONTAINER: 
              This only appears when the middle card (group-hover) is lifted. */}
          <div className="absolute inset-x-1/3 bottom-0 top-0 bg-gradient-to-t from-[#E17054]/20 via-transparent to-transparent opacity-0 group-hover/container:opacity-100 transition-opacity duration-500 z-[5] pointer-events-none blur-3xl rounded-full scale-x-75" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch">

            {/* Tier 1 */}
            <div className="relative p-12 flex flex-col h-full md:bg-transparent bg-white rounded-[3rem] md:rounded-none z-10 border-r border-black/[0.03]">
              <div className="space-y-8 flex-grow">
                <div className="space-y-2">
                  <p className="text-[#1C1A17] text-5xl font-extrabold tracking-[-0.05em]">$0</p>
                  <h4 className="text-[#1C1A17] text-3xl font-extrabold tracking-[-0.05em]">Free Trial(7 days)</h4>
                </div>
                <p className="text-[#1C1A17]/50 text-base font-medium tracking-[-0.05em]">No credit card required. One platform. One week of content.</p>
              </div>
              <button className="mt-12 w-full py-5 bg-[#708FDB] text-white rounded-full text-lg font-bold tracking-[-0.05em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#708FDB]/20">Try Mondy</button>
            </div>

            {/* Tier 2: Pro (The Lifting One) */}
            <motion.div
              whileHover={{ y: -35, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative bg-[#E17054] rounded-[3rem] p-12 flex flex-col py-16 z-20 shadow-2xl shadow-[#E17054]/40 border border-[#E17054] -mx-px"
            >
              <div className="absolute top-6 right-8">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/80">MOST POPULAR</span>
              </div>
              <div className="space-y-8 flex-grow text-white">
                <div className="space-y-3">
                  <p className="text-6xl font-extrabold tracking-[-0.05em]">$25</p>
                  <h4 className="text-4xl font-extrabold tracking-[-0.05em]">Pro</h4>
                </div>
                <p className="text-white/80 text-lg font-medium tracking-[-0.05em]">Everything. All platforms. Full weekly Run. Your voice, consistently.</p>
              </div>
              <button className="mt-12 w-full py-5 bg-white text-[#E17054] rounded-full text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">Select Pro</button>
            </motion.div>

            {/* Tier 3 */}
            <div className="relative p-12 flex flex-col h-full md:bg-transparent bg-white rounded-[3rem] md:rounded-none z-10 border-l border-black/[0.03]">
              <div className="space-y-8 flex-grow">
                <div className="space-y-2">
                  <p className="text-[#1C1A17] text-5xl font-extrabold tracking-[-0.05em]">$260</p>
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