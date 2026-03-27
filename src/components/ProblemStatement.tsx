"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, Lightbulb, SignalLow, VolumeX } from "lucide-react";

export default function ProblemStatement() {
  const problems = [
    {
      title: "No time to write",
      desc: "Between closing deals, running teams, and building products, sitting down to write content never makes the cut.",
      Icon: Clock,
    },
    {
      title: "Ideas go unshared",
      desc: "You have insights worth sharing. But without time to write them down, they stay in your head and disappear.",
      Icon: Lightbulb,
    },
    {
      title: "Your presence suffers",
      desc: "Inconsistent posting means your brand stays an afterthought, while others with less to say show up every day.",
      Icon: SignalLow,
    },
    {
      title: "Your voice goes unheard",
      desc: "The people who most deserve an audience are often the least visible online. Not from lack of ideas — but lack of time.",
      Icon: VolumeX,
    },
  ];

  return (
    <section className="relative w-full bg-[#F5F3F0] pt-32 pb-24 px-6 md:px-10 overflow-hidden font-noah">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Side: High-End Typography */}
        <div className="flex flex-col space-y-8 order-1 lg:order-1 relative z-10">
          <div className="space-y-4 relative z-10">
            <h2 className="text-[#1C1A17] text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.06em] leading-[0.9] relative z-20">
              You have ideas. <br />
              <span className="text-[#1C1A17]/40 leading-tight block mt-2 sm:inline sm:mt-0 relative z-10">You don't have time.</span>
            </h2>
          </div>

          <div className="max-w-xl space-y-6 relative z-10">
            <p className="text-xl text-[#1C1A17] font-bold tracking-[-0.05em] leading-[1.2]">
              Founders and executives aren't short on things to say. They're short on time to say it.
            </p>

            <p className="text-lg text-[#1C1A17]/70 font-medium tracking-[-0.05em] leading-[1.5]">
              Between running teams, closing deals, and building products, sitting down to write content never makes the cut. So your insights go unshared, and your online presence stays an afterthought.
            </p>

            <p className="text-xl text-[#1C1A17] font-bold tracking-[-0.05em] leading-[1.2]">
              Mondy fixes that. <span className="text-[#708FDB]">Speak for 5 minutes,</span> get a week of content in an instant.
            </p>
          </div>
        </div>

        {/* Right Side: Aligned 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 order-2 lg:order-2 relative z-10">
          {problems.map(({ title, desc, Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              // REMOVED: lg:translate-y-12 to ensure perfect 2x2 alignment
              className="p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E17054]/[0.05]"
                aria-hidden
              >
                <Icon
                  className="h-[18px] w-[18px] text-[#E17054]"
                  strokeWidth={1.5}
                />
              </div>
              <h4 className="text-[#1C1A17] text-xl font-bold tracking-[-0.05em] mb-4">
                {title}
              </h4>
              <p className="text-[#1C1A17]/70 text-base font-medium leading-[1.4] tracking-tight">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}