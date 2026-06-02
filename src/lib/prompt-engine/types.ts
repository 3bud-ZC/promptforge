export type OutputMode =
  | "design"
  | "build"
  | "fix"
  | "deploy"
  | "business"
  | "full";

export type TargetTool =
  | "Google Stitch"
  | "v0"
  | "Lovable"
  | "Figma AI"
  | "Codex"
  | "Claude Code"
  | "Cursor"
  | "Windsurf"
  | "Generic AI Agent";

export type ProjectType =
  | "Web App"
  | "Mobile App"
  | "SaaS"
  | "Dashboard"
  | "E-commerce"
  | "Game"
  | "Landing Page"
  | "Internal Tool"
  | "Islamic App"
  | "Custom";

export type Complexity = "Fast MVP" | "Production Ready" | "Enterprise Level";
export type LanguageMode = "English" | "Arabic" | "Mixed Arabic/English";
export type StylePreset =
  | "Apple Premium"
  | "Minimal SaaS"
  | "Arabic RTL Professional"
  | "Islamic Elegant"
  | "Gaming Neon"
  | "Enterprise Dashboard"
  | "Luxury Brand"
  | "Youth Mobile App";

export interface GeneratorOptions {
  outputMode: OutputMode;
  targetTool: TargetTool;
  projectType: ProjectType;
  complexity: Complexity;
  language: LanguageMode;
  stylePreset: StylePreset;
}

export interface AppSettings {
  defaultTargetTool: TargetTool;
  defaultComplexity: Complexity;
  defaultLanguage: LanguageMode;
  defaultStylePreset: StylePreset;
  compactOutput: boolean;
  includeTestingInstructions: boolean;
  includeDeploymentInstructions: boolean;
  includeTokenEfficiencyRules: boolean;
}

export interface IdeaAnalysis {
  projectSummary: string;
  targetUsers: string;
  mainProblem: string;
  proposedSolution: string;
  coreFeatures: string[];
  suggestedScreens: string[];
  suggestedDataModel: string[];
  suggestedTechDirection: string[];
  designDirection: string;
  riskPoints: string[];
  missingDetails: string[];
  nextSteps: string[];
}

export interface ScoreBreakdown {
  clarity: number;
  scopeControl: number;
  technicalSpecificity: number;
  designSpecificity: number;
  testability: number;
  tokenEfficiency: number;
  deploymentReadiness: number;
  businessClarity: number;
}

export interface QualityReport {
  totalScore: number;
  categoryScores: ScoreBreakdown;
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
}

export interface GeneratedOutputs {
  analysis: IdeaAnalysis;
  designPrompt: string;
  buildPrompt: string;
  fixPrompt: string;
  deployPrompt: string;
  businessPrompt: string;
  qualityReport: QualityReport;
}

export interface HistoryItem {
  id: string;
  title: string;
  idea: string;
  options: GeneratorOptions;
  outputs: GeneratedOutputs;
  createdAt: string;
}
