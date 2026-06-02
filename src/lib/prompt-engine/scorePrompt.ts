import type {
  GeneratorOptions,
  IdeaAnalysis,
  QualityReport,
  ScoreBreakdown,
} from "@/lib/prompt-engine/types";
import { getRecommendedToolsByMode } from "@/lib/prompt-engine/smart-routing";

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function scoreFromLength(text: string, min: number, max: number) {
  const len = text.trim().length;
  if (len <= min) return 35;
  if (len >= max) return 95;
  return clamp(35 + ((len - min) / (max - min)) * 60);
}

export function scorePrompt(
  idea: string,
  analysis: IdeaAnalysis,
  options: GeneratorOptions,
  outputs: {
    designPrompt: string;
    buildPrompt: string;
    fixPrompt: string;
    deployPrompt: string;
    businessPrompt: string;
  },
): QualityReport {
  const toolAligned = getRecommendedToolsByMode(options.outputMode).includes(options.targetTool);
  const clarity = scoreFromLength(idea, 80, 420);
  const scopeControl = clamp(analysis.nextSteps.length * 16 + (options.complexity === "Fast MVP" ? 8 : 0));
  const technicalSpecificity = clamp(analysis.suggestedTechDirection.length * 18);
  const designSpecificity = clamp(
    analysis.suggestedScreens.length * 10 + (options.stylePreset === "Minimal SaaS" ? 8 : 12),
  );
  const testability = clamp(outputs.buildPrompt.includes("Testing Instructions") ? 88 : 58);
  const tokenEfficiency = clamp(outputs.buildPrompt.includes("Token Efficiency Rules") ? 90 : 62);
  const deploymentReadiness = clamp(outputs.deployPrompt.length > 300 ? 86 : 62);
  const businessClarity = clamp(outputs.businessPrompt.length > 240 ? 82 : 58);

  const categoryScores: ScoreBreakdown = {
    clarity: Math.round(clarity),
    scopeControl: Math.round(scopeControl + (toolAligned ? 6 : -8)),
    technicalSpecificity: Math.round(technicalSpecificity),
    designSpecificity: Math.round(designSpecificity),
    testability: Math.round(testability),
    tokenEfficiency: Math.round(tokenEfficiency),
    deploymentReadiness: Math.round(deploymentReadiness),
    businessClarity: Math.round(businessClarity),
  };

  const totalScore = Math.round(
    Object.values(categoryScores).reduce((acc, value) => acc + value, 0) /
      Object.values(categoryScores).length,
  );

  const strengths = Object.entries(categoryScores)
    .filter(([, score]) => score >= 80)
    .map(([key]) => key.replace(/([A-Z])/g, " $1"));

  const weaknesses = Object.entries(categoryScores)
    .filter(([, score]) => score < 70)
    .map(([key]) => key.replace(/([A-Z])/g, " $1"));

  const improvementSuggestions: string[] = [
    "Add explicit user personas and concrete outcome metrics.",
    "Include exact acceptance criteria for each output section.",
    "Specify non-goals to reduce scope drift.",
    "Add priority ranking for features and screens.",
  ];

  if (options.language !== "English") {
    improvementSuggestions.push("Validate bilingual and RTL text patterns in generated prompts.");
  }

  if (options.complexity === "Enterprise Level") {
    improvementSuggestions.push("Include security/compliance constraints and audit logging requirements.");
  }

  return {
    totalScore,
    categoryScores,
    strengths: strengths.length > 0 ? strengths : ["Prompt structure coverage"],
    weaknesses: weaknesses.length > 0 ? weaknesses : ["No major weakness detected"],
    improvementSuggestions,
  };
}
