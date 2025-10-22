"use client";
import React, { useState } from "react";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Pill } from "@/components/pill";
import { Divider } from "@/components/divider";
import { Avatar } from "@/components/avatar";
import { MemberAdder } from "./memberadder";
import { uid, clamp, formatEth } from "@/lib/utils";
import { Piggybank, Member, Rule, RuleType } from "@/lib/types";

interface CreateProps {
  onCancel: () => void;
  onCreate: (p: Piggybank) => void;
}

export const CreatePiggybank: React.FC<CreateProps> = ({
  onCancel,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("Be nice, post daily");
  const [entry, setEntry] = useState(0.01);
  const [members, setMembers] = useState<Member[]>([
    { id: uid(), name: "You", avatarHue: 205, breaks: 0 },
  ]);

  const [rules, setRules] = useState<Rule[]>([]);
  const [ruleType, setRuleType] = useState<RuleType>("WORD_BAN");
  const [bannedWords, setBannedWords] = useState("");
  const [minPosts, setMinPosts] = useState(7);
  const [customDesc, setCustomDesc] = useState("");
  const [penalty, setPenalty] = useState(0.002);

  const addMember = (name: string) =>
    setMembers((prev) => [
      ...prev,
      { id: uid(), name, avatarHue: Math.floor(Math.random() * 360), breaks: 0 },
    ]);
  const removeMember = (id: string) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  const addRule = () => {
    const id = uid();
    let label = "";
    const config: Rule["config"] = {};
    if (ruleType === "WORD_BAN") {
      const words = bannedWords.split(",").map((w) => w.trim()).filter(Boolean);
      label = words.length ? `No ${words[0]}${words.length > 1 ? " +" : ""}` : "No banned words";
      config.bannedWords = words;
    } else if (ruleType === "POST_QUOTA") {
      label = `Post at least ${minPosts}/week`;
      config.minPostsPerWeek = clamp(minPosts, 1, 100);
    } else {
      label = customDesc || "Custom rule";
      config.description = customDesc;
    }

    setRules((prev) => [...prev, { id, label, type: ruleType, config, penaltyEth: clamp(penalty, 0.0001, 1) }]);
    setBannedWords("");
    setCustomDesc("");
  };

  const canCreate = name.trim().length >= 3 && members.length >= 2 && rules.length >= 1;

  const handleCreate = () => {
    const p: Piggybank = {
      id: uid(),
      name,
      theme,
      createdAt: Date.now(),
      periodEndsAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
      potEth: members.length * entry,
      entryStakeEth: entry,
      rules,
      members,
      infractions: [],
    };
    onCreate(p);
  };

  return (
    <section className="grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0F172A]">Create a Piggybank</h2>
            <Pill>Entry stake: {formatEth(entry)}</Pill>
          </div>
          <Divider />
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Piggybank name" hint="Clear and playful works best">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="No-Curse November" />
            </Field>
            <Field label="Theme / tagline" hint="Optional vibe line">
              <Input value={theme} onChange={(e) => setTheme(e.target.value)} />
            </Field>
            <Field label="Entry stake (ETH)" hint="Deposit per member">
              <Input type="number" min={0.0001} step={0.001} value={entry} onChange={(e) => setEntry(parseFloat(e.target.value || "0"))} />
            </Field>
          </div>
        </div>

        {/* Members */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-[#0F172A]">Members</h3>
          <Divider />
          <MemberAdder onAdd={addMember} />
          <div className="grid sm:grid-cols-2 gap-4">
            {members.map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] p-3">
                <Avatar name={m.name} hue={m.avatarHue} />
                <div className="font-semibold text-[#0F172A]">{m.name}</div>
                <button onClick={() => removeMember(m.id)} className="ml-auto text-[#EF4444] hover:underline">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-[#0F172A]">Rules</h3>
          <Divider />
          <div className="grid md:grid-cols-5 gap-4">
            <Field label="Type" className="md:col-span-2">
              <Select value={ruleType} onChange={(e) => setRuleType(e.target.value as RuleType)}>
                <option value="WORD_BAN">Word ban</option>
                <option value="POST_QUOTA">Post quota</option>
                <option value="CUSTOM">Custom</option>
              </Select>
            </Field>
            {ruleType === "WORD_BAN" && (
              <Field label="Banned words" className="md:col-span-3" hint="Comma-separated">
                <Input value={bannedWords} onChange={(e) => setBannedWords(e.target.value)} />
              </Field>
            )}
            {ruleType === "POST_QUOTA" && (
              <Field label="Min posts/week" className="md:col-span-3">
                <Input type="number" min={1} max={100} value={minPosts} onChange={(e) => setMinPosts(parseInt(e.target.value || "0"))} />
              </Field>
            )}
            {ruleType === "CUSTOM" && (
              <Field label="Description" className="md:col-span-3">
                <Input value={customDesc} onChange={(e) => setCustomDesc(e.target.value)} />
              </Field>
            )}
            <Field label="Penalty (ETH)" className="md:col-span-2">
              <Input type="number" step={0.001} value={penalty} onChange={(e) => setPenalty(parseFloat(e.target.value || "0"))} />
            </Field>
            <div className="md:col-span-5">
              <Button variant="secondary" onClick={addRule}>
                Add rule
              </Button>
            </div>
          </div>

          {rules.length > 0 && (
            <div className="mt-4 space-y-3">
              {rules.map((r) => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <Pill>{r.label}</Pill>
                  <span className="text-sm text-[#64748B]">Penalty: {formatEth(r.penaltyEth)}</span>
                  <button onClick={() => setRules((prev) => prev.filter((x) => x.id !== r.id))} className="ml-auto text-[#EF4444] hover:underline">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1 space-y-4">
        <div className="sticky top-24 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-6">
          <h4 className="font-semibold text-[#0F172A] mb-2">Summary</h4>
          <div className="text-sm text-[#334155] space-y-1">
            <div><b>Name:</b> {name || "—"}</div>
            <div><b>Theme:</b> {theme || "—"}</div>
            <div><b>Members:</b> {members.length}</div>
            <div><b>Rules:</b> {rules.length}</div>
            <div><b>Entry:</b> {formatEth(entry)}</div>
          </div>
          <Divider />
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onCancel} className="w-1/2">Cancel</Button>
            <Button variant="primary" onClick={handleCreate} disabled={!canCreate} className="w-1/2">
              Create
            </Button>
          </div>
          {!canCreate && (
            <p className="text-xs text-[#64748B] mt-2">
              Add 2+ members, 1+ rule, and a name (≥ 3 chars).
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
