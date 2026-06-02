export interface PromptFramework {
  id: string;
  title: string;
  description: string;
  framework: string;
}

export const PROMPT_FRAMEWORKS: PromptFramework[] = [
  {
    id: "stitch-design",
    title: "Google Stitch Design Prompt Framework",
    description: "Screen-by-screen instruction structure for premium product UI generation.",
    framework: `Role: Senior Product Designer
Objective: Design a complete [PRODUCT TYPE] for [TARGET USERS].
Context:
- Product idea: [IDEA]
- Core user journey: [JOURNEY]
- Primary conversion goal: [GOAL]

Required Screens:
1. [Screen Name + Purpose]
2. [Screen Name + Purpose]
3. [Screen Name + Purpose]

Design System:
- Style preset: [STYLE]
- Typography hierarchy: [RULES]
- Spacing scale: [RULES]
- Color roles: [TOKENS]

UX Requirements:
- Responsive desktop/tablet/mobile layouts
- Clear empty/loading/error states
- Accessible contrast and focus states
- RTL support if Arabic content exists

Avoid:
- Generic components without hierarchy
- Overcrowded sections
- Inconsistent spacing and typography

Output:
- Final screen specs with component-level details
- Interaction notes and transitions`,
  },
  {
    id: "codex-build",
    title: "Codex Build Prompt Framework",
    description: "Execution-focused implementation prompt for coding agents.",
    framework: `Role: Senior Full-Stack Engineer
Mission: Build [PROJECT NAME] from scratch for [PRODUCT GOAL].

Execution Rules:
1. Inspect workspace first.
2. Build incrementally and keep commits logically scoped.
3. Do not delete existing files without reason.
4. Run lint/build/typecheck and fix issues before finalizing.

Technical Scope:
- Stack: [STACK]
- Required pages/features: [LIST]
- Data handling: [STATE + STORAGE]
- Quality constraints: [PERFORMANCE + ACCESSIBILITY]

Testing:
- Validate main user flows
- Verify responsive breakpoints
- Include edge-case handling

Final Report:
- Files changed
- Commands run
- Build/test status
- Known limitations`,
  },
  {
    id: "claude-fix",
    title: "Claude Code Fix Prompt Framework",
    description: "Focused template for fixing and stabilizing existing projects.",
    framework: `Role: Senior Debug Engineer
Task: Fix the current project safely and minimally.

Process:
1. Read package/config files and understand architecture.
2. Run install and diagnostics commands.
3. Reproduce issues and identify root causes.
4. Fix only necessary code paths.
5. Preserve existing behavior unless a bug requires change.
6. Re-run verification commands.

Output:
- Root cause summary
- Changed files and why
- Validation commands and results`,
  },
  {
    id: "cursor-continue",
    title: "Cursor Continue Project Framework",
    description: "Framework for extending an in-progress project without regressions.",
    framework: `Role: Senior Product Engineer
Mission: Continue this existing project from current state.

Instructions:
- Inspect current implementation and pending gaps.
- Preserve coding patterns and architecture consistency.
- Implement requested additions with minimal risk.
- Keep backward compatibility with current features.

Quality Bar:
- No breaking existing flows
- Clear error handling and states
- Concise final technical report`,
  },
  {
    id: "vps-deploy",
    title: "VPS Deployment Framework",
    description: "Production deployment planning prompt with safety checks.",
    framework: `Role: DevOps Engineer
Objective: Prepare [PROJECT NAME] for secure production deployment.

Checklist:
- Validate production build and scripts
- Verify required environment variables
- Confirm secrets are never hardcoded
- Add reverse proxy/service configuration guidance
- Define monitoring and log checks
- Add rollback procedure

Important:
- Provide VPS steps but do not execute unless explicitly requested.`,
  },
  {
    id: "saas-mvp",
    title: "SaaS MVP Framework",
    description: "Prompt skeleton for rapid but high-quality SaaS MVP planning and build.",
    framework: `Role: Startup Product Engineer
Goal: Launch a focused SaaS MVP in [TIMEFRAME].

Define:
- Core problem and ICP
- Must-have features only
- Key success metrics
- Monetization starter plan
- Post-launch iteration loop`,
  },
  {
    id: "arabic-rtl-ui",
    title: "Arabic RTL UI Framework",
    description: "Template for professional Arabic-first interface design and implementation.",
    framework: `Role: Arabic UX Specialist
Task: Build an RTL-first interface for [PRODUCT].

Requirements:
- Native RTL layout behavior
- Arabic typography and spacing optimization
- Mixed Arabic/English content handling
- Accessible and consistent navigation flow`,
  },
  {
    id: "admin-dashboard",
    title: "Admin Dashboard Framework",
    description: "Structured prompt for building robust operations dashboards.",
    framework: `Role: Senior Dashboard Architect
Objective: Build an operations dashboard for [DOMAIN].

Core Modules:
- KPI overview
- Table views with filters
- Detail drilldowns
- Role-based action controls
- Export/reporting tools

Non-Functional:
- Fast performance with large datasets
- Clear empty and failure states
- Audit-friendly action logs`,
  },
];
