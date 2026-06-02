"use client";

import { useState } from "react";
import { PromptFrameworkCard } from "@/components/library/PromptFrameworkCard";
import { useI18n } from "@/components/providers/I18nProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { PROMPT_FRAMEWORKS } from "@/data/promptLibrary";

export default function LibraryPage() {
  const { locale } = useI18n();
  const [status, setStatus] = useState("");

  async function handleCopy(title: string, content: string) {
    await navigator.clipboard.writeText(content);
    setStatus(locale === "ar" ? `تم نسخ ${title}.` : `${title} copied.`);
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{locale === "ar" ? "مكتبة البرومبتات" : "Prompt Library"}</CardTitle>
          <CardDescription>
            {locale === "ar"
              ? "قوالب احترافية جاهزة للتصميم والبناء والإصلاح والتجهيز للنشر وتخطيط SaaS."
              : "Ready-made professional frameworks for design, build, fix, deployment, and SaaS planning."}
          </CardDescription>
        </CardHeader>
        {status ? <CardContent className="pt-0 text-sm text-emerald-300">{status}</CardContent> : null}
      </Card>
      <div className="grid gap-4 xl:grid-cols-2">
        {PROMPT_FRAMEWORKS.map((framework) => (
          <PromptFrameworkCard key={framework.id} framework={framework} onCopy={handleCopy} />
        ))}
      </div>
    </div>
  );
}
