"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Complexity,
  LanguageMode,
  OutputMode,
  ProjectType,
  StylePreset,
} from "@/lib/prompt-engine/types";

export type Locale = "en" | "ar";

const LOCALE_KEY = "promptforge_ui_locale_v1";

const outputModeLabels: Record<OutputMode, Record<Locale, string>> = {
  design: { en: "Design Prompt", ar: "برومبت التصميم" },
  build: { en: "Build Prompt", ar: "برومبت البناء" },
  fix: { en: "Fix Existing Project Prompt", ar: "برومبت إصلاح مشروع قائم" },
  deploy: { en: "Deployment Prompt", ar: "برومبت التجهيز للنشر" },
  business: { en: "Business Planning Prompt", ar: "برومبت تخطيط الأعمال" },
  full: { en: "Full Package", ar: "الحزمة الكاملة" },
};

const projectTypeLabels: Record<ProjectType, Record<Locale, string>> = {
  "Web App": { en: "Web App", ar: "تطبيق ويب" },
  "Mobile App": { en: "Mobile App", ar: "تطبيق جوال" },
  SaaS: { en: "SaaS", ar: "منصة SaaS" },
  Dashboard: { en: "Dashboard", ar: "لوحة تحكم" },
  "E-commerce": { en: "E-commerce", ar: "تجارة إلكترونية" },
  Game: { en: "Game", ar: "لعبة" },
  "Landing Page": { en: "Landing Page", ar: "صفحة هبوط" },
  "Internal Tool": { en: "Internal Tool", ar: "أداة داخلية" },
  "Islamic App": { en: "Islamic App", ar: "تطبيق إسلامي" },
  Custom: { en: "Custom", ar: "مخصص" },
};

const complexityLabels: Record<Complexity, Record<Locale, string>> = {
  "Fast MVP": { en: "Fast MVP", ar: "MVP سريع" },
  "Production Ready": { en: "Production Ready", ar: "جاهز للإنتاج" },
  "Enterprise Level": { en: "Enterprise Level", ar: "مستوى مؤسسي" },
};

const languageModeLabels: Record<LanguageMode, Record<Locale, string>> = {
  English: { en: "English", ar: "الإنجليزية" },
  Arabic: { en: "Arabic", ar: "العربية" },
  "Mixed Arabic/English": { en: "Mixed Arabic/English", ar: "عربي/إنجليزي" },
};

const styleLabels: Record<StylePreset, Record<Locale, string>> = {
  "Apple Premium": { en: "Apple Premium", ar: "أسلوب Apple فاخر" },
  "Minimal SaaS": { en: "Minimal SaaS", ar: "SaaS بسيط" },
  "Arabic RTL Professional": { en: "Arabic RTL Professional", ar: "عربي RTL احترافي" },
  "Islamic Elegant": { en: "Islamic Elegant", ar: "إسلامي أنيق" },
  "Gaming Neon": { en: "Gaming Neon", ar: "ألعاب نيون" },
  "Enterprise Dashboard": { en: "Enterprise Dashboard", ar: "لوحة مؤسسية" },
  "Luxury Brand": { en: "Luxury Brand", ar: "علامة فاخرة" },
  "Youth Mobile App": { en: "Youth Mobile App", ar: "تطبيق شبابي" },
};

const messages = {
  en: {
    nav: {
      generator: "Generator",
      history: "History",
      library: "Prompt Library",
      settings: "Settings",
      guide: "Guide",
      studio: "Prompt Engineering Studio",
    },
    topbar: {
      generator: "Prompt Generator",
      history: "History",
      library: "Prompt Library",
      settings: "Settings",
      guide: "About and Guide",
      switch: "العربية",
    },
  },
  ar: {
    nav: {
      generator: "المولد",
      history: "السجل",
      library: "مكتبة البرومبتات",
      settings: "الإعدادات",
      guide: "الدليل",
      studio: "استوديو هندسة البرومبتات",
    },
    topbar: {
      generator: "مولد البرومبتات",
      history: "السجل",
      library: "مكتبة البرومبتات",
      settings: "الإعدادات",
      guide: "حول التطبيق والدليل",
      switch: "English",
    },
  },
} as const;

interface I18nContextValue {
  locale: Locale;
  isArabic: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  nav: (key: keyof (typeof messages)["en"]["nav"]) => string;
  topbar: (key: keyof (typeof messages)["en"]["topbar"]) => string;
  outputModeLabel: (value: OutputMode) => string;
  projectTypeLabel: (value: ProjectType) => string;
  complexityLabel: (value: Complexity) => string;
  languageModeLabel: (value: LanguageMode) => string;
  styleLabel: (value: StylePreset) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LOCALE_KEY);
  if (stored === "ar" || stored === "en") return stored;
  return window.navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);
  const isArabic = locale === "ar";

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.dataset.uiLocale = locale;
  }, [isArabic, locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      isArabic,
      setLocale: setLocaleState,
      toggleLocale: () => setLocaleState((prev) => (prev === "ar" ? "en" : "ar")),
      nav: (key) => messages[locale].nav[key],
      topbar: (key) => messages[locale].topbar[key],
      outputModeLabel: (value) => outputModeLabels[value][locale],
      projectTypeLabel: (value) => projectTypeLabels[value][locale],
      complexityLabel: (value) => complexityLabels[value][locale],
      languageModeLabel: (value) => languageModeLabels[value][locale],
      styleLabel: (value) => styleLabels[value][locale],
    }),
    [isArabic, locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
