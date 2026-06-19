"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BookCopy, History, Settings, Sparkles } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", key: "generator", icon: Sparkles },
  { href: "/history", key: "history", icon: History },
  { href: "/library", key: "library", icon: BookCopy },
  { href: "/settings", key: "settings", icon: Settings },
  { href: "/guide", key: "guide", icon: Bot },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const { nav } = useI18n();

  return (
    <aside className="w-full shrink-0 border-b border-slate-800/80 bg-slate-950/70 px-4 py-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/20 text-cyan-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="font-accent text-sm font-semibold tracking-wide text-slate-100">PromptForge AI</p>
          <p className="text-xs text-slate-400">{nav("studio")}</p>
        </div>
      </div>

      <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                active
                  ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-100"
                  : "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:text-slate-100",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{nav(item.key)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
