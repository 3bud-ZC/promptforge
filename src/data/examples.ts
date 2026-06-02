export interface ExampleIdea {
  title: string;
  titleAr?: string;
  idea: string;
}

export const EXAMPLE_IDEAS: ExampleIdea[] = [
  {
    title: "Islamic Sunnah daily routine app",
    titleAr: "تطبيق روتين السنة اليومي",
    idea: "I want to build an Islamic app that helps people follow the Prophet's daily routine with authentic sources, reminders, progress tracking, and an AI assistant for practical daily questions.",
  },
  {
    title: "AI skincare consultant website",
    titleAr: "موقع مستشار عناية بالبشرة بالذكاء الاصطناعي",
    idea: "Build a premium AI skincare consultant site where users answer a skin quiz, upload photos, and receive routines, product suggestions, and follow-up plans.",
  },
  {
    title: "Inventory ERP dashboard",
    titleAr: "لوحة ERP للمخزون",
    idea: "Create an ERP dashboard for inventory and purchasing with role-based access, low-stock alerts, supplier tracking, and monthly performance reports.",
  },
  {
    title: "Birthday cinematic website",
    titleAr: "موقع سينمائي لعيد ميلاد",
    idea: "Design a cinematic birthday microsite with personalized story sections, photo timeline, background music controls, and mobile-first sharing.",
  },
  {
    title: "2D browser game",
    titleAr: "لعبة متصفح ثنائية الأبعاد",
    idea: "Build a 2D browser game with levels, collectibles, enemies, boss fights, and a progression system that saves user progress locally.",
  },
  {
    title: "Telegram automation bot",
    titleAr: "بوت أتمتة تيليجرام",
    idea: "Create a Telegram automation bot platform for scheduling posts, analyzing engagement, and managing multiple channels with templates.",
  },
  {
    title: "E-commerce Instagram catalog",
    titleAr: "كتالوج إنستجرام للتجارة الإلكترونية",
    idea: "Develop an e-commerce catalog app optimized for Instagram sellers with product cards, auto-generated captions, and WhatsApp checkout links.",
  },
  {
    title: "AI study planner",
    titleAr: "مخطط دراسة بالذكاء الاصطناعي",
    idea: "I need an AI study planner app that builds weekly plans based on exam dates, tracks progress, and suggests revision strategies for weak topics.",
  },
];

const SMART_DOMAIN_BLOCKS = [
  "health-tech",
  "education",
  "Islamic lifestyle",
  "retail operations",
  "creator economy",
  "B2B SaaS",
  "travel planning",
  "SME finance",
  "real-estate leads",
  "fitness coaching",
];

const SMART_AUDIENCE_BLOCKS = [
  "students preparing for exams",
  "small business owners",
  "Arabic-speaking professionals",
  "parents and families",
  "operations managers",
  "content creators",
  "startup founders",
  "freelancers",
];

const SMART_FEATURE_BLOCKS = [
  "AI assistant for daily decisions",
  "smart reminders and recurring plans",
  "analytics dashboard with weekly insights",
  "role-based team workspace",
  "mobile-first onboarding and retention flow",
  "workflow automation with approval steps",
  "content generation with quality controls",
  "integrated notification and alert engine",
];

function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildSyntheticIdea(): ExampleIdea {
  const domain = SMART_DOMAIN_BLOCKS[Math.floor(Math.random() * SMART_DOMAIN_BLOCKS.length)];
  const audience = SMART_AUDIENCE_BLOCKS[Math.floor(Math.random() * SMART_AUDIENCE_BLOCKS.length)];
  const featureA = SMART_FEATURE_BLOCKS[Math.floor(Math.random() * SMART_FEATURE_BLOCKS.length)];
  const featureB = SMART_FEATURE_BLOCKS[Math.floor(Math.random() * SMART_FEATURE_BLOCKS.length)];

  return {
    title: `${domain} AI platform`,
    titleAr: `منصة ذكاء اصطناعي ${domain}`,
    idea: `Build a ${domain} platform for ${audience} with ${featureA} and ${featureB}. The product should include clear onboarding, measurable outcomes, and production-ready UX.`,
  };
}

export function getSmartExampleIdeas(limit = 8): ExampleIdea[] {
  const picked = shuffle(EXAMPLE_IDEAS).slice(0, Math.min(4, limit));
  const synthetic: ExampleIdea[] = [];

  while (picked.length + synthetic.length < limit) {
    synthetic.push(buildSyntheticIdea());
  }

  return shuffle([...picked, ...synthetic]).slice(0, limit);
}
