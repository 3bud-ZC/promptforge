import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { getSmartExampleIdeas } from "@/data/examples";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/components/providers/I18nProvider";

export function ExampleIdeas({
  onPick,
}: {
  onPick: (idea: string) => void;
}) {
  const { locale } = useI18n();
  const [ideas, setIdeas] = useState(() => getSmartExampleIdeas(8));

  const refreshIdeas = () => {
    setIdeas(getSmartExampleIdeas(8));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
          {locale === "ar" ? "أفكار جاهزة (ديناميكية)" : "Smart Dynamic Ideas"}
        </p>
        <Button size="sm" variant="ghost" onClick={refreshIdeas}>
          <RotateCcw className="mr-2 h-3.5 w-3.5" />
          {locale === "ar" ? "تحديث" : "Refresh"}
        </Button>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {ideas.map((example, index) => (
          <Button
            key={`${example.title}-${index}`}
            variant="outline"
            size="sm"
            className="justify-start text-start"
            onClick={() => onPick(example.idea)}
          >
            {locale === "ar" ? (example.titleAr ?? example.title) : example.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
