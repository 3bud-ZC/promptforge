"use client";

import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { GeneratedOutputs } from "@/lib/prompt-engine/types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { QualityScore } from "@/components/generator/QualityScore";
import { useI18n } from "@/components/providers/I18nProvider";

function AnalysisView({
  analysis,
  isArabic,
}: {
  analysis: GeneratedOutputs["analysis"];
  isArabic: boolean;
}) {
  return (
    <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-2">
      <div className="space-y-3">
        <p><span className="font-semibold text-slate-100">{isArabic ? "ملخص المشروع:" : "Project Summary:"}</span> {analysis.projectSummary}</p>
        <p><span className="font-semibold text-slate-100">{isArabic ? "المستخدمون المستهدفون:" : "Target Users:"}</span> {analysis.targetUsers}</p>
        <p><span className="font-semibold text-slate-100">{isArabic ? "المشكلة الرئيسية:" : "Main Problem:"}</span> {analysis.mainProblem}</p>
        <p><span className="font-semibold text-slate-100">{isArabic ? "الحل المقترح:" : "Proposed Solution:"}</span> {analysis.proposedSolution}</p>
      </div>
      <div className="space-y-3">
        <ul>
          <p className="mb-1 font-semibold text-slate-100">{isArabic ? "الميزات الأساسية" : "Core Features"}</p>
          {analysis.coreFeatures.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
        <ul>
          <p className="mb-1 font-semibold text-slate-100">{isArabic ? "الشاشات المقترحة" : "Suggested Screens"}</p>
          {analysis.suggestedScreens.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <p className="font-semibold text-slate-100">{isArabic ? "نموذج البيانات" : "Data Model"}</p>
        {analysis.suggestedDataModel.map((item) => (
          <p key={item}>- {item}</p>
        ))}
      </div>
      <div className="space-y-2">
        <p className="font-semibold text-slate-100">{isArabic ? "التوجه التقني" : "Tech Direction"}</p>
        {analysis.suggestedTechDirection.map((item) => (
          <p key={item}>- {item}</p>
        ))}
      </div>
    </div>
  );
}

interface OutputTabsProps {
  outputs: GeneratedOutputs;
  onCopy: (label: string, content: string) => void;
}

export function OutputTabs({ outputs, onCopy }: OutputTabsProps) {
  const { locale, isArabic } = useI18n();

  const tabs = useMemo<TabItem[]>(
    () => [
      { key: "analysis", label: isArabic ? "التحليل" : "Analysis" },
      { key: "designPrompt", label: isArabic ? "برومبت التصميم" : "Design Prompt" },
      { key: "buildPrompt", label: isArabic ? "برومبت البناء" : "Build Prompt" },
      { key: "fixPrompt", label: isArabic ? "برومبت الإصلاح" : "Fix Prompt" },
      { key: "deployPrompt", label: isArabic ? "برومبت النشر" : "Deploy Prompt" },
      { key: "businessPrompt", label: isArabic ? "خطة الأعمال" : "Business Plan" },
      { key: "quality", label: isArabic ? "تقرير الجودة" : "Quality Report" },
    ],
    [isArabic],
  );

  const [active, setActive] = useState("analysis");
  const activeLabel = tabs.find((tab) => tab.key === active)?.label ?? active;

  const promptMap: Record<string, string> = {
    designPrompt: outputs.designPrompt,
    buildPrompt: outputs.buildPrompt,
    fixPrompt: outputs.fixPrompt,
    deployPrompt: outputs.deployPrompt,
    businessPrompt: outputs.businessPrompt,
  };

  const content = promptMap[active] ?? "";

  return (
    <Card>
      <CardContent className="space-y-4">
        <Tabs tabs={tabs} value={active} onValueChange={setActive} />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {active === "analysis" ? (
              <AnalysisView analysis={outputs.analysis} isArabic={isArabic} />
            ) : null}

            {active === "quality" ? <QualityScore report={outputs.qualityReport} /> : null}

            {active !== "analysis" && active !== "quality" ? (
              <>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onCopy(activeLabel, content)}
                    disabled={!content}
                  >
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    {locale === "ar" ? "نسخ القسم" : "Copy Section"}
                  </Button>
                </div>
                {content ? (
                  <pre className="max-h-[560px] overflow-auto rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-sm leading-6 text-slate-200 whitespace-pre-wrap">
                    {content}
                  </pre>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/40 p-6 text-sm text-slate-400">
                    {locale === "ar"
                      ? "هذا القسم فارغ في وضع المخرجات الحالي."
                      : "This section is empty for the selected output mode."}
                  </div>
                )}
              </>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
