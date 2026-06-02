import type { GeneratedOutputs, GeneratorOptions } from "@/lib/prompt-engine/types";
import { formatDate, slugify } from "@/lib/utils";

function section(title: string, content: string) {
  if (!content.trim()) return "";
  return `## ${title}\n\n${content.trim()}\n\n`;
}

export function buildMarkdownExport(params: {
  title: string;
  idea: string;
  options: GeneratorOptions;
  outputs: GeneratedOutputs;
  createdAt?: string;
}) {
  const { title, idea, options, outputs, createdAt } = params;
  const analysis = outputs.analysis;

  return `# ${title}

Date: ${formatDate(createdAt ?? new Date().toISOString())}

## Original Idea

${idea}

## Selected Options

- Output Mode: ${options.outputMode}
- Target Tool: ${options.targetTool}
- Project Type: ${options.projectType}
- Complexity: ${options.complexity}
- Language: ${options.language}
- Style Preset: ${options.stylePreset}

## Analysis

- Project Summary: ${analysis.projectSummary}
- Target Users: ${analysis.targetUsers}
- Main Problem: ${analysis.mainProblem}
- Proposed Solution: ${analysis.proposedSolution}

### Core Features
${analysis.coreFeatures.map((x) => `- ${x}`).join("\n")}

### Suggested Screens
${analysis.suggestedScreens.map((x) => `- ${x}`).join("\n")}

### Suggested Data Model
${analysis.suggestedDataModel.map((x) => `- ${x}`).join("\n")}

### Suggested Tech Direction
${analysis.suggestedTechDirection.map((x) => `- ${x}`).join("\n")}

### Design Direction
${analysis.designDirection}

### Risks
${analysis.riskPoints.map((x) => `- ${x}`).join("\n")}

### Missing Details
${analysis.missingDetails.map((x) => `- ${x}`).join("\n")}

### Recommended Next Steps
${analysis.nextSteps.map((x) => `- ${x}`).join("\n")}

${section("Design Prompt", outputs.designPrompt)}${section("Build Prompt", outputs.buildPrompt)}${section("Fix Prompt", outputs.fixPrompt)}${section("Deploy Prompt", outputs.deployPrompt)}${section("Business Plan Prompt", outputs.businessPrompt)}## Quality Report

- Total Score: ${outputs.qualityReport.totalScore}/100

### Category Scores
${Object.entries(outputs.qualityReport.categoryScores)
  .map(([k, v]) => `- ${k}: ${v}/100`)
  .join("\n")}

### Strengths
${outputs.qualityReport.strengths.map((x) => `- ${x}`).join("\n")}

### Weaknesses
${outputs.qualityReport.weaknesses.map((x) => `- ${x}`).join("\n")}

### Improvement Suggestions
${outputs.qualityReport.improvementSuggestions.map((x) => `- ${x}`).join("\n")}
`;
}

export function downloadMarkdown(filenameSeed: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(filenameSeed) || "promptforge-export"}.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
