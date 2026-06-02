import type { GeneratorOptions, IdeaAnalysis } from "@/lib/prompt-engine/types";

export function list(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function stylePresetGuidance(style: GeneratorOptions["stylePreset"]) {
  const map: Record<GeneratorOptions["stylePreset"], string> = {
    "Apple Premium":
      "Minimal premium surfaces, high typography discipline, refined spacing, soft materials.",
    "Minimal SaaS":
      "Clean SaaS dashboard structure, efficient layout hierarchy, restrained visuals.",
    "Arabic RTL Professional":
      "RTL-first layout, Arabic typography tuning, clear bilingual handling.",
    "Islamic Elegant":
      "Respectful visual tone, elegant geometry, trust-focused content and hierarchy.",
    "Gaming Neon":
      "High contrast neon accents, dynamic composition, strong interactive feedback.",
    "Enterprise Dashboard":
      "Information-dense, operational clarity, table/chart heavy workflows.",
    "Luxury Brand":
      "High-end visual restraint, premium typography, editorial composition.",
    "Youth Mobile App":
      "Mobile-first, energetic but readable visuals, fast and clear interactions.",
  };

  return map[style];
}

export function languageRules(language: GeneratorOptions["language"]) {
  if (language === "Arabic") {
    return "Output in Arabic with full RTL alignment and culturally natural phrasing.";
  }
  if (language === "Mixed Arabic/English") {
    return "Output in mixed Arabic/English where technical terms can remain English, with RTL-safe formatting.";
  }
  return "Output in English with concise professional style.";
}

export function buildContextBlock(options: GeneratorOptions, analysis: IdeaAnalysis) {
  const styleLine =
    options.outputMode === "design" || options.outputMode === "full"
      ? `Style Preset (active): ${options.stylePreset}`
      : `Style Hint (optional, not binding): ${options.stylePreset}`;

  return `Project Type: ${options.projectType}
Target Tool: ${options.targetTool}
Complexity: ${options.complexity}
Language Mode: ${options.language}
${styleLine}
Project Summary: ${analysis.projectSummary}
Target Users: ${analysis.targetUsers}
Problem: ${analysis.mainProblem}
Solution: ${analysis.proposedSolution}`;
}
