"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Star } from "lucide-react";

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
        if (prev.minutes > 0) return { ...prev, minutes: prev.seconds === 0 ? 59 : prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#F5F3F0] pt-32 pb-32 md:pb-48 px-6 md:px-12 overflow-hidden font-noah">

      {/* Immersive Section-Wide Ripples (Blue #708FDB) */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex items-center justify-center pointer-events-none z-0">
        {[1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: index * 2,
              ease: "easeInOut",
            }}
            style={{ width: `${index * 600}px`, height: `${index * 600}px` }}
            className="absolute border-[0.5px] border-[#708FDB] rounded-full"
          />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center space-y-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 relative mx-auto mb-4"
          >
            <div className="absolute inset-0 bg-[#708FDB]/20 blur-xl rounded-full" />
            <Image
              src="/icon.png"
              alt="Mondy Logo"
              fill
              className="object-contain relative z-10"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#1C1A17] text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[-0.06em] leading-[0.95]"
          >
            Get Early Access
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#1C1A17]/50 text-xl md:text-2xl font-medium tracking-[-0.05em] leading-[1.2]"
          >
            We're getting close. Sign up to get early access to <br className="hidden md:block" />
            Mondy and start building your viral presence.
          </motion.p>
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 w-full max-w-[600px] px-4 md:px-0"
        >
          <div className="bg-white rounded-3xl md:rounded-full p-2 md:pl-8 flex flex-col md:flex-row items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60">
            <div className="flex-1 flex items-center w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent border-none outline-none text-[#1C1A17] text-lg font-medium tracking-tight w-full placeholder:text-[#1C1A17]/30 px-4 md:px-0 py-4 md:py-0"
              />
            </div>
            <button className="w-full md:w-auto px-10 py-5 bg-[#708FDB] text-white rounded-full text-lg font-bold tracking-[-0.03em] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#708FDB]/20">
              Join the waitlist
            </button>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-center gap-3"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-[#F5F3F0] bg-[#708FDB]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#708FDB]/30 to-transparent" />
              </div>
            ))}
          </div>
          <span className="text-[#1C1A17]/40 text-[11px] font-bold tracking-wider uppercase">Join +1,000 others</span>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-14 flex items-center gap-2 sm:gap-4 md:gap-6"
        >
          {Object.entries(timeLeft).map(([label, value], idx) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-18 md:w-18 md:h-22 bg-white rounded-2xl border border-black/5 flex items-center justify-center shadow-sm">
                  <span className="text-2xl md:text-3xl font-extrabold text-[#1C1A17] tracking-tighter">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C1A17]/30">{label}</span>
              </div>
              {idx < 3 && <span className="text-2xl md:text-3xl font-extrabold text-[#1C1A17]/10 -mt-6">:</span>}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Visual Asset: Optimized iPhone Container */}
        <div className="mt-20 relative w-full flex justify-center">

          {/* Main Phone Body - Height and Width Balanced */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] z-10"
          >
            {/* Blue Glow Behind Phone */}
            <div className="absolute inset-0 bg-[#708FDB]/20 blur-[80px] rounded-full scale-125 z-0" />

            {/* Standard Aspect Ratio and Max-Height constraint */}
            <div className="relative bg-[#1C1A17] rounded-[3.5rem] border-[10px] border-[#1C1A17] shadow-[0_60px_100px_-30px_rgba(112,143,219,0.25)] overflow-hidden aspect-[9/18.5] max-h-[650px] mx-auto">

              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20" />

              {/* Screen Content */}
              <div className="absolute inset-0 bg-[#F5F3F0] p-4 pt-12 flex flex-col gap-3 overflow-hidden">
                <div className="h-2.5 w-16 rounded-full bg-[#1C1A17]/10" />
                <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                  <div className="rounded-2xl bg-white border border-[#1C1A17]/5 p-3 flex flex-col gap-2 h-24">
                    <div className="h-2 w-8 rounded bg-[#708FDB]/20" />
                    <div className="flex-1 rounded-lg bg-[#1C1A17]/5" />
                  </div>
                  <div className="rounded-2xl bg-[#708FDB]/10 border border-[#708FDB]/20 p-3 flex flex-col gap-2 h-24">
                    <div className="h-2 w-10 rounded bg-[#1C1A17]/10" />
                    <div className="flex-1 rounded-lg bg-white/40" />
                  </div>
                  <div className="col-span-2 rounded-2xl bg-white border border-[#1C1A17]/5 p-4 flex flex-col gap-3">
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map(i => <div key={i} className="h-1.5 flex-1 rounded bg-[#1C1A17]/5" />)}
                    </div>
                    <div className="h-24 rounded-xl bg-[#1C1A17]/4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards (Repositioned for the smaller phone) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-10 md:-left-20 top-20 bg-white/70 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-xl flex items-center gap-3 min-w-[170px] md:min-w-[200px] z-30 scale-90 md:scale-100 origin-right"
            >
              <div className="w-10 h-10 bg-[#708FDB] rounded-xl flex items-center justify-center text-white shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C1A17]/40">Production</span>
                <span className="text-lg font-extrabold text-[#1C1A17] tracking-tight">12:09:07</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-10 md:-right-20 bottom-32 bg-white/70 backdrop-blur-xl p-3 pr-6 rounded-full border border-white shadow-xl flex items-center gap-3 z-30 scale-90 md:scale-100 origin-left"
            >
              <div className="flex -space-x-2.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#708FDB]/20" />
                ))}
              </div>
              <div className="w-8 h-8 bg-[#708FDB] rounded-full flex items-center justify-center text-white">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}