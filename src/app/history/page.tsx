"use client";

import { useMemo, useState } from "react";
import type { HistoryItem as HistoryItemType } from "@/lib/prompt-engine/types";
import { HistoryList } from "@/components/history/HistoryList";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { OUTPUT_MODES, TARGET_TOOLS } from "@/data/presets";
import { useI18n } from "@/components/providers/I18nProvider";
import { clearHistory, deleteHistoryItem, getHistory } from "@/lib/storage/historyStorage";

export default function HistoryPage() {
  const { locale, outputModeLabel } = useI18n();
  const [items, setItems] = useState<HistoryItemType[]>(() => getHistory());
  const [now] = useState(() => Date.now());
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("all");
  const [toolFilter, setToolFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const text = `${item.title} ${item.idea}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesMode = modeFilter === "all" || item.options.outputMode === modeFilter;
      const matchesTool = toolFilter === "all" || item.options.targetTool === toolFilter;
      const ageInDays = (now - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "7d" && ageInDays <= 7) ||
        (dateFilter === "30d" && ageInDays <= 30);
      return matchesSearch && matchesMode && matchesTool && matchesDate;
    });
  }, [items, now, search, modeFilter, toolFilter, dateFilter]);

  function removeItem(id: string) {
    deleteHistoryItem(id);
    setItems(getHistory());
  }

  function clearAll() {
    clearHistory();
    setItems([]);
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{locale === "ar" ? "مشاريع البرومبتات المحفوظة" : "Saved Prompt Projects"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 lg:grid-cols-4">
            <Input
              placeholder={locale === "ar" ? "ابحث بالعنوان أو المحتوى" : "Search title or content"}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Select value={modeFilter} onChange={(event) => setModeFilter(event.target.value)}>
              <option value="all">{locale === "ar" ? "كل أنواع المخرجات" : "All Output Modes"}</option>
              {OUTPUT_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {outputModeLabel(mode)}
                </option>
              ))}
            </Select>
            <Select value={toolFilter} onChange={(event) => setToolFilter(event.target.value)}>
              <option value="all">{locale === "ar" ? "كل الأدوات" : "All Tools"}</option>
              {TARGET_TOOLS.map((tool) => (
                <option key={tool} value={tool}>
                  {tool}
                </option>
              ))}
            </Select>
            <Select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
              <option value="all">{locale === "ar" ? "كل التواريخ" : "All Dates"}</option>
              <option value="7d">{locale === "ar" ? "آخر 7 أيام" : "Last 7 Days"}</option>
              <option value="30d">{locale === "ar" ? "آخر 30 يوم" : "Last 30 Days"}</option>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button variant="danger" size="sm" onClick={clearAll}>
              {locale === "ar" ? "مسح السجل" : "Clear History"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <HistoryList items={filtered} onDelete={removeItem} />
    </div>
  );
}
