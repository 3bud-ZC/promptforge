"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/providers/I18nProvider";
import { Button } from "@/components/ui/Button";

export function Topbar() {
  const pathname = usePathname();
  const { topbar, toggleLocale } = useI18n();

  const title =
    pathname === "/"
      ? topbar("generator")
      : pathname.startsWith("/history")
        ? topbar("history")
        : pathname.startsWith("/library")
          ? topbar("library")
          : pathname.startsWith("/settings")
            ? topbar("settings")
            : pathname.startsWith("/guide")
              ? topbar("guide")
              : "PromptForge AI";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/60 px-5 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-base font-semibold tracking-tight text-slate-100">{title}</h1>
        <Button variant="outline" size="sm" onClick={toggleLocale}>
          <Languages className="mr-2 h-3.5 w-3.5" />
          {topbar("switch")}
        </Button>
      </div>
    </header>
  );
}
