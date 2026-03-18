"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconInfoCircle, IconMessage, IconBuilding } from "@tabler/icons-react";

export default function MondyNav() {
  const navItems = [
    {
      name: "Product",
      link: "/product",
      hasChevron: true,
    },
    {
      name: "Solution",
      link: "/solution",
    },
    {
      name: "Resources",
      link: "/resources",
      hasChevron: true,
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
