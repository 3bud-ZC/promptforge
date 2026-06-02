import type { QualityReport } from "@/lib/prompt-engine/types";
import { Badge } from "@/components/ui/Badge";
import { useI18n } from "@/components/providers/I18nProvider";

export function QualityScore({ report }: { report: QualityReport }) {
  const { locale } = useI18n();

  const scoreColor =
    report.totalScore >= 85
      ? "text-emerald-300 border-emerald-300/30 bg-emerald-400/10"
      : report.totalScore >= 70
        ? "text-amber-200 border-amber-300/30 bg-amber-400/10"
        : "text-rose-200 border-rose-300/30 bg-rose-400/10";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge className={scoreColor}>
          {locale === "ar" ? "النتيجة الكلية" : "Total Score"}: {report.totalScore}/100
        </Badge>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {Object.entries(report.categoryScores).map(([key, value]) => (
          <div
            key={key}
            className="rounded-lg border border-slate-700/80 bg-slate-950/40 px-3 py-2"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">{key}</p>
            <p className="text-sm font-semibold text-slate-100">{value}/100</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-200">
            {locale === "ar" ? "نقاط القوة" : "Strengths"}
          </h4>
          <ul className="space-y-1 text-sm text-slate-300">
            {report.strengths.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-200">
            {locale === "ar" ? "نقاط الضعف" : "Weaknesses"}
          </h4>
          <ul className="space-y-1 text-sm text-slate-300">
            {report.weaknesses.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold text-slate-200">
          {locale === "ar" ? "اقتراحات التحسين" : "Improvement Suggestions"}
        </h4>
        <ul className="space-y-1 text-sm text-slate-300">
          {report.improvementSuggestions.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
