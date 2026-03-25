"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Waitlist() {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 4,
    minutes: 56,
    seconds: 4,
  });

  // Simple countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#F5F3F0] pt-40 pb-60 px-6 md:px-12 overflow-hidden font-noah">

      {/* Immersive Section-Wide Ripples (Coral #E17054) - Centered behind phone */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex items-center justify-center pointer-events-none z-0">
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
            className="absolute border-[0.5px] border-[#708FDB] rounded-full"
          />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center space-y-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 relative mx-auto mb-4"
          >
            <Image 
              src="/icon.png" 
              alt="Mondy Logo" 
              fill 
              className="object-contain"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#1C1A17] text-5xl md:text-7xl font-extrabold tracking-[-0.06em] leading-[0.95] uppercase"
          >
            Get early access
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#1C1A17]/50 text-xl md:text-2xl font-medium tracking-[-0.05em] leading-[1.2]"
          >
            We're getting close. Sign up to get early access to <br className="hidden md:block" />
            Mondy and start building your viral waitlist.
          </motion.p>
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 w-full max-w-[650px]"
        >
          <div className="bg-white rounded-full p-2 pl-8 flex flex-col md:flex-row items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60">
            <div className="flex-1 flex items-center w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent border-none outline-none text-[#1C1A17] text-lg font-medium tracking-tight w-full placeholder:text-[#1C1A17]/30"
              />
            </div>
            <button className="w-full md:w-auto px-10 py-5 bg-[#708FDB] text-white rounded-full text-lg font-bold tracking-[-0.03em] transition-all hover:brightness-125 hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#708FDB]/20">
              Join the waitlist
            </button>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center gap-3"
        >
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F5F3F0] bg-[#708FDB]/10 overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br from-[#708FDB]/20 to-transparent`} />
              </div>
            ))}
          </div>
          <span className="text-[#1C1A17]/50 text-sm font-bold tracking-wide uppercase">Join +1,000 others on the waitlist</span>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center gap-4 md:gap-8"
        >
          {Object.entries(timeLeft).map(([label, value], idx) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-20 md:w-20 md:h-24 bg-white rounded-2xl border border-black/5 flex items-center justify-center shadow-sm">
                  <span className="text-3xl md:text-4xl font-extrabold text-[#1C1A17] tracking-tighter">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C1A17]/30">{label}</span>
              </div>
              {idx < 3 && <span className="text-3xl md:text-4xl font-extrabold text-[#1C1A17]/10 -mt-6">:</span>}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Visual Asset: Floating iPhone */}
        <div className="mt-32 relative w-full flex justify-center">

          {/* Main Phone Body */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[320px] md:max-w-[420px] z-10"
          >
            {/* Blue Gradient Flare behind phone */}
            <div className="absolute inset-0 bg-[#708FDB]/20 blur-[120px] rounded-full scale-150 z-0" />

            <div className="relative bg-[#1C1A17] rounded-[4rem] border-[12px] border-[#1C1A17] shadow-[0_100px_100px_-50px_rgba(112,143,219,0.3)] overflow-hidden aspect-[9/19.5]">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full z-20" />

              <div className="absolute inset-0 bg-[#F5F3F0] p-3 pt-10 flex flex-col gap-2 overflow-hidden">
                <div className="h-2.5 w-20 rounded-full bg-[#1C1A17]/8" />
                <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
                  <div className="rounded-2xl bg-white/90 border border-[#1C1A17]/6 shadow-sm p-2 flex flex-col gap-2">
                    <div className="h-2 w-10 rounded bg-[#708FDB]/25" />
                    <div className="h-8 rounded-lg bg-[#1C1A17]/5" />
                  </div>
                  <div className="rounded-2xl bg-[#708FDB]/15 border border-[#708FDB]/20 p-2 flex flex-col gap-2">
                    <div className="h-2 w-12 rounded bg-[#1C1A17]/10" />
                    <div className="flex-1 rounded-lg bg-white/50" />
                  </div>
                  <div className="col-span-2 rounded-2xl bg-white/90 border border-[#1C1A17]/6 p-3 flex flex-col gap-2">
                    <div className="flex gap-1">
                      <div className="h-1.5 flex-1 rounded bg-[#1C1A17]/8" />
                      <div className="h-1.5 flex-1 rounded bg-[#1C1A17]/8" />
                      <div className="h-1.5 flex-1 rounded bg-[#1C1A17]/8" />
                    </div>
                    <div className="h-12 rounded-xl bg-[#1C1A17]/4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Glassmorphic Cards */}

            {/* Left Card: Timer */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-20 top-20 bg-white/40 backdrop-blur-xl p-5 rounded-3xl border border-white/60 shadow-2xl flex items-center gap-4 min-w-[200px] z-30"
            >
              <div className="w-12 h-12 bg-[#708FDB] rounded-2xl flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14H11V11H13v5z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C1A17]/40">Work this week</span>
                <span className="text-xl font-extrabold text-[#1C1A17] tracking-tight">12:09:07</span>
              </div>
            </motion.div>

            {/* Right Card: Badge/Avatars */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-20 bottom-40 bg-white/40 backdrop-blur-xl p-4 pr-6 rounded-full border border-white/60 shadow-2xl flex items-center gap-3 z-30"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white/40 bg-[#1C1A17]/10 overflow-hidden" />
                ))}
              </div>
              <div className="w-8 h-8 bg-[#708FDB] rounded-full flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
