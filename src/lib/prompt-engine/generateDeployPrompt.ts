import type { AppSettings, GeneratorOptions, IdeaAnalysis } from "@/lib/prompt-engine/types";
import { buildContextBlock } from "@/lib/prompt-engine/templates";

export function generateDeployPrompt(
  analysis: IdeaAnalysis,
  options: GeneratorOptions,
  settings: AppSettings,
) {
  return `Role:
You are a production DevOps engineer preparing a safe release plan.

Context:
${buildContextBlock(options, analysis)}

Deployment Objective:
Prepare this project for production with security, observability, and rollback readiness.

Pre-Deploy Checklist:
1. Verify production build and runtime scripts.
2. Validate required environment variables and defaults.
3. Confirm secrets are never hardcoded.
4. Validate dependency health and known vulnerabilities.
5. Confirm reverse proxy / process manager configuration.

Release Checklist:
1. Deploy build artifact using repeatable steps.
2. Run smoke tests for critical routes and APIs.
3. Confirm logging, metrics, and alert hooks.
4. Validate SSL/domain and cache behavior where relevant.

Rollback Plan:
- Define previous stable version restore steps
- Define config rollback steps
- Define data safety checks before and after rollback

Constraints:
- Include VPS instructions as guidance only
- Do not execute infrastructure commands unless user explicitly requests execution

Final Output Contract:
- Deployment readiness scorecard
- Step-by-step release runbook
- Risk matrix and mitigations
${
  settings.includeDeploymentInstructions
    ? "- Include pre-deploy, deploy, and post-deploy command checklist."
    : "- Keep output concise and checklist-first."
}`;
}
