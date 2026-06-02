import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
