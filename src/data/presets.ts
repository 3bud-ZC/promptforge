import type {
  AppSettings,
  Complexity,
  GeneratorOptions,
  LanguageMode,
  OutputMode,
  ProjectType,
  StylePreset,
  TargetTool,
} from "@/lib/prompt-engine/types";

export const OUTPUT_MODES: OutputMode[] = [
  "design",
  "build",
  "fix",
  "deploy",
  "business",
  "full",
];

export const OUTPUT_MODE_LABELS: Record<OutputMode, string> = {
  design: "Design Prompt",
  build: "Build Prompt",
  fix: "Fix Existing Project Prompt",
  deploy: "Deployment Prompt",
  business: "Business Planning Prompt",
  full: "Full Package",
};

export const TARGET_TOOLS: TargetTool[] = [
  "Google Stitch",
  "v0",
  "Lovable",
  "Figma AI",
  "Codex",
  "Claude Code",
  "Cursor",
  "Windsurf",
  "Generic AI Agent",
];

export const PROJECT_TYPES: ProjectType[] = [
  "Web App",
  "Mobile App",
  "SaaS",
  "Dashboard",
  "E-commerce",
  "Game",
  "Landing Page",
  "Internal Tool",
  "Islamic App",
  "Custom",
];

export const COMPLEXITY_LEVELS: Complexity[] = [
  "Fast MVP",
  "Production Ready",
  "Enterprise Level",
];

export const LANGUAGE_MODES: LanguageMode[] = [
  "English",
  "Arabic",
  "Mixed Arabic/English",
];

export const STYLE_PRESETS: StylePreset[] = [
  "Apple Premium",
  "Minimal SaaS",
  "Arabic RTL Professional",
  "Islamic Elegant",
  "Gaming Neon",
  "Enterprise Dashboard",
  "Luxury Brand",
  "Youth Mobile App",
];

export const DEFAULT_OPTIONS: GeneratorOptions = {
  outputMode: "full",
  targetTool: "Codex",
  projectType: "SaaS",
  complexity: "Production Ready",
  language: "English",
  stylePreset: "Minimal SaaS",
};

export const DEFAULT_SETTINGS: AppSettings = {
  defaultTargetTool: "Codex",
  defaultComplexity: "Production Ready",
  defaultLanguage: "English",
  defaultStylePreset: "Minimal SaaS",
  compactOutput: false,
  includeTestingInstructions: true,
  includeDeploymentInstructions: true,
  includeTokenEfficiencyRules: true,
};
