"use client";
import React from "react";
import { motion } from "framer-motion";
import { mondyBtn, mondyGradients, mondyType } from "@/styles/mondy";

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
    <section id="howitworks" className="relative w-full bg-mondy-surface py-24">

      {/* Outer Section Border/Container */}
      <div className="w-full bg-mondy-accent-deep/5 border border-black/[0.03] rounded-mondy-section py-24 px-6 md:px-16 relative overflow-hidden shadow-mondy-section">

        {/* Header */}
        <div className="text-center mb-20 space-y-4 max-w-3xl mx-auto relative z-10">
          <h2 className={mondyType.sectionHeading}>
            How It <span className="text-mondy-accent">Works</span>
          </h2>
          <p className={mondyType.sectionLead}>
            Between running teams, closing deals, and building products, sitting down to
            write content never makes the cut.
          </p>
        </div>

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
                  background: mondyGradients.stepCard,
                  backgroundSize: "300% 100%",
                  backgroundPosition: `${idx * 50}% 0%`,
                }}
                className="relative rounded-mondy-card shadow-mondy-card border border-white/80 overflow-hidden flex flex-col min-h-[650px]"
              >
                {isSecondCard ? (
                  <>
                    <div className="px-6 pt-0 w-full h-[480px] relative z-10">
                      <div className="relative w-full h-full bg-mondy-card/90 rounded-b-mondy-inner flex items-center justify-center overflow-hidden border-x border-b border-black/[0.03]">
                        <span className={mondyType.screenshotPlaceholder}>[App Screenshot]</span>
                      </div>
                    </div>
                    <div className="relative z-10 p-10 pt-8 flex-grow">
                      <h4 className={mondyType.stepTitle}>
                        {idx + 1}. {step.title}
                      </h4>
                      <p className={mondyType.stepBody}>
                        {step.desc}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-10 p-10 pb-8 flex-grow">
                      <h4 className={mondyType.stepTitle}>
                        {idx + 1}. {step.title}
                      </h4>
                      <p className={mondyType.stepBody}>
                        {step.desc}
                      </p>
                    </div>
                    <div className="px-6 pb-0 w-full h-[480px] relative z-10">
                      <div className="relative w-full h-full bg-mondy-card/90 rounded-t-mondy-inner flex items-center justify-center overflow-hidden border-x border-t border-black/[0.03]">
                        <span className={mondyType.screenshotPlaceholder}>[App Screenshot]</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button
        <div className="mt-20 flex justify-center relative z-20">
          <button className={mondyBtn.primaryMd} type="button">
            Submit a Feature Request
          </button>
        </div> */}
      </div>
    </section>
  );
}