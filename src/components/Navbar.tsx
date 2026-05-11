"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { usePathname } from "next/navigation";

export default function MondyNav() {
  const pathname = usePathname();
  if (pathname === "/join") return null;

  const sectionItems = [
    { name: "Solution", link: "#solution" },
    { name: "How it works", link: "#howitworks" },
    { name: "Pricing", link: "#pricing" },
    { name: "FAQ", link: "#faq" },
  ];

  const blogItem = { name: "Blog", link: "/blog" };

  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const navItems =
    pathname === "/" || isBlog
      ? [...sectionItems, blogItem]
      : [{ name: "Home", link: "/" }, ...sectionItems, blogItem];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
