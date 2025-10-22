"use client";
import React, { useMemo } from "react";
import { Pill } from "@/components/pill";
import { Divider } from "@/components/divider";
import { Avatar } from "@/components/avatar";
import { formatEth } from "@/lib/utils";
import type { Piggybank } from "@/lib/types";

export const PiggyCard = ({
  piggy,
  onOpen,
}: {
  piggy: Piggybank;
  onOpen: () => void;
}) => {
  const leader = useMemo(
    () => [...piggy.members].sort((a, b) => a.breaks - b.breaks)[0],
    [piggy]
  );

  return (
    <button
      onClick={onOpen}
      className="group text-left rounded-2xl p-4 sm:p-5 bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg transition relative overflow-hidden w-full"
    >
      <div
        className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #FF89C2 0%, transparent 60%)",
        }}
      />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="space-y-1">
          <div className="text-xs sm:text-sm text-[#64748B]">Piggybank</div>
          <div className="font-bold text-base sm:text-lg text-[#0F172A] truncate max-w-[200px] sm:max-w-none">
            {piggy.name}
          </div>
        </div>
        <Pill tone="success">Pot {formatEth(piggy.potEth)}</Pill>
      </div>
      <Divider />
      <div className="flex flex-wrap items-center gap-3">
        {piggy.members.map((m) => (
          <div key={m.id} className="flex items-center gap-2">
            <Avatar name={m.name} hue={m.avatarHue} size={32} />
            <div>
              <div className="font-semibold text-[#0F172A] text-sm sm:text-base">
                {m.name}
              </div>
              <div className="text-xs text-[#64748B]">breaks: {m.breaks}</div>
            </div>
          </div>
        ))}
        <div className="ml-auto text-right text-xs sm:text-sm">
          <div className="text-[#64748B]">Leader</div>
          <div className="font-semibold text-[#0F172A]">{leader?.name}</div>
        </div>
      </div>
    </button>
  );
};
