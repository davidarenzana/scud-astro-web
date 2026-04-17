import type { AstroGlobal } from "astro";
import es from "../i18n/es.json";
import ca from "../i18n/ca.json";
import en from "../i18n/en.json";

const translations = { es, ca, en };

export type Locale = keyof typeof translations;

export function getI18n(locale: Locale) {
  return translations[locale] || translations.es;
}

export function getLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/([a-z]{2})/);
  const locale = match ? match[1] : "es";
  return locale as Locale;
}

export function getCurrentLocale(astro: AstroGlobal): Locale {
  const locale = getLocaleFromPath(astro.url.pathname);
  return locale;
}
