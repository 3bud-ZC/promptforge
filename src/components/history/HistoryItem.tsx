import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { HistoryItem as HistoryItemType } from "@/lib/prompt-engine/types";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/components/providers/I18nProvider";

interface HistoryItemProps {
  item: HistoryItemType;
  onDelete: (id: string) => void;
}

export function HistoryItem({ item, onDelete }: HistoryItemProps) {
  const { locale, outputModeLabel, projectTypeLabel } = useI18n();

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-100">{item.title}</h3>
            <p className="text-xs text-slate-400">{formatDate(item.createdAt, locale === "ar" ? "ar-EG" : "en-US")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/?historyId=${item.id}`}>
              <Button size="sm" variant="secondary">
                {locale === "ar" ? "فتح" : "Open"}
              </Button>
            </Link>
            <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              {locale === "ar" ? "حذف" : "Delete"}
            </Button>
          </div>
        </div>

        <p className="line-clamp-3 text-sm text-slate-300">{item.idea}</p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-md border border-slate-700 px-2 py-1">
            {outputModeLabel(item.options.outputMode)}
          </span>
          <span className="rounded-md border border-slate-700 px-2 py-1">{item.options.targetTool}</span>
          <span className="rounded-md border border-slate-700 px-2 py-1">
            {projectTypeLabel(item.options.projectType)}
          </span>
          <span className="rounded-md border border-slate-700 px-2 py-1">
            {locale === "ar" ? "النتيجة" : "Score"} {item.outputs.qualityReport.totalScore}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
