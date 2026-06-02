import { Download, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/components/providers/I18nProvider";

interface ExportActionsProps {
  onCopyAll: () => void;
  onExport: () => void;
  onSave: () => void;
  onReset: () => void;
}

export function ExportActions({
  onCopyAll,
  onExport,
  onSave,
  onReset,
}: ExportActionsProps) {
  const { locale } = useI18n();

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={onCopyAll}>
        {locale === "ar" ? "نسخ الكل" : "Copy All"}
      </Button>
      <Button variant="outline" onClick={onExport}>
        <Download className="mr-2 h-4 w-4" />
        {locale === "ar" ? "تصدير Markdown" : "Export Markdown"}
      </Button>
      <Button variant="outline" onClick={onSave}>
        <Save className="mr-2 h-4 w-4" />
        {locale === "ar" ? "حفظ المشروع" : "Save Project"}
      </Button>
      <Button variant="ghost" onClick={onReset}>
        {locale === "ar" ? "إعادة ضبط" : "Reset"}
      </Button>
    </div>
  );
}
