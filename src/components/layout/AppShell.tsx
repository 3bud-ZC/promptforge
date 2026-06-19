"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useI18n } from "@/components/providers/I18nProvider";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isArabic } = useI18n();

  return (
    <div className="min-h-screen text-slate-100">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_45%)]" />
        <div
          className={cn(
            "relative mx-auto flex max-w-[1600px] flex-col md:flex-row",
            isArabic && "md:flex-row-reverse",
          )}
        >
          <Sidebar />
          <div className="min-w-0 flex-1">
            <Topbar />
            <motion.main
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-4 md:p-6"
            >
              {children}
            </motion.main>
          </div>
        </div>
      </div>
    </div>
  );
}
