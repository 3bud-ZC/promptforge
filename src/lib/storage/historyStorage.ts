import type { HistoryItem } from "@/lib/prompt-engine/types";
import { safeJsonParse } from "@/lib/utils";

const HISTORY_KEY = "promptforge_history_v1";

function isClient() {
  return typeof window !== "undefined";
}

export function getHistory(): HistoryItem[] {
  if (!isClient()) return [];
  return safeJsonParse<HistoryItem[]>(window.localStorage.getItem(HISTORY_KEY), []);
}

export function saveHistoryItem(item: HistoryItem) {
  const current = getHistory();
  const next = [item, ...current.filter((entry) => entry.id !== item.id)].slice(0, 100);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function deleteHistoryItem(id: string) {
  const next = getHistory().filter((item) => item.id !== id);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (!isClient()) return;
  window.localStorage.removeItem(HISTORY_KEY);
}

export function getHistoryById(id: string) {
  return getHistory().find((item) => item.id === id) ?? null;
}
