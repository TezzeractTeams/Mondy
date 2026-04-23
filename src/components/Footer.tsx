"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navigateToSection } from "@/lib/scrollToSection";
import Image from "next/image";
import { mondyLayout } from "@/styles/mondy";
import { cn } from "@/lib/utils";
import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandBehance,
  IconBrandDribbble,
  IconBrandLinkedin
} from "@tabler/icons-react";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/join") return null;

  const onSectionClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    navigateToSection(hash, router, pathname);
  };

  return (
    <div className="w-full max-w-none bg-mondy-surface pt-0 ">
      <footer className="w-full max-w-none bg-mondy-footer py-24 px-8 md:px-14 text-white font-sans overflow-hidden flex flex-col rounded-t-mondy-footer">
        {/* 1. TOP CONTENT AREA (Grid and Header) */}
        <div className={cn(mondyLayout.contentMax, "mb-0")}>
          {/* <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
            <h3 className="text-[2.5rem] md:text-[3.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-white">
              The curated sanctuary for<br />your aesthetic journey
            </h3>
            
          </div> */}
 
          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {/* Company (Navbar links) */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[13px] font-bold mb-4 uppercase tracking-tighter opacity-50">Company</h4>
              {[
                { name: 'Solution', link: '#solution' },
                { name: 'How it works', link: '#howitworks' },
                { name: 'Pricing', link: '#pricing' },
                { name: 'FAQ', link: '#faq' }
              ].map(item => (
                <a
                  key={item.name}
                  href={`/${item.link}`}
                  onClick={(e) => onSectionClick(e, item.link)}
                  className="text-white/60 text-[16px] font-medium hover:text-white transition-colors tracking-tight"
                >
                  {item.name}
                </a>
              ))}
            </div>
 
            {/* General */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[13px] font-bold mb-4 uppercase tracking-tighter opacity-50">General</h4>
              <Link 
                href="/privacy"
                className="text-white/60 text-[16px] font-medium hover:text-white transition-colors tracking-tight"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/privacy"
                className="text-white/60 text-[16px] font-medium hover:text-white transition-colors tracking-tight"
              >
Terms & Conditions
              </Link>
              <Link
                href="/infopage"
                className="text-white/60 text-[16px] font-medium hover:text-white transition-colors tracking-tight"
              >
                Contact Us
              </Link>
            </div>
 
            {/* Say hello! */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[13px] font-bold mb-4 uppercase tracking-tighter opacity-50">Say hello!</h4>
              <div className="flex flex-wrap gap-2 max-w-[300px]">
                {[
                  { handle: '@mondy', icon: <IconBrandX size={14} className="text-white" /> },
                  {
                    handle: '@mondy',
                    icon: <IconBrandInstagram size={14} className="text-pink-500" />,
                    href: 'https://www.instagram.com/mondy.ai/',
                  },
                  {
                    handle: '@mondy',
                    icon: <IconBrandLinkedin size={14} className="text-blue-400" />,
                    href: 'https://www.linkedin.com/company/mondy-ai/posts/?feedView=all',
                  },
                ].map((social, i) => {
                  const className =
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-[12px] font-bold hover:bg-white/10 transition-all border border-white/10 cursor-pointer text-white';
                  const inner = (
                    <>
                      {social.icon}
                      {social.handle}
                    </>
                  );
                  if (social.href) {
                    return (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {inner}
                      </a>
                    );
                  }
                  return (
                    <span key={i} className={className}>
                      {inner}
                    </span>
                  );
                })}
              </div>
            </div>
 
            
          </div>
        </div>
 
        {/* 2. BOTTOM BRANDING AREA (Large Logo) */}
        
      </footer>
      <div className="w-full bg-black py-2.5 px-4 text-center">
        <p className="text-[11px] md:text-xs font-medium tracking-wide text-white/70">
          Developed by Tezzeract Teams
        </p>
      </div>
    </div>
  );
}