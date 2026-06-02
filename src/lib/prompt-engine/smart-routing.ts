import type { GeneratorOptions, OutputMode, TargetTool } from "@/lib/prompt-engine/types";

const DESIGN_TOOLS: TargetTool[] = ["Google Stitch", "v0", "Lovable", "Figma AI", "Generic AI Agent"];
const BUILD_TOOLS: TargetTool[] = ["Codex", "Claude Code", "Cursor", "Windsurf", "Generic AI Agent"];
const DEPLOY_TOOLS: TargetTool[] = ["Codex", "Claude Code", "Cursor", "Windsurf", "Generic AI Agent"];
const BUSINESS_TOOLS: TargetTool[] = ["Generic AI Agent", "Claude Code", "Codex"];

export function getRecommendedToolsByMode(mode: OutputMode): TargetTool[] {
  if (mode === "design") return DESIGN_TOOLS;
  if (mode === "build") return BUILD_TOOLS;
  if (mode === "fix") return BUILD_TOOLS;
  if (mode === "deploy") return DEPLOY_TOOLS;
  if (mode === "business") return BUSINESS_TOOLS;
  return [
    "Codex",
    "Claude Code",
    "Cursor",
    "Windsurf",
    "Google Stitch",
    "v0",
    "Lovable",
    "Figma AI",
    "Generic AI Agent",
  ];
}

export function getModeHint(mode: OutputMode) {
  if (mode === "design") return "Design-focused toolset is enabled.";
  if (mode === "build") return "Coding-agent toolset is enabled.";
  if (mode === "fix") return "Debugging/fix toolset is enabled.";
  if (mode === "deploy") return "Deployment/DevOps toolset is enabled.";
  if (mode === "business") return "Business-planning toolset is enabled.";
  return "Full package mode supports all tools.";
}

export function normalizeOptionsByMode(options: GeneratorOptions): GeneratorOptions {
  const allowed = getRecommendedToolsByMode(options.outputMode);
  if (allowed.includes(options.targetTool)) return options;
  return {
    ...options,
    targetTool: allowed[0],
  };
}
