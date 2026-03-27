"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
    hasChevron?: boolean;
  }[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex flex-col max-w-[95vw] lg:max-w-fit fixed top-6 md:top-10 inset-x-0 mx-auto border border-neutral-200/50 rounded-[2rem] md:rounded-full bg-white/80 backdrop-blur-md shadow-md z-[5000] transition-all duration-300",
          isOpen ? "px-6 py-6" : "px-3 md:px-4 py-2",
          className
        )}
      >
        <div className="flex items-center justify-between gap-2 lg:gap-10 w-full">
          {/* Logo Slot */}
          <div className="flex items-center pl-1 md:pl-2 shrink-0">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image src="/logo.svg" alt="Mondy AI Logo" width={110} height={28} className="h-6 md:h-7 w-auto object-contain" priority />
            </Link>
          </div>

          {/* Navigation Items (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-1 text-[#1C1A17] hover:text-neutral-500 transition-colors font-sans"
                )}
              >
                <span className="text-[14px] font-medium whitespace-nowrap">{navItem.name}</span>
                {navItem.hasChevron && (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                )}
              </Link>
            ))}
          </div>

          {/* Action Button (Desktop) */}
          <div className="hidden lg:flex items-center pr-1 shrink-0">
            <button className="text-[13px] font-bold text-white bg-[#708FDB] hover:bg-[#5E7CC7] transition-colors px-5 py-2.5 rounded-full whitespace-nowrap">
              Join Waitlist
            </button>
          </div>

          {/* Hamburger Menu Icon (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#1C1A17] hover:text-neutral-500 transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="lg:hidden flex flex-col gap-6 w-full overflow-hidden"
            >
              <div className="flex flex-col gap-4 pl-1">
                {navItems.map((navItem: any, idx: number) => (
                  <Link
                    key={`mobile-link=${idx}`}
                    href={navItem.link}
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center text-[#1C1A17] text-lg font-medium py-2"
                  >
                    <span>{navItem.name}</span>
                    {navItem.hasChevron && <ChevronDown size={20} className="text-gray-400" />}
                  </Link>
                ))}
              </div>
              <button className="w-full text-base font-bold text-white bg-[#708FDB] hover:bg-[#5E7CC7] transition-colors py-4 rounded-2xl mt-2">
                Join Waitlist
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
