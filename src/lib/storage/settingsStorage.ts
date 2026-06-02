import { DEFAULT_SETTINGS } from "@/data/presets";
import type { AppSettings } from "@/lib/prompt-engine/types";
import { safeJsonParse } from "@/lib/utils";

const SETTINGS_KEY = "promptforge_settings_v1";

function isClient() {
  return typeof window !== "undefined";
}

export function getSettings(): AppSettings {
  if (!isClient()) return DEFAULT_SETTINGS;
  const raw = safeJsonParse<Partial<AppSettings>>(
    window.localStorage.getItem(SETTINGS_KEY),
    {},
  );

  return {
    ...DEFAULT_SETTINGS,
    ...raw,
  };
}

export function saveSettings(settings: AppSettings) {
  if (!isClient()) return;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function clearSettings() {
  if (!isClient()) return;
  window.localStorage.removeItem(SETTINGS_KEY);
}

export function clearAllLocalData() {
  if (!isClient()) return;
  window.localStorage.removeItem(SETTINGS_KEY);
  window.localStorage.removeItem("promptforge_history_v1");
}
