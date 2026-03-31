"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Star } from "lucide-react";
import { IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mondyBtn, mondyLayout, mondyType } from "@/styles/mondy";

export default function Waitlist() {
  const [email, setEmail] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 4,
    minutes: 56,
    seconds: 4,
  });

  const emailStr = typeof email === "string" ? email : "";
  const infopageHref =
    emailStr.trim().length > 0
      ? `/infopage?email=${encodeURIComponent(emailStr.trim())}`
      : "/infopage";

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
    <section className="relative w-full bg-mondy-surface pt-32 pb-32 md:pb-48 px-6 md:px-12 overflow-hidden font-noah">

      <div className={cn(mondyLayout.contentMax, "relative z-10 flex flex-col items-center")}>

        {/* Header Section */}
        <div className="text-center space-y-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 relative mx-auto mb-4"
          >
            <div className="absolute inset-0 bg-mondy-accent/20 blur-xl rounded-full" />
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
            className={mondyType.waitlistTitle}
          >
            Get Early Access
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={mondyType.waitlistSubtitle}
          >
            We're getting close. Sign up to get early access to <br className="hidden md:block" />
            Mondy and start building your viral presence.
          </motion.p>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-center gap-3"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-mondy-surface bg-mondy-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mondy-accent/30 to-transparent" />
              </div>
            ))}
          </div>
          <span className="text-mondy-ink/40 text-[11px] font-bold tracking-wider uppercase">Join +1,000 others</span>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 w-full max-w-[600px] px-4 md:px-0"
        >
          <div className="bg-white rounded-3xl md:rounded-full p-2 md:pl-8 flex flex-col md:flex-row items-center gap-4 shadow-mondy-form border border-white/60">
            <div className="flex-1 flex items-center w-full">
              <input
                type="email"
                value={emailStr}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-transparent border-none outline-none text-mondy-ink text-lg font-medium tracking-tight w-full placeholder:text-mondy-ink/30 px-4 md:px-0 py-4 md:py-0"
              />
            </div>
            <Link href={infopageHref} className={cn(mondyBtn.primaryLg, "w-full md:w-auto text-center block")}>
              Join the waitlist
            </Link>
          </div>
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
                <span className="text-[9px] font-bold uppercase tracking-widest text-mondy-ink/30">{label}</span>
                <div className="w-14 h-18 md:w-18 md:h-22 bg-white rounded-2xl border border-black/5 flex items-center justify-center shadow-sm">
                  <span className="text-2xl md:text-3xl font-extrabold text-mondy-ink tracking-tighter">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>

              </div>
              {idx < 3 && <span className="text-2xl md:text-3xl font-extrabold text-mondy-ink/10 -mt-6">:</span>}
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
            <div className="absolute inset-x-0 top-1/4 h-1/2 bg-mondy-accent/15 blur-[100px] rounded-full z-0" />

            <div className="relative z-10">
              <Image
                src="/mobile.png"
                alt="Mondy App on Mobile"
                width={620}
                height={1240}
                className="w-full h-auto object-contain"
              />
              {/* Strong bottom fade — covers ~60% of phone height */}
              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-mondy-surface via-mondy-surface/80 to-transparent pointer-events-none" />
            </div>

            {/* Floating Card — Left */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 md:-left-16 top-[15%] bg-white/90 backdrop-blur-xl p-3 pr-5 rounded-2xl border border-white shadow-xl flex items-center gap-3 z-30"
            >
              <div className="w-10 h-10 bg-mondy-accent rounded-xl flex items-center justify-center text-white shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-widest text-mondy-ink/40">Scheduled</span>
                <span className="text-base font-extrabold text-mondy-ink tracking-tight">12:09:07</span>
              </div>
            </motion.div>

            {/* Floating Card — Right */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 md:-right-16 top-[30%] bg-white/90 backdrop-blur-xl p-3 pr-5 rounded-full border border-white shadow-xl flex items-center gap-3 z-30"
            >
              <div className="flex -space-x-2.5">
                {[
                  { Icon: IconBrandLinkedin, color: 'bg-[#0A66C2]' },
                  { Icon: IconBrandFacebook, color: 'bg-[#1877F2]' },
                  { Icon: IconBrandInstagram, color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
                ].map(({ Icon, color }, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${color} flex items-center justify-center`}>
                    <Icon size={14} className="text-white" stroke={1.5} />
                  </div>
                ))}
              </div>
              <div className="w-8 h-8 bg-mondy-accent rounded-full flex items-center justify-center text-white shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}