"use client";

import { useI18n } from "@/components/providers/I18nProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function GuidePage() {
  const { locale } = useI18n();

  const sections =
    locale === "ar"
      ? [
          {
            title: "ماذا يفعل PromptForge AI",
            points: [
              "يحوّل الأفكار الخام إلى برومبتات منظمة لأدوات التصميم ووكلاء البرمجة.",
              "ينتج تحليل الفكرة والبرومبتات وتقييم الجودة واقتراحات التحسين في تدفق واحد.",
              "يعمل محليًا بدون API في هذه النسخة.",
            ],
          },
          {
            title: "طريقة الاستخدام",
            points: [
              "اكتب فكرتك مع المشكلة والجمهور والنتيجة المطلوبة.",
              "اختر نوع المخرجات والأداة ونوع المشروع والمستوى واللغة والنمط.",
              "ولّد البرومبتات ثم انسخها أو صدّرها واحفظ النسخ المهمة في السجل.",
            ],
          },
          {
            title: "أفضل ممارسات كتابة الفكرة",
            points: [
              "حدّد من المستخدم المستهدف ولماذا الحل الحالي غير كافٍ.",
              "اذكر أهم الميزات أو التدفقات المطلوبة بوضوح.",
              "أضف القيود مثل الوقت أو الميزانية أو متطلبات الامتثال.",
            ],
          },
          {
            title: "استخدام برومبت التصميم",
            points: [
              "أرسله إلى Google Stitch أو v0 أو Figma AI أو أي أداة تصميم مشابهة.",
              "راجع النتائج شاشة بشاشة وعدّل بناءً على نقاط الضعف في تقرير الجودة.",
              "اطلب تفاصيل الاستجابة والتفاعلات وإمكانية الوصول بشكل صريح.",
            ],
          },
          {
            title: "استخدام برومبت البناء",
            points: [
              "أرسله إلى Codex أو Claude Code أو Cursor أو Windsurf.",
              "اعمل بشكل تدريجي واطلب من الوكيل التحقق من أوامر build/test قبل الإنهاء.",
              "استخدم برومبت الإصلاح أو النشر عند الحاجة للتثبيت أو التجهيز للإصدار.",
            ],
          },
          {
            title: "الفرق بين برومبت التصميم وبرومبت البناء",
            points: [
              "برومبت التصميم يحدد المخطط البصري وتجربة الاستخدام: الشاشات والمكونات والتفاعلات والنمط.",
              "برومبت البناء يحدد مخطط التنفيذ: التقنية والبنية وقواعد الجودة والتحقق.",
              "استخدامهما معًا يعطي أفضل نتيجة من الفكرة إلى منتج جاهز.",
            ],
          },
        ]
      : [
          {
            title: "What PromptForge AI Does",
            points: [
              "Transforms rough ideas into structured prompts for design tools and coding agents.",
              "Generates analysis, prompts, quality scoring, and improvement suggestions in one flow.",
              "Works fully offline with deterministic local logic in this version.",
            ],
          },
          {
            title: "How to Use",
            points: [
              "Describe your raw idea with problem, target users, and expected product result.",
              "Select output mode, target tool, project type, complexity, language, and style preset.",
              "Generate prompts, copy/export them, and save useful versions to history.",
            ],
          },
          {
            title: "Best Practices for Raw Ideas",
            points: [
              "State who the product serves and why current alternatives are insufficient.",
              "List your top workflow or feature priorities in plain language.",
              "Mention constraints such as timeline, budget, compliance, or preferred stack.",
            ],
          },
          {
            title: "Using the Design Prompt",
            points: [
              "Send the Design Prompt to Google Stitch, v0, Figma AI, or similar design generation tools.",
              "Review screen-level output and iterate using the quality report weaknesses as guidance.",
              "Request responsive states, interaction details, and accessibility checks explicitly.",
            ],
          },
          {
            title: "Using the Build Prompt",
            points: [
              "Send the Build Prompt to coding agents such as Codex, Claude Code, Cursor, or Windsurf.",
              "Keep execution incremental and ask the agent to verify build/test commands before finalizing.",
              "Use Fix or Deploy prompts for stabilization and release preparation flows.",
            ],
          },
          {
            title: "Design Prompt vs Build Prompt",
            points: [
              "Design Prompt defines visual and UX blueprint: screens, components, interactions, style.",
              "Build Prompt defines implementation and execution blueprint: stack, architecture, quality rules, and verification.",
              "Use both together for highest quality delivery from concept to working product.",
            ],
          },
        ];

  return (
    <div className="grid gap-4">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-300">
              {section.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
