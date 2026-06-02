"use client";

import { useMemo, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { DEFAULT_OPTIONS } from "@/data/presets";
import { buildMarkdownExport, downloadMarkdown } from "@/lib/export/markdownExport";
import { generatePromptPackage } from "@/lib/prompt-engine";
import type { AppSettings, GeneratedOutputs, GeneratorOptions, HistoryItem } from "@/lib/prompt-engine/types";
import { getHistoryById, saveHistoryItem } from "@/lib/storage/historyStorage";
import { getSettings } from "@/lib/storage/settingsStorage";
import { slugify } from "@/lib/utils";
import { ExampleIdeas } from "@/components/generator/ExampleIdeas";
import { ExportActions } from "@/components/generator/ExportActions";
import { IdeaInput } from "@/components/generator/IdeaInput";
import { OptionsPanel } from "@/components/generator/OptionsPanel";
import { OutputTabs } from "@/components/generator/OutputTabs";
import { useI18n } from "@/components/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

function deriveTitle(idea: string) {
  const firstSentence = idea.split(/[.!?\n]/)[0]?.trim() ?? "";
  if (!firstSentence) return "Untitled Prompt Project";
  return firstSentence.length > 70 ? `${firstSentence.slice(0, 70)}...` : firstSentence;
}

const emptyOutputs: GeneratedOutputs | null = null;

export default function HomePage() {
  const { locale } = useI18n();
  const initialSettings = getSettings();
  const initialHistoryItem =
    typeof window !== "undefined"
      ? getHistoryById(new URLSearchParams(window.location.search).get("historyId") ?? "")
      : null;

  const [idea, setIdea] = useState(initialHistoryItem?.idea ?? "");
  const [settings] = useState<AppSettings>(initialSettings);
  const [options, setOptions] = useState<GeneratorOptions>(
    initialHistoryItem?.options ?? {
      ...DEFAULT_OPTIONS,
      targetTool: initialSettings.defaultTargetTool,
      complexity: initialSettings.defaultComplexity,
      language: initialSettings.defaultLanguage,
      stylePreset: initialSettings.defaultStylePreset,
    },
  );
  const [outputs, setOutputs] = useState<GeneratedOutputs | null>(
    initialHistoryItem?.outputs ?? emptyOutputs,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(
    initialHistoryItem
      ? locale === "ar"
        ? "تم تحميل المشروع من السجل."
        : "Loaded project from history."
      : "",
  );

  const generationEnabled = idea.trim().length >= 10;

  const allText = useMemo(() => {
    if (!outputs) return "";
    return [
      locale === "ar" ? "التحليل" : "Analysis",
      JSON.stringify(outputs.analysis, null, 2),
      locale === "ar" ? "برومبت التصميم" : "Design Prompt",
      outputs.designPrompt,
      locale === "ar" ? "برومبت البناء" : "Build Prompt",
      outputs.buildPrompt,
      locale === "ar" ? "برومبت الإصلاح" : "Fix Prompt",
      outputs.fixPrompt,
      locale === "ar" ? "برومبت النشر" : "Deploy Prompt",
      outputs.deployPrompt,
      locale === "ar" ? "برومبت الأعمال" : "Business Prompt",
      outputs.businessPrompt,
      locale === "ar" ? "تقرير الجودة" : "Quality Report",
      JSON.stringify(outputs.qualityReport, null, 2),
    ]
      .filter(Boolean)
      .join("\n\n");
  }, [locale, outputs]);

  async function handleGenerate() {
    if (!idea.trim()) {
      setError(
        locale === "ar"
          ? "اكتب فكرة مشروع قبل توليد البرومبتات."
          : "Please provide a project idea before generating prompts.",
      );
      return;
    }

    setError("");
    setStatus("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 550));
      const generated = generatePromptPackage(idea, options, settings);
      setOutputs(generated);
      setStatus(
        locale === "ar"
          ? "تم توليد الحزمة بنجاح."
          : "Prompt package generated successfully.",
      );
    } catch {
      setError(locale === "ar" ? "فشلت عملية التوليد. حاول مرة أخرى." : "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(label: string, content: string) {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setStatus(locale === "ar" ? `تم نسخ ${label}.` : `${label} copied.`);
  }

  async function handleCopyAll() {
    if (!allText) return;
    await navigator.clipboard.writeText(allText);
    setStatus(locale === "ar" ? "تم نسخ كل المخرجات." : "All output copied.");
  }

  function handleExport() {
    if (!outputs) return;
    const title = deriveTitle(idea);
    const markdown = buildMarkdownExport({
      title,
      idea,
      options,
      outputs,
    });
    downloadMarkdown(`promptforge-${slugify(title)}`, markdown);
    setStatus(locale === "ar" ? "تم تنزيل ملف Markdown." : "Markdown export downloaded.");
  }

  function handleSave() {
    if (!outputs) return;
    const item: HistoryItem = {
      id: crypto.randomUUID(),
      title: deriveTitle(idea),
      idea,
      options,
      outputs,
      createdAt: new Date().toISOString(),
    };
    saveHistoryItem(item);
    setStatus(locale === "ar" ? "تم حفظ المشروع في السجل." : "Project saved to history.");
  }

  function handleReset() {
    setIdea("");
    setOutputs(null);
    setError("");
    setStatus(locale === "ar" ? "تمت إعادة ضبط المولد." : "Generator reset.");
  }

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden">
        <CardContent className="relative space-y-6 p-6 md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              {locale === "ar" ? "مولد برومبتات احترافي" : "Professional Prompt Generator"}
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl">
              PromptForge AI
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
              {locale === "ar"
                ? "حوّل أفكار المنتجات الخام إلى برومبتات احترافية للتصميم والبناء والإصلاح والنشر والتخطيط التجاري."
                : "Convert rough product ideas into professional design, build, fix, deployment, and business prompts for modern AI tools."}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4 lg:grid-cols-[1.2fr_1fr]"
          >
            <Card className="border-slate-700/60 bg-slate-950/35">
              <CardHeader>
                <CardTitle>{locale === "ar" ? "إدخال الفكرة" : "Idea Input"}</CardTitle>
                <CardDescription>
                  {locale === "ar"
                    ? "اكتب فكرة المنتج بلغة بسيطة وواضحة."
                    : "Describe your product idea in plain language."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <IdeaInput value={idea} onChange={setIdea} />
                <ExampleIdeas onPick={setIdea} />
              </CardContent>
            </Card>

            <Card className="border-slate-700/60 bg-slate-950/35">
              <CardHeader>
                <CardTitle>{locale === "ar" ? "خيارات ذكية" : "Smart Options"}</CardTitle>
                <CardDescription>
                  {locale === "ar"
                    ? "تحكم في نوع المخرجات والأداة والمستوى والأسلوب."
                    : "Control output mode, tool target, complexity, and style."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <OptionsPanel value={options} onChange={setOptions} />
                <Button onClick={handleGenerate} disabled={!generationEnabled || loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {locale === "ar" ? "جاري التوليد..." : "Generating..."}
                    </>
                  ) : (
                    locale === "ar" ? "توليد الحزمة" : "Generate Prompt Package"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </CardContent>
      </Card>

      {error ? (
        <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>
      ) : null}
      {status ? (
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{status}</div>
      ) : null}

      {outputs ? (
        <div className="space-y-4">
          <ExportActions
            onCopyAll={handleCopyAll}
            onExport={handleExport}
            onSave={handleSave}
            onReset={handleReset}
          />
          <OutputTabs outputs={outputs} onCopy={handleCopy} />
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-10 text-center text-sm text-slate-400">
            {locale === "ar"
              ? "ولّد حزمة برومبتات لعرض التحليل والمخرجات المنظمة وتقرير الجودة."
              : "Generate a prompt package to view analysis, structured prompts, and quality report."}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
