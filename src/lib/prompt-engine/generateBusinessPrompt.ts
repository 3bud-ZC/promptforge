import type { GeneratorOptions, IdeaAnalysis } from "@/lib/prompt-engine/types";
import { buildContextBlock } from "@/lib/prompt-engine/templates";

export function generateBusinessPrompt(
  analysis: IdeaAnalysis,
  options: GeneratorOptions,
) {
  return `Role:
You are a senior SaaS strategist and product-market-fit advisor.

Context:
${buildContextBlock(options, analysis)}

Business Mission:
Turn this product idea into an execution-ready market plan with explicit assumptions and measurable outcomes.

Required Sections:
1. Positioning statement and value proposition
2. ICP and target segments with buying triggers
3. Competitor mapping and differentiation angle
4. MVP scope, non-goals, and launch criteria
5. Monetization model and pricing hypotheses
6. GTM launch strategy (channels + messaging + first 90 days)
7. Risk map (product, market, technical, operational)
8. 12-month roadmap with milestone metrics

Output Rules:
- Prefer specific decisions over generic advice
- Mark assumptions and unknowns clearly
- Keep recommendations practical and testable`;
}
