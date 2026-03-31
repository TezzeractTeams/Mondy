"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconInfoCircle, IconMessage, IconBuilding } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function MondyNav() {
  const pathname = usePathname();
  if (pathname === "/join") return null;

  const navItems = [
    {
      name: "Solution",
      link: "#solution",
      hasChevron: true,
    },
    {
      name: "How it works",
      link: "#howitworks",
      hasChevron: true,
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "FAQ",
      link: "#faq",
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
