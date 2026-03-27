"use client";
import React from "react";
import Image from "next/image";
import { RotateCcw, Trash2, Send, Calendar } from "lucide-react";

interface SocialPostCardProps {
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

export default function SocialPostCard({ name, role, content, avatarUrl }: SocialPostCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-5 pb-3 border border-white/60 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] w-full transition-all duration-300 hover:scale-[1.02] hover:bg-white/80">
      {/* Profile Section */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white/60">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#1C1A17] text-sm font-bold tracking-tight">{name}</h4>
          <p className="text-[#1C1A17]/40 text-[9px] font-medium tracking-tight leading-tight max-w-[110px]">
            {role}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-2 mb-4">
        <p className="text-[#1C1A17] text-[13px] font-semibold leading-[1.3] tracking-tight">
          {content}
        </p>
        <p className="text-[#1C1A17]/40 text-[11px] font-medium leading-[1.4] tracking-tight">
          Reality: Startup culture is wearing 5 different hats before lunch, pivoting your entire strat...
        </p>
      </div>

      {/* Action Icons */}
      <div className="flex items-center justify-between border-t border-[#1C1A17]/[0.05] pt-5">
        <div className="flex items-center gap-6">
          <button className="text-[#708FDB] hover:brightness-110 transition-all">
            <RotateCcw size={18} strokeWidth={2.5} />
          </button>
          <button className="text-[#708FDB] hover:brightness-110 transition-all">
            <Trash2 size={18} strokeWidth={2.5} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#708FDB]/10 text-[#708FDB] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#708FDB]/20 transition-all">
            Post
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#708FDB]/10 text-[#708FDB] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#708FDB]/20 transition-all">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
