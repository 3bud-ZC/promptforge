import type {
  AppSettings,
  GeneratorOptions,
  IdeaAnalysis,
} from "@/lib/prompt-engine/types";
import {
  buildContextBlock,
  languageRules,
  list,
  stylePresetGuidance,
} from "@/lib/prompt-engine/templates";

export function generateDesignPrompt(
  analysis: IdeaAnalysis,
  options: GeneratorOptions,
  settings: AppSettings,
) {
  return `Role:
You are a principal product designer producing high-fidelity, production-ready UX specifications for ${options.targetTool}.

Project Context:
${buildContextBlock(options, analysis)}

Mission:
Convert the raw idea into a complete ${options.projectType} design system and screen architecture that can be implemented without ambiguity.

Target Users:
${analysis.targetUsers}

Required Screens:
${list(analysis.suggestedScreens)}

Visual Direction:
${stylePresetGuidance(options.stylePreset)}

Information Architecture Rules:
- Define entry points, primary actions, and exit states per screen
- Keep hierarchy explicit with section-level intent
- Include loading, empty, success, and error states as first-class UI states

Component Requirements:
${list(analysis.coreFeatures)}

Interaction and Motion:
- Define hover, focus, active, disabled, and validation states for key components
- Add purposeful transitions that clarify state changes
- Avoid decorative motion that does not serve usability

Responsiveness:
- Explicit layouts for desktop/tablet/mobile with breakpoint-level behavior
- Long-content safety: no overflow or clipped actions under dense content

Accessibility:
- WCAG-aware contrast and keyboard navigation flow
- Clear semantics and focus order for assistive technologies

RTL Support:
${
  options.language !== "English"
    ? "- Apply full RTL-safe spacing, alignment, and typography where Arabic is used."
    : "- Maintain LTR layout."
}

Content Guidelines:
${languageRules(options.language)}

Anti-Patterns To Avoid:
- Generic template-like layout with weak hierarchy
- Inconsistent spacing, typography scale, and component behavior
- Missing state coverage for critical flows
- Over-designed visuals that reduce clarity

Definition of Done:
- Screen-by-screen spec with purpose and primary task per screen
- Reusable component inventory with variant rules
- Interaction map for key user journeys
- Responsive + accessibility acceptance checklist
${
  settings.compactOutput
    ? "- Keep response concise and implementation-oriented."
    : "- Include enough detail for direct implementation handoff."
}`;
}
