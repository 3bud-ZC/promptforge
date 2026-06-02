import { Copy } from "lucide-react";
import type { PromptFramework } from "@/data/promptLibrary";
import { useI18n } from "@/components/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export function PromptFrameworkCard({
  framework,
  onCopy,
}: {
  framework: PromptFramework;
  onCopy: (title: string, content: string) => void;
}) {
  const { locale } = useI18n();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{framework.title}</CardTitle>
        <CardDescription>{framework.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex justify-end">
          <Button size="sm" variant="secondary" onClick={() => onCopy(framework.title, framework.framework)}>
            <Copy className="mr-2 h-3.5 w-3.5" />
            {locale === "ar" ? "نسخ" : "Copy"}
          </Button>
        </div>
        <pre className="max-h-[350px] overflow-auto rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-xs leading-5 text-slate-300 whitespace-pre-wrap">
          {framework.framework}
        </pre>
      </CardContent>
    </Card>
  );
}
