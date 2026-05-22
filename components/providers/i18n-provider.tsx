"use client";

import * as React from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";
import {
  defaultLocale,
  localeStorageKey,
  locales,
  type Locale,
} from "@/i18n/settings";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
} as const;

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function syncI18nResources() {
  (Object.entries(resources) as Array<[Locale, (typeof resources)[Locale]]>).forEach(
    ([lng, bundle]) => {
      i18n.addResourceBundle(lng, "translation", bundle.translation, true, true);
    }
  );
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    interpolation: { escapeValue: false },
  });
} else {
  syncI18nResources();
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    syncI18nResources();
  }, []);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(localeStorageKey);
    if (stored && isLocale(stored) && stored !== i18n.language) {
      void i18n.changeLanguage(stored);
    }
  }, []);

  React.useEffect(() => {
    const onLanguageChanged = (lng: string) => {
      document.documentElement.lang = lng;
    };
    i18n.on("languageChanged", onLanguageChanged);
    onLanguageChanged(i18n.language);
    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export function setLocale(locale: Locale) {
  void i18n.changeLanguage(locale);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(localeStorageKey, locale);
  }
}
