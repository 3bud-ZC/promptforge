import { HistoryItem } from "@/components/history/HistoryItem";
import { useI18n } from "@/components/providers/I18nProvider";
import type { HistoryItem as HistoryItemType } from "@/lib/prompt-engine/types";

interface HistoryListProps {
  items: HistoryItemType[];
  onDelete: (id: string) => void;
}

export function HistoryList({ items, onDelete }: HistoryListProps) {
  const { locale } = useI18n();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center text-sm text-slate-400">
        {locale === "ar" ? "لا توجد مشاريع محفوظة حتى الآن." : "No saved projects yet."}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <HistoryItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
