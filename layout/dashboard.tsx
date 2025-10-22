"use client";
import React from "react";
import { Hero } from "./hero";
import { PiggyCard } from "./piggycard";
import { Button } from "@/components/button";
import { Piggybank } from "@/lib/types";
import { formatEth } from "@/lib/utils";

interface DashboardProps {
  piggies: Piggybank[];
  onCreate: () => void;
  onOpen: (p: Piggybank) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  piggies,
  onCreate,
  onOpen,
}) => {
  const totalPot = piggies.reduce((sum, p) => sum + p.potEth, 0);

  return (
    <section className="space-y-8">
      <Hero piggyCount={piggies.length} totalPot={totalPot} />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {piggies.map((p) => (
          <PiggyCard key={p.id} piggy={p} onOpen={() => onOpen(p)} />
        ))}

        <Button
          onClick={onCreate}
          className="rounded-2xl p-5 border-dashed border-2 border-[#C7D2FE] text-left bg-white hover:shadow-md transition"
        >
          <div className="text-sm text-[#64748B]">Start a new one</div>
          <div className="font-bold text-lg text-[#0F172A]">
            Create a Piggybank
          </div>
          <p className="text-[#64748B] mt-2 text-sm">
            Define rules, invite friends, stake, and compete.
          </p>
        </Button>
      </div>
    </section>
  );
};
