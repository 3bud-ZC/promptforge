import type { GeneratorOptions, IdeaAnalysis } from "@/lib/prompt-engine/types";

const GENERIC_FEATURES = [
  "Role-aware onboarding and user profile management",
  "Core workflow engine with clear success path",
  "Search, filter, and structured navigation",
  "Notifications, reminders, and status updates",
  "Analytics, tracking, and measurable outcomes",
  "Settings, preferences, and data controls",
];

function extractKeywords(idea: string) {
  return idea
    .toLowerCase()
    .split(/[^a-zA-Z0-9\u0600-\u06FF]+/)
    .filter((token) => token.length > 3);
}

function inferTargetUsers(idea: string, projectType: GeneratorOptions["projectType"]) {
  if (idea.toLowerCase().includes("islamic")) return "Muslim users seeking practical daily guidance";
  if (idea.toLowerCase().includes("dashboard")) return "Operations teams and internal decision makers";
  if (idea.toLowerCase().includes("game")) return "End users seeking engaging interactive experiences";
  if (projectType === "E-commerce") return "Online shoppers and catalog managers";
  if (projectType === "Internal Tool") return "Internal teams with process automation needs";
  return "Primary target segment aligned with the product idea";
}

function inferTechDirection(idea: string, projectType: GeneratorOptions["projectType"]) {
  const base = [
    "TypeScript-first frontend architecture",
    "Component-driven UI with reusable primitives",
    "Local persistence for first release",
    "Modular prompt and business logic layer",
  ];

  if (projectType === "Game" || idea.toLowerCase().includes("game")) {
    return [...base, "Canvas/WebGL strategy for gameplay rendering"];
  }

  if (projectType === "Mobile App") {
    return [...base, "Mobile-first design system and interaction patterns"];
  }

  return [...base, "Web app architecture with scalable service boundaries"];
}

export function analyzeIdea(idea: string, options: GeneratorOptions): IdeaAnalysis {
  const trimmedIdea = idea.trim();
  const keywords = extractKeywords(trimmedIdea);
  const topKeywords = Array.from(new Set(keywords)).slice(0, 6);

  const coreFeaturesBase =
    topKeywords.length > 0
      ? [
          ...topKeywords.slice(0, 3).map((word) => `Feature module centered on ${word}`),
          ...GENERIC_FEATURES.slice(0, 3),
        ]
      : GENERIC_FEATURES.slice(0, 6);

  const projectTypeBoost: Record<GeneratorOptions["projectType"], string[]> = {
    "Web App": ["Browser-first architecture with robust state handling"],
    "Mobile App": ["Mobile-first navigation and touch-optimized interactions"],
    SaaS: ["Subscription-ready product workflow and tenant-safe structure"],
    Dashboard: ["KPI panels, filters, and drill-down interaction layer"],
    "E-commerce": ["Catalog, cart, checkout intent flow, and conversion tracking"],
    Game: ["Gameplay loop, progression, and challenge-reward system"],
    "Landing Page": ["High-conversion storytelling and clear CTA hierarchy"],
    "Internal Tool": ["Operational workflow automation and role-based control"],
    "Islamic App": ["Authentic source handling and respectful content integrity"],
    Custom: ["Domain-specific module set aligned with user intent"],
  };

  const coreFeatures = [...coreFeaturesBase, ...projectTypeBoost[options.projectType]].slice(0, 8);

  const suggestedScreens = [
    "Landing or onboarding screen",
    "Primary workflow screen",
    "Detailed item/result screen",
    "History or saved projects screen",
    "Settings and preferences screen",
    "Help and guidance screen",
  ];

  const missingDetails = [
    "Precise success metrics for launch",
    "Detailed role/permission model if multi-user",
    "Content moderation and compliance constraints",
    "External integrations priority list",
  ];

  return {
    projectSummary:
      trimmedIdea.length > 140
        ? `${trimmedIdea.slice(0, 140)}...`
        : trimmedIdea,
    targetUsers: inferTargetUsers(trimmedIdea, options.projectType),
    mainProblem:
      "The initial idea is high-level and needs concrete, execution-ready constraints to prevent weak or generic outputs.",
    proposedSolution:
      "Transform the idea into a structured product brief with scoped features, explicit constraints, and prompt-ready execution rules.",
    coreFeatures,
    suggestedScreens,
    suggestedDataModel: [
      "User entity with preferences and usage metadata",
      "Project entity with idea, configuration, and generated outputs",
      "History entity with timestamps and quality scoring",
      "Configuration entity for style/language/complexity defaults",
    ],
    suggestedTechDirection: inferTechDirection(trimmedIdea, options.projectType),
    designDirection: `Apply ${options.stylePreset} visual system with premium hierarchy and strong readability.`,
    riskPoints: [
      "Scope expansion beyond initial release",
      "Weak prompt specificity reducing output quality",
      "Inconsistent UX for multilingual or RTL content",
      "Missing validation and testing instructions in generated prompts",
      "Tool-mode mismatch leading to weak or off-target output",
    ],
    missingDetails,
    nextSteps: [
      "Lock MVP boundaries and non-goals",
      "Define exact acceptance criteria per output mode",
      "Run prompt outputs against 2-3 real project ideas",
      "Iterate templates based on quality report weaknesses",
    ],
  };
}
