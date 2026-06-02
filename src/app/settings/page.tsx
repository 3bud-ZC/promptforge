"use client";

import { useState } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { COMPLEXITY_LEVELS, DEFAULT_SETTINGS, LANGUAGE_MODES, STYLE_PRESETS, TARGET_TOOLS } from "@/data/presets";
import type { AppSettings } from "@/lib/prompt-engine/types";
import { clearAllLocalData, getSettings, saveSettings } from "@/lib/storage/settingsStorage";

export default function SettingsPage() {
  const { locale, complexityLabel, languageModeLabel, styleLabel } = useI18n();
  const [settings, setSettings] = useState<AppSettings>(() => getSettings());
  const [status, setStatus] = useState("");

  const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  function persist() {
    saveSettings(settings);
    setStatus(locale === "ar" ? "تم حفظ الإعدادات." : "Settings saved.");
  }

  function clearData() {
    clearAllLocalData();
    setSettings(DEFAULT_SETTINGS);
    setStatus(locale === "ar" ? "تم مسح كل البيانات المحلية." : "All local data cleared.");
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{locale === "ar" ? "الإعدادات الافتراضية" : "Default Configuration"}</CardTitle>
          <CardDescription>
            {locale === "ar"
              ? "حدد تفضيلات التوليد الافتراضية وسلوك المخرجات."
              : "Set default generation preferences and output behavior."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Select
              label={locale === "ar" ? "الأداة الافتراضية" : "Default Target Tool"}
              value={settings.defaultTargetTool}
              onChange={(event) => update("defaultTargetTool", event.target.value as AppSettings["defaultTargetTool"])}
            >
              {TARGET_TOOLS.map((tool) => (
                <option key={tool} value={tool}>
                  {tool}
                </option>
              ))}
            </Select>
            <Select
              label={locale === "ar" ? "التعقيد الافتراضي" : "Default Complexity"}
              value={settings.defaultComplexity}
              onChange={(event) =>
                update("defaultComplexity", event.target.value as AppSettings["defaultComplexity"])
              }
            >
              {COMPLEXITY_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {complexityLabel(level)}
                </option>
              ))}
            </Select>
            <Select
              label={locale === "ar" ? "اللغة الافتراضية" : "Default Language"}
              value={settings.defaultLanguage}
              onChange={(event) => update("defaultLanguage", event.target.value as AppSettings["defaultLanguage"])}
            >
              {LANGUAGE_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {languageModeLabel(mode)}
                </option>
              ))}
            </Select>
            <Select
              label={locale === "ar" ? "النمط الافتراضي" : "Default Style Preset"}
              value={settings.defaultStylePreset}
              onChange={(event) =>
                update("defaultStylePreset", event.target.value as AppSettings["defaultStylePreset"])
              }
            >
              {STYLE_PRESETS.map((style) => (
                <option key={style} value={style}>
                  {styleLabel(style)}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Switch
              checked={settings.compactOutput}
              onChange={(checked) => update("compactOutput", checked)}
              label={locale === "ar" ? "مخرجات مختصرة" : "Compact Output"}
              description={locale === "ar" ? "يفضل مخرجات أكثر اختصارًا." : "Prefer concise generated prompts."}
            />
            <Switch
              checked={settings.includeTestingInstructions}
              onChange={(checked) => update("includeTestingInstructions", checked)}
              label={locale === "ar" ? "تضمين تعليمات الاختبار" : "Include Testing Instructions"}
            />
            <Switch
              checked={settings.includeDeploymentInstructions}
              onChange={(checked) => update("includeDeploymentInstructions", checked)}
              label={locale === "ar" ? "تضمين تعليمات النشر" : "Include Deployment Instructions"}
            />
            <Switch
              checked={settings.includeTokenEfficiencyRules}
              onChange={(checked) => update("includeTokenEfficiencyRules", checked)}
              label={locale === "ar" ? "تضمين قواعد كفاءة التوكن" : "Include Token Efficiency Rules"}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={persist}>{locale === "ar" ? "حفظ الإعدادات" : "Save Settings"}</Button>
            <Button variant="danger" onClick={clearData}>
              {locale === "ar" ? "مسح كل البيانات المحلية" : "Clear All Local Data"}
            </Button>
          </div>
          {status ? <p className="text-sm text-emerald-300">{status}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
