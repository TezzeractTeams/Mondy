import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

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
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-neutral-200/50 rounded-full bg-white/80 backdrop-blur-md shadow-md z-[5000] px-4 py-2 items-center justify-center gap-10",
          className
        )}
      >
        {/* Logo Slot */}
        <div className="flex items-center pl-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Mondy AI Logo" width={110} height={28} className="h-7 w-auto object-contain" priority />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex items-center gap-1 text-[#1C1A17] hover:text-neutral-500 transition-colors font-sans"
              )}
            >
              <span className="text-[14px] font-medium">{navItem.name}</span>
              {navItem.hasChevron && (
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center pr-1">
          <Link
            href="/infopage"
            className="text-[13px] font-bold text-white bg-[#708FDB] hover:bg-[#5E7CC7] transition-colors px-5 py-2.5 rounded-full"
          >
            Join Waitlist
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
