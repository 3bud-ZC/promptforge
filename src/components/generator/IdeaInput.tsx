import { Textarea } from "@/components/ui/Textarea";
import { useI18n } from "@/components/providers/I18nProvider";

interface IdeaInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function IdeaInput({ value, onChange }: IdeaInputProps) {
  const { locale } = useI18n();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-200">
        {locale === "ar" ? "فكرة المشروع الخام" : "Raw Project Idea"}
      </label>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={
          locale === "ar"
            ? "اكتب فكرتك والجمهور المستهدف والأهداف والنتيجة التي تريدها من المنتج..."
            : "Describe your idea, audience, goals, and desired product outcome..."
        }
        className="min-h-[180px] text-sm leading-6"
      />
      <p className="text-xs text-slate-400">
        {locale === "ar"
          ? "اكتب جملة واضحة على الأقل تحتوي المشكلة والجمهور والحل المتوقع."
          : "Write at least one clear sentence with problem, audience, and expected solution."}
      </p>
    </div>
  );
}
