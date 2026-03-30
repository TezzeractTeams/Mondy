"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Star } from "lucide-react";
import Link from "next/link";

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
            <Link href="/infopage" className="w-full md:w-auto px-10 py-5 bg-[#708FDB] text-white rounded-full text-lg font-bold tracking-[-0.03em] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#708FDB]/20 text-center block">
              Join the waitlist
            </Link>
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

        {/* Visual Asset: Phone Image */}
        <div className="mt-16 relative w-full flex justify-center overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] z-10"
          >
            {/* Blue Glow Behind Phone */}
            <div className="absolute inset-x-0 top-1/4 h-1/2 bg-[#708FDB]/15 blur-[100px] rounded-full z-0" />

            <div className="relative z-10">
              <Image
                src="/mobile.png"
                alt="Mondy App on Mobile"
                width={620}
                height={1240}
                className="w-full h-auto object-contain"
              />
              {/* Strong bottom fade — covers ~60% of phone height */}
              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#F5F3F0] via-[#F5F3F0]/80 to-transparent pointer-events-none" />
            </div>

            {/* Floating Card — Left */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 md:-left-16 top-[15%] bg-white/90 backdrop-blur-xl p-3 pr-5 rounded-2xl border border-white shadow-xl flex items-center gap-3 z-30"
            >
              <div className="w-10 h-10 bg-[#708FDB] rounded-xl flex items-center justify-center text-white shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C1A17]/40">Scheduled</span>
                <span className="text-base font-extrabold text-[#1C1A17] tracking-tight">12:09:07</span>
              </div>
            </motion.div>

            {/* Floating Card — Right */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 md:-right-16 top-[30%] bg-white/90 backdrop-blur-xl p-3 pr-5 rounded-full border border-white shadow-xl flex items-center gap-3 z-30"
            >
              <div className="flex -space-x-2.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#708FDB]/20" />
                ))}
              </div>
              <div className="w-8 h-8 bg-[#708FDB] rounded-full flex items-center justify-center text-white shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}