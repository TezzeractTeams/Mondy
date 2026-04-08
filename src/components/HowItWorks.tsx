"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { mondyBtn, mondyGradients, mondyType } from "@/styles/mondy";

export default function HowItWorks() {
  const steps = [
    {
      title: "Hit record",
      desc: "Open Mondy and talk to it like a friend. Tell it about your day, an incident, or anything that you’d like the posts to be about.",
    },
    {
      title: "Generate your posts",
      desc: "Mondy will identify the key talking points, and generate individual posts for all the platforms you’ve chosen.",
    },
    {
      title: "Edit & Publish",
      desc: "Once your posts are generated, make any tweaks you’d like and schedule/publish your posts.",
    },
  ];

  return (
    <section id="howitworks" className="relative w-full bg-mondy-surface py-24">

      {/* Outer Section Border/Container */}
      <div className="w-80% bg-mondy-accent-deep/5 border border-black/[0.03] rounded-mondy-section py-24 px-6 md:px-16 relative overflow-hidden shadow-mondy-section">

        {/* Header */}
        <div className="text-center mb-20 space-y-4 max-w-xl mx-auto relative z-10">
          <h2 className={mondyType.sectionHeading}>
            How It <span className="text-mondy-accent">Works</span>
          </h2>
          <p className={mondyType.sectionLead}>
            Between running teams, closing deals, and building your business, sitting down to
            write content never makes the cut.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 sm:w-[90%] max-w-full mx-auto relative z-20">
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
                className="relative rounded-mondy-card shadow-mondy-card border border-white/80 overflow-hidden flex flex-col min-h-[620px]"
              >
                {isSecondCard ? (
                  <>
                    <div className="  w-full h-full relative z-10">
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <Image
                          src="/Step-2-V1.png"
                          alt="Mondy: review your transcript and generated posts"
                          fill
                          className="object-contain min-h-[103%] object-top -mt-10"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    <div className="relative z-10 p-10 pt-0 flex-grow">
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
                    <div className="relative z-10 p-10 pb-0 flex-grow">
                      <h4 className={mondyType.stepTitle}>
                        {idx + 1}. {step.title}
                      </h4>
                      <p className={mondyType.stepBody}>
                        {step.desc}
                      </p>
                    </div>
                    <div className=" pb-0 w-full h-full relative z-10">
                      <div className="relative w-full h-full mt-5 flex items-center justify-center overflow-hidden ">
                        {idx === 0 ? (
                          <Image
                            src="/Step.png"
                            alt="Mondy: record and see your transcript as you speak"
                            fill
                            className="object-contain min-h-[103%] object-bottom"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        ) : idx === 2 ? (
                          <Image
                            src="/Step-3.png"
                            alt="Mondy: schedule posts across platforms with calendar and time"
                            fill
                            className="object-contain min-h-[103%] object-bottom "
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        ) : (
                          <span className={mondyType.screenshotPlaceholder}>[App Screenshot]</span>
                        )}
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