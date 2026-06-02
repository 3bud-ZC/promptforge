import { analyzeIdea } from "@/lib/prompt-engine/analyzeIdea";
import { generateBuildPrompt } from "@/lib/prompt-engine/generateBuildPrompt";
import { generateBusinessPrompt } from "@/lib/prompt-engine/generateBusinessPrompt";
import { generateDeployPrompt } from "@/lib/prompt-engine/generateDeployPrompt";
import { generateDesignPrompt } from "@/lib/prompt-engine/generateDesignPrompt";
import { generateFixPrompt } from "@/lib/prompt-engine/generateFixPrompt";
import { scorePrompt } from "@/lib/prompt-engine/scorePrompt";
import { normalizeOptionsByMode } from "@/lib/prompt-engine/smart-routing";
import type {
  AppSettings,
  GeneratedOutputs,
  GeneratorOptions,
} from "@/lib/prompt-engine/types";

export function generatePromptPackage(
  idea: string,
  options: GeneratorOptions,
  settings: AppSettings,
): GeneratedOutputs {
  const smartOptions = normalizeOptionsByMode(options);
  const analysis = analyzeIdea(idea, smartOptions);

  const designPrompt = generateDesignPrompt(analysis, smartOptions, settings);
  const buildPrompt = generateBuildPrompt(analysis, smartOptions, settings);
  const fixPrompt = generateFixPrompt(analysis, smartOptions, settings);
  const deployPrompt = generateDeployPrompt(analysis, smartOptions, settings);
  const businessPrompt = generateBusinessPrompt(analysis, smartOptions);

  const mode = smartOptions.outputMode;
  const outputs = {
    analysis,
    designPrompt: mode === "design" || mode === "full" ? designPrompt : "",
    buildPrompt: mode === "build" || mode === "full" ? buildPrompt : "",
    fixPrompt: mode === "fix" || mode === "full" ? fixPrompt : "",
    deployPrompt: mode === "deploy" || mode === "full" ? deployPrompt : "",
    businessPrompt: mode === "business" || mode === "full" ? businessPrompt : "",
    qualityReport: scorePrompt(idea, analysis, smartOptions, {
      designPrompt,
      buildPrompt,
      fixPrompt,
      deployPrompt,
      businessPrompt,
    }),
  };

  return outputs;
}

export * from "@/lib/prompt-engine/types";
