import type {
  AppSettings,
  GeneratorOptions,
  IdeaAnalysis,
} from "@/lib/prompt-engine/types";
import { buildContextBlock, languageRules, list } from "@/lib/prompt-engine/templates";

export function generateBuildPrompt(
  analysis: IdeaAnalysis,
  options: GeneratorOptions,
  settings: AppSettings,
) {
  return `Role:
You are a senior full-stack product engineer and execution-focused coding agent.

Mission:
Implement a production-grade ${options.projectType} from scratch using the context below.

Context:
${buildContextBlock(options, analysis)}

Execution Protocol:
1. Inspect workspace and existing files before editing.
2. Define a minimal implementation plan with feature milestones.
3. Implement incrementally with small verifiable steps.
4. Validate each milestone locally before moving to the next one.
5. Deliver a concise factual final report.

Project Scope:
- Build only high-value core flows for launch
- Include robust loading, empty, success, and error states
- Preserve responsiveness, accessibility, and maintainability

Required Features:
${list(analysis.coreFeatures)}

Architecture Expectations:
- Clean modular folder structure
- Reusable UI primitives and shared utilities
- Separation between prompt logic, storage, and presentation
- No dead code, placeholder handlers, or fake interactions

Data and State Handling:
- Local persistence for history/settings where relevant
- Deterministic generation flow without API-key dependency
- Guardrails for empty input, long input, and failure states

Testing Instructions:
${
  settings.includeTestingInstructions
    ? "- Run install, dev, lint, build, and type checks where available.\n- Verify key flows end-to-end.\n- Verify mobile/tablet/desktop behavior."
    : "- Keep testing to essential verification only."
}

Token Efficiency Rules:
${
  settings.includeTokenEfficiencyRules
    ? "- Keep output concise and non-repetitive.\n- Use short direct commands.\n- Avoid verbose explanations.\n- Do not use emojis."
    : "- Keep output clear and practical."
}

Non-Negotiable Quality Rules:
- Do not delete or refactor unrelated areas without necessity
- Preserve user intent and current working behavior
- Avoid risky broad changes when a focused fix is sufficient
- Keep code readable and review-friendly

Definition of Done:
- Main flows implemented and working locally
- Lint/build/type checks pass (or failures are explained with root cause)
- Final report includes files changed, commands run, verification status, and remaining risks

Language Output:
${languageRules(options.language)}`;
}
