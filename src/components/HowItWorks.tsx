"use client";
import React from "react";
import { motion } from "framer-motion";

// ... RippleStack remains exactly as you provided ...
type RippleStackProps = {
  count: number;
  sizeStep: number;
  durationBase: number;
  delayPerRing: number;
  ringClassName: string;
  intensity?: "soft" | "medium" | "strong";
  delayShift?: number;
};

function RippleStack({
  count,
  sizeStep,
  durationBase,
  delayPerRing,
  ringClassName,
  intensity = "medium",
  delayShift = 0,
}: RippleStackProps) {
  const presets = {
    soft: { scale: [0.96, 1.1, 0.99, 1.06, 0.97], opacity: [0.1, 0.3, 0.16, 0.26, 0.1], times: [0, 0.2, 0.45, 0.72, 1] },
    medium: { scale: [0.92, 1.18, 0.96, 1.14, 0.93], opacity: [0.14, 0.45, 0.22, 0.38, 0.14], times: [0, 0.17, 0.4, 0.66, 1] },
    strong: { scale: [0.86, 1.24, 0.92, 1.2, 0.88], opacity: [0.18, 0.55, 0.28, 0.48, 0.18], times: [0, 0.14, 0.36, 0.62, 1] },
  };
  const p = presets[intensity];
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const i = index + 1;
        const wobble = index % 3 === 1 ? 0.88 : index % 3 === 2 ? 1.08 : 1;
        const duration = (durationBase + index * 0.08) * wobble;
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full border-[1px] will-change-transform ${ringClassName}`}
            style={{ width: i * sizeStep, height: i * sizeStep }}
            animate={{ scale: p.scale, opacity: p.opacity }}
            transition={{ duration, repeat: Infinity, delay: delayShift + index * delayPerRing, ease: [0.45, 0.03, 0.52, 0.96], times: p.times }}
          />
        );
      })}
    </>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      title: "Hit record",
      desc: "Open the app and speak your mind. A thought, a story, an opinion, whatever's on your mind.",
    },
    {
      title: "Review your transcript",
      desc: "Mondy instantly transcribes your recording. Clean, accurate, and ready to work with.",
    },
    {
      title: "Publish your content",
      desc: "Select how many posts you want to create and where you want to publish. Mondy does the rest.",
    },
  ];

  return (
    <section id="howitworks" className="relative w-full bg-[#F5F3F0] py-24">

      {/* Outer Section Border/Container */}
      <div className="w-full bg-white/50 border border-black/[0.03] rounded-[4rem] py-24 px-6 md:px-16 relative overflow-hidden">

        {/* Header */}
        <div className="text-center mb-20 space-y-4 max-w-3xl mx-auto relative z-10">
          <h2 className="text-[#1C1A17] text-5xl md:text-7xl font-extrabold tracking-[-0.06em] leading-[0.9]">
            How It <span className="text-[#708FDB]">Works</span>
          </h2>
          <p className="text-[#1C1A17]/60 text-lg md:text-xl font-medium tracking-tight leading-relaxed">
            Between running teams, closing deals, and building products, sitting down to
            write content never makes the cut.
          </p>
        </div>

        {/* Cards Grid */}
        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 w-full relative z-20">
          {steps.map((step, idx) => {
            const isSecondCard = idx === 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                style={{
                  // Exact gradient colors derived from your design
                  background: `linear-gradient(135deg, #FDECE9 0%, #E0E7FF 100%)`,
                  backgroundSize: '300% 100%',
                  backgroundPosition: `${idx * 50}% 0%`
                }}
                className="relative rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(112,143,219,0.12)] border border-white/80 overflow-hidden flex flex-col min-h-[650px]"
              >
                {/* Background Ripple Effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                  <RippleStack count={5} sizeStep={250} durationBase={1.5} delayPerRing={0.2} intensity="strong" ringClassName="border-[#708FDB]/40" />
                </div>

                {isSecondCard ? (
                  <>
                    <div className="px-6 pt-0 w-full h-[480px] relative z-10">
                      <div className="relative w-full h-full bg-[#FBFBF9]/90 rounded-b-[2.5rem] flex items-center justify-center overflow-hidden border-x border-b border-black/[0.03]">
                        <span className="relative z-10 text-[10px] text-[#1C1A17]/20 font-bold uppercase tracking-widest">[App Screenshot]</span>
                      </div>
                    </div>
                    <div className="relative z-10 p-10 pt-8 flex-grow">
                      <h4 className="text-[#1C1A17] text-2xl font-extrabold tracking-[-0.05em] leading-[1.1] mb-4">
                        {idx + 1}. {step.title}
                      </h4>
                      <p className="text-[#1C1A17]/60 text-lg font-medium tracking-[-0.03em] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-10 p-10 pb-8 flex-grow">
                      <h4 className="text-[#1C1A17] text-2xl font-extrabold tracking-[-0.05em] leading-[1.1] mb-4">
                        {idx + 1}. {step.title}
                      </h4>
                      <p className="text-[#1C1A17]/60 text-lg font-medium tracking-[-0.03em] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                    <div className="px-6 pb-0 w-full h-[480px] relative z-10">
                      <div className="relative w-full h-full bg-[#FBFBF9]/90 rounded-t-[2.5rem] flex items-center justify-center overflow-hidden border-x border-t border-black/[0.03]">
                        <span className="relative z-10 text-[10px] text-[#1C1A17]/20 font-bold uppercase tracking-widest">[App Screenshot]</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-20 flex justify-center relative z-20">
          <button className="bg-[#708FDB] text-white px-10 py-4 rounded-full font-bold text-sm tracking-tight transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#708FDB]/20">
            Submit a Feature Request
          </button>
        </div>
      </div>
    </section>
  );
}