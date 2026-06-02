import {
  COMPLEXITY_LEVELS,
  LANGUAGE_MODES,
  OUTPUT_MODES,
  PROJECT_TYPES,
  STYLE_PRESETS,
} from "@/data/presets";
import type { GeneratorOptions } from "@/lib/prompt-engine/types";
import { getModeHint, getRecommendedToolsByMode } from "@/lib/prompt-engine/smart-routing";
import { Select } from "@/components/ui/Select";
import { useI18n } from "@/components/providers/I18nProvider";

interface OptionsPanelProps {
  value: GeneratorOptions;
  onChange: (next: GeneratorOptions) => void;
}

export function OptionsPanel({ value, onChange }: OptionsPanelProps) {
  const { locale, outputModeLabel, projectTypeLabel, complexityLabel, languageModeLabel, styleLabel } =
    useI18n();
  const recommendedTools = getRecommendedToolsByMode(value.outputMode);
  const toolValue = recommendedTools.includes(value.targetTool) ? value.targetTool : recommendedTools[0];

  const update = <K extends keyof GeneratorOptions>(key: K, next: GeneratorOptions[K]) => {
    onChange({ ...value, [key]: next });
  };

  const handleModeChange = (nextMode: GeneratorOptions["outputMode"]) => {
    const tools = getRecommendedToolsByMode(nextMode);
    const nextTool = tools.includes(value.targetTool) ? value.targetTool : tools[0];
    onChange({ ...value, outputMode: nextMode, targetTool: nextTool });
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Select
        label={locale === "ar" ? "نوع المخرجات" : "Output Mode"}
        value={value.outputMode}
        onChange={(event) => handleModeChange(event.target.value as GeneratorOptions["outputMode"])}
      >
        {OUTPUT_MODES.map((mode) => (
          <option key={mode} value={mode}>
            {outputModeLabel(mode)}
          </option>
        ))}
      </Select>

      <Select
        label={locale === "ar" ? "الأداة المستهدفة" : "Target Tool"}
        value={toolValue}
        onChange={(event) => update("targetTool", event.target.value as GeneratorOptions["targetTool"])}
      >
        {recommendedTools.map((tool) => (
          <option key={tool} value={tool}>
            {tool}
          </option>
        ))}
      </Select>

      <Select
        label={locale === "ar" ? "نوع المشروع" : "Project Type"}
        value={value.projectType}
        onChange={(event) => update("projectType", event.target.value as GeneratorOptions["projectType"])}
      >
        {PROJECT_TYPES.map((projectType) => (
          <option key={projectType} value={projectType}>
            {projectTypeLabel(projectType)}
          </option>
        ))}
      </Select>

      <Select
        label={locale === "ar" ? "مستوى التعقيد" : "Complexity"}
        value={value.complexity}
        onChange={(event) => update("complexity", event.target.value as GeneratorOptions["complexity"])}
      >
        {COMPLEXITY_LEVELS.map((complexity) => (
          <option key={complexity} value={complexity}>
            {complexityLabel(complexity)}
          </option>
        ))}
      </Select>

      <Select
        label={locale === "ar" ? "لغة المخرجات" : "Language"}
        value={value.language}
        onChange={(event) => update("language", event.target.value as GeneratorOptions["language"])}
      >
        {LANGUAGE_MODES.map((language) => (
          <option key={language} value={language}>
            {languageModeLabel(language)}
          </option>
        ))}
      </Select>

      <Select
        label={locale === "ar" ? "توجه الواجهة (مرن)" : "Interface Direction (Flexible)"}
        value={value.stylePreset}
        onChange={(event) => update("stylePreset", event.target.value as GeneratorOptions["stylePreset"])}
      >
        {STYLE_PRESETS.map((style) => (
          <option key={style} value={style}>
            {styleLabel(style)}
          </option>
        ))}
      </Select>
      <p className="md:col-span-2 text-xs text-slate-400">
        {locale === "ar"
          ? "توجيه ذكي مفعل: يتم فلترة الأدوات تلقائيًا حسب نوع المخرجات لضمان برومبت أدق."
          : `Smart routing active: ${getModeHint(value.outputMode)}`}
      </p>
    </div>
  );
}
