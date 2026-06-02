"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
}

export function Tabs({ tabs, value, onValueChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = tab.key === value;
        return (
          <button
            key={tab.key}
            onClick={() => onValueChange(tab.key)}
            className={cn(
              "relative rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
              active ? "text-slate-950" : "text-slate-300 hover:text-slate-100",
            )}
            type="button"
          >
            {active ? (
              <motion.span
                layoutId="active-tab"
                className="absolute inset-0 rounded-lg bg-cyan-300"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
