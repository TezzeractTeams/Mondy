"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#F5F3F0] overflow-hidden flex items-center justify-center">

      {/* Voice Ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 1.5,
              ease: "easeInOut",
            }}
            style={{
              width: `${index * 350}px`,
              height: `${index * 350}px`,
            }}
            className="absolute border-[0.5px] border-[#E17054] rounded-full"
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-12 py-20">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#E17054]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center">

          {/* Left */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] border border-white/50 max-w-[240px]"
            >
              <div className="w-12 h-12 bg-[#E17054]/10 rounded-2xl flex items-center justify-center mb-4 text-[#E17054]">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <p className="text-sm md:text-base font-semibold text-[#1C1A17] tracking-[-0.05em] leading-[1.2]">
                The ultimate content hack is here.
              </p>
            </motion.div>
          </div>

          {/* Center */}
          <div className="lg:col-span-6 flex flex-col items-center text-center order-1 lg:order-2">

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-[88px] font-extrabold text-[#1C1A17] tracking-[-0.05em] leading-[0.95] z-20 relative"
            >
              Talk for 10 minutes. <br />
              A full week of content, done.
            </motion.h1>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full max-w-[320px] md:max-w-[380px] -mt-12 md:-mt-20 lg:-mt-28 z-10"
            >
              <div className="relative bg-[#1C1A17] rounded-[3.5rem] border-[10px] border-[#1C1A17] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] overflow-hidden">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20" />

                <div className="w-full aspect-[9/19.5] bg-[#F5F3F0] rounded-[2.2rem] p-6 flex flex-col items-center justify-center space-y-8">
                  <div className="w-full h-1/2 bg-[#1C1A17]/5 rounded-3xl" />
                  <div className="w-16 h-16 bg-[#708FDB] rounded-full flex items-center justify-center shadow-lg shadow-[#708FDB]/20">
                    <div className="w-6 h-6 bg-white rounded-sm rotate-45" />
                  </div>
                  <div className="w-4/5 h-3 bg-[#1C1A17]/10 rounded-full" />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end order-3 mt-10 lg:mt-0">
            <div className="lg:col-span-3 flex flex-col items-end order-3 mt-10 lg:mt-0">
              <div className="flex flex-col items-end text-right max-w-[300px]">

                {/* Profile card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-20 h-20 bg-white rounded-3xl mb-8 overflow-hidden shadow-sm border border-black/5"
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#E17054]/20 to-transparent flex items-end justify-center">
                    <div className="w-14 h-14 bg-[#E17054]/40 rounded-full translate-y-4" />
                  </div>
                </motion.div>

                {/* Body text */}
                <p className="text-lg text-[#1C1A17]/80 font-medium tracking-[-0.05em] leading-[1.2] mb-4">
                  Drop a voice memo. Mondy writes content in your voice; platform by platform, post by post.
                </p>

                {/* Buttons aligned with body text */}
                <div className="flex flex-row gap-3 w-full justify-end">
                  <button className="bg-[#708FDB] text-white px-5 py-3 rounded-full text-sm font-bold shadow-md shadow-[#708FDB]/10 hover:brightness-110 transition-all active:scale-95 whitespace-nowrap">
                    App Store
                  </button>
                  <button className="bg-white/50 backdrop-blur-sm text-[#1C1A17] border border-black/10 px-5 py-3 rounded-full text-sm font-bold hover:bg-white transition-all active:scale-95 whitespace-nowrap">
                    Google Play
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}